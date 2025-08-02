import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Mail, Phone, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState<'email' | 'phone'>('email');
  
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const identifier = loginType === 'email' ? formData.email : formData.phone;
    
    if (!identifier.trim()) {
      toast.error(loginType === 'email' ? 'ইমেইল দিন' : 'ফোন নম্বর দিন');
      return;
    }
    
    if (!formData.password.trim()) {
      toast.error('পাসওয়ার্ড দিন');
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically authenticate with Firebase
      // For now, we'll simulate the login
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('সফলভাবে লগইন হয়েছে');
      navigate('/');
    } catch (error) {
      toast.error('লগইনে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-green-bangladesh hover:text-green-600 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            হোম পেজে ফিরে যান
          </Link>
          <div className="h-12 w-12 rounded-full bg-green-bangladesh flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">স</span>
          </div>
          <h1 className="text-2xl font-bold text-green-bangladesh">স্থানীয় তথ্য কেন্দ্র</h1>
          <p className="text-muted-foreground">আপনার অ্যাকাউন্টে লগইন করুন</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">লগইন</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  ইমেইল
                </TabsTrigger>
                <TabsTrigger value="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  ফোন
                </TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="email" className="mt-0">
                  <div>
                    <Label htmlFor="email">ইমেইল ঠিকানা</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="example@email.com"
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="mt-0">
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="mt-1"
                    />
                  </div>
                </TabsContent>

                <div>
                  <Label htmlFor="password">পাসওয়ার্ড</Label>
                  <div className="relative mt-1">
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="আপনার পাসওয়ার্ড"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      লগইন হচ্ছে...
                    </>
                  ) : (
                    'লগইন করুন'
                  )}
                </Button>

                <div className="text-center">
                  <Button variant="link" className="text-sm">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </Button>
                </div>

                <div className="text-center border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    অ্যাকাউন্ট নেই?{' '}
                    <Link to="/signup" className="text-green-bangladesh hover:underline font-medium">
                      সাইনআপ করুন
                    </Link>
                  </p>
                </div>
              </form>
            </Tabs>
          </CardContent>
        </Card>

        {/* Terms */}
        <div className="text-center mt-6 text-xs text-muted-foreground">
          লগইন করার মাধ্যমে আপনি আমাদের{' '}
          <Button variant="link" className="text-xs p-0 h-auto">
            সেবার শর্তাবলী
          </Button>{' '}
          এবং{' '}
          <Button variant="link" className="text-xs p-0 h-auto">
            গোপনীয়তা নীতি
          </Button>{' '}
          মেনে নিচ্ছেন।
        </div>
      </div>
    </div>
  );
};

export default Login;