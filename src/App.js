import { Footer, Header } from './components';
import { AboutUs, AdminAddCategory, AdminAddSubCategory, AdminAllCategories, AdminAllSubCategories, AdminDashboard, AdminPostAProduct, AdminSignIn, ContactUs, FAQ, LandingPage, LoginSignup, PrivacyPolicy, Products, TermsAndConditions } from './pages';
import ROUTES from './routes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import SingleProduct from './pages/SingleProduct';
import MyAccount from './pages/MyAccount';

function App() {
  const pathname = window.location.pathname

  return (
    <Router>
      <div>
        {pathname === "/admin-dashboard" ? <></> : <Header />}
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
          <Route exact path={ROUTES.FAQ} element={<FAQ />} />
          <Route exact path={ROUTES.TERMSANDCONDITIONS} element={<TermsAndConditions />} />
          <Route exact path={ROUTES.ADMINDASHBOARD} element={<AdminDashboard />} />
          <Route exact path={ROUTES.ADMINPOSTAPRODUCT} element={<AdminPostAProduct />} />
          <Route exact path={ROUTES.ADMINADDCATEGORY} element={<AdminAddCategory />} />
          <Route exact path={ROUTES.ADMINALLCATEGORIES} element={<AdminAllCategories />} />
          <Route exact path={ROUTES.ADMINADDSUBCATEGORY} element={<AdminAddSubCategory />} />
          <Route exact path={ROUTES.ADMINALLSUBCATEGORIES} element={<AdminAllSubCategories />} />
        </Routes>
        {pathname === "/admin-dashboard" ? <></> : <Footer />}
      </div>
    </Router>
  );
};

export default App;
