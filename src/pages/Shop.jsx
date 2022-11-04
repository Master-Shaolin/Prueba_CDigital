import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { motion } from 'framer-motion/dist/framer-motion';
import transitions from "bootstrap";

import Spinner from '../components/Spinner';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

import { getProducts, reset } from '../features/products/productsSlice';

function Shop() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const {products, isLoading, isError, message} = useSelector((state) => state.products);
  const [filteredProducts,setFilteredProducts] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(location.pathname === '/shop') {
      dispatch(getProducts());
    }

    return () => {
      dispatch(reset());
    }
  }, [navigate, isError, message, dispatch]);

  const getCategoryCount = (category) => {
    const count = products.filter(product => product.category === category).length;
    return count;
  }

  const filterByCategory = (category) => {
    setCurrentPage(1);
    setFilteredProducts(products.filter(product => product.category === category));
  }

  const filterByPrice = (minPrice, maxPrice) => {
    setCurrentPage(1);
    if(maxPrice === null){
      setFilteredProducts(products.filter((product) => { return product.price >= minPrice }));
    }else {
      setFilteredProducts(products.filter((product) => { return product.price >= minPrice && product.price <= maxPrice}));
    }
  }

  const clearFilters = () => {
    setFilteredProducts([]);
  }

  const toggleCollapse = (e) => {
    var elements = [...document.querySelectorAll('.collapse')];
    var filteredElements = elements.filter(function(element) {
      return element !== e;
    });
    filteredElements.forEach(function(e){
      e.classList.remove("show");
    });
  }

  // Get current products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if((isLoading || products.length <= 0) && location.pathname !== '/login') {
    return(<Spinner />)
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}
    >
      <nav className='breadcrumb-container' aria-label="breadcrumb">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12">
              <h4>Shop</h4>
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to='/'>Home</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Shop</li>
              </ol>
            </div>
          </div>
        </div>
      </nav>
      <div className="container" id="shopContainer">
        <div className="row">
            <div className="col-lg-3 col-md-3">
              <div className="row" id="shopFilterContainer">
                <div className="card">
                  <div className="card-heading">
                    <button className="btn btn-link" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                      onClick={(e) => toggleCollapse(e)}>
                      CATEGORY <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </div>
                  <div className="collapse" id="collapseOne">
                    <div className="card-body">
                      <ul>
                        <li onClick={() => filterByCategory("men's clothing")}>Men ({getCategoryCount("men's clothing")})</li>
                        <li onClick={() => filterByCategory("women's clothing")}>Women ({getCategoryCount("women's clothing")})</li>
                        <li onClick={() => filterByCategory("jewelery")}>Jewelery ({getCategoryCount("jewelery")})</li>
                        <li onClick={() => filterByCategory("electronics")}>Electronics ({getCategoryCount("electronics")})</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                    <button className="btn btn-link" type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                      onClick={(e) => toggleCollapse(e)}>
                      FILTER PRICE <FontAwesomeIcon icon={faChevronDown} />
                    </button>
                  </div>
                  <div className="collapse" id="collapseTwo">
                    <div className="card-body">
                      <ul>
                        <li onClick={() => filterByPrice(0.00,50.00)}>$0.00 - $50.00</li>
                        <li onClick={() => filterByPrice(50.00,100.00)}>$50.00 - $100.00</li>
                        <li onClick={() => filterByPrice(100.00,150.00)}>$100.00 - $150.00</li>
                        <li onClick={() => filterByPrice(150.00,200.00)}>$150.00 - $200.00</li>
                        <li onClick={() => filterByPrice(200.00,null)}>$200.00+</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-heading">
                      <button id='btnClearFilters' className='btn btn-default' onClick={() => clearFilters()}>CLEAR FILTERS</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9 col-md-9">
              <div className="row">
              { filteredProducts.length <= 0 ? products.slice(indexOfFirstProduct, indexOfLastProduct).map((product,index) => (
                    <ProductCard key={product.id} product={product} colSize={4} animationDelay={index + 1}></ProductCard>
                )) : filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct).map((product,index) => (
                    <ProductCard key={product.id} product={product} colSize={4} animationDelay={index + 1}></ProductCard>
                ))}
                <Pagination
                  productsPerPage={productsPerPage}
                  totalProducts={ filteredProducts.length <= 0 ? products.length : filteredProducts.length }
                  currentPage={currentPage}
                  paginate={paginate}/>
              </div>
            </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Shop