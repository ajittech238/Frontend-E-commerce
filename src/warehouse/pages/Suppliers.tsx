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
import { Search, UserPlus, Phone, Mail, Globe, MapPin, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  category: string;
  rating: number;
  status: "Active" | "Inactive";
}

export default function Suppliers() {
  const [suppliers] = useState<Supplier[]>([
    { id: "VEN-001", name: "Global Tech Inc", contactPerson: "John Smith", email: "john@globaltech.com", phone: "+91 98765 43210", category: "Electronics", rating: 4.8, status: "Active" },
    { id: "VEN-002", name: "Fashion Hub", contactPerson: "Sarah Lee", email: "sarah@fashionhub.com", phone: "+91 88776 65544", category: "Apparel", rating: 4.5, status: "Active" },
    { id: "VEN-003", name: "Home & Living Solutions", contactPerson: "Michael Brown", email: "mike@homeliving.com", phone: "+91 77665 54433", category: "Home Decor", rating: 4.2, status: "Active" },
    { id: "VEN-004", name: "Creative Prints", contactPerson: "Emma Davis", email: "emma@creativeprints.com", phone: "+91 66554 43322", category: "Packaging", rating: 3.9, status: "Inactive" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Suppliers & Vendors</h1>
          <p className="text-sm text-muted-foreground">Manage vendor profiles, contracts, and performance ratings.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 gap-2">
          <UserPlus className="h-4 w-4" /> Add Supplier
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {suppliers.map((vendor) => (
          <Card key={vendor.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-4">
                <div className="h-12 w-12 rounded-xl bg-pink-50 flex items-center justify-center text-pink-600 font-bold text-lg">
                  {vendor.name.charAt(0)}
                </div>
                <Badge variant="outline" className={vendor.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-slate-50 text-slate-700'}>
                  {vendor.status}
                </Badge>
              </div>
              <h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
              <p className="text-xs text-muted-foreground mb-4">{vendor.category}</p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Phone className="h-3 w-3" /> {vendor.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-600">
                  <Mail className="h-3 w-3" /> {vendor.email}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-bold">{vendor.rating}</span>
                  <span className="text-amber-400">★</span>
                </div>
                <Button variant="ghost" size="sm" className="text-pink-600 h-8">View POs</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-none shadow-sm overflow-hidden">
        <div className="p-4 bg-white border-b border-slate-100 flex justify-between items-center">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search Suppliers..." className="pl-10" />
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" /> Filter By
          </Button>
        </div>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50/50">
              <TableRow>
                <TableHead>Vendor ID</TableHead>
                <TableHead>Supplier Name</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {suppliers.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell className="font-mono text-xs">{vendor.id}</TableCell>
                  <TableCell className="font-bold">{vendor.name}</TableCell>
                  <TableCell className="text-sm">{vendor.contactPerson}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">{vendor.category}</Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{vendor.email}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
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
