import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Plus, Moon, Sun, LogOut, User, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import CategoryCard from "@/components/CategoryCard";
import SubcategoryCard from "@/components/SubcategoryCard";
import PostCard from "@/components/PostCard";
import EnhancedPostCard from "@/components/EnhancedPostCard";
import LocationSelector from "@/components/LocationSelector";
import HeroSection from "@/components/HeroSection";
import { useCategories } from "@/hooks/useCategories";
import type { Category, Subcategory } from "@/types/firebase";
import { usePosts, Post } from "@/hooks/usePosts";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const { user, signOut, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ division: string; district: string; upazila: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

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
    const { error } = await likePost(postId);
    if (error) {
      toast.error('লাইক করতে সমস্যা হয়েছে');
    }
  };

  const handleView = async (postId: string) => {
    const { error } = await viewPost(postId);
    if (error) {
      console.error('View update error:', error);
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full"
              >
                {theme === "dark" ? "🌞" : "🌙"}
              </Button>
              
              {user ? (
                <div className="flex items-center space-x-3">
                  <div className="hidden md:flex items-center space-x-2 px-3 py-2 rounded-lg bg-primary/5">
                    <User className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">
                      {user.email?.split('@')[0]}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSignOut}
                    className="hover:bg-destructive/10 hover:border-destructive hover:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    লগআউট
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/10">
                      লগইন
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button size="sm" className="bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90">
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
        {/* Categories Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">
              তথ্যের ক্যাটেগরি
            </h2>
            <p className="text-muted-foreground text-lg">
              আপনার প্রয়োজনীয় তথ্যের ধরন বেছে নিন
            </p>
          </div>
          
          {categoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-fade-in">
              {categories.map((category, index) => (
                <div 
                  key={category.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CategoryCard
                    category={category}
                    isSelected={selectedCategory?.id === category.id}
                    onClick={() => handleCategorySelect(category)}
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Subcategories */}
        {selectedCategory && (
          <section className="mb-16 animate-slide-up">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                {selectedCategory.name} - উপ-ক্যাটেগরি
              </h3>
              <p className="text-muted-foreground">
                আরও নির্দিষ্ট তথ্যের জন্য উপ-ক্যাটেগরি বেছে নিন
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {selectedCategory.subcategories.map((subcategory, index) => (
                <div 
                  key={subcategory.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <SubcategoryCard
                    subcategory={subcategory}
                    isSelected={selectedSubcategory?.id === subcategory.id}
                    onClick={() => handleSubcategorySelect(subcategory)}
                    categoryColor="bg-primary"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Enhanced Search Section */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="এলাকার তথ্য, সেবা বা জরুরি খবর খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 h-14 text-lg rounded-xl border-2 border-border/50 focus:border-primary/50 bg-card/50 backdrop-blur-sm shadow-lg"
              />
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <Button size="sm" className="rounded-lg">
                  খুঁজুন
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Location Selector */}
        <div className="mb-8">
          <LocationSelector
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />
        </div>

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
              {filteredPosts.map((post, index) => (
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