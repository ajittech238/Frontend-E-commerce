import React from "react";
import { Lock, Eye } from "lucide-react";

const ChangePassword: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">Change Password</h1>
        <p className="text-muted-foreground mt-2 font-medium">Keep your account secure by updating your password regularly.</p>
      </div>

      <div className="max-w-xl">
        <div className="bg-card border border-border rounded-3xl p-8 shadow-sm">
          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Current Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-accent border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••••••"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-accent border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••••••"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest ml-1">Confirm New Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
                <input 
                  type="password" 
                  className="w-full bg-accent border-none rounded-2xl py-4 pl-12 pr-12 text-sm font-bold focus:ring-2 focus:ring-primary outline-none transition-all"
                  placeholder="••••••••••••"
                />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                  <Eye size={18} />
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button className="w-full bg-primary text-white py-4 rounded-2xl font-black uppercase tracking-widest text-sm hover:shadow-lg hover:shadow-pink-500/20 transition-all">
                Update Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
