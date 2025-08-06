import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Plus, Moon, Sun, LogOut, User } from "lucide-react";
import { useTheme } from "next-themes";
import CategoryCard from "@/components/CategoryCard";
import SubcategoryCard from "@/components/SubcategoryCard";
import PostCard from "@/components/PostCard";
import LocationSelector from "@/components/LocationSelector";
import { useCategories, Category, Subcategory } from "@/hooks/useCategories";
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-bangladesh to-green-bangladesh/80 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">🇧🇩 স্থানীয় তথ্য কেন্দ্র</h1>
              <p className="text-green-50 mt-1">আপনার এলাকার সকল তথ্য এক জায়গায়</p>
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              
              {!authLoading && user && (
                <Link to="/submit">
                  <Button variant="secondary" size="sm" className="hidden md:flex">
                    <Plus className="h-4 w-4 mr-2" />
                    তথ্য যোগ করুন
                  </Button>
                </Link>
              )}
              
              {!authLoading && (
                user ? (
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                      <User className="mr-2 h-4 w-4" />
                      {user.email?.split('@')[0]}
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleSignOut}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      লগআউট
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/login">
                      <Button variant="outline" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                        লগইন
                      </Button>
                    </Link>
                    <Link to="/signup">
                      <Button variant="secondary" size="sm">
                        সাইনআপ
                      </Button>
                    </Link>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Category Grid */}
      <div className="bg-card border-b">
        <div className="container mx-auto px-4 py-6">
          {!selectedCategory ? (
            // Main Categories Grid
            <div>
              <h2 className="text-lg font-semibold mb-4 text-center">ক্যাটেগরি নির্বাচন করুন</h2>
              {categoriesLoading ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {categories.map((category) => (
                    <CategoryCard
                      key={category.id}
                      category={category}
                      isSelected={selectedCategory?.id === category.id}
                      onClick={() => handleCategorySelect(category)}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            // Subcategories Grid
            <div>
              <div className="flex items-center gap-3 mb-4">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  ← ফিরে যান
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCategory.icon}</span>
                  <h2 className="text-lg font-semibold">{selectedCategory.name}</h2>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                {selectedCategory.subcategories?.map((subcategory) => (
                  <SubcategoryCard
                    key={subcategory.id}
                    subcategory={subcategory}
                    isSelected={selectedSubcategory?.id === subcategory.id}
                    onClick={() => handleSubcategorySelect(subcategory)}
                    categoryColor="bg-primary"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Location and Search */}
        <div className="space-y-6">
          <LocationSelector
            onLocationSelect={handleLocationSelect}
            selectedLocation={selectedLocation}
          />

          {/* Search Bar */}
          <Card>
            <CardContent className="pt-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="তথ্য খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          {/* Submit Button for Selected Category */}
          {selectedCategory && user && (
            <Card className="bg-gradient-to-r from-green-bangladesh/5 to-green-bangladesh/10 border-green-bangladesh/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-green-bangladesh">
                      {selectedCategory.icon} {selectedCategory.name} বিভাগে তথ্য যোগ করুন
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      আপনার এলাকার {selectedCategory.name} সংক্রান্ত তথ্য শেয়ার করুন
                    </p>
                  </div>
                  <Link to="/submit">
                    <Button className="bg-green-bangladesh hover:bg-green-bangladesh/90">
                      <Plus className="h-4 w-4 mr-2" />
                      তথ্য যোগ করুন
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Posts Grid */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">
                {selectedCategory ? `${selectedCategory.name} এর তথ্যসমূহ` : "সকল তথ্য"}
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredPosts.length}টি তথ্য)
                </span>
              </h2>
            </div>

            {postsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : filteredPosts.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground text-lg">কোন তথ্য পাওয়া যায়নি</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    অন্য এলাকা বা ক্যাটেগরি নির্বাচন করে দেখুন
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={{
                      id: post.id,
                      title: post.title,
                      content: post.content,
                      location: {
                        division: post.division,
                        district: post.district,
                        upazila: post.upazila
                      },
                      category: post.categories?.name || '',
                      subcategory: post.subcategories?.name || '',
                      authorId: post.author_id,
                      authorName: post.profiles?.display_name || 'অজানা',
                      phone: post.phone,
                      imageUrl: post.image_url,
                      status: post.status as 'pending' | 'approved' | 'rejected',
                      createdAt: new Date(post.created_at).getTime(),
                      analytics: {
                        views: post.views,
                        likes: post.likes,
                        comments: post.comments
                      }
                    }}
                    onLike={handleLike}
                    onView={handleView}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t mt-12">
        <div className="container mx-auto px-4 py-8 text-center">
          <p className="text-muted-foreground">
            স্থানীয় তথ্য কেন্দ্র - বাংলাদেশের জন্য তৈরি
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;