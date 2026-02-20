"use client"
import React from 'react';

interface CategoryProps {
  handleCategory: (category: string) => void;
}

const categories = [
  "Software Engineering",
  "Web Development",
  "Cybersecurity",
  "DevOps",
  "Machine Learning",
  "Blockchain",
  "UI/UX Design"
];

const Category: React.FC<CategoryProps> = ({ handleCategory }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategory(category)}
          className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-white transition-all duration-300 border border-white/5"
        >
          {category}
        </button>
      ))}
      <button
        onClick={() => handleCategory("")}
        className="px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 border border-primary/20"
      >
        All Topics
      </button>
    </div>
  );
};

export default Category;