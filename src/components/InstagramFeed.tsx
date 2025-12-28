import { useEffect } from "react";
import { Instagram } from "lucide-react";

const InstagramFeed = () => {
  useEffect(() => {
    // Load Elfsight script dynamically
    const existingScript = document.querySelector('script[src="https://static.elfsight.com/platform/platform.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://static.elfsight.com/platform/platform.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Instagram className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-4xl font-bold">
              Follow Our Cheesy Adventures
            </h2>
          </div>
          <p className="text-muted-foreground text-lg">
            See what we're cooking up{" "}
            <a 
              href="https://www.instagram.com/grillycheese" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline font-semibold"
            >
              @grillycheese
            </a>
          </p>
        </div>
        
        {/* Elfsight Instagram Feed Widget */}
        <div 
          className="elfsight-app-931c3a38-f474-4875-ba4b-be586421c6d1" 
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
};

export default InstagramFeed;
