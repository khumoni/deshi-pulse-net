import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Post } from "@/types/firebase";
import { Eye, Heart, MessageCircle, MapPin, Phone } from "lucide-react";

interface PostCardProps {
  post: Post;
  onLike: (postId: string) => void;
  onView: (postId: string) => void;
}

const PostCard = ({ post, onLike, onView }: PostCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
    onLike(post.id);
  };

  const handleView = () => {
    onView(post.id);
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border border-border/50">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg leading-tight">{post.title}</CardTitle>
          <Badge variant={post.status === 'approved' ? 'default' : 'secondary'}>
            {post.status === 'approved' ? 'অনুমোদিত' : 'অপেক্ষমাণ'}
          </Badge>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4" />
          <span>{post.location.upazila}, {post.location.district}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">{post.content}</p>
        
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt="Post image" 
              className="w-full h-48 object-cover"
            />
          </div>
        )}

        {post.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone className="h-4 w-4 text-green-bangladesh" />
            <span className="font-medium">{post.phone}</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{post.analytics.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              <span>{post.analytics.comments}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className={`flex items-center gap-1 ${isLiked ? 'text-red-bangladesh' : ''}`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              <span>{post.analytics.likes + (isLiked ? 1 : 0)}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleView}
            >
              বিস্তারিত
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;