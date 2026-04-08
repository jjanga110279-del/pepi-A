import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import loginEditorial from '../assets/images/login_editorial.png';
import { Mail, Lock, Eye, EyeOff, Check } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useCart } from '../context/CartContext';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useUser();
  const { addToCart } = useCart();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    autoLogin: false
  });

  const location = useLocation();
  const from = location.state?.from || '/';
  const action = location.state?.action;
  const product = location.state?.product;
  const selectedOptions = location.state?.selectedOptions;

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData.email);
    alert('반가워요, 짱아님! 로그인이 완료되었습니다.');

    // 동작 수행 후 이동
    if (action === 'add_to_cart' && product && selectedOptions) {
      selectedOptions.forEach(opt => {
        addToCart({
          id: product.id,
          name: product.name,
          price: typeof product.price === 'string' ? parseInt(product.price.replace(/[^0-9]/g, '')) : product.price,
          image: product.image,
          color: opt.color,
          size: opt.size,
          quantity: opt.quantity
        });
      });
      navigate('/cart');
    } else if (action === 'buy_now' && product && selectedOptions) {
      const itemsToOrder = selectedOptions.map(opt => ({
        id: product.id,
        name: product.name,
        price: typeof product.price === 'string' ? parseInt(product.price.replace(/[^0-9]/g, '')) : product.price,
        image: product.image,
        color: opt.color,
        size: opt.size,
        quantity: opt.quantity
      }));
      navigate('/checkout', { state: { items: itemsToOrder, fromCart: false } });
    } else {
      navigate(from, { replace: true }); 
    }
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto min-h-screen flex flex-col md:flex-row items-stretch pt-20">
        {/* Left Column: Image */}
        <div className="hidden md:block w-1/2 relative min-h-[600px] lg:min-h-[800px]">
          <div className="absolute inset-0 px-8 py-10">
            <div className="w-full h-full rounded-none overflow-hidden relative border border-black/5 bg-[#FAFAFA] flex items-center justify-center">
              <img src={loginEditorial} alt="Fashion Editorial" className="w-full h-full object-contain" />
              <div className="absolute inset-0 bg-black/[0.02] pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Right Column: Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center items-center px-6 py-12 md:py-20 bg-white">
          <div className="w-full max-w-[448px] flex flex-col gap-10">
            {/* Header */}
            <div className="flex flex-col gap-2">
              <h2 className="text-[36px] font-black text-[#1B1D0E] font-hei leading-tight">로그인</h2>
              <p className="text-[14px] text-[#9CA3AF] font-hei">늘:pepi-i의 새로운 컬렉션을 만나보세요.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              {/* Email */}
              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">Email</label>
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
                <div className="flex justify-between items-center">
                  <label className="text-[12px] font-bold text-[#1B1D0E] uppercase tracking-widest font-hei">Password</label>
                  <Link to="/find-password" title="비밀번호 찾기" className="text-[11px] font-bold text-gray-400 hover:text-black transition-colors border-b border-gray-200 leading-none pb-0.5">비밀번호 찾기</Link>
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="비밀번호를 입력하세요"
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

              {/* Auto Login Checkbox */}
              <div className="flex items-center gap-2 mt-2">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <div 
                    onClick={() => setFormData({...formData, autoLogin: !formData.autoLogin})}
                    className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${formData.autoLogin ? 'bg-[#9C3F00] border-[#9C3F00]' : 'border-gray-200 group-hover:border-gray-300'}`}
                  >
                    <Check size={12} className={formData.autoLogin ? 'text-white' : 'text-transparent'} />
                  </div>
                  <span className="text-[13px] font-medium text-gray-500">자동 로그인</span>
                </label>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                className="w-full h-16 bg-[#F9FAFB] border border-black/5 text-[#1B1D0E] rounded-full text-[16px] font-bold hover:bg-gray-200 transition-all mt-2 shadow-[6px_6px_15px_rgba(0,0,0,0.1)] active:translate-y-0.5 active:shadow-inner"
              >
                로그인하기
              </button>
            </form>

            {/* SNS Login */}
            <div className="flex flex-col gap-6 items-center">
              <div className="w-full flex items-center gap-4 text-[#D1D5DB]">
                <div className="flex-grow h-px bg-[#F3F4F6]" />
                <span className="text-[10px] font-bold tracking-widest uppercase font-sans">or continue with</span>
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
              아직 계정이 없으신가요? <Link to="/signup" className="text-black font-bold border-b border-black font-hei">회원가입</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
