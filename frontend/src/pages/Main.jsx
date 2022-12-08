import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import ProductCard from '../components/ProductCard';
import Slider from '../components/Slider';
import Spinner from '../components/Spinner';

import { motion } from 'framer-motion/dist/framer-motion';
import { getProductsByCategory, reset } from '../features/products/productsSlice';

import { categoryFilters } from '../data/categoryFilters';
import { instagramImages } from '../data/instagramImages';
import { fashionNewTrends } from '../data/fashionNewTrends';

function Main() {
  const productFilters = categoryFilters;
  const [filterIndex,setFilterIndex] = useState(0);
  const [filterName,setFilterName] = useState("men's clothing");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const {products, isLoading, isError, message} = useSelector((state) => state.products);
  const [filteredProducts,setFilteredProducts] = useState([]);

  const instagramImg = instagramImages;

  useEffect(() => {
    if(isError) {
      console.log(message);
    }

    if(location.pathname === '/') {
      dispatch(getProductsByCategory(filterName));
    }

    return () => {
      dispatch(reset());
    }
  }, [navigate, isError, message, dispatch]);

  const onFilterClick = (index,filter) => {
    setFilterIndex(index);
    setFilterName(filter.toLowerCase());
    setFilteredProducts(filterByCategory(index));
  };

    const filterByCategory = (index) => {
      const filteredProd = products.filter(
        (product) => product.category === productFilters[index].toLowerCase()
      );
      return filteredProd;
    };

    if((isLoading || products.length <= 0) && location.pathname !== '/login') {
      return(<Spinner />)
    }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <Slider autoPlay={true}/>
      <section className='banner spad'>
        <div className="container">
          <div className="row">
            <div className="col-lg-7 offset-lg-4">
              <div className="banner__item">
                <div className="banner__item_text">
                  <h2>Clothing Collections 2022</h2>
                  <a href="/shop">SHOP NOW</a>
                </div>
                <div className="banner__item_pic">
                  <img src={require(`../assets/img/banner_hoodie.png`)} alt="" className="img"/>
                </div>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="banner__item banner__item--middle">
                <div className="banner__item_pic">
                  <img src={require(`../assets/img/banner_lens.png`)} alt="" className="img"/>
                </div>
                <div className="banner__item_text">
                  <h2>Accesories</h2>
                  <a href="/shop">SHOP NOW</a>
                </div>
              </div>
            </div>
          <div className="col-lg-7">
            <div className="banner__item banner__item--last">
              <div className="banner__item_text">
                <h2>Shoes Spring 2030</h2>
                <a href="/shop">SHOP NOW</a>
              </div>
              <div className="banner__item_pic">
                <img src={require(`../assets/img/banner_shoe.png`)} alt="" className="img"/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>
      <section className="product spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="filter__controls">
              {productFilters.map((filter,index) => (
                <li key={index} className={`${index !== filterIndex ? "" : "active" }`}
                onClick={()=> onFilterClick(index,filter)}
                >{filter}</li>
              ))}
              </ul>
            </div>
          </div>
          <div id="MixitUp" className="row product__filters">
          { filteredProducts.length <= 0 ? products.filter(product => product.category === productFilters[filterIndex].toLowerCase()).map((product,index) => (
              <ProductCard key={product.id} product={product} colSize={3} animationDelay={index + 1}></ProductCard>
          )) : filteredProducts.map((product,index) => (
              <ProductCard key={product.id} product={product} colSize={3} animationDelay={index + 1}></ProductCard>
          ))}
          </div>
        </div>
      </section>
      <section className="instagram spad">
				<div className="container">
					<div className="row">
						<div className="col-md-8">
							<div className="instagram__pic">
								{
									instagramImg.map((image,index) => (
                  <div key={index} className="instagram__pic__item">
                    <img src={require(`../assets/img/${image.url}`)} />
                  </div>
									))
								}
							</div>
						</div>
						<div className="col-md-4">
							<div className="instagram__text">
								<h2>Instagram</h2>
								<p>Show the world your looks. If you are looking for inspiration to dress, join our instagram community. Find looks created by people from all over the world.</p>
								<h3>#All_Fashion</h3>
							</div>
						</div>
					</div>
				</div>
      </section>
      <section className="latest spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Latest News</span>
                <h2>Fashion New Trends</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {
              fashionNewTrends.map((trend) => (
                <div key={trend.id} className="col-lg-4 col-md-6 col-sm-6">
                  <div className="blog__item">
                    <div className="blog__item__pic__container">
                      <img src={require(`../assets/img/${trend.img}`)} className="blog__item__pic" />
                    </div>
                    <div className="blog__item__text">
                      <span><FontAwesomeIcon icon={faCalendar} /> {trend.date}</span>
                      <h5>{trend.title}</h5>
                      <Link to='/'>Read more</Link>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </motion.div>
  )
}

export default Main