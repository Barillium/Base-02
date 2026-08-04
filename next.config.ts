import type { NextConfig } from "next";

const disableEmbeddedStudio = process.env.DISABLE_EMBEDDED_STUDIO === "1";
const studioModuleStub = "./src/stubs/next-sanity-studio.tsx";
const embeddedStudioStub = "./src/components/studio/EmbeddedStudio.disabled.tsx";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  turbopack: disableEmbeddedStudio
    ? {
        resolveAlias: {
          "next-sanity/studio": studioModuleStub,
          "@/components/studio/EmbeddedStudio": embeddedStudioStub,
        },
      }
    : {},
  webpack: (config) => {
    if (disableEmbeddedStudio) {
      config.resolve ??= {};
      config.resolve.alias = {
        ...(config.resolve.alias ?? {}),
        "next-sanity/studio": studioModuleStub,
        "@/components/studio/EmbeddedStudio": embeddedStudioStub,
      };
    }

    return config;
  },
};

export default nextConfig;
