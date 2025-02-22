import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        remotePatterns: [
            {
                hostname: "lh3.googleusercontent.com",
            }, {
                protocol: "https",
                hostname: "lpcdhaeraghnskrvvxak.supabase.co",
            },
        ],
    },
};

export default nextConfig;
