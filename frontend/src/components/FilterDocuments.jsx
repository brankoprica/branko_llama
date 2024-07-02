import React, { useState } from 'react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

const FilterDocuments = ({ exams, tags, onFilter, loading }) => {
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleExamChange = (e) => {
    const value = e.target.value;
    setSelectedExams((prev) =>
      prev.includes(value) ? prev.filter((exam) => exam !== value) : [...prev, value]
    );
  };

  const handleTagChange = (e) => {
    const value = e.target.value;
    setSelectedTags((prev) =>
      prev.includes(value) ? prev.filter((tag) => tag !== value) : [...prev, value]
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
          <div className="grid grid-cols-2 gap-2">
            {tags && tags.length === 0 ?
              <>No tags to filter</>
              :
              <>
                {tags.map((tag, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Checkbox
                      type="checkbox"
                      id={`tag-${index}`}
                      value={tag}
                      onChange={handleTagChange}
                    />
                    <Label htmlFor={`tag-${index}`} className="font-normal">{tag}</Label>
                  </div>
                ))}
              </>
            }
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-center mb-4">Exams</h3>
          <div className="grid grid-cols-2 gap-2">
            {exams && exams.length === 0 ? 
              <>No Exams to filter</>
              :
              <>
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
              </>
            }
          </div>
        </div>
      </div>
      <Button className="mt-6 w-full" onClick={handleFilter}>Apply Filters</Button>
    </section>
  );
};

export default FilterDocuments;
