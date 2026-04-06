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
  Loader2
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
  const [focusedIndex, setFocusedIndex] = useState(-1);
  
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    zipcode: user.zipcode,
    address: user.address,
    detailAddress: user.detailAddress,
    profileImage: user.profileImage
  });

  const [initialData] = useState({ ...formData });

  // 특정 섹션으로 이동 및 처리 (설정 페이지 연동)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      
      if (id === 'password') {
        setIsChangingPassword(true);
      }

      // 렌더링 후 이동하도록 약간의 지연시간 부여
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    }
  }, [location.hash]);

  // 확장된 리얼 주소 시뮬레이션 데이터
  const allMockAddresses = [
    { zip: '06035', base: '서울특별시 강남구 가로수길 15 (신사동)' },
    { zip: '04524', base: '서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)' },
    { zip: '03154', base: '서울특별시 종로구 사직로 161 (세종로, 경복궁)' },
    { zip: '06164', base: '서울특별시 강남구 영동대로 513 (삼성동, 코엑스)' },
    { zip: '05551', base: '서울특별시 송파구 올림픽로 300 (신천동, 롯데월드타워)' },
    { zip: '48058', base: '부산광역시 해운대구 수영강변대로 120 (우동, 영화의전당)' },
    { zip: '16514', base: '경기도 수원시 영통구 광교중앙로 140 (이의동, 경기도청)' }
  ];

  // 실시간 주소 검색
  useEffect(() => {
    if (addressSearchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allMockAddresses.filter(addr => 
          addr.base.toLowerCase().includes(addressSearchQuery.toLowerCase()) || 
          addr.zip.includes(addressSearchQuery)
        );
        setSearchResults(filtered);
        setIsSearching(false);
        setFocusedIndex(-1);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setFocusedIndex(-1);
    }
  }, [addressSearchQuery]);

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: true },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: false },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFocus = (e, field) => {
    if (e.target.value === initialData[field]) {
      setFormData(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleBlur = (e, field) => {
    if (e.target.value.trim() === '') {
      setFormData(prev => ({ ...prev, [field]: initialData[field] }));
    }
  };

  const selectAddress = (addr) => {
    setFormData(prev => ({
      ...prev,
      zipcode: addr.zip,
      address: addr.base,
      detailAddress: ''
    }));
    setShowAddressSearch(false);
    setAddressSearchQuery('');
    setFocusedIndex(-1);
  };

  const handleKeyDown = (e) => {
    if (!showAddressSearch || searchResults.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < searchResults.length) {
        selectAddress(searchResults[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowAddressSearch(false);
    }
  };

  const handlePasswordSave = () => {
    alert('비밀번호가 성공적으로 변경되었습니다.');
    setIsChangingPassword(false);
  };

  const handlePhoneChange = () => {
    alert(`휴대폰 번호가 ${formData.phone}(으)로 변경되었습니다.`);
  };

  const handleSave = () => {
    updateUser(formData);
    alert('모든 회원 정보가 안전하게 저장되었습니다.');
    navigate('/mypage');
  };

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12 relative">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">my page categories</h2>
          <nav className="flex flex-col gap-6">
            {sideMenu.map((sub, idx) => (
              <Link 
                key={idx} 
                to={sub.path}
                className={`flex items-center gap-4 text-[16px] font-medium transition-colors group text-left ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}
              >
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${sub.active ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon size={20} strokeWidth={sub.active ? 2.5 : 2} />
                </span>
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow max-w-3xl">
          <h1 className="text-[36px] font-bold text-[#000000] font-hei mb-10">회원 정보 수정</h1>

          {/* Profile Image Section */}
          <div className="flex flex-col items-center mb-16 pt-8">
            <div className="relative group cursor-pointer" onClick={handleImageClick}>
              <div className="w-32 h-32 rounded-full overflow-hidden border border-black/5 shadow-inner bg-gray-50">
                <img src={formData.profileImage} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-black/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Camera size={24} className="text-white" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-white border border-black/10 rounded-full flex items-center justify-center shadow-lg hover:bg-gray-200 transition-all">
                <Camera size={18} className="text-black/60" />
              </button>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleImageChange}
              />
            </div>
            <p className="mt-4 text-[13px] text-black/40 font-hei font-bold">프로필 사진 변경</p>
          </div>

          {/* Form Fields */}
          <div className="flex flex-col gap-10">
            {/* Name */}
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">Name</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                onFocus={(e) => handleFocus(e, 'name')}
                onBlur={(e) => handleBlur(e, 'name')}
                className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold focus:outline-none focus:border-black/10 transition-all font-hei"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-3">
              <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <input 
                  type="email" 
                  value={formData.email}
                  disabled
                  className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold text-black/30 font-sans cursor-not-allowed"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[11px] font-bold text-black/20 font-hei">이메일은 변경할 수 없습니다</span>
              </div>
            </div>

            {/* Phone */}
            <div id="phone" className="flex flex-col gap-3 scroll-mt-32">
              <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">Phone Number</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  onFocus={(e) => handleFocus(e, 'phone')}
                  onBlur={(e) => handleBlur(e, 'phone')}
                  className="flex-grow h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold focus:outline-none focus:border-black/10 transition-all font-sans"
                />
                <button 
                  onClick={handlePhoneChange}
                  className="px-6 bg-white border border-black/10 rounded-2xl text-[13px] font-bold text-black hover:bg-gray-200 transition-all font-hei shrink-0"
                >
                  번호 변경
                </button>
              </div>
            </div>

            {/* Password */}
            <div id="password" className="flex flex-col gap-3 scroll-mt-32">
              <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">Password</label>
              {!isChangingPassword ? (
                <button 
                  onClick={() => setIsChangingPassword(true)}
                  className="w-full h-14 px-6 flex items-center justify-between bg-white border border-black/10 rounded-2xl hover:bg-gray-200 transition-all group"
                >
                  <span className="text-[15px] font-bold text-black font-hei">비밀번호 변경하기</span>
                  <ChevronRight size={18} className="text-black/20 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <div className="bg-[#FAFAFA] border border-black/5 rounded-2xl p-6 flex flex-col gap-4 animate-in slide-in-from-top-2 duration-300">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[14px] font-bold text-black font-hei">새 비밀번호 설정</span>
                    <button onClick={() => setIsChangingPassword(false)} className="text-black/20 hover:text-black"><X size={18}/></button>
                  </div>
                  <input type="password" placeholder="현재 비밀번호" className="h-12 px-4 bg-white border border-black/10 rounded-xl text-[14px] focus:outline-none" />
                  <input type="password" placeholder="새 비밀번호" className="h-12 px-4 bg-white border border-black/10 rounded-xl text-[14px] focus:outline-none" />
                  <input type="password" placeholder="새 비밀번호 확인" className="h-12 px-4 bg-white border border-black/10 rounded-xl text-[14px] focus:outline-none" />
                  <button 
                    onClick={handlePasswordSave}
                    className="h-12 bg-white border border-black/10 text-black hover:bg-gray-200 transition-all rounded-xl text-[13px] font-bold mt-2"
                  >
                    비밀번호 저장
                  </button>
                </div>
              )}
            </div>

            {/* Address */}
            <div id="address" className="flex flex-col gap-4 pt-4 relative scroll-mt-32">
              <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">Address</label>
              <div className="flex gap-3">
                <input 
                  type="text" 
                  placeholder="우편번호"
                  value={formData.zipcode}
                  readOnly
                  className="w-32 h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold font-sans"
                />
                <button 
                  onClick={() => {
                    setShowAddressSearch(true);
                    setSearchResults(allMockAddresses.slice(0, 3));
                  }}
                  className="px-6 bg-white border border-black/10 rounded-2xl text-[13px] font-bold text-black hover:bg-gray-200 transition-all font-hei"
                >
                  주소 검색
                </button>
              </div>
              <input 
                type="text" 
                placeholder="기본 주소"
                value={formData.address}
                readOnly
                className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[16px] font-bold font-hei"
              />
              <input 
                type="text" 
                placeholder="상세 주소를 입력하세요"
                value={formData.detailAddress}
                onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                onFocus={(e) => handleFocus(e, 'detailAddress')}
                onBlur={(e) => handleBlur(e, 'detailAddress')}
                className="w-full h-14 px-6 bg-white border border-black/10 rounded-2xl text-[16px] font-medium focus:outline-none focus:border-black/20 transition-all font-hei"
              />

              {/* Real-feel Address Search Modal - NOW APPEARING ABOVE */}
              {showAddressSearch && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-black/10 rounded-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-50 p-6 animate-in slide-in-from-bottom-2 duration-200">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="text-[16px] font-bold text-black font-hei">주소 검색</h4>
                    <button type="button" onClick={() => {
                      setShowAddressSearch(false);
                      setAddressSearchQuery('');
                      setSearchResults([]);
                    }}><X size={20} className="text-black/20 hover:text-black"/></button>
                  </div>
                  <div className="relative mb-6">
                    <input 
                      autoFocus
                      type="text" 
                      value={addressSearchQuery}
                      onChange={(e) => setAddressSearchQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="주소 키워드 입력 (예: 서울, 강남, 춘천...)" 
                      className="w-full h-12 pl-10 pr-4 bg-gray-50 border-none rounded-xl text-[14px] focus:ring-2 focus:ring-[#9C3F00]/20 font-hei" 
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-black/20">
                      {isSearching ? <SearchIcon size={18} className="animate-spin text-[#9C3F00]" /> : <SearchIcon size={18} />}
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {addressSearchQuery.length === 0 ? (
                      <div className="py-10 text-center">
                        <p className="text-[13px] text-black/40 font-hei">찾으시는 도로명 주소 또는 지번을 입력하세요.</p>
                      </div>
                    ) : searchResults.length > 0 ? (
                      <>
                        <p className="text-[11px] font-bold text-black/30 uppercase tracking-wider mb-2 px-2">검색 결과 ({searchResults.length})</p>
                        {searchResults.map((addr, i) => (
                          <button 
                            key={i} 
                            type="button"
                            onClick={() => selectAddress(addr)}
                            onMouseEnter={() => setFocusedIndex(i)}
                            className={`flex flex-col items-start p-4 rounded-2xl transition-all border border-transparent text-left w-full group ${focusedIndex === i ? 'bg-[#9C3F00]/5 border-[#9C3F00]/10' : 'hover:bg-gray-50'}`}
                          >
                            <span className={`text-[14px] font-bold mb-1 transition-colors font-hei ${focusedIndex === i ? 'text-[#9C3F00]' : 'text-black group-hover:text-[#9C3F00]'}`}>{addr.base}</span>
                            <span className={`text-[12px] font-sans ${focusedIndex === i ? 'text-[#9C3F00]/60' : 'text-black/40'}`}>우편번호: {addr.zip}</span>
                          </button>
                        ))}
                      </>
                    ) : !isSearching && (
                      <div className="py-16 text-center flex flex-col items-center gap-4">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center text-black/20">
                          <SearchIcon size={24} />
                        </div>
                        <div className="flex flex-col gap-1">
                          <p className="text-[15px] font-bold text-black/60 font-hei">검색 결과가 없습니다.</p>
                          <p className="text-[12px] text-black/30 font-hei">정확한 주소 또는 키워드로 다시 검색해 주세요.</p>
                        </div>
                        <button 
                          type="button"
                          onClick={() => setAddressSearchQuery('')}
                          className="mt-2 px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-[12px] font-bold text-black/60 transition-all"
                        >
                          검색어 초기화
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-12 pt-12 border-t border-black/5">
              <button 
                onClick={() => navigate('/mypage')}
                className="flex-1 h-16 bg-white border border-black/10 rounded-full text-[16px] font-bold text-black hover:bg-gray-200 transition-all font-hei"
              >
                취소
              </button>
              <button 
                onClick={handleSave}
                className="flex-[2] h-16 bg-white border border-black/10 rounded-full text-[16px] font-bold text-black hover:bg-gray-200 transition-all font-hei shadow-xl shadow-black/5"
              >
                저장하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
