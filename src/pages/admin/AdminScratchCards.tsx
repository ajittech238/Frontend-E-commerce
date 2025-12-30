import { useState } from "react";
import { Plus, Search, Ticket, Calendar, Users, Edit, Trash2, MoreHorizontal, Gift, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const scratchCards = [
  { id: "SC001", name: "Welcome Bonus", reward: "₹50 Cashback", totalCards: 1000, claimed: 450, expiryDate: "2025-12-31", status: "active" },
  { id: "SC002", name: "Festive Offer", reward: "Flat 20% Off", totalCards: 500, claimed: 500, expiryDate: "2024-12-25", status: "expired" },
  { id: "SC003", name: "Referral Reward", reward: "₹100 Wallet Credit", totalCards: 2000, claimed: 120, expiryDate: "2025-06-30", status: "active" },
  { id: "SC004", name: "Mega Win", reward: "iPhone 15", totalCards: 10, claimed: 2, expiryDate: "2025-01-15", status: "active" },
];

export default function AdminScratchCards() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      active: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      expired: "bg-destructive/10 text-destructive border-destructive/20",
      paused: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Scratch Cards</h1>
          <p className="text-muted-foreground">Manage digital scratch card rewards and campaigns</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button><Plus className="h-4 w-4 mr-2" />Create Campaign</Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Scratch Card Campaign</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Campaign Name</Label>
                <Input placeholder="e.g. Summer Sale Reward" />
              </div>
              <div className="space-y-2">
                <Label>Reward Type</Label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select reward" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cashback">Cashback</SelectItem>
                    <SelectItem value="discount">Discount Coupon</SelectItem>
                    <SelectItem value="physical">Physical Product</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Total Cards</Label>
                  <Input type="number" placeholder="1000" />
                </div>
                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Input type="date" />
                </div>
              </div>
              <Button className="w-full">Launch Campaign</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Active Campaigns <Ticket className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">12</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Total Claimed <CheckCircle2 className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">15,420</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Pending Rewards <Clock className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">842</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Total Value <Gift className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">₹2.4L</div></CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search campaigns..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign</TableHead>
                <TableHead>Reward</TableHead>
                <TableHead>Stats (Claimed/Total)</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {scratchCards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell>
                    <div className="font-medium">{card.name}</div>
                    <div className="text-sm text-muted-foreground">{card.id}</div>
                  </TableCell>
                  <TableCell>{card.reward}</TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1 w-32">
                      <div className="text-xs flex justify-between">
                        <span>{Math.round((card.claimed / card.totalCards) * 100)}%</span>
                        <span>{card.claimed}/{card.totalCards}</span>
                      </div>
                      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: `${(card.claimed / card.totalCards) * 100}%` }} />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell><div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-muted-foreground" />{card.expiryDate}</div></TableCell>
                  <TableCell>{getStatusBadge(card.status)}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem><Users className="h-4 w-4 mr-2" />View Claims</DropdownMenuItem>
                        <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
