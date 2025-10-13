-- Create reports table
-- This table stores generated advertising reports

CREATE TYPE public.report_template AS ENUM ('leads', 'sales', 'reach');
CREATE TYPE public.report_status AS ENUM ('generating', 'completed', 'failed');

CREATE TABLE IF NOT EXISTS public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  ad_account_id UUID NOT NULL REFERENCES public.ad_accounts(id) ON DELETE CASCADE,

  -- Report details
  name TEXT NOT NULL,
  template_type public.report_template NOT NULL,

  -- Date range for report
  date_from DATE NOT NULL,
  date_to DATE NOT NULL,

  -- Report status
  status public.report_status DEFAULT 'generating' NOT NULL,

  -- AI-generated insights (JSON)
  ai_description TEXT,
  ai_recommendations JSONB,

  -- Aggregated metrics (cached for quick display)
  total_spend NUMERIC(10, 2),
  total_impressions INTEGER,
  total_clicks INTEGER,
  total_conversions INTEGER,
  average_ctr NUMERIC(5, 2),
  average_cpc NUMERIC(10, 2),
  average_cpm NUMERIC(10, 2),
  roas NUMERIC(10, 2),

  -- PDF storage
  pdf_url TEXT,

  -- Metadata
  generated_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Indexes
CREATE INDEX IF NOT EXISTS reports_user_id_idx ON public.reports(user_id);
CREATE INDEX IF NOT EXISTS reports_ad_account_id_idx ON public.reports(ad_account_id);
CREATE INDEX IF NOT EXISTS reports_status_idx ON public.reports(status);
CREATE INDEX IF NOT EXISTS reports_date_range_idx ON public.reports(date_from, date_to);
CREATE INDEX IF NOT EXISTS reports_created_at_idx ON public.reports(created_at DESC);

-- Trigger for updated_at
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.reports
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- RLS Policies for reports table
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own reports
CREATE POLICY "Users can view own reports"
  ON public.reports
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Users can insert their own reports
CREATE POLICY "Users can insert own reports"
  ON public.reports
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can update their own reports
CREATE POLICY "Users can update own reports"
  ON public.reports
  FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy: Users can delete their own reports
CREATE POLICY "Users can delete own reports"
  ON public.reports
  FOR DELETE
  USING (auth.uid() = user_id);

COMMENT ON TABLE public.reports IS 'Generated advertising reports with AI insights';
COMMENT ON COLUMN public.reports.template_type IS 'Report template: leads, sales, or reach';
COMMENT ON COLUMN public.reports.ai_description IS 'Claude AI-generated campaign description';
COMMENT ON COLUMN public.reports.ai_recommendations IS 'Claude AI-generated recommendations (JSON array)';
COMMENT ON COLUMN public.reports.roas IS 'Return on Ad Spend';
