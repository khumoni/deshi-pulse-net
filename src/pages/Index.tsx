import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import CategoryCard from "@/components/CategoryCard";
import SubcategoryCard from "@/components/SubcategoryCard";
import PostCard from "@/components/PostCard";
import LocationSelector from "@/components/LocationSelector";
import { Category, Subcategory, Post } from "@/types/firebase";
import { categories } from "@/data/locations";

const Index = () => {
  const { theme, setTheme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<{ division: string; district: string; upazila: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);

  // Sample posts data - in real app this would come from Firebase
  const samplePosts: Post[] = [
    {
      id: "1",
      title: "ঢাকায় বিদ্যুৎ বিভ্রাট",
      content: "আজ রাত ৮টা থেকে ১০টা পর্যন্ত ধানমন্ডি এলাকায় বিদ্যুৎ বিভ্রাট থাকবে। রক্ষণাবেক্ষণ কাজের জন্য।",
      location: { division: "dhaka", district: "dhaka", upazila: "ধানমন্ডি" },
      category: "electricity",
      subcategory: "power-outage",
      authorId: "user1",
      authorName: "আহমেদ আলী",
      phone: "০১৭১১১১১১১১",
      status: "approved",
      createdAt: Date.now() - 3600000,
      analytics: { views: 45, likes: 12, comments: 3 }
    },
    {
      id: "2",
      title: "নতুন ফার্মেসি খোলা হয়েছে",
      content: "গুলশান ২ এ একটি নতুন ২৪ ঘন্টা ফার্মেসি খোলা হয়েছে। সব ধরনের ওষুধ পাওয়া যাচ্ছে।",
      location: { division: "dhaka", district: "dhaka", upazila: "গুলশান" },
      category: "shops",
      subcategory: "pharmacy",
      authorId: "user2",
      authorName: "ফাতেমা খাতুন",
      phone: "০১৮২২২২২২২২",
      status: "approved",
      createdAt: Date.now() - 7200000,
      analytics: { views: 23, likes: 8, comments: 1 }
    }
  ];

  useEffect(() => {
    setPosts(samplePosts);
  }, []);

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

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, analytics: { ...post.analytics, likes: post.analytics.likes + 1 } }
        : post
    ));
  };

  const handleView = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, analytics: { ...post.analytics, views: post.analytics.views + 1 } }
        : post
    ));
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory.id;
    const matchesSubcategory = !selectedSubcategory || post.subcategory === selectedSubcategory.id;
    const matchesLocation = !selectedLocation || 
      (post.location.division === selectedLocation.division && 
       post.location.district === selectedLocation.district && 
       post.location.upazila === selectedLocation.upazila);
    const matchesSearch = !searchQuery || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesSubcategory && matchesLocation && matchesSearch && post.status === 'approved';
  });

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
              <Button variant="secondary" size="sm" className="hidden md:flex">
                <Plus className="h-4 w-4 mr-2" />
                তথ্য যোগ করুন
              </Button>
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
                {selectedCategory.subcategories.map((subcategory) => (
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
          {selectedCategory && (
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
                  <Button className="bg-green-bangladesh hover:bg-green-bangladesh/90">
                    <Plus className="h-4 w-4 mr-2" />
                    তথ্য যোগ করুন
                  </Button>
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

            {filteredPosts.length === 0 ? (
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
                    post={post}
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
