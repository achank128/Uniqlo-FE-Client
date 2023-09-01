import React from "react";
import "./slider.scss";
import SlideItem from "../slideItem/SlideItem";
import { SlidersData } from "../../../utils/data.js";

const Slider = () => {
  return (
    <div id="slider">
      <div className="warpper">
        {SlidersData.map((slideItem, index) => {
          return (
            <SlideItem key={index} SlideItem={slideItem} sliderIndex={index} />
          );
        })}
      </div>
    </div>
  );
};

export default Slider;
