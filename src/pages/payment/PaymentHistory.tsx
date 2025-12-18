import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Download, Eye, ChevronLeft } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

interface Payment {
  id: string;
  transactionId: string;
  orderId: string;
  amount: number;
  date: string;
  status: "completed" | "failed" | "pending";
  method: string;
  last4Digits: string;
}

const PaymentHistory = () => {
  const navigate = useNavigate();

  const [payments] = useState<Payment[]>([
    {
      id: "1",
      transactionId: "SBI-1734541349001",
      orderId: "ORD-1734541349000",
      amount: 15999,
      date: "2024-12-18",
      status: "completed",
      method: "SBI Credit Card",
      last4Digits: "4532",
    },
    {
      id: "2",
      transactionId: "SBI-1734454849001",
      orderId: "ORD-1734454849000",
      amount: 8499,
      date: "2024-12-17",
      status: "completed",
      method: "SBI Debit Card",
      last4Digits: "7890",
    },
    {
      id: "3",
      transactionId: "SBI-1734368449001",
      orderId: "ORD-1734368449000",
      amount: 5999,
      date: "2024-12-16",
      status: "failed",
      method: "SBI Net Banking",
      last4Digits: "5678",
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "completed":
        return "✓ Completed";
      case "failed":
        return "✗ Failed";
      case "pending":
        return "⏳ Pending";
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const totalSpent = payments
    .filter((p) => p.status === "completed")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <div className="flex-1 container py-8">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Total Transactions</p>
              <p className="text-3xl font-bold text-foreground">{payments.length}</p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Successful Payments</p>
              <p className="text-3xl font-bold text-green-600">
                {payments.filter((p) => p.status === "completed").length}
              </p>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-2">Total Amount Spent</p>
              <p className="text-3xl font-bold text-blue-600">
                {formatPrice(totalSpent)}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <CreditCard className="h-16 w-16 mx-auto text-muted-foreground opacity-50 mb-4" />
                <p className="text-muted-foreground text-lg">
                  No payment history found
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {payments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-center justify-between p-4 border border-border/50 rounded-lg hover:bg-accent/30 transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground">
                          {payment.method}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ••••{payment.last4Digits} • {formatDate(payment.date)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-bold text-foreground">
                          {formatPrice(payment.amount)}
                        </p>
                        <Badge className={getStatusColor(payment.status)}>
                          {getStatusLabel(payment.status)}
                        </Badge>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => navigate(`/order-confirmation/${payment.orderId}`)}
                        className="flex-shrink-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0"
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
            Payment Methods
          </h3>
          <p className="text-sm text-blue-800 dark:text-blue-200 mb-4">
            We accept the following payment methods through SBI:
          </p>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <li className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <span className="text-lg">💳</span> Debit Cards (Visa, Mastercard, RuPay)
            </li>
            <li className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <span className="text-lg">💳</span> Credit Cards (Visa, Mastercard)
            </li>
            <li className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <span className="text-lg">🏦</span> Net Banking
            </li>
            <li className="flex items-center gap-2 text-sm text-blue-800 dark:text-blue-200">
              <span className="text-lg">📱</span> UPI (Coming Soon)
            </li>
          </ul>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PaymentHistory;
