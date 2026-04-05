import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: 'Elena Kim',
    email: 'elena.kim@atelier.com',
    phone: '010-1234-5678',
    zipcode: '06035',
    address: '서울특별시 강남구 가로수길 15',
    detailAddress: '아뜰리에 빌딩 3층',
    profileImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=400&auto=format&fit=crop',
    rank: 'VIP GOLD'
  });

  // 쿠폰 상태 관리
  const [coupons, setCoupons] = useState([
    { id: 1, name: '신규 가입 10,000원 할인', amount: 10000, minPrice: 50000, expiry: '2024.12.31', used: false },
    { id: 2, name: '첫 구매 5,000원 할인', amount: 5000, minPrice: 30000, expiry: '2024.06.30', used: false },
    { id: 3, name: '생일 축하 10% 쿠폰', amount: 8000, minPrice: 0, expiry: '2024.05.15', used: false }
  ]);

  // 주소록 상태 관리
  const [addressBook, setAddressBook] = useState([
    { id: 1, label: '우리집 (기본)', name: 'Elena Kim', phone: '010-1234-5678', zipcode: '06035', address: '서울특별시 강남구 가로수길 15', detail: '아뜰리에 빌딩 3층', isDefault: true },
    { id: 2, label: '회사', name: '김엘레나', phone: '010-1234-5678', zipcode: '04524', address: '서울특별시 중구 세종대로 110', detail: '7층 디자인팀', isDefault: false }
  ]);

  // 주문 내역 상태 관리
  const [orders, setOrders] = useState([
    {
      id: '20240325-001234',
      date: '2024.03.25',
      items: [
        {
          id: 'p1',
          name: '시그니처 울 트라우저',
          brand: 'Atelier Selection',
          color: 'Charcoal',
          size: 'M',
          price: 425000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=200&auto=format&fit=crop',
          status: '배송중'
        }
      ],
      totalPrice: 425000,
      subtotal: 425000,
      shippingFee: 0,
      couponDiscount: 0,
      usedPoint: 0,
      paymentMethod: 'card',
      paymentDetail: '신용카드 (현대 45**)',
      cardInfo: '현대카드 / 일시불',
      status: '배송중'
    },
    {
      id: '20240320-001102',
      date: '2024.03.20',
      items: [
        {
          id: 'p2',
          name: '프리미엄 캐시미어 가디건',
          brand: 'Seasonal Glow',
          color: 'Beige',
          size: 'Free',
          price: 189000,
          quantity: 1,
          image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=200&auto=format&fit=crop',
          status: '배송완료'
        }
      ],
      totalPrice: 189000,
      subtotal: 189000,
      shippingFee: 0,
      couponDiscount: 0,
      usedPoint: 0,
      paymentMethod: 'card',
      paymentDetail: '신용카드 (삼성 12**)',
      cardInfo: '삼성카드 / 일시불',
      status: '배송완료'
    }
  ]);

  const updateUser = (newInfo) => setUser(prev => ({ ...prev, ...newInfo }));

  const useCoupon = (couponId) => {
    setCoupons(prev => prev.map(c => c.id === couponId ? { ...c, used: true, usedDate: new Date().toLocaleDateString() } : c));
  };

  const addAddress = (newAddr) => {
    setAddressBook(prev => [...prev, { ...newAddr, id: Date.now(), isDefault: prev.length === 0 }]);
  };

  const removeAddress = (id) => {
    setAddressBook(prev => prev.filter(a => a.id !== id));
  };

  const setDefaultAddress = (id) => {
    setAddressBook(prev => prev.map(a => ({ ...a, isDefault: a.id === id })));
  };

  const addOrder = (orderData) => {
    const newOrder = {
      ...orderData,
      id: `${new Date().getFullYear()}${(new Date().getMonth() + 1).toString().padStart(2, '0')}${new Date().getDate().toString().padStart(2, '0')}-${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      date: new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\. /g, '.').replace(/\.$/, ''),
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  return (
    <UserContext.Provider value={{ 
      user, updateUser, 
      coupons, useCoupon,
      addressBook, addAddress, removeAddress, setDefaultAddress,
      orders, addOrder
    }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
