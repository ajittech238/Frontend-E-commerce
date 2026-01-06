import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useOrder } from "@/context/OrderContext";
import { useCustomerAuth } from "@/customer/context/CustomerAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Truck, CreditCard, Package } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, clearCart } = useCart();
  const { createOrder } = useOrder();
  const { user, addOrder, addAddress } = useCustomerAuth();

  const TAX_RATE = 0.1;
  const SHIPPING_COST = items.length > 0 ? 50 : 0;
  const subtotal = totalPrice;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + tax + SHIPPING_COST;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "card",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateStep1 = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.state ||
      !formData.zipCode
    ) {
      toast({
        title: "Missing Information",
        description: "Please fill in all address fields.",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handlePlaceOrder = () => {
    if (!validateStep1()) return;

    const orderId = `ORD-${Date.now()}`;
    const customerId = user?.id || `CUST-${Date.now()}`;
    const newOrder = {
      id: orderId,
      customerId,
      customerName: formData.fullName || user?.name || "",
      customerEmail: formData.email || user?.email || "",
      items,
      subtotal,
      tax,
      shipping: SHIPPING_COST,
      total,
      shippingAddress: {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
      },
      paymentMethod: formData.paymentMethod,
      paymentStatus: "completed" as const,
      orderStatus: "confirmed" as const,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save to global orders store
    createOrder(newOrder);

    // Save order and address to the customer's profile (localStorage)
    try {
      addOrder(newOrder);
      addAddress(newOrder.shippingAddress);
    } catch (e) {
      // If customer context isn't available or fails, continue silently
    }

    clearCart();

    toast({
      title: "Order Placed Successfully! 🎉",
      description: `Order ID: ${orderId}`,
    });

    navigate(`/order-confirmation/${orderId}`);
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <Package className="h-16 w-16 mx-auto text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold">Your Cart is Empty</h2>
            <p className="text-muted-foreground">Add items to your cart before checking out</p>
            <Button onClick={() => navigate("/products")} className="mt-4">
              Continue Shopping
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Cart
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {/* Step Indicators */}
            <div className="flex items-center gap-4 mb-8">
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${
                  step >= 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                1
              </div>
              <div className={`flex-1 h-1 ${step >= 2 ? "bg-blue-600" : "bg-gray-200"}`} />
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${
                  step >= 2
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                2
              </div>
              <div className={`flex-1 h-1 ${step >= 3 ? "bg-blue-600" : "bg-gray-200"}`} />
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-full font-bold ${
                  step >= 3
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-600"
                }`}
              >
                3
              </div>
            </div>

            {/* Shipping Address */}
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <Input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />
                  <Input
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />
                  <Input
                    name="address"
                    placeholder="Street Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="border-border/50 "
                  />
                  <Input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />
                  <Input
                    name="state"
                    placeholder="State/Province"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />
                  <Input
                    name="zipCode"
                    placeholder="PIN Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="border-border/50"
                  />

                  <Button onClick={() => validateStep1() && setStep(2)} className="w-50 hover: bg-pink-400 bg-pink-600">
                  Continue to Payment
                </Button>
                </div>

                {/* <Button onClick={() => setStep(2)} className="w-50 bg-blue-600 hover:bg-blue-700">
                  Continue to Payment
                </Button> */}
              </CardContent>
            </Card>

            {/* Payment Method */}
            {step >= 2 && (
              <Card className="border-border/50 mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 flex justify-center flex-col  items-center ">
                  <div className="space-y-3 w-full">
                    {["card", "upi", "netbanking"].map((method) => (
                      <label
                        key={method}
                        className="flex items-center   gap-3 p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          checked={formData.paymentMethod === method}
                          onChange={handleInputChange}
                          className="w-4 h-4"
                        />
                        <span className="font-medium capitalize">
                          {method === "card"
                            ? "Debit/Credit Card"
                            : method === "upi"
                            ? "UPI"
                            : "Net Banking"}
                        </span>
                      </label>
                    ))}
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-80 bg-green-600 hover:bg-green-700 font-semibold "
                  >
                    Place Order
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>


          {/* Order Summary */}
          <div>
            <Card className="border-border/50 sticky top-24">
              <CardHeader>
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Cart Items */}
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between pb-2 border-b border-border/30 last:border-0"
                    >
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.name}</p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm whitespace-nowrap">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t-2 border-border/30 pt-4 space-y-2">
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

                  <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
                    <div className="flex justify-between">
                      <span className="font-bold text-foreground">Total</span>
                      <span className="font-bold text-blue-600 text-lg">
                        ₹{total.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Badge className="w-full justify-center py-2 bg-pink-500">
                    {items.length} {items.length === 1 ? "item" : "items"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
