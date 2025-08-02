import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { 
  Search, 
  Globe, 
  Sun, 
  Moon, 
  User, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useTheme } from 'next-themes';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const Header = () => {
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleLanguage = () => {
    setLanguage(language === 'bn' ? 'en' : 'bn');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-green-bangladesh flex items-center justify-center">
              <span className="text-white font-bold text-sm">স</span>
            </div>
            <span className="font-bold text-lg text-green-bangladesh hidden md:inline">
              {language === 'bn' ? 'স্থানীয় তথ্য কেন্দ্র' : 'Local Info Hub'}
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-4">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={language === 'bn' ? 'তথ্য খুঁজুন...' : 'Search information...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center space-x-1"
            >
              <Globe className="h-4 w-4" />
              <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="flex items-center space-x-1"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    {language === 'bn' ? 'আমার পোস্ট' : 'My Posts'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                    <LogOut className="h-4 w-4 mr-2" />
                    {language === 'bn' ? 'লগআউট' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex space-x-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    {language === 'bn' ? 'লগইন' : 'Login'}
                  </Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">
                    {language === 'bn' ? 'সাইনআপ' : 'Sign Up'}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col space-y-4 mt-6">
                {/* Mobile Search */}
                <form onSubmit={handleSearch}>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={language === 'bn' ? 'তথ্য খুঁজুন...' : 'Search information...'}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </form>

                {/* Mobile Actions */}
                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {language === 'bn' ? 'ভাষা' : 'Language'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleLanguage}
                    className="flex items-center space-x-1"
                  >
                    <Globe className="h-4 w-4" />
                    <span>{language === 'bn' ? 'EN' : 'বাং'}</span>
                  </Button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">
                    {language === 'bn' ? 'থিম' : 'Theme'}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleTheme}
                  >
                    {theme === 'dark' ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                {/* Mobile User Actions */}
                {isLoggedIn ? (
                  <div className="space-y-2">
                    <Button variant="ghost" className="w-full justify-start">
                      <User className="h-4 w-4 mr-2" />
                      {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                    </Button>
                    <Button variant="ghost" className="w-full justify-start">
                      {language === 'bn' ? 'আমার পোস্ট' : 'My Posts'}
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start text-red-600"
                      onClick={() => setIsLoggedIn(false)}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      {language === 'bn' ? 'লগআউট' : 'Logout'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link to="/login" className="block">
                      <Button variant="ghost" className="w-full">
                        {language === 'bn' ? 'লগইন' : 'Login'}
                      </Button>
                    </Link>
                    <Link to="/signup" className="block">
                      <Button className="w-full">
                        {language === 'bn' ? 'সাইনআপ' : 'Sign Up'}
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;