-- Create snow_reports table for public submissions
CREATE TABLE public.snow_reports (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mountain_id TEXT NOT NULL,
  overall_rating INTEGER NOT NULL CHECK (overall_rating >= 0 AND overall_rating <= 10),
  snow_amount INTEGER NOT NULL CHECK (snow_amount >= 1 AND snow_amount <= 10),
  snow_weight INTEGER NOT NULL CHECK (snow_weight >= 1 AND snow_weight <= 10),
  grooming INTEGER NOT NULL CHECK (grooming >= 1 AND grooming <= 10),
  visibility INTEGER NOT NULL CHECK (visibility >= 1 AND visibility <= 10),
  crowd_level INTEGER NOT NULL CHECK (crowd_level >= 1 AND crowd_level <= 10),
  wind_conditions INTEGER NOT NULL CHECK (wind_conditions >= 1 AND wind_conditions <= 10),
  comment TEXT NOT NULL CHECK (char_length(comment) >= 20),
  reporter_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS but allow public inserts and reads
ALTER TABLE public.snow_reports ENABLE ROW LEVEL SECURITY;

-- Anyone can view reports
CREATE POLICY "Anyone can view snow reports" 
ON public.snow_reports 
FOR SELECT 
USING (true);

-- Anyone can submit reports
CREATE POLICY "Anyone can submit snow reports" 
ON public.snow_reports 
FOR INSERT 
WITH CHECK (true);

-- Create storage bucket for report photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('report-photos', 'report-photos', true);

-- Anyone can view report photos
CREATE POLICY "Anyone can view report photos" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'report-photos');

-- Anyone can upload report photos
CREATE POLICY "Anyone can upload report photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'report-photos');

-- Create table to link photos to reports
CREATE TABLE public.report_photos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id UUID NOT NULL REFERENCES public.snow_reports(id) ON DELETE CASCADE,
  photo_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for report_photos
ALTER TABLE public.report_photos ENABLE ROW LEVEL SECURITY;

-- Anyone can view report photos
CREATE POLICY "Anyone can view report photo records" 
ON public.report_photos 
FOR SELECT 
USING (true);

-- Anyone can insert report photos
CREATE POLICY "Anyone can insert report photo records" 
ON public.report_photos 
FOR INSERT 
WITH CHECK (true);