import { ExternalLink as ExternalLinkIcon } from "lucide-react";

interface ExternalLinkProps {
  href: string;
  children: React.ReactNode;
  showIcon?: boolean;
  className?: string;
}

const ExternalLink = ({ href, children, showIcon = false, className = "" }: ExternalLinkProps) => {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className={`text-accent hover:underline ${className}`}
    >
      {children}
      {showIcon && <ExternalLinkIcon className="inline-block h-3 w-3 ml-1" />}
    </a>
  );
};

export default ExternalLink;
