import { useState } from "react";
import { Search, ExternalLink, Settings, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const integrations = [
  { id: "amazon", name: "Amazon Seller Central", description: "Sync products, orders, and inventory with Amazon Marketplace", status: "connected", category: "Marketplace", route: "/dashboard/integrations/amazon" },
  { id: "shopify", name: "Shopify", description: "Connect your Shopify store for unified management", status: "connected", category: "E-commerce", route: "/dashboard/integrations/shopify" },
  { id: "ebay", name: "eBay", description: "Manage eBay listings and auctions", status: "connected", category: "Marketplace", route: "/dashboard/integrations/ebay" },
  { id: "walmart", name: "Walmart Marketplace", description: "Sell on Walmart's marketplace platform", status: "connected", category: "Marketplace", route: "/dashboard/integrations/walmart" },
  { id: "flipkart", name: "Flipkart Seller Hub", description: "Manage your Flipkart seller account", status: "connected", category: "Marketplace", route: "/dashboard/integrations/flipkart" },
  { id: "woocommerce", name: "WooCommerce", description: "Integrate with your WordPress WooCommerce store", status: "connected", category: "E-commerce", route: "/dashboard/integrations/woocommerce" },
  { id: "razorpay", name: "Razorpay", description: "Accept payments via Razorpay gateway", status: "connected", category: "Payments", route: "/dashboard/integrations/razorpay" },
  { id: "whatsapp", name: "WhatsApp Business", description: "Send notifications and updates via WhatsApp", status: "connected", category: "Communication", route: "/dashboard/integrations/whatsapp" },
];

export default function AdminIntegrations() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const filteredIntegrations = integrations.filter(i =>
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const categories = [...new Set(integrations.map(i => i.category))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground">Connect and manage third-party services</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {categories.map((category) => {
        const categoryIntegrations = filteredIntegrations.filter(i => i.category === category);
        if (categoryIntegrations.length === 0) return null;

        return (
          <div key={category} className="space-y-4">
            <h2 className="text-lg font-semibold text-foreground">{category}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryIntegrations.map((integration) => (
                <Card key={integration.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => navigate(integration.route)}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <CardTitle className="text-base">{integration.name}</CardTitle>
                        <CardDescription className="text-sm">{integration.description}</CardDescription>
                      </div>
                      {integration.status === "connected" ? (
                        <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20" variant="outline">
                          <CheckCircle className="h-3 w-3 mr-1" />Connected
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <XCircle className="h-3 w-3 mr-1" />Disconnected
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="h-4 w-4 mr-2" />Configure
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
