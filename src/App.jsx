import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Cart from './components/cart/cart';
import Profile from './components/profile/profile';

function App() {
    // Connecting to Database 
    
    const supabaseUrl = 'https://gvqqpzdddxecwjgzoicd.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2cXFwemRkZHhlY3dqZ3pvaWNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDMzMzUzOTksImV4cCI6MjAxODkxMTM5OX0.PsnTRJHR1t2T3cvuy5BoOmqsr8l6iEToQW6_4CS7GGI';

    const supabase = createClient(supabaseUrl, supabaseKey);
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('auth'));
    const [profile, setProfile] = useState('');

    function refreshPage() {
        window.location.reload(false);
    }
    function handleLogin(event) {
        localStorage.setItem('auth',event);
        setAuthenticated(event);
    }
    
    function getProfileDetails(details){
        setProfile(details.json());
    }



    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login handleLogin={handleLogin} getProfileDetails={getProfileDetails}/>} />
                    {authenticated && <Route path="/dashboard" element={<Dashboard supabase={supabase} refreshPage={refreshPage} />} />}
                    {authenticated && <Route path="/cart" element={<Cart supabase={supabase} refreshPage={refreshPage} />} />}
                    {authenticated && <Route path="/profile" element={<Profile profile={profile}/>}/>}
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );

}

export default App;