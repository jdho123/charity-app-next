import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CategoryItem } from './types';

interface CategoryGridProps {
  categories: CategoryItem[];
  onCategorySelect: (category: CategoryItem | null) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({
  categories = [
    { name: 'Books', color: 'bg-[#C6F0A8]' },
    { name: 'Wi-Fi', color: 'bg-[#B9C0FA]' },
    { name: 'Sport', color: 'bg-[#FFEF9A]' },
    { name: 'Music', color: 'bg-[#FFBC92]' },
  ],
  onCategorySelect,
}) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 gap-4 mb-6">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onCategorySelect(category)}
            className={`${category.color} rounded-3xl p-6 flex items-center justify-center h-32 md:h-40 transition-transform hover:scale-105 cursor-pointer shadow-sm border border-black`}
          >
            <span className="font-gloria font-normal text-4xl md:text-6xl leading-[70px] tracking-[0%] text-black">
              {category.name}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center justify-center mt-2">
        <button
          onClick={() => onCategorySelect(null)}
          className="flex items-center text-black hover:opacity-80 transition-opacity"
        >
          <span className="font-gloria font-normal text-2xl md:text-3xl leading-[70px] tracking-[0%] mr-2">
            Explore
          </span>
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default CategoryGrid;
