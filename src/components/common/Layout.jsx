import React from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';
import BottomNav from './BottomNav';
import FloatingMenu from './FloatingMenu';

export default function Layout({ children }) {
  const location = useLocation();
  const isDetailPage = ['/about', '/terms', '/guide'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans relative">
      <Header />
      <main className={`flex-grow pb-16 lg:pb-0 ${isDetailPage ? 'pt-[60px] md:pt-[80px]' : 'pt-[100px] lg:pt-[160px]'}`}>
        {children}
      </main>
      <Footer />
      <BottomNav />
      <FloatingMenu />
    </div>
  );
}
