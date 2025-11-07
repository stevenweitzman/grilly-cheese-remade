import { Star, Award, Users } from "lucide-react";

const SocialProofBanner = () => {
  return (
    <div className="bg-gradient-to-r from-accent/10 via-primary/10 to-accent/10 border-y border-accent/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-3 rounded-full">
              <Star className="h-6 w-6 text-accent fill-accent" />
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <span className="text-2xl font-bold text-foreground">4.9/5</span>
                <div className="flex ml-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent fill-accent" />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">from 500+ reviews</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-border" />

          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-3 rounded-full">
              <Award className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">Top 6 in Nation</div>
              <p className="text-sm text-muted-foreground">GrubHub 2024 - Best Grilled Cheese</p>
            </div>
          </div>

          <div className="hidden md:block w-px h-12 bg-border" />

          <div className="flex items-center gap-3">
            <div className="bg-accent/20 p-3 rounded-full">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <div>
              <div className="text-lg font-bold text-foreground">2,500+ Events</div>
              <p className="text-sm text-muted-foreground">Trusted by Target, Princeton & more</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofBanner;
