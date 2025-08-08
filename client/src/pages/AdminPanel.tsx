import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  CheckCircle, 
  XCircle, 
  Eye, 
  BarChart3, 
  Users, 
  FileText,
  TrendingUp,
  MapPin,
  Calendar
} from 'lucide-react';
import { toast } from 'sonner';
import { Post } from '@/types/firebase';

const AdminPanel = () => {
  const [pendingPosts, setPendingPosts] = useState<Post[]>([
    {
      id: "pending1",
      title: "নতুন ডাক্তারের চেম্বার খোলা হয়েছে",
      content: "ডাঃ আহমেদুল্লাহ সাহেবের নতুন চেম্বার খোলা হয়েছে উত্তরা সেক্টর ৪ এ। সকাল ৯টা থেকে রাত ৯টা পর্যন্ত।",
      location: {
        division: "dhaka",
        district: "dhaka",
        upazila: "উত্তরা"
      },
      category: "local-services",
      subcategory: "doctor",
      authorId: "user123",
      authorName: "মোহাম্মদ রহিম",
      phone: "01712345678",
      status: "pending" as const,
      createdAt: Date.now() - 2 * 60 * 60 * 1000,
      analytics: {
        views: 0,
        likes: 0,
        comments: 0
      }
    },
    {
      id: "pending2", 
      title: "আজ রাতে বিদ্যুৎ বন্ধ থাকবে",
      content: "গুলশান ১ ও ২ নং ব্লকে আজ রাত ১০টা থেকে ভোর ৫টা পর্যন্ত বিদ্যুৎ বন্ধ থাকবে। লাইন মেরামতের কাজ চলবে।",
      location: {
        division: "dhaka",
        district: "dhaka", 
        upazila: "গুলশান"
      },
      category: "alert-info",
      subcategory: "power-outage",
      authorId: "user456",
      authorName: "ফাতেমা খাতুন",
      status: "pending" as const,
      createdAt: Date.now() - 1 * 60 * 60 * 1000,
      analytics: {
        views: 0,
        likes: 0, 
        comments: 0
      }
    }
  ]);

  const stats = [
    { 
      title: 'মোট পোস্ট', 
      value: 1247, 
      icon: FileText, 
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    { 
      title: 'অপেক্ষমাণ', 
      value: pendingPosts.length, 
      icon: Calendar, 
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    { 
      title: 'আজকে অনুমোদিত', 
      value: 23, 
      icon: CheckCircle, 
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    { 
      title: 'মোট ব্যবহারকারী', 
      value: 342, 
      icon: Users, 
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  const topCategories = [
    { name: 'স্থানীয় সেবা', count: 245, percentage: 35 },
    { name: 'এলার্ট তথ্য', count: 180, percentage: 26 },
    { name: 'ঘটছে এখন', count: 156, percentage: 22 },
    { name: 'টিউশন / চাকরি', count: 98, percentage: 14 },
    { name: 'অন্যান্য', count: 21, percentage: 3 }
  ];

  const handleApprove = async (postId: string) => {
    try {
      // Here you would typically update Firebase
      setPendingPosts(prev => prev.filter(post => post.id !== postId));
      toast.success('পোস্ট অনুমোদিত হয়েছে');
    } catch (error) {
      toast.error('অনুমোদনে সমস্যা হয়েছে');
    }
  };

  const handleReject = async (postId: string) => {
    try {
      // Here you would typically update Firebase
      setPendingPosts(prev => prev.filter(post => post.id !== postId));
      toast.success('পোস্ট বাতিল করা হয়েছে');
    } catch (error) {
      toast.error('বাতিল করতে সমস্যা হয়েছে');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                হোম পেজে ফিরুন
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold">অ্যাডমিন প্যানেল</h1>
              <p className="text-muted-foreground">সাইট পরিচালনা ও তত্ত্বাবধান</p>
            </div>
          </div>
          
          <Badge variant="secondary" className="text-sm">
            অ্যাডমিন লগইন
          </Badge>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="pending">অপেক্ষমাণ পোস্ট ({pendingPosts.length})</TabsTrigger>
            <TabsTrigger value="analytics">এনালিটিক্স</TabsTrigger>
            <TabsTrigger value="categories">ক্যাটেগরি ব্যবস্থাপনা</TabsTrigger>
          </TabsList>

          {/* Pending Posts */}
          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>অনুমোদনের অপেক্ষায়</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingPosts.length > 0 ? (
                  <div className="space-y-4">
                    {pendingPosts.map((post) => (
                      <div key={post.id} className="border rounded-lg p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg">{post.title}</h3>
                            <p className="text-muted-foreground mt-1">{post.content}</p>
                            
                            <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {post.location.upazila}, {post.location.district}
                              </span>
                              <span>লেখক: {post.authorName}</span>
                              {post.phone && <span>ফোন: {post.phone}</span>}
                              <span>
                                {new Date(post.createdAt).toLocaleDateString('bn-BD')}
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-2">
                            <Badge variant="outline">{post.category}</Badge>
                            <Badge variant="secondary">{post.subcategory}</Badge>
                          </div>
                          
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => toast.info('বিস্তারিত দেখা যাচ্ছে')}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              দেখুন
                            </Button>
                            <Button
                              size="sm"
                              onClick={() => handleApprove(post.id)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              অনুমোদন
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleReject(post.id)}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              বাতিল
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">সব পোস্ট পর্যালোচনা সম্পূর্ণ</h3>
                    <p className="text-muted-foreground">এখন আর কোনো পোস্ট অনুমোদনের অপেক্ষায় নেই।</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Category Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2" />
                    ক্যাটেগরি অনুযায়ী পোস্ট
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topCategories.map((category, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium">{category.name}</span>
                            <span className="text-sm text-muted-foreground">{category.count}</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-green-bangladesh h-2 rounded-full transition-all"
                              style={{ width: `${category.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2" />
                    সাম্প্রতিক কার্যকলাপ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">নতুন পোস্ট অনুমোদিত</p>
                        <p className="text-xs text-muted-foreground">৫ মিনিট আগে</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">নতুন ব্যবহারকারী নিবন্ধন</p>
                        <p className="text-xs text-muted-foreground">১৫ মিনিট আগে</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">স্প্যাম পোস্ট বাতিল</p>
                        <p className="text-xs text-muted-foreground">৩০ মিনিট আগে</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm">নতুন ক্যাটেগরি যোগ</p>
                        <p className="text-xs text-muted-foreground">১ ঘণ্টা আগে</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Category Management */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>ক্যাটেগরি ও উপবিভাগ ব্যবস্থাপনা</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">শীঘ্রই আসছে</h3>
                  <p className="text-muted-foreground">
                    ক্যাটেগরি সম্পাদনা ও নতুন ক্যাটেগরি যোগ করার সুবিধা শীঘ্রই যোগ করা হবে।
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPanel;