import { breadGuideData } from "@/data/encyclopediaData";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const BreadGuideTable = () => {
  return (
    <div className="space-y-4">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Bread</TableHead>
              <TableHead className="font-semibold">Characteristics</TableHead>
              <TableHead className="font-semibold">Best Pairings</TableHead>
              <TableHead className="font-semibold">Slice Thickness</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {breadGuideData.map((bread) => (
              <TableRow key={bread.name}>
                <TableCell className="font-medium">{bread.name}</TableCell>
                <TableCell className="text-sm">{bread.characteristics}</TableCell>
                <TableCell className="text-sm">{bread.bestPairings}</TableCell>
                <TableCell className="text-sm">{bread.thickness}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {breadGuideData.map((bread) => (
          <div key={bread.name} className="bg-card rounded-lg border border-border p-4">
            <h4 className="font-semibold mb-2">{bread.name}</h4>
            <div className="space-y-1.5 text-sm text-muted-foreground">
              <p><span className="font-medium text-foreground">Style:</span> {bread.characteristics}</p>
              <p><span className="font-medium text-foreground">Pairs with:</span> {bread.bestPairings}</p>
              <p><span className="font-medium text-foreground">Thickness:</span> {bread.thickness}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadGuideTable;
