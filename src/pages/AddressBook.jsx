import React, { useState } from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';
import { useUser } from '../context/UserContext';
import { 
  User, ShoppingBag, Heart, Ticket, Coins, Settings, Headphones, 
  MapPin, Plus, Trash2, CheckCircle2, ChevronRight, X, Search as SearchIcon,
  ClipboardList
} from 'lucide-react';

export default function AddressBook() {
  const { addressBook, addAddress, updateAddress, removeAddress, setDefaultAddress } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [newAddr, setNewAddr] = useState({
    label: '',
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    detail: ''
  });

  // 주소 검색 관련 상태
  const [showAddressSearch, setShowAddressSearch] = useState(false);
  const [addressSearchQuery, setAddressSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);

  const allMockAddresses = [
    { zip: '06035', base: '서울특별시 강남구 가로수길 15 (신사동)' },
    { zip: '04524', base: '서울특별시 중구 세종대로 110 (태평로1가, 서울특별시청)' },
    { zip: '03154', base: '서울특별시 종로구 사직로 161 (세종로, 경복궁)' },
    { zip: '06164', base: '서울특별시 강남구 영동대로 513 (삼성동, 코엑스)' },
    { zip: '05551', base: '서울특별시 송파구 올림픽로 300 (신천동, 롯데월드타워)' },
    { zip: '48058', base: '부산광역시 해운대구 수영강변대로 120 (우동, 영화의전당)' },
    { zip: '16514', base: '경기도 수원시 영통구 광교중앙로 140 (이의동, 경기도청)' }
  ];

  // 실시간 주소 검색 시뮬레이션
  React.useEffect(() => {
    if (addressSearchQuery.length > 0) {
      setIsSearching(true);
      const timer = setTimeout(() => {
        const filtered = allMockAddresses.filter(addr => 
          addr.base.toLowerCase().includes(addressSearchQuery.toLowerCase()) || 
          addr.zip.includes(addressSearchQuery)
        );
        setSearchResults(filtered);
        setIsSearching(false);
        setFocusedIndex(-1); // 검색 결과가 바뀌면 포커스 초기화
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setSearchResults([]);
      setIsSearching(false);
      setFocusedIndex(-1);
    }
  }, [addressSearchQuery]);

  const selectAddress = (addr) => {
    setNewAddr(prev => ({
      ...prev,
      zipcode: addr.zip,
      address: addr.base,
      detail: ''
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
      e.preventDefault(); // 폼 제출 방지
      if (focusedIndex >= 0 && focusedIndex < searchResults.length) {
        selectAddress(searchResults[focusedIndex]);
      }
    } else if (e.key === 'Escape') {
      setShowAddressSearch(false);
    }
  };

  const handleOpenAdd = () => {
    setIsEditMode(false);
    setEditingId(null);
    setNewAddr({ label: '', name: '', phone: '', zipcode: '', address: '', detail: '' });
    setShowAddForm(true);
  };

  const handleOpenEdit = (addr) => {
    setIsEditMode(true);
    setEditingId(addr.id);
    setNewAddr({
      label: addr.label,
      name: addr.name,
      phone: addr.phone,
      zipcode: addr.zipcode,
      address: addr.address,
      detail: addr.detail
    });
    setShowAddForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditMode) {
      updateAddress(editingId, newAddr);
      alert('배송 정보가 수정되었습니다.');
    } else {
      addAddress(newAddr);
      alert('새 배송지가 등록되었습니다.');
    }
    setShowAddForm(false);
  };

  const sideMenu = [
    { name: '프로필', path: '/mypage', icon: User, active: false },
    { name: '주문/결재 내역', path: '/order-history', icon: ShoppingBag, active: false },
    { name: '주소록 관리', path: '/address-book', icon: MapPin, active: true },
    { name: '관심 상품', path: '/wishlist', icon: Heart, active: false },
    { name: '내 리뷰관리', path: '/my-reviews', icon: ClipboardList, active: false },
    { name: '쿠폰', path: '/coupons', icon: Ticket, active: false },
    { name: '포인트', path: '/points', icon: Coins, active: false },
    { name: '설정', path: '/settings', icon: Settings, active: false },
    { name: '고객 센터', path: '/customer-service', icon: Headphones, active: false },
  ];

  return (
    <Layout>
      <div className="max-w-[1920px] mx-auto px-4 md:px-12 py-10 md:py-20 flex flex-col md:flex-row gap-12">
        {/* Sidebar */}
        <aside className="w-full md:w-[260px] shrink-0 border-r border-black/5 pr-12 hidden md:block">
          <h2 className="text-2xl font-bold text-[#1b1d0e] font-serif mb-10 lowercase tracking-tight">my page categories</h2>
          <nav className="flex flex-col gap-6">
            {sideMenu.map((sub, idx) => (
              <Link key={idx} to={sub.path} className={`flex items-center gap-4 text-[16px] font-medium transition-colors group ${sub.active ? 'text-[#dc2626]' : 'text-[#737373] hover:text-[#dc2626]'}`}>
                <span className={`w-5 h-5 flex items-center justify-center transition-all ${sub.active ? 'grayscale-0 opacity-100' : 'grayscale group-hover:grayscale-0 opacity-50 group-hover:opacity-100'}`}>
                  <sub.icon size={20} strokeWidth={sub.active ? 2.5 : 2} />
                </span>
                {sub.name}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <div className="flex-grow max-w-4xl">
          {/* Mobile MyPage Navigation */}
          <div className="md:hidden overflow-x-auto no-scrollbar -mx-4 px-4 mb-8">
            <div className="flex gap-2 pb-2">
              {sideMenu.map((sub, idx) => (
                <Link 
                  key={idx} 
                  to={sub.path}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all ${sub.active ? 'bg-[#1b1d0e] text-white shadow-md' : 'bg-gray-100 text-black/40'}`}
                >
                  <sub.icon size={14} />
                  {sub.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[36px] font-bold text-[#000000] font-hei">주소록 관리</h1>
            <button 
              onClick={handleOpenAdd}
              className="px-10 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-[13px] font-medium transition-all inline-flex items-center gap-2 font-hei"
            >
              <Plus size={16} /> <span className="font-hei">새 배송지 등록</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {addressBook.map((addr) => (
              <div key={addr.id} className={`bg-white border rounded-[32px] p-8 flex flex-col justify-between gap-8 transition-all ${addr.isDefault ? 'border-black shadow-md' : 'border-black/10 hover:border-black/20 shadow-sm'}`}>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[16px] font-bold text-black font-hei">{addr.label}</span>
                        {addr.isDefault && <span className="px-2 py-0.5 bg-white border border-black text-black text-[9px] font-bold rounded-full uppercase tracking-tighter">Default</span>}
                      </div>
                      <span className="text-[14px] font-bold text-black font-hei">{addr.name}</span>
                    </div>
                    {!addr.isDefault && (
                      <button onClick={() => removeAddress(addr.id)} className="p-2 text-black/20 hover:text-[#dc2626] transition-colors"><Trash2 size={18}/></button>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <p className="text-[14px] text-black/60 font-sans leading-tight">{addr.address}</p>
                    <p className="text-[14px] text-black/60 font-sans">{addr.detail} [{addr.zipcode}]</p>
                    <p className="text-[13px] text-black/40 font-sans mt-2">{addr.phone}</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => handleOpenEdit(addr)}
                    className="flex-1 py-2.5 bg-white border border-black/10 rounded-full text-[12px] font-bold hover:bg-gray-50 transition-colors"
                  >
                    수정
                  </button>
                  {!addr.isDefault && (
                    <button onClick={() => setDefaultAddress(addr.id)} className="flex-1 py-2.5 bg-white border border-black/10 rounded-full text-[12px] font-bold hover:bg-gray-50 transition-colors text-black/40">기본 배송지 설정</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add/Edit Address Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-8 border-b border-black/5 flex justify-between items-center">
                  <h2 className="text-2xl font-bold font-hei">{isEditMode ? '배송지 정보 수정' : '새 배송지 등록'}</h2>
                  <button type="button" onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleSubmit} className={`p-8 flex flex-col gap-6 ${showAddressSearch ? 'pb-40' : ''}`}>
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-black/40 uppercase font-hei">배송지명</label>
                    <input 
                      required
                      type="text" 
                      placeholder="예: 우리집, 회사"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                      value={newAddr.label}
                      onChange={(e) => setNewAddr({...newAddr, label: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] font-bold text-black/40 uppercase font-hei">수령인</label>
                      <input 
                        required
                        type="text" 
                        className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                        value={newAddr.name}
                        onChange={(e) => setNewAddr({...newAddr, name: e.target.value})}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[12px] font-bold text-black/40 uppercase font-hei">연락처</label>
                      <input 
                        required
                        type="tel" 
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                        value={newAddr.phone}
                        onChange={(e) => setNewAddr({...newAddr, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 relative">
                    <label className="text-[12px] font-bold text-black/40 uppercase font-hei">주소</label>
                    <div className="flex gap-3">
                      <input 
                        required
                        type="text" 
                        placeholder="우편번호"
                        className="w-32 px-4 py-3 bg-[#FAFAFA] border border-black/10 rounded-xl focus:outline-none font-sans"
                        value={newAddr.zipcode}
                        readOnly
                      />
                      <button 
                        type="button" 
                        onClick={() => {
                          setShowAddressSearch(true);
                          setSearchResults(allMockAddresses.slice(0, 3));
                        }}
                        className="px-6 bg-white border border-black/10 rounded-xl text-[13px] font-bold hover:bg-gray-100 transition-all font-hei"
                      >
                        주소 검색
                      </button>
                    </div>
                    <input 
                      required
                      type="text" 
                      placeholder="기본 주소"
                      className="w-full px-4 py-3 bg-[#FAFAFA] border border-black/10 rounded-xl focus:outline-none font-hei"
                      value={newAddr.address}
                      readOnly
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="상세 주소"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all font-hei"
                      value={newAddr.detail}
                      onChange={(e) => setNewAddr({...newAddr, detail: e.target.value})}
                    />

                    {/* Real-feel Address Search Dropdown inside Modal - NOW APPEARING ABOVE */}
                    {showAddressSearch && (
                      <div className="absolute left-0 bottom-full mb-2 w-full bg-white border border-black/10 rounded-3xl shadow-[0_-20px_50px_rgba(0,0,0,0.15)] z-[110] p-6 animate-in slide-in-from-bottom-2 duration-200">
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
                  <button 
                    type="submit" 
                    className="w-full h-[66px] bg-white border border-[#9C3F00] text-[#9C3F00] rounded-full text-[16px] font-bold hover:bg-[#9C3F00]/5 transition-all mt-4 font-hei"
                  >
                    {isEditMode ? '수정 완료' : '배송지 등록하기'}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="mt-20 pt-10 border-t border-black/5">
            <h4 className="text-[16px] font-bold text-black font-hei mb-6">배송지 관리 안내</h4>
            <ul className="flex flex-col gap-3 text-[13px] text-black/60 font-sans leading-relaxed">
              <li className="flex gap-2"><span>•</span> <span>배송지는 최대 10개까지 등록이 가능합니다.</span></li>
              <li className="flex gap-2"><span>•</span> <span>기본 배송지는 주문 시 자동으로 배송 정보에 입력됩니다.</span></li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}
