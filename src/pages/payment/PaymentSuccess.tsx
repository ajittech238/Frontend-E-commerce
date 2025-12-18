import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Download, Home, ShoppingBag } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, transactionId, amount } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container py-12 flex items-center justify-center">
        <Card className="border-border/50 max-w-md w-full">
          <CardContent className="pt-12 pb-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground">
                Your transaction has been completed successfully
              </p>
            </div>

            <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-3 text-left">
              <div className="flex justify-between items-center pb-3 border-b border-border/30">
                <span className="text-sm text-muted-foreground">Order ID:</span>
                <span className="text-sm font-mono font-bold text-foreground">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-border/30">
                <span className="text-sm text-muted-foreground">Transaction ID:</span>
                <span className="text-sm font-mono font-bold text-foreground">
                  {transactionId}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount Paid:</span>
                <span className="text-sm font-bold text-green-600">
                  ₹{amount?.toLocaleString()}
                </span>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
                ✓ Payment confirmed with State Bank of India (SBI)
              </p>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate(`/order-confirmation/${orderId}`)}
                className="w-full bg-green-600 hover:bg-green-700 h-11 font-semibold"
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                View Order Details
              </Button>
              <Button
                variant="outline"
                className="w-full h-11"
                onClick={() => window.print()}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Receipt
              </Button>
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => navigate("/")}
              >
                <Home className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground border-t border-border/30 pt-4">
              A confirmation email has been sent to your registered email address
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentSuccess;
