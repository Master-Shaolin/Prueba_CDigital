import React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { sliderItems } from "../data/sliderItems";

const Slider = ({ autoPlay }) => {
  const [slideIndex,setSlideIndex] = useState(0);
  const [transformAmount,setTransformAmount] = useState(0);
  const [loop,setLoop] = useState(-1);
  const [isSliding,setIsSliding] = useState(false);

  const slide = (direction) => {
    const maxIndex = sliderItems.length - 1;
    if (direction === "left") {
      setTransformAmount(100);
    } else if (direction === "right") {
      setTransformAmount(-100);
    }
    setTimeout(() => {
      setSlideIndex(slideIndex => slideIndex > 0 ? slideIndex - 1 : maxIndex);
      setTransformAmount(0);
      setIsSliding(false);
    }, 800);
  };

  const handleClick = (direction) => {
    if(!isSliding) {
      setIsSliding(true);
      clearInterval(loop);
      slide(direction);
    }
  }

  useEffect(() => {
    if (autoPlay) {
      setLoop(setInterval(() => {
        setIsSliding(true);
        slide("right");
      }, 3000));
      return () => clearInterval(loop);
    }
  },[]);

  return (
    <div id="slider">
      <div
        className="arrowContainer"
        id="arrowLeft"
        onClick={() => handleClick("left")}
      >
        <a href="!#" onClick={(e) => e.preventDefault()}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </a>
      </div>
      <div className="wrapper">
        {sliderItems.map((item, index) => (
          <div
            key={item.id}
            className={`slide ${index !== slideIndex ? "" : "active"}`}
            style={{
              transform: `translateX(${transformAmount}vw)`,
            }}
          >
            <div className="imgContainer">
              <img
                src={require(`./../assets/img/${item.src}`)}
                alt=""
                className="img"
              />
            </div>
            <div className="infoContainer">
              <h1 className="title">{item.title}</h1>
              <p className="desc">{item.desc}</p>
              <button className="btn btn-default slide_btnInfo">
                SHOP NOW
              </button>
            </div>
          </div>
        ))}
      </div>
      <div
        className="arrowContainer"
        id="arrowRight"
        onClick={() => handleClick("right")}
      >
        <a href="!#" onClick={(e) => e.preventDefault()}>
          <FontAwesomeIcon icon={faArrowRight} />
        </a>
      </div>
    </div>
  );
};

Slider.defaultProps = {
  autoPlay: false,
};

Slider.propTypes = {
  autoPlay: PropTypes.bool,
};

export default Slider;
