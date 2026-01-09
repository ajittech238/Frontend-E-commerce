import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  Zap,
  ChevronDown,
  Sparkles,
  Bell,
  Package,
  Star,
  Loader,
  Home,
  LogOut,
  Settings,
  Gift,
  HelpCircle,
  ShoppingBag,
  UserCircle,
  Diamond,

} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useCustomerAuth } from "@/customer/context/CustomerAuthContext";
import { categories, products } from "@/data/products";
import { fashionProducts } from "@/data/fashion";
import { electronicsProducts } from "@/data/electronics";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const navigate = useNavigate();
  const { totalItems, setIsCartOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { isAuthenticated, user, logout } = useCustomerAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const allProducts = [...products, ...fashionProducts, ...electronicsProducts];

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    if (query.trim().length === 0) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const filtered = allProducts
      .filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description?.toLowerCase().includes(query.toLowerCase()) ||
          product.category?.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 8);

    setSearchResults(filtered);
    setShowSearchResults(true);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim().length > 0) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearchResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearchSubmit();
    } else if (e.key === "Escape") {
      setShowSearchResults(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Promo Banner */}
      <div className="bg-gradient-to-r from-primary/90 to-primary text-primary-foreground text-center py-2.5 text-sm font-semibold">
        <div className="container flex items-center justify-center gap-2">
          <Zap className="h-4 w-4 animate-pulse" />
          <span>🎉 Mega Sale Live! Free shipping on all orders over ₹999</span>
          <Zap className="h-4 w-4 animate-pulse" />
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white dark:bg-card border-b border-border/50 backdrop-blur-lg bg-opacity-95">
        <div className="container">
          <div className="flex items-center justify-between gap-4 py-4 md:py-3">
            {/* Left Section - Logo & Menu */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 rounded-lg hover:bg-accent"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center gap-2 flex-shrink-0 group"
              >
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <Package className="h-5 w-5 text-white font-bold" />
                </div>
                <span className="font-display text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hidden sm:block">
                  Zenith
                </span>
              </Link>
            </div>

            {/* Center Section - Search Bar (Desktop) */}
            <div
              className="hidden lg:flex flex-1 max-w-xl"
              ref={searchContainerRef}
            >
              <div className="relative flex items-center w-full rounded-lg border border-border/50 bg-white dark:bg-slate-900">
                <Search className="h-5 w-5 text-muted-foreground absolute left-4 z-10" />
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products, brands..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => {
                    setIsSearchFocused(true);
                    if (searchQuery.length > 0) setShowSearchResults(true);
                  }}
                  onBlur={() => setIsSearchFocused(false)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 h-11 pl-12 pr-4"
                />

                {/* Search Results Dropdown */}
                {showSearchResults && searchResults.length > 0 && (
                  <div className="absolute top-12 left-0 right-0 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                    {searchResults.map((product) => (
                      <Link
                        key={product.id}
                        to={`/product/${product.id}`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="flex items-center gap-3 px-4 py-3 border-b border-border/30 last:border-0"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-10 w-10 rounded object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {product.category}
                            </span>
                            {product.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span className="text-xs text-muted-foreground">
                                  {product.rating}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <span className="text-sm font-bold text-primary">
                          ₹{product.price.toLocaleString("en-IN")}
                        </span>
                      </Link>
                    ))}
                    {searchResults.length >= 8 && (
                      <Link
                        to={`/products?search=${encodeURIComponent(
                          searchQuery
                        )}`}
                        onClick={() => {
                          setShowSearchResults(false);
                          setSearchQuery("");
                        }}
                        className="block px-4 py-3 text-center text-sm font-semibold text-primary border-t border-border/30"
                      >
                        View all results
                      </Link>
                    )}
                  </div>
                )}

                {showSearchResults &&
                  searchQuery.length > 0 &&
                  searchResults.length === 0 && (
                    <div className="absolute top-12 left-0 right-0 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg z-50 p-4 text-center">
                      <p className="text-sm text-muted-foreground">
                        No products found for "{searchQuery}"
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Right Section - Actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden md:flex h-10 w-10 rounded-lg hover:bg-accent"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-white text-xs flex items-center justify-center font-bold animate-pulse">
                  3
                </span>
              </Button>

              {/* Account Dropdown */}
              {isAuthenticated ? (
                <div
                  className="relative group"
                  onMouseEnter={() => setIsAccountOpen(true)}
                  onMouseLeave={() => setIsAccountOpen(false)}
                >
                  <DropdownMenu open={isAccountOpen} onOpenChange={setIsAccountOpen}>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex items-center gap-2 h-10 px-3 rounded-lg hover:bg-accent font-medium text-sm transition-all duration-300"
                      >
                        <User className="h-5 w-5 text-primary" />
                        <span className="hidden md:block">Account</span>
                        <ChevronDown className={cn("h-4 w-4 transition-transform duration-300", isAccountOpen ? "rotate-180" : "")} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mt-1 p-2 bg-white dark:bg-zinc-900 border border-border/50 rounded-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-200" align="end">
                      <DropdownMenuLabel className="px-3 py-2">
                        <div className="flex flex-col">
                          <span className="text-sm font-black text-foreground">My Account</span>
                          <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{user?.email}</span>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="my-1 bg-border/50" />
                      <DropdownMenuItem onClick={() => { navigate("/customer/profile"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <UserCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate("/customer/orders"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <ShoppingBag className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Orders</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate("/customer/refer-earn"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <Gift className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Refer & Earn</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate("/customer/rewards"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <Star className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Rewards</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate("/customer/qa"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <HelpCircle className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Help & Support</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => { navigate("/customer/profile"); setIsAccountOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-primary/10 hover:text-primary transition-all group">
                        <Settings className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        <span className="text-sm font-bold">Settings</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="my-1 bg-border/50" />
                      <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer hover:bg-destructive/10 hover:text-destructive transition-all group text-destructive">
                        <LogOut className="h-4 w-4" />
                        <span className="text-sm font-bold">Logout</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button
                      variant="outline"
                      size="sm"
                      className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg border-2 border-border/50 hover:border-primary/50 hover:bg-pink-gradient/5 font-semibold text-sm transition-all duration-300"
                    >
                      Sign In
                    </Button>
                  </Link>

                  <Link to="/signup">
                    <Button
                      size="sm"
                      className="hidden sm:flex items-center gap-2 h-10 px-4 rounded-lg bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Wishlist */}
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative h-10 w-10 rounded-lg hover:bg-accent"
                >
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-pink-gradient text-primary-foreground text-xs font-bold">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Cart */}
              <Link to="/cart">
                <Button
                  size="sm"
                  className="relative flex items-center gap-1 md:gap-2 h-8 md:h-9 px-2 md:px-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-sm font-semibold shadow-sm text-xs md:text-sm"
                >
                  <ShoppingCart className="h-4 w-4" />
                  <span className="hidden md:block">Cart</span>
                  {totalItems > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-red-600 text-white text-xs font-bold">
                      {totalItems}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="lg:hidden pb-3" ref={searchContainerRef}>
            <div className="relative flex items-center rounded-lg border border-border/50 bg-white dark:bg-slate-900">
              <Search className="h-5 w-5 text-muted-foreground absolute left-4 z-10" />
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => {
                  setIsSearchFocused(true);
                  if (searchQuery.length > 0) setShowSearchResults(true);
                }}
                onBlur={() => setIsSearchFocused(false)}
                onKeyDown={handleKeyDown}
                className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground h-10 pl-12 pr-4"
              />

              {/* Mobile Search Results Dropdown */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="absolute top-11 left-0 right-0 bg-white dark:bg-slate-900 border border-border rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
                  {searchResults.slice(0, 5).map((product) => (
                    <Link
                      key={product.id}
                      to={`/product/${product.id}`}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }}
                      className="flex items-center gap-3 px-3 py-2 border-b border-border/30 last:border-0"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-8 w-8 rounded object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-foreground truncate">
                          {product.name}
                        </p>
                      </div>
                      <span className="text-xs font-bold text-primary">
                        ₹{product.price.toLocaleString("en-IN")}
                      </span>
                    </Link>
                  ))}
                  {searchResults.length > 5 && (
                    <Link
                      to={`/products?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setShowSearchResults(false);
                        setSearchQuery("");
                      }}
                      className="block px-3 py-2 text-center text-xs font-semibold text-primary border-t border-border/30"
                    >
                      View all results
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories Nav */}
      <nav className="hidden lg:block bg-white dark:bg-card border-b border-border/50 backdrop-blur-sm">
        <div className="container">
          <ul className="flex items-center gap-8 py-3">
            {/* Fashion with Dropdown */}
            <li className="relative group">
              <Link
                to={`/category/fashion`}
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-1"
              >
                Fashion
                <ChevronDown className="h-4 w-4 group-hover:rotate-180 transition-transform" />
              </Link>

              {/* Dropdown Menu */}
              <div className="absolute left-0 mt-0 w-40 bg-white dark:bg-card border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  to="/menfashion"
                  className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors border-b border-border/30 first:rounded-t-lg"
                >
                  Men
                </Link>
                <Link
                  to="/womenfashion"
                  className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors border-b border-border/30"
                >
                  Women
                </Link>
                <Link
                  to="/menfashion"
                  className="block px-4 py-3 text-sm font-medium text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors last:rounded-b-lg"
                >
                  Kids
                </Link>
              </div>
            </li>

            {/* Electronics */}
            <li>
              <Link
                to="/electronics"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>⚡</span>
                Electronics
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            <li>
              <Link
                to="/grocery"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>🛒</span>
                Grocery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>

            <li>
              <Link
                to="/homeliving"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>
                  <Home className="h-4 w-4 text-gray-500" />
                </span>
                Home & Living
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>

            {/* Books */}
            <li>
              <Link
                to="/books"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>📚</span>
                Books
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>

            {/* jewellery */}
            <li>
              <Link
                to="/jewellery"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span><Diamond className="h-4 w-4 text-gray-500"/></span>
                Jewellery
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            {/* perfume */}
            <li>
              <Link
                to="/perfume"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>🧴</span>
                PerFume
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>
            {/* Sports */}
            <li>
              <Link
                to="/sports"
                className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors duration-200 relative group flex items-center gap-1"
              >
                <span>⚽</span>
                Sports
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary to-primary/50 group-hover:w-full transition-all duration-300" />
              </Link>
            </li>

            <li className="ml-auto">
              <Link
                to="/products"
                className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors flex items-center gap-1 bg-pink-gradient/10 px-4 py-2 rounded-lg"
              >
                Explore All
                <ChevronDown className="h-4 w-4" />
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-32 bg-white dark:bg-background z-40 overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="container py-6 space-y-6">
            {/* Quick Access */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg">Quick Access</h3>
              <Link
                to="/customer"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-transparent transition-colors"
              >
                <div className="h-10 w-10 rounded-lg bg-pink-gradient/20 flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sign In</p>
                  <p className="text-xs text-muted-foreground">
                    Access your account
                  </p>
                </div>
              </Link>
            </div>

            <div className="border-t border-border/50" />

            {/* Categories */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg">
                Shop by Category
              </h3>
              <div className="space-y-2">
                {/* Fashion Link */}
                <Link
                  to="/category/fashion"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent transition-colors group"
                >
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    Fashion
                  </span>
                  <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground group-hover:text-primary transition-colors" />
                </Link>

                {/* Fashion Sub-categories */}
                <div className="pl-4 space-y-1">
                  <Link
                    to="/fashion/men"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors"
                  >
                    <span>👨 Men</span>
                  </Link>
                  <Link
                    to="/fashion/women"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors"
                  >
                    <span>👩 Women</span>
                  </Link>
                  <Link
                    to="/fashion/kids"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-3 py-2 rounded text-sm text-foreground/70 hover:text-primary hover:bg-accent/50 transition-colors"
                  >
                    <span>👧 Kids</span>
                  </Link>
                </div>

                {/* Electronics */}
                <Link
                  to="/electronics"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="text-lg">⚡</span>
                  <span className="font-medium text-foreground hover:text-primary transition-colors">
                    Electronics
                  </span>
                </Link>

                {/* Books */}
                <Link
                  to="/books"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="text-lg">📚</span>
                  <span className="font-medium text-foreground hover:text-primary transition-colors">
                    Books
                  </span>
                </Link>

                {/* Other Categories */}
                {categories.slice(2).map((category) => (
                  <Link
                    key={category.id}
                    to={
                      category.id === "home"
                        ? "/homeliving"
                        : `/category/${category.id}`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent transition-colors group"
                  >
                    <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </span>
                    <ChevronDown className="h-4 w-4 -rotate-90 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="border-t border-border/50" />

            {/* Special Links */}
            <div className="space-y-3">
              <h3 className="font-display font-bold text-lg">Special</h3>
              <div className="space-y-2">
                <Link
                  to="/deals"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 transition-colors"
                >
                  <span className="font-medium">Daily Deals</span>
                  <Zap className="h-4 w-4 text-amber-600" />
                </Link>
                <Link
                  to="/wishlist"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <span className="font-medium">Wishlist</span>
                  {wishlistItems.length > 0 && (
                    <Badge className="bg-pink-gradient">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
