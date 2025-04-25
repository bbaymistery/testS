/** @type {import('next').NextConfig} */

async function getRoutes() {
  let languages = ["en", "tr", "az", "ru", "es", "it", "zh",];
  const singleRoutes = languages.map(lang => ({ source: `/${lang}`, destination: '/', locale: false }));
  const multilingualPages = ["about-us", "menu"];
  const pageRoutes = languages.flatMap(lang =>
    multilingualPages.map(page => ({
      source: `/${lang}/${page}`,
      destination: `/${page}`,
      locale: false,
    }))
  );

  return [...singleRoutes, ...pageRoutes];

}
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/webp',],
  },
  async rewrites() {
    const rules = await getRoutes();
    return rules;
  },
  /**
 * Adds long-term cache headers to static assets like JavaScript, CSS, and images.
 *
 * These headers tell browsers and CDNs (like Cloudflare) to cache the files for 1 year (31536000 seconds)
 * and treat them as immutable, meaning they won't be revalidated unless the filename changes (e.g., via versioning).
 *
 * This is great for performance because static assets (like Next.js build output or public images)
 * usually don't change unless a new deployment happens and the filenames change.
 *
 */
  async headers() {
    return [
      {
        source: '/:all*(js|css|png|jpg|webp|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          }
        ],
      },
    ];
  }
}

module.exports = nextConfig
