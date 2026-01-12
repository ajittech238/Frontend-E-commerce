import { Button } from "@/components/ui/button";
import { Search, MapPin, Layers, LayoutGrid, Box, Plus } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Zone {
  id: string;
  name: string;
  capacity: number;
  used: number;
  type: "General" | "Cold Storage" | "Hazmat" | "Electronics";
}

export default function Locations() {
  const [zones] = useState<Zone[]>([
    { id: "Z1", name: "Alpha Zone", capacity: 1200, used: 850, type: "General" },
    { id: "Z2", name: "Beta Zone", capacity: 500, used: 120, type: "Cold Storage" },
    { id: "Z3", name: "Gamma Zone", capacity: 2000, used: 1800, type: "Electronics" },
    { id: "Z4", name: "Delta Zone", capacity: 300, used: 50, type: "Hazmat" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Warehouse Locations</h1>
          <p className="text-sm text-muted-foreground">Manage storage zones, racks, and shelf organization.</p>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700 gap-2">
          <Plus className="h-4 w-4" /> Add Zone
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {zones.map((zone) => (
          <Card key={zone.id} className="border-none shadow-sm overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge className={
                  zone.type === 'General' ? 'bg-blue-50 text-blue-700' :
                  zone.type === 'Cold Storage' ? 'bg-cyan-50 text-cyan-700' :
                  zone.type === 'Electronics' ? 'bg-pink-50 text-pink-700' : 'bg-rose-50 text-rose-700'
                }>
                  {zone.type}
                </Badge>
                <span className="text-xs font-bold text-muted-foreground">{zone.id}</span>
              </div>
              <CardTitle className="text-lg mt-2">{zone.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground font-medium">Capacity Utilization</span>
                  <span className="font-bold">{Math.round((zone.used / zone.capacity) * 100)}%</span>
                </div>
                <Progress value={(zone.used / zone.capacity) * 100} className="h-2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold">Occupied</span>
                    <span className="text-sm font-bold">{zone.used} units</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] uppercase text-muted-foreground font-bold">Available</span>
                    <span className="text-sm font-bold">{zone.capacity - zone.used} units</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full text-xs h-8 border-slate-100 hover:bg-slate-50">View Racks</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Location Mapping</CardTitle>
            <CardDescription>Zone → Rack → Shelf Structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {Array.from({ length: 20 }).map((_, i) => (
                <div key={i} className={`aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center p-2 transition-colors cursor-pointer ${i === 4 ? 'bg-pink-50 border-pink-200 text-pink-600' : 'hover:bg-slate-50 border-slate-100'}`}>
                  <LayoutGrid className="h-5 w-5 mb-1 opacity-50" />
                  <span className="text-[10px] font-bold">RACK-{i + 101}</span>
                  {i === 4 && <Badge className="text-[8px] h-4 mt-1 bg-pink-600">Active</Badge>}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Recent Adjustments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "Move", detail: "SKU-1245: Z1-R02 → Z3-R12", time: "10 mins ago" },
                { type: "Refill", detail: "SKU-4321: Receiving → Z2-R05", time: "1 hour ago" },
                { type: "Clear", detail: "Shelf Z1-R01-S4 Emptied", time: "3 hours ago" },
                { type: "Audit", detail: "Zone 4 Inventory Verified", time: "Yesterday" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 items-start p-2 rounded-lg hover:bg-slate-50 transition-colors">
                  <div className="mt-1 p-1.5 rounded bg-pink-50 text-pink-600">
                    <Box className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs font-bold">{log.type}</p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">{log.detail}</p>
                    <p className="text-[9px] text-slate-400 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-4 text-xs text-pink-600 font-bold">View Audit Trail</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
