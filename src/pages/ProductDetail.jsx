import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ALL_PRODUCTS, getProductById } from '../constants/products';
import { useCart } from '../context/CartContext';
import { Plus, Minus, X } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart } = useCart();

  const productFromState = location.state?.product;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const getDynamicProduct = (productId) => {
    if (!productId) return null;
    let found = getProductById(productId);
    if (found) return found;
    return null;
  };

  const product = location.state?.editItem || productFromState || getDynamicProduct(id) || {
    id: id || 'detail-main',
    name: id?.includes('outer') ? "클래식 테일러드 울 자켓" : "핀턱 레이스 블라우스",
    price: "189,000원",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: 'new'
  };

  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  ];
  
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  // 장바구니에서 '옵션 변경'으로 들어왔을 때 초기 데이터 설정
  React.useEffect(() => {
    if (location.state?.editItem) {
      const item = location.state.editItem;
      setSelectedOptions([{
        optionId: `${item.color}-${item.size}`,
        color: item.color,
        size: item.size,
        quantity: item.quantity
      }]);
    }
  }, [location.state]);

  const handleOptionSelect = (type, value) => {
    let newColor = selectedColor;
    let newSize = selectedSize;

    if (type === 'color') {
      newColor = value;
      setSelectedColor(value);
    } else {
      newSize = value;
      setSelectedSize(value);
    }

    if (newColor && newSize) {
      const optionId = `${newColor}-${newSize}`;
      const exists = selectedOptions.find(opt => opt.optionId === optionId);
      
      if (!exists) {
        setSelectedOptions([...selectedOptions, {
          optionId,
          color: newColor,
          size: newSize,
          quantity: 1
        }]);
      }
      setSelectedColor('');
      setSelectedSize('');
    }
  };

  const updateOptionQuantity = (optionId, delta) => {
    setSelectedOptions(prev => prev.map(opt => 
      opt.optionId === optionId 
        ? { ...opt, quantity: Math.max(1, opt.quantity + delta) } 
        : opt
    ));
  };

  const removeOption = (optionId) => {
    setSelectedOptions(prev => prev.filter(opt => opt.optionId !== optionId));
  };

  const numericPrice = typeof product.price === 'string' 
    ? parseInt(product.price.replace(/[^0-9]/g, '')) 
    : product.price;

  const totalPrice = selectedOptions.reduce((acc, opt) => acc + (numericPrice * opt.quantity), 0);

  const handleAddToCart = () => {
    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.');
      return;
    }

    selectedOptions.forEach(opt => {
      addToCart({
        id: product.id,
        name: product.name,
        price: numericPrice,
        image: product.image,
        color: opt.color,
        size: opt.size,
        quantity: opt.quantity
      });
    });
    
    alert('선택한 모든 상품이 장바구니에 담겼습니다.');
    setSelectedOptions([]);
  };

  const handleBuyNow = () => {
    if (selectedOptions.length === 0) {
      alert('옵션을 선택해주세요.');
      return;
    }

    const itemsToOrder = selectedOptions.map(opt => ({
      id: product.id,
      name: product.name,
      price: numericPrice,
      image: product.image,
      color: opt.color,
      size: opt.size,
      quantity: opt.quantity
    }));

    navigate('/checkout', { state: { items: itemsToOrder, fromCart: false } });
  };

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Main Selection Area */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 mb-32">
          {/* Left: Gallery */}
          <div className="lg:w-[683px] flex gap-4 h-fit sticky top-40">
            <div className="hidden md:flex flex-col gap-4 w-20 max-h-[800px] overflow-y-auto no-scrollbar pb-10">
              {productImages.map((img, i) => (
                <div 
                  key={i} 
                  onClick={() => setMainImage(img)}
                  className={`aspect-[3/4] rounded-lg overflow-hidden bg-[#fafafa] cursor-pointer border-2 transition-all flex-shrink-0 ${mainImage === img ? 'border-[#9C3F00] shadow-sm' : 'border-transparent opacity-60 hover:opacity-100'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex-grow aspect-[3/4] rounded-2xl overflow-hidden bg-[#fafafa] transition-all duration-500">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-[469px] flex flex-col">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#9C3F00] text-sm font-semibold tracking-tight">New Arrival</span>
                <ICONS.share className="text-black/40 cursor-pointer hover:text-black transition-colors" />
              </div>
              <h1 className="text-[32px] md:text-[36px] font-bold text-[#1b1d0e] font-hei mb-4 leading-tight">{product.name}</h1>
              <div className="text-[24px] font-bold text-[#9C3F00] font-sans mb-5">{product.price}</div>
              <div className="inline-block px-3 py-1 bg-[#F9F9F9] rounded-lg text-[#9C3F00] text-[11px] font-bold font-hei">무료배송</div>
            </div>

            {/* Selection Inputs */}
            <div className="flex flex-col gap-8 mb-10">
              <div>
                <span className="text-xs font-bold text-[#564338] mb-4 block tracking-tight uppercase font-hei">Color Selection</span>
                <div className="flex gap-4">
                  {[
                    { name: 'Ivory', color: '#FFFFFF' },
                    { name: 'Beige', color: '#F5F5DC' },
                    { name: 'Charcoal', color: '#3D3D3D' }
                  ].map((c) => (
                    <button 
                      key={c.name}
                      onClick={() => handleOptionSelect('color', c.name)}
                      className={`w-8 h-8 rounded-full border transition-all ${selectedColor === c.name ? 'border-[#9C3F00] scale-110 ring-2 ring-[#9C3F00]/20' : 'border-[#F0F0F0]'}`}
                      style={{ backgroundColor: c.color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold text-[#564338] mb-4 block tracking-tight uppercase font-hei">Size Selection</span>
                <div className="flex gap-2">
                  {['S', 'M', 'L'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => handleOptionSelect('size', s)}
                      className={`flex-1 h-11 rounded-lg border text-sm font-medium transition-all ${selectedSize === s ? 'border-[#9C3F00] text-[#9C3F00] font-bold' : 'border-[#F0F0F0] text-black/60 bg-white hover:border-black/20'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected List */}
            {selectedOptions.length > 0 && (
              <div className="flex flex-col gap-3 mb-10 pt-6 border-t border-black/5">
                {selectedOptions.map((opt) => (
                  <div key={opt.optionId} className="bg-[#FAFAFA] rounded-xl p-5 flex flex-col gap-4">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <span className="text-[14px] font-bold text-black font-hei">{product.name}</span>
                        <span className="text-[12px] text-black/40 font-sans uppercase">{opt.color} / {opt.size}</span>
                      </div>
                      <button onClick={() => removeOption(opt.optionId)} className="text-black/20 hover:text-black"><X size={16} /></button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-black/10 rounded-full h-8 px-1.5 gap-3 bg-white">
                        <button onClick={() => updateOptionQuantity(opt.optionId, -1)} className="w-5 h-5 flex items-center justify-center text-black/40"><Minus size={12}/></button>
                        <span className="text-[13px] font-bold w-4 text-center font-sans">{opt.quantity}</span>
                        <button onClick={() => updateOptionQuantity(opt.optionId, 1)} className="w-5 h-5 flex items-center justify-center text-black/40"><Plus size={12}/></button>
                      </div>
                      <span className="text-[15px] font-bold text-black font-sans">₩{(numericPrice * opt.quantity).toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Final Actions */}
            <div className="pt-8 border-t border-[#F0F0F0]">
              {selectedOptions.length > 0 && (
                <div className="flex justify-between items-end mb-8">
                  <span className="text-sm font-bold text-black font-hei uppercase tracking-widest">Total Amount</span>
                  <span className="text-[28px] font-bold text-[#9C3F00] font-sans leading-none tracking-tight">₩{totalPrice.toLocaleString()}</span>
                </div>
              )}
              <div className="flex gap-4">
                <button onClick={handleAddToCart} className="flex-1 h-[66px] rounded-full border border-[#9C3F00] text-[#9C3F00] text-base font-bold font-hei hover:bg-[#9C3F00]/5 transition-all">
                  장바구니 담기
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 h-[66px] rounded-full bg-[#9C3F00] text-white text-base font-bold font-hei shadow-lg shadow-[#9C3F00]/20 hover:bg-[#853600] transition-all"
                >
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Simplified Tab Navigation */}
        <div className="border-b border-[#F0F0F0] mb-20 flex justify-center sticky top-0 bg-white/95 backdrop-blur-sm z-30">
          <div className="flex gap-12">
            <button className="py-4 text-sm font-bold transition-all border-b-2 border-[#9C3F00] text-[#9C3F00]">상세 정보</button>
            <Link to="/guide#delivery-section" className="py-4 text-sm font-bold text-[#564338] opacity-60 hover:opacity-100 transition-all">배송 & 반품</Link>
          </div>
        </div>

        {/* Unified Detailed Content Section */}
        <div className="max-w-[896px] mx-auto flex flex-col gap-32">
          {/* 1. Product Features */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-6 mb-16">
              <h2 className="text-[30px] font-serif italic text-[#1b1d0e]">Product Check Point</h2>
              <div className="w-12 h-0.5 bg-[#9C3F00]" />
            </div>
            <div className="bg-[#FAFAFA] rounded-3xl p-10 text-left">
               <ul className="flex flex-col gap-10">
                 {[
                   { title: '프리미엄 코튼 혼방 소재', desc: '피부 자극이 적고 통기성이 뛰어나 한여름에도 쾌적한 착용감을 선사합니다.' },
                   { title: '핸드메이드 핀턱 & 프랑스 레이스', desc: '장인의 정교한 손길이 닿은 핀턱 디테일과 고급스러운 레이스 배색으로 소장 가치를 높였습니다.' },
                   { title: '세련된 세미 크롭 실루엣', desc: '다양한 하의와 매치하기 좋은 적절한 기장감으로 체형 보정 효과와 함께 우아한 핏을 연출합니다.' }
                 ].map((item, idx) => (
                   <li key={idx} className="flex gap-6 items-start">
                     <div className="w-5 h-5 rounded-full bg-[#9C3F00]/10 flex items-center justify-center mt-1 flex-shrink-0">
                       <div className="w-2 h-2 rounded-full bg-[#9C3F00]" />
                     </div>
                     <div className="flex flex-col gap-1">
                       <span className="text-[16px] font-bold text-[#1b1d0e] font-hei">{item.title}</span>
                       <span className="text-[16px] text-[#564338] font-hei opacity-80 leading-relaxed">{item.desc}</span>
                     </div>
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          {/* 2. Visual Content */}
          <div className="flex flex-col gap-8">
            <div className="grid grid-cols-2 gap-8">
              <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Detail 1" className="aspect-[3/4] rounded-2xl object-cover" />
              <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop" alt="Detail 2" className="aspect-[3/4] rounded-2xl object-cover mt-12" />
            </div>
            <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" alt="Wide View" className="aspect-video rounded-3xl object-cover mt-12" />
          </div>

          {/* 3. Size Guide (Moved from separate tab) */}
          <div className="pt-16 border-t border-black/5">
            <div className="border-l-4 border-[#9C3F00] pl-5 mb-10">
              <h3 className="text-[24px] font-bold font-serif text-[#1b1d0e]">Size Guide</h3>
            </div>
            <div className="flex flex-col md:flex-row gap-12">
              <div className="flex-grow">
                <table className="w-full text-sm font-hei text-left border-collapse">
                  <thead className="bg-[#FAFAFA]">
                    <tr>
                      <th className="py-4 px-4 border-b border-[#F0F0F0] text-[#564338] font-bold">Size (cm)</th>
                      <th className="py-4 px-4 border-b border-[#F0F0F0] text-[#564338] font-bold">어깨</th>
                      <th className="py-4 px-4 border-b border-[#F0F0F0] text-[#564338] font-bold">가슴</th>
                      <th className="py-4 px-4 border-b border-[#F0F0F0] text-[#564338] font-bold">소매</th>
                      <th className="py-4 px-4 border-b border-[#F0F0F0] text-[#564338] font-bold">총장</th>
                    </tr>
                  </thead>
                  <tbody>
                    {['S', 'M', 'L'].map((s, idx) => (
                      <tr key={idx}>
                        <td className="py-4 px-4 border-b border-[#F0F0F0] font-bold">{s}</td>
                        <td className="py-4 px-4 border-b border-[#F0F0F0]">38</td>
                        <td className="py-4 px-4 border-b border-[#F0F0F0]">48</td>
                        <td className="py-4 px-4 border-b border-[#F0F0F0]">60</td>
                        <td className="py-4 px-4 border-b border-[#F0F0F0]">62</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full md:w-[288px] bg-[#FAFAFA] border border-[#F0F0F0] rounded-2xl p-6">
                <span className="text-[12px] font-bold text-[#564338] uppercase text-center block mb-4 tracking-widest">Model Info</span>
                <div className="aspect-[3/4] bg-white rounded-lg border border-[#F0F0F0]/50 flex items-center justify-center p-4 text-[#9C3F00]/30 text-[10px] text-center">
                  측정 가이드 준비중
                </div>
              </div>
            </div>
          </div>

          {/* 4. Shipping & Care (Moved to bottom) */}
          <div className="pt-16 border-t border-black/5 mb-20">
            <div className="grid md:grid-cols-2 gap-20">
              <div className="flex flex-col gap-4">
                <h4 className="text-[18px] font-bold text-[#1b1d0e] font-hei">배송 안내</h4>
                <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                  기본 배송비는 3,000원입니다. 50,000원 이상 구매 시 무료 배송되며, 결제 완료 후 영업일 기준 2-5일 이내 출고됩니다. 제주 및 도서산간 지역은 추가 배송비가 발생할 수 있습니다.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-[18px] font-bold text-[#1b1d0e] font-hei">세탁 및 관리</h4>
                <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                  중성세제를 이용한 찬물 단독 손세탁 또는 드라이클리닝을 권장합니다. 형태 보존을 위해 옷걸이 사용보다 뉘어서 건조해주세요.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
