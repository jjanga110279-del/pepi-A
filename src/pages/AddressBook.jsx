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
  const { addressBook, addAddress, removeAddress, setDefaultAddress } = useUser();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddr, setNewAddr] = useState({
    label: '',
    name: '',
    phone: '',
    zipcode: '',
    address: '',
    detail: ''
  });

  const handleAddAddress = (e) => {
    e.preventDefault();
    addAddress(newAddr);
    setShowAddForm(false);
    setNewAddr({ label: '', name: '', phone: '', zipcode: '', address: '', detail: '' });
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
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-[36px] font-bold text-[#000000] font-hei">주소록 관리</h1>
            <button 
              onClick={() => setShowAddForm(true)}
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
                  <button className="flex-1 py-2.5 bg-white border border-black/10 rounded-full text-[12px] font-bold hover:bg-gray-50 transition-colors">수정</button>
                  {!addr.isDefault && (
                    <button onClick={() => setDefaultAddress(addr.id)} className="flex-1 py-2.5 bg-white border border-black/10 rounded-full text-[12px] font-bold hover:bg-gray-50 transition-colors text-black/40">기본 배송지 설정</button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Add Address Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-[40px] w-full max-w-lg overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="p-8 border-b border-black/5 flex justify-between items-center">
                  <h2 className="text-2xl font-bold font-hei">새 배송지 등록</h2>
                  <button onClick={() => setShowAddForm(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <X size={24} />
                  </button>
                </div>
                <form onSubmit={handleAddAddress} className="p-8 flex flex-col gap-6">
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
                  <div className="flex flex-col gap-2">
                    <label className="text-[12px] font-bold text-black/40 uppercase font-hei">주소</label>
                    <div className="flex gap-2">
                      <input 
                        required
                        type="text" 
                        placeholder="우편번호"
                        className="w-32 px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                        value={newAddr.zipcode}
                        onChange={(e) => setNewAddr({...newAddr, zipcode: e.target.value})}
                      />
                      <button type="button" className="px-6 bg-gray-100 hover:bg-gray-200 rounded-xl text-[13px] font-bold transition-all">주소 검색</button>
                    </div>
                    <input 
                      required
                      type="text" 
                      placeholder="기본 주소"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                      value={newAddr.address}
                      onChange={(e) => setNewAddr({...newAddr, address: e.target.value})}
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="상세 주소"
                      className="w-full px-4 py-3 border border-black/10 rounded-xl focus:outline-none focus:border-black transition-all"
                      value={newAddr.detail}
                      onChange={(e) => setNewAddr({...newAddr, detail: e.target.value})}
                    />
                  </div>
                  <button type="submit" className="w-full py-4 bg-black text-white rounded-2xl text-[16px] font-bold hover:bg-black/90 transition-all mt-4">배송지 저장</button>
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
