import { IMAGES } from './images';
import { BEST_PRODUCTS } from './products/best';

export const ALL_PRODUCTS = [
  // Best 50 Items (best.js에서 가져옴)
  ...BEST_PRODUCTS,
  
  // New In Items (신상 5% - 16개로 확장)
  { id: 'n1', name: "모던 셋업 싱글 자켓", price: "185,000원", originalPrice: "210,000원", discount: "5%", image: IMAGES.best6, reviews: 12, category: 'new', isNew: true },
  { id: 'n2', name: "실크 레이스 셔링 블라우스", price: "68,000원", originalPrice: "72,000원", discount: "5%", image: IMAGES.best14, reviews: 45, category: 'new', isNew: true },
  { id: 'n3', name: "플리츠 니트 롱 스커트", price: "54,000원", originalPrice: "57,000원", discount: "5%", image: IMAGES.best13, reviews: 28, category: 'new', isNew: true },
  { id: 'n4', name: "미니멀 가죽 스퀘어 백", price: "142,000원", originalPrice: "150,000원", discount: "5%", image: IMAGES.best10, reviews: 19, category: 'new', isNew: true },
  { id: 'n5', name: "에센셜 코튼 베이직 티", price: "24,000원", originalPrice: "26,000원", discount: "5%", image: IMAGES.best7, reviews: 156, category: 'new', isNew: true },
  { id: 'n6', name: "와이드 핏 코튼 데일리 팬츠", price: "48,000원", originalPrice: "51,000원", discount: "5%", image: IMAGES.best4, reviews: 67, category: 'new', isNew: true },
  { id: 'n7', name: "내추럴 린넨 포켓 셔츠", price: "42,000원", originalPrice: "45,000원", discount: "5%", image: IMAGES.best1, reviews: 34, category: 'new', isNew: true },
  { id: 'n8', name: "클래식 체크 미니 스커트", price: "41,000원", originalPrice: "44,000원", discount: "5%", image: IMAGES.best16, reviews: 22, category: 'new', isNew: true },
  { id: 'n9', name: "루즈핏 브이넥 가디건", price: "56,000원", originalPrice: "59,000원", discount: "5%", image: IMAGES.best8, reviews: 15, category: 'new', isNew: true },
  { id: 'n10', name: "하이웨이스트 린넨 슬랙스", price: "61,000원", originalPrice: "65,000원", discount: "5%", image: IMAGES.best9, reviews: 41, category: 'new', isNew: true },
  { id: 'n11', name: "타이 포인트 실크 블라우스", price: "68,000원", originalPrice: "72,000원", discount: "5%", image: IMAGES.best18, reviews: 29, category: 'new', isNew: true },
  { id: 'n12', name: "빈티지 워싱 데님 스커트", price: "51,000원", originalPrice: "54,000원", discount: "5%", image: IMAGES.best12, reviews: 88, category: 'new', isNew: true },
  { id: 'n13', name: "라운드 넥 미니멀 니트", price: "46,000원", originalPrice: "49,000원", discount: "5%", image: IMAGES.best15, reviews: 63, category: 'new', isNew: true },
  { id: 'n14', name: "모던 핀턱 레이스 탑", price: "49,000원", originalPrice: "52,000원", discount: "5%", image: IMAGES.best3, reviews: 37, category: 'new', isNew: true },
  { id: 'n15', name: "에센셜 데님 숏 점퍼", price: "59,000원", originalPrice: "63,000원", discount: "5%", image: IMAGES.best2, reviews: 92, category: 'new', isNew: true },
  { id: 'n16', name: "프리미엄 로고 볼캡", price: "33,000원", originalPrice: "35,000원", discount: "5%", image: IMAGES.best11, reviews: 110, category: 'new', isNew: true },

  // Popular
  { id: 'p1', name: "퍼펙트 핏 셔츠", price: "48,000원", image: IMAGES.bestItem1, reviews: 342, category: 'popular', rank: 1 },
  { id: 'p2', name: "와이드 데님 팬츠", price: "54,000원", image: IMAGES.bestItem2, reviews: 215, category: 'popular', rank: 2 },
  { id: 'p3', name: "실루엣 블라우스", price: "52,000원", image: IMAGES.productBlouse, reviews: 188, category: 'popular', rank: 3 },
  { id: 'p4', name: "클래식 슬랙스", price: "59,000원", image: IMAGES.productSlacks, reviews: 156, category: 'popular', rank: 4 },

  // Recommended
  { id: 'r1', name: "데일리 오브제 세트", price: "39,000원", image: IMAGES.recItem1, reviews: 88, category: 'recommended' },
  { id: 'r2', name: "소프트 가디건", price: "89,000원", image: IMAGES.recItem2, reviews: 124, category: 'recommended' },
  { id: 'r3', name: "내추럴 스카프", price: "32,000원", image: IMAGES.newScarf, reviews: 45, category: 'recommended' },
  { id: 'r4', name: "에디토리얼 백", price: "158,000원", image: IMAGES.newBag, reviews: 67, category: 'recommended' },
];

export const getProductById = (id) => ALL_PRODUCTS.find(p => p.id === id);
