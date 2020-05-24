import React, { useEffect } from "react";

import Navigation from "../navigation-component/Navigation";
import Home from "../home-component/Home";
import About from "../about-component/About";
import Features from "../features-component/Features";
import Banner from "../banner-component/Banner";
import Opinions from "../opinions-component/Opinions";
import Footer from "../footer-component/Footer";

const HomePage = () => {
    useEffect(() => {
        document.title = "ToDo List - Your new TODO tool";
    }, []);

    return (
        <>
            <Navigation/>
            <Home/>
            <About/>
            <Features/>
            <Banner/>
            <Opinions/>
            <Footer/>
        </>
    );
};

export default HomePage;