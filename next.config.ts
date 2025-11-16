import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   reactCompiler: true,
   images: {
      // unoptimized: true, // Disable image optimization
      remotePatterns: [
         {
            protocol: 'http',
            hostname: '127.0.0.1',
            port: '9000',
            pathname: '/bucket0/**',
         },
      ],
   }
};

export default nextConfig;
