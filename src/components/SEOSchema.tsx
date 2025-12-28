import { Helmet } from "react-helmet";

interface SEOSchemaProps {
  type?: 'homepage' | 'service' | 'blog' | 'location';
  title?: string;
  description?: string;
  url?: string;
  serviceName?: string;
  locationName?: string;
}

const SEOSchema = ({ 
  type = 'homepage', 
  title,
  description,
  url,
  serviceName,
  locationName 
}: SEOSchemaProps) => {
  const baseUrl = "https://grillycheese.net";
  const pageUrl = url || baseUrl;
  
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "name": "Grilly Cheese",
    "alternateName": "Grilly Cheese Food Truck",
    "description": "Award-winning gourmet grilled cheese food truck catering for weddings, corporate events, and private parties across NJ, PA, NYC, and beyond",
    "image": `${baseUrl}/assets/grilly-cheese-logo.png`,
    "@id": baseUrl,
    "url": baseUrl,
    "telephone": "844-474-5591",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "53 White Horse Pike",
      "addressLocality": "Chesilhurst",
      "addressRegion": "NJ",
      "postalCode": "08089",
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 39.7324,
      "longitude": -74.8807
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "servesCuisine": ["American", "Comfort Food", "Grilled Cheese"],
    "paymentAccepted": "Cash, Credit Card, Debit Card",
    "currenciesAccepted": "USD",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "New Jersey"
      },
      {
        "@type": "State",
        "name": "Pennsylvania"
      },
      {
        "@type": "State",
        "name": "New York"
      },
      {
        "@type": "State",
        "name": "Maryland"
      },
      {
        "@type": "State",
        "name": "Delaware"
      },
      {
        "@type": "AdministrativeArea",
        "name": "Washington DC"
      }
    ],
    "hasMenu": {
      "@type": "Menu",
      "name": "Catering Menu",
      "description": "Gourmet grilled cheese sandwiches, hot dogs, and sides",
      "hasMenuSection": [
        {
          "@type": "MenuSection",
          "name": "Signature Sandwiches",
          "description": "Our award-winning grilled cheese creations",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "The Grilly Cheese",
              "description": "American, cheddar, and provolone on buttery grilled bread"
            },
            {
              "@type": "MenuItem",
              "name": "The Cluck Norris",
              "description": "Crispy chicken, bacon, ranch, and melted cheese"
            },
            {
              "@type": "MenuItem",
              "name": "The Piggy Smalls",
              "description": "Pulled pork, BBQ sauce, and melted cheddar"
            }
          ]
        },
        {
          "@type": "MenuSection",
          "name": "Sides",
          "description": "Perfect accompaniments",
          "hasMenuItem": [
            {
              "@type": "MenuItem",
              "name": "Hand-Cut Fries",
              "description": "Fresh-cut and seasoned"
            },
            {
              "@type": "MenuItem",
              "name": "Tomato Soup",
              "description": "Classic creamy tomato soup"
            }
          ]
        }
      ]
    },
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "reviewBody": "Grilly Cheese catered our wedding and it was incredible! Guests are still talking about the food truck. Professional, delicious, and so much fun!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Mike T."
        },
        "reviewBody": "We hired them for a corporate event with 200 people. Fast service, amazing food, and everyone loved the grilled cheese. Highly recommend!"
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Jennifer L."
        },
        "reviewBody": "The team was so easy to work with. They handled everything and our guests were thrilled. Best decision we made for our party!"
      }
    ]
  };

  const cateringServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Grilly Cheese Catering Services",
    "serviceType": "Food Truck Catering",
    "description": "Professional gourmet grilled cheese food truck catering for weddings, corporate events, festivals, and private parties",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Grilly Cheese",
      "telephone": "844-474-5591",
      "url": baseUrl
    },
    "areaServed": [
      { "@type": "State", "name": "New Jersey" },
      { "@type": "State", "name": "Pennsylvania" },
      { "@type": "State", "name": "New York" },
      { "@type": "State", "name": "Maryland" },
      { "@type": "State", "name": "Delaware" },
      { "@type": "AdministrativeArea", "name": "Washington DC" }
    ],
    "offers": [
      {
        "@type": "Offer",
        "name": "Simple Menu Package",
        "description": "Classic grilled cheese sandwiches and hot dogs with hand-cut fries, beverages, and all serving equipment",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Full Menu Package",
        "description": "Gourmet grilled cheese menu featuring The Grilly Cheese, The Cluck Norris, and specialty sandwiches with premium sides",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Brunch Package",
        "description": "Breakfast sandwiches and bagel bar with cream cheese spreads, perfect for morning events",
        "priceCurrency": "USD"
      },
      {
        "@type": "Offer",
        "name": "Drop-Off Catering",
        "description": "Convenient delivered catering platters for smaller events and office lunches",
        "priceCurrency": "USD"
      }
    ]
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": serviceName || "Food Truck Catering",
    "name": serviceName || "Food Truck Catering Services",
    "description": "Professional food truck catering for corporate events, weddings, festivals, and private parties with award-winning gourmet grilled cheese",
    "provider": {
      "@type": "Organization",
      "name": "Grilly Cheese",
      "telephone": "844-474-5591",
      "url": baseUrl,
      "logo": `${baseUrl}/assets/grilly-cheese-logo.png`
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "New Jersey"
      },
      {
        "@type": "State",
        "name": "Pennsylvania"
      },
      {
        "@type": "State",
        "name": "New York"
      },
      {
        "@type": "State",
        "name": "Maryland"
      },
      {
        "@type": "State",
        "name": "Delaware"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Catering Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Simple Menu Package",
            "description": "Classic grilled cheese sandwiches and hot dogs with hand-cut fries, beverages, and all serving equipment"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Full Menu Package",
            "description": "Gourmet grilled cheese menu featuring The Grilly Cheese, The Cluck Norris, and specialty sandwiches with premium sides"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Brunch Package",
            "description": "Breakfast sandwiches and bagel bar with cream cheese spreads, perfect for morning events"
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceRange": "$$"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Grilly Cheese",
    "url": baseUrl,
    "logo": `${baseUrl}/assets/grilly-cheese-logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "844-474-5591",
      "contactType": "Customer Service",
      "areaServed": ["US"],
      "availableLanguage": ["English"]
    },
    "sameAs": [
      "https://www.facebook.com/grillycheese",
      "https://www.instagram.com/grillycheese"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does food truck catering cost?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our catering packages vary based on menu selection and guest count. We offer Simple Menu and Full Menu packages. Contact us at 844-474-5591 for a free, personalized quote based on your event needs."
        }
      },
      {
        "@type": "Question",
        "name": "What areas do you serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide food truck catering services throughout New Jersey, Pennsylvania, and New York City. This includes Princeton, Trenton, Philadelphia, and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "Do you offer vegan and gluten-free options?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer gluten-free bread and vegan cheese alternatives made in-house. We can accommodate up to 10 guests with dietary restrictions (more upon request)."
        }
      },
      {
        "@type": "Question",
        "name": "How far in advance should I book?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We recommend booking 2 months in advance for the best date availability, especially during spring and summer. However, we can accommodate last-minute bookings based on availability."
        }
      }
    ]
  };

  const breadcrumbSchema = type !== 'homepage' ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": baseUrl
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": title || "Page",
        "item": pageUrl
      }
    ]
  } : null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(cateringServiceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      {type === 'homepage' && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}
      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOSchema;
