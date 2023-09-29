import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from "react-router-dom";

import './index.css';
import reportWebVitals from './reportWebVitals';
import Login from "./components/Login";
import Home from "./components/Home";
import Product from "./components/Product";
import SignUp from "./components/SignUp";
import Cart from "./components/Cart";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/home" element={<Home />} />
                <Route path="/cart/:id" element={<Cart />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
