import { Helmet } from "react-helmet";

export interface ImageObjectProps {
  url: string;
  width: number;
  height: number;
  alt?: string;
  caption?: string;
  name?: string;
  description?: string;
  contentUrl?: string;
  thumbnailUrl?: string;
  datePublished?: string;
  creditText?: string;
  creator?: string;
  copyrightHolder?: string;
  license?: string;
}

interface SEOImageSchemaProps {
  image: ImageObjectProps;
}

interface SEOImageGallerySchemaProps {
  images: ImageObjectProps[];
  name: string;
  description?: string;
}

export const SEOImageSchema = ({ image }: SEOImageSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": image.url,
    "contentUrl": image.contentUrl || image.url,
    "width": {
      "@type": "QuantitativeValue",
      "value": image.width,
      "unitCode": "E37"
    },
    "height": {
      "@type": "QuantitativeValue",
      "value": image.height,
      "unitCode": "E37"
    },
    ...(image.name && { "name": image.name }),
    ...(image.alt && { "name": image.alt }),
    ...(image.caption && { "caption": image.caption }),
    ...(image.description && { "description": image.description }),
    ...(image.thumbnailUrl && { "thumbnailUrl": image.thumbnailUrl }),
    ...(image.datePublished && { "datePublished": image.datePublished }),
    ...(image.creditText && { "creditText": image.creditText }),
    ...(image.creator && {
      "creator": {
        "@type": "Organization",
        "name": image.creator
      }
    }),
    ...(image.copyrightHolder && {
      "copyrightHolder": {
        "@type": "Organization",
        "name": image.copyrightHolder
      }
    }),
    ...(image.license && { "license": image.license })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export const SEOImageGallerySchema = ({ images, name, description }: SEOImageGallerySchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": name,
    ...(description && { "description": description }),
    "image": images.map((img, index) => ({
      "@type": "ImageObject",
      "position": index + 1,
      "url": img.url,
      "contentUrl": img.contentUrl || img.url,
      "width": img.width,
      "height": img.height,
      ...(img.name && { "name": img.name }),
      ...(img.alt && { "name": img.alt }),
      ...(img.caption && { "caption": img.caption }),
      ...(img.description && { "description": img.description })
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SEOImageSchema;
