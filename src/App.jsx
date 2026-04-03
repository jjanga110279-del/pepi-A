import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router';
import ScrollToTop from './components/common/ScrollToTop';
import Home from './pages/Home';
import About from './pages/About';
import Terms from './pages/Terms';
import Guide from './pages/Guide';
import Privacy from './pages/Privacy';
import CustomerService from './pages/CustomerService';
import Best50 from './pages/Best50';
import NewIn from './pages/NewIn';
import Outer from './pages/Outer';
import Top from './pages/Top';
import Bottom from './pages/Bottom';
import Dress from './pages/Dress';
import Sets from './pages/Sets';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/guide" element={<Guide />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/customer-service" element={<CustomerService />} />
        <Route path="/best50" element={<Best50 />} />
        <Route path="/new-in" element={<NewIn />} />
        <Route path="/outer" element={<Outer />} />
        <Route path="/top" element={<Top />} />
        <Route path="/bottom" element={<Bottom />} />
        <Route path="/dress" element={<Dress />} />
        <Route path="/sets" element={<Sets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
