// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
// };

module.exports = {
  images: {
    reactStrictMode: true,
    domains: ["junglescout.com", "picsum.photos", "ehsanmarketing.com","ehsanmarketingsssbucket.s3.amazonaws.com"],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },

  env: {
    backend: "backend"
  },

};
