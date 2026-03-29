import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    experimental: {
        proxyClientMaxBodySize: '50mb',
    },
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '54321',
                pathname: '/storage/**',
            },
            {
                protocol: 'https',
                hostname: 'localhost',
                port: '54321',
                pathname: '/storage/**',
            },
        ],
    },
};

export default nextConfig;
