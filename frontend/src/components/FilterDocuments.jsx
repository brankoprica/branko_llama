import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

const FilterDocuments = ({ exams, tags, onFilter }) => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);



  const handleExamChange = (value, checked) => {
    setSelectedExams((prev) =>
      checked ? [...prev, value] : prev.filter((exam) => exam !== value)
    );
  };

  const handleTagChange = (value, checked) => {
    setSelectedTags((prev) =>
      checked ? [...prev, value] : prev.filter((tag) => tag !== value)
    );
  };

  const handleFilter = () => {
    onFilter(selectedExams, selectedTags);
  };

  return (
    <section className="filter-component sticky top-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Filter</h2>
      <div className="grid grid-cols-1 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-center mb-4">Tags</h3>
          <div className="grid grid-cols-2 gap-4">
            {tags && tags.length === 0 ? (
              <>No tags to filter</>
            ) : (
              <>
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`tag-${index}`}
                      checked={selectedTags.includes(tag)}
                      onCheckedChange={(checked) => handleTagChange(tag, checked)}
                    />
                    <Label htmlFor={`tag-${index}`} className="font-normal hover:cursor-pointer">
                      {tag}
                    </Label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        {/* <div>
          <h3 className="text-lg font-semibold text-center mb-4">Exams</h3>
          <div className="grid grid-cols-2 gap-2">
            {exams && exams.length === 0 ? (
              <>No Exams to filter</>
            ) : (
              <>
                {exams.map((exam, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      id={`exam-${index}`}
                      checked={selectedExams.includes(exam)}
                      onCheckedChange={(checked) => handleExamChange(exam, checked)}
                    />
                    <Label className="font-normal hover:cursor-pointer" htmlFor={`exam-${index}`}>
                      {exam}
                    </Label>
                  </div>
                ))}
              </>
            )}
          </div>
        </div> */}
      </div>
      <Button className="mt-6 w-full" onClick={handleFilter}>
        Apply Filters
      </Button>
    </section>
  );
};

export default FilterDocuments;
