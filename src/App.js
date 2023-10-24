import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { AdminRoute, ErrorBoundary, Footer, Header, NotFound, PrivateRoute } from './components';
import { AboutUs, AdminAddCategory, AdminAddSubCategory, AdminAllCategories, AdminAllSubCategories, AdminDashboard, AdminPostAProduct, AdminProductsUpdateDeleteGetList, AdminSignIn, ContactUs, FAQ, LandingPage, LoginSignup, MyAccount, PrivacyPolicy, ProductCartLists, Products, TermsAndConditions } from './pages';
import OrderTracking from "./pages/OrderTracking/OrderTracking.view";
import SingleProduct from './pages/SingleProduct';
import WishLists from "./pages/Users/WishLists/WishLists.view";
import { CheckoutView } from "./pages/checkout/CheckoutView";
import { OrderView } from './pages/order/OrderView';
import WithScrollToTop from "./routes/WithScrollToTop";
import ROUTES from "./routes/index.js";

function App() {
  const pathname = window.location.pathname;

  return (
    <Router>
      <WithScrollToTop>
        {((pathname === "/admin-dashboard") || (pathname === "/admin-dashboard/post-product") || (pathname === "/admin-dashboard/add-category") || (pathname === "/admin-dashboard/categories") || (pathname === "/admin-dashboard/add-subCategory") || (pathname === "/admin-dashboard/SubCategories") || (pathname === "/admin-dashboard/admin-productLists")) ? <></> : <Header />}
        <ErrorBoundary>
          <Routes>
            <Route exact path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
            <Route exact path={ROUTES.ABOUTUS} element={<AboutUs />} />
            <Route exact path={ROUTES.CONTACTUS} element={<ContactUs />} />
            <Route exact path={ROUTES.MYACCOUNT} element={<PrivateRoute><MyAccount /></PrivateRoute>} />
            <Route exact path={ROUTES.LOGIN} element={<LoginSignup />} />
            <Route exact path={ROUTES.SIGNUP} element={<LoginSignup />} />
            <Route exact path={ROUTES.ADMINSIGNIN} element={<AdminSignIn />} />
            <Route exact path={ROUTES.PRODUCTS} element={<Products />} />
            <Route exact path={ROUTES.SINGLEPRODUCT} element={<SingleProduct />} />
            <Route exact path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
            <Route exact path={ROUTES.PRODUCTORDER} element={<PrivateRoute><OrderView /></PrivateRoute>} />
            <Route exact path={ROUTES.CHECKOUT} element={<PrivateRoute><CheckoutView /></PrivateRoute>} />
            <Route exact path={ROUTES.FAQ} element={<FAQ />} />
            <Route exact path={ROUTES.TERMSANDCONDITIONS} element={<TermsAndConditions />} />
            <Route exact path={ROUTES.PRODUCTCARTLIST} element={<PrivateRoute><ProductCartLists /></PrivateRoute>} />
            <Route exact path={ROUTES.ORDERTRACKING} element={<PrivateRoute><OrderTracking /></PrivateRoute>} />
            <Route exact path={ROUTES.WISHLISTS} element={<PrivateRoute><WishLists /></PrivateRoute>} />
            <Route exact path={ROUTES.ADMINDASHBOARD} element={<AdminRoute><AdminDashboard /></AdminRoute>} >
              <Route exact path={ROUTES.ADMINPOSTAPRODUCT} element={<AdminRoute><AdminPostAProduct /></AdminRoute>} />
              <Route exact path={ROUTES.ADMINADDCATEGORY} element={<AdminRoute><AdminAddCategory /></AdminRoute>} />
              <Route exact path={ROUTES.ADMINALLCATEGORIES} element={<AdminRoute><AdminAllCategories /></AdminRoute>} />
              <Route exact path={ROUTES.ADMINADDSUBCATEGORY} element={<AdminRoute><AdminAddSubCategory /></AdminRoute>} />
              <Route exact path={ROUTES.ADMINALLSUBCATEGORIES} element={<AdminRoute><AdminAllSubCategories /></AdminRoute>} />
              <Route exact path={ROUTES.ADMINPRODUCTSUPDATEDELETEGETLIST} element={<AdminRoute><AdminProductsUpdateDeleteGetList /></AdminRoute>} />
              <Route path="*" element={<AdminRoute><Outlet /></AdminRoute>} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        {((pathname === "/admin-dashboard") || (pathname === "/admin-dashboard/post-product") || (pathname === "/admin-dashboard/add-category") || (pathname === "/admin-dashboard/categories") || (pathname === "/admin-dashboard/add-subCategory") || (pathname === "/admin-dashboard/SubCategories") || (pathname === "/admin-dashboard/admin-productLists")) ? <></> : <Footer />}
      </WithScrollToTop>
    </Router>
  );
};

export default App;
