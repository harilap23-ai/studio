/** @type {import('next').NextConfig} */
const nextConfig = {
    serverExternalPackages: [
        '@genkit-ai/core',
        '@genkit-ai/googleai',
        'firebase-admin',
        'google-auth-library',
        'long',
        'protobufjs',
    ],
};

export default nextConfig;
