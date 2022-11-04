import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../pages/Main';
import Login from '../pages/Login';
import Shop from '../pages/Shop';
import Contact from '../pages/Contact';
import Product from '../pages/Product';
import Cart from '../pages/Cart'

import { AnimatePresence } from 'framer-motion/dist/framer-motion';

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Main />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/shop' element={<Shop />}></Route>
            <Route path='/contact' element={<Contact />}></Route>
            <Route path='/product/:id' element={<Product />}></Route>
            <Route path='/cart' element={<Cart />}></Route>
        </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes