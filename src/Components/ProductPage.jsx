import React from 'react';
import MainNav from './MainNav';
import NewFooter from './NewFooter';
import Product from './Product';

const ProductPage = () => {
      return (
            <div>
                  <MainNav></MainNav>
                  <div className='mt-14'>
                        <h3 className='text-center text-3xl mb-8'>All Proudcts</h3>
                        <Product></Product>
                  </div>
                  <NewFooter></NewFooter>
            </div>
      );
};

export default ProductPage;