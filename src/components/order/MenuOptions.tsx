import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Sandwich, Utensils, Cookie, Leaf, Wheat, Info, AlertCircle } from "lucide-react";
import { CateringOrderFormData, MenuSelection } from "@/types/cateringOrder";
import { getMenuItemsByPackage, MenuItem, desserts } from "@/data/menuItems";
import { packageConfigs, DEFAULT_GLUTEN_FREE_LIMIT, formatCurrency, DESSERT_PRICE_PER_PERSON } from "@/lib/pricing";
import { cn } from "@/lib/utils";

interface MenuOptionsProps {
  formData: CateringOrderFormData;
  onUpdate: (data: Partial<CateringOrderFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

export const MenuOptions = ({ formData, onUpdate, onBack, onNext }: MenuOptionsProps) => {
  const menuItems = getMenuItemsByPackage(formData.packageType);
  const config = packageConfigs[formData.packageType];
  const maxSelections = config.maxSandwichSelections || 7; // Default 7 for simple menu

  const toggleSandwich = (item: MenuItem) => {
    const isSelected = formData.selectedSandwiches.some(s => s.itemId === item.id);
    
    if (isSelected) {
      onUpdate({
        selectedSandwiches: formData.selectedSandwiches.filter(s => s.itemId !== item.id),
      });
    } else if (formData.selectedSandwiches.length < maxSelections) {
      onUpdate({
        selectedSandwiches: [
          ...formData.selectedSandwiches,
          { itemId: item.id, name: item.name },
        ],
      });
    }
  };

  const toggleHotDog = (item: MenuItem) => {
    const isSelected = formData.selectedHotDogs.some(s => s.itemId === item.id);
    
    if (isSelected) {
      onUpdate({
        selectedHotDogs: formData.selectedHotDogs.filter(s => s.itemId !== item.id),
      });
    } else {
      onUpdate({
        selectedHotDogs: [
          ...formData.selectedHotDogs,
          { itemId: item.id, name: item.name },
        ],
      });
    }
  };

  const updateDietaryOptions = (field: keyof typeof formData.dietaryOptions, value: string | number) => {
    onUpdate({
      dietaryOptions: {
        ...formData.dietaryOptions,
        [field]: value,
      },
    });
  };

  const toggleDesserts = (include: boolean) => {
    onUpdate({
      includeDesserts: include,
      selectedDesserts: include ? formData.selectedDesserts : [],
    });
  };

  const handleNext = () => {
    if (formData.selectedSandwiches.length > 0 || formData.selectedHotDogs.length > 0) {
      onNext();
    }
  };

  const hasMenuSelection = formData.selectedSandwiches.length > 0 || formData.selectedHotDogs.length > 0;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Menu Selection</h2>
        <p className="text-muted-foreground">
          Choose the items you'd like served at your event
        </p>
      </div>

      {/* Sandwiches */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sandwich className="w-5 h-5 text-primary" />
            Grilled Cheese Sandwiches
          </CardTitle>
          <CardDescription>
            Select up to {maxSelections} sandwiches ({formData.selectedSandwiches.length}/{maxSelections} selected)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {menuItems.sandwiches.map((item) => {
              const isSelected = formData.selectedSandwiches.some(s => s.itemId === item.id);
              const isDisabled = !isSelected && formData.selectedSandwiches.length >= maxSelections;
              
              return (
                <div
                  key={item.id}
                  onClick={() => !isDisabled && toggleSandwich(item)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    isSelected && "border-primary bg-primary/5 ring-1 ring-primary",
                    !isSelected && !isDisabled && "hover:border-primary/50 hover:bg-muted/50",
                    isDisabled && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{item.name}</span>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Info className="w-3.5 h-3.5 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p>{item.description}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                      <div className="flex gap-1 mt-1">
                        {item.isVegetarian && (
                          <Badge variant="outline" className="text-xs py-0">
                            <Leaf className="w-3 h-3 mr-1" /> Veg
                          </Badge>
                        )}
                        {item.isVegan && (
                          <Badge variant="outline" className="text-xs py-0">
                            <Leaf className="w-3 h-3 mr-1" /> Vegan
                          </Badge>
                        )}
                        {item.hasGlutenFreeOption && (
                          <Badge variant="outline" className="text-xs py-0">
                            <Wheat className="w-3 h-3 mr-1" /> GF
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Checkbox checked={isSelected} disabled={isDisabled} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Hot Dogs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5 text-primary" />
            Hot Dogs
          </CardTitle>
          <CardDescription>
            All hot dogs are included with your package
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {menuItems.hotDogs.map((item) => {
              const isSelected = formData.selectedHotDogs.some(s => s.itemId === item.id);
              
              return (
                <div
                  key={item.id}
                  onClick={() => toggleHotDog(item)}
                  className={cn(
                    "p-4 rounded-lg border cursor-pointer transition-all",
                    isSelected && "border-primary bg-primary/5 ring-1 ring-primary",
                    !isSelected && "hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <span className="font-medium text-sm">{item.name}</span>
                      <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                    </div>
                    <Checkbox checked={isSelected} />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Dietary Options */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wheat className="w-5 h-5 text-primary" />
            Dietary Accommodations
          </CardTitle>
          <CardDescription>
            Let us know about any dietary needs
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="glutenFree">Gluten-Free Servings</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="glutenFree"
                  type="number"
                  min="0"
                  max={formData.guestCount}
                  value={formData.dietaryOptions.glutenFreeCount}
                  onChange={(e) => updateDietaryOptions('glutenFreeCount', parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">people</span>
              </div>
              {formData.dietaryOptions.glutenFreeCount > DEFAULT_GLUTEN_FREE_LIMIT && (
                <div className="flex items-center gap-1 mt-2 text-xs text-accent">
                  <AlertCircle className="w-3 h-3" />
                  More than {DEFAULT_GLUTEN_FREE_LIMIT} GF servings - we'll confirm availability
                </div>
              )}
            </div>
            
            <div>
              <Label htmlFor="vegan">Vegan Servings</Label>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  id="vegan"
                  type="number"
                  min="0"
                  max={formData.guestCount}
                  value={formData.dietaryOptions.veganCount}
                  onChange={(e) => updateDietaryOptions('veganCount', parseInt(e.target.value) || 0)}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">people</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="specialNotes">Special Requests or Allergies</Label>
            <Textarea
              id="specialNotes"
              placeholder="Any specific dietary restrictions, allergies, or special requests..."
              value={formData.dietaryOptions.specialNotes}
              onChange={(e) => updateDietaryOptions('specialNotes', e.target.value)}
              className="mt-1"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Desserts Add-on */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="w-5 h-5 text-primary" />
            Desserts (Add-on)
          </CardTitle>
          <CardDescription>
            Add homemade desserts for {formatCurrency(DESSERT_PRICE_PER_PERSON)}/person
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox
                id="includeDesserts"
                checked={formData.includeDesserts}
                onCheckedChange={(checked) => toggleDesserts(checked as boolean)}
              />
              <Label htmlFor="includeDesserts" className="cursor-pointer">
                Add desserts to my order (+{formatCurrency(DESSERT_PRICE_PER_PERSON * formData.guestCount)} for {formData.guestCount} guests)
              </Label>
            </div>
            
            {formData.includeDesserts && (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t">
                {desserts.map((item) => (
                  <div key={item.id} className="p-3 rounded-lg bg-muted/50">
                    <span className="font-medium text-sm">{item.name}</span>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Validation Message */}
      {!hasMenuSelection && (
        <div className="flex items-center gap-2 p-4 bg-destructive/10 text-destructive rounded-lg">
          <AlertCircle className="w-5 h-5" />
          <span>Please select at least one sandwich or hot dog</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={handleNext} size="lg" disabled={!hasMenuSelection}>
          Review Your Order
        </Button>
      </div>
    </div>
  );
};
