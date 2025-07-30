import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AllMusic from "./pages/AllMusic";
import Favourite from "./pages/Favourite";
import PlayList from "./pages/PlayList";
import Download from "./pages/Download";
import Setting from "./pages/Setting";
import { AuthProvider } from './hooks/AuthContext';


export default function App() {

    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/AllMusic" element={<AllMusic />} />
                    <Route path="/Favourite" element={<Favourite />} />
                    <Route path="/PlayList" element={<PlayList />} />
                    <Route path="/Download" element={<Download />} />
                    <Route path="/Setting" element={<Setting />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}