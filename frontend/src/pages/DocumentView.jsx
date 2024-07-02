import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import formatDate from '../helper_functions/DateFormat';
import ExpandableText from '../components/ExpandableText';
import loader from '../components/ui/loader';
import FilterTextbooks from '../components/FilterTextbooks';
import Navbar from '../components/Navbar';
import { Separator } from '../components/ui/separator';

function DocumentView() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/all_documents/');
        setData(res.data['Documents']);
        setFilteredData(res.data['Documents']);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handleFilter = (selectedExams, selectedCategories) => {
    const filtered = data.filter(
      (item) =>
        (selectedExams.length === 0 || selectedExams.some((exam) => item.exams.includes(exam))) &&
        (selectedCategories.length === 0 || selectedCategories.some((category) => item.categories.includes(category)))
    );
    setFilteredData(filtered);
  };

  if (loading) return  <Navbar />  ;

  const allExams = [...new Set(data.flatMap((item) => item.exams))];
  const allCategories = [...new Set(data.flatMap((item) => item.categories))];

  return (
    <>
      <Navbar />
      <div class="lg:flex lg:gap-8 sm:gap-4 mx-4 sm:inline">
          <div class="lg:w-1/6 w-full my-8 mx-auto">
              {/* <FilterTextbooks exams={allExams} categories={allCategories} onFilter={handleFilter} /> */}
          </div>
          <div class="lg:w-5/6 w-full">
              <div className=" mx-auto my-8">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight  lg:text-5xl">Documents</h1>
              </div>
              <div className=" mx-auto my-4">
                <ul>
                  {filteredData.map((item, index) => (
                    <li key={index} className="my-4">
                      <Card>
                        <CardHeader className='pb-2 px-6 pt-6'>
                            <CardTitle>
                                {index + 1}. <span className="underline">Title:</span> {item.title}
                            </CardTitle>
                            <CardDescription>
                                <div className="left-side">
                                    <div>Exams: {item.exams.join(', ')}</div>
                                    <div>Tags: {item.tags.join(', ')}</div>
                                </div>
                                <div className="right-side">Created on: {formatDate(item.createdAt)}</div>
                            </CardDescription>
                            <Separator orientation="horizontal" />
                        </CardHeader>
                        <CardContent>
                            <h2 className="underline font-bold mb-2">General Info:</h2>
                            <p>{item.generalInfo}</p>
                            <h2 className="underline font-bold mb-2">Content:</h2>
                            <ExpandableText content={item.content} loading={loading} />
                        </CardContent>
                      </Card>
                    </li>
                  ))}
                </ul>
              </div>
          </div>
      </div>
    </>
  );
}

export default DocumentView;
