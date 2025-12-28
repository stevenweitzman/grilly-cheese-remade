import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | Grilly Cheese</title>
        <meta name="description" content="The page you're looking for doesn't exist. Browse our food truck catering services for weddings, corporate events, and parties in NJ, PA, and NYC." />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content="404" />
      </Helmet>
      
      <Navigation />
      
      <div className="min-h-screen flex items-center justify-center bg-background py-20">
        <div className="text-center space-y-6 p-8 max-w-2xl">
          <h1 className="text-7xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-semibold text-foreground">Oops! Page Not Found</h2>
          <p className="text-lg text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Don't worry, our delicious grilled cheese catering is still available!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button asChild size="lg">
              <Link to="/">Go to Homepage</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services/food-truck-catering">View Our Services</Link>
            </Button>
          </div>
          
          <div className="pt-8 border-t mt-8">
            <h3 className="text-xl font-semibold mb-4 text-foreground">Popular Pages</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
              <div>
                <h4 className="font-medium mb-2 text-foreground">Services</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/services/food-truck-catering" className="hover:text-primary">Food Truck Catering</Link></li>
                  <li><Link to="/services/drop-off-catering" className="hover:text-primary">Drop-Off Catering</Link></li>
                  <li><Link to="/services/pop-up-events" className="hover:text-primary">Pop-Up Events</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-foreground">Events</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/events/wedding-catering" className="hover:text-primary">Wedding Catering</Link></li>
                  <li><Link to="/events/corporate-catering" className="hover:text-primary">Corporate Events</Link></li>
                  <li><Link to="/events/baby-showers" className="hover:text-primary">Baby Showers</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2 text-foreground">Locations</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li><Link to="/locations/new-jersey" className="hover:text-primary">New Jersey</Link></li>
                  <li><Link to="/locations/pennsylvania" className="hover:text-primary">Pennsylvania</Link></li>
                  <li><Link to="/locations/new-york-city" className="hover:text-primary">New York City</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default NotFound;
