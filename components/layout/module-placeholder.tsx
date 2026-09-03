import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type TModulePlaceholderProps = {
  title: string;
  summary: string;
  columns: string[];
  notes: string[];
};

export function ModulePlaceholder({ title, summary, columns, notes }: TModulePlaceholderProps) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader className="border-b">
          <div className="flex items-center justify-between gap-3">
            <div>
              <CardTitle>{title}</CardTitle>
              <CardDescription>{summary}</CardDescription>
            </div>
            <Badge variant="secondary">Planned</Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={column} className="text-xs font-medium">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">
                  No rows yet. This module is scaffolded; data and actions land in a later phase.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card size="sm">
        <CardHeader>
          <CardTitle className="text-sm">Build notes</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
            {notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
