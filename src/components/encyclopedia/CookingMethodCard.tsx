import type { CookingMethod } from "@/data/encyclopediaData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Thermometer } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CookingMethodCardProps {
  method: CookingMethod;
}

const CookingMethodCard = ({ method }: CookingMethodCardProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{method.name}</CardTitle>
        <p className="text-sm text-muted-foreground">{method.description}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {method.temperature && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Thermometer className="h-3 w-3" />
              {method.temperature}
            </Badge>
          )}
          {method.time && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {method.time}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="steps" className="border-b-0">
            <AccordionTrigger className="text-sm font-medium py-2">
              Steps ({method.steps.length})
            </AccordionTrigger>
            <AccordionContent>
              <ol className="space-y-2 text-sm text-muted-foreground list-decimal list-inside">
                {method.steps.map((step, index) => (
                  <li key={index} className="leading-relaxed">{step}</li>
                ))}
              </ol>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="tips" className="border-b-0">
            <AccordionTrigger className="text-sm font-medium py-2">
              Pro Tips ({method.tips.length})
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 text-sm text-muted-foreground list-disc list-inside">
                {method.tips.map((tip, index) => (
                  <li key={index} className="leading-relaxed">{tip}</li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CookingMethodCard;
