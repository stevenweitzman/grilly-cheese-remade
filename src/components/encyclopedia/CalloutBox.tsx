import { cn } from "@/lib/utils";
import { Lightbulb, Info, AlertTriangle, Sparkles } from "lucide-react";

type CalloutType = "tip" | "info" | "warning" | "didYouKnow";

interface CalloutBoxProps {
  type: CalloutType;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const calloutConfig = {
  tip: {
    icon: Lightbulb,
    defaultTitle: "Pro Tip",
    className: "bg-primary/10 border-primary/30 text-foreground",
    iconClassName: "text-primary",
  },
  info: {
    icon: Info,
    defaultTitle: "Note",
    className: "bg-muted border-border text-foreground",
    iconClassName: "text-muted-foreground",
  },
  warning: {
    icon: AlertTriangle,
    defaultTitle: "Important",
    className: "bg-destructive/10 border-destructive/30 text-foreground",
    iconClassName: "text-destructive",
  },
  didYouKnow: {
    icon: Sparkles,
    defaultTitle: "Did You Know?",
    className: "bg-accent/15 border-accent/40 text-foreground",
    iconClassName: "text-accent",
  },
};

const CalloutBox = ({ type, title, children, className }: CalloutBoxProps) => {
  const config = calloutConfig[type];
  const Icon = config.icon;

  return (
    <div 
      className={cn(
        "rounded-lg border-l-4 p-4 my-6",
        config.className,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", config.iconClassName)} />
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm mb-1">
            {title || config.defaultTitle}
          </p>
          <div className="text-sm text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalloutBox;
