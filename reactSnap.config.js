module.exports = {
  // All routes to pre-render for SEO
  include: [
    // Main pages
    "/",
    "/recipes",
    "/encyclopedia",
    
    // Recipe pages
    "/recipes/the-original",
    "/recipes/the-gourmet",
    "/recipes/the-veggie",
    "/recipes/the-jalapeno-popper",
    "/recipes/the-fig-and-basil",
    "/recipes/the-avocado-dream",
    "/recipes/the-apple-brie",
    "/recipes/the-caramelized-onion-and-rosemary",
    "/recipes/the-truffle-indulgence",
    "/recipes/the-spicy-sweet-peach",
    "/recipes/the-bbq-bacon-and-cheddar",
    "/recipes/the-crispy-cheddar-crust",
    
    // Services
    "/services/food-truck-catering",
    "/services/drop-off-catering",
    "/services/pop-up-events",
    
    // Events
    "/events",
    "/events/wedding-catering",
    "/events/corporate-catering",
    "/events/baby-showers",
    "/events/retirement-parties",
    "/events/film-set-catering",
    
    // Locations
    "/locations/new-jersey",
    "/locations/pennsylvania",
    "/locations/new-york-city",
    "/locations/camden-county",
    "/locations/burlington-county",
    "/locations/gloucester-county",
    "/locations/bucks-county",
    "/locations/princeton",
    "/locations/maryland",
    "/locations/delaware",
    "/locations/washington-dc",
    "/locations/long-island",
    
    // Blog
    "/blog",
    "/blog/booking-food-trucks-in-new-jersey",
    "/blog/corporate-event-advantages",
    "/blog/food-truck-catering-nj-guide",
    "/blog/food-truck-costs",
    "/blog/food-trucks-vs-catering",
    "/blog/questions-to-ask",
    "/blog/how-much-does-it-cost-to-book-a-food-truck",
    "/blog/how-to-book-a-grilled-cheese-food-truck-for-any-event",
    "/blog/wedding-food-truck-catering-philadelphia",
    "/blog/wedding-food-truck-catering-bucks-county-pa",
    "/blog/food-truck-catering-for-post-reception-events",
    "/blog/how-to-book-a-food-truck",
    "/blog/food-truck-vs-traditional-catering",
    "/blog/late-night-wedding-food-ideas",
    "/blog/food-truck-catering-cost",
    "/blog/grilled-cheese-recipe-secrets",
    "/blog/signature-grilled-cheese-sandwiches"
  ],
  
  // Puppeteer configuration for headless Chrome
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  
  // Wait for React to render
  waitFor: 1500,
  
  // Inline critical CSS for faster FCP
  inlineCss: true,
  
  // Keep script tags for hydration
  removeScriptTags: false,
  
  // Minification for smaller HTML files
  minifyHtml: {
    collapseWhitespace: true,
    removeComments: true,
    removeRedundantAttributes: true,
    removeScriptTypeAttributes: true,
    removeStyleLinkTypeAttributes: true,
    useShortDoctype: true
  },
  
  // Source directory (Vite output)
  source: "dist",
  
  // Fix relative paths
  fixInsertRule: true,
  
  // Skip external links
  skipThirdPartyRequests: true,
  
  // Viewport for consistent rendering
  viewport: {
    width: 1200,
    height: 800
  }
};
