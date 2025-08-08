import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Moon, Sun, LogOut, User, Mail, Filter, Grid3X3, List } from "lucide-react";
import { useTheme } from "next-themes";
import CategoryCard from "@/components/CategoryCard";
import SubcategoryCard from "@/components/SubcategoryCard";
import PostCard from "@/components/PostCard";
import EnhancedPostCard from "@/components/EnhancedPostCard";
import EnhancedCategoryCard from "@/components/EnhancedCategoryCard";
import UserProfileDropdown from "@/components/UserProfileDropdown";
import LocationSelector from "@/components/LocationSelector";
import HeroSection from "@/components/HeroSection";
import { useCategories } from "@/hooks/useCategories";
import type { Category, Subcategory } from "@/types/firebase";
import { usePosts, Post } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ division: string; district: string; upazila: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Fetch categories and posts from Supabase
  const { categories, loading: categoriesLoading } = useCategories();
  const { 
    posts, 
    loading: postsLoading, 
    likePost, 
    viewPost 
  } = usePosts({
    category_id: selectedCategory?.id,
    subcategory_id: selectedSubcategory?.id,
    division: selectedLocation?.division,
    district: selectedLocation?.district,
    upazila: selectedLocation?.upazila,
    search: searchQuery || undefined,
    status: 'approved'
  });

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategorySelect = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleLocationSelect = (location: { division: string; district: string; upazila: string }) => {
    setSelectedLocation(location);
  };

  const handleLike = async (postId: string) => {
    const result = await likePost(postId);
    if (result?.error) {
      toast.error('লাইক করতে সমস্যা হয়েছে');
    }
  };

  const handleView = async (postId: string) => {
    const result = await viewPost(postId);
    if (result?.error) {
      console.error('View update error:', result.error);
    }
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error('লগআউট করতে সমস্যা হয়েছে');
    } else {
      toast.success('সফলভাবে লগআউট হয়েছে');
    }
  };

  // Posts are already filtered by the hook based on selected criteria
  const filteredPosts = posts;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-green-bangladesh flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                <span className="text-white font-bold text-lg">স</span>
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-primary to-green-bangladesh bg-clip-text text-transparent">
                স্থানীয় তথ্য কেন্দ্র
              </span>
            </Link>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full hover:bg-accent/50 transition-colors"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {/* Create Post Button */}
              <Link to="/submit">
                <Button 
                  size="sm" 
                  className="bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90 shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  <span className="hidden sm:inline">পোস্ট করুন</span>
                  <span className="sm:hidden">পোস্ট</span>
                </Button>
              </Link>
              
              {user ? (
                <UserProfileDropdown onSignOut={handleSignOut} />
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-colors">
                      লগইন
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90 shadow-md">
                      সাইনআপ
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <HeroSection language="bn" />

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Enhanced Search and Filter Bar */}
        <section className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="এখানে অনুসন্ধান করুন... (যেমন: ডাক্তার, চাকরি, বিদ্যুৎ)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-3 text-base border-2 hover:border-primary/50 focus:border-primary rounded-xl bg-background/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="transition-all duration-200"
              >
                <Filter className="h-4 w-4 mr-1" />
                ফিল্টার
              </Button>
              
              <div className="flex items-center border rounded-lg p-1 bg-background">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="h-8 w-8 p-0"
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="h-8 w-8 p-0"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
          
          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 p-4 bg-card rounded-xl border overflow-hidden"
              >
                <LocationSelector 
                  onLocationSelect={handleLocationSelect}
                  selectedLocation={selectedLocation}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Enhanced Categories Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                তথ্যের ক্যাটেগরি
              </h2>
              <p className="text-muted-foreground text-lg">
                আপনার প্রয়োজনীয় তথ্যের ধরন বেছে নিন
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              {categories.length}টি ক্যাটেগরি
            </Badge>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-48 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category: any, index: number) => (
                <EnhancedCategoryCard
                  key={category.id}
                  category={category}
                  isSelected={selectedCategory?.id === category.id}
                  onCategoryClick={() => handleCategorySelect(category)}
                  onSubcategoryClick={handleSubcategorySelect}
                  selectedSubcategory={selectedSubcategory}
                />
              ))}
            </div>
          )}
        </section>



        {/* Posts Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">সর্বশেষ তথ্য</h2>
              <p className="text-muted-foreground">আপনার এলাকার সাম্প্রতিক তথ্য এবং আপডেট</p>
            </div>
            {user && (
              <Link to="/submit">
                <Button size="lg" className="bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90 shadow-lg">
                  <Plus className="w-5 h-5 mr-2" />
                  তথ্য যোগ করুন
                </Button>
              </Link>
            )}
          </div>

          {postsLoading ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <Skeleton className="h-64 rounded-2xl mb-4" />
                  <Skeleton className="h-4 rounded mb-2" />
                  <Skeleton className="h-4 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">কোনো তথ্য পাওয়া যায়নি</h3>
                <p className="text-muted-foreground mb-6">
                  এই ক্যাটেগরিতে এখনো কোনো তথ্য নেই। আপনি প্রথম হয়ে তথ্য শেয়ার করুন।
                </p>
                {user && (
                  <Link to="/submit">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-green-bangladesh">
                      <Plus className="w-5 h-5 mr-2" />
                      প্রথম তথ্যটি যোগ করুন
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 animate-fade-in">
              {filteredPosts.map((post: any, index: number) => (
                <div 
                  key={post.id}
                  className="animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <EnhancedPostCard
                    post={post}
                    onLike={handleLike}
                    onView={handleView}
                    language="bn"
                  />
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Enhanced Footer */}
      <footer className="relative mt-20 bg-gradient-to-br from-primary/5 via-background to-primary/10 border-t border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Brand Section */}
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-green-bangladesh flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">স</span>
                </div>
                <span className="font-bold text-xl bg-gradient-to-r from-primary to-green-bangladesh bg-clip-text text-transparent">
                  স্থানীয় তথ্য কেন্দ্র
                </span>
              </div>
              <p className="text-muted-foreground">
                আপনার এলাকার নির্ভরযোগ্য তথ্যের উৎস
              </p>
            </div>

            {/* Quick Links */}
            <div className="text-center">
              <h4 className="font-semibold text-foreground mb-4">দ্রুত লিংক</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                  আমাদের সম্পর্কে
                </Link>
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors">
                  যোগাযোগ
                </Link>
                <Link to="/privacy" className="block text-muted-foreground hover:text-primary transition-colors">
                  গোপনীয়তা নীতি
                </Link>
              </div>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-right">
              <h4 className="font-semibold text-foreground mb-4">যোগাযোগ</h4>
              <div className="space-y-2">
                <p className="text-muted-foreground">
                  <Mail className="w-4 h-4 inline mr-2" />
                  info@localinfo.bd
                </p>
                <p className="text-muted-foreground">
                  📱 +৮৮০ ১৭XX XXX XXX
                </p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center pt-8 border-t border-border/50">
            <p className="text-muted-foreground">
              © ২০২৪ স্থানীয় তথ্য কেন্দ্র। সকল অধিকার সংরক্ষিত।
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;