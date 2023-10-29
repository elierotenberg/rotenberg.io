/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "imgs.xkcd.com",
        pathname: "/comics/*.png",
        protocol: "https",
      },
    ],
  },
};

export default nextConfig;
