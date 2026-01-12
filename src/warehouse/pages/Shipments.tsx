import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, Truck, ExternalLink, MapPin, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Shipment {
  id: string;
  orderId: string;
  carrier: string;
  trackingId: string;
  status: "In Transit" | "Delivered" | "Out for Delivery" | "Failed";
  destination: string;
  estimatedDelivery: string;
}

export default function Shipments() {
  const [shipments] = useState<Shipment[]>([
    { id: "SHP-9001", orderId: "W-5595", carrier: "Delhivery", trackingId: "DEL9876543210", status: "In Transit", destination: "Mumbai, MH", estimatedDelivery: "2024-01-14" },
    { id: "SHP-9002", orderId: "W-5596", carrier: "BlueDart", trackingId: "BD2233445566", status: "Delivered", destination: "Bangalore, KA", estimatedDelivery: "2024-01-10" },
    { id: "SHP-9003", orderId: "W-5598", carrier: "Ecom Express", trackingId: "ECOM11223344", status: "Out for Delivery", destination: "Delhi, DL", estimatedDelivery: "2024-01-12" },
    { id: "SHP-9004", orderId: "W-5601", carrier: "XpressBees", trackingId: "XB5566778899", status: "Failed", destination: "Chennai, TN", estimatedDelivery: "2024-01-11" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Shipments & Tracking</h1>
          <p className="text-sm text-muted-foreground">Real-time delivery status and courier integration management.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 gap-2">
          <Truck className="h-4 w-4" /> Manifest Daily
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Shipments", value: "124", icon: Truck, color: "text-blue-600" },
          { label: "Delivered (24h)", value: "56", icon: CheckCircle, color: "text-emerald-600" },
          { label: "Estimated Today", value: "18", icon: Clock, color: "text-amber-600" },
          { label: "Exceptions", value: "3", icon: AlertCircle, color: "text-rose-600" },
        ].map((stat, i) => (
          <Card key={i} className="border-none shadow-sm">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">{stat.label}</p>
                  <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                </div>
                <div className={`p-2 rounded-lg bg-slate-50 ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 bg-white border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Tracking ID or Order ID..." className="pl-10" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Last 7 Days</Button>
            <Button variant="outline" size="sm">Carrier: All</Button>
          </div>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Shipment ID</TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Carrier & Tracking</TableHead>
                <TableHead>Destination</TableHead>
                <TableHead>Est. Delivery</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {shipments.map((shp) => (
                <TableRow key={shp.id}>
                  <TableCell className="font-bold text-xs">{shp.id}</TableCell>
                  <TableCell className="font-medium text-pink-600">{shp.orderId}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{shp.carrier}</span>
                      <span className="text-[10px] text-muted-foreground font-mono">{shp.trackingId}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3 w-3 text-muted-foreground" />
                      {shp.destination}
                    </div>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{shp.estimatedDelivery}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={
                      shp.status === 'Delivered' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      shp.status === 'In Transit' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      shp.status === 'Failed' ? 'bg-rose-50 text-rose-700 border-rose-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }>
                      {shp.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" title="Track on Carrier Website">
                      <ExternalLink className="h-4 w-4 text-pink-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
