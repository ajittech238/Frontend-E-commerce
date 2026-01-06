import React from "react";
import { HelpCircle, MessageSquare, Search, Plus, Filter, MessageCircle, ChevronRight, HelpCircle as QuestionIcon } from "lucide-react";

const CustomerQA: React.FC = () => {
  const faqs = [
    { q: "How do I track my order?", a: "You can track your order by visiting the 'My Orders' section in your dashboard and clicking on the 'View' button for the specific order." },
    { q: "What is your return policy?", a: "We offer a 30-day return policy on all unworn items with tags attached. Returns are free for all premium members." },
    { q: "How can I earn loyalty points?", a: "Points are earned on every purchase ($1 = 1 point), by writing product reviews, and through our referral program." }
  ];

  const userQuestions = [
    { 
      id: 1, 
      question: "Is the 'Luxury Silk Dress' available in XS size?", 
      date: "Mar 15, 2024", 
      status: "Answered", 
      responses: 1, 
      category: "Product" 
    },
    { 
      id: 2, 
      question: "When will you restock the Handmade Leather Bag?", 
      date: "Mar 10, 2024", 
      status: "Pending", 
      responses: 0, 
      category: "Stock" 
    },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">Help & Support</h1>
          <p className="text-muted-foreground mt-2 font-medium">Find answers to common questions or ask your own.</p>
        </div>
        <button className="bg-primary text-white px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl hover:shadow-primary/20 transition-all flex items-center gap-2">
          <Plus size={18} />
          Ask a New Question
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-10">
          {/* Search bar */}
          <div className="relative group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Search help articles, FAQs..." 
              className="w-full bg-card border-2 border-border rounded-[2rem] py-6 pl-16 pr-8 text-lg font-bold focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none transition-all shadow-sm"
            />
          </div>

          {/* My Questions */}
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
              <h3 className="text-xl font-black text-foreground tracking-tight uppercase flex items-center gap-2">
                <MessageSquare size={24} className="text-primary" />
                My Questions
              </h3>
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <Filter size={20} />
              </button>
            </div>
            <div className="space-y-4">
              {userQuestions.map((q) => (
                <div key={q.id} className="bg-card border border-border rounded-[2rem] p-8 hover:shadow-lg hover:shadow-primary/5 transition-all group">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="space-y-3 flex-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] font-black uppercase tracking-widest bg-accent text-primary px-2.5 py-1 rounded-full">
                          {q.category}
                        </span>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{q.date}</span>
                      </div>
                      <h4 className="text-lg font-black text-foreground leading-snug group-hover:text-primary transition-colors truncate">
                        {q.question}
                      </h4>
                    </div>
                    <div className="flex items-center gap-6 shrink-0 border-l border-border pl-6">
                      <div className="text-center">
                        <div className={`text-xs font-black uppercase tracking-wider mb-1 ${q.status === 'Answered' ? 'text-green-500' : 'text-amber-500'}`}>
                          {q.status}
                        </div>
                        <div className="flex items-center justify-center gap-1 text-muted-foreground font-bold text-xs">
                          <MessageCircle size={14} />
                          {q.responses}
                        </div>
                      </div>
                      <ChevronRight className="text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* FAQ Card */}
          <div className="bg-card border border-border rounded-[2rem] p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2">
              <QuestionIcon size={20} className="text-primary" />
              Popular FAQs
            </h3>
            <div className="space-y-6">
              {faqs.map((faq, idx) => (
                <div key={idx} className="space-y-2 group cursor-pointer">
                  <h4 className="font-black text-foreground text-sm group-hover:text-primary transition-colors leading-relaxed">
                    {faq.q}
                  </h4>
                  <p className="text-[11px] text-muted-foreground font-medium line-clamp-2">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
            <button className="w-full bg-accent text-foreground py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-foreground hover:text-white transition-all">
              Browse Help Center
            </button>
          </div>

          {/* Contact Support */}
          <div className="bg-gradient-to-br from-foreground to-slate-800 rounded-[2rem] p-8 text-white space-y-6 shadow-xl">
            <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md">
              <MessageSquare size={28} />
            </div>
            <div>
              <h4 className="text-xl font-black uppercase leading-tight">Need more <br /> assistance?</h4>
              <p className="text-white/60 text-xs font-medium mt-2">Our support team is available 24/7 to help you with anything.</p>
            </div>
            <button className="w-full bg-primary text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:shadow-lg shadow-black/20 transition-all">
              Live Chat Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerQA;
