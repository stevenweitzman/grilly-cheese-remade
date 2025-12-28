import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { encyclopediaSections } from "@/data/encyclopediaData";
import { 
  BookOpen, History, Flag, MapPin, Sparkles, Circle, Wheat, 
  Flame, Grid3X3, Globe, ChefHat, Menu, X 
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  BookOpen, History, Flag, MapPin, Sparkles, Circle, Wheat, 
  Flame, Grid3X3, Globe, ChefHat,
};

interface TableOfContentsProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
}

const TableOfContents = ({ activeSection, onSectionClick }: TableOfContentsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (sectionId: string) => {
    onSectionClick(sectionId);
    setIsOpen(false);
  };

  const NavContent = () => (
    <nav className="space-y-1">
      {encyclopediaSections.map((section) => {
        const Icon = iconMap[section.icon] || BookOpen;
        const isActive = activeSection === section.id;
        
        return (
          <button
            key={section.id}
            onClick={() => handleClick(section.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all text-left",
              isActive 
                ? "bg-primary text-primary-foreground font-medium" 
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{section.title}</span>
          </button>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-4 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wide">
            Contents
          </h3>
          <NavContent />
        </div>
      </aside>

      {/* Mobile Sheet Trigger */}
      <div className="lg:hidden fixed bottom-20 left-4 z-40">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button size="lg" className="rounded-full shadow-lg h-14 w-14">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Table of Contents</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pt-12">
            <h3 className="font-semibold text-foreground mb-4 text-lg">
              Encyclopedia Contents
            </h3>
            <NavContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default TableOfContents;
