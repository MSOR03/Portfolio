/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // 🚀 Optimizaciones de producción
  reactStrictMode: true,
  swcMinify: true,
  
  // 📦 Optimización de imágenes - OPTIMIZADO PARA MÓVIL
  images: {
    formats: ['image/avif', 'image/webp'],
    // Tamaños optimizados para móvil primero - AGREGADO 298 para Photo component
    deviceSizes: [298, 375, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 298, 384],
    minimumCacheTTL: 31536000, // Cache más agresivo (1 año)
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Permite todas las imágenes HTTPS
      },
    ],
    // Optimización adicional para móvil
    unoptimized: false,
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