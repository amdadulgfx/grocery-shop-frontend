import { Footer, Header } from './components';
import { AboutUs, ContactUs, LandingPage } from './pages';
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
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
