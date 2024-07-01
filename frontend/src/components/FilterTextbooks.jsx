// src/components/FilterComponent.js
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const FilterComponent = ({ exams, categories, onFilter }) => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleExamChange = (e) => {
    const value = e.target.value;
    setSelectedExams((prev) =>
      prev.includes(value) ? prev.filter((exam) => exam !== value) : [...prev, value]
    );
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((category) => category !== value) : [...prev, value]
    );
  };

  const handleFilter = () => {
    onFilter(selectedExams, selectedCategories);
  };

  return (
    <section className="filter-component sticky top-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Filter</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
            <h3 className="text-lg font-semibold text-center lg:text-left mb-4">Exams</h3>
            <div class="space-y-2">
                {exams.map((exam, index) => (
                    <div key={index} className="flex items-center gap-2">
                    <Checkbox
                        type="checkbox"
                        id={`exam-${index}`}
                        value={exam}
                        onChange={handleExamChange}
                    />
                    <Label className="font-normal" htmlFor={`exam-${index}`}>
                        {exam}
                    </Label>
                    </div>
                ))}
            </div>
        </div>

        <div>
            <h3 className="text-lg font-semibold text-center lg:text-left mb-4">Categories</h3>
            <div class="space-y-2">
                {categories.map((category, index) => (
                    <div key={index}  className="flex items-center gap-2">
                    <Checkbox
                        type="checkbox"
                        id={`category-${index}`}
                        value={category}
                        onChange={handleCategoryChange}
                    />
                    <Label htmlFor={`category-${index}`}  className="font-normal">{category}</Label>
                    </div>
                ))}
            </div>
        </div>
      </div>
        <Button className="mt-6 w-full" onClick={handleFilter}>Apply Filters</Button>
    </section>
  );
};

export default FilterComponent;
