import { useState } from "react";
import { Search, Warehouse, Map, Settings, Users, Activity, BarChart3, ShieldCheck, MapPin, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const warehouseOps = [
  { id: "W01", name: "Central Warehouse", type: "Main Distribution", manager: "John Smith", capacity: 85, health: "healthy", activities: 124 },
  { id: "W02", name: "West Coast Hub", type: "Regional Hub", manager: "Sarah Johnson", capacity: 62, health: "healthy", activities: 85 },
  { id: "W03", name: "Midwest Center", type: "Fulfillment Center", manager: "Mike Davis", capacity: 94, health: "critical", activities: 210 },
  { id: "W04", name: "Southern Depot", type: "Storage Facility", manager: "Emily Brown", capacity: 45, health: "healthy", activities: 32 },
];

export default function AdminWarehouseManagement() {
  const [searchQuery, setSearchQuery] = useState("");

  const getHealthBadge = (health: string) => {
    const styles: Record<string, string> = {
      healthy: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      critical: "bg-destructive/10 text-destructive border-destructive/20",
      maintenance: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    };
    return <Badge variant="outline" className={styles[health]}>{health}</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Warehouse Management</h1>
          <p className="text-muted-foreground">Strategic oversight and operational control of all warehouse facilities</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2"><Map className="h-4 w-4" />Floor Plan Editor</Button>
          <Button className="gap-2"><Settings className="h-4 w-4" />System Config</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Active Zones <Activity className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">24</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            System Uptime <ShieldCheck className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">99.98%</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Personnel On-Site <Users className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">142</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2 text-sm font-medium text-muted-foreground flex flex-row items-center justify-between">
            Operational Efficiency <BarChart3 className="h-4 w-4" />
          </CardHeader>
          <CardContent><div className="text-2xl font-bold">92.4%</div></CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Operational Status</CardTitle>
              <CardDescription>Live monitoring of warehouse capacity and health</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Facility</TableHead>
                    <TableHead>Occupancy</TableHead>
                    <TableHead>Health</TableHead>
                    <TableHead>Activity (24h)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warehouseOps.map((op) => (
                    <TableRow key={op.id}>
                      <TableCell>
                        <div className="font-medium">{op.name}</div>
                        <div className="text-xs text-muted-foreground">{op.type}</div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 w-32">
                          <div className="flex justify-between text-[10px] font-medium">
                            <span>{op.capacity}% Full</span>
                            <span className={op.capacity > 90 ? "text-destructive" : ""}>{op.capacity > 90 ? "Critical" : ""}</span>
                          </div>
                          <Progress value={op.capacity} className={`h-1.5 ${op.capacity > 90 ? "bg-destructive/20 [&>div]:bg-destructive" : ""}`} />
                        </div>
                      </TableCell>
                      <TableCell>{getHealthBadge(op.health)}</TableCell>
                      <TableCell>{op.activities} movements</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreHorizontal className="h-4 w-4" /></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem><Edit className="h-4 w-4 mr-2" />Manage Staff</DropdownMenuItem>
                            <DropdownMenuItem><Settings className="h-4 w-4 mr-2" />Maintenance</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive"><Trash2 className="h-4 w-4 mr-2" />Decommission</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common warehouse management tasks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2 h-12">
                <Users className="h-4 w-4" /> Shift Scheduling
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-12">
                <MapPin className="h-4 w-4" /> Zone Optimization
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-12">
                <Activity className="h-4 w-4" /> Performance Audits
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2 h-12 text-destructive hover:text-destructive">
                <Activity className="h-4 w-4" /> Emergency Shutdown
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
