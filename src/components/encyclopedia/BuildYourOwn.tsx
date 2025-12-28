import { useState, useMemo } from "react";
import { buildYourOwnIngredients } from "@/data/encyclopediaData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Printer, Share2, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface Selections {
  [category: string]: string[];
}

const BuildYourOwn = () => {
  const [selections, setSelections] = useState<Selections>({});

  const handleToggle = (category: string, item: string, maxSelections?: number) => {
    setSelections(prev => {
      const current = prev[category] || [];
      
      if (current.includes(item)) {
        // Remove item
        return { ...prev, [category]: current.filter(i => i !== item) };
      } else {
        // Add item (respecting max selections)
        if (maxSelections && current.length >= maxSelections) {
          // Remove first item and add new one
          return { ...prev, [category]: [...current.slice(1), item] };
        }
        return { ...prev, [category]: [...current, item] };
      }
    });
  };

  const isSelected = (category: string, item: string) => {
    return (selections[category] || []).includes(item);
  };

  const totalSelections = useMemo(() => {
    return Object.values(selections).flat().filter(s => s !== "None").length;
  }, [selections]);

  const generatedRecipe = useMemo(() => {
    const bread = selections["Bread"]?.[0] || "your chosen bread";
    const spread = selections["Spread"]?.[0] || "butter";
    const primaryCheese = selections["Primary Cheese"]?.join(" and ") || "your favorite cheese";
    const secondaryCheese = selections["Secondary Cheese"]?.filter(c => c !== "None")[0];
    const proteins = selections["Protein"]?.filter(p => p !== "None").join(" and ");
    const vegetables = selections["Vegetables"]?.join(", ");
    const enhancers = selections["Flavor Enhancer"]?.filter(e => e !== "None").join(" and ");
    const method = selections["Cooking Method"]?.[0] || "skillet";

    const parts: string[] = [];
    parts.push(`1. Spread ${spread} on the outer sides of two slices of ${bread}.`);
    parts.push(`2. Layer ${primaryCheese}${secondaryCheese ? ` and ${secondaryCheese}` : ""} on the inner side.`);
    if (proteins) parts.push(`3. Add ${proteins} on top of the cheese.`);
    if (vegetables) parts.push(`${parts.length + 1}. Layer ${vegetables} for extra flavor.`);
    if (enhancers) parts.push(`${parts.length + 1}. Drizzle or add ${enhancers} for the finishing touch.`);
    parts.push(`${parts.length + 1}. Close the sandwich and cook using the ${method} method until golden brown.`);
    parts.push(`${parts.length + 1}. Let rest for 30 seconds, then slice and serve!`);

    return parts;
  }, [selections]);

  const handlePrint = () => {
    const printContent = `
      MY CUSTOM GRILLED CHEESE
      ========================
      
      Ingredients:
      ${Object.entries(selections)
        .filter(([_, items]) => items.length > 0 && !items.every(i => i === "None"))
        .map(([cat, items]) => `• ${cat}: ${items.filter(i => i !== "None").join(", ")}`)
        .join("\n")}
      
      Instructions:
      ${generatedRecipe.join("\n")}
    `;
    
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`<pre style="font-family: sans-serif; white-space: pre-wrap; padding: 20px;">${printContent}</pre>`);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const handleShare = async () => {
    const shareText = `Check out my custom grilled cheese! Ingredients: ${Object.values(selections).flat().filter(s => s !== "None").join(", ")}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: "My Custom Grilled Cheese", text: shareText });
      } catch {
        // User cancelled
      }
    } else {
      await navigator.clipboard.writeText(shareText);
      toast.success("Recipe copied to clipboard!");
    }
  };

  const handleReset = () => {
    setSelections({});
    toast.info("Selections cleared");
  };

  return (
    <div className="space-y-8">
      {/* Ingredient Selection Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {buildYourOwnIngredients.map((category) => (
          <Card key={category.category} className="h-fit">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{category.category}</CardTitle>
                {category.maxSelections && (
                  <Badge variant="outline" className="text-xs">
                    Max: {category.maxSelections}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-2 gap-2">
                {category.items.map((item) => {
                  const checked = isSelected(category.category, item.name);
                  return (
                    <label
                      key={item.name}
                      className={`flex items-start gap-2 p-2 rounded-lg border cursor-pointer transition-all ${
                        checked 
                          ? "bg-primary/10 border-primary" 
                          : "bg-card border-border hover:border-muted-foreground/50"
                      }`}
                    >
                      <Checkbox
                        checked={checked}
                        onCheckedChange={() => handleToggle(category.category, item.name, category.maxSelections)}
                        className="mt-0.5"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-tight">{item.name}</p>
                        {item.description && (
                          <p className="text-xs text-muted-foreground truncate">{item.description}</p>
                        )}
                      </div>
                    </label>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Live Preview & Recipe */}
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle>Your Custom Creation</CardTitle>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset
              </Button>
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer className="h-4 w-4 mr-1" />
                Print
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4 mr-1" />
                Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {totalSelections === 0 ? (
            <p className="text-muted-foreground text-center py-8">
              Start selecting ingredients above to build your perfect grilled cheese!
            </p>
          ) : (
            <div className="space-y-6">
              {/* Ingredient Summary */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Selected Ingredients</h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(selections).map(([category, items]) => 
                    items.filter(i => i !== "None").map(item => (
                      <Badge key={`${category}-${item}`} variant="secondary">
                        {item}
                      </Badge>
                    ))
                  )}
                </div>
              </div>

              {/* Visual Stack */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Your Sandwich Stack</h4>
                <div className="bg-card rounded-lg p-4 border border-border space-y-1">
                  {/* Top bread */}
                  <div className="bg-amber-200 dark:bg-amber-800 rounded-t-xl h-6 flex items-center justify-center text-xs font-medium">
                    {selections["Bread"]?.[0] || "Bread"} (top)
                  </div>
                  
                  {/* Spread */}
                  {selections["Spread"]?.[0] && (
                    <div className="bg-yellow-100 dark:bg-yellow-900/50 h-2" />
                  )}
                  
                  {/* Secondary cheese */}
                  {selections["Secondary Cheese"]?.filter(c => c !== "None")[0] && (
                    <div className="bg-orange-300 dark:bg-orange-700 h-4 flex items-center justify-center text-xs">
                      {selections["Secondary Cheese"]?.filter(c => c !== "None")[0]}
                    </div>
                  )}
                  
                  {/* Vegetables */}
                  {selections["Vegetables"]?.map((veg, i) => (
                    <div key={veg} className="bg-green-300 dark:bg-green-700 h-3 flex items-center justify-center text-xs">
                      {veg}
                    </div>
                  ))}
                  
                  {/* Protein */}
                  {selections["Protein"]?.filter(p => p !== "None").map((protein, i) => (
                    <div key={protein} className="bg-red-300 dark:bg-red-800 h-4 flex items-center justify-center text-xs">
                      {protein}
                    </div>
                  ))}
                  
                  {/* Primary cheese */}
                  {selections["Primary Cheese"]?.map((cheese, i) => (
                    <div key={cheese} className="bg-yellow-400 dark:bg-yellow-600 h-5 flex items-center justify-center text-xs font-medium">
                      {cheese}
                    </div>
                  ))}
                  
                  {/* Bottom bread */}
                  <div className="bg-amber-200 dark:bg-amber-800 rounded-b-xl h-6 flex items-center justify-center text-xs font-medium">
                    {selections["Bread"]?.[0] || "Bread"} (bottom)
                  </div>
                </div>
              </div>

              {/* Generated Recipe */}
              <div className="space-y-3">
                <h4 className="font-semibold text-sm uppercase tracking-wide text-muted-foreground">Cooking Instructions</h4>
                <ol className="space-y-2 text-sm">
                  {generatedRecipe.map((step, index) => (
                    <li key={index} className="text-muted-foreground">{step}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuildYourOwn;
