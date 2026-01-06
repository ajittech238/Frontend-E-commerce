import React, { useState, useRef } from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { User, Mail, Phone, MapPin, Calendar, Shield, Camera, Edit3, Save, Globe, Smartphone, Lock, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const CustomerProfile: React.FC = () => {
  const { user, updateProfile } = useCustomerAuth();
  const [activeTab, setActiveTab] = useState("personal");
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    dob: user?.dob || "",
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Account Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Globe },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    updateProfile(formData);
    setIsSaving(false);
    toast.success("Profile updated successfully!");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result as string });
        toast.success("Profile picture updated!");
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-6 duration-700">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-foreground uppercase tracking-tight">Account Settings</h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage your digital identity, security preferences and linked devices.</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 p-1.5 rounded-2xl border border-border/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all",
                activeTab === tab.id 
                  ? "bg-primary text-white shadow-xl shadow-primary/20" 
                  : "text-muted-foreground hover:bg-accent"
              )}
            >
              <tab.icon size={14} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column - Profile Card */}
        <div className="xl:col-span-4 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-10 border border-border/50 relative overflow-hidden text-center group">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-primary to-primary/80 opacity-10" />
            
            <div className="relative mb-8 inline-block">
              <div 
                className="w-36 h-36 rounded-[2.5rem] bg-zinc-100 dark:bg-zinc-800 overflow-hidden border-4 border-white dark:border-zinc-900 shadow-2xl mx-auto relative group cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-white dark:border-zinc-900 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
              </div>
            </div>

            <h2 className="text-2xl font-black text-foreground tracking-tight">{user?.name}</h2>
            <p className="text-primary font-black uppercase text-[10px] tracking-[0.2em] mt-2 bg-primary/10 inline-block px-4 py-1 rounded-full">Elite {user?.role}</p>
            
            <div className="grid grid-cols-2 gap-4 mt-10 border-t border-border/50 pt-10">
              <div className="text-center">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Orders</div>
                <div className="text-xl font-black text-foreground">{user?.ordersCount || 0}</div>
              </div>
              <div className="text-center border-l border-border/50">
                <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Spent</div>
                <div className="text-xl font-black text-foreground">{user?.totalSpent || "₹0"}</div>
              </div>
            </div>

            <button 
              onClick={() => fileInputRef.current?.click()}
              className="mt-10 w-full bg-foreground text-background dark:bg-white dark:text-black py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
            >
              <Edit3 size={14} /> Update Avatar
            </button>
          </div>

          <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Shield size={22} />
            </div>
            <div>
              <div className="text-sm font-black text-foreground uppercase tracking-tight">Verified Account</div>
              <p className="text-[11px] text-muted-foreground font-medium">Your account is secured with 2FA.</p>
            </div>
          </div>
        </div>

        {/* Right Column - Forms */}
        <div className="xl:col-span-8 space-y-6">
          <div className="bg-white dark:bg-zinc-900 rounded-[3rem] p-8 lg:p-12 border border-border/50">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <User size={20} />
                </div>
                Personal Identity
              </h3>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100 flex items-center gap-2"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-foreground transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-foreground transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">Primary Phone</label>
                <div className="relative group">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-foreground transition-all outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black text-muted-foreground uppercase tracking-widest ml-1">Date of Birth</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-primary transition-colors" size={18} />
                  <input 
                    type="text" 
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full bg-accent/30 border-2 border-transparent focus:border-primary/50 focus:bg-white dark:focus:bg-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-sm font-bold text-foreground transition-all outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="mt-12 pt-10 border-t border-border/50">
              <h3 className="text-xl font-black text-foreground uppercase tracking-tight flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <Lock size={20} />
                </div>
                Security Access
              </h3>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button className="w-full sm:w-auto px-10 py-4 bg-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 hover:scale-105 transition-all">
                  Change Password
                </button>
                <button className="w-full sm:w-auto px-10 py-4 border-2 border-border text-foreground rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-accent transition-all">
                  Deactivate Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
