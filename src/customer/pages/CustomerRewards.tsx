import React from "react";
import { Coins, Star, Trophy, ArrowRight, Zap, Target, Sparkles, Gift } from "lucide-react";

const CustomerRewards: React.FC = () => {
  const tiers = [
    { name: "Silver", points: "0-500", active: true, color: "text-slate-400" },
    { name: "Gold", points: "501-2000", active: false, color: "text-amber-500" },
    { name: "Platinum", points: "2001+", active: false, color: "text-blue-400" },
  ];

  const milestones = [
    { title: "First Purchase", reward: "50 pts", completed: true },
    { title: "Complete Profile", reward: "20 pts", completed: true },
    { title: "Write a Review", reward: "10 pts", completed: false },
    { title: "Newsletter Signup", reward: "15 pts", completed: true },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Points Card */}
          <div className="bg-card border-2 border-primary/20 rounded-[2.5rem] p-10 relative overflow-hidden group shadow-xl shadow-primary/5">
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-rose-400 flex items-center justify-center p-1 shadow-2xl shadow-primary/30">
                <div className="w-full h-full rounded-full bg-card flex flex-col items-center justify-center">
                  <Coins className="text-primary mb-1 animate-bounce" size={32} />
                  <span className="text-3xl font-black text-foreground">450</span>
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Points</span>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">
                  <Star size={12} fill="currentColor" />
                  Silver Member
                </div>
                <h2 className="text-4xl font-black text-foreground tracking-tighter uppercase leading-tight">Your Rewards Balance</h2>
                <p className="text-muted-foreground font-medium max-w-sm">You are <span className="text-primary font-bold">50 points</span> away from becoming a <span className="text-amber-500 font-bold uppercase">Gold Member</span>!</p>
                <div className="w-full h-3 bg-accent rounded-full overflow-hidden mt-4 border border-border">
                  <div className="h-full bg-gradient-to-r from-primary to-rose-400 w-[90%] rounded-full shadow-lg shadow-primary/20" />
                </div>
              </div>
            </div>
            {/* Decorative BG */}
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Sparkles size={120} />
            </div>
          </div>

          {/* Active Rewards / Coupons */}
          <div className="space-y-6">
            <h3 className="text-xl font-black text-foreground tracking-tight uppercase px-2 flex items-center gap-2">
              <Gift size={24} className="text-primary" />
              Available Rewards
            </h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "$15 Off", cost: "300 pts", code: "REWARD15", color: "bg-blue-500" },
                { title: "Free Shipping", cost: "150 pts", code: "FREESHIP", color: "bg-green-500" },
              ].map((reward) => (
                <div key={reward.code} className="bg-card border-border border-2 border-dashed rounded-3xl p-6 hover:border-primary/50 transition-all group cursor-pointer">
                  <div className={`w-12 h-12 rounded-2xl ${reward.color} text-white flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Zap size={24} fill="currentColor" />
                  </div>
                  <h4 className="text-2xl font-black text-foreground leading-tight mb-1">{reward.title}</h4>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-black text-primary uppercase tracking-widest">{reward.cost}</span>
                    <button className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors">
                      Redeem <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Tiers Card */}
          <div className="bg-card border border-border rounded-[2rem] p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2">
              <Trophy size={20} className="text-amber-500" />
              Loyalty Tiers
            </h3>
            <div className="space-y-4">
              {tiers.map((tier) => (
                <div key={tier.name} className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${tier.active ? 'bg-primary/5 border-primary/20 scale-105' : 'bg-accent/30 border-transparent opacity-60'}`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-card flex items-center justify-center shadow-sm ${tier.color}`}>
                      <Star size={18} fill="currentColor" />
                    </div>
                    <div>
                      <div className="font-black text-foreground text-sm uppercase tracking-tight">{tier.name}</div>
                      <div className="text-[10px] font-bold text-muted-foreground uppercase">{tier.points} pts</div>
                    </div>
                  </div>
                  {tier.active && <CheckCircle2 size={18} className="text-primary" />}
                </div>
              ))}
            </div>
          </div>

          {/* Points History Milestones */}
          <div className="bg-card border border-border rounded-[2rem] p-8 space-y-6 shadow-sm">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight flex items-center gap-2">
              <Target size={20} className="text-primary" />
              Ways to Earn
            </h3>
            <div className="space-y-5">
              {milestones.map((m) => (
                <div key={m.title} className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.completed ? 'bg-green-100 text-green-600' : 'bg-accent text-muted-foreground'}`}>
                    <CheckCircle2 size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground text-sm truncate">{m.title}</div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-widest">{m.reward}</div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 bg-accent text-foreground py-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:bg-primary hover:text-white transition-all">
              View All Tasks
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRewards;
