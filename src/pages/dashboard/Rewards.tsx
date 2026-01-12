import { useState } from "react";
import { Gift, Zap, Lock, Unlock, TrendingUp, DollarSign, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Plus, Minus, ChevronDown, Eye, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const rewardTiers = [
  { name: "Bronze", points: "0-999", perks: "5% discount", color: "from-amber-500 to-orange-500", locked: false },
  { name: "Silver", points: "1000-4999", perks: "10% discount, Free shipping", color: "from-slate-400 to-slate-500", locked: false },
  { name: "Gold", points: "5000-9999", perks: "15% discount, Free shipping, Birthday bonus", color: "from-yellow-400 to-yellow-500", locked: true },
  { name: "Platinum", points: "10000+", perks: "20% discount, Free shipping, VIP support", color: "from-blue-400 to-purple-500", locked: true },
];

const rewardHistory = [
  { id: "RWD001", action: "Purchase", points: "+150", date: "2024-01-25", status: "credited" },
  { id: "RWD002", action: "Referral", points: "+500", date: "2024-01-20", status: "credited" },
  { id: "RWD003", action: "Review", points: "+50", date: "2024-01-15", status: "credited" },
  { id: "RWD004", action: "Redemption", points: "-1000", date: "2024-01-10", status: "redeemed" },
  { id: "RWD005", action: "Birthday Bonus", points: "+200", date: "2024-01-05", status: "credited" },
];

const columns = [
  { key: "action", header: "Action" },
  { key: "points", header: "Points" },
  { key: "date", header: "Date" },
  { key: "status", header: "Status" },
  { key: "actions", header: "" },
];

export default function Rewards() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);

  const handleViewDetails = (item: any) => {
    setSelectedReward(item);
    setIsViewDetailsOpen(true);
  };

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };


  const renderExpandedRow = (item: any) => (
    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">

      <div className="bg-card p-3 rounded border">
        <p className="text-xs text-muted-foreground">Date</p>
        <p className="text-sm">{new Date(item.date).toLocaleDateString()}</p>
      </div>

      <div className="bg-card p-3 rounded border flex justify-around">
        {statusRender(item)}
        <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="w-1/2 justify-start">
            <MoreHorizontal className="w-4 h-4 mr-2" />
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="p-2">
          <DropdownMenuItem className="gap-1" onClick={() => handleViewDetails(item)}><Eye className="w-4 -h-4"/> View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      </div>

      

    </div>
  );






  const pageSize = 10;
  const currentPoints = 3450;
  const nextTierPoints = 5000;

  const getRowId = (item: any) => item.id;

  const paginatedData = rewardHistory.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const totalPages = Math.ceil(rewardHistory.length / pageSize);

  const allSelected = paginatedData.length > 0 && paginatedData.every((item) => selectedIds.includes(getRowId(item)));
  const someSelected = paginatedData.some((item) => selectedIds.includes(getRowId(item)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds([...new Set([...selectedIds, ...paginatedData.map(getRowId)])]);
    } else {
      setSelectedIds(selectedIds.filter((id) => !paginatedData.map(getRowId).includes(id)));
    }
  };

  const handleSelectRow = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedIds([...selectedIds, id]);
    } else {
      setSelectedIds(selectedIds.filter((i) => i !== id));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const statusRender = (item: any) => (
    <Badge className={item.status === "credited" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"}>
      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
    </Badge>
  );

  const actionsRender = (item: any) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleViewDetails(item)}>View Details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const dateRender = (item: any) => new Date(item.date).toLocaleDateString();

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Rewards Program</h1>
        <p className="text-muted-foreground mt-1">Earn and redeem points on every purchase</p>
      </div>

      {/* Current Points Card */}
      <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground font-medium">Your Reward Points</p>
              <p className="text-5xl font-bold text-foreground mt-2">{currentPoints}</p>
              <p className="text-sm text-muted-foreground mt-2">
                {nextTierPoints - currentPoints} points to reach Gold tier
              </p>
            </div>
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
              <Gift className="w-12 h-12 text-white" />
            </div>
          </div>
          <Progress value={(currentPoints / nextTierPoints) * 100} className="mt-6 h-2" />
        </CardContent>
      </Card>

      {/* Reward Tiers */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Membership Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewardTiers.map((tier) => (
            <Card key={tier.name} className="relative overflow-hidden">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg text-foreground">{tier.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{tier.points} points</p>
                  </div>
                  {tier.locked ? (
                    <Lock className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Unlock className="w-5 h-5 text-emerald-600" />
                  )}
                </div>
                <div className={`w-full h-1 bg-gradient-to-r ${tier.color} rounded-full`} />
                <p className="text-sm text-muted-foreground">{tier.perks}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How to Earn */}
      <Card>
        <CardHeader>
          <CardTitle>How to Earn Points</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: "Shopping", value: "1 point per ₹1 spent", icon: "🛍️" },
              { title: "Referral", value: "500 points per friend signup", icon: "👥" },
              { title: "Review", value: "50 points per product review", icon: "⭐" },
            ].map((item) => (
              <div key={item.title} className="p-4 rounded-lg bg-accent/30 space-y-2">
                <p className="text-2xl">{item.icon}</p>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Redemption Options */}
      <Card>
        <CardHeader>
          <CardTitle>Redeem Your Points</CardTitle>
          <CardDescription>Convert points to discounts or exclusive rewards</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { name: "₹500 Discount", cost: "1000 points", savings: "Save ₹500" },
              { name: "₹1000 Discount", cost: "2000 points", savings: "Save ₹1000" },
              { name: "₹2500 Discount", cost: "5000 points", savings: "Save ₹2500" },
              { name: "Free Shipping", cost: "200 points", savings: "Save shipping cost" },
            ].map((reward) => (
              <div key={reward.name} className="p-4 rounded-lg border border-border hover:border-primary transition-colors flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{reward.name}</p>
                  <p className="text-xs text-muted-foreground">{reward.cost}</p>
                  <p className="text-xs text-emerald-600 mt-1">{reward.savings}</p>
                </div>
                <Button size="sm" variant={currentPoints >= parseInt(reward.cost) ? "default" : "outline"} disabled={currentPoints < parseInt(reward.cost)}>
                  Redeem
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reward History */}
      <Card>
        <CardHeader>
          <CardTitle>Reward History</CardTitle>
          <CardDescription>Your recent points activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-border/50 overflow-hidden">
            <div className="overflow-x-auto">
              <Table className="w-full table-auto">
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-12">
                      <Checkbox
                        checked={allSelected}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>

                    <TableHead>Action</TableHead>
                    <TableHead>Points</TableHead>

                    {/* MD+ */}
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="hidden md:table-cell">Status</TableHead>

                    {/* LG+ */}
                    <TableHead className="hidden lg:table-cell">Actions</TableHead>

                    {/* CHEVRON */}
                    <TableHead className="w-10 lg:hidden" />
                  </TableRow>
                </TableHeader>

                {paginatedData.map((item) => {
                  const id = item.id;
                  const isExpanded = expandedRows.has(id);
                  const isSelected = selectedIds.includes(id);

                  return (
                    <>
                      {/* MAIN ROW */}
                      <TableRow key={id} className={isSelected ? "bg-pink-gradient/5" : ""}>
                        <TableCell>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={(c) => handleSelectRow(id, !!c)}
                          />
                        </TableCell>

                        <TableCell>{item.action}</TableCell>
                        <TableCell>{item.points}</TableCell>

                        {/* MD+ */}
                        <TableCell className="hidden md:table-cell">
                          {new Date(item.date).toLocaleDateString()}
                        </TableCell>

                        <TableCell className="hidden md:table-cell">
                          {statusRender(item)}
                        </TableCell>

                        {/* LG+ */}
                        <TableCell className="hidden lg:table-cell">
                          {actionsRender(item)}
                        </TableCell>

                        {/* CHEVRON (MD + MOBILE) */}
                        <TableCell className="lg:hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => toggleExpand(id)}
                          >
                            <ChevronDown
                              className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""
                                }`}
                            />
                          </Button>
                        </TableCell>
                      </TableRow>

                      {/* EXPANDED CARD */}
                      {isExpanded && (
                        <TableRow className="lg:hidden">
                          <TableCell colSpan={7} className="p-0">
                            {renderExpandedRow(item)}
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  );
                })}

              </Table>
            </div>
          </div>

          {rewardHistory.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm">
              <p className="text-muted-foreground">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, rewardHistory.length)} of{" "}
                {rewardHistory.length}
              </p>
              <div className="flex items-center gap-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  title="First page"
                >
                  <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  title="Previous page"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 font-medium text-xs sm:text-sm">
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  title="Next page"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  title="Last page"
                >
                  <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] rounded-lg md:max-w-lg md:max-h-[80vh] shadow-lg flex flex-col">
          <DialogHeader className="p-6">
            <DialogTitle className="flex items-center text-2xl">
              <Gift className="h-6 w-6 mr-3" />
              Reward Details
            </DialogTitle>
            <DialogDescription>
              Details for reward ID: {selectedReward?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedReward && (
            <div className="px-6 pb-6 space-y-4 flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="p-4 bg-muted/50 rounded-lg border">
                <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  Action
                </Label>
                <p className="text-base font-medium">{selectedReward.action}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <TrendingUp className="h-4 w-4 mr-2" /> Points
                  </Label>
                  <p className="text-base font-medium">{selectedReward.points}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" /> Date
                  </Label>
                  <p className="text-base font-medium">{new Date(selectedReward.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border">
                <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  Status
                </Label>
                <Badge className={selectedReward.status === "credited" ? "bg-emerald-500/10 text-emerald-600" : "bg-blue-500/10 text-blue-600"}>
                  {selectedReward.status.charAt(0).toUpperCase() + selectedReward.status.slice(1)}
                </Badge>
              </div>
            </div>
          )}
          <DialogFooter className="p-4 border-t mt-auto">
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}