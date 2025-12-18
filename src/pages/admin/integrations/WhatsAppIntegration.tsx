import { useState } from "react";
import { ArrowLeft, MessageCircle, Send, Users, Clock, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";

const messages = [
  { id: "MSG001", template: "Order Confirmation", recipient: "+91 98765 43210", status: "delivered", sentAt: "2024-12-12 10:30" },
  { id: "MSG002", template: "Shipping Update", recipient: "+91 87654 32109", status: "delivered", sentAt: "2024-12-12 09:15" },
  { id: "MSG003", template: "Order Confirmation", recipient: "+91 76543 21098", status: "failed", sentAt: "2024-12-11 18:00" },
  { id: "MSG004", template: "Promotional", recipient: "+91 65432 10987", status: "pending", sentAt: "2024-12-12 11:45" },
];

const templates = [
  { name: "Order Confirmation", category: "Transactional", status: "approved", language: "en" },
  { name: "Shipping Update", category: "Transactional", status: "approved", language: "en" },
  { name: "Promotional Offer", category: "Marketing", status: "pending", language: "en" },
];

export default function WhatsAppIntegration() {
  const navigate = useNavigate();

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      delivered: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      failed: "bg-destructive/10 text-destructive border-destructive/20",
      approved: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    };
    return <Badge variant="outline" className={styles[status]}>{status}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard/integrations")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-foreground">WhatsApp Business API</h1>
          <p className="text-muted-foreground">Manage WhatsApp messaging integration</p>
        </div>
        <Badge className="bg-emerald-500">Connected</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Messages Sent</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">1,234</div><p className="text-xs text-muted-foreground">This month</p></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Delivered</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-emerald-500">1,180</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Failed</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold text-destructive">54</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Templates</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{templates.length}</div></CardContent>
        </Card>
      </div>

      <Tabs defaultValue="messages">
        <TabsList>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Messages</CardTitle>
                <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-2" />Refresh</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Template</TableHead>
                    <TableHead>Recipient</TableHead>
                    <TableHead>Sent At</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((msg) => (
                    <TableRow key={msg.id}>
                      <TableCell className="font-medium">{msg.id}</TableCell>
                      <TableCell>{msg.template}</TableCell>
                      <TableCell>{msg.recipient}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{msg.sentAt}</TableCell>
                      <TableCell>{getStatusBadge(msg.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Message Templates</CardTitle>
                <Button>Create Template</Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Language</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.name}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell><Badge variant="secondary">{template.category}</Badge></TableCell>
                      <TableCell>{template.language}</TableCell>
                      <TableCell>{getStatusBadge(template.status)}</TableCell>
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
              <CardTitle>WhatsApp Business API Configuration</CardTitle>
              <CardDescription>Configure your WhatsApp Business API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Phone Number ID</Label>
                <Input placeholder="1234567890123456" />
              </div>
              <div className="space-y-2">
                <Label>Business Account ID</Label>
                <Input placeholder="9876543210987654" />
              </div>
              <div className="space-y-2">
                <Label>Access Token</Label>
                <Input type="password" placeholder="••••••••••••••••" />
              </div>
              <div className="space-y-2">
                <Label>Webhook Verify Token</Label>
                <Input placeholder="your_verify_token" />
              </div>
              <div className="flex items-center justify-between pt-4">
                <div>
                  <Label>Order Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send order updates via WhatsApp</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Shipping Notifications</Label>
                  <p className="text-sm text-muted-foreground">Send shipping updates via WhatsApp</p>
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
