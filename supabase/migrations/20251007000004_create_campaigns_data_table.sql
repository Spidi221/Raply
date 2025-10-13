-- Create campaigns_data table
-- This table caches campaign performance data fetched from Meta/Google Ads APIs

CREATE TABLE IF NOT EXISTS public.campaigns_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id UUID NOT NULL REFERENCES public.reports(id) ON DELETE CASCADE,
  ad_account_id UUID NOT NULL REFERENCES public.ad_accounts(id) ON DELETE CASCADE,

  -- Campaign identification
  campaign_id TEXT NOT NULL, -- Platform campaign ID
  campaign_name TEXT NOT NULL,
  platform public.ad_platform NOT NULL,

  -- Date range
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,

  -- Performance metrics
  spend NUMERIC(10, 2) NOT NULL DEFAULT 0,
  impressions INTEGER NOT NULL DEFAULT 0,
  clicks INTEGER NOT NULL DEFAULT 0,
  conversions INTEGER NOT NULL DEFAULT 0,

  -- Calculated metrics
  ctr NUMERIC(5, 2), -- Click-through rate (%)
  cpc NUMERIC(10, 2), -- Cost per click
  cpm NUMERIC(10, 2), -- Cost per mille (1000 impressions)
  cpa NUMERIC(10, 2), -- Cost per acquisition
  conversion_rate NUMERIC(5, 2), -- Conversion rate (%)

  -- Revenue tracking (for ROAS calculation)
  revenue NUMERIC(10, 2) DEFAULT 0,
  roas NUMERIC(10, 2), -- Return on ad spend

  -- Platform-specific data (JSON for flexibility)
  raw_data JSONB,

  -- Metadata
  fetched_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes for efficient queries
CREATE INDEX IF NOT EXISTS campaigns_data_report_id_idx ON public.campaigns_data(report_id);
CREATE INDEX IF NOT EXISTS campaigns_data_ad_account_id_idx ON public.campaigns_data(ad_account_id);
CREATE INDEX IF NOT EXISTS campaigns_data_campaign_id_idx ON public.campaigns_data(campaign_id);
CREATE INDEX IF NOT EXISTS campaigns_data_platform_idx ON public.campaigns_data(platform);
CREATE INDEX IF NOT EXISTS campaigns_data_date_range_idx ON public.campaigns_data(date_from, date_to);

-- Function to calculate derived metrics
CREATE OR REPLACE FUNCTION public.calculate_campaign_metrics()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate CTR (Click-Through Rate)
  IF NEW.impressions > 0 THEN
    NEW.ctr := ROUND((NEW.clicks::NUMERIC / NEW.impressions::NUMERIC * 100), 2);
  ELSE
    NEW.ctr := 0;
  END IF;

  -- Calculate CPC (Cost Per Click)
  IF NEW.clicks > 0 THEN
    NEW.cpc := ROUND(NEW.spend / NEW.clicks, 2);
  ELSE
    NEW.cpc := 0;
  END IF;

  -- Calculate CPM (Cost Per Mille)
  IF NEW.impressions > 0 THEN
    NEW.cpm := ROUND((NEW.spend / NEW.impressions * 1000), 2);
  ELSE
    NEW.cpm := 0;
  END IF;

  -- Calculate CPA (Cost Per Acquisition)
  IF NEW.conversions > 0 THEN
    NEW.cpa := ROUND(NEW.spend / NEW.conversions, 2);
  ELSE
    NEW.cpa := 0;
  END IF;

  -- Calculate Conversion Rate
  IF NEW.clicks > 0 THEN
    NEW.conversion_rate := ROUND((NEW.conversions::NUMERIC / NEW.clicks::NUMERIC * 100), 2);
  ELSE
    NEW.conversion_rate := 0;
  END IF;

  -- Calculate ROAS (Return On Ad Spend)
  IF NEW.spend > 0 AND NEW.revenue > 0 THEN
    NEW.roas := ROUND(NEW.revenue / NEW.spend, 2);
  ELSE
    NEW.roas := 0;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-calculate metrics on insert/update
CREATE TRIGGER calculate_metrics
  BEFORE INSERT OR UPDATE ON public.campaigns_data
  FOR EACH ROW
  EXECUTE FUNCTION public.calculate_campaign_metrics();

-- RLS Policies for campaigns_data table
ALTER TABLE public.campaigns_data ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view campaign data for their own reports
CREATE POLICY "Users can view own campaign data"
  ON public.campaigns_data
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = campaigns_data.report_id
      AND reports.user_id = auth.uid()
    )
  );

-- Policy: Users can insert campaign data for their own reports
CREATE POLICY "Users can insert own campaign data"
  ON public.campaigns_data
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = campaigns_data.report_id
      AND reports.user_id = auth.uid()
    )
  );

-- Policy: Users can update campaign data for their own reports
CREATE POLICY "Users can update own campaign data"
  ON public.campaigns_data
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = campaigns_data.report_id
      AND reports.user_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = campaigns_data.report_id
      AND reports.user_id = auth.uid()
    )
  );

-- Policy: Users can delete campaign data for their own reports
CREATE POLICY "Users can delete own campaign data"
  ON public.campaigns_data
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.reports
      WHERE reports.id = campaigns_data.report_id
      AND reports.user_id = auth.uid()
    )
  );

COMMENT ON TABLE public.campaigns_data IS 'Cached campaign performance data from Meta/Google Ads';
COMMENT ON COLUMN public.campaigns_data.campaign_id IS 'Platform-specific campaign ID';
COMMENT ON COLUMN public.campaigns_data.raw_data IS 'Complete API response data in JSON format';
COMMENT ON COLUMN public.campaigns_data.roas IS 'Return on Ad Spend (Revenue / Spend)';
COMMENT ON FUNCTION public.calculate_campaign_metrics IS 'Auto-calculates CTR, CPC, CPM, CPA, Conversion Rate, and ROAS';
