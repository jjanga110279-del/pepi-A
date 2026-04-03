import { 
  FaStar, 
  FaArrowRight, 
  FaChevronLeft, 
  FaChevronRight, 
  FaHeart, 
  FaRegHeart,
  FaEllipsisH, 
  FaEllipsisV, 
  FaUser, 
  FaSearch, 
  FaShoppingCart, 
  FaArrowLeft, 
  FaMapMarkerAlt, 
  FaClock, 
  FaMap,
  FaCreditCard,
  FaLandmark,
  FaPiggyBank,
  FaWallet,
  FaMobileAlt,
  FaTshirt,
  FaFemale,
  FaGem,
  FaComment,
  FaExternalLinkAlt
} from 'react-icons/fa';
import { FiHome, FiLayers, FiGrid, FiWind } from 'react-icons/fi';
import { 
  GiLargeDress, 
  GiTrousers, 
  GiBigDiamondRing, 
  GiTShirt
} from 'react-icons/gi';
import { MdOutlineDryCleaning } from 'react-icons/md';

export const ICONS = {
  star: FaStar,
  starReview: FaStar,
  
  arrowRight: FaArrowRight,
  chevronLeft: FaChevronLeft,
  chevronRight: FaChevronRight,
  heart: FaRegHeart,
  heartFilled: FaHeart,
  heartOutline: FaRegHeart,
  
  moreHorizontal: FaEllipsisH,
  moreVertical: FaEllipsisV,
  
  // Header Icons
  user: FaUser,
  wishlist: FaRegHeart,
  search: FaSearch,
  cart: FaShoppingCart,

  // About Page Navigation & Info
  home: FiHome,
  backArrow: FaArrowLeft,
  locationPin: FaMapMarkerAlt,
  clock: FaClock,
  googleMap: FaMap,

  // Categories (Used in NewIn.jsx)
  all: FiGrid,
  outer: MdOutlineDryCleaning,
  top: GiTShirt,
  bottom: GiTrousers,
  dress: GiLargeDress,
  set: FiLayers,
  acc: GiBigDiamondRing,

  // Outer Sub-categories
  jacket: MdOutlineDryCleaning,
  coat: MdOutlineDryCleaning,
  jumper: FiWind,
  cardigan: GiTShirt,

  // Top Sub-categories
  sleeveless: FaFemale,
  tshirt: GiTShirt,
  knit: GiTShirt,
  blouse: FaFemale,

  // Bottom Sub-categories
  slacks: GiTrousers,
  denim: GiTrousers,
  skirt: FaFemale,
  pants: GiTrousers,

  // Dress Sub-categories
  mini: GiLargeDress,
  midi: GiLargeDress,
  long: GiLargeDress,
  jumpsuit: FaFemale,

  // Set Sub-categories
  knitSet: FiLayers,
  pantsSet: FiLayers,
  skirtSet: FiLayers,
  sleevelessSet: FiLayers,

  // Payment Icons
  creditCard: FaCreditCard,
  landmark: FaLandmark,
  piggyBank: FaPiggyBank,
  kakaoPay: FaComment,
  naverPay: FaExternalLinkAlt,
  others: FaEllipsisH,
};
