// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import TextbookView from './pages/TextbookView';
import CreateDocument from './pages/CreateDocument';

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
                        path='/textbook'
                        element={<TextbookView />}
                        />
                    <Route 
                        path='/save_document'
                        element={<CreateDocument/>}
                        />
                </Routes>
            </Router>
    );
}

export default App;
