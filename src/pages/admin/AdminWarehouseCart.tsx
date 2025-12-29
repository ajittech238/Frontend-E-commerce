import { useState } from "react";
import { Search, ShoppingCart, Warehouse, Package, Trash2, ArrowRight, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const cartItems = [
  { id: "WCI001", productId: "PROD-001", name: "iPhone 15 Pro", warehouse: "Central Warehouse", quantity: 5, unitPrice: 129999, total: 649995 },
  { id: "WCI002", productId: "PROD-012", name: "Sony Headphones", warehouse: "Central Warehouse", quantity: 10, unitPrice: 24999, total: 249990 },
];

export default function AdminWarehouseCart() {
  const [sourceWarehouse, setSourceWarehouse] = useState("");
  const [targetWarehouse, setTargetWarehouse] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + item.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Internal Cart</h1>
          <p className="text-muted-foreground">Manage internal stock transfers between warehouses</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Source Warehouse</Label>
                  <Select value={sourceWarehouse} onValueChange={setSourceWarehouse}>
                    <SelectTrigger><SelectValue placeholder="Select source" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Warehouse</SelectItem>
                      <SelectItem value="west">West Coast Hub</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-center pt-5 text-muted-foreground">
                  <ArrowRight className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <Label className="text-xs uppercase font-bold text-muted-foreground mb-1 block">Target Warehouse</Label>
                  <Select value={targetWarehouse} onValueChange={setTargetWarehouse}>
                    <SelectTrigger><SelectValue placeholder="Select target" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="central">Central Warehouse</SelectItem>
                      <SelectItem value="west">West Coast Hub</SelectItem>
                      <SelectItem value="midwest">Midwest Center</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search products in source warehouse..." className="pl-10" />
              </div>

              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>Qty</TableHead>
                    <TableHead>Unit Price</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-muted-foreground">{item.productId}</div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 border rounded-md px-1 w-fit">
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Minus className="h-3 w-3" /></Button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <Button variant="ghost" size="icon" className="h-7 w-7"><Plus className="h-3 w-3" /></Button>
                        </div>
                      </TableCell>
                      <TableCell>₹{item.unitPrice.toLocaleString()}</TableCell>
                      <TableCell>₹{item.total.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="h-4 w-4" /></Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {cartItems.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                        <ShoppingCart className="h-10 w-10 mx-auto mb-2 opacity-20" />
                        No items in cart
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Transfer Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Source</span>
                  <span className="font-medium">{sourceWarehouse || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Destination</span>
                  <span className="font-medium">{targetWarehouse || "Not selected"}</span>
                </div>
                <div className="flex justify-between text-sm pt-4 border-t">
                  <span className="text-muted-foreground">Total Items</span>
                  <span className="font-medium">{cartItems.reduce((a, b) => a + b.quantity, 0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Value</span>
                  <span className="font-bold text-lg text-primary">₹{subtotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-2 pt-4">
                <Label>Transfer Priority</Label>
                <Select defaultValue="normal">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">High (Express)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Internal Notes</Label>
                <Input placeholder="Reason for transfer..." />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={!sourceWarehouse || !targetWarehouse || cartItems.length === 0}>
                Initiate Stock Transfer
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
