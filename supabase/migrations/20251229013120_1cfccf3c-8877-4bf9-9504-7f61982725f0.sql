-- Fix anonymous report spam: Require authentication for all report submissions
DROP POLICY IF EXISTS "Anyone can submit snow reports" ON public.snow_reports;

CREATE POLICY "Authenticated users can submit reports" 
ON public.snow_reports 
FOR INSERT 
WITH CHECK (auth.uid() = user_id AND user_id IS NOT NULL);