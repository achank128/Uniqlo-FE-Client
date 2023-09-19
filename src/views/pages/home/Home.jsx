import React, { useEffect } from 'react';
import './home.scss';
//components
import Slider from './slider/Slider';
import Notice from './notice/Notice';
import AppBenefits from './appbenefits/AppBenefits';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Slider />
      <Notice />
      <AppBenefits />
    </>
  );
};

export default Home;
