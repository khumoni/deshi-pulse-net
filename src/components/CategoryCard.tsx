import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/firebase";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const categoryColors = {
  "emergency": "from-red-500 to-red-600",
  "happening": "from-blue-500 to-blue-600", 
  "alerts": "from-orange-500 to-orange-600",
  "weather": "from-cyan-500 to-cyan-600",
  "services": "from-green-500 to-green-600",
  "jobs": "from-purple-500 to-purple-600",
  "business": "from-indigo-500 to-indigo-600",
  "আমি-তথ্য-দিতে-চাই": "from-blue-500 to-blue-600",
  "ঘটছে-এখন": "from-red-500 to-red-600",
  "এলার্ট-তথ্য": "from-orange-500 to-orange-600",
  "বাতাস-ও-আবহাওয়া": "from-cyan-500 to-cyan-600",
  "স্থানীয়-সেবা": "from-green-500 to-green-600",
  "টিউশন-/-চাকরি": "from-purple-500 to-purple-600",
  "কৃষি-/-শিক্ষা-/-ব্যবসা-ইত্যাদি": "from-indigo-500 to-indigo-600"
};

const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  const colorClass = categoryColors[category.id as keyof typeof categoryColors] || "from-primary to-primary";
  
  return (
    <Card 
      className={cn(
        "group cursor-pointer transition-all duration-500 hover:scale-105 hover:rotate-1 bg-gradient-to-br from-card to-card/80 backdrop-blur-sm border-0 overflow-hidden",
        "hover:shadow-[0_20px_60px_-10px_rgba(34,197,94,0.3)] dark:hover:shadow-[0_20px_60px_-10px_rgba(34,197,94,0.2)]",
        isSelected ? "ring-2 ring-primary shadow-[0_20px_60px_-10px_rgba(34,197,94,0.4)] scale-105" : "shadow-md"
      )}
      onClick={onClick}
    >
      {/* Gradient overlay for hover effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <CardContent className="relative p-6 text-center">
        {/* Icon with gradient background */}
        <div className="relative mb-4">
          <div className={cn(
            "w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br shadow-lg flex items-center justify-center text-white text-3xl font-bold",
            "transform transition-all duration-300 group-hover:scale-110 group-hover:rotate-6",
            colorClass
          )}>
            {category.icon}
          </div>
          {/* Glow effect */}
          <div className={cn(
            "absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300",
            colorClass
          )} />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-bold text-base text-foreground leading-tight group-hover:text-primary transition-colors duration-300">
            {category.name}
          </h3>
          <p className="text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors duration-300">
            তথ্য জানা দিন
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;