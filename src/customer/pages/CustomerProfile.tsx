import React from "react";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import { User, Mail, Phone, MapPin, Calendar } from "lucide-react";

const CustomerProfile: React.FC = () => {
  const { user } = useCustomerAuth();

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">My Profile</h1>
        <p className="text-muted-foreground mt-2 font-medium">Manage your personal information and account settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm flex flex-col items-center text-center">
            <div className="w-32 h-32 rounded-3xl bg-primary/10 overflow-hidden border-4 border-primary/20 mb-6">
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </div>
            <h2 className="text-xl font-black text-foreground leading-tight">{user?.name}</h2>
            <p className="text-primary font-bold uppercase text-xs tracking-widest mt-1">{user?.role}</p>
            <button className="mt-8 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-pink-500/20 transition-all">
              Change Avatar
            </button>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-card rounded-3xl p-8 border border-border shadow-sm">
            <h3 className="text-lg font-black text-foreground uppercase tracking-tight mb-6 flex items-center gap-2">
              <User size={20} className="text-primary" />
              Personal Details
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Full Name</label>
                <div className="font-bold text-foreground">{user?.name}</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Email Address</label>
                <div className="font-bold text-foreground flex items-center gap-2">
                  <Mail size={14} className="text-primary" />
                  {user?.email}
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Phone Number</label>
                <div className="font-bold text-foreground flex items-center gap-2">
                  <Phone size={14} className="text-primary" />
                  +1 (555) 123-4567
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Member Since</label>
                <div className="font-bold text-foreground flex items-center gap-2">
                  <Calendar size={14} className="text-primary" />
                  January 2024
                </div>
              </div>
            </div>

            <button className="mt-8 border-2 border-primary text-primary px-6 py-2 rounded-xl font-bold hover:bg-primary hover:text-white transition-all">
              Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
