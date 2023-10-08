/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['cdn2.stablediffusionapi.com']
  },

  // Will only be available on the server side
  serverRuntimeConfig: {
    STABLE_DIFFUSION_API_KEY: process.env.STABLE_DIFFUSION_API_KEY,
    IMG_BB_API_KEY: process.env.IMG_BB_API_KEY,
  },

  // Will be available on both server and client
  publicRuntimeConfig: {
    GOOGLE_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_API_KEY,
    CONTRACT_ADDRESS: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    ARTIFACT_ID: process.env.NEXT_PUBLIC_ARTIFACT_ID,
  }
}

module.exports = nextConfig
