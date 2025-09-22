import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'
const repo = 'tHe-HYPER-dOoK-STorY'

const nextConfig: NextConfig = {
  // App Router (default in Next.js 15)
  experimental: {
    // Enable React Compiler for automatic performance optimization
    reactCompiler: true,
    // Partial Prerendering for ultra-fast loading
    ppr: true,
    // Turbopack for blazing fast dev mode
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      }
    }
  },

  // Static export configuration for GitHub Pages
  output: isProd ? 'export' : undefined,
  basePath: isProd ? `/${repo}` : '',
  assetPrefix: isProd ? `/${repo}/` : '',

  // Image optimization (disabled for static export)
  images: {
    unoptimized: true
  },

  // Enhanced performance settings
  compiler: {
    removeConsole: isProd ? {
      exclude: ['error', 'warn']
    } : false
  },

  // TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false
  },

  // ESLint during builds
  eslint: {
    ignoreDuringBuilds: false
  },

  // Custom webpack config for 3D libraries
  webpack: (config) => {
    config.externals.push({
      'utf-8-validate': 'commonjs utf-8-validate',
      'bufferutil': 'commonjs bufferutil'
    })
    return config
  },

  // Headers for enhanced security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options', 
            value: 'DENY'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ]
      }
    ]
  },

  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/portal',
        destination: '/',
        permanent: true
      }
    ]
  }
}

export default nextConfig