import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Cart = () => {
  const navigate = useNavigate();
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

  const TAX_RATE = 0.1;
  const SHIPPING_COST = items.length > 0 ? 50 : 0;
  const subtotal = totalPrice;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + SHIPPING_COST;

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        {/* title and back button*/}
        <div className="grid grid-cols-3 items-center mb-8">
        {/* Back Button (Left) */}
    <button
      onClick={() => navigate(-1)}
      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium justify-self-start">
      <ChevronLeft className="h-4 w-4" />
      Back
    </button>

  {/* Center Heading */}
  <h1 className="text-4xl font-bold text-foreground text-center">
    Shopping Cart
  </h1>

  {/* Empty space for right alignment */}
  <div />
</div>


        {/* <h1 className="text-4xl font-bold text-foreground mb-8  flex justify-center">Shopping Cart</h1> */}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {items.length === 0 ? (
              <Card className="border-border/50">
                <CardContent className="py-16 text-center">
                  <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                  <h2 className="text-2xl font-bold text-foreground mb-2">Cart is Empty</h2>
                  <p className="text-muted-foreground mb-6">
                    Add some products to your cart to get started
                  </p>
                  <Button onClick={() => navigate("/products")} className="bg-pink-400 hover:bg-pink-600">
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle>{items.length} Item(s) in Cart</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 pb-4 border-b border-border/30 last:border-0 last:pb-0"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-lg object-cover"
                        />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {item.category}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-lg font-bold text-foreground">
                            ₹{item.price.toLocaleString()}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{item.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-semibold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Price Total */}
                      <div className="text-right">
                        <p className="font-bold text-lg text-foreground">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {item.quantity} × ₹{item.price.toLocaleString()}
                        </p>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg transition-colors text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  ))}

                  {/* Clear Cart */}
                  <div className="pt-4 border-t border-border/30">
                    <Button
                      variant="outline"
                      className="w-80 mx-auto text-destructive hover:bg-destructive/25 flex items-center gap-2"
                      onClick={clearCart}
                    >
                      Clear Cart <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                </CardContent>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          {items.length > 0 && (
            <div className="lg:col-span-1">
              <Card className="border-border/50 sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Tax (10%)</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">₹{SHIPPING_COST.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 font-semibold py-6 text-base text-color-black"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate("/products")}
                  >
                    Continue Shopping
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
