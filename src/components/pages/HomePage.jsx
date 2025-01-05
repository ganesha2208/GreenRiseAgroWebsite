import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Category from "../Category";
import HeroSection from "../HeroSection";
import HomePageProductCard from "../HomePageProductCard";

import Testimonial from "../Testimonial";
import Track from "../Track";
import SearchBar from "../SearchBar";

import myContext from "../../context/myContext";
import Contact from "../../components/pages/RazorPayPages/ContactUs";

import logo from '../../assets/logo.webp';
import WhatsupNotification from "../whatsupNotification";
import Footer from "../Footer";
import Product_Videos from "../../components/Product_Videos"
import Layout from "../Layout";
import Profile from "./Profile";

const HomePage = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);

    const logout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            localStorage.clear('users');
            navigate("/login");
        }
    }

    
    return (
        <>        
        <Layout>
            <HeroSection/>
            <Category/>
            <HomePageProductCard/>
            <Product_Videos/>
            <Testimonial/>
            <WhatsupNotification/>
            <Profile/>
            <Contact/>
            </Layout>
            
            </>
     
        
    );
}

export default HomePage;