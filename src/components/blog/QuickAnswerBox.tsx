import { Lightbulb } from "lucide-react";

interface QuickAnswerBoxProps {
  answer: string;
  className?: string;
}

const QuickAnswerBox = ({ answer, className = "" }: QuickAnswerBoxProps) => {
  return (
    <div className={`bg-accent/10 border-l-4 border-accent p-6 rounded-r-lg mb-8 ${className}`}>
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-5 w-5 text-accent" />
        <span className="font-bold text-lg text-foreground">Quick Answer:</span>
      </div>
      <p className="text-foreground text-lg leading-relaxed">
        {answer}
      </p>
    </div>
  );
};

export default QuickAnswerBox;
