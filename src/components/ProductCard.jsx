import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product, colSize, animationDelay }) {
  const [showProduct,setShowProduct] = useState(false);
  const addToCartRef = useRef();

  useEffect(()=>{
    let isMounted = true;
    setTimeout(()=>{
      if(isMounted) {
        setShowProduct(true);
      }
    },animationDelay * 100);
    return () => { isMounted = false };
  },[]);

  const handleProductHover = () => {
    addToCartRef.current.classList.toggle("hovered");
  }

  return (
    <>
      <div className={`col-lg-${colSize} col-md-${colSize} ${showProduct ? "" : "product_hidden" } product`} key={product.id}>
        <div className="product__item" id={`product_item_${product.id}`}
            onMouseEnter={()=>handleProductHover()}
            onMouseLeave={()=>handleProductHover()}>
          <div className="product__item__pic" style={{
                backgroundImage: `url(${product.image})`
            }}
          ></div>
          <div className="product__item__details">
            <div className="details_bg_image"></div>
            <div className="details_text text-center">
              <Link to={`/product/${product.id}`}>SEE DETAILS</Link>
            </div>
          </div>
          <div className="product__item__text">
          <h6>{product.title}</h6>
          <span className="add-cart" ref={addToCartRef}>+ Add to cart</span>
          <h5>${product.price}</h5>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProductCard;