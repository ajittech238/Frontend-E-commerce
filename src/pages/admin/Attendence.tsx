import { useState } from "react";
import {
  Clock,
  LogIn,
  LogOut,
  Download,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

/* ================== MAIN ================== */

export default function StaffDashboard() {
  return (
    <div className="p-6 bg-muted/30 min-h-screen">
      <AttendanceSection />
    </div>
  );
}

/* ================== ATTENDANCE ================== */

function AttendanceSection() {
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);

  const [selectedMonth, setSelectedMonth] = useState(0); // Jan
  const [selectedEmployee, setSelectedEmployee] = useState("ALL");

  const year = new Date().getFullYear();
  const daysInMonth = new Date(year, selectedMonth + 1, 0).getDate();

  /* ===== Dummy Data (Backend later) ===== */
  const staffAttendance = [
    {
      name: "Rahul",
      report: generateRandom(daysInMonth),
    },
    {
      name: "Anita",
      report: generateRandom(daysInMonth),
    },
    {
      name: "Vikas",
      report: generateRandom(daysInMonth),
    },
  ];

  const filteredStaff =
    selectedEmployee === "ALL"
      ? staffAttendance
      : staffAttendance.filter((s) => s.name === selectedEmployee);

  /* ===== Check In / Out ===== */
  const handleCheckIn = () => !checkInTime && setCheckInTime(new Date());
  const handleCheckOut = () =>
    checkInTime && !checkOutTime && setCheckOutTime(new Date());

  /* ===== Export CSV ===== */
  const exportCSV = () => {
    let csv = "Employee,Day,Status\n";

    filteredStaff.forEach((staff) => {
      staff.report.forEach((status, i) => {
        csv += `${staff.name},${i + 1},${status}\n`;
      });
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `attendance_${selectedMonth + 1}_${year}.csv`;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">

      {/* ===== PERSONAL CARD ===== */}
      <Card className="max-w-sm">
        <CardContent className="p-4 space-y-4">
          <h3 className="text-sm font-semibold flex items-center gap-2">
            <Clock className="h-4 w-4" /> My Attendance (Today)
          </h3>

          <div className="text-xs space-y-1">
            <div className="flex justify-between">
              <span>Check In</span>
              <span>{checkInTime?.toLocaleTimeString() || "—"}</span>
            </div>
            <div className="flex justify-between">
              <span>Check Out</span>
              <span>{checkOutTime?.toLocaleTimeString() || "—"}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Button size="sm" onClick={handleCheckIn}>
              <LogIn className="h-3 w-3 mr-1" /> In
            </Button>
            <Button size="sm" variant="outline" onClick={handleCheckOut}>
              <LogOut className="h-3 w-3 mr-1" /> Out
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ===== FILTERS ===== */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
        >
          {months.map((m, i) => (
            <option key={m} value={i}>
              {m}
            </option>
          ))}
        </select>

        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedEmployee}
          onChange={(e) => setSelectedEmployee(e.target.value)}
        >
          <option value="ALL">All Employees</option>
          {staffAttendance.map((s) => (
            <option key={s.name}>{s.name}</option>
          ))}
        </select>

        <Button size="sm" onClick={exportCSV}>
          <Download className="h-4 w-4 mr-1" /> Export
        </Button>
      </div>

      {/* ===== MASTER TABLE ===== */}
      <Card>
        <CardContent className="p-4 overflow-x-auto">
          <table className="border-collapse text-xs w-full">
            <thead>
              <tr>
                <th className="p-2 text-left">Employee</th>
                {Array.from({ length: daysInMonth }).map((_, i) => (
                  <th key={i} className="p-1 text-center">
                    {i + 1}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {filteredStaff.map((staff) => (
                <tr key={staff.name} className="border-t">
                  <td className="p-2 font-medium">{staff.name}</td>
                  {staff.report.map((s, i) => (
                    <td
                      key={i}
                      className={`text-center font-bold ${
                        s === "P"
                          ? "text-green-600"
                          : s === "A"
                          ? "text-red-600"
                          : s === "L"
                          ? "text-yellow-600"
                          : "text-orange-600"
                      }`}
                    >
                      {s}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* ===== LEGEND ===== */}
      <div className="text-xs flex gap-4">
        <span className="text-green-600">P – Present</span>
        <span className="text-red-600">A – Absent</span>
        <span className="text-yellow-600">L – Late</span>
        <span className="text-orange-600">H – Half Day</span>
      </div>
    </div>
  );
}

/* ================== HELPERS ================== */

const months = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December"
];

function generateRandom(days: number) {
  const values = ["P", "A", "L", "H"];
  return Array.from({ length: days }, () =>
    values[Math.floor(Math.random() * values.length)]
  );
}
