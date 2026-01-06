import { useState } from "react";
import {
  User,
  Bell,
  Lock,
  Palette,
  Globe,
  Save,
  Camera,
  Shield,
  Smartphone,
  Mail,
  Eye,
  EyeOff,
  Check,
  Monitor,
  Moon,
  Sun,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

export default function DashboardSettings() {
  const { toast } = useToast();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("dark");
  const [selectedColor, setSelectedColor] = useState("#F59E0B");
  const [profile, setProfile] = useState({
    name: "Admin User",
    email: "admin@craftsy.com",
    phone: "+91 9876543210",
    language: "en",
    timezone: "IST",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    orders: true,
    marketing: false,
    security: true,
    updates: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  const passwordStrength = 75;

  return (
    <div className="space-y-4 sm:space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your account preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4 sm:space-y-6">
        <TabsList className="bg-accent/50 p-1 h-auto flex-wrap">
          <TabsTrigger value="profile" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1 sm:gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1 sm:gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1 sm:gap-2">
            <Lock className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-background text-xs sm:text-sm gap-1 sm:gap-2">
            <Palette className="w-4 h-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-4 sm:space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Profile Information</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Update your personal details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                <div className="relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-primary to-amber-400 flex items-center justify-center shadow-lg">
                    <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
                  </div>
                  <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-pink-gradient text-primary-foreground flex items-center justify-center shadow-lg hover:bg-pink-gradient/90 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="font-semibold text-foreground text-lg">{profile.name}</h3>
                  <p className="text-sm text-muted-foreground">{profile.email}</p>
                  <Badge className="mt-2 bg-pink-gradient/10 text-primary">Admin</Badge>
                </div>
              </div>

              {/* Form */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language" className="text-sm">Language</Label>
                  <Select value={profile.language} onValueChange={(value) => setProfile({ ...profile, language: value })}>
                    <SelectTrigger className="h-10">
                      <Globe className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="hi">Hindi</SelectItem>
                      <SelectItem value="ta">Tamil</SelectItem>
                      <SelectItem value="te">Telugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button onClick={handleSave} className="w-full sm:w-auto bg-pink-gradient hover:bg-pink-gradient/90">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4 sm:space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Notification Preferences</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { id: "email", icon: Mail, label: "Email Notifications", description: "Receive notifications via email" },
                { id: "push", icon: Smartphone, label: "Push Notifications", description: "Receive push notifications on your device" },
                { id: "orders", icon: Bell, label: "Order Updates", description: "Get notified about order status changes" },
                { id: "security", icon: Shield, label: "Security Alerts", description: "Get notified about security events" },
                { id: "updates", icon: Bell, label: "Product Updates", description: "Get notified about new features and updates" },
                { id: "marketing", icon: Mail, label: "Marketing Emails", description: "Receive promotional emails and offers" },
              ].map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-accent/30 hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-pink-gradient/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm sm:text-base">{item.label}</p>
                      <p className="text-xs text-muted-foreground hidden sm:block">{item.description}</p>
                    </div>
                  </div>
                  <Switch
                    checked={notifications[item.id as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications({ ...notifications, [item.id]: checked })
                    }
                  />
                </div>
              ))}

              <Button onClick={handleSave} className="w-full sm:w-auto bg-pink-gradient hover:bg-pink-gradient/90">
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-4 sm:space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Change Password</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Update your password regularly for security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current" className="text-sm">Current Password</Label>
                <div className="relative">
                  <Input
                    id="current"
                    type={showCurrentPassword ? "text" : "password"}
                    className="pr-10 h-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="new" className="text-sm">New Password</Label>
                <div className="relative">
                  <Input
                    id="new"
                    type={showNewPassword ? "text" : "password"}
                    className="pr-10 h-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Password Strength</span>
                    <span className={passwordStrength >= 75 ? "text-emerald-500" : passwordStrength >= 50 ? "text-amber-500" : "text-destructive"}>
                      {passwordStrength >= 75 ? "Strong" : passwordStrength >= 50 ? "Medium" : "Weak"}
                    </span>
                  </div>
                  <Progress value={passwordStrength} className="h-1.5" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm" className="text-sm">Confirm New Password</Label>
                <Input id="confirm" type="password" className="h-10" />
              </div>
              <Button onClick={handleSave} className="w-full sm:w-auto bg-pink-gradient hover:bg-pink-gradient/90">
                <Lock className="w-4 h-4 mr-2" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Two-Factor Authentication</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Add an extra layer of security to your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-accent/30">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-emerald-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm sm:text-base">Enable 2FA</p>
                    <p className="text-xs text-muted-foreground hidden sm:block">Secure your account with two-factor authentication</p>
                  </div>
                </div>
                <Switch />
              </div>

              <div className="p-3 sm:p-4 rounded-xl bg-pink-gradient/5 border border-primary/20">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium text-foreground text-sm">Security Tips</p>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-1">
                      <li>• Use a unique password that you don't use elsewhere</li>
                      <li>• Enable two-factor authentication for extra security</li>
                      <li>• Never share your password with anyone</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Active Sessions</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Manage your active login sessions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { device: "Chrome on Windows", location: "Mumbai, India", current: true },
                { device: "Safari on iPhone", location: "Mumbai, India", current: false },
              ].map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-xl bg-accent/30">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent flex items-center justify-center">
                      <Monitor className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-foreground text-sm">{session.device}</p>
                        {session.current && <Badge className="bg-emerald-500/10 text-emerald-600 text-xs">Current</Badge>}
                      </div>
                      <p className="text-xs text-muted-foreground">{session.location}</p>
                    </div>
                  </div>
                  {!session.current && (
                    <Button variant="ghost" size="sm" className="text-destructive">
                      Revoke
                    </Button>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance" className="space-y-4 sm:space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Theme Settings</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Customize the look and feel of your dashboard</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label className="text-sm">Theme Mode</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  {[
                    { id: "light", icon: Sun, label: "Light" },
                    { id: "dark", icon: Moon, label: "Dark" },
                    { id: "system", icon: Monitor, label: "System" },
                  ].map((theme) => (
                    <button
                      key={theme.id}
                      onClick={() => setSelectedTheme(theme.id)}
                      className={`p-3 sm:p-4 rounded-xl border transition-all flex flex-col items-center gap-2 ${
                        selectedTheme === theme.id
                          ? "border-primary bg-pink-gradient/10 ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50 bg-accent/30"
                      }`}
                    >
                      <theme.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${selectedTheme === theme.id ? 'text-primary' : 'text-muted-foreground'}`} />
                      <span className={`text-xs sm:text-sm font-medium ${selectedTheme === theme.id ? 'text-primary' : 'text-foreground'}`}>
                        {theme.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-sm">Accent Color</Label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { color: "#F59E0B", name: "Amber" },
                    { color: "#EF4444", name: "Red" },
                    { color: "#3B82F6", name: "Blue" },
                    { color: "#10B981", name: "Green" },
                    { color: "#8B5CF6", name: "Purple" },
                    { color: "#EC4899", name: "Pink" },
                  ].map((item) => (
                    <button
                      key={item.color}
                      onClick={() => setSelectedColor(item.color)}
                      className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all hover:scale-110 ${
                        selectedColor === item.color
                          ? "ring-2 ring-offset-2 ring-offset-background ring-foreground scale-110"
                          : ""
                      }`}
                      style={{ backgroundColor: item.color }}
                      title={item.name}
                    />
                  ))}
                </div>
              </div>

              <Button onClick={handleSave} className="w-full sm:w-auto bg-pink-gradient hover:bg-pink-gradient/90">
                <Save className="w-4 h-4 mr-2" />
                Save Theme
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
