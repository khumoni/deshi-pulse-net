import { Card, CardContent } from "@/components/ui/card";
import { Category } from "@/types/firebase";
import { cn } from "@/lib/utils";

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onClick: () => void;
}

const categoryColors = {
  "emergency": "bg-red-500",
  "happening": "bg-blue-500", 
  "alerts": "bg-orange-500",
  "weather": "bg-cyan-500",
  "services": "bg-green-500",
  "jobs": "bg-purple-500",
  "business": "bg-indigo-500",
  "আমি-তথ্য-দিতে-চাই": "bg-blue-500",
  "ঘটছে-এখন": "bg-red-500",
  "এলার্ট-তথ্য": "bg-orange-500",
  "বাতাস-ও-আবহাওয়া": "bg-cyan-500",
  "স্থানীয়-সেবা": "bg-green-500",
  "টিউশন-/-চাকরি": "bg-purple-500",
  "কৃষি-/-শিক্ষা-/-ব্যবসা-ইত্যাদি": "bg-indigo-500"
};

const CategoryCard = ({ category, isSelected, onClick }: CategoryCardProps) => {
  const colorClass = categoryColors[category.id as keyof typeof categoryColors] || "bg-primary";
  
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg",
        isSelected ? "ring-2 ring-primary shadow-lg" : "shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 text-center">
        <div className={cn(
          "w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center text-white text-2xl",
          colorClass
        )}>
          {category.icon}
        </div>
        <h3 className="font-semibold text-sm text-foreground leading-tight">
          {category.name}
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          তথ্য জানা দিন
        </p>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;