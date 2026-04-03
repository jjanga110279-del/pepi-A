import React from 'react';
import { useLocation } from 'react-router';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
  const location = useLocation();
  const isDetailPage = ['/about', '/terms', '/guide'].includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Header />
      <main className={`flex-grow ${isDetailPage ? 'pt-[60px] md:pt-[80px]' : 'pt-[100px] lg:pt-[160px]'}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
