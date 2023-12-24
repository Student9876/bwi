import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Login from './components/login/login';
import Dashboard from './components/dashboard/dashboard';
import Cart from './components/cart/cart';

function App() {
    // Connecting to Database 
    
    const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
    const supabaseKey = process.env.REACT_APP_SUPABASE_KEY;

    const supabase = createClient(supabaseUrl, supabaseKey);
    const [authenticated, setAuthenticated] = useState(localStorage.getItem('auth'));

    function refreshPage() {
        window.location.reload(false);
    }
    function handleLogin(event) {
        localStorage.setItem('auth',event);
        setAuthenticated(event);
    }

    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
        <React.StrictMode>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login handleLogin={handleLogin}/>} />
                    {authenticated && <Route path="/dashboard" element={<Dashboard supabase={supabase} refreshPage={refreshPage} />} />}
                    {authenticated && <Route path="/cart" element={<Cart supabase={supabase} refreshPage={refreshPage} />} />}
                </Routes>
            </BrowserRouter>
        </React.StrictMode>
    );

}

export default App;