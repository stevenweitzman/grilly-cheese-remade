import type { SandwichInfo } from "@/data/encyclopediaData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SandwichCardProps {
  sandwich: SandwichInfo;
}

const SandwichCard = ({ sandwich }: SandwichCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden group">
      {sandwich.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={sandwich.image}
            alt={`${sandwich.name} from ${sandwich.origin}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <span 
            className="absolute bottom-2 right-2 text-2xl drop-shadow-lg" 
            aria-label={`${sandwich.origin} flag`}
          >
            {sandwich.flag}
          </span>
        </div>
      )}
      <CardHeader className={sandwich.image ? "pb-2 pt-3" : "pb-3"}>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{sandwich.name}</CardTitle>
          {!sandwich.image && (
            <span className="text-2xl shrink-0" aria-label={`${sandwich.origin} flag`}>
              {sandwich.flag}
            </span>
          )}
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
