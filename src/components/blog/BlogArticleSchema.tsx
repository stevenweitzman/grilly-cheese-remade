import { Helmet } from "react-helmet";

interface BlogArticleSchemaProps {
  headline: string;
  description: string;
  datePublished: string; // ISO format: YYYY-MM-DD
  dateModified?: string; // ISO format: YYYY-MM-DD
  url: string;
  image?: string;
}

const BlogArticleSchema = ({
  headline,
  description,
  datePublished,
  dateModified,
  url,
  image = "https://grillycheese.net/assets/hero-grilled-cheese.jpg"
}: BlogArticleSchemaProps) => {
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
    "image": image,
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