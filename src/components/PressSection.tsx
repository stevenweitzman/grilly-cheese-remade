import { Award } from "lucide-react";

const PressSection = () => {
  return (
    <section className="py-16 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-accent/10 px-4 py-2 rounded-full mb-4">
            <Award className="h-5 w-5 text-primary" />
            <span className="text-sm font-semibold text-primary">Award Winning</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Recognized Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            "The Top Six Grilled Cheeses in the Nation"
          </p>
          <p className="text-lg text-muted-foreground font-medium">
            — Seamless Web/GrubHub
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center max-w-4xl mx-auto">
          <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-scale-in">
            <p className="text-center font-semibold text-foreground">Philly.com</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-scale-in">
            <p className="text-center font-semibold text-foreground">SJ Magazine</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-scale-in">
            <p className="text-center font-semibold text-foreground">PHL17</p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-md hover:shadow-lg transition-all animate-scale-in">
            <p className="text-center font-semibold text-foreground">NJ.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PressSection;
