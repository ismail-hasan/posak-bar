import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router'
import About from './About'
import Firstain from './Firstain'
import ScrollToTop from './Components/ScrollToTop'
import OrderPolicy from './Components/OrderPolicy'
import DeliveryPolicy from './Components/DeliveryPolicy'
import ReturnPolicy from './Components/ReturnPolicy'
import { FaPersonMilitaryPointing } from 'react-icons/fa6'
import FrontLayout from './Layout/HomePage/FrontLayout'
import Homes from './Components/Homes'
import Product from './Components/Product'
import ProductDetailsCard from './Components/ProductDetailsCard'
import CheckOut from './Components/CheckOut'
import LoginPage from './Components/LoginPage'
import RegisterPage from './Components/RegisterPage'
import DashBordLayout from './Layout/HomePage/DashBordLayout'
import AddProduct from './DashBord/AddProduct'
import NotFound from './Components/NotFound'
import AllProduct from './DashBord/AllProduct'
import Order from './DashBord/Order'
import PrivetRouter from './Components/PrivetRouter'
import MyOrder from './Components/MyOder'
import ProductPage from './Components/ProductPage'
import AdminRoute from './DashBord/AdminRoute'
import Adcampaign from './Layout/HomePage/Adcampaign'
import Superdeal from './Layout/HomePage/Superdeal'
import AllDeal from './Layout/HomePage/AllDeal'
import ManufactureOrder from './Layout/HomePage/ManufactureOrder'
import Statistics from './DashBord/Statistics'
import Category from './DashBord/Category'
import AddBanner from './DashBord/AddBanner'

function App() {

  return (
    <>
      <ScrollToTop></ScrollToTop>

      <Routes>
        <Route
          path="/dashboard"
          element={
            <AdminRoute> <DashBordLayout /></AdminRoute>

          }>
          <Route index element={<AllProduct />} />
          <Route path="addproduct" element={<AddProduct />} />
          <Route path="orders" element={<Order></Order>} />
          <Route path="adcampaign" element={<Adcampaign></Adcampaign>} />
          <Route path="superdeal" element={<Superdeal></Superdeal>} />
          <Route path="alldeals" element={<AllDeal></AllDeal>} />
          <Route path="statistics" element={<Statistics></Statistics>} />
          <Route path="category" element={<Category></Category>} />
          <Route path="banner" element={<AddBanner></AddBanner>} />
          <Route path="manufactureorder" element={<ManufactureOrder></ManufactureOrder>} />
        </Route>

        {/* অন্যান্য রাউটসমূহ */}
        <Route path="/" element={<FrontLayout />} />
        <Route path="/store" element={<Firstain />} />
        <Route path="/product" element={<ProductPage></ProductPage>} />
        <Route path="/myoder" element={<PrivetRouter><MyOrder></MyOrder></PrivetRouter>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/checkout" element={<PrivetRouter><CheckOut /></PrivetRouter>} />
        <Route path="/product/:id" element={<ProductDetailsCard />} />
        <Route path="/manufacturer" element={<Homes />} />
        <Route path="/order" element={<About />} />
        <Route path="/order-policy" element={<OrderPolicy />} />
        <Route path="/delivery-policy" element={<DeliveryPolicy />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>


    </>
  )
}

export default App
