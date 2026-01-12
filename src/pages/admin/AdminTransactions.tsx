import { useState } from "react";
import { Search, ArrowUpRight, ArrowDownLeft, DollarSign, TrendingUp, Download, MoreHorizontal, Eye, RefreshCw, ChevronDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

// Define a type for your transaction object for better type safety
interface Transaction {
  id: string;
  orderId: string;
  type: "payment" | "refund";
  amount: number;
  gateway: string;
  status: "success" | "pending" | "processing" | "failed";
  customer: string;
  processedAt: string;
  // Add any other relevant fields here
  description?: string;
  currency?: string;
}

const transactions: Transaction[] = [
  { id: "TXN001", orderId: "ORD-2024-001", type: "payment", amount: 1234.56, gateway: "Razorpay", status: "success", customer: "John Doe", processedAt: "2024-12-12 10:30", description: "Online purchase", currency: "USD" },
  { id: "TXN002", orderId: "ORD-2024-002", type: "payment", amount: 567.89, gateway: "Stripe", status: "success", customer: "Jane Smith", processedAt: "2024-12-12 09:15", description: "Subscription renewal", currency: "USD" },
  { id: "TXN003", orderId: "ORD-2024-003", type: "refund", amount: 234.50, gateway: "Razorpay", status: "success", customer: "Mike Johnson", processedAt: "2024-12-11 18:00", description: "Product return", currency: "USD" },
  { id: "TXN004", orderId: "ORD-2024-004", type: "payment", amount: 890.00, gateway: "PayPal", status: "pending", customer: "Sarah Brown", processedAt: "2024-12-12 11:45", description: "Pre-order payment", currency: "USD" },
  { id: "TXN005", orderId: "ORD-2024-005", type: "payment", amount: 1500.00, gateway: "Stripe", status: "failed", customer: "Robert Wilson", processedAt: "2024-12-12 08:20", description: "Large order", currency: "USD" },
  { id: "TXN006", orderId: "ORD-2024-006", type: "refund", amount: 150.00, gateway: "Razorpay", status: "processing", customer: "Emily Davis", processedAt: "2024-12-12 12:00", description: "Partial refund", currency: "USD" },
];

export default function AdminTransactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const openDetailDialog = (txn: Transaction) => {
    setSelectedTransaction(txn);
    setShowDetailDialog(true);
  };

  const closeDetailDialog = () => {
    setShowDetailDialog(false);
    setSelectedTransaction(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const set = new Set(prev);
      set.has(id) ? set.delete(id) : set.add(id);
      return set;
    });
  };

  const renderExpandedRow = (txn: Transaction) => (
    <div className="bg-muted/50 p-4 mx-2 my-1 rounded-lg border border-border/50 animate-in slide-in-from-top-2 space-y-3">
      <div className="bg-card p-3 rounded-md border">
        <p className="text-xs text-muted-foreground">Transaction ID</p>
        <p className="text-sm font-semibold">{txn.id}</p>
        <p className="text-xs text-muted-foreground">Order ID: {txn.orderId}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded-md border">
          <p className="text-xs text-muted-foreground">Customer</p>
          <p className="text-sm font-semibold">{txn.customer}</p>
        </div>

        <div className="bg-card p-3 rounded-md border">
          <p className="text-xs text-muted-foreground">Gateway</p>
          <p className="text-sm font-semibold">{txn.gateway}</p>
        </div>
      </div>
      <div className="bg-card p-3 rounded-md border">
        <p className="text-xs text-muted-foreground">Processed At</p>
        <p className="text-sm font-semibold">{txn.processedAt}</p>
      </div>


      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded-md border">
          <p className="text-xs text-muted-foreground">Amount</p>
          <p className={`text-sm font-semibold ${txn.type === "refund" ? "text-destructive" : "text-emerald-600"}`}>
            {txn.type === "refund" ? "-" : "+"}${txn.amount} {txn.currency}
          </p>
        </div>

        <div className="bg-card p-3 rounded-md border flex items-center justify-center">
          {getStatusBadge(txn.status)}
        </div>
      </div>
      
      {txn.description && (
        <div className="bg-card p-3 rounded-md border">
          <p className="text-xs text-muted-foreground">Description</p>
          <p className="text-sm font-semibold">{txn.description}</p>
        </div>
      )}

      <div className="flex gap-2 pt-1">
        <Button size="sm" variant="outline" className="flex-1" onClick={() => openDetailDialog(txn)}>
          <Eye className="h-4 w-4 mr-1" /> View Details
        </Button>
        <Button size="sm" variant="outline" className="flex-1">
          <Download className="h-4 w-4 mr-1" /> Receipt
        </Button>
      </div>
    </div>
  );


  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      success: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      processing: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  const totalRevenue = transactions.filter(t => t.type === "payment" && t.status === "success").reduce((a, t) => a + t.amount, 0);
  const totalRefunds = transactions.filter(t => t.type === "refund").reduce((a, t) => a + t.amount, 0);
  const pendingAmount = transactions.filter(t => t.status === "pending" || t.status === "processing").reduce((a, t) => a + t.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Transactions</h1>
          <p className="text-muted-foreground">Monitor all payment transactions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export</Button>
          <Button variant="outline"><RefreshCw className="h-4 w-4 mr-2" />Sync</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 border-emerald-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+12.5% from last month</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Refunds</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">${totalRefunds.toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-500/10 to-amber-500/5 border-amber-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">${pendingAmount.toLocaleString()}</div></CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Success Rate</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{Math.round((transactions.filter(t => t.status === "success").length / transactions.length) * 100)}%</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search transactions..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select>
              <SelectTrigger className="w-full md:w-[150px]"><SelectValue placeholder="All Types" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="payment">Payments</SelectItem>
                <SelectItem value="refund">Refunds</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full md:w-[150px]"><SelectValue placeholder="All Gateways" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Gateways</SelectItem>
                <SelectItem value="razorpay">Razorpay</SelectItem>
                <SelectItem value="stripe">Stripe</SelectItem>
                <SelectItem value="paypal">PayPal</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="px-4">Transaction ID</TableHead>
                <TableHead className="text-center">Type</TableHead>

                {/* Desktop columns */}
                <TableHead className="hidden lg:table-cell">Customer</TableHead>
                <TableHead className="hidden lg:table-cell">Gateway</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Amount</TableHead>
                <TableHead className="hidden md:table-cell">Processed At</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead className="hidden lg:table-cell text-right">Actions</TableHead>



              </TableRow>
            </TableHeader>

            {transactions.map((txn) => {
              const isExpanded = expandedRows.has(txn.id);

              return (
                <>
                  {/* MAIN ROW */}
                  <TableRow key={txn.id}>
                    <TableCell>
                      <div className="font-medium">{txn.id}</div>
                      <div className="text-sm text-muted-foreground">{txn.orderId}</div>
                    </TableCell>

                    <TableCell>
                      <div className="flex items-center gap-2">
                        {txn.type === "payment" ? (
                          <div className="h-6 w-6 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <ArrowDownLeft className="h-3 w-3 text-emerald-500" />
                          </div>
                        ) : (
                          <div className="h-6 w-6 rounded-full bg-destructive/10 flex items-center justify-center">
                            <ArrowUpRight className="h-3 w-3 text-destructive" />
                          </div>
                        )}
                        <span className="capitalize">{txn.type}</span>
                      </div>
                    </TableCell>

                    {/* Desktop only */}
                    <TableCell className="hidden lg:table-cell">{txn.customer}</TableCell>
                    <TableCell className="hidden lg:table-cell"><Badge variant="secondary">{txn.gateway}</Badge></TableCell>
                    <TableCell className={`hidden lg:table-cell text-right font-medium ${txn.type === "refund" ? "text-destructive" : "text-emerald-500"}`}>
                      {txn.type === "refund" ? "-" : "+"}${txn.amount}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-muted-foreground">{txn.processedAt}</TableCell>
                    <TableCell className="hidden lg:table-cell">{getStatusBadge(txn.status)}</TableCell>

                    <TableCell className="hidden lg:table-cell text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => openDetailDialog(txn)}><Eye className="h-4 w-4 mr-2" />View Details</DropdownMenuItem>
                          <DropdownMenuItem><Download className="h-4 w-4 mr-2" />Download Receipt</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>

                    {/* Chevron for mobile expansion */}
                    <TableCell className="w-12 lg:hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleExpand(txn.id)}
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                        />
                      </Button>
                    </TableCell>
                  </TableRow>

                  {/* EXPANDED CARD for mobile */}
                  {isExpanded && (
                    <TableRow className="lg:hidden">
                      <TableCell colSpan={8} className="p-0">
                        {renderExpandedRow(txn)}
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}

          </Table>
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-[99vw] rounded-md md:max-w-lg lg:max-w-xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden">
          <DialogHeader className="p-6 pb-4 border-b">
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Eye className="h-6 w-6 text-primary" /> Transaction Details
            </DialogTitle>
            <DialogDescription className="text-sm text-muted-foreground">
              Full information for transaction {selectedTransaction?.id}
            </DialogDescription>

          </DialogHeader>
          <div className="p-6 space-y-4">
            {selectedTransaction && (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Transaction ID</p>
                    <p className="text-sm font-semibold">{selectedTransaction.id}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Order ID</p>
                    <p className="text-sm font-semibold">{selectedTransaction.orderId}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="text-sm font-semibold">{selectedTransaction.customer}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Type</p>
                    <p className="text-sm font-semibold capitalize">{selectedTransaction.type}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Gateway</p>
                    <p className="text-sm font-semibold">{selectedTransaction.gateway}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Status</p>
                    {getStatusBadge(selectedTransaction.status)}
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Amount</p>
                    <p className={`text-sm font-semibold ${selectedTransaction.type === "refund" ? "text-destructive" : "text-emerald-600"}`}>
                      {selectedTransaction.type === "refund" ? "-" : "+"}${selectedTransaction.amount} {selectedTransaction.currency}
                    </p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Processed At</p>
                    <p className="text-sm font-semibold">{selectedTransaction.processedAt}</p>
                  </div>
                </div>
                {selectedTransaction.description && (
                  <div className="bg-muted/30 p-3 rounded-md border">
                    <p className="text-xs text-muted-foreground">Description</p>
                    <p className="text-sm font-semibold">{selectedTransaction.description}</p>
                  </div>
                )}
              </>
            )}
          </div>
          <div className="p-4 border-t flex justify-end">
            <Button variant="outline" onClick={closeDetailDialog}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
