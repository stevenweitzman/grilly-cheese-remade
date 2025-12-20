import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Minus, ShoppingCart, Leaf, Info, TrendingDown, Package, UtensilsCrossed, Flame, Wheat } from "lucide-react";
import { DropoffOrderFormData, CartItem } from "@/types/cateringOrder";
import { allSandwiches, hotDogs, breakfast, sides, beverages, desserts, MenuItem } from "@/data/menuItems";
import { 
  formatCurrency, 
  createCartItem, 
  updateCartItemQuantity, 
  getBulkDiscountTier,
  BULK_DISCOUNT_TIERS,
  INDIVIDUAL_PACKAGING_FEE,
  TRAY_SERVINGS,
  CHAFING_DISH_FEE_PER_10_ITEMS,
  CHAFING_DISH_FEE_PER_TRAY,
  GLUTEN_FREE_UPCHARGE
} from "@/lib/dropoff-pricing";

// ============= CONFIGURABLE COPY =============
// These labels can be adjusted without changing code logic

const COPY = {
  // Global catering notice
  cateringNoticeTitle: "You're building a catering order",
  cateringNoticeBody: "Prices shown are base prices only. Bulk discounts, gratuity, and delivery fees are applied on the final review step based on your total quantities and location.",
  
  // Price display format
  basePriceLabel: "From",
  priceNote: "final price at checkout",
  
  // Category subtitles
  standardSandwichSubtitle: "Classic favorites",
  premiumSandwichSubtitle: "Gourmet creations",
  hotDogSubtitle: "All-beef hot dogs",
  breakfastSubtitle: "Morning favorites",
  sidesSubtitle: "Party trays (serves ~15)",
  dessertsSubtitle: "Sweet treats",
  beveragesSubtitle: "Refreshments",
  
  // Cart summary
  cartEmptyLabel: "Start adding items to build your order",
  entreesLabel: "entrées",
  extrasLabel: "extras",
  bulkDiscountTierLabel: "Current catering tier",
  bulkDiscountNote: "Exact discount calculated at checkout",
  
  // Packaging option
  packagingTitle: "Individual Packaging",
  packagingDescription: "Wrap each item separately for easy distribution",
  packagingPriceNote: "+$0.50 per item ($7.50 per tray)",
  
  // Paper goods option
  paperGoodsTitle: "Paper Plates, Utensils & Napkins",
  paperGoodsDescription: "Include disposable plates, forks, knives, and napkins",
  paperGoodsPriceNote: "Included free",
  
  // Chafing dishes option
  chafingDishTitle: "Chafing Dishes",
  chafingDishDescription: "Keep your food warm with chafing dishes and fuel",
  chafingDishPriceNote: "$15 per 10 items, $15 per tray",
  
  // Gluten-free option
  glutenFreeTitle: "Gluten-Free Bread Substitution",
  glutenFreeDescription: "Substitute gluten-free bread on any sandwich",
  glutenFreePriceNote: "+$2.00 per sandwich",
  
  // Tier names
  tierNames: {
    0: "Small (1–24)",
    5: "Medium (25–49) – 5% off",
    10: "Large (50–99) – 10% off",
    15: "XL (100+) – 15% off",
  } as Record<number, string>,
};

interface MenuCartProps {
  formData: DropoffOrderFormData;
  onUpdate: (data: Partial<DropoffOrderFormData>) => void;
  onNext: () => void;
}

export const MenuCart = ({ formData, onUpdate, onNext }: MenuCartProps) => {
  const [activeTab, setActiveTab] = useState("sandwiches");

  const getItemQuantity = (itemId: string): number => {
    const cartItem = formData.cart.find(item => item.itemId === itemId);
    return cartItem?.quantity || 0;
  };

  const updateCart = (menuItem: MenuItem, delta: number) => {
    const existingIndex = formData.cart.findIndex(item => item.itemId === menuItem.id);
    const currentQty = existingIndex >= 0 ? formData.cart[existingIndex].quantity : 0;
    const newQty = Math.max(0, currentQty + delta);

    let newCart: CartItem[];

    if (newQty === 0) {
      newCart = formData.cart.filter(item => item.itemId !== menuItem.id);
    } else if (existingIndex >= 0) {
      newCart = [...formData.cart];
      newCart[existingIndex] = updateCartItemQuantity(newCart[existingIndex], newQty);
    } else {
      const newItem = createCartItem(
        menuItem.id,
        menuItem.name,
        menuItem.category,
        newQty,
        menuItem.pricingTier,
        menuItem.isEntree
      );
      newCart = [...formData.cart, newItem];
    }

    onUpdate({ cart: newCart });
  };

  // Calculate cart stats
  const entreeCount = formData.cart
    .filter(item => item.isEntree)
    .reduce((sum, item) => sum + item.quantity, 0);
  const extrasCount = formData.cart
    .filter(item => !item.isEntree)
    .reduce((sum, item) => sum + item.quantity, 0);
  const totalItems = entreeCount + extrasCount;
  
  // Get current bulk discount tier
  const currentTier = getBulkDiscountTier(entreeCount);
  const currentTierName = COPY.tierNames[currentTier.discountPercent] || "Small (1–24)";
  
  // Find next tier for encouragement
  const currentTierIndex = BULK_DISCOUNT_TIERS.findIndex(t => t.discountPercent === currentTier.discountPercent);
  const nextTier = currentTierIndex < BULK_DISCOUNT_TIERS.length - 1 
    ? BULK_DISCOUNT_TIERS[currentTierIndex + 1] 
    : null;
  const entreesToNextTier = nextTier ? nextTier.minQty - entreeCount : 0;

  // Calculate estimated packaging fee for display
  const estimatedPackagingFee = formData.wantsIndividualPackaging 
    ? formData.cart.reduce((sum, item) => {
        if (item.pricingTier === 'SIDE_PER_TRAY') {
          return sum + INDIVIDUAL_PACKAGING_FEE * TRAY_SERVINGS * item.quantity;
        }
        return sum + INDIVIDUAL_PACKAGING_FEE * item.quantity;
      }, 0)
    : 0;

  // Calculate estimated chafing dish fee for display
  const estimatedChafingFee = formData.wantsChafingDishes 
    ? (() => {
        let fee = 0;
        let individualItemCount = 0;
        for (const item of formData.cart) {
          if (item.pricingTier === 'SIDE_PER_TRAY') {
            fee += CHAFING_DISH_FEE_PER_TRAY * item.quantity;
          } else if (item.isEntree) {
            individualItemCount += item.quantity;
          }
        }
        if (individualItemCount > 0) {
          fee += Math.ceil(individualItemCount / 10) * CHAFING_DISH_FEE_PER_10_ITEMS;
        }
        return fee;
      })()
    : 0;

  // Count total sandwiches for max gluten-free
  const totalSandwiches = formData.cart
    .filter(item => item.category === 'sandwich')
    .reduce((sum, item) => sum + item.quantity, 0);

  // Calculate gluten-free fee for display
  const glutenFreeFeeDisplay = formData.glutenFreeCount * GLUTEN_FREE_UPCHARGE;

  const renderMenuItem = (item: MenuItem) => {
    const quantity = getItemQuantity(item.id);
    
    return (
      <div
        key={item.id}
        className={`p-4 rounded-lg border transition-all ${
          quantity > 0 
            ? 'border-primary bg-primary/5' 
            : 'border-border hover:border-primary/50'
        }`}
      >
        <div className="flex justify-between items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-medium">{item.name}</h4>
              {item.isVegan && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <Leaf className="w-3 h-3 mr-1" />VG
                </Badge>
              )}
              {item.isVegetarian && !item.isVegan && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <Leaf className="w-3 h-3 mr-1" />V
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <p className="text-sm">
              <span className="text-muted-foreground">{COPY.basePriceLabel}</span>{' '}
              <span className="font-semibold text-primary">{formatCurrency(item.unitPrice)}</span>
              <span className="text-muted-foreground"> {item.unitLabel}</span>
              {item.isEntree && (
                <span className="text-xs text-muted-foreground/70 ml-1">
                  · {COPY.priceNote}
                </span>
              )}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {quantity > 0 ? (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateCart(item, -1)}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => updateCart(item, 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => updateCart(item, 1)}
              >
                <Plus className="h-4 w-4 mr-1" />
                Add
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Build Your Catering Order</h2>
        <p className="text-muted-foreground">
          Select items from our menu to build your catering package.
        </p>
      </div>

      {/* Catering Pricing Notice */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="py-4">
          <div className="flex gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground mb-1">{COPY.cateringNoticeTitle}</p>
              <p className="text-sm text-muted-foreground">{COPY.cateringNoticeBody}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cart Summary with Tier Info */}
      <Card className={`${totalItems > 0 ? 'border-primary/50 bg-primary/5' : ''}`}>
        <CardContent className="py-4">
          {totalItems === 0 ? (
            <div className="flex items-center gap-2 text-muted-foreground">
              <ShoppingCart className="w-5 h-5" />
              <span>{COPY.cartEmptyLabel}</span>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Items count */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {entreeCount > 0 && `${entreeCount} ${COPY.entreesLabel}`}
                    {entreeCount > 0 && extrasCount > 0 && ' + '}
                    {extrasCount > 0 && `${extrasCount} ${COPY.extrasLabel}`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1 justify-end">
                  {formData.cart.slice(0, 4).map(item => (
                    <Badge key={item.itemId} variant="secondary" className="text-xs">
                      {item.quantity}× {item.name.split(' ').slice(0, 2).join(' ')}
                    </Badge>
                  ))}
                  {formData.cart.length > 4 && (
                    <Badge variant="secondary" className="text-xs">
                      +{formData.cart.length - 4} more
                    </Badge>
                  )}
                </div>
              </div>

              {/* Bulk Discount Tier Info */}
              {entreeCount > 0 && (
                <div className="pt-2 border-t border-border/50">
                  <div className="flex items-start gap-2">
                    <TrendingDown className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="text-foreground">
                        <span className="font-medium">{COPY.bulkDiscountTierLabel}:</span>{' '}
                        <span className="text-primary font-semibold">{currentTierName}</span>
                      </p>
                      <p className="text-muted-foreground text-xs">{COPY.bulkDiscountNote}</p>
                      {nextTier && entreesToNextTier > 0 && (
                        <p className="text-green-700 text-xs mt-1">
                          Add {entreesToNextTier} more entrée{entreesToNextTier !== 1 ? 's' : ''} to unlock {nextTier.discountPercent}% off!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Individual Packaging Option */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2">
                    <Package className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <Label htmlFor="packaging-toggle" className="text-sm font-medium cursor-pointer">
                        {COPY.packagingTitle}
                      </Label>
                      <p className="text-xs text-muted-foreground">{COPY.packagingDescription}</p>
                      <p className="text-xs text-primary/80 mt-0.5">{COPY.packagingPriceNote}</p>
                    </div>
                  </div>
                  <Switch
                    id="packaging-toggle"
                    checked={formData.wantsIndividualPackaging}
                    onCheckedChange={(checked) => onUpdate({ wantsIndividualPackaging: checked })}
                  />
                </div>
                {formData.wantsIndividualPackaging && estimatedPackagingFee > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 pl-6">
                    Est. packaging: {formatCurrency(estimatedPackagingFee)}
                  </p>
                )}
              </div>

              {/* Paper Goods Option */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2">
                    <UtensilsCrossed className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <Label htmlFor="paper-goods-toggle" className="text-sm font-medium cursor-pointer">
                        {COPY.paperGoodsTitle}
                      </Label>
                      <p className="text-xs text-muted-foreground">{COPY.paperGoodsDescription}</p>
                      <p className="text-xs text-green-600 mt-0.5">{COPY.paperGoodsPriceNote}</p>
                    </div>
                  </div>
                  <Switch
                    id="paper-goods-toggle"
                    checked={formData.wantsPaperGoods}
                    onCheckedChange={(checked) => onUpdate({ wantsPaperGoods: checked })}
                  />
                </div>
              </div>

              {/* Chafing Dishes Option */}
              <div className="pt-3 border-t border-border/50">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-2">
                    <Flame className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <Label htmlFor="chafing-toggle" className="text-sm font-medium cursor-pointer">
                        {COPY.chafingDishTitle}
                      </Label>
                      <p className="text-xs text-muted-foreground">{COPY.chafingDishDescription}</p>
                      <p className="text-xs text-primary/80 mt-0.5">{COPY.chafingDishPriceNote}</p>
                    </div>
                  </div>
                  <Switch
                    id="chafing-toggle"
                    checked={formData.wantsChafingDishes}
                    onCheckedChange={(checked) => onUpdate({ wantsChafingDishes: checked })}
                  />
                </div>
                {formData.wantsChafingDishes && estimatedChafingFee > 0 && (
                  <p className="text-xs text-muted-foreground mt-2 pl-6">
                    Est. chafing dishes: {formatCurrency(estimatedChafingFee)}
                  </p>
                )}
              </div>

              {/* Gluten-Free Option */}
              {totalSandwiches > 0 && (
                <div className="pt-3 border-t border-border/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-2">
                      <Wheat className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <Label className="text-sm font-medium">
                          {COPY.glutenFreeTitle}
                        </Label>
                        <p className="text-xs text-muted-foreground">{COPY.glutenFreeDescription}</p>
                        <p className="text-xs text-primary/80 mt-0.5">{COPY.glutenFreePriceNote}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdate({ glutenFreeCount: Math.max(0, formData.glutenFreeCount - 1) })}
                        disabled={formData.glutenFreeCount <= 0}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{formData.glutenFreeCount}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onUpdate({ glutenFreeCount: Math.min(totalSandwiches, formData.glutenFreeCount + 1) })}
                        disabled={formData.glutenFreeCount >= totalSandwiches}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {formData.glutenFreeCount > 0 && (
                    <p className="text-xs text-muted-foreground mt-2 pl-6">
                      GF bread upcharge: {formatCurrency(glutenFreeFeeDisplay)}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Menu Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 sm:grid-cols-6 h-auto">
          <TabsTrigger value="sandwiches" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Sandwiches</TabsTrigger>
          <TabsTrigger value="hotdogs" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Hot Dogs</TabsTrigger>
          <TabsTrigger value="breakfast" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Breakfast</TabsTrigger>
          <TabsTrigger value="sides" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Sides</TabsTrigger>
          <TabsTrigger value="desserts" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Desserts</TabsTrigger>
          <TabsTrigger value="beverages" className="text-xs sm:text-sm px-1 sm:px-3 py-2">Drinks</TabsTrigger>
        </TabsList>

        <TabsContent value="sandwiches" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Classic Grilled Cheese</h3>
            <p className="text-sm text-muted-foreground">{COPY.standardSandwichSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {allSandwiches.filter(s => s.pricingTier === 'SANDWICH_STANDARD').map(renderMenuItem)}
          </div>
          
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-1">Premium Specialty Sandwiches</h3>
            <p className="text-sm text-muted-foreground">{COPY.premiumSandwichSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {allSandwiches.filter(s => s.pricingTier === 'SANDWICH_PREMIUM').map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="hotdogs" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Hot Dogs</h3>
            <p className="text-sm text-muted-foreground">{COPY.hotDogSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {hotDogs.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="breakfast" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Breakfast Sandwiches</h3>
            <p className="text-sm text-muted-foreground">{COPY.breakfastSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {breakfast.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="sides" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Sides</h3>
            <p className="text-sm text-muted-foreground">{COPY.sidesSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {sides.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="desserts" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Desserts</h3>
            <p className="text-sm text-muted-foreground">{COPY.dessertsSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {desserts.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="beverages" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Beverages</h3>
            <p className="text-sm text-muted-foreground">{COPY.beveragesSubtitle}</p>
          </div>
          <div className="grid gap-3">
            {beverages.map(renderMenuItem)}
          </div>
        </TabsContent>
      </Tabs>

      {/* Navigation */}
      <div className="flex justify-end pt-4">
        <Button 
          onClick={onNext} 
          size="lg" 
          disabled={totalItems === 0}
        >
          Continue to Event Details
        </Button>
      </div>
    </div>
  );
};
