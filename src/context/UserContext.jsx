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

  const updateUser = (newInfo) => {
    setUser(prev => ({ ...prev, ...newInfo }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
