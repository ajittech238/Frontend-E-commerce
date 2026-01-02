import { useState, useMemo } from "react";
import {
  CreditCard,
  Truck,
  Shield,
  Check,
  MapPin,
  User,
  Mail,
  Phone,
  ChevronRight,
  Wallet,
  Building,
  Gift,
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const paymentMethods = [
  { id: "card", name: "Credit/Debit Card", icon: CreditCard, description: "Visa, Mastercard, RuPay" },
  { id: "upi", name: "UPI Payment", icon: Wallet, description: "Google Pay, PhonePe, Paytm" },
  { id: "netbanking", name: "Net Banking", icon: Building, description: "All major banks supported" },
  { id: "cod", name: "Cash on Delivery", icon: Truck, description: "Pay when delivered" },
];

const steps = [
  { id: 1, name: "Shipping", icon: MapPin },
  { id: 2, name: "Payment", icon: CreditCard },
  { id: 3, name: "Confirm", icon: Check },
];

export default function DashboardCheckout() {
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      toast({
        title: "Promo Applied!",
        description: "10% discount has been applied to your order.",
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid promo code.",
        variant: "destructive",
      });
    }
  };

  const discount = useMemo(() => promoApplied ? totalPrice * 0.1 : 0, [promoApplied, totalPrice]);
  const finalTotal = useMemo(() => totalPrice - discount, [totalPrice, discount]);

  const handlePlaceOrder = () => {
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "Thank you for your order. You will receive a confirmation email shortly.",
    });
    clearCart();
    setStep(3);
  };

  if (items.length === 0 && step !== 3) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in">
        <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-accent/50 flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-muted-foreground" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2 text-center">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground mb-6 text-center">Add some items to proceed with checkout</p>
        <Button onClick={() => navigate("/products")} className="bg-pink-gradient">
          <ShoppingBag className="w-4 h-4 mr-2" />
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        {step > 1 && step < 3 && (
          <Button variant="ghost" size="icon" onClick={() => setStep(step - 1)} className="rounded-full">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>
          <p className="text-sm text-muted-foreground mt-1">Complete your order securely</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-card rounded-xl p-4 border border-border/50">
        <div className="flex items-center justify-between max-w-md mx-auto">
          {steps.map((s, index) => (
            <div key={s.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s.id
                    ? "bg-pink-gradient text-primary-foreground shadow-lg shadow-primary/30"
                    : "bg-accent text-muted-foreground"
                }`}>
                  {step > s.id ? <Check className="w-5 h-5" /> : <s.icon className="w-5 h-5" />}
                </div>
                <span className={`text-xs mt-2 font-medium ${step >= s.id ? "text-foreground" : "text-muted-foreground"}`}>
                  {s.name}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 sm:w-20 h-0.5 mx-2 ${step > s.id ? "bg-pink-gradient" : "bg-border"}`} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-4">
          {step === 1 && (
            <Card className="border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  Shipping Information
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Enter your delivery address</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4" /> Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Doe"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4" /> Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com"
                      className="h-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 9876543210"
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm">Street Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="123 Main Street, Apt 4B"
                    className="h-10"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-sm">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Mumbai"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state" className="text-sm">State</Label>
                    <Input
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Maharashtra"
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2 col-span-2 sm:col-span-1">
                    <Label htmlFor="pincode" className="text-sm">Pincode</Label>
                    <Input
                      id="pincode"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="400001"
                      className="h-10"
                    />
                  </div>
                </div>
                <Button
                  onClick={() => setStep(2)}
                  className="w-full bg-pink-gradient hover:bg-pink-gradient/90 h-11"
                >
                  Continue to Payment
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 2 && (
            <Card className="border-border/50 animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <CreditCard className="w-5 h-5 text-primary" />
                  Payment Method
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Select your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className={`flex items-center gap-4 p-3 sm:p-4 rounded-xl border transition-all cursor-pointer ${
                        paymentMethod === method.id
                          ? "border-primary bg-pink-gradient/5 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50 bg-accent/30"
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        paymentMethod === method.id ? 'bg-pink-gradient text-primary-foreground' : 'bg-accent'
                      }`}>
                        <method.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <Label htmlFor={method.id} className="cursor-pointer font-medium text-sm sm:text-base">
                          {method.name}
                        </Label>
                        <p className="text-xs text-muted-foreground">{method.description}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                {paymentMethod === "card" && (
                  <div className="space-y-4 pt-4 border-t border-border animate-fade-in">
                    <div className="space-y-2">
                      <Label className="text-sm">Card Number</Label>
                      <Input placeholder="1234 5678 9012 3456" className="h-10" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Expiry Date</Label>
                        <Input placeholder="MM/YY" className="h-10" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">CVV</Label>
                        <Input placeholder="123" type="password" className="h-10" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Cardholder Name</Label>
                      <Input placeholder="Name on card" className="h-10" />
                    </div>
                  </div>
                )}

                <Button onClick={handlePlaceOrder} className="w-full bg-pink-gradient hover:bg-pink-gradient/90 h-11">
                  <Shield className="w-4 h-4 mr-2" />
                  Place Order - ₹{finalTotal.toLocaleString()}
                </Button>
              </CardContent>
            </Card>
          )}

          {step === 3 && (
            <Card className="border-border/50 animate-scale-in text-center py-8 sm:py-12">
              <CardContent className="space-y-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto animate-[scale-in_0.5s_ease-out]">
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-foreground">Order Confirmed!</h2>
                  <p className="text-sm text-muted-foreground mt-2">
                    Thank you for your order. We'll send you a confirmation email shortly.
                  </p>
                </div>
                <div className="bg-accent/50 rounded-xl p-4 max-w-sm mx-auto">
                  <p className="text-xs text-muted-foreground">Order Number</p>
                  <p className="font-mono font-bold text-foreground text-lg">ORD-{Date.now().toString().slice(-8)}</p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                  <Button variant="outline" onClick={() => navigate("/dashboard/orders")}>
                    View Orders
                  </Button>
                  <Button onClick={() => navigate("/products")} className="bg-pink-gradient">
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Order Summary */}
        {step !== 3 && (
          <div className="space-y-4">
            <Card className="border-border/50 sticky top-24">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg">Order Summary</CardTitle>
                <CardDescription className="text-xs">{items.length} items in cart</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-48 overflow-y-auto space-y-3 pr-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-cover"
                        loading="lazy"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-xs sm:text-sm truncate">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-xs sm:text-sm font-semibold text-primary">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Promo Code */}
                <div className="space-y-2">
                  <Label className="text-xs flex items-center gap-2">
                    <Gift className="w-4 h-4" /> Promo Code
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="h-9 text-sm"
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                      className="h-9"
                    >
                      {promoApplied ? <Check className="w-4 h-4" /> : "Apply"}
                    </Button>
                  </div>
                  {promoApplied && (
                    <Badge className="bg-emerald-500/10 text-emerald-600">
                      10% discount applied
                    </Badge>
                  )}
                </div>

                <Separator />

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">₹{totalPrice.toLocaleString()}</span>
                  </div>
                  {promoApplied && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount (10%)</span>
                      <span>-₹{discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-emerald-600">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg pt-2">
                    <span className="text-foreground">Total</span>
                    <span className="text-primary">₹{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted-foreground bg-accent/50 p-3 rounded-lg">
                  <Shield className="w-4 h-4 flex-shrink-0" />
                  <span>Secure checkout with 256-bit SSL encryption</span>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
