module.exports = {
  // Routes to pre-render
  include: [
    "/",
    "/recipes",
    "/services/food-truck-catering",
    "/services/drop-off-catering",
    "/services/pop-up-events",
    "/events",
    "/events/wedding-catering",
    "/events/corporate-catering",
    "/events/baby-showers",
    "/events/retirement-parties",
    "/events/film-set-catering",
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
  // Puppeteer options
  puppeteerArgs: ["--no-sandbox", "--disable-setuid-sandbox"],
  // Wait for all async content
  waitFor: 1000,
  // Inline critical CSS
  inlineCss: true,
  // Remove script tags for static content
  removeScriptTags: false,
  // Minify HTML
  minifyHtml: {
    collapseWhitespace: true,
    removeComments: true
  }
};
