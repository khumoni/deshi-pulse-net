import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import LocationSelector from '@/components/LocationSelector';
import { ArrowLeft, Mail, Phone, Eye, EyeOff, User } from 'lucide-react';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Signup = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupType, setSignupType] = useState<'email' | 'phone'>('email');
  const [acceptTerms, setAcceptTerms] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: null as { division: string; district: string; upazila: string } | null
  });

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error('পূর্ণ নাম দিন');
      return false;
    }

    const identifier = signupType === 'email' ? formData.email : formData.phone;
    if (!identifier.trim()) {
      toast.error(signupType === 'email' ? 'ইমেইল দিন' : 'ফোন নম্বর দিন');
      return false;
    }

    if (signupType === 'email' && !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error('সঠিক ইমেইল ঠিকানা দিন');
      return false;
    }

    if (signupType === 'phone' && !/^01[3-9]\d{8}$/.test(formData.phone)) {
      toast.error('সঠিক ফোন নম্বর দিন (01XXXXXXXXX)');
      return false;
    }

    if (formData.password.length < 6) {
      toast.error('পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('পাসওয়ার্ড মিল নেই');
      return false;
    }

    if (!formData.location) {
      toast.error('এলাকা নির্বাচন করুন');
      return false;
    }

    if (!acceptTerms) {
      toast.error('শর্তাবলী মেনে নিন');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Here you would typically create account with Firebase
      // For now, we'll simulate the signup
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে');
      navigate('/');
    } catch (error) {
      toast.error('অ্যাকাউন্ট তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="container mx-auto max-w-md">
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
          <p className="text-muted-foreground">নতুন অ্যাকাউন্ট তৈরি করুন</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">সাইনআপ</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <Label htmlFor="fullName">পূর্ণ নাম *</Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="আপনার পূর্ণ নাম"
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Email/Phone Selection */}
              <Tabs value={signupType} onValueChange={(value) => setSignupType(value as 'email' | 'phone')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    ইমেইল
                  </TabsTrigger>
                  <TabsTrigger value="phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    ফোন
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="mt-4">
                  <div>
                    <Label htmlFor="email">ইমেইল ঠিকানা *</Label>
                    <div className="relative mt-1">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="example@email.com"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="phone" className="mt-4">
                  <div>
                    <Label htmlFor="phone">ফোন নম্বর *</Label>
                    <div className="relative mt-1">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="01XXXXXXXXX"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* Password */}
              <div>
                <Label htmlFor="password">পাসওয়ার্ড *</Label>
                <div className="relative mt-1">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    placeholder="কমপক্ষে ৬ অক্ষর"
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

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword">পাসওয়ার্ড নিশ্চিত করুন *</Label>
                <div className="relative mt-1">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="পুনরায় পাসওয়ার্ড দিন"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Location */}
              <div>
                <Label className="text-sm font-medium">আপনার এলাকা *</Label>
                <div className="mt-2">
                  <LocationSelector
                    onLocationSelect={(location) => handleInputChange('location', location)}
                    selectedLocation={formData.location}
                  />
                </div>
              </div>

              {/* Terms Acceptance */}
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked === true)}
                  className="mt-1"
                />
                <Label htmlFor="terms" className="text-sm leading-5">
                  আমি{' '}
                  <Button variant="link" className="text-sm p-0 h-auto text-green-bangladesh">
                    সেবার শর্তাবলী
                  </Button>{' '}
                  এবং{' '}
                  <Button variant="link" className="text-sm p-0 h-auto text-green-bangladesh">
                    গোপনীয়তা নীতি
                  </Button>{' '}
                  মেনে নিচ্ছি।
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    অ্যাকাউন্ট তৈরি হচ্ছে...
                  </>
                ) : (
                  'অ্যাকাউন্ট তৈরি করুন'
                )}
              </Button>

              <div className="text-center border-t pt-4">
                <p className="text-sm text-muted-foreground">
                  ইতিমধ্যে অ্যাকাউন্ট আছে?{' '}
                  <Link to="/login" className="text-green-bangladesh hover:underline font-medium">
                    লগইন করুন
                  </Link>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;