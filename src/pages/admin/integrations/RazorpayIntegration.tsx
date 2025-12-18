import { useState } from "react";
import { ArrowLeft, IndianRupee, TrendingUp, CreditCard, RefreshCw, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const payments = [
  { id: "pay_N1234567890", orderId: "order_ABC123", amount: 4999, method: "UPI", status: "captured", date: "2024-12-12 10:30" },
  { id: "pay_N1234567891", orderId: "order_ABC124", amount: 12499, method: "Card", status: "captured", date: "2024-12-12 09:15" },
  { id: "pay_N1234567892", orderId: "order_ABC125", amount: 2999, method: "Netbanking", status: "failed", date: "2024-12-11 18:00" },
  { id: "pay_N1234567893", orderId: "order_ABC126", amount: 7999, method: "UPI", status: "pending", date: "2024-12-12 11:45" },
];

export default function RazorpayIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      captured: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      refunded: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    };
    const icons: Record<string, JSX.Element> = {
      captured: <CheckCircle className="h-3 w-3 mr-1" />,
      pending: <Clock className="h-3 w-3 mr-1" />,
      failed: <XCircle className="h-3 w-3 mr-1" />,
    };
    return <Badge variant="outline" className={`${styles[status]} flex items-center`}>{icons[status]}{status}</Badge>;
  };

  const totalCaptured = payments.filter(p => p.status === "captured").reduce((a, p) => a + p.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/integrations")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">Razorpay</h1>
          <p className="text-muted-foreground">Manage your Razorpay payment integration</p>
        </div>
        <Badge className="bg-emerald-500">Live Mode</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Collected</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center gap-1"><IndianRupee className="h-5 w-5" />{(totalCaptured / 100).toLocaleString()}</div>
            <div className="flex items-center text-xs text-emerald-500 mt-1"><TrendingUp className="h-3 w-3 mr-1" />+24% this month</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Successful</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">{payments.filter(p => p.status === "captured").length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Pending</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-amber-500">{payments.filter(p => p.status === "pending").length}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">{payments.filter(p => p.status === "failed").length}</div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Payments</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                      <TableCell className="font-mono text-sm">{payment.orderId}</TableCell>
                      <TableCell className="flex items-center gap-0.5"><IndianRupee className="h-3 w-3" />{(payment.amount / 100).toFixed(2)}</TableCell>
                      <TableCell><Badge variant="secondary">{payment.method}</Badge></TableCell>
                      <TableCell className="text-sm text-muted-foreground">{payment.date}</TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>API Configuration</CardTitle>
              <CardDescription>Configure your Razorpay API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Key ID</Label>
                <Input placeholder="rzp_live_••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Key Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Webhook Secret</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Mode</Label>
                <Select defaultValue="live">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Auto Capture</Label>
                  <p className="text-sm text-muted-foreground">Automatically capture payments after authorization</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
