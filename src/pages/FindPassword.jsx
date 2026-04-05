import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import Layout from '../components/common/Layout';
import { Mail, Smartphone, ArrowRight, MessageCircle } from 'lucide-react';

export default function FindPassword() {
  const navigate = useNavigate();
  const [inputValue, setInitialValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('인증번호가 전송되었습니다. 확인 후 로그인해주세요.');
    navigate('/login');
  };

  return (
    <Layout>
      <div className="min-h-screen bg-white flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-[448px] bg-white border border-black/5 rounded-[48px] p-12 shadow-sm">
          <div className="flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-3 text-center">
              <h1 className="text-[36px] font-black text-[#1B1D0E] font-serif leading-tight">비밀번호 찾기</h1>
              <p className="text-[14px] text-[#9CA3AF] font-hei">가입 시 등록하신 정보를 입력해주세요.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-[12px] font-bold text-black/40 font-hei uppercase tracking-widest ml-1">이메일 또는 휴대폰 번호</label>
                <input 
                  type="text" 
                  placeholder="example@pepi-i.com 또는 01012345678"
                  className="w-full h-14 px-6 bg-[#FAFAFA] border border-black/5 rounded-2xl text-[15px] font-medium focus:outline-none focus:border-black/10 transition-all"
                  value={inputValue}
                  onChange={(e) => setInitialValue(e.target.value)}
                  required
                />
              </div>

              <button 
                type="submit"
                className="w-full h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[16px] font-bold hover:bg-gray-200 transition-all shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-inner"
              >
                인증번호 전송
              </button>
            </form>

            {/* Links */}
            <div className="flex flex-col items-center gap-6">
              <Link to="/login" className="text-[13px] font-bold text-black/40 hover:text-black transition-colors border-b border-black/5 pb-0.5">
                로그인 화면으로 돌아가기
              </Link>
              
              <div className="w-8 h-px bg-black/5" />
              
              <Link to="/customer-service" className="text-[12px] text-black/30 font-hei text-center leading-relaxed hover:text-black transition-colors">
                정보를 잊으셨나요?<br/>
                <span className="font-bold">고객센터 문의하기</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
