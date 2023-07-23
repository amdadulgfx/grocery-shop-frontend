import { Footer, Header } from './components';
import { AboutUs, LandingPage } from './pages';
import ROUTES from './routes';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div /* className="App" */>
      <Header />
      <Router>
        <Routes>
          <Route exact path={ROUTES.LANDINGPAGE} element={<LandingPage />} />
          <Route exact path={ROUTES.ABOUTUS} element={<AboutUs />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
