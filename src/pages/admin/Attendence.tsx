import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, LogIn, LogOut } from "lucide-react";
import { toast } from "sonner";

const StaffAttendance = () => {
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<Date | null>(null);

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(now);
    setCheckOutTime(null);
    toast.success("Checked in successfully ✅");
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(now);
    toast.success("Checked out successfully 👋");
  };

  const calculateHours = () => {
    if (!checkInTime || !checkOutTime) return "—";
    const diff =
      (checkOutTime.getTime() - checkInTime.getTime()) / 1000 / 60 / 60;
    return `${diff.toFixed(2)} hrs`;
  };

  return (
    <Card className="max-w-md rounded-2xl shadow-lg">
      <CardContent className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Clock className="text-primary" />
          <h2 className="text-xl font-bold">Attendance</h2>
        </div>

        {/* Status */}
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Status</span>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              checkOutTime
                ? "bg-gray-100 text-gray-700"
                : checkInTime
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {checkOutTime
              ? "Checked Out"
              : checkInTime
              ? "Present"
              : "Absent"}
          </span>
        </div>

        {/* Time Info */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span>Check In</span>
            <span>
              {checkInTime
                ? checkInTime.toLocaleTimeString()
                : "—"}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Check Out</span>
            <span>
              {checkOutTime
                ? checkOutTime.toLocaleTimeString()
                : "—"}
            </span>
          </div>

          <div className="flex justify-between font-semibold">
            <span>Working Hours</span>
            <span>{calculateHours()}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            className="w-full"
            onClick={handleCheckIn}
            disabled={!!checkInTime && !checkOutTime}
          >
            <LogIn className="mr-2 h-4 w-4" />
            Check In
          </Button>

          <Button
            variant="outline"
            className="w-full"
            onClick={handleCheckOut}
            disabled={!checkInTime || !!checkOutTime}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Check Out
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default StaffAttendance;
