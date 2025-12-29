-- Fix MISSING_RLS: Add UPDATE and DELETE policies for snow_reports
CREATE POLICY "Users can update own reports" 
ON public.snow_reports 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reports" 
ON public.snow_reports 
FOR DELETE 
USING (auth.uid() = user_id);

-- Fix PUBLIC_DATA_EXPOSURE: Restrict report_photos INSERT to report owners
DROP POLICY IF EXISTS "Anyone can insert report photo records" ON public.report_photos;

CREATE POLICY "Users can add photos to own reports" 
ON public.report_photos 
FOR INSERT 
WITH CHECK (
  auth.role() = 'authenticated' 
  AND EXISTS (
    SELECT 1 FROM public.snow_reports
    WHERE id = report_id 
    AND user_id = auth.uid()
  )
);

-- Fix INPUT_VALIDATION: Add database constraints for photo URLs
ALTER TABLE public.report_photos 
ADD CONSTRAINT photo_url_length 
CHECK (char_length(photo_url) <= 2048);

ALTER TABLE public.report_photos 
ADD CONSTRAINT valid_photo_url_format 
CHECK (
  photo_url ~ '^https://[a-z0-9-]+\.supabase\.co/storage/v1/object/public/report-photos/.+'
);