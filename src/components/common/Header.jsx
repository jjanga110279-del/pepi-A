import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router';
import { ICONS } from '../../constants/icons';
import { Menu, X, LogOut } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useUser } from '../../context/UserContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { totalCount } = useCart();
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  const handleProtectedNavigation = (path, e) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 서비스입니다.');
      navigate('/login', { state: { from: path } });
    } else {
      navigate(path);
    }
  };

  const isDetailPage = ['/about', '/terms', '/guide', '/privacy', '/customer-service', '/best50', '/new-5', '/outer', '/top', '/bottom', '/dress', '/sets', '/accessory', '/sale', '/events', '/search', '/wishlist', '/mypage', '/order-history', '/order-success', '/return-success', '/coupons', '/points', '/settings', '/edit-profile', '/login', '/signup', '/find-password', '/cart', '/checkout', '/address-book'].includes(location.pathname) || location.pathname.startsWith('/product/') || location.pathname.startsWith('/order-detail/') || location.pathname.startsWith('/return-request/') || location.pathname.startsWith('/write-review/');
  
  const categories = [
    { name: '신상 5%', path: '/new-5', mobileName: 'NEW IN 5%' },
    { name: '아우터', path: '/outer', mobileName: 'OUTER' },
    { name: '상의', path: '/top', mobileName: 'TOP' },
    { name: '하의', path: '/bottom', mobileName: 'BOTTOM' },
    { name: '원피스', path: '/dress', mobileName: 'DRESS' },
    { name: '세트', path: '/sets', mobileName: 'SET' },
    { name: '액세서리', path: '/accessory', mobileName: 'ACC' },
    { name: 'SALE', path: '/sale', mobileName: 'SALE' },
    { name: '이벤트/기획전', path: '/events', mobileName: 'EVENT' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Scroll Lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      // iOS Safari handles overflow: hidden differently, sometimes needing extra care
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'auto';
    };
  }, [isMobileMenuOpen]);

  const goToSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/search');
  };

  const MobileMenuOverlay = () => (
    <div className="fixed inset-0 z-[100] bg-white lg:hidden flex flex-col overflow-hidden animate-fadeIn">
      <div className="flex-grow flex flex-col bg-white">
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-black/5 bg-white sticky top-0 z-10">
          <h2 className="text-xl md:text-2xl font-serif font-bold italic text-[#1b1d0e]">늘:pepi-i</h2>
          <button 
            onClick={toggleMobileMenu} 
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={26} className="text-black/80" />
          </button>
        </div>

        <div className="flex-grow overflow-y-auto px-6 py-8 bg-white">
          <nav className="flex flex-col gap-1">
            <Link 
              to="/best50" 
              className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all"
            >
              <span className="text-xl font-bold tracking-widest font-hei text-[#dc2626]">BEST 50</span>
              <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </Link>
            {categories.map((cat) => (
              <Link 
                key={cat.name} 
                to={cat.path} 
                className="group flex items-center justify-between p-4 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <span className="text-lg md:text-xl font-bold tracking-widest font-hei text-black/80 group-hover:text-[#dc2626] transition-colors">{cat.mobileName}</span>
                <div className="w-1.5 h-1.5 bg-[#dc2626] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </nav>
        </div>

        <div className="p-8 bg-[#f9fafb] border-t border-black/5 mt-auto">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[15px] font-bold font-hei text-black/90 tracking-tight">
              {user ? (
                <>
                  <span className="text-[#dc2626]">{user.name}님</span>
                  <span className="text-black/10">|</span>
                  <button onClick={handleLogout} className="text-black/40">로그아웃</button>
                </>
              ) : (
                <>
                  <Link to="/login" className="hover:text-[#dc2626] transition-colors">로그인</Link>
                  <span className="text-black/20 font-normal">/</span>
                  <Link to="/signup" className="hover:text-[#dc2626] transition-colors">회원가입</Link>
                </>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={(e) => handleProtectedNavigation('/mypage', e)}
                className="h-12 flex items-center justify-center bg-white border border-black/5 rounded-xl text-[14px] font-bold font-hei text-black/70 shadow-sm"
              >마이페이지</button>
              <button 
                onClick={() => navigate('/customer-service')}
                className="h-12 flex items-center justify-center bg-white border border-black/5 rounded-xl text-[14px] font-bold font-hei text-black/70 shadow-sm"
              >고객센터</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-black/5 ${isScrolled ? 'py-3 bg-white/95 backdrop-blur-md' : 'py-5 md:py-6 bg-white'}`}>
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between relative h-12 md:h-14">
          {/* Left: Mobile Menu & Home/Back */}
          <div className="flex items-center gap-1 md:gap-6 z-10">
            <button className="lg:hidden p-1.5" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-1 md:gap-4 text-black/80">
               <Link to="/" className="hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center">
                 <ICONS.home className="text-[22px] md:text-[26px]" />
               </Link>
               {isDetailPage && (
                 <button onClick={() => navigate(-1)} className="hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center">
                   <ICONS.backArrow className="text-[18px] md:text-[20px]" />
                 </button>
               )}
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link to="/">
              <h1 className={`font-logo font-black italic transition-all duration-300 tracking-tighter ${isScrolled ? 'text-2xl md:text-3xl opacity-90' : 'text-4xl md:text-5xl'}`}>늘:pepi-i</h1>
            </Link>
          </div>

          {/* Right: Icons & Login */}
          <div className="flex items-center gap-4 md:gap-8 z-10">
            <div className="flex items-center gap-4 md:gap-7 text-black/80">
              <button onClick={goToSearch} className="hover:opacity-70 transition-opacity p-1">
                <ICONS.search className="text-[18px] md:text-[20px]" />
              </button>
              <div className="hidden lg:flex items-center gap-7">
                <button onClick={(e) => handleProtectedNavigation('/wishlist', e)} className="hover:opacity-70 transition-opacity">
                  <ICONS.wishlist className="text-[22px]" />
                </button>
                <button onClick={(e) => handleProtectedNavigation('/mypage', e)} className="hover:opacity-70 transition-opacity">
                  <ICONS.user className="text-[20px]" />
                </button>
              </div>
              <button onClick={(e) => handleProtectedNavigation('/cart', e)} className="relative cursor-pointer hover:opacity-70 transition-opacity flex items-center">
                <ICONS.cart className="text-[22px]" />
                {user && totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] md:text-[11px] font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center border-2 border-white">{totalCount}</span>
                )}
              </button>
            </div>
            
            <div className="w-px h-5 bg-black/10 hidden lg:block mx-3" />
            {user ? (
              <div className="hidden sm:flex items-center gap-4 text-sm md:text-[16px] font-bold font-hei text-black/90 tracking-tight">
                <span className="text-[#dc2626]">{user.name}님</span>
                <button onClick={handleLogout} className="flex items-center gap-1 text-black/40 hover:text-black transition-colors">
                  <LogOut size={16} />
                  <span className="text-[13px]">로그아웃</span>
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2 text-sm md:text-[16px] font-bold font-hei text-black/90 tracking-tight">
                <Link to="/login" className="hover:text-[#dc2626] transition-colors">로그인</Link>
                <span className="text-black/20 font-normal">/</span>
                <Link to="/signup" className="hover:text-[#dc2626] transition-colors">회원가입</Link>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className={`hidden lg:flex justify-center items-center gap-12 transition-all duration-300 ${isScrolled ? 'mt-4 scale-95 origin-center pb-2' : 'mt-8 pb-2'}`}>
          <div className="relative group">
            <Link to="/best50" className={`text-[16px] md:text-[17px] font-bold tracking-widest uppercase font-hei transition-colors ${location.pathname === '/best50' ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>베스트 50</Link>
            {location.pathname === '/best50' && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dc2626] rounded-full" />}
          </div>
          {categories.map((cat) => {
            const isActive = location.pathname === cat.path;
            return (
              <div key={cat.name} className="relative group">
                <Link to={cat.path} className={`text-[16px] md:text-[17px] font-bold tracking-widest uppercase font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{cat.name}</Link>
                {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dc2626] rounded-full" />}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && <MobileMenuOverlay />}
    </header>
  );
}
