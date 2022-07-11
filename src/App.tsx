import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Backendless from 'backendless'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Friends from "./pages/Friends";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="/friends" element={<Friends/>}/>
                <Route path="/reg" element={<SignUp/>}/>
                <Route path="/log" element={<SignIn/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
