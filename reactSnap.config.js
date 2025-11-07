module.exports = {
  // Routes to pre-render
  include: [
    "/",
    "/services/food-truck-catering",
    "/services/drop-off-catering",
    "/services/pop-up-events",
    "/events",
    "/events/wedding-catering",
    "/events/corporate-catering",
    "/locations/new-jersey",
    "/locations/pennsylvania",
    "/locations/new-york-city",
    "/blog",
    "/blog/booking-food-trucks-nj",
    "/blog/corporate-event-advantages",
    "/blog/food-truck-catering-nj-guide",
    "/blog/food-truck-costs",
    "/blog/food-truck-vs-catering",
    "/blog/questions-to-ask"
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
