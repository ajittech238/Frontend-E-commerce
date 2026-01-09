import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrder } from "@/context/OrderContext";
import { useCustomerAuth } from "../context/CustomerAuthContext";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const CustomerOrderDetail: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const { getOrderById } = useOrder();
  const { user } = useCustomerAuth();

  const order = orderId ? getOrderById(orderId) : undefined;

  // If not found in global orders, try user's orders
  const fallback = (user?.orders || []).find((o: any) => o.id === orderId);
  const activeOrder = order || fallback;

  if (!activeOrder) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="container py-12">
          <Card>
            <CardHeader>
              <CardTitle>Order Not Found</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">We couldn't find the requested order.</p>
              <div className="mt-4">
                <Button onClick={() => navigate(-1)}>Go Back</Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-black mb-4">Order Details - {activeOrder.id}</h1>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  <div className="font-bold">{activeOrder.shippingAddress?.fullName}</div>
                  <div className="text-sm">{activeOrder.shippingAddress?.address}</div>
                  <div className="text-sm">{activeOrder.shippingAddress?.city}, {activeOrder.shippingAddress?.state} - {activeOrder.shippingAddress?.zipCode}</div>
                  <div className="text-sm">Phone: {activeOrder.shippingAddress?.phone}</div>
                  <div className="text-sm">Email: {activeOrder.shippingAddress?.email}</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(activeOrder.items || []).map((item: any) => (
                    <div key={item.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <img src={item.image} alt={item.name} className="w-16 h-16 rounded object-cover" />
                        <div>
                          <div className="font-semibold">{item.name}</div>
                          <div className="text-sm text-muted-foreground">Qty: {item.quantity}</div>
                        </div>
                      </div>
                      <div className="font-bold">₹{(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <aside>
            <Card>
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">₹{(activeOrder.subtotal || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="font-semibold">₹{(activeOrder.tax || 0).toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold">₹{(activeOrder.shipping || 0).toLocaleString()}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-black text-lg">Total <span>₹{(activeOrder.total || 0).toLocaleString()}</span></div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="text-xs text-muted-foreground">Payment Method</div>
                  <div className="font-medium">{activeOrder.paymentMethod}</div>
                </div>

                <div className="mt-4">
                  <Button onClick={() => navigate(-1)} variant="ghost">Back to Orders</Button>
                </div>
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerOrderDetail;
