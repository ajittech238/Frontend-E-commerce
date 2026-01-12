import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCustomerAuth } from "@/customer/context/CustomerAuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Package,
  LogOut,
  Camera,
  Save,
  Plus,
  Trash2,
  Edit2,
  Phone,
  Mail
} from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { user, logout } = useCustomerAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock state for profile form
  const [profileData, setProfileData] = useState({
    name: user?.name || "Guest User",
    email: user?.email || "guest@example.com",
    phone: user?.phone || "+91 98765 43210",
  });

  // Real addresses from context
  const addresses = user?.addresses || [];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    }, 1000);
  };

  const handleDeleteAddress = (id: number) => {
    toast.error("Cannot delete address in this demo");
  };

  return (
    <div className="container py-8 max-w-6xl animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Sidebar / User Info Card */}
        <div className="lg:col-span-4 space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-primary/20 to-purple-500/20 relative">
              <div className="absolute -bottom-12 left-6">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-background shadow-xl">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-2xl font-bold bg-primary/10 text-primary">
                      {profileData.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 h-8 w-8 rounded-full shadow-md">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            <CardContent className="pt-16 pb-6 px-6">
              <h2 className="text-2xl font-bold">{profileData.name}</h2>
              <p className="text-muted-foreground flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" /> {profileData.email}
              </p>
              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20">
                  Verified Customer
                </Badge>
                <Badge variant="outline">Member since 2023</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50 shadow-md hidden lg:block sticky top-24">
            <CardContent className="p-2">
              <nav className="space-y-1">
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium" onClick={() => document.getElementById('profile-tab')?.click()}>
                  <User className="h-4 w-4" /> Personal Information
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium" onClick={() => navigate('/customer/orders')}>
                  <Package className="h-4 w-4" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium" onClick={() => document.getElementById('address-tab')?.click()}>
                  <MapPin className="h-4 w-4" /> Manage Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start gap-3 font-medium text-destructive hover:text-destructive hover:bg-destructive/10" onClick={logout}>
                  <LogOut className="h-4 w-4" /> Log Out
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-8">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start h-auto p-1 bg-transparent border-b border-border/50 rounded-none mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger id="profile-tab" value="profile" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">
                Profile
              </TabsTrigger>
              <TabsTrigger id="address-tab" value="address" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">
                Addresses
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-3">
                Security
              </TabsTrigger>
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details here.</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                    {isEditing ? "Cancel" : <><Edit2 className="h-4 w-4 mr-2" /> Edit</>}
                  </Button>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                            disabled={!isEditing}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                            disabled={!isEditing}
                            className="pl-9"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            id="email"
                            value={profileData.email}
                            disabled
                            className="pl-9 bg-muted/50"
                          />
                        </div>
                        <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="flex justify-end pt-4">
                        <Button type="submit" disabled={loading} className="bg-primary">
                          {loading ? "Saving..." : <><Save className="h-4 w-4 mr-2" /> Save Changes</>}
                        </Button>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Addresses Tab */}
            <TabsContent value="address" className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Saved Addresses</h3>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Add New
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr: any, index: number) => (
                  <Card key={index} className={`relative border-border/50`}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{addr.type || "Home"}</Badge>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary">
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => handleDeleteAddress(index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <p className="font-medium">{addr.fullName || profileData.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {addr.address}<br />
                        {addr.city}, {addr.state} - {addr.zipCode || addr.zip}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {addr.phone || profileData.phone}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your password and account security.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="••••••••" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>New Password</Label>
                      <Input type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label>Confirm New Password</Label>
                      <Input type="password" placeholder="Confirm new password" />
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button>Update Password</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}