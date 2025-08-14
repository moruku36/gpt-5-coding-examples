import type { NextConfig } from "next";
import fs from "fs";
import path from "path";

function detectPublicSlugs(): string[] {
  try {
    const publicDir = path.join(process.cwd(), "public");
    const entries = fs.readdirSync(publicDir, { withFileTypes: true });
    return entries
      .filter(
        (e) =>
          e.isDirectory() &&
          fs.existsSync(path.join(publicDir, e.name, "index.html"))
      )
      .map((e) => e.name);
  } catch {
    return [];
  }
}

const nextConfig: NextConfig = {
  output: "export",
  reactStrictMode: true,
  poweredByHeader: false,
  async rewrites() {
    // dev 時のみリライトを適用
    if (process.env.NODE_ENV !== "development") return [];

    const publicDir = path.join(process.cwd(), "public");
    const hasRootIndex = fs.existsSync(path.join(publicDir, "index.html"));
    const slugs = detectPublicSlugs();

    return [
      // ルートの index.html が存在する場合に / をリライト
      ...(hasRootIndex ? [{ source: "/", destination: "/index.html" }] : []),
      // /slug -> /slug/index.html を提供
      ...slugs.map((slug) => ({
        source: `/${slug}`,
        destination: `/${slug}/index.html`,
      })),
    ];
  },
  // Optional: if you ever add next/image back, uncomment below
  // images: { unoptimized: true },
};

export default nextConfig;
