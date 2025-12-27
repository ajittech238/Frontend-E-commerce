import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

const CartSidebar = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-foreground/40 backdrop-blur-sm z-50 animate-fade-in"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-full max-w-md bg-card z-50 shadow-2xl transition-transform duration-300 ease-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-header text-header-foreground">
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5" />
              <h2 className="font-display font-bold text-lg">Shopping Cart</h2>
              <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded">
                {totalItems}
              </span>
            </div>
            <Button variant="ghost" size="icon" className="text-header-foreground hover:bg-white/10" onClick={() => setIsCartOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                <h3 className="font-display font-bold text-lg mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Add items to get started
                </p>
                <Button onClick={() => setIsCartOpen(false)} className="btn-amazon">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3 p-3 rounded-lg bg-secondary/50 border border-border"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-contain bg-white rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2">{item.name}</h4>
                    <p className="text-foreground font-bold mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center border border-border rounded">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-none"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-primary hover:text-primary text-xs ml-auto"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-border p-4 space-y-3 bg-secondary/30">
              <div className="flex justify-between items-center">
                <span className="text-lg">Subtotal ({totalItems} items):</span>
                <span className="font-bold text-lg">{formatPrice(totalPrice)}</span>
              </div>
              <p className="text-success text-sm">✓ Your order qualifies for FREE Delivery</p>


              <div className="grid grid-cols-2 gap-4">
                <Link to="/cart" onClick={() => setIsCartOpen(false)}>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 h-11 text-sm font-medium rounded">
                    View Cart
                  </Button>
                </Link>
              
                <Link to="/checkout" onClick={() => setIsCartOpen(false)}>
                  <Button className="w-full btn-amazon h-11 text-sm font-medium rounded">
                    Proceed to Checkout
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;