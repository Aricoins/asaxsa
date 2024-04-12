/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "www.lilhorselab.com",
        port: '',
        pathname: '/**',
      },
    ],
  },  };
  
  export default nextConfig;
  