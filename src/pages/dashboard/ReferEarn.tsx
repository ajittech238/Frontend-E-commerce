import { useState } from "react";
import { Copy, Share2, TrendingUp, Users, Gift, DollarSign, Mail, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DataTable } from "@/components/admin/DataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

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

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const columns = [
    {
      key: "name",
      header: "Referral",
      render: (item: any) => (
        <div>
          <p className="font-medium text-foreground">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    { key: "date", header: "Date", render: (item: any) => new Date(item.date).toLocaleDateString() },
    {
      key: "status",
      header: "Status",
      render: (item: any) => (
        <Badge className={item.status === "active" ? "bg-emerald-500/10 text-emerald-600" : item.status === "pending" ? "bg-amber-500/10 text-amber-600" : "bg-gray-500/10 text-gray-600"}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Badge>
      ),
    },
    { key: "reward", header: "Reward" },
    { key: "commission", header: "Commission" },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (item: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Mail className="w-4 h-4 mr-2" /> Send Message</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        <CardContent>
          <DataTable
            columns={columns}
            data={referrals}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: referrals.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>

      {/* How It Works */}
      <Card>
        <CardHeader>
          <CardTitle>How It Works</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </div>
  );
}
