import { Card, CardContent } from "@/components/ui/card";
import { Subcategory } from "@/types/firebase";
import { cn } from "@/lib/utils";

interface SubcategoryCardProps {
  subcategory: Subcategory;
  isSelected: boolean;
  onClick: () => void;
  categoryColor?: string;
}

const getSubcategoryIcon = (subcategoryId: string) => {
  const iconMap: Record<string, string> = {
    // Emergency
    "urgent-news": "🔥",
    "electricity": "⚡",
    "weather-alert": "🌧️",
    "traffic": "🚧",
    "health-alert": "🦠",
    "local-news": "📰",
    "govt-notice": "📣",
    
    // Services
    "electrician": "🔧",
    "mechanic": "🚰",
    "housekeeping": "🧹",
    "transport": "🚖",
    "car-rental": "🧳",
    "painter": "🎨",
    
    // Jobs/Education
    "tuition": "🧑‍🎓",
    "jobs": "💼",
    "volunteer": "🤝",
    
    // Default
    "default": "📋"
  };
  
  return iconMap[subcategoryId] || iconMap["default"];
};

const SubcategoryCard = ({ subcategory, isSelected, onClick, categoryColor = "bg-primary" }: SubcategoryCardProps) => {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-md",
        isSelected ? "ring-2 ring-primary shadow-md" : "shadow-sm"
      )}
      onClick={onClick}
    >
      <CardContent className="p-3 text-center">
        <div className={cn(
          "w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center text-white text-lg",
          categoryColor
        )}>
          {getSubcategoryIcon(subcategory.id)}
        </div>
        <h4 className="font-medium text-xs text-foreground leading-tight">
          {subcategory.name}
        </h4>
      </CardContent>
    </Card>
  );
};

export default SubcategoryCard;