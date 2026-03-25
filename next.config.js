/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  // output: 'export' is only applied in production builds.
  // In dev mode it conflicts with HMR and causes webpack module-factory errors.
  ...(isProd ? { output: 'export' } : {}),
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // lenis is ESM-only (.mjs main entry, no CJS fallback).
  // Without this, webpack dev mode can't register its module factory and throws
  // "Cannot read properties of undefined (reading 'call')".
  transpilePackages: ['lenis'],
  // NOTE: redirects() is not supported with output: 'export'.
  // All 301 redirects are defined in vercel.json instead.
  // See vercel.json at project root.
}

module.exports = nextConfig
