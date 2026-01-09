import { useState } from "react";
import { Copy, Share2, TrendingUp, Users, Gift, DollarSign, Mail, MoreHorizontal, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, ChevronDown, Eye, User, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const referralStats = [
  { label: "Total Referrals", value: "234", change: "+12%", icon: Users, color: "from-blue-500 to-cyan-500" },
  { label: "Successful Conversions", value: "89", change: "+8%", icon: TrendingUp, color: "from-emerald-500 to-teal-500" },
  { label: "Earned Rewards", value: "₹8,900", change: "+15%", icon: Gift, color: "from-purple-500 to-pink-500" },
  { label: "Pending Balance", value: "₹2,345", change: "-2%", icon: DollarSign, color: "from-amber-500 to-orange-500" },
];

const referrals = [
  { id: "REF001", name: "Rahul Kumar", email: "rahul@example.com", status: "active", date: "2024-01-15", reward: "₹500", commission: "10%" },
  { id: "REF002", name: "Priya Singh", email: "priya@example.com", status: "active", date: "2024-01-18", reward: "₹500", commission: "10%" },
  { id: "REF003", name: "Amit Patel", email: "amit@example.com", status: "pending", date: "2024-01-20", reward: "₹0", commission: "10%" },
  { id: "REF004", name: "Neha Verma", email: "neha@example.com", status: "active", date: "2024-01-22", reward: "₹500", commission: "10%" },
  { id: "REF005", name: "Vikram Singh", email: "vikram@example.com", status: "inactive", date: "2024-01-25", reward: "₹0", commission: "10%" },
];

export default function ReferEarn() {
  const [referralCode] = useState("REFER2024");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10 });
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [isViewDetailsOpen, setIsViewDetailsOpen] = useState(false);
  const [isSendMessageOpen, setIsSendMessageOpen] = useState(false);
  const [selectedReferral, setSelectedReferral] = useState<any>(null);

  const toggleExpand = (id: string) => {
    setExpandedRows(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleViewDetails = (referral: any) => {
    setSelectedReferral(referral);
    setIsViewDetailsOpen(true);
  };

  const handleSendMessage = (referral: any) => {
    setSelectedReferral(referral);
    setIsSendMessageOpen(true);
  };


  const renderExpandedRow = (item: any) => (
    <div className="bg-muted/50 p-4 mx-2 my-2 rounded-lg border space-y-3 animate-in slide-in-from-top-2">

      <div className="bg-card p-3 rounded border">
        <p className="text-xs text-muted-foreground">Email</p>
        <p className="text-sm font-medium">{item.email}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Reward</p>
          <p className="text-sm font-medium">{item.reward}</p>
        </div>
        <div className="bg-card p-3 rounded border">
          <p className="text-xs text-muted-foreground">Commission</p>
          <p className="text-sm font-medium">{item.commission}</p>
        </div>
      </div>

      <div className="bg-card p-3 rounded border flex  justify-around">
        <Badge className={
          item.status === "active"
            ? "bg-emerald-500/10 text-emerald-600"
            : item.status === "pending"
              ? "bg-amber-500/10 text-amber-600"
              : "bg-gray-500/10 text-gray-600"
        }>
          {item.status}
        </Badge>
        <DropdownMenu >
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="w-1/2 justify-start">
              <MoreHorizontal className="w-4 h-4 mr-2" />
              Actions
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="gap-1" onClick={() => handleSendMessage(item)}><Mail className="w-4 h-4" /> Send Message</DropdownMenuItem>
            <DropdownMenuItem className="gap-1" onClick={() => handleViewDetails(item)}><Eye className="w-4 h-4"/> View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>



    </div>
  );


  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const getRowId = (item: any) => item.id;

  const allSelected = referrals.length > 0 && referrals.every((item) => selectedIds.includes(getRowId(item)));
  const someSelected = referrals.some((item) => selectedIds.includes(getRowId(item)));

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedIds(referrals.map(getRowId));
    } else {
      setSelectedIds([]);
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
    setPagination((prev) => ({ ...prev, page }));
  };

  const totalPages = Math.ceil(referrals.length / pagination.pageSize);

  const paginatedData = referrals.slice(
    (pagination.page - 1) * pagination.pageSize,
    pagination.page * pagination.pageSize
  );

  const columns = [
    {
      key: "name",
      header: "Referral",
      width: "200px",
      className: "table-cell",
      render: (i: any) => (
        <div>
          <p className="font-medium">{i.name}</p>
          <p className="text-xs text-muted-foreground">{i.email}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: "120px",
      className: "hidden md:table-cell",
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      className: "hidden md:table-cell",
      render: (i: any) => <Badge>{i.status}</Badge>,
    },
    {
      key: "reward",
      header: "Reward",
      width: "100px",
      className: "hidden lg:table-cell",
    },
    {
      key: "commission",
      header: "Commission",
      width: "100px",
      className: "hidden lg:table-cell",
    },
    {
      key: "actions",
      header: "",
      width: "60px",
      className: "hidden lg:table-cell",
      render: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="gap-1" onClick={() => handleSendMessage(item)}><Mail className="w-4 h-4" /> Send Message</DropdownMenuItem>
            <DropdownMenuItem className="gap-1" onClick={() => handleViewDetails(item)}><Eye className="w-4 h-4"/> View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Refer & Earn</h1>
        <p className="text-muted-foreground mt-1">Manage referral program and track earnings</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {referralStats.map((stat) => (
          <Card key={stat.label} className={`bg-gradient-to-br ${stat.color}/10 border-0`}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                  <p className="text-xs text-emerald-600 mt-2">{stat.change} vs last month</p>
                </div>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Referral Code */}
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Code</CardTitle>
          <CardDescription>Share this code with friends and earn rewards</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="code" className="text-sm mb-2 block">Referral Code</Label>
              <Input id="code" value={referralCode} readOnly className="font-mono font-bold text-lg" />
            </div>
            <div className="pt-6">
              <Button onClick={handleCopy} className="gap-2">
                <Copy className="w-4 h-4" />
                Copy
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share on WhatsApp
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share on Email
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="w-4 h-4" />
              Share Link
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Referrals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Referral History</CardTitle>
          <CardDescription>All your referrals and their status</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-4">
            <div className="rounded-xl border border-border/50 overflow-hidden">
              <div className="overflow-x-auto">
                {/* ================= TABLE ================= */}
                <Table className="w-full table-auto">
                  <TableHeader>
                    <TableRow className="bg-muted/30">
                      <TableHead className="w-12">
                        <Checkbox
                          checked={allSelected}
                          onCheckedChange={handleSelectAll}
                        />
                      </TableHead>

                      {columns.map((col) => (
                        <TableHead
                          key={col.key}
                          style={{ width: col.width }}
                          className={`text-xs font-semibold ${col.className ?? ""}`}
                        >
                          {col.header}
                        </TableHead>
                      ))}

                      {/* CHEVRON HEADER – MD + MOBILE */}
                      <TableHead className="w-10 lg:hidden" />
                    </TableRow>
                  </TableHeader>

                  <TableBody>
                    {paginatedData.map((item) => {
                      const id = item.id;
                      const isExpanded = expandedRows.has(id);

                      return (
                        <>
                          {/* MAIN ROW */}
                          <TableRow key={id}>
                            <TableCell className="w-12">
                              <Checkbox
                                checked={selectedIds.includes(id)}
                                onCheckedChange={(c) => handleSelectRow(id, !!c)}
                              />
                            </TableCell>

                            {columns.map((col) => (
                              <TableCell
                                key={col.key}
                                style={{ width: col.width }}
                                className={`text-xs px-2 py-2 ${col.className ?? ""}`}
                              >
                                {col.render
                                  ? col.render(item)
                                  : item[col.key as keyof typeof item]}
                              </TableCell>
                            ))}

                            {/* CHEVRON – MD + MOBILE */}
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

                          {/* EXPANDED ROW */}
                          {isExpanded && (
                            <TableRow className="lg:hidden">
                              <TableCell colSpan={columns.length + 2} className="p-0">
                                {renderExpandedRow(item)}
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      );
                    })}
                  </TableBody>
                </Table>

              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 text-xs sm:text-sm">
              <p className="text-muted-foreground">
                Showing {(pagination.page - 1) * pagination.pageSize + 1} to{" "}
                {Math.min(pagination.page * pagination.pageSize, referrals.length)} of{" "}
                {referrals.length}
              </p>
              <div className="flex items-center gap-1 m-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(1)}
                  disabled={pagination.page === 1}
                  title="First page"
                >
                  <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  title="Previous page"
                >
                  <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <span className="px-2 sm:px-3 font-medium text-xs sm:text-sm">
                  {pagination.page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === totalPages}
                  title="Next page"
                >
                  <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-8 h-8 sm:w-9 sm:h-9"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={pagination.page === totalPages}
                  title="Last page"
                >
                  <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { step: "1", title: "Share Code", desc: "Share your referral code with friends" },
              { step: "2", title: "Friend Signup", desc: "Friend signs up using your code" },
              { step: "3", title: "Earn Reward", desc: "Earn ₹500 when they make purchase" },
            ].map((item) => (
              <div key={item.step} className="p-4 rounded-lg bg-accent/30 space-y-2">
                <div className="w-10 h-10 rounded-full bg-pink-gradient flex items-center justify-center font-bold text-primary-foreground">
                  {item.step}
                </div>
                <p className="font-semibold text-foreground">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Details Dialog */}
      <Dialog open={isViewDetailsOpen} onOpenChange={setIsViewDetailsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[90vh] rounded-lg md:max-w-lg md:max-h-[80vh] shadow-lg flex flex-col">
          <DialogHeader className="p-6">
            <DialogTitle className="flex items-center text-2xl">
              <User className="h-6 w-6 mr-3" />
              {selectedReferral?.name}
            </DialogTitle>
            <DialogDescription>
              Referral ID: {selectedReferral?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedReferral && (
            <div className="px-6 pb-6 space-y-4 flex-grow overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
              <div className="p-4 bg-muted/50 rounded-lg border">
                <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                  <Mail className="h-4 w-4 mr-2" /> Email
                </Label>
                <p className="text-base">{selectedReferral.email}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <Gift className="h-4 w-4 mr-2" /> Reward
                  </Label>
                  <p className="text-base font-medium">{selectedReferral.reward}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <TrendingUp className="h-4 w-4 mr-2" /> Commission
                  </Label>
                  <p className="text-base font-medium">{selectedReferral.commission}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-2" /> Date
                  </Label>
                  <p className="text-base font-medium">{selectedReferral.date}</p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg border">
                  <Label className="text-sm font-medium text-muted-foreground flex items-center mb-1">
                    Status
                  </Label>
                  <Badge className={
                    selectedReferral.status === "active"
                      ? "bg-emerald-500/10 text-emerald-600"
                      : selectedReferral.status === "pending"
                        ? "bg-amber-500/10 text-amber-600"
                        : "bg-gray-500/10 text-gray-600"
                  }>
                    {selectedReferral.status}
                  </Badge>
                </div>
              </div>
            </div>
          )}
          <DialogFooter className="p-4 border-t mt-auto">
            <Button variant="outline" onClick={() => setIsViewDetailsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Message Dialog */}
      <Dialog open={isSendMessageOpen} onOpenChange={setIsSendMessageOpen}>
        <DialogContent className="max-w-[90vw] rounded-md md:max-w-lg">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Compose and send a message to {selectedReferral?.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" value={selectedReferral?.email || ""} readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" placeholder="Enter subject" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px]" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendMessageOpen(false)}>Cancel</Button>
            <Button>Send Message</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}