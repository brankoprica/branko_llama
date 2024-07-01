// components/UploadDocument.js
import React, { useState } from 'react';
import axios from 'axios';

function UploadDocument() {
    const [file, setFile] = useState(null);
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
        const formData = new FormData();
        formData.append('document', file);
        formData.append('prompt', prompt);
        formData.append('response', response);

        try {
            const response = await axios.post('/create_fine_tuning_example/', formData);
            console.log('Upload successful:', response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <input type="file" onChange={handleFileChange} />
            <input type="text" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="Prompt" />
            <textarea value={response} onChange={(e) => setResponse(e.target.value)} placeholder="Response" />
            <button onClick={handleUpload}>Upload</button>
        </div>
    );
}

export default UploadDocument;
