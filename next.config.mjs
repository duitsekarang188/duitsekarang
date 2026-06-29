/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Wajib letak supaya gambar/logo tak error dalam mod static
  },
};

export default nextConfig;