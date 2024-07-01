// components/SearchDocuments.js
import React, { useState } from 'react';
import axios from 'axios';

function SearchDocuments() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        try {
            const response = await axios.post('/search_documents/', { query });
            setResults(response.data.documents);
        } catch (error) {
            console.error('Error searching documents:', error);
        }
    };

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search query" />
            <button onClick={handleSearch}>Search</button>
            <div>
                {results.map((doc, index) => (
                    <div key={index}>
                        <h3>{doc.title}</h3>
                        <p>{doc.content}</p>
                        <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchDocuments;
