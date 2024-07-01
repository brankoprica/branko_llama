import React, { useState } from 'react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import Navbar from '../components/Navbar';

function CreateTextbookItem() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [url, setUrl] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Assuming content is a JSON string representing an array of topics
        let topics;
        try {
            topics = JSON.parse(content);
        } catch (error) {
            setResponseMessage('Error: Content must be a valid JSON string.');
            return;
        }

        const data = {
            title: title,
            topics: JSON.stringify(topics),
            sourceUrl: JSON.stringify([url])  // Ensure sourceUrl is an array
        };

        try {
            const response = await fetch('http://localhost:8000/api/create_textbook_item/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                setResponseMessage('Textbook item created successfully!');
                // Clear the form fields if needed
                setTitle('');
                setContent('');
                setUrl('');
            } else {
                setResponseMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setResponseMessage(`Error: ${error.message}`);
        }
    };

    return (
        <div>
            <Navbar />
            <div className="w-full max-w-md mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">Create New Textbook Item</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                        id="title"
                        type="text"
                        placeholder="Enter a title"
                        className="mt-1"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    </div>
                    <div>
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                        id="content"
                        placeholder="Type the content as JSON..."
                        className="mt-1"
                        rows={4}
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                    <div>
                    <Label htmlFor="source">Source URL</Label>
                    <Input
                        type="text"
                        placeholder="Source URL..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    </div>
                    <Button type="submit" className="w-full">
                    Submit
                    </Button>
                    {responseMessage && <p>{responseMessage}</p>}
                </form>
            </div>
        </div>
    );
}

export default CreateTextbookItem;
