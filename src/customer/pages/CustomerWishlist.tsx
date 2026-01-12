import React from "react";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

const CustomerWishlist: React.FC = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlistItems.length === 0) {
    return (
      <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div>
          <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">My Wishlist</h1>
          <p className="text-muted-foreground mt-2 font-medium">Items you've saved to buy later.</p>
        </div>
        <div className="bg-card border border-dashed border-border rounded-[3rem] p-20 text-center">
          <Heart size={48} className="mx-auto text-muted-foreground/20 mb-4" />
          <h2 className="text-xl font-bold">Your wishlist is empty</h2>
          <p className="text-muted-foreground">Start adding items you love!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-black text-foreground uppercase tracking-tighter">My Wishlist</h1>
        <p className="text-muted-foreground mt-2 font-medium">Items you've saved to buy later.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item) => (
          <div key={item.id} className="bg-card border border-border rounded-3xl overflow-hidden group hover:shadow-xl transition-all duration-500">
            <div className="aspect-[4/5] relative overflow-hidden">
              <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-sm text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-sm"
                >
                  <Heart size={20} fill="currentColor" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-black text-foreground group-hover:text-primary transition-colors">{item.name}</h3>
              <div className="text-primary font-black text-xl mt-1">₹{item.price.toLocaleString()}</div>
              <div className="grid grid-cols-2 gap-3 mt-6">
                <button 
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-xl font-bold text-xs hover:shadow-lg hover:shadow-pink-500/20 transition-all"
                >
                  <ShoppingCart size={16} />
                  Add to Cart
                </button>
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="flex items-center justify-center gap-2 border border-border text-muted-foreground py-2.5 rounded-xl font-bold text-xs hover:bg-red-50 hover:text-red-500 hover:border-red-200 transition-all"
                >
                  <Trash2 size={16} />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerWishlist;
