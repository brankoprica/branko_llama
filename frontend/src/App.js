// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import TextbookView from './pages/TextbookView';
import CreateTextbookItem from './pages/CreateTextbookItem';

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
                        path='/new_textbook'
                        element={<CreateTextbookItem/>}
                        />
                </Routes>
            </Router>
    );
}

export default App;
