import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import signupEditorial from '../assets/images/signup_editorial.png';
import { Mail, Lock, User, Smartphone, Eye, EyeOff, Check, MapPin, X, Search as SearchIcon, Loader2 } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    zipcode: '',
    address: '',
    detailAddress: '',
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false
  });

  const allMockAddresses = [
    { zip: '06035', base: '서울특별시 강남구 가로수길 15 (신사동)' },
    { zip: '04524', base: '서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)' },
    { zip: '03154', base: '서울특별시 종로구 사직로 161 (세종로, 경복궁)' },
    { zip: '06164', base: '서울특별시 강남구 영동대로 513 (삼성동, 코엑스)' },
    { zip: '05551', base: '서울특별시 송파구 올림픽로 300 (신천동, 롯데월드타워)' },
    { zip: '48058', base: '부산광역시 해운대구 수영강변대로 120 (우동, 영화의전당)' },
    { zip: '16514', base: '경기도 수원시 영통구 광교중앙로 140 (이의동, 경기도청)' }
  ];

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

  const handleCheckboxChange = (name) => {
    if (name === 'agreeAll') {
      const newValue = !formData.agreeAll;
      setFormData({
        ...formData,
        agreeAll: newValue,
        agreeTerms: newValue,
        agreePrivacy: newValue,
        agreeMarketing: newValue
      });
    } else {
      const updatedData = { ...formData, [name]: !formData[name] };
      const allChecked = updatedData.agreeTerms && updatedData.agreePrivacy && updatedData.agreeMarketing;
      setFormData({ ...updatedData, agreeAll: allChecked });
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

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email);
    alert('환영합니다, 짱아님! 회원가입과 로그인이 완료되었습니다.');
    navigate('/');
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto min-h-screen flex flex-col md:flex-row items-stretch pt-20">
        {/* Left Column: Image */}
        <div className="hidden md:block w-1/2 relative min-h-[800px]">
          <div className="absolute inset-0 px-8 py-10">
            <div className="w-full h-full rounded-[4px] overflow-hidden relative">
              <img src={signupEditorial} alt="Fashion Editorial" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/5" />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:py-20 bg-white">
          <div className="w-full max-w-[448px] flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[36px] font-black text-[#1B1D0E] font-hei leading-tight">회원가입</h2>
              <p className="text-[14px] text-[#9CA3AF] font-hei">새로운 늘:pepi-i 경험을 시작해보세요.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">성함</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="이름을 입력하세요"
                    className="w-full h-14 px-12 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-[#9C3F00]/10 text-[15px] font-medium"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                  <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              </div>

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">이메일</label>
                <div className="relative">
                  <input 
                    type="email" 
                    placeholder="example@email.com"
                    className="w-full h-14 px-12 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-[#9C3F00]/10 text-[15px] font-medium"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                  <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">비밀번호</label>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="8자 이상 영문, 숫자 조합"
                    className="w-full h-14 px-12 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-[#9C3F00]/10 text-[15px] font-medium"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required
                  />
                  <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">휴대폰 번호</label>
                <div className="relative flex gap-2">
                  <div className="relative flex-grow">
                    <input 
                      type="tel" 
                      placeholder="010-0000-0000"
                      className="w-full h-14 px-12 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-[#9C3F00]/10 text-[15px] font-medium"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      required
                    />
                    <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                  </div>
                  <button type="button" className="px-6 bg-gray-50 border border-black/5 rounded-2xl text-[13px] font-bold hover:bg-gray-200 transition-colors">인증</button>
                </div>
              </div>

              {/* Address */}
              <div className="flex flex-col gap-2 relative">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">주소</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="text" 
                    placeholder="우편번호"
                    value={formData.zipcode}
                    readOnly
                    className="w-32 h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none text-[15px] font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setShowAddressSearch(true);
                      setSearchResults(allMockAddresses.slice(0, 3));
                    }}
                    className="px-6 bg-gray-50 border border-black/5 rounded-2xl text-[13px] font-bold hover:bg-gray-200 transition-colors font-hei"
                  >
                    주소 검색
                  </button>
                </div>
                <input 
                  type="text" 
                  placeholder="기본 주소"
                  value={formData.address}
                  readOnly
                  className="w-full h-14 px-6 bg-[#FAFAFA] rounded-2xl border-none text-[15px] font-medium mb-2"
                />
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="상세 주소를 입력하세요"
                    value={formData.detailAddress}
                    onChange={(e) => setFormData({...formData, detailAddress: e.target.value})}
                    className="w-full h-14 px-12 bg-[#FAFAFA] rounded-2xl border-none focus:ring-2 focus:ring-[#9C3F00]/10 text-[15px] font-medium"
                  />
                  <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />
                </div>

                {/* Address Search Modal - NOW APPEARING ABOVE */}
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

              {/* Agreements */}
              <div className="flex flex-col gap-4 mt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div 
                    onClick={() => handleCheckboxChange('agreeAll')}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${formData.agreeAll ? 'bg-[#9C3F00] border-[#9C3F00]' : 'border-gray-200 group-hover:border-gray-300'}`}
                  >
                    <Check size={14} className={formData.agreeAll ? 'text-white' : 'text-transparent'} />
                  </div>
                  <span className="text-[15px] font-bold text-[#1B1D0E]">전체 동의합니다</span>
                </label>
                
                <div className="flex flex-col gap-3 pl-9">
                  {[
                    { key: 'agreeTerms', label: '[필수] 이용약관 동의' },
                    { key: 'agreePrivacy', label: '[필수] 개인정보 수집 및 이용 동의' },
                    { key: 'agreeMarketing', label: '[선택] 마케팅 정보 수신 동의' }
                  ].map((item) => (
                    <label key={item.key} className="flex items-center justify-between cursor-pointer group">
                      <div className="flex items-center gap-3" onClick={() => handleCheckboxChange(item.key)}>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${formData[item.key] ? 'bg-gray-900 border-gray-900' : 'border-gray-200 group-hover:border-gray-300'}`}>
                          <Check size={12} className={formData[item.key] ? 'text-white' : 'text-transparent'} />
                        </div>
                        <span className="text-[13px] text-gray-500">{item.label}</span>
                      </div>
                      <button type="button" className="text-[11px] text-gray-300 border-b border-gray-200 leading-none pb-0.5">상세보기</button>
                    </label>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[16px] font-bold hover:bg-gray-200 transition-all mt-4 shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-inner"
              >
                가입하기
              </button>
            </form>

            {/* SNS Login */}
            <div className="flex flex-col gap-6 items-center">
              <div className="w-full flex items-center gap-4 text-[#D1D5DB]">
                <div className="flex-grow h-px bg-[#F3F4F6]" />
                <span className="text-[10px] font-bold tracking-widest uppercase font-sans">SNS 간편 가입</span>
                <div className="flex-grow h-px bg-[#F3F4F6]" />
              </div>
              
              <div className="flex gap-4">
                {/* Kakao */}
                <button className="w-[100px] h-14 bg-[#FAFAFA] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 bg-[#FEE500] rounded-[6px] flex items-center justify-center text-[10px] font-black font-sans">K</div>
                </button>
                {/* Naver */}
                <button className="w-[100px] h-14 bg-[#FAFAFA] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <div className="w-6 h-6 bg-[#03C75A] rounded-[6px] flex items-center justify-center text-[10px] font-black font-sans text-white">N</div>
                </button>
                {/* Apple */}
                <button className="w-[100px] h-14 bg-[#FAFAFA] rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                  <span className="text-[14px] font-bold font-hei text-[#1B1D0E]">iOS</span>
                </button>
              </div>
            </div>

            {/* Footer Text */}
            <p className="text-[14px] text-[#9CA3AF] font-hei text-center">
              이미 계정이 있으신가요? <Link to="/login" className="text-black font-bold border-b border-black font-hei">로그인</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
