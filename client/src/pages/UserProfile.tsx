import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { 
  Edit3, 
  MapPin, 
  Phone, 
  Mail,
  Calendar,
  Star,
  Trophy,
  FileText,
  Heart,
  Eye,
  Settings,
  Shield,
  Bell
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user profile data - would come from API in real app
  const userProfile = {
    id: user?.id || "1",
    email: user?.email || "user@example.com",
    displayName: "মোহাম্মদ রহিম",
    phone: "01711-123456",
    division: "ঢাকা",
    district: "ঢাকা",
    upazila: "ধানমন্ডি",
    joinDate: "2024-01-15",
    bio: "স্থানীয় তথ্য শেয়ার করতে ভালোবাসি। সবসময় সবার সাহায্য করার চেষ্টা করি।",
    isVerified: true,
    contributionScore: 150,
    stats: {
      totalPosts: 12,
      activePosts: 8,
      totalViews: 1234,
      totalLikes: 89,
      helpfulVotes: 45
    }
  };

  const achievements = [
    { icon: "🏆", name: "সহায়ক সদস্য", description: "৫০+ সহায়ক ভোট পেয়েছেন" },
    { icon: "⭐", name: "জনপ্রিয় লেখক", description: "১০০০+ ভিউ পেয়েছেন" },
    { icon: "💎", name: "বিশ্বস্ত ব্যবহারকারী", description: "প্রোফাইল যাচাই করা হয়েছে" },
    { icon: "🎯", name: "নিয়মিত অবদানকারী", description: "১০+ পোস্ট করেছেন" }
  ];

  const recentActivity = [
    { type: "post", title: "নতুন ডাক্তারের তথ্য শেয়ার করেছেন", time: "২ ঘন্টা আগে" },
    { type: "like", title: "একটি পোস্টে ৫টি লাইক পেয়েছেন", time: "৫ ঘন্টা আগে" },
    { type: "comment", title: "একটি পোস্টে কমেন্ট করেছেন", time: "১ দিন আগে" },
    { type: "achievement", title: "নতুন ব্যাজ অর্জন করেছেন", time: "৩ দিন আগে" }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'post': return <FileText className="h-4 w-4 text-blue-500" />;
      case 'like': return <Heart className="h-4 w-4 text-red-500" />;
      case 'comment': return <FileText className="h-4 w-4 text-green-500" />;
      case 'achievement': return <Trophy className="h-4 w-4 text-yellow-500" />;
      default: return <Calendar className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Header */}
      <div className="bg-background/95 backdrop-blur-md border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">ব্যবহারকারীর প্রোফাইল</h1>
          <p className="text-muted-foreground">আপনার প্রোফাইল তথ্য এবং কার্যকলাপ</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          
          {/* Main Profile Card */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="overflow-hidden">
              {/* Cover/Header Section */}
              <div className="h-32 bg-gradient-to-r from-primary to-green-bangladesh relative">
                <div className="absolute inset-0 bg-black/20" />
                <motion.div 
                  className="absolute bottom-4 right-4"
                  whileHover={{ scale: 1.05 }}
                >
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                    className="bg-white/90 hover:bg-white text-primary"
                  >
                    <Edit3 className="h-4 w-4 mr-1" />
                    সম্পাদনা
                  </Button>
                </motion.div>
              </div>
              
              <CardContent className="pt-0 pb-6">
                {/* Avatar and Basic Info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-end space-y-4 sm:space-y-0 sm:space-x-6 -mt-16">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-xl">
                    <AvatarImage src="" alt="Profile" />
                    <AvatarFallback className="bg-gradient-to-br from-primary to-green-bangladesh text-white text-3xl font-bold">
                      {userProfile.displayName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{userProfile.displayName}</h2>
                      {userProfile.isVerified && (
                        <Badge className="bg-blue-500 hover:bg-blue-600">
                          <Shield className="h-3 w-3 mr-1" />
                          যাচাইকৃত
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-4 text-muted-foreground text-sm mb-3">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{userProfile.division}, {userProfile.district}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>যোগদান: {new Date(userProfile.joinDate).toLocaleDateString('bn-BD')}</span>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{userProfile.bio}</p>
                    
                    <div className="flex items-center space-x-1">
                      <Star className="h-5 w-5 text-yellow-500 fill-current" />
                      <span className="font-medium">৪.৮ রেটিং</span>
                      <span className="text-muted-foreground">({userProfile.stats.helpfulVotes} সহায়ক ভোট)</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-primary mb-1">{userProfile.stats.totalPosts}</div>
                  <div className="text-sm text-muted-foreground">মোট পোস্ট</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">{userProfile.stats.totalViews.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">মোট ভিউ</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-red-500 mb-1">{userProfile.stats.totalLikes}</div>
                  <div className="text-sm text-muted-foreground">মোট লাইক</div>
                </CardContent>
              </Card>
              
              <Card className="text-center">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-yellow-600 mb-1">{userProfile.contributionScore}</div>
                  <div className="text-sm text-muted-foreground">অবদান স্কোর</div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>যোগাযোগের তথ্য</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">ইমেইল</Label>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="email" 
                          value={userProfile.email} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">ফোন নম্বর</Label>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="phone" 
                          value={userProfile.phone} 
                          disabled={!isEditing}
                          className={!isEditing ? "bg-muted" : ""}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="division">বিভাগ</Label>
                      <Input 
                        id="division" 
                        value={userProfile.division} 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="district">জেলা</Label>
                      <Input 
                        id="district" 
                        value={userProfile.district} 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="upazila">উপজেলা</Label>
                      <Input 
                        id="upazila" 
                        value={userProfile.upazila} 
                        disabled={!isEditing}
                        className={!isEditing ? "bg-muted" : ""}
                      />
                    </div>
                  </div>
                </div>
                
                {isEditing && (
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      বাতিল
                    </Button>
                    <Button>
                      সংরক্ষণ করুন
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-yellow-500" />
                  অর্জনসমূহ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3 p-3 rounded-lg bg-card border"
                    >
                      <div className="text-2xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium text-sm">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-blue-500" />
                  সাম্প্রতিক কার্যকলাপ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      {getActivityIcon(activity.type)}
                      <div className="flex-1">
                        <p className="text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>দ্রুত কার্যক্রম</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link to="/my-posts">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="h-4 w-4 mr-2" />
                    আমার পোস্টসমূহ
                  </Button>
                </Link>
                <Link to="/favorites">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    পছন্দের তালিকা
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  সেটিংস
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;