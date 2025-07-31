/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,


  async redirects() {
    return [
      {
        source: '/',
        destination: '/index',
        permanent: false
      }
    ];
  },
  //本项目文件命名规则，以page.tsx结尾的文件会作为页面，tsx结尾的文件会作为组件，
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js']
};

export default nextConfig;
