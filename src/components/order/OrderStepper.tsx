import { Check } from "lucide-react";
import { ORDER_STEPS, OrderStep } from "@/types/cateringOrder";
import { cn } from "@/lib/utils";

interface OrderStepperProps {
  currentStep: OrderStep;
  onStepClick?: (step: OrderStep) => void;
  completedSteps?: OrderStep[];
}

export const OrderStepper = ({ 
  currentStep, 
  onStepClick, 
  completedSteps = [] 
}: OrderStepperProps) => {
  return (
    <div className="w-full py-4">
      <div className="flex items-center justify-between">
        {ORDER_STEPS.map((stepInfo, index) => {
          const isCompleted = completedSteps.includes(stepInfo.step as OrderStep);
          const isCurrent = currentStep === stepInfo.step;
          const isClickable = onStepClick && (isCompleted || stepInfo.step <= currentStep);
          
          return (
            <div key={stepInfo.step} className="flex items-center flex-1">
              <div className="flex flex-col items-center w-full">
                <button
                  onClick={() => isClickable && onStepClick?.(stepInfo.step as OrderStep)}
                  disabled={!isClickable}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all",
                    isCompleted && "bg-primary text-primary-foreground",
                    isCurrent && !isCompleted && "bg-primary text-primary-foreground ring-4 ring-primary/20",
                    !isCurrent && !isCompleted && "bg-muted text-muted-foreground",
                    isClickable && "cursor-pointer hover:scale-105"
                  )}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    stepInfo.step
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p className={cn(
                    "text-sm font-medium",
                    isCurrent || isCompleted ? "text-foreground" : "text-muted-foreground"
                  )}>
                    {stepInfo.label}
                  </p>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {stepInfo.description}
                  </p>
                </div>
              </div>
              {index < ORDER_STEPS.length - 1 && (
                <div className={cn(
                  "h-0.5 flex-1 mx-2 mt-[-2rem]",
                  isCompleted ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
