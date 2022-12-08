import React, {useState, useEffect} from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion/dist/framer-motion';

import { addToCart } from '../features/cart/cartSlice';

import Spinner from '../components/Spinner';

function Product() {
  const [loading,setLoading] = useState(true);
  const [product,setProduct] = useState({});
  const [quantity,setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizesArray,setSizesArray] = useState([
    {
      size: 'S',
      active: false
    },
    {
      size: 'M',
      active: false
    },
    {
      size: 'X',
      active: false
    },
    {
      size: 'XL',
      active: false
    }
  ]);
  const [formErrors, setFormErrors] = useState({});

  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTask = async () => {
      const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
      const data = await res.json();

      if(res.status === 404) {
          navigate('/');
      }

      setProduct(data);
      setLoading(false);
    }
    fetchTask();
  },[])

  const capitalizeFirstLetter = (str) => {
    const capitalized = str.charAt(0).toUpperCase() + str.slice(1);
    return capitalized;
  }

  const setActiveSize = (e,index) => {
    e.preventDefault();
    let sizes = [...sizesArray];
    sizes.map((v,i) => index === i ? v.active = true : v.active = false);
    setSizesArray(sizes);
    setSelectedSize(sizes[index].size);
  }

  const onChange = (e) => {
    setQuantity(e.target.value)
    console.log(e.target.value);
  }

  const handleAddToCart = (e) => {
    e.preventDefault();

    if(validateProduct()) {
      let productToAdd = {
        id: product.id,
        name: product.title,
        price: product.price,
        image: product.image,
        quantity: parseInt(quantity),
        size: selectedSize
      }
      dispatch(addToCart(productToAdd));
    }
  }

  const validateProduct = () => {
    const errors = {}

    if((product.category === "men's clothing" || product.category === "women's clothing") && selectedSize === '' ) {
      errors.size = 'Select a Size'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return false;
    }
    setFormErrors({})
    return true;
  }

  if((loading || product.length <= 0) && location.pathname !== '/login') {
      return(<Spinner />)
  }

  return (
    <motion.div
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      exit={{opacity: 0}}>
      <div className="container" id='productMain'>
        <div className="row">
          <div className="col-md-4 col-lg-5 productCol">
            <div className="productImage">
              <img src={product.image} alt="" />
            </div>
          </div>
          <div className="col-md-8 col-lg-7 productCol right">
            <h2 className="productTitle">
              {product.title}
            </h2>
            <span className='productPrice'>${product.price}</span>
            <p>{capitalizeFirstLetter(product.description)}</p>
            <form onSubmit={handleAddToCart}>
              {
                product.category === "men's clothing" || product.category === "women's clothing" ?
                <div className="productSizes">
                  <h6>Size</h6>
                  <ul className="nav">
                    { sizesArray.map((size,index) => (
                      <li key={index}>
                        <button
                          className={`btn btn-default ${size.active ? "active" : "" }`}
                          onClick={(e) => setActiveSize(e,index)}>
                            {size.size}
                        </button>
                      </li>
                    ))
                    }
                  </ul>
                  <p className="form-error">
                    {formErrors.size}
                  </p>
                </div> : ""
              }
              <div className="input-group mb-3">
                <div className="col-md-1.5 quantityContainer">
                    <select name="quantity" id="quantity" className='form-control' onChange={onChange}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                    </select>
                </div>
                <div className="input-group-append">
                  <button className='btn btn-dark' type='submit'>Add to cart</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default Product;