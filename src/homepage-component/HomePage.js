import React from "react";

import Navigation from "../navigation-component/Navigation";
import Home from "../home-component/Home";
import About from "../about-component/About";
import Features from "../features-component/Features";
import Footer from "../footer-component/Footer";

const HomePage = () => {
  return (
    <>
      <Navigation />
      <Home />
      <About />
      <Features />
      <Footer />
    </>
  );
};

export default HomePage;