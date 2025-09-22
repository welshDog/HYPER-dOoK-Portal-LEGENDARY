// ========================================
// HYPER dOoK Portal 2025 - Root Layout
// ========================================

import type { Metadata } from 'next'
import { Lexend } from 'next/font/google'
import './styles/globals.css'
import { cn } from './lib/utils'
import { ToastContainer } from './components/ui/ToastContainer'
import { AccessibilityProvider } from './components/accessibility/AccessibilityProvider'

// Lexend font optimized for dyslexia
const lexend = Lexend({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-lexend',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: '🚀⚡ HYPER dOoK Portal 2025 ⚡🚀',
  description: 'The Ultimate ADHD-Optimized Memory Crystal Empire - Neurodivergent-first productivity platform with celebration-driven gamification, dyslexia-friendly design, and hyperfocus optimization.',
  keywords: [
    'ADHD', 'neurodivergent', 'accessibility', 'dyslexia-friendly', 
    'memory management', 'gamification', 'productivity', 'hyperfocus',
    'crystal system', 'celebration-driven', 'BROski'
  ],
  authors: [{ name: 'Chief Lyndz Williams' }],
  creator: 'Chief Lyndz Williams',
  publisher: 'HYPER dOoK Portal',
  openGraph: {
    title: '🚀⚡ HYPER dOoK Portal 2025 ⚡🚀',
    description: 'Ultimate ADHD-Optimized Memory Crystal Empire',
    url: 'https://welshddog.github.io/tHe-HYPER-dOoK-STorY/',
    siteName: 'HYPER dOoK Portal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'HYPER dOoK Portal - ADHD-Optimized Memory Crystal Empire',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '🚀⚡ HYPER dOoK Portal 2025 ⚡🚀',
    description: 'Ultimate ADHD-Optimized Memory Crystal Empire',
    images: ['/twitter-image.png'],
    creator: '@ChiefLyndzWilliams',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'productivity',
  other: {
    'msapplication-TileColor': '#8B5CF6',
    'theme-color': '#8B5CF6',
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html 
      lang="en" 
      className={cn(
        lexend.variable,
        'font-primary antialiased'
      )}
      suppressHydrationWarning
    >
      <head>
        {/* Favicons */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Preload critical fonts */}
        <link
          rel="preload"
          href="/fonts/OpenDyslexic-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/OpenDyslexic-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* Accessibility & SEO meta tags */}
        <meta name="color-scheme" content="light dark" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />

        {/* ADHD-friendly viewport settings */}
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes" 
        />
      </head>
      <body className={cn(
        'min-h-screen bg-neuro-bg-light text-text-primary-light',
        'dark:bg-neuro-bg-dark dark:text-text-primary-dark',
        'transition-colors duration-300 ease-out',
        'overflow-x-hidden', // Prevent horizontal scroll
        lexend.className
      )}>
        {/* Skip to main content for screen readers */}
        <a 
          href="#main-content"
          className="skip-to-content"
        >
          Skip to main content
        </a>

        {/* Accessibility Provider for ADHD/Dyslexia features */}
        <AccessibilityProvider>
          {/* Main application content */}
          <div id="app-root" className="relative min-h-screen">
            {children}
          </div>

          {/* Toast notification system */}
          <ToastContainer />

          {/* Screen reader announcements */}
          <div 
            id="screen-reader-announcements"
            aria-live="polite"
            aria-atomic="true"
            className="sr-only"
          />

          {/* Celebration overlay container */}
          <div 
            id="celebration-overlay"
            className="fixed inset-0 pointer-events-none z-50"
            aria-hidden="true"
          />
        </AccessibilityProvider>

        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Basic performance monitoring
              window.addEventListener('load', function() {
                setTimeout(function() {
                  const perfData = performance.getEntriesByType('navigation')[0];
                  if (perfData && perfData.loadEventEnd > 0) {
                    const loadTime = perfData.loadEventEnd - perfData.fetchStart;
                    console.log('🚀 HYPER Portal Load Time:', Math.round(loadTime), 'ms');

                    // Track for ADHD-friendly performance (should be < 3s)
                    if (loadTime > 3000) {
                      console.warn('⚠️ Load time exceeds ADHD-friendly threshold');
                    }
                  }
                }, 0);
              });

              // Reduce motion if user prefers it
              if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                document.documentElement.classList.add('reduce-motion');
              }

              // High contrast mode detection
              if (window.matchMedia('(prefers-contrast: high)').matches) {
                document.documentElement.classList.add('high-contrast');
              }

              // Dark mode detection
              if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.classList.add('dark');
              }
            `,
          }}
        />
      </body>
    </html>
  )
}