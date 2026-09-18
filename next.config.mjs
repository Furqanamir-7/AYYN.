/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: "/shop", destination: "/#collections", permanent: false },
      { source: "/shop/:path*", destination: "/#collections", permanent: false },
      { source: "/about", destination: "/#home", permanent: false },
      { source: "/reviews", destination: "/#reviews", permanent: false },
      { source: "/custom", destination: "/#contact", permanent: false },
      { source: "/faq", destination: "/#faq", permanent: false },
      { source: "/policy", destination: "/#faq", permanent: false },
      { source: "/order", destination: "/checkout", permanent: false },
    ];
  },
};

export default nextConfig;
