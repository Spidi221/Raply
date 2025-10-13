-- Create ad_accounts table
-- This table stores connected advertising accounts (Meta Ads and Google Ads)

CREATE TYPE public.ad_platform AS ENUM ('meta', 'google');
CREATE TYPE public.account_status AS ENUM ('active', 'disconnected', 'error');

CREATE TABLE IF NOT EXISTS public.ad_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  platform public.ad_platform NOT NULL,

  -- Platform-specific account details
  platform_account_id TEXT NOT NULL, -- Meta Ad Account ID or Google Ads Customer ID
  account_name TEXT NOT NULL,
  currency TEXT DEFAULT 'USD',
  timezone TEXT DEFAULT 'UTC',

  -- OAuth tokens (encrypted at application level)
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  token_expires_at TIMESTAMP WITH TIME ZONE,

  -- Account status
  status public.account_status DEFAULT 'active' NOT NULL,
  last_sync_at TIMESTAMP WITH TIME ZONE,

  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,

  -- Ensure one platform account per user (prevent duplicates)
  UNIQUE(user_id, platform, platform_account_id)
);

-- Indexes for faster queries
CREATE INDEX IF NOT EXISTS ad_accounts_user_id_idx ON public.ad_accounts(user_id);
CREATE INDEX IF NOT EXISTS ad_accounts_platform_idx ON public.ad_accounts(platform);
CREATE INDEX IF NOT EXISTS ad_accounts_status_idx ON public.ad_accounts(status);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.ad_accounts
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for ad_accounts table
ALTER TABLE public.ad_accounts ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own ad accounts
CREATE POLICY "Users can view own ad accounts"
  ON public.ad_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own ad accounts
CREATE POLICY "Users can insert own ad accounts"
  ON public.ad_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own ad accounts
CREATE POLICY "Users can update own ad accounts"
  ON public.ad_accounts
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own ad accounts
CREATE POLICY "Users can delete own ad accounts"
  ON public.ad_accounts
  FOR DELETE
  USING (auth.uid() = user_id);

COMMENT ON TABLE public.ad_accounts IS 'Connected advertising accounts (Meta Ads, Google Ads)';
COMMENT ON COLUMN public.ad_accounts.platform_account_id IS 'Meta Ad Account ID (act_xxx) or Google Ads Customer ID';
COMMENT ON COLUMN public.ad_accounts.access_token IS 'OAuth access token (should be encrypted at app level)';
COMMENT ON COLUMN public.ad_accounts.last_sync_at IS 'Last time campaigns data was synced from this account';
