interface PricingRow {
  category: string;
  range: string;
  perPerson?: string;
  notes?: string;
}

interface PricingTableProps {
  rows: PricingRow[];
  title?: string;
  className?: string;
}

const PricingTable = ({ rows, title, className = "" }: PricingTableProps) => {
  return (
    <div className={`${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-foreground mb-4">{title}</h3>
      )}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse bg-card rounded-lg overflow-hidden shadow-sm">
          <thead>
            <tr className="bg-accent/10">
              <th className="text-left p-4 font-bold text-foreground border-b border-border">Event Type</th>
              <th className="text-left p-4 font-bold text-foreground border-b border-border">Cost Range</th>
              {rows.some(r => r.perPerson) && (
                <th className="text-left p-4 font-bold text-foreground border-b border-border">Per Person</th>
              )}
              {rows.some(r => r.notes) && (
                <th className="text-left p-4 font-bold text-foreground border-b border-border">Notes</th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-background" : "bg-muted/20"}>
                <td className="p-4 text-foreground border-b border-border font-medium">{row.category}</td>
                <td className="p-4 text-foreground border-b border-border">{row.range}</td>
                {rows.some(r => r.perPerson) && (
                  <td className="p-4 text-foreground border-b border-border">{row.perPerson || "-"}</td>
                )}
                {rows.some(r => r.notes) && (
                  <td className="p-4 text-muted-foreground border-b border-border text-sm">{row.notes || "-"}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingTable;
