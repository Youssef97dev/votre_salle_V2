/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: "deqnwr4jp",
    NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN:
      "pk.eyJ1Ijoia29vbGtpc2hhbiIsImEiOiJjbGw1MD12c3IwYXBiM2Rta2Z4dG14aDYyIn0.YLk5OfpWc7AyRwc9OM5A3w",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
