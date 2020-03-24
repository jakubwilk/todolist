import React from 'react';
import Navigation from '../navigation-component/Navigation';
import Home from '../home-component/Home';
import About from '../about-component/About';

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Home />
      <About />
    </>
  );
}

export default HomePage;