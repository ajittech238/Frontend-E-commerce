import { useState } from "react";
import {
  LayoutDashboard,
  Ticket,
  MessageCircle,
  Search,
  RotateCcw,
  User,
  AlertTriangle,
  Bell,
  BarChart3,
  BookOpen,
  Settings,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function CustomerSupportDashboard() {
  const [active, setActive] = useState("overview");

  const menu = [
    { id: "overview", label: "Support Overview", icon: LayoutDashboard },
    { id: "tickets", label: "Tickets", icon: Ticket },
    { id: "chat", label: "Live Chat", icon: MessageCircle },
    { id: "orders", label: "Order Lookup", icon: Search },
    { id: "returns", label: "Returns & Refunds", icon: RotateCcw },
    { id: "customer", label: "Customer Profile", icon: User },
        { id: "notifications", label: "Notifications", icon: Bell },
    { id: "metrics", label: "Performance", icon: BarChart3 },
        { id: "settings", label: "Profile & Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r p-4 space-y-2">
        <h2 className="text-xl font-semibold mb-4">Customer Support</h2>
        {menu.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition ${
              active === item.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-muted"
            }`}
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </button>
        ))}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {active === "overview" && <Overview />}
        {active === "tickets" && <Tickets />}
        {active === "chat" && <LiveChat />}
        {active === "orders" && <OrderLookup />}
        {active === "returns" && <ReturnsRefunds />}
        {active === "customer" && <CustomerProfile />}
                {active === "notifications" && <Notifications />}
        {active === "metrics" && <Metrics />}
                {active === "settings" && <ProfileSettings />}
      </main>
    </div>
  );
}

/* ---------------- Sections ---------------- */

function Overview() {
  const stats = [
    "Open Tickets",
    "Pending / Resolved",
    "Avg Response Time",
    "SLA Status",
    "Today's Escalations",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((s) => (
        <Card key={s}>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">{s}</p>
            <h3 className="text-2xl font-semibold mt-2">--</h3>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function Tickets() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Tickets / Queries</h3>
        <p className="text-sm text-muted-foreground mb-2">
          Ticket ID • Customer • Issue Type • Priority • Status
        </p>
        <Button size="sm">Reply</Button>
        <Button size="sm" variant="outline" className="ml-2">
          Add Internal Note
        </Button>
      </CardContent>
    </Card>
  );
}

function LiveChat() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Live Chat Support</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Active chats, chat history, quick replies & file uploads.
        </p>
      </CardContent>
    </Card>
  );
}

function OrderLookup() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Order Lookup</h3>
        <input
          placeholder="Search by Order ID / phone / email"
          className="mt-4 w-full border rounded-md px-3 py-2 text-sm"
        />
      </CardContent>
    </Card>
  );
}

function ReturnsRefunds() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Returns & Refunds</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Manage return requests, refund status & escalations.
        </p>
      </CardContent>
    </Card>
  );
}

function CustomerProfile() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Customer Profile</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Customer details, order history, complaints & loyalty tier.
        </p>
      </CardContent>
    </Card>
  );
}


function Notifications() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <p className="text-sm text-muted-foreground mt-2">
          New tickets, SLA breaches & escalation alerts.
        </p>
      </CardContent>
    </Card>
  );
}

function Metrics() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold">Performance Metrics</h3>
        <p className="text-sm text-muted-foreground mt-2">
          Tickets handled, response time, resolution rate & CSAT.
        </p>
      </CardContent>
    </Card>
  );
}


function ProfileSettings() {
  return (
    <Card>
      <CardContent className="p-6 space-y-2">
        <h3 className="text-lg font-semibold">Profile & Settings</h3>
        <Button size="sm">Go Online / Offline</Button>
        <Button size="sm" variant="outline">
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}

/* ================== EXTENDED FEATURES ==================

// 1️⃣ Attendance Calendar View
import { Calendar } from "@/components/ui/calendar";

export function AttendanceCalendar({ records }) {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Attendance Calendar</h3>
        <Calendar
          mode="single"
          modifiers={{
            present: records.present,
            absent: records.absent,
            late: records.late,
          }}
          modifiersClassNames={{
            present: "bg-green-200",
            absent: "bg-red-200",
            late: "bg-yellow-200",
          }}
        />
      </CardContent>
    </Card>
  );
}

// 2️⃣ Admin – Leave Approval Panel
export function LeaveApproval() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leave Requests</h3>
        <div className="flex justify-between items-center border-b py-2">
          <span>Rahul • 2 Days • Sick Leave</span>
          <div className="flex gap-2">
            <Button size="sm">Approve</Button>
            <Button size="sm" variant="outline">Reject</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// 3️⃣ Salary Calculation from Hours
export function SalaryCalculation({ hours }) {
  const HOURLY_RATE = 120;
  const salary = hours * HOURLY_RATE;

  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-2">Salary Calculation</h3>
        <p className="text-sm">Total Hours: {hours}</p>
        <p className="font-semibold mt-1">Salary: ₹{salary}</p>
      </CardContent>
    </Card>
  );
}

/* 4️⃣ API + DATABASE SCHEMA

API ENDPOINTS
POST   /api/attendance/check-in
POST   /api/attendance/check-out
GET    /api/attendance/monthly/:staffId

POST   /api/leaves/apply
PUT    /api/leaves/:id/approve

GET    /api/salary/:staffId

DATABASE TABLES
Staff(id, name, role, hourlyRate)
Attendance(id, staffId, date, checkIn, checkOut, hours, status)
Leaves(id, staffId, fromDate, toDate, type, status)
Salary(staffId, month, totalHours, totalSalary)
*/
