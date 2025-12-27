import { BookOpen } from "lucide-react";

interface DefinitionBoxProps {
  term: string;
  definition: string;
  className?: string;
}

const DefinitionBox = ({ term, definition, className = "" }: DefinitionBoxProps) => {
  return (
    <div className={`bg-primary/5 border border-primary/20 p-6 rounded-lg mb-8 ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        <BookOpen className="h-5 w-5 text-primary" />
        <span className="font-bold text-foreground">Definition:</span>
      </div>
      <p className="text-foreground leading-relaxed">
        <strong>{term}</strong> {definition}
      </p>
    </div>
  );
};

export default DefinitionBox;
