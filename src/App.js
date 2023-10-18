import { Outlet, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import './App.css';
import { ErrorBoundary, Footer, Header, NotFound } from './components';
import { AboutUs, AdminAddCategory, AdminAddSubCategory, AdminAllCategories, AdminAllSubCategories, AdminDashboard, AdminPostAProduct, AdminProductsUpdateDeleteGetList, AdminSignIn, ContactUs, FAQ, LandingPage, LoginSignup, MyAccount, PrivacyPolicy, ProductCartLists, Products, TermsAndConditions } from './pages';
import SingleProduct from './pages/SingleProduct';
import WishLists from "./pages/Users/WishLists/WishLists.view";
import { CheckoutView } from "./pages/checkout/CheckoutView";
import { OrderView } from './pages/order/OrderView';
import ROUTES from "./routes/index.js";

function App() {
  const pathname = window.location.pathname;

  return (
    <Router>
      <div>
        {((pathname === "/admin-dashboard") || (pathname === "/admin-dashboard/post-product") || (pathname === "/admin-dashboard/add-category") || (pathname === "/admin-dashboard/categories") || (pathname === "/admin-dashboard/add-subCategory") || (pathname === "/admin-dashboard/SubCategories") || (pathname === "/admin-dashboard/admin-productLists")) ? <></> : <Header />}
        <ErrorBoundary>
          <Routes>
            <Route exact path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
            <Route exact path={ROUTES.ABOUTUS} element={<AboutUs />} />
            <Route exact path={ROUTES.CONTACTUS} element={<ContactUs />} />
            <Route exact path={ROUTES.MYACCOUNT} element={<MyAccount />} />
            <Route exact path={ROUTES.LOGIN} element={<LoginSignup />} />
            <Route exact path={ROUTES.SIGNUP} element={<LoginSignup />} />
            <Route exact path={ROUTES.ADMINSIGNIN} element={<AdminSignIn />} />
            <Route exact path={ROUTES.PRODUCTS} element={<Products />} />
            <Route exact path={ROUTES.SINGLEPRODUCT} element={<SingleProduct />} />
            <Route exact path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
            <Route exact path={ROUTES.PRODUCTORDER} element={<OrderView />} />
            <Route exact path={ROUTES.CHECKOUT} element={<CheckoutView />} />
            <Route exact path={ROUTES.FAQ} element={<FAQ />} />
            <Route exact path={ROUTES.TERMSANDCONDITIONS} element={<TermsAndConditions />} />
            <Route exact path={ROUTES.PRODUCTCARTLIST} element={<ProductCartLists />} />
            <Route exact path={ROUTES.WISHLISTS} element={<WishLists />} />
            <Route exact path={ROUTES.ADMINDASHBOARD} element={<AdminDashboard />} >
              <Route exact path={ROUTES.ADMINPOSTAPRODUCT} element={<AdminPostAProduct />} />
              <Route exact path={ROUTES.ADMINADDCATEGORY} element={<AdminAddCategory />} />
              <Route exact path={ROUTES.ADMINALLCATEGORIES} element={<AdminAllCategories />} />
              <Route exact path={ROUTES.ADMINADDSUBCATEGORY} element={<AdminAddSubCategory />} />
              <Route exact path={ROUTES.ADMINALLSUBCATEGORIES} element={<AdminAllSubCategories />} />
              <Route exact path={ROUTES.ADMINPRODUCTSUPDATEDELETEGETLIST} element={<AdminProductsUpdateDeleteGetList />} />
              <Route path="*" element={<Outlet />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
        {((pathname === "/admin-dashboard") || (pathname === "/admin-dashboard/post-product") || (pathname === "/admin-dashboard/add-category") || (pathname === "/admin-dashboard/categories") || (pathname === "/admin-dashboard/add-subCategory") || (pathname === "/admin-dashboard/SubCategories") || (pathname === "/admin-dashboard/admin-productLists")) ? <></> : <Footer />}
      </div>
    </Router>
  );
};

export default App;
