import { useState } from "react";
import { cheeseGuideData } from "@/data/encyclopediaData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import cheeseHeroImage from "@/assets/encyclopedia/cheese-variety-hero.jpg";

const categories = ["All", "Processed", "Alpine", "Cheddar", "Fresh", "Soft", "Smoked", "Italian", "Aged"];

const CheeseGuideTable = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCheeses = activeCategory === "All" 
    ? cheeseGuideData 
    : cheeseGuideData.filter(cheese => cheese.category === activeCategory);

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div className="relative rounded-xl overflow-hidden h-48 md:h-64">
        <img
          src={cheeseHeroImage}
          alt="Variety of artisan cheeses on a rustic wooden board"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl md:text-2xl font-bold text-white drop-shadow-lg">
            Choose the Perfect Cheese
          </h3>
          <p className="text-white/90 text-sm md:text-base drop-shadow">
            Each cheese brings unique melting properties and flavors
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category)}
            className="text-xs"
          >
            {category}
          </Button>
        ))}
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Cheese</TableHead>
              <TableHead className="font-semibold">Category</TableHead>
              <TableHead className="font-semibold">Melting Properties</TableHead>
              <TableHead className="font-semibold">Flavor</TableHead>
              <TableHead className="font-semibold">Best Uses</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCheeses.map((cheese) => (
              <TableRow key={cheese.name}>
                <TableCell className="font-medium">{cheese.name}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{cheese.category}</Badge>
                </TableCell>
                <TableCell className="text-sm">{cheese.meltingProperties}</TableCell>
                <TableCell className="text-sm">{cheese.flavor}</TableCell>
                <TableCell className="text-sm">{cheese.bestUses}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredCheeses.map((cheese) => (
          <div key={cheese.name} className="bg-card rounded-lg border border-border p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold">{cheese.name}</h4>
              <Badge variant="secondary" className="text-xs">{cheese.category}</Badge>
            </div>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Melt:</span> {cheese.meltingProperties}</p>
              <p><span className="font-medium text-foreground">Flavor:</span> {cheese.flavor}</p>
              <p><span className="font-medium text-foreground">Best for:</span> {cheese.bestUses}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheeseGuideTable;
