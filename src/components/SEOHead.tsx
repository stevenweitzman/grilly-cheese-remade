import { Helmet } from "react-helmet";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageType?: string;
  ogType?: "website" | "article" | "business.business";
  articleAuthor?: string;
  articlePublishedTime?: string;
  articleModifiedTime?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  canonical,
  keywords,
  ogImage = "https://grillycheese.net/assets/hero-grilled-cheese.jpg",
  ogImageWidth = 1200,
  ogImageHeight = 630,
  ogImageType = "image/jpeg",
  ogType = "website",
  articleAuthor,
  articlePublishedTime,
  articleModifiedTime
}: SEOHeadProps) => {
  const baseUrl = "https://grillycheese.net";
  const fullTitle = title.includes("Grilly Cheese") ? title : `${title} | Grilly Cheese`;
  const canonicalUrl = canonical || baseUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={String(ogImageWidth)} />
      <meta property="og:image:height" content={String(ogImageHeight)} />
      <meta property="og:image:type" content={ogImageType} />
      <meta property="og:image:alt" content="Grilly Cheese Food Truck Catering" />
      <meta property="og:site_name" content="Grilly Cheese" />
      <meta property="og:locale" content="en_US" />
      {articleAuthor && <meta property="article:author" content={articleAuthor} />}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />
      <meta property="twitter:image:width" content={String(ogImageWidth)} />
      <meta property="twitter:image:height" content={String(ogImageHeight)} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Grilly Cheese" />
      <meta name="geo.region" content="US-NJ" />
      <meta name="geo.placename" content="New Jersey, Pennsylvania, New York" />
      <meta name="geo.position" content="39.7324;-74.8807" />
      <meta name="ICBM" content="39.7324, -74.8807" />
    </Helmet>
  );
};

export default SEOHead;
