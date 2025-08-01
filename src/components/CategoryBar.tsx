import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/data/locations";
import { Category, Subcategory } from "@/types/firebase";

interface CategoryBarProps {
  onCategorySelect: (category: Category) => void;
  onSubcategorySelect: (subcategory: Subcategory) => void;
  selectedCategory: Category | null;
  selectedSubcategory: Subcategory | null;
}

const CategoryBar = ({ 
  onCategorySelect, 
  onSubcategorySelect, 
  selectedCategory, 
  selectedSubcategory 
}: CategoryBarProps) => {
  return (
    <div className="w-full bg-card border-b sticky top-0 z-10">
      {/* Main Categories */}
      <ScrollArea className="w-full">
        <div className="flex space-x-2 p-4">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory?.id === category.id ? "default" : "outline"}
              size="sm"
              className="whitespace-nowrap flex items-center gap-2 transition-all"
              onClick={() => onCategorySelect(category)}
            >
              <span>{category.icon}</span>
              <span className="hidden md:inline">{category.name}</span>
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      {/* Subcategories */}
      {selectedCategory && (
        <ScrollArea className="w-full border-t">
          <div className="flex space-x-2 p-3 bg-muted/50">
            {selectedCategory.subcategories.map((subcategory) => (
              <Button
                key={subcategory.id}
                variant={selectedSubcategory?.id === subcategory.id ? "secondary" : "ghost"}
                size="sm"
                className="whitespace-nowrap text-sm"
                onClick={() => onSubcategorySelect(subcategory)}
              >
                {subcategory.name}
              </Button>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
    </div>
  );
};

export default CategoryBar;