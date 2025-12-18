import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { XCircle, ArrowLeft, Phone, Mail } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const PaymentFailed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, amount, errorMessage } = location.state || {};

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <div className="flex-1 container py-12 flex items-center justify-center">
        <Card className="border-border/50 max-w-md w-full">
          <CardContent className="pt-12 pb-8 text-center space-y-6">
            <div className="flex justify-center">
              <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
                <XCircle className="h-10 w-10 text-red-600" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Payment Failed
              </h1>
              <p className="text-muted-foreground">
                Unfortunately, your payment could not be processed
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 p-4 rounded-lg space-y-2 text-left">
              <p className="text-sm font-medium text-red-900 dark:text-red-100">
                Error Details
              </p>
              <p className="text-sm text-red-800 dark:text-red-200">
                {errorMessage || "The transaction was declined. Please check your card details and try again."}
              </p>
            </div>

            {orderId && amount && (
              <div className="bg-gray-50 dark:bg-slate-800/50 p-4 rounded-lg space-y-3 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Order ID:</span>
                  <span className="text-sm font-mono font-bold text-foreground">
                    {orderId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Amount:</span>
                  <span className="text-sm font-bold text-foreground">
                    ₹{amount?.toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            <div className="space-y-3 pt-4">
              <Button
                onClick={() => navigate("/checkout")}
                className="w-full bg-blue-600 hover:bg-blue-700 h-11 font-semibold"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Retry Payment
              </Button>
              <Button variant="outline" className="w-full h-11" onClick={() => navigate("/cart")}>
                Back to Cart
              </Button>
            </div>

            <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-4 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-100 mb-2">
                Need Help?
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <Phone className="h-4 w-4" />
                  <span>Contact: 1-800-ZENITH-1</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
                  <Mail className="h-4 w-4" />
                  <span>support@zenithshopper.com</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-center text-muted-foreground border-t border-border/30 pt-4">
              Your order will be saved. You can retry the payment anytime.
            </p>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default PaymentFailed;
