import React from 'react';
import MainNav from '../../Components/MainNav';
import MainSmallCategory from '../../Components/MainSmallCategory';
import MainHero from '../../Components/MainHero';
import MainDeals from '../../Components/MainDeals';
import Support from '../../Components/Support';
import Trand from '../../Components/Trand';
import Product from '../../Components/Product';
import NewFooter from '../../Components/NewFooter';
import Explore from '../../Components/Explore';
import Brand from '../../Components/Brand';
import Testimonial from '../../Components/Testimonials';
import NewArrival from '../../Components/NewArrival';
import { Right } from '../../Components/Animation';
import ImagePost from '../../Components/ImagePost';
import Copyright from '../../DashBord/Copyright';

const HomePage = () => {
      return (
            <div>
                  <MainNav></MainNav>
                  <MainSmallCategory></MainSmallCategory>
                  <MainHero></MainHero>
                  <MainDeals></MainDeals>
                  <Support></Support>
                  <div className='mt-5'>
                        <h3 className='text-3xl font-semibold text-center py-8 mt-10'>All Product</h3>
                        <Product limit={8} offset={1}></Product>
                  </div>
                  <Trand></Trand>
                  <Testimonial></Testimonial>
                  <div className='max-w-6xl mx-auto mt-15'>
                        <Right className='text-3xl font-semibold py-5 text-center'>নতুন এসেছে</Right>
                        <Product limit={4}></Product>
                        <Brand></Brand>
                        <Explore></Explore>
                  </div>
                  <NewFooter></NewFooter>
                  <Copyright></Copyright>
            </div >
      );
};

export default HomePage;