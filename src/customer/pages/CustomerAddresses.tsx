import React from "react";
import { MapPin, Plus, Edit2, Trash2 } from "lucide-react";
import { useCustomerAuth } from "../context/CustomerAuthContext";

const CustomerAddresses: React.FC = () => {
  const { user } = useCustomerAuth();
  
  const initialAddresses = [
    { id: 1, type: "Home", address: "123 Fashion Street, New York, NY 10001", isDefault: true },
    { id: 2, type: "Office", address: "456 Design Avenue, Brooklyn, NY 11201", isDefault: false },
  ];

  const userAddresses = (user?.addresses || []).map((addr: any, index: number) => ({
    id: `user-${index}`,
    type: "Shipping",
    address: `${addr.address}, ${addr.city}, ${addr.state} ${addr.zipCode}`,
    isDefault: false
  }));

  const allAddresses = [...userAddresses, ...initialAddresses];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">My Addresses</h1>
          <p className="text-muted-foreground mt-2 font-medium">Manage your shipping and billing addresses.</p>
        </div>
        <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-2xl font-black uppercase text-xs tracking-widest hover:shadow-lg hover:shadow-pink-500/20 transition-all">
          <Plus size={18} />
          Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allAddresses.map((addr) => (
          <div key={addr.id} className={`bg-card border-2 rounded-3xl p-8 relative transition-all ${addr.isDefault ? 'border-primary shadow-lg shadow-pink-500/5' : 'border-border'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${addr.isDefault ? 'bg-primary text-white' : 'bg-accent text-primary'}`}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="font-black text-foreground">{addr.type}</h3>
                  {addr.isDefault && <span className="text-[10px] font-black text-primary uppercase tracking-widest">Default Address</span>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                  <Edit2 size={18} />
                </button>
                <button className="p-2 text-muted-foreground hover:text-red-500 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <p className="text-muted-foreground font-medium leading-relaxed mt-4">
              {addr.address}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerAddresses;
