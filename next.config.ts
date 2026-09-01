import type { NextConfig } from "next";

/**
 * Two deployment targets:
 *
 *   - Vercel / any Node host (default). Full Next.js, so `next/image` gets
 *     resized and re-encoded per viewport.
 *   - A static export for plain file hosting such as Hostinger shared, built
 *     with `STATIC_EXPORT=1` (see the `package` script). No server means no
 *     image optimization, hence `unoptimized`.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = staticExport
  ? {
      output: "export",
      images: { unoptimized: true },
      trailingSlash: true,
    }
  : {};

export default nextConfig;
