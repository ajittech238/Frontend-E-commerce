import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Package,
  Truck,
  AlertTriangle,
  CheckCircle,
  ArrowDownLeft,
  ArrowUpRight,
  Clock,
  TrendingUp,
  BarChart2,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";

const kpis = [
  {
    title: "Total Inventory",
    value: "12,450",
    change: "+2.5%",
    trend: "up",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Inbound Today",
    value: "420",
    change: "+12%",
    trend: "up",
    icon: ArrowDownLeft,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Outbound Today",
    value: "312",
    change: "+8%",
    trend: "up",
    icon: ArrowUpRight,
    color: "bg-orange-100 text-orange-600",
  },
  {
    title: "Low Stock Alerts",
    value: "18",
    change: "-3",
    trend: "down",
    icon: AlertTriangle,
    color: "bg-rose-100 text-rose-600",
  },
];

const stockMovementData = [
  { name: "Mon", inbound: 400, outbound: 240 },
  { name: "Tue", inbound: 300, outbound: 139 },
  { name: "Wed", inbound: 200, outbound: 980 },
  { name: "Thu", inbound: 278, outbound: 390 },
  { name: "Fri", inbound: 189, outbound: 480 },
  { name: "Sat", inbound: 239, outbound: 380 },
  { name: "Sun", inbound: 349, outbound: 430 },
];

const fulfillmentData = [
  { name: "08:00", rate: 85 },
  { name: "10:00", rate: 92 },
  { name: "12:00", rate: 88 },
  { name: "14:00", rate: 95 },
  { name: "16:00", rate: 91 },
  { name: "18:00", rate: 89 },
];

const recentActivities = [
  { id: 1, type: "Inbound", detail: "GRN-7822 Received (Electronics)", time: "2 mins ago", status: "Completed" },
  { id: 2, type: "Outbound", detail: "Order #W-5592 Picked & Packed", time: "15 mins ago", status: "In Progress" },
  { id: 3, type: "Inventory", detail: "Stock Adjustment: SKU-1245 (+50)", time: "1 hour ago", status: "Verified" },
  { id: 4, type: "Alert", detail: "Low Stock: SKU-4321 (Running Shoes)", time: "3 hours ago", status: "Pending" },
];

export default function Dashboard() {
  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">WMS Overview</h1>
          <p className="text-sm text-muted-foreground">
            Real-time monitoring of warehouse operations and inventory levels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Card className="px-3 py-1.5 flex items-center gap-2 text-xs font-medium">
            <Clock className="h-3.5 w-3.5 text-pink-500" />
            Last Sync: 12:45 PM
          </Card>
          <button className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k, i) => (
          <Card key={i} className="border-none shadow-sm bg-white overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className={`p-2.5 rounded-xl ${k.color}`}>
                  <k.icon className="h-5 w-5" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium ${k.trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {k.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingUp className="h-3 w-3 rotate-180" />}
                  {k.change}
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-muted-foreground font-medium">{k.title}</p>
                <h3 className="text-2xl font-bold mt-1">{k.value}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart2 className="h-5 w-5 text-pink-500" />
              Stock Movement
            </CardTitle>
            <CardDescription>Daily inbound vs outbound volume</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockMovementData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  cursor={{ fill: '#f8fafc' }}
                />
                <Bar dataKey="inbound" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="outbound" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Fulfillment Rate</CardTitle>
            <CardDescription>On-time dispatch performance</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fulfillmentData}>
                <defs>
                  <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="rate" stroke="#ec4899" fillOpacity={1} fill="url(#colorRate)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
            <div className="text-center mt-2">
              <span className="text-3xl font-bold">94.2%</span>
              <p className="text-xs text-muted-foreground mt-1">Average efficiency today</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="text-lg">Recent Activities</CardTitle>
              <CardDescription>Latest logs from the warehouse floor</CardDescription>
            </div>
            <button className="text-xs text-pink-600 font-medium hover:underline">View All</button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                  <div className={`mt-1 p-1.5 rounded-full ${
                    activity.type === 'Inbound' ? 'bg-emerald-100 text-emerald-600' : 
                    activity.type === 'Outbound' ? 'bg-orange-100 text-orange-600' :
                    activity.type === 'Alert' ? 'bg-rose-100 text-rose-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {activity.type === 'Inbound' ? <ArrowDownLeft className="h-3.5 w-3.5" /> : 
                     activity.type === 'Outbound' ? <ArrowUpRight className="h-3.5 w-3.5" /> :
                     activity.type === 'Alert' ? <AlertTriangle className="h-3.5 w-3.5" /> : <Package className="h-3.5 w-3.5" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">{activity.type}</p>
                      <span className="text-[10px] text-muted-foreground">{activity.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{activity.detail}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                        activity.status === 'Completed' ? 'bg-emerald-50 text-emerald-700' :
                        activity.status === 'In Progress' ? 'bg-blue-50 text-blue-700' :
                        activity.status === 'Verified' ? 'bg-indigo-50 text-indigo-700' : 'bg-amber-50 text-amber-700'
                      }`}>
                        {activity.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg">Low Stock SKU Alerts</CardTitle>
            <CardDescription>Items below re-order threshold</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left border-b border-slate-100">
                    <th className="pb-3 font-medium text-muted-foreground">SKU</th>
                    <th className="pb-3 font-medium text-muted-foreground">Item Name</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">In Stock</th>
                    <th className="pb-3 font-medium text-muted-foreground text-center">Min Level</th>
                    <th className="pb-3 font-medium text-muted-foreground text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {[
                    { sku: "SKU-4321", name: "Running Shoes - 9", stock: 12, min: 25 },
                    { sku: "SKU-9981", name: "Ceramic Mug", stock: 8, min: 20 },
                    { sku: "SKU-1122", name: "Wireless Earbuds", stock: 5, min: 15 },
                    { sku: "SKU-5544", name: "Notebook Set", stock: 15, min: 30 },
                  ].map((item, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3 font-mono text-xs">{item.sku}</td>
                      <td className="py-3 font-medium">{item.name}</td>
                      <td className="py-3 text-center">
                        <span className="text-rose-600 font-bold">{item.stock}</span>
                      </td>
                      <td className="py-3 text-center text-muted-foreground">{item.min}</td>
                      <td className="py-3 text-right">
                        <button className="text-pink-600 hover:text-pink-700 text-xs font-semibold">Re-order</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
