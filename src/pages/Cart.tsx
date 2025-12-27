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
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back
        </button>

        <h1 className="text-4xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
                  <Button onClick={() => navigate("/products")} className="bg-blue-600 hover:bg-blue-700">
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
                          className="h-24 w-24 rounded-lg object-cover"
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
                      className="w-full text-destructive hover:bg-destructive/10"
                      onClick={clearCart}
                    >
                      Clear Cart
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
                    className="w-full bg-blue-600 hover:bg-blue-700 font-semibold py-6 text-base"
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













// import { useNavigate } from "react-router-dom";
// import { useCart } from "@/context/CartContext";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import {
//   ChevronLeft,
//   Plus,
//   Minus,
//   Trash2,
//   ShoppingBag,
//   BadgePercent,
// } from "lucide-react";
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";

// const Cart = () => {
//   const navigate = useNavigate();
//   const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();

//   const TAX_RATE = 0.1;
//   const SHIPPING_COST = items.length > 0 ? 50 : 0;
//   const subtotal = totalPrice;
//   const tax = Math.round(subtotal * TAX_RATE);
//   const total = subtotal + tax + SHIPPING_COST;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-background to-muted/40 flex flex-col">
//       <Header />

//       <div className="container py-10 flex-1">
//         {/* Back */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center gap-2 text-primary font-medium mb-6"
//         >
//           <ChevronLeft className="h-4 w-4" />
//           Back to Shop
//         </button>

//         <h1 className="text-4xl font-bold mb-10">🛒 Your Shopping Cart</h1>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
//           {/* CART ITEMS */}
//           <div className="lg:col-span-2 space-y-6">
//             {items.length === 0 ? (
//               <Card className="py-20 text-center">
//                 <ShoppingBag className="mx-auto h-20 w-20 text-muted-foreground mb-4" />
//                 <h2 className="text-2xl font-semibold">Your cart is empty</h2>
//                 <p className="text-muted-foreground mt-2">
//                   Looks like you haven’t added anything yet.
//                 </p>
//                 <Button
//                   className="mt-6 bg-blue-600 hover:bg-blue-700"
//                   onClick={() => navigate("/products")}
//                 >
//                   Start Shopping
//                 </Button>
//               </Card>
//             ) : (
//               items.map((item) => {
//                 const savings =
//                   item.originalPrice && item.originalPrice > item.price
//                     ? (item.originalPrice - item.price) * item.quantity
//                     : 0;

//                 return (
//                   <Card
//                     key={item.id}
//                     className="p-4 flex flex-col md:flex-row gap-5 hover:shadow-xl transition-all"
//                   >
//                     {/* IMAGE */}
//                     <div className="relative group w-full md:w-40">
//                       <img
//                         src={item.image}
//                         alt={item.name}
//                         className="rounded-xl w-full h-40 object-cover group-hover:scale-105 transition"
//                       />
//                       {item.originalPrice && (
//                         <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
//                           SALE
//                         </span>
//                       )}
//                     </div>

//                     {/* INFO */}
//                     <div className="flex-1 space-y-2">
//                       <h3 className="text-lg font-semibold line-clamp-2">
//                         {item.name}
//                       </h3>
//                       <p className="text-sm text-muted-foreground">
//                         Category: {item.category}
//                       </p>

//                       <div className="flex items-center gap-3">
//                         <span className="text-xl font-bold text-primary">
//                           ₹{item.price.toLocaleString()}
//                         </span>
//                         {item.originalPrice && (
//                           <span className="line-through text-sm text-muted-foreground">
//                             ₹{item.originalPrice.toLocaleString()}
//                           </span>
//                         )}
//                       </div>

//                       {savings > 0 && (
//                         <p className="text-green-600 text-sm flex items-center gap-1">
//                           <BadgePercent className="w-4 h-4" />
//                           You save ₹{savings.toLocaleString()}
//                         </p>
//                       )}

//                       {/* Quantity */}
//                       <div className="flex items-center gap-3 mt-3">
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity - 1)
//                           }
//                           className="p-2 rounded-md border hover:bg-muted"
//                         >
//                           <Minus size={16} />
//                         </button>
//                         <span className="w-8 text-center font-semibold">
//                           {item.quantity}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateQuantity(item.id, item.quantity + 1)
//                           }
//                           className="p-2 rounded-md border hover:bg-muted"
//                         >
//                           <Plus size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     {/* RIGHT */}
//                     <div className="flex flex-col justify-between items-end">
//                       <p className="font-bold text-lg">
//                         ₹{(item.price * item.quantity).toLocaleString()}
//                       </p>
//                       <button
//                         onClick={() => removeFromCart(item.id)}
//                         className="text-red-500 hover:text-red-700 mt-4"
//                       >
//                         <Trash2 />
//                       </button>
//                     </div>
//                   </Card>
//                 );
//               })
//             )}
//           </div>

//           {/* SUMMARY */}
//           {items.length > 0 && (
//             <div className="sticky top-24 h-fit">
//               <Card className="p-6 space-y-4">
//                 <h3 className="text-xl font-bold">Order Summary</h3>

//                 <div className="space-y-2 text-sm">
//                   <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>₹{subtotal.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Tax (10%)</span>
//                     <span>₹{tax.toLocaleString()}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Shipping</span>
//                     <span>₹{SHIPPING_COST}</span>
//                   </div>
//                 </div>

//                 <div className="border-t pt-3 flex justify-between font-bold text-lg">
//                   <span>Total</span>
//                   <span className="text-primary">
//                     ₹{total.toLocaleString()}
//                   </span>
//                 </div>

//                 <Button
//                   className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-lg"
//                   onClick={() => navigate("/checkout")}
//                 >
//                   Checkout Securely
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => navigate("/products")}
//                 >
//                   Continue Shopping
//                 </Button>

//                 <Button
//                   variant="ghost"
//                   className="w-full text-red-500"
//                   onClick={clearCart}
//                 >
//                   Clear Cart
//                 </Button>
//               </Card>
//             </div>
//           )}
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Cart;
