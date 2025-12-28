import type { SandwichInfo } from "@/data/encyclopediaData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SandwichCardProps {
  sandwich: SandwichInfo;
}

const SandwichCard = ({ sandwich }: SandwichCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{sandwich.name}</CardTitle>
          <span className="text-2xl shrink-0" aria-label={`${sandwich.origin} flag`}>
            {sandwich.flag}
          </span>
        </div>
        <p className="text-xs text-muted-foreground font-medium">{sandwich.origin}</p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
          {sandwich.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sandwich.keyIngredients.slice(0, 4).map((ingredient) => (
            <Badge key={ingredient} variant="secondary" className="text-xs">
              {ingredient}
            </Badge>
          ))}
          {sandwich.keyIngredients.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{sandwich.keyIngredients.length - 4} more
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SandwichCard;
