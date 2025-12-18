import { useState } from "react";
import { MessageCircle, Plus, Edit, Trash2, Power, Send, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const bots = [
  { id: "BOT001", name: "Customer Support Bot", status: "active", conversations: 1234, responses: 95, created: "2024-01-01" },
  { id: "BOT002", name: "Sales Assistant", status: "active", conversations: 856, responses: 92, created: "2024-01-05" },
  { id: "BOT003", name: "FAQ Bot", status: "inactive", conversations: 0, responses: 88, created: "2024-01-10" },
];

const responses = [
  { id: "RES001", trigger: "hello", response: "Hi! How can I help you today?", type: "greeting" },
  { id: "RES002", trigger: "order status", response: "I can help you check your order status. Please provide your order ID.", type: "order" },
  { id: "RES003", trigger: "return policy", response: "We offer 30-day returns on all products.", type: "policy" },
];

export default function Chatbot() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBot, setEditingBot] = useState<any>(null);
  const [responseDialogOpen, setResponseDialogOpen] = useState(false);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Chatbots</h1>
          <p className="text-muted-foreground mt-1">Manage AI chatbots and automated responses</p>
        </div>
        <Button onClick={() => { setEditingBot(null); setIsDialogOpen(true); }} className="gap-2">
          <Plus className="w-4 h-4" />
          New Bot
        </Button>
      </div>

      {/* Bots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {bots.map((bot) => (
          <Card key={bot.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{bot.name}</p>
                    <p className="text-xs text-muted-foreground">{bot.id}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => { setEditingBot(bot); setIsDialogOpen(true); }}>
                      <Edit className="w-4 h-4 mr-2" /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="w-4 h-4 mr-2" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge className={bot.status === "active" ? "bg-emerald-500/10 text-emerald-600" : "bg-gray-500/10 text-gray-600"}>
                    {bot.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Conversations</span>
                  <span className="font-semibold text-foreground">{bot.conversations}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Accuracy</span>
                  <span className="font-semibold text-emerald-600">{bot.responses}%</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 gap-2">
                  <Power className="w-4 h-4" />
                  {bot.status === "active" ? "Disable" : "Enable"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Responses Table */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Automated Responses</CardTitle>
            <CardDescription>Pre-configured bot responses</CardDescription>
          </div>
          <Button size="sm" onClick={() => setResponseDialogOpen(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Add Response
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {responses.map((response) => (
              <div key={response.id} className="flex items-start justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{response.type}</Badge>
                    <code className="text-xs bg-accent/50 px-2 py-1 rounded">{response.trigger}</code>
                  </div>
                  <p className="text-sm text-foreground">{response.response}</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Edit className="w-4 h-4 mr-2" /> Edit</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive"><Trash2 className="w-4 h-4 mr-2" /> Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bot Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editingBot ? "Edit Bot" : "Create New Bot"}</DialogTitle>
            <DialogDescription>
              {editingBot ? "Update chatbot settings" : "Create a new AI chatbot"}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Bot Name</Label>
              <Input defaultValue={editingBot?.name} placeholder="Enter bot name" />
            </div>
            <div className="grid gap-2">
              <Label>Description</Label>
              <Textarea placeholder="Enter bot description" rows={4} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsDialogOpen(false)}>
              {editingBot ? "Save Changes" : "Create Bot"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
