import { useState } from "react";
import { MessageCircle, Send, Phone, Clock, CheckCheck, MoreHorizontal, Plus, Settings } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const conversations = [
  { id: "CHAT001", customer: "Rahul Kumar", phone: "+91-98765-43210", lastMsg: "Thank you for your order!", timestamp: "2 min ago", unread: 2 },
  { id: "CHAT002", customer: "Priya Singh", phone: "+91-98765-43211", lastMsg: "When will it be delivered?", timestamp: "1 hour ago", unread: 0 },
  { id: "CHAT003", customer: "Amit Patel", phone: "+91-98765-43212", lastMsg: "Product looks great!", timestamp: "3 hours ago", unread: 0 },
];

const messages = [
  { id: "MSG001", sender: "customer", text: "Hi, when will my order arrive?", timestamp: "10:30 AM" },
  { id: "MSG002", sender: "support", text: "Hi! Your order will be delivered by tomorrow.", timestamp: "10:31 AM" },
  { id: "MSG003", sender: "customer", text: "Great! Thanks for the info.", timestamp: "10:32 AM" },
];

export default function WhatsAppMessaging() {
  const [selectedChat, setSelectedChat] = useState(conversations[0].id);
  const [message, setMessage] = useState("");

  const currentChat = conversations.find(c => c.id === selectedChat);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">WhatsApp Messaging</h1>
          <p className="text-muted-foreground mt-1">Communicate with customers via WhatsApp</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Chat
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Total Chats", value: "234", icon: MessageCircle },
          { label: "Active Chats", value: "12", icon: MessageCircle },
          { label: "Messages Today", value: "456", icon: Send },
          { label: "Avg Response Time", value: "2.5 min", icon: Clock },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
        {/* Conversations List */}
        <Card className="lg:col-span-1 overflow-hidden flex flex-col">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Conversations</CardTitle>
            <Input placeholder="Search chats..." className="mt-3" size={32} />
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-0 space-y-1">
            {conversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`p-3 cursor-pointer transition-colors border-l-4 ${
                  selectedChat === conv.id
                    ? "bg-primary/10 border-l-primary"
                    : "border-l-transparent hover:bg-accent"
                }`}
              >
                <div className="flex items-start gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarFallback className="bg-green-500/10 text-green-600 text-sm font-bold">
                      {conv.customer.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-foreground">{conv.customer}</p>
                    <p className="text-xs text-muted-foreground truncate">{conv.lastMsg}</p>
                    <p className="text-xs text-muted-foreground mt-1">{conv.timestamp}</p>
                  </div>
                  {conv.unread > 0 && (
                    <Badge className="bg-green-500 text-white text-xs">{conv.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 overflow-hidden flex flex-col">
          {currentChat && (
            <>
              <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-base">{currentChat.customer}</CardTitle>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Phone className="w-3 h-3" />
                    {currentChat.phone}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem><Phone className="w-4 h-4 mr-2" /> Call</DropdownMenuItem>
                    <DropdownMenuItem><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === "support" ? "justify-start" : "justify-end"}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.sender === "support"
                        ? "bg-accent text-foreground"
                        : "bg-green-500 text-white"
                    }`}>
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === "support" ? "text-muted-foreground" : "text-white/70"}`}>
                        {msg.timestamp}
                        {msg.sender === "support" && <CheckCheck className="w-3 h-3 inline ml-1" />}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>

              <div className="border-t border-border p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Button className="gap-2">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
