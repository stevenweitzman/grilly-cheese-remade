import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Minus, ShoppingCart, Leaf, Wheat } from "lucide-react";
import { DropoffOrderFormData, CartItem } from "@/types/cateringOrder";
import { allSandwiches, hotDogs, sides, beverages, desserts, MenuItem } from "@/data/menuItems";
import { formatCurrency, createCartItem, updateCartItemQuantity } from "@/lib/dropoff-pricing";

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
      // Remove item from cart
      newCart = formData.cart.filter(item => item.itemId !== menuItem.id);
    } else if (existingIndex >= 0) {
      // Update existing item
      newCart = [...formData.cart];
      newCart[existingIndex] = updateCartItemQuantity(newCart[existingIndex], newQty);
    } else {
      // Add new item
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

  const totalItems = formData.cart.reduce((sum, item) => sum + item.quantity, 0);

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
              {item.isVegetarian && !item.isVegan && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <Leaf className="w-3 h-3 mr-1" />V
                </Badge>
              )}
              {item.isVegan && (
                <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                  <Leaf className="w-3 h-3 mr-1" />VG
                </Badge>
              )}
              {item.hasGlutenFreeOption && (
                <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
                  <Wheat className="w-3 h-3 mr-1" />GF
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <p className="text-sm font-semibold text-primary">
              {formatCurrency(item.unitPrice)} <span className="text-muted-foreground font-normal">{item.unitLabel}</span>
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
        <h2 className="text-2xl font-bold text-foreground mb-2">Build Your Order</h2>
        <p className="text-muted-foreground">
          Select items from our menu. Only per-item prices are shown during selection.
        </p>
      </div>

      {/* Cart Summary */}
      <Card className={`${totalItems > 0 ? 'border-primary/50 bg-primary/5' : ''}`}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {totalItems === 0 
                  ? 'Your cart is empty' 
                  : `${totalItems} item${totalItems !== 1 ? 's' : ''} in cart`}
              </span>
            </div>
            {totalItems > 0 && (
              <div className="flex flex-wrap gap-1">
                {formData.cart.slice(0, 5).map(item => (
                  <Badge key={item.itemId} variant="secondary" className="text-xs">
                    {item.quantity}× {item.name.split(' ').slice(0, 2).join(' ')}
                  </Badge>
                ))}
                {formData.cart.length > 5 && (
                  <Badge variant="secondary" className="text-xs">
                    +{formData.cart.length - 5} more
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Menu Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="sandwiches">Sandwiches</TabsTrigger>
          <TabsTrigger value="hotdogs">Hot Dogs</TabsTrigger>
          <TabsTrigger value="sides">Sides</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="beverages">Beverages</TabsTrigger>
        </TabsList>

        <TabsContent value="sandwiches" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Classic Grilled Cheese</h3>
            <p className="text-sm text-muted-foreground">Our signature sandwiches at {formatCurrency(8)} each</p>
          </div>
          <div className="grid gap-3">
            {allSandwiches.filter(s => s.pricingTier === 'SANDWICH_STANDARD').map(renderMenuItem)}
          </div>
          
          <div className="mt-8 mb-4">
            <h3 className="text-lg font-semibold mb-2">Premium Specialty Sandwiches</h3>
            <p className="text-sm text-muted-foreground">Gourmet creations at {formatCurrency(12)} each</p>
          </div>
          <div className="grid gap-3">
            {allSandwiches.filter(s => s.pricingTier === 'SANDWICH_PREMIUM').map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="hotdogs" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Hot Dogs</h3>
            <p className="text-sm text-muted-foreground">All-beef hot dogs at {formatCurrency(6)} each</p>
          </div>
          <div className="grid gap-3">
            {hotDogs.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="sides" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Sides</h3>
            <p className="text-sm text-muted-foreground">Party trays at {formatCurrency(45)} each (serves ~15)</p>
          </div>
          <div className="grid gap-3">
            {sides.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="desserts" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Desserts</h3>
            <p className="text-sm text-muted-foreground">Sweet treats at {formatCurrency(24)} per dozen</p>
          </div>
          <div className="grid gap-3">
            {desserts.map(renderMenuItem)}
          </div>
        </TabsContent>

        <TabsContent value="beverages" className="mt-6 space-y-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Beverages</h3>
            <p className="text-sm text-muted-foreground">Drinks at {formatCurrency(2.5)} each</p>
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
