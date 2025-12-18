import { useState } from "react";
import { MessageSquare, ThumbsUp, Flag, MoreHorizontal, Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const questions = [
  { 
    id: "Q001", 
    product: "Wireless Headphones", 
    user: "Rahul Kumar", 
    avatar: "", 
    question: "What is the battery life?", 
    answers: 3, 
    helpful: 45, 
    date: "2024-01-25", 
    status: "answered" 
  },
  { 
    id: "Q002", 
    product: "Smart Watch", 
    user: "Priya Singh", 
    avatar: "", 
    question: "Is it water resistant?", 
    answers: 2, 
    helpful: 32, 
    date: "2024-01-24", 
    status: "answered" 
  },
  { 
    id: "Q003", 
    product: "Phone Case", 
    user: "Amit Patel", 
    avatar: "", 
    question: "What colors are available?", 
    answers: 0, 
    helpful: 0, 
    date: "2024-01-23", 
    status: "unanswered" 
  },
  { 
    id: "Q004", 
    product: "USB Cable", 
    user: "Neha Verma", 
    avatar: "", 
    question: "Compatible with iPhone?", 
    answers: 1, 
    helpful: 18, 
    date: "2024-01-22", 
    status: "answered" 
  },
];

export default function QA() {
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filteredQuestions = questions.filter(q => 
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    q.product.toLowerCase().includes(search.toLowerCase())
  );

  const selected = selectedId ? questions.find(q => q.id === selectedId) : null;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Q&A</h1>
        <p className="text-muted-foreground mt-1">Manage customer questions and answers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Total Questions", value: "234", icon: MessageSquare },
          { label: "Answered", value: "198", icon: ThumbsUp },
          { label: "Pending", value: "36", icon: MessageSquare },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search questions..." 
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Questions List */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Questions</CardTitle>
            <CardDescription>All customer questions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredQuestions.map((question) => (
              <div 
                key={question.id} 
                onClick={() => setSelectedId(question.id)}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedId === question.id 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs font-bold">
                          {question.user.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-foreground">{question.user}</p>
                        <p className="text-xs text-muted-foreground">{question.product}</p>
                      </div>
                    </div>
                    <p className="text-sm text-foreground font-medium">{question.question}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <Badge variant="outline" className="text-xs">
                        {question.answers} {question.answers === 1 ? "Answer" : "Answers"}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{question.helpful} found helpful</span>
                      <Badge className={question.status === "answered" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                        {question.status}
                      </Badge>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="w-8 h-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Mark as Helpful</DropdownMenuItem>
                      <DropdownMenuItem>Report</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Question Details */}
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent>
            {selected ? (
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Product</p>
                  <p className="text-foreground font-medium">{selected.product}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Asked By</p>
                  <p className="text-foreground font-medium">{selected.user}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Date</p>
                  <p className="text-foreground font-medium">{new Date(selected.date).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase">Status</p>
                  <Badge className={selected.status === "answered" ? "bg-emerald-500/10 text-emerald-600" : "bg-amber-500/10 text-amber-600"}>
                    {selected.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Actions</p>
                  <div className="space-y-2">
                    <Button size="sm" className="w-full" variant="default">Answer Question</Button>
                    <Button size="sm" className="w-full" variant="outline">View All Answers</Button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">Select a question to view details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
