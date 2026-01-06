import React from "react";
import { Gift, Share2, Copy, Users, DollarSign, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const CustomerReferEarn: React.FC = () => {
  const referralCode = "ZENITH-CUST-992";

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    toast.success("Referral code copied to clipboard!");
  };

  const steps = [
    { title: "Share Link", desc: "Send your referral link to friends and family.", icon: Share2 },
    { title: "Friend Signs Up", desc: "They get a $20 discount on their first purchase.", icon: Users },
    { title: "Get Reward", desc: "You earn $10 credit when they complete an order.", icon: DollarSign },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-primary to-rose-400 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-primary/20">
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest">
              <Gift size={16} />
              Referral Program
            </div>
            <h1 className="text-5xl font-black leading-tight tracking-tighter uppercase">
              Refer a Friend <br /> & Get $10 Credit
            </h1>
            <p className="text-white/80 font-medium text-lg max-w-md">
              Share the love of Zenith Shopper with your friends and earn rewards for every successful referral.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] p-8 space-y-6">
            <h3 className="font-black uppercase tracking-widest text-sm text-center">Your Unique Referral Code</h3>
            <div className="flex items-center gap-4 bg-white/20 rounded-2xl p-4 border border-white/10">
              <span className="flex-1 font-black text-2xl tracking-wider text-center">{referralCode}</span>
              <button 
                onClick={handleCopy}
                className="w-12 h-12 bg-white text-primary rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg"
              >
                <Copy size={20} />
              </button>
            </div>
            <button className="w-full bg-white text-primary py-4 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-black/10 hover:shadow-2xl transition-all flex items-center justify-center gap-2 group">
              Share Now
              <Share2 size={18} className="group-hover:rotate-12 transition-transform" />
            </button>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-[-10%] right-[-5%] w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-[-20%] left-[-5%] w-96 h-96 bg-black/10 rounded-full blur-3xl" />
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {steps.map((step, idx) => (
          <div key={idx} className="bg-card border border-border rounded-3xl p-8 space-y-4 relative group hover:border-primary/40 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg shadow-primary/5">
              <step.icon size={32} />
            </div>
            <h3 className="text-xl font-black text-foreground uppercase tracking-tight">{step.title}</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">{step.desc}</p>
            <div className="absolute top-8 right-8 text-4xl font-black text-muted-foreground/10 select-none">0{idx + 1}</div>
          </div>
        ))}
      </div>

      <div className="bg-accent rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-border">
        <div className="flex items-center gap-6 text-center md:text-left">
          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg shrink-0">
            <DollarSign className="text-primary" size={36} />
          </div>
          <div>
            <h3 className="text-xl font-black text-foreground uppercase">Your Referral Earnings</h3>
            <p className="text-muted-foreground font-medium">You have earned <span className="text-primary font-bold">$40.00</span> so far.</p>
          </div>
        </div>
        <button className="bg-foreground text-background px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-xl transition-all flex items-center gap-2 group">
          Redeem Credits
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default CustomerReferEarn;
