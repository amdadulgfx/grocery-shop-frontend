import { Footer, Header } from './components';
import { AboutUs, AdminPostAProduct, AdminSignIn, ContactUs, FAQ, LandingPage, LoginSignup, PrivacyPolicy, Products, TermsAndConditions } from './pages';
import ROUTES from './routes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route exact path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
          <Route exact path={ROUTES.ABOUTUS} element={<AboutUs />} />
          <Route exact path={ROUTES.CONTACTUS} element={<ContactUs />} />
          <Route exact path={ROUTES.LOGIN} element={<LoginSignup />} />
          <Route exact path={ROUTES.SIGNUP} element={<LoginSignup />} />
          <Route exact path={ROUTES.ADMINSIGNIN} element={<AdminSignIn />} />
          <Route exact path={ROUTES.PRODUCTS} element={<Products />} />
          <Route exact path={ROUTES.PRIVACYPOLICY} element={<PrivacyPolicy />} />
          <Route exact path={ROUTES.FAQ} element={<FAQ />} />
          <Route exact path={ROUTES.TERMSANDCONDITIONS} element={<TermsAndConditions />} />
          <Route exact path={ROUTES.ADMINPOSTAPRODUCT} element={<AdminPostAProduct />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
