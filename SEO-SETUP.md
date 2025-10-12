# SEO & Analytics Setup Guide

This document explains how to set up and use the SEO and Analytics features in your portfolio.

## 📊 Google Analytics Setup

### 1. Get Your Google Analytics ID

1. Go to [Google Analytics](https://analytics.google.com/)
2. Create a new property for your website
3. Get your Measurement ID (format: `G-XXXXXXXXXX`)

### 2. Add to Environment Variables

1. Copy the `env.example` file to `.env.local`:
   ```bash
   cp env.example .env.local
   ```

2. Replace the placeholder with your actual Google Analytics ID:
   ```env
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-YOUR-ACTUAL-ID
   ```

3. Restart your development server

### 3. Verify Installation

- Google Analytics will start tracking after deployment
- Visit your Google Analytics dashboard to see real-time data
- Test in production environment (analytics won't work in development by default)

---

## 🔍 Google Search Console Setup

### 1. Verify Your Website

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your website property
3. Choose verification method (HTML tag recommended)
4. Get your verification code

### 2. Add Verification Code

Update the verification code in `src/app/layout.js`:

```javascript
verification: {
  google: "your-verification-code-here",
},
```

### 3. Submit Sitemap

After verification:
1. Go to "Sitemaps" section in Google Search Console
2. Submit: `https://yourdomain.com/sitemap.xml`

---

## 🗺️ Sitemap

Your sitemap is automatically generated at `/sitemap.xml`. It includes:

- All static pages (Home, Work, Resume, Services, Contact)
- All dynamic project pages
- Proper priorities and update frequencies

**View your sitemap:** Visit `/sitemap.xml` on your website

---

## 🖼️ Open Graph Images

### Current Setup

- Default OG image: `/public/og-image.png` (1200x630px)
- Automatically included in all pages

### Creating Custom OG Images

For best results, create Open Graph images with:
- **Dimensions:** 1200 x 630 pixels
- **Format:** PNG or JPG
- **File size:** Under 1MB
- **Content:** Include your name/brand and page title

Update the OG image in metadata:
```javascript
openGraph: {
  images: [
    {
      url: "https://alfayad.vercel.app/your-custom-og-image.png",
      width: 1200,
      height: 630,
    },
  ],
}
```

---

## 📋 Metadata by Page

### Home Page (`/`)
- **Title:** Alfayad | Full-Stack Developer & AI Specialist
- **Description:** Professional portfolio homepage
- **Schema:** Person + Website

### Work Page (`/work`)
- **Title:** My Work | Alfayad Portfolio
- **Description:** Showcase of projects
- **Schema:** Website + CollectionPage

### Project Detail Pages (`/work/[id]`)
- **Title:** [Project Name] | Alfayad Portfolio
- **Description:** Project-specific description
- **Schema:** CreativeWork + Breadcrumb

### Resume Page (`/resume`)
- **Title:** Resume | Alfayad Portfolio
- **Description:** Professional experience and skills
- **Schema:** Person

### Services Page (`/services`)
- **Title:** Services | Alfayad Portfolio
- **Description:** Development services offered
- **Schema:** Service

### Contact Page (`/contact`)
- **Title:** Contact | Alfayad Portfolio
- **Description:** Get in touch
- **Schema:** ContactPage

---

## 🏷️ Schema.org Structured Data

Structured data is automatically added to all pages:

### Person Schema (All Pages)
```json
{
  "@type": "Person",
  "name": "Alfayad Shameer",
  "jobTitle": "Full-Stack Developer & AI Specialist",
  "url": "https://alfayad.vercel.app",
  "knowsAbout": ["JavaScript", "React", "Node.js", ...]
}
```

### Project Schema (Project Pages)
```json
{
  "@type": "CreativeWork",
  "name": "Project Name",
  "description": "Project description",
  "author": { ... },
  "technologies": [ ... ]
}
```

### Breadcrumb Schema (Detail Pages)
Helps Google understand site structure and show breadcrumbs in search results.

---

## 🧪 Testing Your SEO

### 1. Google Rich Results Test
- Visit: [Rich Results Test](https://search.google.com/test/rich-results)
- Enter your URL
- Verify structured data is detected

### 2. Facebook Sharing Debugger
- Visit: [Facebook Debugger](https://developers.facebook.com/tools/debug/)
- Test Open Graph tags

### 3. Twitter Card Validator
- Visit: [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- Test Twitter cards

### 4. Lighthouse SEO Audit
Run in Chrome DevTools:
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Run SEO audit
4. Review recommendations

---

## 📈 Monitoring & Analytics

### What Gets Tracked

With Google Analytics, you can track:
- Page views
- User behavior
- Traffic sources
- Device types
- Geographic data
- Custom events (can be added)

### Custom Event Tracking

Add custom events for specific actions:

```javascript
// Example: Track project views
gtag('event', 'view_project', {
  'project_name': project.title,
  'project_id': project.id
});
```

---

## ✅ SEO Checklist

- [x] Google Analytics installed
- [x] Meta tags configured
- [x] Open Graph tags added
- [x] Twitter Cards configured
- [x] Sitemap generated
- [x] Robots.txt configured
- [x] Schema.org structured data added
- [ ] Google Search Console verified
- [ ] Sitemap submitted to Google
- [ ] Custom OG images created
- [ ] Performance optimized (Lighthouse score 90+)

---

## 🔧 Advanced Optimization

### 1. Add More Meta Tags for Specific Pages

Create custom metadata in page files:

```javascript
export const metadata = {
  title: "Custom Page Title",
  description: "Custom description",
  // ... more custom metadata
};
```

### 2. Add Yandex & Bing Verification

```javascript
verification: {
  google: "...",
  yandex: "...",
  bing: "...",
}
```

### 3. Add Language Alternatives

For multi-language support:
```javascript
alternates: {
  canonical: "https://alfayad.vercel.app",
  languages: {
    'en-US': '/en-US',
    'ar-AE': '/ar-AE',
  },
}
```

---

## 🆘 Troubleshooting

### Analytics Not Working?

1. Check `.env.local` has correct GA ID
2. Verify the ID starts with `G-`
3. Clear browser cache
4. Check Network tab in DevTools for GA requests
5. Analytics may take 24-48 hours to show data

### Sitemap Not Accessible?

1. Restart development server
2. Check `/sitemap.xml` route exists
3. Verify no errors in build logs

### Schema Validation Errors?

1. Test with [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Check Schema.org format
3. Ensure all required fields are present

---

## 📚 Resources

- [Next.js Metadata Docs](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Google Analytics Setup](https://support.google.com/analytics/answer/9304153)
- [Schema.org Documentation](https://schema.org/)
- [Open Graph Protocol](https://ogp.me/)
- [Google Search Console](https://search.google.com/search-console/welcome)

---

## 📝 Notes

- Keep your OG image under 1MB for faster loading
- Update sitemap when adding new pages
- Monitor Core Web Vitals in Search Console
- Test metadata changes with the tools mentioned above
- SEO is an ongoing process - monitor and improve regularly

---

**Need Help?** Check the resources above or search for specific Next.js SEO documentation.

