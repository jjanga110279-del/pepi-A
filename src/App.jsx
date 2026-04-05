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
import New5Percent from './pages/New5';
import Outer from './pages/Outer';
import Top from './pages/Top';
import Bottom from './pages/Bottom';
import Dress from './pages/Dress';
import Sets from './pages/Sets';
import Accessory from './pages/Accessory';
import Sale from './pages/Sale';
import Events from './pages/Events';
import ProductDetail from './pages/ProductDetail';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import MyPage from './pages/MyPage';
import OrderHistory from './pages/OrderHistory';
import Coupons from './pages/Coupons';
import Points from './pages/Points';
import Settings from './pages/Settings';
import EditProfile from './pages/EditProfile';
import Signup from './pages/Signup';
import Login from './pages/Login';
import FindPassword from './pages/FindPassword';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
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
          <Route path="/new-5" element={<New5Percent />} />
          <Route path="/outer" element={<Outer />} />
          <Route path="/top" element={<Top />} />
          <Route path="/bottom" element={<Bottom />} />
          <Route path="/dress" element={<Dress />} />
          <Route path="/sets" element={<Sets />} />
          <Route path="/accessory" element={<Accessory />} />
          <Route path="/sale" element={<Sale />} />
          <Route path="/events" element={<Events />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/search" element={<Search />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/coupons" element={<Coupons />} />
          <Route path="/points" element={<Points />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/find-password" element={<FindPassword />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
