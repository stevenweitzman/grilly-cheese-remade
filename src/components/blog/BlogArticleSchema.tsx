import { Helmet } from "react-helmet";

interface ImageObject {
  url: string;
  width?: number;
  height?: number;
  caption?: string;
}

interface BlogArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string; // ISO format: YYYY-MM-DD
  dateModified?: string; // ISO format: YYYY-MM-DD
  url: string;
  image?: string | ImageObject;
  thumbnailUrl?: string;
}

const BlogArticleSchema = ({
  headline,
  description,
  datePublished,
  dateModified,
  url,
  image = "https://grillycheese.net/assets/hero-grilled-cheese.jpg",
  thumbnailUrl
}: BlogArticleSchemaProps) => {
  // Build image object for schema
  const imageObject = typeof image === 'string' 
    ? {
        "@type": "ImageObject",
        "url": image,
        "width": 1200,
        "height": 630
      }
    : {
        "@type": "ImageObject",
        "url": image.url,
        "contentUrl": image.url,
        "width": image.width || 1200,
        "height": image.height || 630,
        ...(image.caption && { "caption": image.caption })
      };

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": headline,
    "description": description,
    "author": {
      "@type": "Organization",
      "name": "Grilly Cheese",
      "url": "https://grillycheese.net"
    },
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "image": imageObject,
    ...(thumbnailUrl && { "thumbnailUrl": thumbnailUrl }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Grilly Cheese",
      "logo": {
        "@type": "ImageObject",
        "url": "https://grillycheese.net/assets/grilly-cheese-logo.webp",
        "width": 600,
        "height": 60
      }
    },
    "isPartOf": {
      "@type": "Blog",
      "@id": "https://grillycheese.net/blog",
      "name": "Grilly Cheese Blog",
      "publisher": {
        "@type": "Organization",
        "name": "Grilly Cheese"
      }
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default BlogArticleSchema;