import type { NextConfig } from "next";

const staticExport = process.env.CONTAB_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  output: staticExport ? "export" : undefined,
  trailingSlash: staticExport ? true : undefined,
  poweredByHeader: false,
  reactStrictMode: true,
  devIndicators: false,
};

// În exportul Sites, antetele sunt servite de infrastructura statică.
if (!staticExport) {
  nextConfig.headers = async () => [
    {
      source: "/fonts/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
  ];
}

export default nextConfig;
