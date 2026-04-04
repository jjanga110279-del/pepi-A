import React, { useState } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router';
import Layout from '../components/common/Layout';
import { ICONS } from '../constants/icons';
import { ALL_PRODUCTS, getProductById } from '../constants/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Get product data passed from the card click
  const productFromState = location.state?.product;

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Find product from ALL_PRODUCTS or handle dynamic category IDs
  const getDynamicProduct = (productId) => {
    if (!productId) return null;
    // 1. Try exact match in ALL_PRODUCTS
    let found = getProductById(productId);
    if (found) return found;
    return null;
  };

  // Priority: 1. Data from click state, 2. Global product list, 3. Hardcoded fallback
  const product = productFromState || getDynamicProduct(id) || {
    id: id || 'detail-main',
    name: id?.includes('outer') ? "클래식 테일러드 울 자켓" : "핀턱 레이스 블라우스",
    price: "189,000원",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    category: 'new'
  };

  if (!product) return <Layout><div className="py-40 text-center">Product not found.</div></Layout>;

  // Multiple images for gallery (Simulating with 6 images)
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
  ];
  
  const [mainImage, setMainImage] = useState(productImages[0]);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('Ivory');
  const [activeTab, setActiveTab] = useState('detail');

  return (
    <Layout>
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 pt-8 pb-32">
        {/* Main Section: Gallery & Info */}
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-20 mb-32">
          {/* Left: Image Gallery */}
          <div className="lg:w-[683px] flex gap-4 h-fit sticky top-40">
            {/* Vertical Thumbnails */}
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
            {/* Main Image */}
            <div className="flex-grow aspect-[3/4] rounded-2xl overflow-hidden bg-[#fafafa] transition-all duration-500">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:w-[469px] flex flex-col">
            <div className="mb-10">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[#9C3F00] text-sm font-semibold tracking-tight">New Arrival</span>
                {ICONS.share && <ICONS.share className="text-black/40 cursor-pointer hover:text-black transition-colors" />}
              </div>
              <h1 className="text-[36px] font-bold text-[#1b1d0e] font-hei mb-4 leading-tight">{product.name}</h1>
              <div className="text-[24px] font-bold text-[#9C3F00] font-sans mb-5">{product.price}</div>
              <div className="inline-block px-3 py-1 bg-[#F9F9F9] rounded-lg text-[#9C3F00] text-[11px] font-bold font-hei">
                무료배송
              </div>
            </div>

            {/* Spirit Description Box */}
            <div className="bg-[#FAFAFA] rounded-2xl p-6 mb-10">
              <span className="text-[#9C3F00] text-sm mb-2 block font-sans">Romantic 늘:pepi-i Spirit</span>
              <h3 className="text-lg font-bold text-[#1b1d0e] font-hei mb-3">섬세한 핀턱과 레이스가 조화로운 페미닌 무드</h3>
              <p className="text-[14px] text-[#564338] leading-[23px] font-hei opacity-80">
                내추럴한 텍스처가 돋보이는 고급 소재를 사용하여 착용 시 부드럽게 떨어지는 실루엣을 완성합니다. 
                일상의 특별함을 더해줄 늘:pepi-i만의 감성을 만나보세요.
              </p>
            </div>

            {/* Options Selection */}
            <div className="flex flex-col gap-8 mb-10">
              {/* Color */}
              <div>
                <span className="text-xs font-bold text-[#564338] mb-4 block tracking-tight uppercase">Color Selection</span>
                <div className="flex gap-4">
                  {[
                    { name: 'Ivory', color: '#FFFFFF' },
                    { name: 'Beige', color: '#F5F5DC' },
                    { name: 'Charcoal', color: '#3D3D3D' }
                  ].map((c) => (
                    <button 
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`w-8 h-8 rounded-full border transition-all ${selectedColor === c.name ? 'border-[#9C3F00] scale-110 shadow-md ring-2 ring-[#9C3F00]/20' : 'border-[#F0F0F0]'}`}
                      style={{ backgroundColor: c.color }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size */}
              <div>
                <div className="flex justify-between items-center mb-4">
                   <span className="text-xs font-bold text-[#564338] uppercase tracking-tight">Size Selection</span>
                   <button className="text-[11px] text-black/40 underline underline-offset-4 font-hei hover:text-black">Size Guide</button>
                </div>
                <div className="flex gap-2">
                  {['S', 'M', 'L', 'XL'].map((s) => (
                    <button 
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`flex-1 h-11 rounded-lg border text-sm font-medium transition-all ${selectedSize === s ? 'border-[#9C3F00] text-[#9C3F00] bg-white font-bold border-2' : 'border-[#F0F0F0] text-black/60 bg-white hover:border-black/20'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Final Selection & Purchase */}
            <div className="pt-8 border-t border-[#F0F0F0]">
              <div className="flex justify-between items-center mb-8">
                <span className="text-sm font-medium text-[#1b1d0e] font-hei">선택된 상품: {selectedColor} / {selectedSize}</span>
                <span className="text-lg font-bold text-[#1b1d0e] font-sans">{product.price}</span>
              </div>
              <div className="flex gap-4">
                <button className="flex-1 h-[66px] rounded-full border border-[#9C3F00] text-[#9C3F00] text-base font-bold font-hei hover:bg-[#9C3F00]/5 transition-all">
                  장바구니 담기
                </button>
                <button className="flex-1 h-[66px] rounded-full bg-[#9C3F00] text-white text-base font-bold font-hei shadow-lg shadow-[#9C3F00]/20 hover:bg-[#853600] transition-all">
                  바로 구매하기
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-[#F0F0F0] mb-20 flex justify-center sticky top-0 bg-white/95 backdrop-blur-sm z-30">
          <div className="flex gap-12">
            {[
              { id: 'detail', label: '상세 정보' },
              { id: 'size', label: '사이즈 가이드' },
              { id: 'review', label: '구매 후기 (128)' },
              { id: 'shipping', label: '배송 & 반품' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 text-sm font-bold transition-all border-b-2 ${activeTab === tab.id ? 'border-[#9C3F00] text-[#9C3F00]' : 'border-transparent text-[#564338] opacity-60'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content: Details */}
        <div className="max-w-[896px] mx-auto">
          {activeTab === 'detail' && (
            <div className="flex flex-col gap-32">
              {/* Check Point */}
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

              {/* Detail Images Section */}
              <div className="flex flex-col gap-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAFAFA]">
                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop" alt="Detail 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAFAFA] mt-12">
                    <img src="https://images.unsplash.com/photo-1434389677669-e08b4cac3105?q=80&w=800&auto=format&fit=crop" alt="Detail 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                  </div>
                </div>
                <div className="aspect-video rounded-3xl overflow-hidden bg-[#FAFAFA] mt-12">
                  <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop" alt="Life Style" className="w-full h-full object-cover" />
                </div>
              </div>

              {/* Size Information */}
              <div>
                 <div className="border-l-4 border-[#9C3F00] pl-5 mb-10">
                   <h3 className="text-[20px] font-bold font-serif text-[#1b1d0e]">Size Information</h3>
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
                            <tr key={idx} className="hover:bg-black/[0.02] transition-colors">
                              <td className="py-4 px-4 border-b border-[#F0F0F0] font-bold">{s}</td>
                              <td className="py-4 px-4 border-b border-[#F0F0F0]">38</td>
                              <td className="py-4 px-4 border-b border-[#F0F0F0]">48</td>
                              <td className="py-4 px-4 border-b border-[#F0F0F0]">60</td>
                              <td className="py-4 px-4 border-b border-[#F0F0F0]">62</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="mt-4 text-[12px] text-[#564338] opacity-60 font-hei italic">
                        * 측정 방법에 따라 1-2cm 오차가 발생할 수 있습니다.
                      </p>
                   </div>
                   {/* Model Info Card */}
                   <div className="w-full md:w-[288px] bg-[#FAFAFA] border border-[#F0F0F0] rounded-2xl p-6 flex flex-col gap-4">
                      <span className="text-[12px] font-bold text-[#564338] uppercase tracking-tight text-center">Size Check Guide</span>
                      <div className="aspect-[3/4] bg-white rounded-lg border border-[#F0F0F0]/50 overflow-hidden flex items-center justify-center p-4">
                         {/* Visual Size Guide Placeholder */}
                         <div className="w-full h-full border-2 border-dashed border-[#9C3F00]/20 rounded flex items-center justify-center text-[#9C3F00]/30 text-[10px] text-center font-hei">
                           측정 가이드<br />이미지 영역
                         </div>
                      </div>
                      <div className="text-[11px] text-[#564338] font-hei grid grid-cols-2 gap-2 opacity-80">
                        <div className="flex flex-col"><span>신축성</span><span className="font-bold">없음</span></div>
                        <div className="flex flex-col"><span>비침</span><span className="font-bold">약간있음</span></div>
                        <div className="flex flex-col"><span>안감</span><span className="font-bold">없음</span></div>
                        <div className="flex flex-col"><span>두께감</span><span className="font-bold">얇음</span></div>
                      </div>
                   </div>
                 </div>
              </div>

              {/* Shipping & Care */}
              <div>
                 <div className="border-l-4 border-[#9C3F00] pl-5 mb-10">
                   <h3 className="text-[20px] font-bold font-serif text-[#1b1d0e]">Shipping & Care</h3>
                 </div>
                 <div className="grid md:grid-cols-2 gap-12 md:gap-20 mb-20">
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[14px] font-bold text-[#1b1d0e] font-hei">배송 안내</h4>
                      <p className="text-[14px] text-[#564338] leading-[23px] font-hei">
                        기본 배송비는 무료입니다. (제주/도서산간 지역 추가 비용 발생)<br />
                        결제 완료 후 영업일 기준 2-5일 이내 출고됩니다.
                      </p>
                    </div>
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[14px] font-bold text-[#1b1d0e] font-hei">세탁 및 관리</h4>
                      <p className="text-[14px] text-[#564338] leading-[23px] font-hei">
                        중성세제를 이용한 찬물 단독 손세탁 또는 드라이클리닝을 권장합니다. 레이스 손상을 방지하기 위해 세탁망 사용을 권장하며, 건조기 사용은 피해주세요.
                      </p>
                    </div>
                 </div>

                 {/* Final Large Image */}
                 <div className="aspect-[16/9] rounded-[40px] overflow-hidden bg-[#FAFAFA]">
                    <img 
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop" 
                      alt="Brand Mood" 
                      className="w-full h-full object-cover"
                    />
                 </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
