/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
      if (!isServer) {
        config.externals = config.externals || {};
        config.externals['jest'] = 'jest'; // Exclude Jest from client bundle
      }
      return config;
    },
images: {
  domains: ['res.cloudinary.com'], 
},

    eslint: {
      ignoreDuringBuilds: true, // Ignore ESLint errors during production build
    },
  };
  
  export default nextConfig;
  