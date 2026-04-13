import { useState } from "react";
import { Layout } from "@/components/layout";
import { useGetHistory, getGetHistoryQueryKey } from "@workspace/api-client-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { History, Search, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function Logs() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  
  const { data, isLoading } = useGetHistory(
    { page, limit: 15 },
    { query: { queryKey: getGetHistoryQueryKey({ page, limit: 15 }) } }
  );

  const historyEntries = data?.entries || [];
  const totalPages = data ? Math.ceil(data.total / data.limit) : 1;

  const filteredEntries = historyEntries.filter(entry => 
    entry.queryVal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    entry.apiName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="max-w-5xl mx-auto space-y-6">
        <header className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <History className="w-8 h-8" />
              Query Logs
            </h1>
            <p className="text-muted-foreground mt-2">Historical telemetry and execution records.</p>
          </div>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search logs..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 bg-black/30 border-border"
            />
          </div>
        </header>

        <div className="border border-border rounded-md bg-card overflow-hidden">
          <Table>
            <TableHeader className="bg-black/40">
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="w-[180px]">Timestamp</TableHead>
                <TableHead>Target Vector</TableHead>
                <TableHead>Query</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={i} className="border-border">
                    <TableCell><div className="h-4 bg-muted/50 rounded w-32 animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 bg-muted/50 rounded w-24 animate-pulse" /></TableCell>
                    <TableCell><div className="h-4 bg-muted/50 rounded w-48 animate-pulse" /></TableCell>
                    <TableCell className="text-right"><div className="h-4 bg-muted/50 rounded w-16 ml-auto animate-pulse" /></TableCell>
                  </TableRow>
                ))
              ) : filteredEntries.length === 0 ? (
                <TableRow className="border-border">
                  <TableCell colSpan={4} className="text-center py-10 text-muted-foreground">
                    No history records found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-border hover:bg-muted/30">
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {format(new Date(entry.createdAt), "yyyy-MM-dd HH:mm:ss")}
                    </TableCell>
                    <TableCell className="font-medium text-primary">
                      {entry.apiName}
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {entry.queryVal}
                    </TableCell>
                    <TableCell className="text-right">
                      {entry.success ? (
                        <Badge variant="outline" className="text-success border-success/30 bg-success/10 gap-1">
                          <CheckCircle2 className="w-3 h-3" /> OK
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-destructive border-destructive/30 bg-destructive/10 gap-1">
                          <XCircle className="w-3 h-3" /> FAIL
                        </Badge>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="border-border hover:bg-muted"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="text-sm text-muted-foreground">
              Page <span className="text-foreground">{page}</span> of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="border-border hover:bg-muted"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
