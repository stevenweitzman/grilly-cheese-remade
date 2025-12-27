import { Check, X, Minus } from "lucide-react";

interface ComparisonRow {
  feature: string;
  foodTruck: boolean | string;
  traditional: boolean | string;
}

interface ComparisonTableProps {
  rows: ComparisonRow[];
  headers?: { left: string; right: string };
  className?: string;
}

const ComparisonTable = ({ 
  rows, 
  headers = { left: "Food Truck", right: "Traditional Catering" },
  className = "" 
}: ComparisonTableProps) => {
  const renderCell = (value: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <Check className="h-5 w-5 text-green-600 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-red-500 mx-auto" />
      );
    }
    if (value === "partial") {
      return <Minus className="h-5 w-5 text-yellow-500 mx-auto" />;
    }
    return <span className="text-sm">{value}</span>;
  };

  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr className="bg-accent/10">
            <th className="text-left p-4 font-bold text-foreground border-b border-border">Feature</th>
            <th className="text-center p-4 font-bold text-foreground border-b border-border">{headers.left}</th>
            <th className="text-center p-4 font-bold text-foreground border-b border-border">{headers.right}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
              <td className="p-4 text-foreground border-b border-border">{row.feature}</td>
              <td className="p-4 text-center border-b border-border">{renderCell(row.foodTruck)}</td>
              <td className="p-4 text-center border-b border-border">{renderCell(row.traditional)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonTable;
