import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Navbar from '../components/Navbar';

function CreateDocument() {
    const [title, setTitle] = useState('');
    const [generalInfo, setGeneralInfo] = useState('');
    const [content, setContent] = useState([{ sectionTitle: '', sectionContent: '' }]);
    const [exams, setExams] = useState([]);
    const [tags, setTags] = useState([]);
    const [examInput, setExamInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [sourceUrl, setSourceUrl] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSectionChange = (index, field, value) => {
        const newContent = [...content];
        newContent[index][field] = value;
        setContent(newContent);
    };

    const addSection = () => {
        setContent([...content, { sectionTitle: '', sectionContent: '' }]);
    };

    const removeSection = (index) => {
        const newContent = [...content];
        newContent.splice(index, 1);
        setContent(newContent);
    };

    const handleExamAdd = () => {
        if (examInput.trim() !== "") {
            setExams([...exams, examInput.trim()]);
            setExamInput("");
        }
    };

    const handleTagAdd = () => {
        if (tagInput.trim() !== "") {
            setTags([...tags, tagInput.trim()]);
            setTagInput("");
        }
    };

    const handleRemoveExam = index => {
        const updatedExams = [...exams];
        updatedExams.splice(index, 1);
        setExams(updatedExams);
    };

    const handleRemoveTag = index => {
        const updatedTags = [...tags];
        updatedTags.splice(index, 1);
        setTags(updatedTags);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = { title, generalInfo, content, exams, tags, sourceUrl };


        try {
            const response = await fetch('http://localhost:8000/api/create_document/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setResponseMessage('Document created successfully!');
                setTitle('');
                setGeneralInfo('');
                setContent([{ sectionTitle: '', sectionContent: '' }]);
                setExams([]);
                setTags([]);
                setSourceUrl('');
            } else {
                setResponseMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <div className="w-full max-w-md mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Create New Document</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <section class="my-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </section>
                    
                    <section class="my-2">
                        <Label htmlFor="generalInfo">General Info</Label>
                        <Textarea id="generalInfo" value={generalInfo} onChange={(e) => setGeneralInfo(e.target.value)} />
                    </section>
                    
                    <section class="my-2">
                        <h2 className="text-lg font-bold">Main Content</h2>
                        {content.map((section, index) => (
                            <div key={index}>
                                <h2 className="text-md font-bold">Section {index + 1}</h2>
                                <Label htmlFor={`sectionTitle-${index}`}>Section Title</Label>
                                <Input id={`sectionTitle-${index}`} type='text' value={section.sectionTitle} onChange={(e) => handleSectionChange(index, 'sectionTitle', e.target.value)} />
                        
                                <Label htmlFor={`sectionContent-${index}`}>Section Content</Label>
                                <Textarea id={`sectionContent-${index}`} value={section.sectionContent} onChange={(e) => handleSectionChange(index, 'sectionContent', e.target.value)} />
                                <Button className="mt-2 w-full" type="button" variant="destructive" size="sm" onClick={() => removeSection(index)}>Remove Section</Button>
                            </div>
                        ))}
                        <Button type="button" className="w-full items-center my-2 flex items-center gap-1" variant="outline" size="icon" onClick={addSection}>
                            Add Section
                            <PlusIcon className="w-4 h-4" />
                        </Button>
                    </section>
                    
                    <section class="my-2">
                        <Label htmlFor="sourceUurl">Source URL</Label>
                        <Input id="sourceUrl" type="text" value={sourceUrl} onChange={(e) => setSourceUrl(e.target.value)} />
                    </section>
                    
                    {/* <section class="my-2">
                        <Label htmlFor="exams">Exams:</Label>
                        <div className="flex items-center gap-2 mb-4">
                            <Input type="text" placeholder="Add an exam" value={examInput} onChange={(e) => setExamInput(e.target.value)} />
                            <Button type="button" onClick={handleExamAdd}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {exams.map((exam, index) => (
                                <div key={index} className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                                    {exam}
                                    <button type="button" onClick={() => handleRemoveExam(index)}  className="ml-2 font-bold text-red-500 hover:text-red-600">X</button>
                                </div>
                            ))}
                        </div>
                    </section> */}

                    {/* Dynamic Tag Input */}
                    <section class="my-2">
                        <Label htmlFor="tags">Tags:</Label>
                        <div className="flex items-center gap-2 mb-4">
                            <Input type="text" placeholder="Add a tag" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                            <Button type="button" onClick={handleTagAdd}>Add</Button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, index) => (
                                <div key={index} className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                                    {tag}
                                    <button type="button" onClick={() => handleRemoveTag(index)} className="ml-2 font-bold text-red-500 hover:text-red-600">X</button>
                                </div>
                            ))}
                        </div>
                    </section>
                    
                    <Button type="submit" className="w-full" >Submit</Button>
                    {responseMessage && <p>{responseMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default CreateDocument;

function PlusIcon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    )
  }