import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Plus, TrendingUp, Users, MapPin } from "lucide-react";

interface HeroSectionProps {
  language: 'bn' | 'en';
}

const HeroSection = ({ language }: HeroSectionProps) => {
  const stats = [
    {
      icon: Users,
      value: "১০,০০০+",
      label: language === 'bn' ? 'সক্রিয় ব্যবহারকারী' : 'Active Users',
      valueEn: "10,000+"
    },
    {
      icon: TrendingUp,
      value: "৫০০+",
      label: language === 'bn' ? 'দৈনিক পোস্ট' : 'Daily Posts',
      valueEn: "500+"
    },
    {
      icon: MapPin,
      value: "৬৪",
      label: language === 'bn' ? 'জেলা কভারেজ' : 'Districts Covered',
      valueEn: "64"
    }
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/10 py-16 md:py-24">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
            {language === 'bn' ? (
              <>
                স্থানীয় <span className="bg-gradient-to-r from-primary to-green-bangladesh bg-clip-text text-transparent">তথ্য কেন্দ্র</span>
              </>
            ) : (
              <>
                Local <span className="bg-gradient-to-r from-primary to-green-bangladesh bg-clip-text text-transparent">Info Hub</span>
              </>
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {language === 'bn' 
              ? 'আপনার এলাকার সর্বশেষ তথ্য, জরুরি খবর এবং স্থানীয় সেবার সন্ধান পান। সবার সাথে গুরুত্বপূর্ণ তথ্য শেয়ার করুন।'
              : 'Stay updated with the latest local information, emergency news, and community services. Share important information with everyone.'
            }
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/submit">
              <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-green-bangladesh hover:from-primary/90 hover:to-green-bangladesh/90 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <Plus className="w-5 h-5 mr-2" />
                {language === 'bn' ? 'তথ্য শেয়ার করুন' : 'Share Information'}
              </Button>
            </Link>
            
            <Button variant="outline" size="lg" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/5">
              {language === 'bn' ? 'আরো জানুন' : 'Learn More'}
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 animate-slide-up">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:bg-card/80 transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors duration-300">
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {language === 'bn' ? stat.value : stat.valueEn}
              </div>
              <div className="text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;