interface Step {
  title: string;
  description: string;
}

interface NumberedStepsProps {
  steps: Step[];
  className?: string;
}

const NumberedSteps = ({ steps, className = "" }: NumberedStepsProps) => {
  return (
    <ol className={`space-y-6 ${className}`}>
      {steps.map((step, index) => (
        <li key={index} className="flex gap-4">
          <div className="flex-shrink-0 w-10 h-10 bg-accent text-background rounded-full flex items-center justify-center font-bold text-lg">
            {index + 1}
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-1">{step.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};

export default NumberedSteps;
