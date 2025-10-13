import { z } from 'zod'

export const reportTemplateSchema = z.enum(['leads', 'sales', 'reach'])

export const dateRangeSchema = z.object({
  from: z.string().datetime(),
  to: z.string().datetime(),
})

export const createReportSchema = z.object({
  accountId: z.string().uuid('Invalid account ID'),
  templateType: reportTemplateSchema,
  dateRange: dateRangeSchema,
  name: z.string().min(1, 'Report name is required').max(255).optional(),
})

export const updateReportSchema = z.object({
  name: z.string().min(1).max(255).optional(),
})

export type ReportTemplate = z.infer<typeof reportTemplateSchema>
export type DateRange = z.infer<typeof dateRangeSchema>
export type CreateReportInput = z.infer<typeof createReportSchema>
export type UpdateReportInput = z.infer<typeof updateReportSchema>
