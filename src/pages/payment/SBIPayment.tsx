import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Lock, ChevronLeft, AlertCircle } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { toast } from "@/hooks/use-toast";

const SBIPayment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const orderData = location.state || {};
  const total = orderData.total || 0;

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "cardNumber") {
      const formatted = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
      if (formatted.replace(/\s/g, "").length <= 16) {
        setCardData((prev) => ({ ...prev, [name]: formatted }));
      }
    } else if (name === "cvv") {
      if (value.length <= 3 && /^\d*$/.test(value)) {
        setCardData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "expiryMonth") {
      const num = parseInt(value) || 0;
      if (num <= 12 && value.length <= 2) {
        setCardData((prev) => ({ ...prev, [name]: value }));
      }
    } else if (name === "expiryYear") {
      if (value.length <= 2 && /^\d*$/.test(value)) {
        setCardData((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setCardData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateCardDetails = () => {
    if (!cardData.cardNumber.replace(/\s/g, "").match(/^\d{16}$/)) {
      toast({
        title: "Invalid Card Number",
        description: "Card number must be 16 digits",
        variant: "destructive",
      });
      return false;
    }
    if (!cardData.cardHolder.trim()) {
      toast({
        title: "Invalid Card Holder",
        description: "Please enter card holder name",
        variant: "destructive",
      });
      return false;
    }
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      toast({
        title: "Invalid Expiry Date",
        description: "Please enter valid expiry date",
        variant: "destructive",
      });
      return false;
    }
    if (!cardData.cvv.match(/^\d{3}$/)) {
      toast({
        title: "Invalid CVV",
        description: "CVV must be 3 digits",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handlePayment = async () => {
    if (!validateCardDetails()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      navigate("/payment-success", {
        state: {
          orderId: orderData.orderId,
          transactionId: `SBI-${Date.now()}`,
          amount: total,
        },
      });
    }, 3000);
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
          Back to Checkout
        </button>

        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">SBI Payment Gateway</h1>
            <p className="text-muted-foreground">
              Secure payment with State Bank of India
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className="border-border/50 bg-blue-50 dark:bg-blue-950/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Amount to Pay</p>
                    <p className="text-3xl font-bold text-blue-600">
                      ₹{total.toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Card Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Card Number
                  </label>
                  <Input
                    name="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={handleCardChange}
                    maxLength={19}
                    className="border-border/50 text-lg tracking-widest font-mono"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Visa, Mastercard, RuPay (16 digits)
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Card Holder Name
                  </label>
                  <Input
                    name="cardHolder"
                    placeholder="John Doe"
                    value={cardData.cardHolder}
                    onChange={handleCardChange}
                    className="border-border/50 uppercase"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Month
                    </label>
                    <Input
                      name="expiryMonth"
                      placeholder="MM"
                      value={cardData.expiryMonth}
                      onChange={handleCardChange}
                      maxLength={2}
                      className="border-border/50 text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Year
                    </label>
                    <Input
                      name="expiryYear"
                      placeholder="YY"
                      value={cardData.expiryYear}
                      onChange={handleCardChange}
                      maxLength={2}
                      className="border-border/50 text-center font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      CVV
                    </label>
                    <Input
                      name="cvv"
                      placeholder="***"
                      type="password"
                      value={cardData.cvv}
                      onChange={handleCardChange}
                      maxLength={3}
                      className="border-border/50 text-center font-mono"
                    />
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <Lock className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-green-900 dark:text-green-100">
                        Secure Payment
                      </p>
                      <p className="text-xs text-green-700 dark:text-green-200 mt-1">
                        Your payment is encrypted and secured by SBI's advanced
                        security protocols. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 p-4 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-yellow-900 dark:text-yellow-100">
                        Test Card Information
                      </p>
                      <p className="text-xs text-yellow-700 dark:text-yellow-200 mt-1">
                        Use any 16-digit number for testing purposes
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 h-12 font-semibold text-lg"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      Processing...
                    </>
                  ) : (
                    `Pay ₹${total.toLocaleString()} with SBI`
                  )}
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  By completing your purchase you agree to our Terms of Service and
                  Privacy Policy
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SBIPayment;
