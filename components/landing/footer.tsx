'use client'

import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Mail, Linkedin, Twitter } from 'lucide-react'

export function Footer() {
  const t = useTranslations('footer')

  const footerLinks = {
    product: [
      { name: t('productFeatures'), href: '#features' },
      { name: t('productHowItWorks'), href: '#how-it-works' },
      { name: t('productPricing'), href: '#pricing' },
      { name: t('productChangelog'), href: '#' },
    ],
    company: [
      { name: t('companyAbout'), href: '#' },
      { name: t('companyBlog'), href: '#' },
      { name: t('companyCareers'), href: '#' },
      { name: t('companyContact'), href: 'mailto:contact@raply.app' },
    ],
    legal: [
      { name: t('legalPrivacy'), href: '#' },
      { name: t('legalTerms'), href: '#' },
      { name: t('legalCookies'), href: '#' },
      { name: t('legalGdpr'), href: '#' },
    ],
  }

  const socialLinks = [
    { name: 'Email', href: 'mailto:contact@raply.app', icon: Mail },
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'Twitter', href: '#', icon: Twitter },
  ]

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="text-2xl font-bold text-foreground">Raply</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              {t('description')}
            </p>
            {/* Social Links */}
            <div className="mt-6 flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <Link
                    key={social.name}
                    href={social.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={social.name}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-3 gap-8 lg:col-span-3">
            {/* Product */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                {t('productHeading')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                {t('companyHeading')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                {t('legalHeading')}
              </h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}
