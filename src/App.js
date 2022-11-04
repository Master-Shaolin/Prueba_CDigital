import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import AnimatedRoutes from './components/AnimatedRoutes';
import Footer from './components/Footer';


function App() {

  return (
    <>
      <Router>
        <div id='announcement'>
          <label className="text-center" >Free Shipping on Orders Over $50</label>
        </div>
        <Header />
        <AnimatedRoutes />
        <Footer />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
