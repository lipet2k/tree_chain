/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['cdn2.stablediffusionapi.com', 'pub-3626123a908346a7a8be8d9295f44e26.r2.dev']
  },

  // Will only be available on the server side
  serverRuntimeConfig: {
    STABLE_DIFFUSION_API_KEY: process.env.STABLE_DIFFUSION_API_KEY,
    IMG_BB_API_KEY: process.env.IMG_BB_API_KEY,
    JSON_BIN_API_KEY: process.env.JSON_BIN_API_KEY,
  },

  // Will be available on both server and client
  publicRuntimeConfig: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    VERIFIER_ADDRESS: process.env.NEXT_PUBLIC_VERIFIER_ADDRESS,
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    ARTIFACT_ID: process.env.NEXT_PUBLIC_ARTIFACT_ID,
  }
}

module.exports = nextConfig
