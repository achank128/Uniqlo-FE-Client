import React, { useEffect } from 'react';
import './home.scss';
//components
import Slider from '../../components/slider/Slider';
import Notice from '../../components/notice/Notice';
import AppBenefits from '../../components/appbenefits/AppBenefits';

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
