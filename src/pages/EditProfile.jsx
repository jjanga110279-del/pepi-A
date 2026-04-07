import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Ticket, 
  Coins, 
  Settings, 
  Headphones,
  Lock,
  Smartphone,
  ChevronRight,
  Camera,
  X,
  Search as SearchIcon,
  Loader2,
  MapPin,
  ClipboardList
} from 'lucide-react';

export default function EditProfile() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, updateUser } = useUser();
  const fileInputRef = useRef(null);
  
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    zipcode: user?.zipcode || '',
    address: user?.address || '',
    detailAddress: user?.detailAddress || '',
    profileImage: user?.profileImage || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop"
  });

  const [initialData] = useState({ ...formData });

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '') || location.state?.scrollTo;
    if (hash) {
      if (hash === 'password') setIsChangingPassword(true);
      
      const doScroll = () => {
        const element = document.getElementById(hash);
        if (element) {
          const yOffset = -120;
          const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      };
      setTimeout(doScroll, 100);
      setTimeout(doScroll, 500);
    }
  }, [location]);

  const allMockAddresses = [
    { zip: '06035', base: '서울특별시 강남구 가로수길 15 (신사동)' },
    { zip: '04524', base: '서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)' },
    { zip: '03154', base: '서울특별시 종로구 사직로 161 (세종로, 경복궁)' },
    { zip: '06164', base: '서울특별시 강남구 영동대로 513 (삼성동, 코엑스)' },
    { zip: '05551', base: '서울특별시 송파구 올림픽로 300 (신천동, 롯데월드타워)' }
  ];

  useEffect(() => {
    if (addressSearchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allMockAddresses.filter(addr => 
          addr.base.includes(addressSearchQuery) || addr.zip.includes(addressSearchQuery)
        );
        setSearchResults(filtered);
        setIsSearching(false);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
    }
  }, [addressSearchQuery]);

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: true },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, profileImage: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const selectAddress = (addr) => {
    setFormData(prev => ({ ...prev, zipcode: addr.zip, address: addr.base, detailAddress: '' }));
    setShowAddressSearch(false);
    setAddressSearchQuery('');
  };

  const handleSave = () => {
    updateUser(formData);
    alert('저장되었습니다.');
    navigate('/mypage');
  };

  if (!user) return null;

  return (
    <Layout>
      <div id="profile" className="max-w-[1280px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12 relative">
        <aside className="w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">my page categories</h2>
          <nav className="flex flex-col gap-6">
            {sideMenu.map((sub, idx) => (
              <Link key={idx} to={sub.path} className={`flex items-center gap-4 text-[16px] font-medium transition-colors group ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}>
                <sub.icon size={20} />
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        <div className="flex-grow max-w-2xl mx-auto md:mx-0 w-full">
          {/* Mobile Navigation */}
          <div className="md:hidden overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
            <div className="flex gap-2 pb-2">
              {sideMenu.map((sub, idx) => (
                <Link key={idx} to={sub.path} className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all ${sub.active ? 'bg-[#1b1d0e] text-white shadow-md' : 'bg-gray-100 text-black/40'}`}><sub.icon size={14} />{sub.name}</Link>
              ))}
            </div>
          </div>

          <div id="account-info" className="flex flex-col gap-2 mb-12">
            <h1 className="text-[28px] md:text-[36px] font-bold text-black font-hei">회원 정보 수정</h1>
            <p className="text-[14px] text-black/40 font-hei">회원님의 정보를 안전하게 관리합니다.</p>
          </div>

          <div className="flex flex-col items-center mb-16 pt-4">
            <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
              <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border border-black/5 shadow-inner bg-gray-50">
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={24} className="text-white" />
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
            </div>
            <p className="mt-4 text-[13px] text-black/40 font-hei font-bold">프로필 사진 변경</p>
          </div>

          <div className="flex flex-col gap-8 md:gap-10">
            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Name</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold focus:outline-none" />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Email</label>
              <input type="email" value={formData.email} disabled className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold text-black/20 cursor-not-allowed" />
            </div>

            <div id="phone" className="flex flex-col gap-3 scroll-mt-32">
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Phone Number</label>
              <div className="flex gap-3">
                <input type="text" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="flex-grow h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold focus:outline-none" />
                <button onClick={() => alert('번호가 변경되었습니다.')} className="px-6 bg-white border border-black/10 rounded-2xl text-[13px] font-bold text-black">변경</button>
              </div>
            </div>

            <div id="password" className="flex flex-col gap-3 scroll-mt-32">
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Password</label>
              {!isChangingPassword ? (
                <button onClick={() => setIsChangingPassword(true)} className="w-full h-14 px-6 flex items-center justify-between bg-white border border-black/10 rounded-2xl hover:bg-gray-200 transition-all">
                  <span className="text-[15px] font-bold text-black">비밀번호 변경하기</span>
                  <ChevronRight size={18} className="text-black/20" />
                </button>
              ) : (
                <div className="bg-[#FAFAFA] border border-black/5 rounded-2xl p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-center"><span className="text-[14px] font-bold text-black">새 비밀번호 설정</span><button onClick={() => setIsChangingPassword(false)}><X size={18}/></button></div>
                  <input type="password" placeholder="현재 비밀번호" className="h-12 px-4 bg-white border border-black/10 rounded-xl" />
                  <input type="password" placeholder="새 비밀번호" className="h-12 px-4 bg-white border border-black/10 rounded-xl" />
                  <button onClick={() => setIsChangingPassword(false)} className="h-12 bg-black text-white rounded-xl text-[13px] font-bold">비밀번호 저장</button>
                </div>
              )}
            </div>

            <div id="address" className="flex flex-col gap-4 pt-4 relative scroll-mt-32">
              <label className="text-[11px] font-bold text-black/40 uppercase tracking-widest ml-1">Address</label>
              <div className="flex gap-3">
                <input type="text" placeholder="우편번호" value={formData.zipcode} readOnly className="w-32 h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold" />
                <button onClick={() => setShowAddressSearch(true)} className="px-6 bg-white border border-black/10 rounded-2xl text-[13px] font-bold text-black">주소 검색</button>
              </div>
              <input type="text" placeholder="기본 주소" value={formData.address} readOnly className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold" />
              <input type="text" placeholder="상세 주소" value={formData.detailAddress} onChange={(e) => setFormData({...formData, detailAddress: e.target.value})} className="w-full h-14 px-6 bg-white border border-black/10 rounded-2xl text-[16px] font-medium focus:outline-none" />

              {showAddressSearch && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-black/10 rounded-3xl shadow-2xl z-50 p-6">
                  <div className="flex justify-between items-center mb-6"><h4 className="font-bold">주소 검색</h4><button onClick={() => setShowAddressSearch(false)}><X size={20}/></button></div>
                  <input type="text" value={addressSearchQuery} onChange={(e) => setAddressSearchQuery(e.target.value)} placeholder="주소 입력..." className="w-full h-12 px-4 bg-gray-50 rounded-xl mb-4" />
                  <div className="max-h-[200px] overflow-y-auto">
                    {searchResults.map((addr, i) => (
                      <button key={i} onClick={() => selectAddress(addr)} className="w-full text-left p-3 hover:bg-gray-50 border-b border-black/5">
                        <div className="font-bold text-sm">{addr.base}</div>
                        <div className="text-xs text-black/40">{addr.zip}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4 mt-8 pt-8 border-t border-black/5">
              <button onClick={() => navigate('/mypage')} className="flex-1 h-14 bg-white border border-black/10 rounded-full font-bold">취소</button>
              <button onClick={handleSave} className="flex-[2] h-14 bg-black text-white rounded-full font-bold">저장하기</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
