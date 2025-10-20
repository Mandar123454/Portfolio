# How to view analytics and SEO

## Analytics (Google Analytics 4)
You’ll need a GA4 account to see analytics in Google Analytics.

Steps:
1. Create a GA4 property at https://analytics.google.com and get your Measurement ID (G-XXXXXXXXXX).
2. Add to your `.env.local`:
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
3. Deploy your site. A consent banner appears; when you click Allow, GA loads and tracks. Use the Realtime report in Google Analytics to verify data.

## SEO (Search Console)
Highly recommended to see indexing coverage and submit your sitemap.

Steps:
1. Open Google Search Console and add your site (domain or URL prefix).
2. Verify ownership (DNS TXT record for domain property is best).
3. Submit your sitemap at https://your-domain.com/sitemap.xml.
4. Ensure you set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in `.env.local` so canonical URLs and robots/sitemap use your real domain.

Note: You mentioned you’ll do this last step after deploy — that works perfectly.
