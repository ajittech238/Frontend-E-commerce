// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Card, CardContent } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   Search,
//   HelpCircle,
//   MessageCircle,
//   Phone,
//   Mail,
//   FileText,
//   CreditCard,
//   Truck,
//   RotateCcw,
//   ChevronDown,
//   ChevronUp,
//   PlusCircle
// } from "lucide-react";
// import { toast } from "sonner";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export default function QA() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [activeTab, setActiveTab] = useState("all");
//   const [openItem, setOpenItem] = useState<string | null>(null);
//   const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);
//   const [newQuestion, setNewQuestion] = useState({ category: "", subject: "", question: "" });

//   const categories = [

//     { id: "orders", name: "Orders", icon: FileText },
//     { id: "shipping", name: "Shipping", icon: Truck },
//     { id: "returns", name: "Returns", icon: RotateCcw },
//     { id: "payment", name: "Payment", icon: CreditCard },
//     { id: "account", name: "Account", icon: HelpCircle },
//   ];

//   const faqs = [
//     {
//       id: "q1",
//       category: "orders",
//       question: "How do I track my order?",
//       answer: "You can track your order by going to the 'My Orders' section in your profile. Click on the specific order to see its tracking status and details."
//     },
//     {
//       id: "q2",
//       category: "orders",
//       question: "Can I cancel my order?",
//       answer: "Yes, you can cancel your order within 24 hours of placing it, provided it hasn't been shipped yet. Go to 'My Orders' and select the 'Cancel Order' option."
//     },
//     {
//       id: "q3",
//       category: "shipping",
//       question: "What are the shipping charges?",
//       answer: "We offer free shipping on all orders above ₹999. For orders below this amount, a standard shipping fee of ₹50 applies."
//     },
//     {
//       id: "q4",
//       category: "shipping",
//       question: "Do you ship internationally?",
//       answer: "Currently, we only ship within India. We are working on expanding our shipping to international locations soon."
//     },
//     {
//       id: "q5",
//       category: "returns",
//       question: "What is your return policy?",
//       answer: "We have a 30-day return policy. If you are not satisfied with your purchase, you can return it within 30 days of delivery for a full refund or exchange."
//     },
//     {
//       id: "q6",
//       category: "payment",
//       question: "What payment methods do you accept?",
//       answer: "We accept credit/debit cards, net banking, UPI, and Cash on Delivery (COD) for eligible pin codes."
//     },
//     {
//       id: "q7",
//       category: "account",
//       question: "How do I reset my password?",
//       answer: "Click on 'Forgot Password' on the login page. Enter your registered email address, and we will send you a link to reset your password."
//     },
//      {
//       id: "q8",
//       category: "returns",
//       question: "How long does a refund take?",
//       answer: "Once we receive your return, the refund is processed within 5-7 business days and credited back to your original payment method."
//     }
//   ];

//   const filteredFaqs = faqs.filter(faq => {
//     const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                           faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory = activeTab === "all" || faq.category === activeTab;
//     return matchesSearch && matchesCategory;
//   });

//   const toggleItem = (id: string) => {
//     setOpenItem(openItem === id ? null : id);
//   };

//   const handleContactSupport = (method: string) => {
//       toast.success(`${method} request initiated! We will connect with you shortly.`);
//   }

//   const handleAskQuestion = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!newQuestion.category || !newQuestion.subject || !newQuestion.question) {
//       toast.error("Please fill in all fields");
//       return;
//     }
//     setIsAskQuestionOpen(false);
//     setNewQuestion({ category: "", subject: "", question: "" });
//     toast.success("Your question has been submitted! We will get back to you soon.");
//   };

//   return (
//     <div className="container py-8 max-w-4xl animate-fade-in">
//       <div className="text-center mb-10 space-y-4">
//         <h1 className="text-3xl md:text-4xl font-bold text-foreground">How can we help you?</h1>
//         <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//           Search our knowledge base or browse categories below to find answers to your questions.
//         </p>

//         <div className="relative max-w-xl mx-auto mt-6">
//           <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
//           <Input
//             placeholder="Search for answers..."
//             className="pl-12 h-12 rounded-full shadow-sm border-primary/20 focus-visible:ring-primary"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <div className="mt-6">
//           <Button onClick={() => setIsAskQuestionOpen(true)} className="gap-2">
//             <PlusCircle className="h-4 w-4" />
//             Ask a New Question
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full mb-10">
//         <TabsList className="w-full justify-start h-auto p-1 bg-transparent overflow-x-auto flex-nowrap gap-2 mb-6 no-scrollbar">
//           <TabsTrigger
//             value="all"
//             className="rounded-full px-6 py-2.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
//           >
//             All
//           </TabsTrigger>
//           {categories.map(cat => (
//             <TabsTrigger
//               key={cat.id}
//               value={cat.id}
//               className="rounded-full px-6 py-2.5 border border-border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2"
//             >
//               <cat.icon className="h-4 w-4" />
//               {cat.name}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         <Card className="border-border/50 shadow-sm">
//           <CardContent className="p-6">
//             {filteredFaqs.length > 0 ? (
//               <div className="space-y-1">
//                 {filteredFaqs.map((faq) => (
//                   <div key={faq.id} className="border-b border-border/50 last:border-0">
//                     <button
//                       onClick={() => toggleItem(faq.id)}
//                       className="flex items-center justify-between w-full py-4 text-left font-medium hover:text-primary transition-colors group"
//                     >
//                       <span className="group-hover:translate-x-1 transition-transform">{faq.question}</span>
//                       {openItem === faq.id ? (
//                         <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-4" />
//                       ) : (
//                         <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 ml-4" />
//                       )}
//                     </button>
//                     <div
//                       className={`overflow-hidden transition-all duration-300 ease-in-out ${
//                         openItem === faq.id ? "max-h-96 opacity-100 pb-4" : "max-h-0 opacity-0"
//                       }`}
//                     >
//                       <p className="text-muted-foreground leading-relaxed text-sm pl-1">
//                         {faq.answer}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <div className="text-center py-12">
//                 <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
//                 <h3 className="text-lg font-medium">No results found</h3>
//                 <p className="text-muted-foreground">Try adjusting your search or category.</p>
//               </div>
//             )}
//           </CardContent>
//         </Card>
//       </Tabs>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
//         <Card className="border-border/50 hover:border-primary/50 transition-colors text-center group cursor-pointer hover:shadow-md" onClick={() => handleContactSupport("Phone Support")}>
//           <CardContent className="pt-8 pb-8">
//             <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//               <Phone className="h-7 w-7" />
//             </div>
//             <h3 className="font-bold text-lg mb-1">Call Us</h3>
//             <p className="text-sm text-muted-foreground mb-3">Mon-Fri, 9am - 6pm</p>
//             <p className="font-bold text-primary text-lg">+91 1800-123-4567</p>
//           </CardContent>
//         </Card>

//         <Card className="border-border/50 hover:border-primary/50 transition-colors text-center group cursor-pointer hover:shadow-md" onClick={() => handleContactSupport("Live Chat")}>
//           <CardContent className="pt-8 pb-8">
//             <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//               <MessageCircle className="h-7 w-7" />
//             </div>
//             <h3 className="font-bold text-lg mb-1">Live Chat</h3>
//             <p className="text-sm text-muted-foreground mb-3">Instant support</p>
//             <Button variant="outline" size="sm" className="rounded-full px-6">Start Chat</Button>
//           </CardContent>
//         </Card>

//         <Card className="border-border/50 hover:border-primary/50 transition-colors text-center group cursor-pointer hover:shadow-md" onClick={() => handleContactSupport("Email Support")}>
//           <CardContent className="pt-8 pb-8">
//             <div className="w-14 h-14 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
//               <Mail className="h-7 w-7" />
//             </div>
//             <h3 className="font-bold text-lg mb-1">Email Us</h3>
//             <p className="text-sm text-muted-foreground mb-3">Get response in 24h</p>
//             <p className="font-bold text-primary text-lg">support@zenith.com</p>
//           </CardContent>
//         </Card>
//       </div>

//       <Dialog open={isAskQuestionOpen} onOpenChange={setIsAskQuestionOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Ask a New Question</DialogTitle>
//             <DialogDescription>
//               Can't find the answer you're looking for? Submit your question here.
//             </DialogDescription>
//           </DialogHeader>
//           <form onSubmit={handleAskQuestion} className="space-y-4 py-4">
//             <div className="space-y-2">
//               <Label htmlFor="category">Category</Label>
//               <Select
//                 value={newQuestion.category}
//                 onValueChange={(val) => setNewQuestion({...newQuestion, category: val})}
//               >
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a category" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {categories.map((cat) => (
//                     <SelectItem key={cat.id} value={cat.id}>
//                       <div className="flex items-center gap-2">
//                         <cat.icon className="h-4 w-4" />
//                         {cat.name}
//                       </div>
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="subject">Subject</Label>
//               <Input
//                 id="subject"
//                 placeholder="Brief summary of your question"
//                 value={newQuestion.subject}
//                 onChange={(e) => setNewQuestion({...newQuestion, subject: e.target.value})}
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="question">Your Question</Label>
//               <Textarea
//                 id="question"
//                 placeholder="Type your question here..."
//                 value={newQuestion.question}
//                 onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
//                 className="min-h-[100px]"
//               />
//             </div>
//             <DialogFooter>
//               <Button type="button" variant="outline" onClick={() => setIsAskQuestionOpen(false)}>
//                 Cancel
//               </Button>
//               <Button type="submit">Submit Question</Button>
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  FileText,
  CreditCard,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  PlusCircle,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function QA() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [isAskQuestionOpen, setIsAskQuestionOpen] = useState(false);

  const [newQuestion, setNewQuestion] = useState({
    category: "",
    subject: "",
    question: "",
  });

  const categories = [
    { id: "orders", name: "Orders", icon: FileText },
    { id: "shipping", name: "Shipping", icon: Truck },
    { id: "returns", name: "Returns", icon: RotateCcw },
    { id: "payment", name: "Payment", icon: CreditCard },
    { id: "account", name: "Account", icon: HelpCircle },
  ];

  const faqs = [
    {
      id: "q1",
      category: "orders",
      question: "How do I track my order?",
      answer:
        "You can track your order by going to the My Orders section in your profile.",
    },
    {
      id: "q2",
      category: "orders",
      question: "Can I cancel my order?",
      answer:
        "Yes, you can cancel your order within 24 hours if it hasn’t been shipped.",
    },
    {
      id: "q3",
      category: "shipping",
      question: "What are the shipping charges?",
      answer: "Free shipping on orders above ₹999. Otherwise ₹50 shipping fee.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeTab === "all" || faq.category === activeTab;
    return matchesSearch && matchesCategory;
  });

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Submitting question:", newQuestion);

    if (
      !newQuestion.category ||
      !newQuestion.subject ||
      !newQuestion.question
    ) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Question submitted successfully!");
    setIsAskQuestionOpen(false);
    setNewQuestion({ category: "", subject: "", question: "" });
  };

  return (
    // <div className="container py-8 max-w-4xl">
    <div className="container py-8 max-w-4xl animate-fade-in relative z-10">
      {/* HEADER */}
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-3xl font-bold">How can we help you?</h1>
        <p className="text-muted-foreground">
          Search FAQs or ask a new question
        </p>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            className="pl-12 h-12 rounded-full"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          type="button"
          className="gap-2"
          onClick={() => setIsAskQuestionOpen(true)}
        >
          <PlusCircle className="h-4 w-4" />
          Ask a New Question
        </Button>

        {/* ✅ DIALOG */}
        <Dialog
          open={isAskQuestionOpen}
          onOpenChange={(open) => {
            console.log("Dialog open state:", open);
            setIsAskQuestionOpen(open);
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Ask a New Question</DialogTitle>
              <DialogDescription>
                Submit your query and our team will help you.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleAskQuestion} className="space-y-4">
              <div>
                <Label>Category</Label>
                <Select
                  value={newQuestion.category}
                  onValueChange={(value) =>
                    setNewQuestion({
                      ...newQuestion,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Subject</Label>
                <Input
                  placeholder="Short subject"
                  value={newQuestion.subject}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      subject: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Question</Label>
                <Textarea
                  placeholder="Write your question..."
                  value={newQuestion.question}
                  onChange={(e) =>
                    setNewQuestion({
                      ...newQuestion,
                      question: e.target.value,
                    })
                  }
                />
              </div>

              <DialogFooter>
                <Button type="submit">Submit</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* FAQ LIST */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((cat) => (
            <TabsTrigger key={cat.id} value={cat.id}>
              {cat.name}
            </TabsTrigger>
          ))}
        </TabsList>

        <Card>
          <CardContent>
            {filteredFaqs.map((faq) => (
              <div key={faq.id} className="border-b py-3">
                <button
                  className="flex w-full justify-between font-medium"
                  onClick={() => toggleItem(faq.id)}
                >
                  {faq.question}
                  {openItem === faq.id ? <ChevronUp /> : <ChevronDown />}
                </button>

                {openItem === faq.id && (
                  <p className="text-muted-foreground mt-2">{faq.answer}</p>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </Tabs>
    </div>
  );
}
