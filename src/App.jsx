import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import NoPage from "./components/pages/NoPage";
import ProductInfo from "./components/pages/ProductInfo";
import ScrollTop from "./components/ScrollTop";
import CartPage from "./components/pages/CartPage";
import AllProduct from "./components/pages/AllProduct";
// import SignUp from "./components/pages/registration/SignUp"
import PhoneLogin from "./components/pages/registration/PhoneLogin";
import Signup from "./components/pages/registration/SignUp";
import Login from "./components/pages/registration/Login";
import UserDashboard from "./components/pages/user/UserDashboard";
import AdminDashboard from "./components/pages/admin/AdminDashboard";
import AddProductPage from "./components/pages/admin/AddProductPage";
import UpdateProductPage from "./components/pages/admin/UpdateProductPage";
import CategoryPage from "./components/pages/CategoryPage";
import { ProtectedRouteForUser } from "./protectedRoute/ProtectedRouteForUser";
import { ProtectedRouteForAdmin } from "./protectedRoute/ProtectedRouteForAdmin";
import WhatsupNotification from "./components/whatsupNotification";
import ProtectedRoute from "./components/ProtectedRoute";
import ShippingPolicy from "./components/pages/RazorPayPages/ShippingPolicy";
import PrivacyPolicy from "./components/pages/RazorPayPages/PrivacyPolicy";
import TermsAndConditions from "./components/pages/RazorPayPages/TermsAndConditions";
import ContactUs from "./components/pages/RazorPayPages/ContactUs";
import Profile from "./components/pages/Profile"

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';


import MyState from "./context/myState";
import { Toaster } from "react-hot-toast";
import RefundPolicy from "./components/pages/RazorPayPages/RefundPolicy";

const App = () => {
  return (
    <MyState>
      <Router>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/allproduct" element={<AllProduct />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route
            path="/whatsupnotification"
            element={<WhatsupNotification />}
          />
          <Route path="/phone-login" element={<PhoneLogin />} />
          <Route path="/shipping-policy" element={<ShippingPolicy />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="/profile" element={<Profile/>} />
          
          
          <Route
            path="/user-dashboard"
            element={
              <ProtectedRouteForUser>
                <UserDashboard />
              </ProtectedRouteForUser>
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRouteForAdmin>
                <AdminDashboard />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/addproduct"
            element={
              <ProtectedRouteForAdmin>
                <AddProductPage />
              </ProtectedRouteForAdmin>
            }
          />
          <Route
            path="/updateproduct/:id"
            element={
              <ProtectedRouteForAdmin>
                <UpdateProductPage />
              </ProtectedRouteForAdmin>
            }
          />

        </Routes>
        <Toaster />
      </Router>
    </MyState>
  );
};

export default App;
