import { IMAGES } from './images';

export const ALL_PRODUCTS = [
  // Best 50 Items
  { id: 'b1', name: "데일리 리넨 셔츠", price: "45,000원", image: IMAGES.productLinenShirt, reviews: 128, category: 'best', rank: 1 },
  { id: 'b2', name: "클래식 슬랙스", price: "59,000원", image: IMAGES.productSlacks, reviews: 85, category: 'best', rank: 2 },
  { id: 'b3', name: "실루엣 블라우스", price: "52,000원", image: IMAGES.productBlouse, reviews: 210, category: 'best', rank: 3 },
  { id: 'b4', name: "서머 브리즈 원피스", price: "78,000원", image: IMAGES.productDress, reviews: 54, category: 'best', rank: 4 },
  { id: 'b5', name: "오버핏 린넨 자켓", price: "129,000원", image: IMAGES.newJacket, reviews: 42, category: 'best', rank: 5 },
  { id: 'b6', name: "내추럴 실크 스카프", price: "32,000원", image: IMAGES.newScarf, reviews: 15, category: 'best', rank: 6 },
  { id: 'b7', name: "플리츠 미디 스커트", price: "65,000원", image: IMAGES.newSkirt, reviews: 92, category: 'best', rank: 7 },
  { id: 'b8', name: "에디토리얼 레더 백", price: "158,000원", image: IMAGES.newBag, reviews: 33, category: 'best', rank: 8 },

  // New In Items
  { id: 'n1', name: "모던 셋업 수트", price: "185,000원", originalPrice: "210,000원", discount: "5%", image: IMAGES.newJacket, reviews: 12, category: 'new' },
  { id: 'n2', name: "실크 레이스 블라우스", price: "68,000원", originalPrice: "72,000원", discount: "5%", image: IMAGES.newScarf, reviews: 45, category: 'new' },
  { id: 'n3', name: "플리츠 니트 스커트", price: "54,000원", originalPrice: "57,000원", discount: "5%", image: IMAGES.newSkirt, reviews: 28, category: 'new' },
  { id: 'n4', name: "미니멀 가죽 백", price: "142,000원", originalPrice: "150,000원", discount: "5%", image: IMAGES.newBag, reviews: 19, category: 'new' },
  { id: 'n5', name: "에센셜 티셔츠", price: "24,000원", originalPrice: "26,000원", discount: "5%", image: IMAGES.productLinenShirt, reviews: 156, category: 'new' },
  { id: 'n6', name: "와이드 코튼 팬츠", price: "48,000원", originalPrice: "51,000원", discount: "5%", image: IMAGES.productSlacks, reviews: 67, category: 'new' },

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
