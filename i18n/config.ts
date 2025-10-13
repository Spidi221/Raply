export type Locale = 'pl' | 'en'

export const locales: Locale[] = ['pl', 'en']
export const defaultLocale: Locale = 'pl'

export const localeNames: Record<Locale, string> = {
  pl: 'Polski',
  en: 'English',
}
