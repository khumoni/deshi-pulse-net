import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Heart, 
  Eye, 
  MessageCircle, 
  Phone, 
  Calendar,
  Clock,
  Share2,
  Bookmark
} from "lucide-react";
import { Post } from "@/hooks/usePosts";
import { formatDistanceToNow } from "date-fns";
import { bn } from "date-fns/locale";
import { useState } from "react";

interface EnhancedPostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onView: (postId: string) => void;
  language?: 'bn' | 'en';
}

const EnhancedPostCard = ({ post, onLike, onView, language = 'bn' }: EnhancedPostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  const timeAgo = formatDistanceToNow(new Date(post.created_at), { 
    addSuffix: true,
    locale: language === 'bn' ? bn : undefined
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="group overflow-hidden bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 shadow-md hover:shadow-xl transition-all duration-500 hover:scale-[1.02]">
      {/* Image Section */}
      {post.image_url && (
        <div className="relative h-48 overflow-hidden">
          <img 
            src={post.image_url} 
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          
          {/* Floating Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-foreground shadow-md"
              onClick={handleBookmark}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current text-primary' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-foreground shadow-md"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 left-4">
            <Badge className={getStatusColor(post.status)}>
              {language === 'bn' ? (
                post.status === 'approved' ? 'অনুমোদিত' : 
                post.status === 'pending' ? 'অপেক্ষায়' : 'প্রত্যাখ্যাত'
              ) : post.status}
            </Badge>
          </div>
        </div>
      )}

      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h3>
            
            {/* Location */}
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4 mr-1 text-primary" />
              <span>{post.upazila}, {post.district}, {post.division}</span>
            </div>

            {/* Time */}
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-1" />
              <span>{timeAgo}</span>
            </div>
          </div>

          {/* Author Info */}
          {post.profiles?.display_name && (
            <div className="text-right">
              <div className="text-sm font-medium text-foreground">
                {post.profiles.display_name}
              </div>
              <div className="text-xs text-muted-foreground">
                {language === 'bn' ? 'পোস্টকারী' : 'Posted by'}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {post.content}
        </p>

        {/* Phone Number */}
        {post.phone && (
          <div className="flex items-center bg-primary/5 rounded-lg p-3 mb-4">
            <Phone className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-medium text-foreground">{post.phone}</span>
          </div>
        )}

        {/* Category and Subcategory */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.categories && (
            <Badge variant="outline" className="text-xs">
              {post.categories.name}
            </Badge>
          )}
          {post.subcategories && (
            <Badge variant="outline" className="text-xs">
              {post.subcategories.name}
            </Badge>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-border/50">
          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              <span>{post.views}</span>
            </div>
            <div className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              <span>{post.comments}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`transition-colors duration-300 ${
                isLiked ? 'text-red-500 hover:text-red-600' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.likes}</span>
            </Button>

            <Button
              size="sm"
              onClick={() => onView(post.id)}
              className="bg-primary hover:bg-primary/90 text-white"
            >
              {language === 'bn' ? 'বিস্তারিত' : 'Details'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPostCard;