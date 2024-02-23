import { Route, Routes } from "react-router-dom";
import "./App.css";
import Homepage from "./Pages/Homepage";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Policy from "./Pages/Policy";
import PageNotFound from "./Pages/PageNotFound";
import Register from "./Pages/authPages/Register";
import Login from "./Pages/authPages/Login";
import Orders from "./Components/userpages/Orders";
import ForgotPass from "./Pages/ForgotPass";

import UserPrivateRoute from "./Components/Private/UserPrivateRoute";
import AdminPrivateRoute from "./Components/Private/AdminPrivateRoute";
import UserDashboard from "./Components/userpages/UserDashboard";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import CreateCategory from "./Components/Admin/CreateCategory";
import CreateProduct from "./Components/Admin/CreateProduct";

import Products from "./Components/Admin/Products";
import UpdateProduct from "./Components/Admin/UpdateProduct";
import Searched from "./Components/Searched";
import ProductDetails from "./Components/ProductDetails";
import CategoryPage from "./Components/CategoryPage";
import CartPage from "./Pages/Cartpage";
import Profile from "./Components/Profile";
import AdminOrders from "./Components/Admin/AdminOrders";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />

        <Route path="/dashboard" element={<UserPrivateRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/cart" element={<CartPage />} />
        </Route>

        <Route path="/dashboard" element={<AdminPrivateRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />

          <Route
            path="admin/update-product/:slug"
            element={<UpdateProduct />}
          />
          <Route path="admin/products" element={<Products />} />

          <Route path="admin" element={<AdminDashboard />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Searched />} />
        <Route path="/product/:slug" element={<ProductDetails />} />
        <Route path="/category/:slug" element={<CategoryPage />} />

        <Route path="/about" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/forget-pass" element={<ForgotPass />} />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
}

export default App;
