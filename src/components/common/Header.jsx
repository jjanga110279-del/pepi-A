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
  const isBest50Page = location.pathname === '/best50';
  const isNewInPage = location.pathname === '/new-5';
  const isOuterPage = location.pathname === '/outer';
  const isTopPage = location.pathname === '/top';
  const isBottomPage = location.pathname === '/bottom';
  const isDressPage = location.pathname === '/dress';
  const isSetsPage = location.pathname === '/sets';
  const isAccessoryPage = location.pathname === '/accessory';
  const isSalePage = location.pathname === '/sale';
  const isEventsPage = location.pathname === '/events';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const goToSearch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate('/search');
  };

  // Detail Page Header
  if (isDetailPage) {
    return (
      <header className={`fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-black/5 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5 md:py-6'}`}>
        <div className="max-w-[1920px] mx-auto px-4 md:px-10">
          <div className="flex items-center justify-between relative h-12 md:h-14">
            {/* Left: Home & Back */}
            <div className="flex items-center gap-4 md:gap-6 z-10">
              <Link to="/" className="hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center">
                <ICONS.home className="text-[22px] md:text-[26px] text-black/80" />
              </Link>
              <button 
                onClick={() => navigate(-1)}
                className="hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center"
              >
                <ICONS.backArrow className="text-[18px] md:text-[20px] text-black/80" />
              </button>
            </div>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              <Link to="/" className={`font-logo font-black italic transition-all duration-300 tracking-tighter ${isScrolled ? 'text-2xl md:text-3xl opacity-90' : 'text-4xl md:text-5xl'}`}>늘:pepi-i</Link>
            </div>

            {/* Right: Icons & Login */}
            <div className="flex items-center gap-4 md:gap-8 z-10">
              <div className="flex items-center gap-4 md:gap-7">
                <button onClick={goToSearch} className="hover:opacity-70 transition-opacity text-black/80 p-1">
                  <ICONS.search className="text-[18px] md:text-[20px]" />
                </button>
                <div className="hidden lg:flex items-center gap-7">
                  <button onClick={(e) => handleProtectedNavigation('/wishlist', e)} className="hover:opacity-70 transition-opacity text-black/80">
                    <ICONS.wishlist className="text-[22px]" />
                  </button>
                  <button onClick={(e) => handleProtectedNavigation('/mypage', e)} className="hover:opacity-70 transition-opacity text-black/80">
                    <ICONS.user className="text-[20px]" title="마이페이지" />
                  </button>
                </div>
                <button onClick={(e) => handleProtectedNavigation('/cart', e)} className="relative cursor-pointer hover:opacity-70 transition-opacity flex items-center">
                  <ICONS.cart className="text-[22px] text-black/80" />
                  {user && totalCount > 0 && (
                    <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white text-[10px] md:text-[11px] font-bold rounded-full w-4 h-4 md:w-5 md:h-5 flex items-center justify-center border-2 border-white">{totalCount}</span>
                  )}
                </button>
              </div>
              
              <div className="w-px h-5 bg-black/10 hidden lg:block mx-3" />
              {user ? (
                <div className="hidden sm:flex items-center gap-4 text-sm md:text-[16px] font-bold font-hei text-black/90 tracking-tight">
                  <span className="text-[#9C3F00]">{user.name}님</span>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 text-black/40 hover:text-black transition-colors"
                  >
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
              
              <button className="lg:hidden p-1.5 ml-1" onClick={toggleMobileMenu}>
                <Menu size={26} />
              </button>
            </div>
          </div>

          {/* Desktop Navigation */}
          {(isBest50Page || isNewInPage || isOuterPage || isTopPage || isBottomPage || isDressPage || isSetsPage || isAccessoryPage || isSalePage || isEventsPage) && (
            <nav className={`hidden lg:flex justify-center items-center gap-14 mt-10 pb-6 transition-all duration-300 ${isScrolled ? 'scale-95' : ''}`}>
              <div className="relative group">
                <Link to="/best50" className={`text-[17px] md:text-[18px] font-bold tracking-[2px] uppercase font-hei transition-colors ${isBest50Page ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>베스트 50</Link>
                {isBest50Page && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dc2626] rounded-full" />}
              </div>
              {['신상 5%', '아우터', '상의', '하의', '원피스', '세트', '액세서리', 'SALE', '이벤트/기획전'].map((item) => {
                const isNewIn = item === '신상 5%';
                const isOuter = item === '아우터';
                const isTop = item === '상의';
                const isBottom = item === '하의';
                const isDress = item === '원피스';
                const isSets = item === '세트';
                const isAcc = item === '액세서리';
                const isSale = item === 'SALE';
                const isEvents = item === '이벤트/기획전';
                const isActive = (isNewIn && isNewInPage) || (isOuter && isOuterPage) || (isTop && isTopPage) || (isBottom && isBottomPage) || (isDress && isDressPage) || (isSets && isSetsPage) || (isAcc && isAccessoryPage) || (isSale && isSalePage) || (isEvents && isEventsPage);
                
                return (
                  <div key={item} className="relative group">
                    {isNewIn ? (
                      <Link to="/new-5" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isOuter ? (
                      <Link to="/outer" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isTop ? (
                      <Link to="/top" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isBottom ? (
                      <Link to="/bottom" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isDress ? (
                      <Link to="/dress" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isSets ? (
                      <Link to="/sets" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isAcc ? (
                      <Link to="/accessory" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isSale ? (
                      <Link to="/sale" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : isEvents ? (
                      <Link to="/events" className={`text-[17px] md:text-[18px] font-bold tracking-[1.5px] font-hei transition-colors ${isActive ? 'text-[#dc2626]' : 'text-black/80 hover:text-[#dc2626]'}`}>{item}</Link>
                    ) : (
                      <a href="#" className="text-[17px] md:text-[18px] font-bold text-black/80 hover:text-[#dc2626] tracking-[1.5px] font-hei transition-colors">{item}</a>
                    )}
                    {isActive && <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#dc2626] rounded-full" />}
                  </div>
                );
              })}
            </nav>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-white lg:hidden animate-fadeIn flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-center mb-12">
                <h2 className="text-xl font-serif font-bold italic">늘:pepi-i</h2>
                <button onClick={toggleMobileMenu}><X size={24} /></button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link to="/best50" className="text-lg font-bold tracking-widest font-hei text-[#7c2d12] hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>BEST 50</Link>
                {['NEW IN 5%', 'OUTER', 'TOP', 'BOTTOM', 'DRESS', 'SET', 'ACC', 'SALE', 'EVENT'].map((item) => {
                  const isNewIn = item === 'NEW IN 5%';
                  const isOuter = item === 'OUTER';
                  const isTop = item === 'TOP';
                  const isBottom = item === 'BOTTOM';
                  const isDress = item === 'DRESS';
                  const isSets = item === 'SET';
                  const isAcc = item === 'ACC';
                  const isSale = item === 'SALE';
                  const isEvents = item === 'EVENT';
                  return isNewIn ? (
                    <Link key={item} to="/new-5" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isOuter ? (
                    <Link key={item} to="/outer" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isTop ? (
                    <Link key={item} to="/top" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isBottom ? (
                    <Link key={item} to="/bottom" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isDress ? (
                    <Link key={item} to="/dress" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isSets ? (
                    <Link key={item} to="/sets" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isAcc ? (
                    <Link key={item} to="/accessory" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isSale ? (
                    <Link key={item} to="/sale" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : isEvents ? (
                    <Link key={item} to="/events" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                  ) : (
                    <a key={item} href="#" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</a>
                  );
                })}
              </nav>
            </div>
            <div className="p-6 pt-12 border-t border-black/5 flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-2 text-sm font-hei text-left tracking-tight">
                <Link to="/login" className="hover:text-[#dc2626] transition-colors">로그인</Link>
                <span className="text-black/20">/</span>
                <Link to="/signup" className="hover:text-[#dc2626] transition-colors">회원가입</Link>
              </div>
              <button className="text-sm font-hei text-left hover:text-[#dc2626] transition-colors">마이페이지</button>
              <button className="text-sm font-hei text-left hover:text-[#dc2626] transition-colors">고객센터</button>
            </div>
          </div>
        )}
      </header>
    );
  }

  // Home Page Header
  return (
    <header className={`fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/5 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5 md:py-6'}`}>
      <div className="max-w-[1920px] mx-auto px-4 md:px-10">
        <div className="flex items-center justify-between relative h-12 md:h-14">
          {/* Left: Mobile Menu & Home */}
          <div className="flex items-center gap-1 md:gap-6 z-10">
            <button className="lg:hidden p-1.5" onClick={toggleMobileMenu}>
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-1 md:gap-6 text-black/80">
               <Link to="/" className="hover:opacity-60 transition-opacity p-1.5 flex items-center justify-center">
                 <ICONS.home className="text-[22px] md:text-[26px]" />
               </Link>
            </div>
          </div>

          {/* Center: Logo */}
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <Link to="/">
              <h1 className={`font-serif font-bold italic transition-all duration-300 tracking-tighter ${isScrolled ? 'text-2xl md:text-3xl opacity-90' : 'text-4xl md:text-5xl'}`}>늘:pepi-i</h1>
            </Link>
          </div>

          {/* Right: User Actions */}
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
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-black/40 hover:text-black transition-colors"
                >
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
          <Link to="/best50" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">베스트 50</Link>
          {['신상 5%', '아우터', '상의', '하의', '원피스', '세트', '액세서리', 'SALE', '이벤트/기획전'].map((item) => {
            const isNewIn = item === '신상 5%';
            const isOuter = item === '아우터';
            const isTop = item === '상의';
            const isBottom = item === '하의';
            const isDress = item === '원피스';
            const isSets = item === '세트';
            const isAcc = item === '액세서리';
            const isSale = item === 'SALE';
            const isEvents = item === '이벤트/기획전';
            return isNewIn ? (
              <Link key={item} to="/new-5" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isOuter ? (
              <Link key={item} to="/outer" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isTop ? (
              <Link key={item} to="/top" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isBottom ? (
              <Link key={item} to="/bottom" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isDress ? (
              <Link key={item} to="/dress" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isSets ? (
              <Link key={item} to="/sets" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isAcc ? (
              <Link key={item} to="/accessory" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isSale ? (
              <Link key={item} to="/sale" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : isEvents ? (
              <Link key={item} to="/events" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</Link>
            ) : (
              <a key={item} href="#" className="text-[16px] md:text-[17px] font-bold text-black/80 hover:text-[#dc2626] tracking-widest uppercase font-hei transition-colors">{item}</a>
            );
          })}
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white lg:hidden animate-fadeIn flex flex-col">
          <div className="p-6 flex-grow">
            <div className="flex justify-between items-center mb-12">
              <h2 className="text-xl font-serif font-bold italic">늘:pepi-i</h2>
              <button onClick={toggleMobileMenu}><X size={24} /></button>
            </div>
            <nav className="flex flex-col gap-6">
              <Link to="/best50" className="text-lg font-bold tracking-widest font-hei text-[#7c2d12] hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>BEST 50</Link>
              {['NEW IN 5%', 'OUTER', 'TOP', 'BOTTOM', 'DRESS', 'SET', 'ACC', 'SALE', 'EVENT'].map((item) => {
                const isNewIn = item === 'NEW IN 5%';
                const isOuter = item === 'OUTER';
                const isTop = item === 'TOP';
                const isBottom = item === 'BOTTOM';
                const isDress = item === 'DRESS';
                const isSets = item === 'SET';
                const isAcc = item === 'ACC';
                const isSale = item === 'SALE';
                const isEvents = item === 'EVENT';
                return isNewIn ? (
                  <Link key={item} to="/new-5" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isOuter ? (
                  <Link key={item} to="/outer" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isTop ? (
                  <Link key={item} to="/top" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isBottom ? (
                  <Link key={item} to="/bottom" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isDress ? (
                  <Link key={item} to="/dress" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isSets ? (
                  <Link key={item} to="/sets" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isAcc ? (
                  <Link key={item} to="/accessory" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isSale ? (
                  <Link key={item} to="/sale" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : isEvents ? (
                  <Link key={item} to="/events" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</Link>
                ) : (
                  <a key={item} href="#" className="text-lg font-bold tracking-widest font-hei text-black/80 hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>{item}</a>
                );
              })}
            </nav>
          </div>
          <div className="p-6 pt-12 border-t border-black/5 flex flex-col gap-4 mt-auto">
            <div className="flex items-center gap-2 text-sm font-hei text-left tracking-tight">
              <Link to="/login" className="hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>로그인</Link>
              <span className="text-black/20">/</span>
              <Link to="/signup" className="hover:text-[#dc2626] transition-colors" onClick={toggleMobileMenu}>회원가입</Link>
            </div>
            <button className="text-sm font-hei text-left hover:text-[#dc2626] transition-colors">마이페이지</button>
            <button className="text-sm font-hei text-left hover:text-[#dc2626] transition-colors">고객센터</button>
          </div>
        </div>
      )}
    </header>
  );
}
