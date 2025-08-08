import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Category, Subcategory } from "@/types/firebase";
import { motion, AnimatePresence } from "framer-motion";

interface EnhancedCategoryCardProps {
  category: Category;
  isSelected: boolean;
  onCategoryClick: () => void;
  onSubcategoryClick: (subcategory: Subcategory) => void;
  selectedSubcategory?: Subcategory | null;
}

const EnhancedCategoryCard = ({ 
  category, 
  isSelected, 
  onCategoryClick, 
  onSubcategoryClick,
  selectedSubcategory 
}: EnhancedCategoryCardProps) => {
  const [isExpanded, setIsExpanded] = useState(isSelected);

  const handleCategoryClick = () => {
    onCategoryClick();
    setIsExpanded(!isExpanded);
  };

  const postCount = Math.floor(Math.random() * 50) + 1; // Mock post count

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        className={`group cursor-pointer transition-all duration-300 hover:shadow-xl border-2 overflow-hidden ${
          isSelected 
            ? 'border-primary shadow-lg ring-2 ring-primary/20 bg-primary/5' 
            : 'border-border hover:border-primary/50 hover:shadow-lg'
        }`}
      >
        <CardContent className="p-0">
          {/* Main Category Header */}
          <div 
            className="p-6 relative overflow-hidden"
            onClick={handleCategoryClick}
          >
            {/* Background Gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br opacity-10 transition-opacity duration-300 ${
              isSelected ? 'opacity-20' : 'group-hover:opacity-15'
            } ${
              category.icon === '🔧' ? 'from-blue-500 to-cyan-500' :
              category.icon === '⚠️' ? 'from-red-500 to-orange-500' :
              category.icon === '💼' ? 'from-green-500 to-emerald-500' :
              category.icon === '📚' ? 'from-purple-500 to-indigo-500' :
              'from-primary to-green-bangladesh'
            }`} />
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`text-3xl p-3 rounded-2xl transition-all duration-300 ${
                    isSelected ? 'bg-primary/20 scale-110' : 'bg-background/50 group-hover:bg-primary/10 group-hover:scale-105'
                  }`}>
                    {category.icon || '📝'}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold transition-colors duration-300 ${
                      isSelected ? 'text-primary' : 'text-foreground group-hover:text-primary'
                    }`}>
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground font-medium">
                      {category.nameEn}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Badge 
                    variant={isSelected ? "default" : "secondary"} 
                    className="font-medium"
                  >
                    {postCount}টি পোস্ট
                  </Badge>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className={`h-5 w-5 transition-colors duration-300 ${
                      isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                    }`} />
                  </motion.div>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                এই ক্যাটেগরির সকল তথ্য এক জায়গায়
              </p>
            </div>
          </div>

          {/* Subcategories Section */}
          <AnimatePresence>
            {isExpanded && category.subcategories && category.subcategories.length > 0 && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="border-t border-border/50 bg-background/30"
              >
                <div className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold text-foreground flex items-center">
                      <span className="mr-2">🏷️</span>
                      উপ-ক্যাটেগরি সমূহ
                    </h4>
                    <Badge variant="outline" className="text-xs">
                      {category.subcategories.length}টি
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {category.subcategories.map((subcategory, index) => {
                      const isSubSelected = selectedSubcategory?.id === subcategory.id;
                      const subPostCount = Math.floor(Math.random() * 20) + 1;
                      
                      return (
                        <motion.div
                          key={subcategory.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Button
                            variant={isSubSelected ? "default" : "ghost"}
                            size="sm"
                            className={`w-full justify-between h-auto p-3 transition-all duration-200 ${
                              isSubSelected 
                                ? 'bg-primary shadow-md' 
                                : 'hover:bg-primary/10 hover:shadow-sm border border-border/50 hover:border-primary/30'
                            }`}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSubcategoryClick(subcategory);
                            }}
                          >
                            <div className="text-left flex-1">
                              <div className={`font-medium text-sm ${
                                isSubSelected ? 'text-primary-foreground' : 'text-foreground'
                              }`}>
                                {subcategory.name}
                              </div>
                              <div className={`text-xs ${
                                isSubSelected ? 'text-primary-foreground/80' : 'text-muted-foreground'
                              }`}>
                                {subcategory.nameEn}
                              </div>
                            </div>
                            <Badge 
                              variant={isSubSelected ? "secondary" : "outline"}
                              className="text-xs ml-2"
                            >
                              {subPostCount}
                            </Badge>
                          </Button>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default EnhancedCategoryCard;