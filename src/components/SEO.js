import Head from 'next/head';

export default function SEO({
  title = "Alfayad | Full-Stack Developer & AI Specialist",
  description = "Professional Full-Stack Developer specializing in MERN stack, Next.js, and AI integration. Building modern web applications, e-commerce platforms, and intelligent solutions.",
  keywords = "Full-Stack Developer, MERN Stack, React Developer, Next.js, AI Integration, Web Development, E-commerce, Dubai Developer, JavaScript, Node.js",
  ogImage = "/og-image.png",
  ogType = "website",
  canonical,
  noindex = false,
  structuredData,
}) {
  const siteUrl = "https://alfayad.vercel.app";
  const canonicalUrl = canonical || siteUrl;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Alfayad Shameer" />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Robots */}
      {noindex && <meta name="robots" content="noindex,nofollow" />}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="Alfayad Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      <meta name="twitter:creator" content="@alfayad" />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="theme-color" content="#000000" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      )}
    </Head>
  );
}

// Helper function to generate structured data for a person
export function generatePersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Alfayad Shameer",
    jobTitle: "Full-Stack Developer & AI Specialist",
    url: "https://alfayad.vercel.app",
    email: "alfayadshameer056@gmail.com",
    description: "Professional Full-Stack Developer specializing in MERN stack, Next.js, and AI integration.",
    sameAs: [
      "https://github.com/Alfayads",
      "https://linkedin.com/in/alfayad"
    ],
    knowsAbout: [
      "JavaScript",
      "React",
      "Node.js",
      "Next.js",
      "MongoDB",
      "Express",
      "AI Integration",
      "Web Development",
      "E-commerce"
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Brototype"
    }
  };
}

// Helper function to generate structured data for a project/work
export function generateProjectSchema(project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Person",
      name: "Alfayad Shameer"
    },
    dateCreated: project.year,
    url: project.link !== "#" ? project.link : undefined,
    keywords: project.technologies.join(", "),
    image: `https://alfayad.vercel.app${project.image}`
  };
}

// Helper function to generate structured data for the portfolio/website
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Alfayad Portfolio",
    url: "https://alfayad.vercel.app",
    description: "Professional portfolio showcasing full-stack development projects and AI integration expertise",
    author: {
      "@type": "Person",
      name: "Alfayad Shameer"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: "https://alfayad.vercel.app/work?search={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };
}

// Helper function to generate breadcrumb structured data
export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}

