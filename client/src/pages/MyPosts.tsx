import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Edit3, 
  Trash2, 
  Eye, 
  Heart, 
  MessageCircle, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import EnhancedPostCard from "@/components/EnhancedPostCard";
import { motion } from "framer-motion";

const MyPosts = () => {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  
  // Mock data - in real app this would come from API
  const myPosts = [
    {
      id: "1",
      title: "স্থানীয় ডাক্তার সেবা",
      content: "জরুরি প্রয়োজনে ডাক্তার দেখানোর জন্য যোগাযোগ করুন।",
      status: "active",
      views: 45,
      likes: 12,
      comments: 3,
      createdAt: "2025-08-07T10:00:00Z",
      division: "ঢাকা",
      district: "ঢাকা", 
      upazila: "ধানমন্ডি",
      phone: "01711-123456",
      category: { name: "স্থানীয় সেবা", nameEn: "local-services" },
      subcategory: { name: "ডাক্তার", nameEn: "doctor" },
      author: { displayName: "আপনি" }
    },
    {
      id: "2",
      title: "টিউশন দরকার",
      content: "ক্লাস ৮-১০ এর জন্য অভিজ্ঞ টিউটর প্রয়োজন।",
      status: "pending",
      views: 23,
      likes: 5,
      comments: 1,
      createdAt: "2025-08-06T15:30:00Z",
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "উত্তরা",
      phone: "01888-999777",
      category: { name: "টিউশন", nameEn: "tuition" },
      subcategory: { name: "গৃহশিক্ষক", nameEn: "home-tutor" },
      author: { displayName: "আপনি" }
    },
    {
      id: "3", 
      title: "রাস্তা মেরামত দরকার",
      content: "আমাদের এলাকার রাস্তা খুবই খারাপ অবস্থায়।",
      status: "rejected",
      views: 67,
      likes: 18,
      comments: 7,
      createdAt: "2025-08-05T09:15:00Z",
      division: "ঢাকা",
      district: "ঢাকা",
      upazila: "মিরপুর",
      phone: "01555-444333",
      category: { name: "এলার্ট তথ্য", nameEn: "alert-info" },
      subcategory: { name: "রাস্তা বন্ধ", nameEn: "road-closed" },
      author: { displayName: "আপনি" }
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'প্রকাশিত';
      case 'pending':
        return 'অপেক্ষমান';
      case 'rejected':
        return 'প্রত্যাখ্যাত';
      default:
        return 'অজানা';
    }
  };

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (status) {
      case 'active':
        return 'default';
      case 'pending':
        return 'secondary';
      case 'rejected':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const filteredPosts = myPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = selectedTab === 'all' || post.status === selectedTab;
    return matchesSearch && matchesTab;
  });

  const stats = {
    total: myPosts.length,
    active: myPosts.filter(p => p.status === 'active').length,
    pending: myPosts.filter(p => p.status === 'pending').length,
    rejected: myPosts.filter(p => p.status === 'rejected').length,
    totalViews: myPosts.reduce((sum, p) => sum + p.views, 0),
    totalLikes: myPosts.reduce((sum, p) => sum + p.likes, 0)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-md border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">আমার পোস্টসমূহ</h1>
              <p className="text-muted-foreground">আপনার সকল পোস্ট এক জায়গায় পরিচালনা করুন</p>
            </div>
            <Link to="/submit">
              <Button className="bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90">
                <Plus className="h-4 w-4 mr-2" />
                নতুন পোস্ট
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{stats.total}</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">মোট পোস্ট</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400">{stats.active}</div>
              <div className="text-sm text-green-600 dark:text-green-400">প্রকাশিত</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">{stats.pending}</div>
              <div className="text-sm text-yellow-600 dark:text-yellow-400">অপেক্ষমান</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400">{stats.rejected}</div>
              <div className="text-sm text-red-600 dark:text-red-400">প্রত্যাখ্যাত</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalViews}</div>
              <div className="text-sm text-purple-600 dark:text-purple-400">মোট ভিউ</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 border-pink-200 dark:border-pink-800">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-600 dark:text-pink-400">{stats.totalLikes}</div>
              <div className="text-sm text-pink-600 dark:text-pink-400">মোট লাইক</div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="পোস্ট খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">সবগুলো ({stats.total})</TabsTrigger>
            <TabsTrigger value="active">প্রকাশিত ({stats.active})</TabsTrigger>
            <TabsTrigger value="pending">অপেক্ষমান ({stats.pending})</TabsTrigger>
            <TabsTrigger value="rejected">প্রত্যাখ্যাত ({stats.rejected})</TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="mt-6">
            {filteredPosts.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <Search className="w-12 h-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">কোনো পোস্ট পাওয়া যায়নি</h3>
                <p className="text-muted-foreground mb-6">
                  {searchQuery ? 'অনুসন্ধানের সাথে মিলে এমন কোনো পোস্ট নেই।' : 'এই ক্যাটেগরিতে কোনো পোস্ট নেই।'}
                </p>
                <Link to="/submit">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    প্রথম পোস্ট করুন
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <Card className="h-full hover:shadow-lg transition-all duration-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(post.status)}
                            <Badge variant={getStatusVariant(post.status)}>
                              {getStatusText(post.status)}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-destructive hover:text-destructive">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <p className="text-muted-foreground line-clamp-3 mb-4">{post.content}</p>
                        
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                          <span>{post.division}, {post.district}</span>
                          <span>{new Date(post.createdAt).toLocaleDateString('bn-BD')}</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            {post.category.name}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyPosts;