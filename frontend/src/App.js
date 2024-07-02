// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Chat from './pages/Chat';
import CreateDocument from './pages/CreateDocument';
import DocumentView from './pages/DocumentView';
import Navbar from './components/Navbar';

function App() {
    const location = useLocation();

    const showNavbar = location.pathname !== '/' && location.pathname !== '/chat';

    return (
        <div>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/chat' element={<Chat />} />
                <Route path='/save_document' element={<CreateDocument />} />
                <Route path='/documents' element={<DocumentView />} />
            </Routes>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;
