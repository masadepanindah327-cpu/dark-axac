-- postcss.config.js --
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}

-- next.config.js --
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};
module.exports = nextConfig;

