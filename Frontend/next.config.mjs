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
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas las imágenes HTTPS
      },
    ],
  },
  
  // 🗜️ Remover console.log en producción
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  
  // ⚡ Optimización de webpack - SIMPLIFICADA
  webpack: (config, { isServer }) => {
    // No modificar demasiado la configuración por defecto
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
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
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
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
    ];
  },
  
  // 🔗 Experimental features - SOLO las estables
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      'react-icons',
    ],
  },
  
  // ⚡ Optimización adicional para reducir JavaScript
  output: 'standalone', // Reduce bundle size
};

export default nextConfig;