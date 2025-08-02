import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PostCard from '@/components/PostCard';
import { categories } from '@/data/locations';
import { Post } from '@/types/firebase';
import { ArrowLeft, Plus, Filter } from 'lucide-react';

const CategoryDetails = () => {
  const { categoryId } = useParams();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [posts, setPosts] = useState<Post[]>([]);

  const category = categories.find(cat => cat.id === categoryId);

  // Sample posts for this category
  useEffect(() => {
    if (category) {
      const samplePosts: Post[] = [
        {
          id: "1",
          title: category.id === 'local-services' ? "অভিজ্ঞ ইলেকট্রিশিয়ান" : "নতুন তথ্য আপডেট",
          content: category.id === 'local-services' ? 
            "১০ বছরের অভিজ্ঞতা সম্পন্ন ইলেকট্রিশিয়ান। ২৪/৭ সেবা। ফ্যান, লাইট, এসি সব ধরনের কাজ।" :
            "এই ক্যাটেগরিতে নতুন তথ্য আপডেট। আরও বিস্তারিত জানতে যোগাযোগ করুন।",
          location: {
            division: "dhaka",
            district: "dhaka",
            upazila: "ধানমন্ডি"
          },
          category: category.id,
          subcategory: category.subcategories[0]?.id || '',
          authorId: "user1",
          authorName: "মোহাম্মদ করিম",
          phone: "01712345678",
          status: "approved" as const,
          createdAt: Date.now() - 2 * 60 * 60 * 1000,
          analytics: {
            views: 145,
            likes: 23,
            comments: 5
          }
        },
        {
          id: "2",
          title: category.id === 'local-services' ? "দক্ষ মিস্ত্রি পাওয়া যাচ্ছে" : "আরেকটি গুরুত্বপূর্ণ তথ্য",
          content: category.id === 'local-services' ? 
            "বাড়ির যেকোনো ধরনের মেরামতের কাজ। পানির পাইপ, টাইলস, রং করা সব।" :
            "এই বিভাগে আরও একটি গুরুত্বপূর্ণ তথ্য। সবার জন্য উপকারী।",
          location: {
            division: "dhaka",
            district: "dhaka",
            upazila: "গুলশান"
          },
          category: category.id,
          subcategory: category.subcategories[1]?.id || category.subcategories[0]?.id || '',
          authorId: "user2",
          authorName: "আব্দুর রহমান",
          phone: "01812345678",
          status: "approved" as const,
          createdAt: Date.now() - 4 * 60 * 60 * 1000,
          analytics: {
            views: 98,
            likes: 15,
            comments: 3
          }
        }
      ];
      setPosts(samplePosts);
    }
  }, [category]);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">ক্যাটেগরি পাওয়া যায়নি</h1>
        <Link to="/">
          <Button>হোম পেজে ফিরে যান</Button>
        </Link>
      </div>
    );
  }

  const filteredPosts = selectedSubcategory === 'all' 
    ? posts 
    : posts.filter(post => post.subcategory === selectedSubcategory);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ফিরে যান
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <span className="text-4xl">{category.icon}</span>
                {category.name}
              </h1>
              <p className="text-muted-foreground">{category.nameEn}</p>
            </div>
          </div>
          
          <Link to="/submit" state={{ categoryId: category.id }}>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              তথ্য যোগ করুন
            </Button>
          </Link>
        </div>

        {/* Category Overview */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-bangladesh">
                  {posts.length}
                </div>
                <div className="text-sm text-muted-foreground">মোট তথ্য</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {category.subcategories.length}
                </div>
                <div className="text-sm text-muted-foreground">উপবিভাগ</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {posts.reduce((sum, post) => sum + post.analytics.views, 0)}
                </div>
                <div className="text-sm text-muted-foreground">মোট ভিউ</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subcategory Tabs */}
        <Tabs value={selectedSubcategory} onValueChange={setSelectedSubcategory} className="mb-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 h-auto">
            <TabsTrigger value="all" className="whitespace-nowrap">
              সব তথ্য ({posts.length})
            </TabsTrigger>
            {category.subcategories.map((subcategory) => {
              const count = posts.filter(post => post.subcategory === subcategory.id).length;
              return (
                <TabsTrigger 
                  key={subcategory.id} 
                  value={subcategory.id}
                  className="whitespace-nowrap"
                >
                  {subcategory.name} ({count})
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value={selectedSubcategory} className="mt-6">
            {/* Posts Grid */}
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <PostCard key={post.id} post={post} onLike={() => {}} onView={() => {}} />
                ))}
              </div>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold mb-2">কোনো তথ্য পাওয়া যায়নি</h3>
                  <p className="text-muted-foreground mb-4">
                    এই উপবিভাগে এখনো কোনো তথ্য যোগ করা হয়নি।
                  </p>
                  <Link to="/submit" state={{ categoryId: category.id, subcategoryId: selectedSubcategory }}>
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      প্রথম তথ্য যোগ করুন
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Subcategory Cards */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">উপবিভাগসমূহ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.subcategories.map((subcategory) => {
              const count = posts.filter(post => post.subcategory === subcategory.id).length;
              return (
                <Card 
                  key={subcategory.id}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedSubcategory === subcategory.id ? 'ring-2 ring-green-bangladesh' : ''
                  }`}
                  onClick={() => setSelectedSubcategory(subcategory.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{subcategory.name}</h3>
                        <p className="text-sm text-muted-foreground">{subcategory.nameEn}</p>
                      </div>
                      <Badge variant="secondary">{count}</Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryDetails;