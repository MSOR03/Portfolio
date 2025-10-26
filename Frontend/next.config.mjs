/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 🚀 Optimizaciones de producción
  reactStrictMode: true,
  swcMinify: true,
  
  // 📦 Optimización de imágenes
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // 🗜️ Remover console.log en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ⚡ Optimización de webpack
  webpack: (config, { isServer, dev }) => {
    // Solo en producción client-side
    if (!isServer && !dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            
            // Framework principal (React + Next)
            framework: {
              name: 'framework',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
              priority: 50,
              enforce: true,
            },
            
            // Framer Motion (pesado)
            framer: {
              name: 'framer',
              test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
              priority: 40,
              reuseExistingChunk: true,
            },
            
            // Mapbox (muy pesado)
            mapbox: {
              name: 'mapbox',
              test: /[\\/]node_modules[\\/](mapbox-gl|@mapbox)[\\/]/,
              priority: 35,
              reuseExistingChunk: true,
            },
            
            // Otras librerías comunes
            lib: {
              name: 'lib',
              test: /[\\/]node_modules[\\/]/,
              priority: 30,
              minChunks: 2,
              reuseExistingChunk: true,
            },
            
            // Código compartido de la app
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // 🔒 Headers de seguridad y performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // Performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          
          // Seguridad
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ],
      },
      // Cache agresivo para assets estáticos
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Cache para fuentes
      {
        source: '/_next/static/media/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // 🔗 Preconnect automático (Next.js 14+)
  experimental: {
    optimizeCss: true, // Optimizar CSS
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
    ],
  },
};

export default nextConfig;