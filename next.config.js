/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['firebasestorage.googleapis.com'], //? IF YOU CHOOSE TO USE A DIFFERENT IMAGE STORAGE SOLUTION, ADD THE BASE URL HERE. USED FOR NEXT/IMAGE
    },
}

module.exports = nextConfig
