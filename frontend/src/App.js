// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import CreateDocument from './pages/CreateDocument';
import DocumentView from './pages/DocumentView';

function App() {
    return (
            <Router>
                <Routes>
                    <Route
                        path='/'
                        element={<Home />}
                        />
                    <Route
                        path="/chat"
                        element={<Chat />}
                        />
                    <Route 
                        path='/save_document'
                        element={<CreateDocument/>}
                        />
                    <Route
                        path='/documents'
                        element={<DocumentView />}
                        />
                </Routes>
            </Router>
    );
}

export default App;
