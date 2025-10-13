import { Database } from './database'

// Export database types
export type { Database } from './database'

// Table row types
export type User = Database['public']['Tables']['users']['Row']
export type AdAccount = Database['public']['Tables']['ad_accounts']['Row']
export type Report = Database['public']['Tables']['reports']['Row']
export type CampaignData = Database['public']['Tables']['campaigns_data']['Row']

// Insert types (for creating new records)
export type UserInsert = Database['public']['Tables']['users']['Insert']
export type AdAccountInsert = Database['public']['Tables']['ad_accounts']['Insert']
export type ReportInsert = Database['public']['Tables']['reports']['Insert']
export type CampaignDataInsert = Database['public']['Tables']['campaigns_data']['Insert']

// Update types (for updating existing records)
export type UserUpdate = Database['public']['Tables']['users']['Update']
export type AdAccountUpdate = Database['public']['Tables']['ad_accounts']['Update']
export type ReportUpdate = Database['public']['Tables']['reports']['Update']
export type CampaignDataUpdate = Database['public']['Tables']['campaigns_data']['Update']

// Enum types
export type AdPlatform = Database['public']['Enums']['ad_platform']
export type AccountStatus = Database['public']['Enums']['account_status']
export type ReportTemplate = Database['public']['Enums']['report_template']
export type ReportStatus = Database['public']['Enums']['report_status']

// Extended types with relations
export type ReportWithAccount = Report & {
  ad_account: AdAccount
}

export type ReportWithCampaigns = Report & {
  campaigns_data: CampaignData[]
}

export type ReportWithAll = Report & {
  ad_account: AdAccount
  campaigns_data: CampaignData[]
}

export type AdAccountWithReports = AdAccount & {
  reports: Report[]
}
