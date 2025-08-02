import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import LocationSelector from '@/components/LocationSelector';
import { categories } from '@/data/locations';
import { ArrowLeft, Upload, Send } from 'lucide-react';
import { toast } from 'sonner';

const SubmitPost = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Get pre-selected category and subcategory from route state
  const preSelectedCategory = location.state?.categoryId;
  const preSelectedSubcategory = location.state?.subcategoryId;

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: preSelectedCategory || '',
    subcategory: preSelectedSubcategory || '',
    phone: '',
    authorName: '',
    location: null as { division: string; district: string; upazila: string } | null,
    image: null as File | null
  });

  const selectedCategory = categories.find(cat => cat.id === formData.category);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error('ছবির সাইজ ৫ MB এর কম হতে হবে');
        return;
      }
      handleInputChange('image', file);
      toast.success('ছবি যোগ করা হয়েছে');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title.trim()) {
      toast.error('শিরোনাম দিন');
      return;
    }
    
    if (!formData.content.trim()) {
      toast.error('বিস্তারিত লিখুন');
      return;
    }
    
    if (!formData.category) {
      toast.error('বিভাগ নির্বাচন করুন');
      return;
    }
    
    if (!formData.subcategory) {
      toast.error('উপবিভাগ নির্বাচন করুন');
      return;
    }
    
    if (!formData.location) {
      toast.error('এলাকা নির্বাচন করুন');
      return;
    }
    
    if (!formData.authorName.trim()) {
      toast.error('আপনার নাম লিখুন');
      return;
    }

    setIsSubmitting(true);

    try {
      // Here you would typically submit to Firebase
      // For now, we'll simulate the submission
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('আপনার তথ্য সফলভাবে জমা দেওয়া হয়েছে। অনুমোদনের জন্য অপেক্ষা করুন।');
      navigate('/');
    } catch (error) {
      toast.error('কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ফিরে যান
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">তথ্য যোগ করুন</h1>
            <p className="text-muted-foreground">আপনার এলাকার গুরুত্বপূর্ণ তথ্য শেয়ার করুন</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>মূল তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">শিরোনাম *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="একটি স্পষ্ট শিরোনাম লিখুন"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="content">বিস্তারিত *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleInputChange('content', e.target.value)}
                  placeholder="আপনার তথ্যটি বিস্তারিত লিখুন"
                  rows={4}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Category Selection */}
          <Card>
            <CardHeader>
              <CardTitle>বিভাগ নির্বাচন</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>বিভাগ *</Label>
                <Select value={formData.category} onValueChange={(value) => {
                  handleInputChange('category', value);
                  handleInputChange('subcategory', ''); // Reset subcategory
                }}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="বিভাগ নির্বাচন করুন" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        <span className="flex items-center gap-2">
                          <span>{category.icon}</span>
                          <span>{category.name}</span>
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedCategory && (
                <div>
                  <Label>উপবিভাগ *</Label>
                  <Select value={formData.subcategory} onValueChange={(value) => handleInputChange('subcategory', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="উপবিভাগ নির্বাচন করুন" />
                    </SelectTrigger>
                    <SelectContent>
                      {selectedCategory.subcategories.map((subcategory) => (
                        <SelectItem key={subcategory.id} value={subcategory.id}>
                          {subcategory.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Location */}
          <Card>
            <CardHeader>
              <CardTitle>এলাকার তথ্য</CardTitle>
            </CardHeader>
            <CardContent>
              <LocationSelector
                onLocationSelect={(location) => handleInputChange('location', location)}
                selectedLocation={formData.location}
              />
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>যোগাযোগের তথ্য</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="authorName">আপনার নাম *</Label>
                <Input
                  id="authorName"
                  value={formData.authorName}
                  onChange={(e) => handleInputChange('authorName', e.target.value)}
                  placeholder="আপনার পূর্ণ নাম লিখুন"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="phone">ফোন নম্বর (ঐচ্ছিক)</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="01XXXXXXXXX"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>ছবি (ঐচ্ছিক)</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="image">ছবি আপলোড করুন</Label>
                <div className="mt-1">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById('image')?.click()}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {formData.image ? formData.image.name : 'ছবি নির্বাচন করুন'}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  সর্বোচ্চ ৫ MB সাইজের ছবি আপলোড করতে পারবেন
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card>
            <CardContent className="pt-6">
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    জমা দেওয়া হচ্ছে...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    তথ্য জমা দিন
                  </>
                )}
              </Button>
              
              <p className="text-sm text-muted-foreground text-center mt-3">
                আপনার তথ্য প্রাথমিক যাচাইয়ের পর প্রকাশিত হবে
              </p>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default SubmitPost;