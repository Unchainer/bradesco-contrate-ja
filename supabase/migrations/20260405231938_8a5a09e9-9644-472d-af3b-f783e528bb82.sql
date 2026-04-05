
-- Create a table for lead/quote requests
CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  insurance_type TEXT NOT NULL,
  source TEXT DEFAULT 'website',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- No public read access — only service role (edge functions) can read/write
-- This ensures leads are only accessible server-side
CREATE POLICY "Service role can manage leads"
ON public.leads
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Allow anonymous inserts only (for the quote form submission)
CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (
  char_length(name) > 0 AND char_length(name) <= 200
  AND char_length(phone) > 0 AND char_length(phone) <= 30
  AND char_length(insurance_type) > 0 AND char_length(insurance_type) <= 100
);
