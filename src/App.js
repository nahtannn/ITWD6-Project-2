//Imports
import './App.css';
import Header from './components/include/Header';
import Footer from './components/include/Footer';
import Home from './components/Home';
import AdvancedJS from './components/AdvancedJS';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FAQ from './components/FAQ';
import Bookings from './components/Bookings';

//UI Render
function App() {
  return (
    <>
      <BrowserRouter>
        <div style={{overflowX:'hidden'}}>
          {/* Insert Header Component */}
          <Header />
          {/* Insert Home Component */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/advanced-js" element={<AdvancedJS />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/bookings" element={<Bookings />} />
          </Routes>
          {/* Insert Footer Component */}
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
