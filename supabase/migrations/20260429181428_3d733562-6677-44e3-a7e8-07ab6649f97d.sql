-- 1) Add LGPD consent + retention columns to leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consent_accepted boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consent_text text,
  ADD COLUMN IF NOT EXISTS consent_at timestamptz,
  ADD COLUMN IF NOT EXISTS expires_at timestamptz NOT NULL DEFAULT (now() + interval '12 months');

-- Backfill existing rows so the new NOT NULL/defaults are coherent
UPDATE public.leads
SET expires_at = COALESCE(expires_at, created_at + interval '12 months')
WHERE expires_at IS NULL;

CREATE INDEX IF NOT EXISTS idx_leads_expires_at ON public.leads (expires_at);
CREATE INDEX IF NOT EXISTS idx_leads_phone ON public.leads (phone);

-- 2) Tighten the public INSERT policy to require explicit consent
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a lead"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(name) > 0 AND char_length(name) <= 200
  AND char_length(phone) > 0 AND char_length(phone) <= 30
  AND char_length(insurance_type) > 0 AND char_length(insurance_type) <= 100
  AND consent_accepted = true
  AND consent_text IS NOT NULL
  AND char_length(consent_text) <= 2000
);

-- 3) Data deletion requests table (LGPD Art. 18)
CREATE TABLE IF NOT EXISTS public.data_deletion_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text NOT NULL,
  requester_email text,
  status text NOT NULL DEFAULT 'completed',
  leads_deleted integer NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  processed_at timestamptz
);

ALTER TABLE public.data_deletion_requests ENABLE ROW LEVEL SECURITY;

-- Only authenticated admin (any logged-in user — same model already in use for /admin)
CREATE POLICY "Authenticated users can view deletion requests"
ON public.data_deletion_requests
FOR SELECT
TO authenticated
USING (true);

-- No one with anon/authenticated keys can INSERT/UPDATE/DELETE directly.
-- Writes happen only via SECURITY DEFINER function below.

-- 4) Public RPC: titular requests deletion of their own leads by phone
CREATE OR REPLACE FUNCTION public.request_lead_deletion(_phone text, _email text DEFAULT NULL)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted integer := 0;
  v_phone text;
BEGIN
  v_phone := trim(_phone);

  IF v_phone IS NULL OR char_length(v_phone) < 8 OR char_length(v_phone) > 30 THEN
    RAISE EXCEPTION 'Telefone inválido';
  END IF;

  IF _email IS NOT NULL AND char_length(_email) > 255 THEN
    RAISE EXCEPTION 'E-mail inválido';
  END IF;

  WITH del AS (
    DELETE FROM public.leads WHERE phone = v_phone RETURNING 1
  )
  SELECT count(*) INTO v_deleted FROM del;

  INSERT INTO public.data_deletion_requests (phone, requester_email, status, leads_deleted, processed_at)
  VALUES (v_phone, _email, 'completed', v_deleted, now());

  RETURN jsonb_build_object('deleted', v_deleted, 'status', 'completed');
END;
$$;

REVOKE ALL ON FUNCTION public.request_lead_deletion(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.request_lead_deletion(text, text) TO anon, authenticated;

-- 5) Retention purge function (will be scheduled via pg_cron in a follow-up step)
CREATE OR REPLACE FUNCTION public.purge_expired_leads()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted integer := 0;
BEGIN
  WITH del AS (
    DELETE FROM public.leads WHERE expires_at <= now() RETURNING 1
  )
  SELECT count(*) INTO v_deleted FROM del;
  RETURN v_deleted;
END;
$$;

REVOKE ALL ON FUNCTION public.purge_expired_leads() FROM PUBLIC;