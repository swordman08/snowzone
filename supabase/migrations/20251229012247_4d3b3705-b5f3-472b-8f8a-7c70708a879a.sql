-- Fix STORAGE_EXPOSURE: Restrict storage uploads to authenticated users
DROP POLICY IF EXISTS "Anyone can upload report photos" ON storage.objects;

CREATE POLICY "Authenticated users can upload report photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (
  bucket_id = 'report-photos' 
  AND auth.role() = 'authenticated'
);

-- Fix OPEN_ENDPOINTS: Add rate limiting via database trigger
-- Create rate limit function for snow reports (max 10 per hour for authenticated users)
CREATE OR REPLACE FUNCTION public.check_report_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
BEGIN
  -- Only rate limit authenticated users (anonymous submissions are handled by requiring auth for photos)
  IF NEW.user_id IS NOT NULL THEN
    SELECT COUNT(*) INTO recent_count
    FROM public.snow_reports
    WHERE user_id = NEW.user_id
      AND created_at > NOW() - INTERVAL '1 hour';
    
    IF recent_count >= 10 THEN
      RAISE EXCEPTION 'Rate limit exceeded: maximum 10 reports per hour';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for rate limiting
DROP TRIGGER IF EXISTS enforce_report_rate_limit ON public.snow_reports;
CREATE TRIGGER enforce_report_rate_limit
  BEFORE INSERT ON public.snow_reports
  FOR EACH ROW
  EXECUTE FUNCTION public.check_report_rate_limit();

-- Add rate limiting for photo uploads (max 20 photos per hour per user)
CREATE OR REPLACE FUNCTION public.check_photo_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
  report_user_id UUID;
BEGIN
  -- Get the user_id from the associated report
  SELECT user_id INTO report_user_id
  FROM public.snow_reports
  WHERE id = NEW.report_id;
  
  -- Only rate limit if associated with authenticated user
  IF report_user_id IS NOT NULL THEN
    SELECT COUNT(*) INTO recent_count
    FROM public.report_photos rp
    JOIN public.snow_reports sr ON sr.id = rp.report_id
    WHERE sr.user_id = report_user_id
      AND rp.created_at > NOW() - INTERVAL '1 hour';
    
    IF recent_count >= 20 THEN
      RAISE EXCEPTION 'Rate limit exceeded: maximum 20 photos per hour';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Create trigger for photo rate limiting
DROP TRIGGER IF EXISTS enforce_photo_rate_limit ON public.report_photos;
CREATE TRIGGER enforce_photo_rate_limit
  BEFORE INSERT ON public.report_photos
  FOR EACH ROW
  EXECUTE FUNCTION public.check_photo_rate_limit();