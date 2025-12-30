import { useState } from "react";
import { Search, Users, Gift, Share2, Award, TrendingUp, DollarSign, MoreHorizontal, UserPlus, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

const referralStats = [
  { id: "REF001", referrer: "John Warehouse Mgr", role: "Warehouse Manager", referrals: 15, earned: 7500, status: "top-tier" },
  { id: "REF002", referrer: "Sarah Logistics", role: "Logistics Lead", referrals: 8, earned: 4000, status: "mid-tier" },
  { id: "REF003", referrer: "Mike Inventory", role: "Inventory Supervisor", referrals: 3, earned: 1500, status: "beginner" },
  { id: "REF004", referrer: "Emily Operations", role: "Operations Head", referrals: 22, earned: 11000, status: "top-tier" },
];

export default function AdminWarehouseReferEarn() {
  const [searchQuery, setSearchQuery] = useState("");

  const getTierBadge = (status: string) => {
    const styles: Record<string, string> = {
      "top-tier": "bg-purple-500/10 text-purple-500 border-purple-500/20",
      "mid-tier": "bg-blue-500/10 text-blue-500 border-blue-500/20",
      beginner: "bg-slate-500/10 text-slate-500 border-slate-500/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status.replace("-", " ")}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Partner Referrals</h1>
          <p className="text-muted-foreground">Internal and B2B warehouse referral program management</p>
        </div>
        <Button className="gap-2"><Share2 className="h-4 w-4" />Invite Partner</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Total Referrals <UserPlus className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">458</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Rewards Disbursed <Gift className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">₹1.2L</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Conversion Rate <TrendingUp className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">18.5%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Active Partners <Award className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">84</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Partner Leaderboard</CardTitle>
              <CardDescription>Top performing warehouse partners in the referral program</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Partner</TableHead>
                    <TableHead>Referrals</TableHead>
                    <TableHead>Total Earned</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {referralStats.map((stat) => (
                    <TableRow key={stat.id}>
                      <TableCell>
                        <div className="font-medium">{stat.referrer}</div>
                        <div className="text-xs text-muted-foreground">{stat.role}</div>
                      </TableCell>
                      <TableCell className="font-bold">{stat.referrals}</TableCell>
                      <TableCell>₹{stat.earned.toLocaleString()}</TableCell>
                      <TableCell>{getTierBadge(stat.status)}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Mail className="h-4 w-4 mr-2" />Send Statement</DropdownMenuItem>
                            <DropdownMenuItem><DollarSign className="h-4 w-4 mr-2" />Disburse Payment</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><UserPlus className="h-4 w-4 mr-2" />Deactivate</DropdownMenuItem>
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

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Program Controls</CardTitle>
              <CardDescription>Current reward settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
                <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Direct Referral</div>
                <div className="text-2xl font-bold text-primary">₹500.00</div>
                <div className="text-xs text-muted-foreground">Per successful warehouse signup</div>
              </div>
              <div className="p-4 rounded-lg bg-muted/50 border space-y-2">
                <div className="text-xs font-bold uppercase text-muted-foreground tracking-wider">Tier Bonus</div>
                <div className="text-2xl font-bold text-purple-500">5.0%</div>
                <div className="text-xs text-muted-foreground">Additional for Top Tier partners</div>
              </div>
              <Button className="w-full variant-outline gap-2"><Settings className="h-4 w-4" /> Edit Program Rules</Button>
              <div className="pt-4 space-y-2">
                <Label>Broadcast Announcement</Label>
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 gap-2"><Mail className="h-4 w-4" />Email</Button>
                  <Button variant="outline" className="flex-1 gap-2"><MessageSquare className="h-4 w-4" />SMS</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
