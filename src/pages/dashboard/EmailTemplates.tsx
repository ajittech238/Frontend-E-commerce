import { useState } from "react";
import { Mail, Plus, Edit, Trash2, Eye, Send, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DataTable } from "@/components/admin/DataTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const templates = [
  { id: "TMPL001", name: "Welcome Email", type: "welcome", subject: "Welcome to Craftsy!", status: "active", usage: 1250 },
  { id: "TMPL002", name: "Order Confirmation", type: "order", subject: "Your order has been confirmed", status: "active", usage: 5432 },
  { id: "TMPL003", name: "Shipping Notification", type: "shipping", subject: "Your order is on its way", status: "active", usage: 4321 },
  { id: "TMPL004", name: "Password Reset", type: "security", subject: "Reset your password", status: "active", usage: 234 },
  { id: "TMPL005", name: "Newsletter", type: "marketing", subject: "Our latest updates", status: "inactive", usage: 0 },
];

export default function EmailTemplates() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  const columns = [
    {
      key: "name",
      header: "Template",
      render: (template: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Mail className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">{template.name}</p>
            <p className="text-xs text-muted-foreground">{template.subject}</p>
          </div>
        </div>
      ),
    },
    { key: "type", header: "Type" },
    {
      key: "status",
      header: "Status",
      render: (template: any) => (
        <Badge className={template.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
          {template.status}
        </Badge>
      ),
    },
    { key: "usage", header: "Usage" },
    {
      key: "actions",
      header: "",
      width: "60px",
      render: (template: any) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem><Eye className="w-4 h-4 mr-2" /> Preview</DropdownMenuItem>
            <DropdownMenuItem onClick={() => { setEditingTemplate(template); setIsDialogOpen(true); }}>
              <Edit className="w-4 h-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem><Send className="w-4 h-4 mr-2" /> Send Test</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Email Templates</h1>
          <p className="text-muted-foreground mt-1">Create and manage email templates</p>
        </div>
        <Button onClick={() => { setEditingTemplate(null); setIsDialogOpen(true); }} className="gap-2">
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      {/* Templates Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Templates</CardTitle>
          <CardDescription>Email templates for various notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={templates}
            selectable
            selectedIds={selectedIds}
            onSelectionChange={setSelectedIds}
            pagination={{ page: 1, pageSize: 10, total: templates.length, onPageChange: () => {} }}
          />
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-96 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingTemplate ? "Edit Template" : "Create New Template"}</DialogTitle>
            <DialogDescription>
              {editingTemplate ? "Update email template" : "Create a new email template"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Template Name</Label>
              <Input defaultValue={editingTemplate?.name} placeholder="Enter template name" />
            </div>
            <div className="grid gap-2">
              <Label>Subject Line</Label>
              <Input defaultValue={editingTemplate?.subject} placeholder="Enter email subject" />
            </div>
            <div className="grid gap-2">
              <Label>Email Content</Label>
              <Textarea placeholder="Enter HTML or plain text content" rows={8} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingTemplate ? "Save Changes" : "Create Template"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
