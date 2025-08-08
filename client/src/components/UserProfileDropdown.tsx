import { useState } from "react";
import { Link } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Settings, 
  FileText, 
  Heart, 
  Eye, 
  LogOut, 
  Shield,
  Plus,
  Bell,
  Star
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

interface UserProfileDropdownProps {
  onSignOut: () => Promise<void>;
}

const UserProfileDropdown = ({ onSignOut }: UserProfileDropdownProps) => {
  const { user } = useAuth();
  const [notificationCount] = useState(3); // Mock notification count

  if (!user) return null;

  const userInitials = user.email?.charAt(0).toUpperCase() || 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative">
        <div className="flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground p-2 rounded-lg transition-colors cursor-pointer">
          <div className="relative">
            <Avatar className="h-9 w-9 border-2 border-primary/20 shadow-md">
              <AvatarImage src="" alt="User Avatar" />
              <AvatarFallback className="bg-gradient-to-br from-primary to-green-bangladesh text-white font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs animate-pulse"
              >
                {notificationCount}
              </Badge>
            )}
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium">ব্যবহারকারী</p>
            <p className="text-xs text-muted-foreground truncate max-w-32">
              {user.email}
            </p>
          </div>
        </div>
      </DropdownMenuTrigger>
      
      <DropdownMenuContent className="w-64 p-2" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center space-x-3">
              <Avatar className="h-12 w-12 border-2 border-primary/20">
                <AvatarImage src="" alt="User Avatar" />
                <AvatarFallback className="bg-gradient-to-br from-primary to-green-bangladesh text-white font-bold text-lg">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">ব্যবহারকারী</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
                <div className="flex items-center space-x-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-500 fill-current" />
                  <span className="text-xs text-muted-foreground">৪.৫ রেটিং</span>
                </div>
              </div>
            </div>
          </div>
        </DropdownMenuLabel>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <Link to="/profile">
            <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
              <User className="mr-3 h-4 w-4 text-primary" />
              <div className="flex-1">
                <span>আমার প্রোফাইল</span>
                <p className="text-xs text-muted-foreground">প্রোফাইল দেখুন ও সম্পাদনা করুন</p>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link to="/my-posts">
            <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
              <FileText className="mr-3 h-4 w-4 text-blue-600" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>আমার পোস্ট</span>
                  <Badge variant="secondary" className="text-xs">৫</Badge>
                </div>
                <p className="text-xs text-muted-foreground">আপনার সকল পোস্ট দেখুন</p>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <Link to="/favorites">
            <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
              <Heart className="mr-3 h-4 w-4 text-red-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span>পছন্দের তালিকা</span>
                  <Badge variant="secondary" className="text-xs">১২</Badge>
                </div>
                <p className="text-xs text-muted-foreground">পছন্দের পোস্ট গুলো</p>
              </div>
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
            <Bell className="mr-3 h-4 w-4 text-orange-500" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <span>নোটিফিকেশন</span>
                <Badge variant="destructive" className="text-xs">{notificationCount}</Badge>
              </div>
              <p className="text-xs text-muted-foreground">নতুন আপডেট ও মেসেজ</p>
            </div>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
            <Eye className="mr-3 h-4 w-4 text-green-600" />
            <div className="flex-1">
              <span>সাম্প্রতিক দেখা</span>
              <p className="text-xs text-muted-foreground">সাম্প্রতিক দেখা পোস্ট গুলো</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <Link to="/submit">
            <DropdownMenuItem className="cursor-pointer hover:bg-primary/10 text-primary">
              <Plus className="mr-3 h-4 w-4" />
              <span className="font-medium">নতুন পোস্ট করুন</span>
            </DropdownMenuItem>
          </Link>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
            <Settings className="mr-3 h-4 w-4 text-gray-600" />
            <span>সেটিংস</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer hover:bg-accent/50">
            <Shield className="mr-3 h-4 w-4 text-purple-600" />
            <span>প্রাইভেসি</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="cursor-pointer hover:bg-destructive/10 text-destructive focus:text-destructive"
          onClick={onSignOut}
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span>সাইন আউট</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfileDropdown;