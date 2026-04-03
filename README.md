# pepi-i Fashion E-commerce Mall

일상의 특별함을 제안하는 프리미엄 패션 셀렉트 샵, **늘:pepi-i**의 프론트엔드 프로젝트입니다. 피그마 디자인을 바탕으로 현대적이고 세련된 사용자 경험을 제공하도록 구현되었습니다.

## 🚀 기술 스택

- **Framework:** React (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router DOM
- **Icons:** Lucide React & Custom Figma Assets
- **Deployment:** Vite

## ✨ 주요 기능 및 특징

### 1. 세련된 애니메이션
- **Hero Slider:** 6장의 고화질 이미지가 자동으로 가로 전환되며, 텍스트에 세련된 페이드인 효과가 적용된 메인 배너.
- **Infinite Scroll:** 'New In' 섹션과 'Best Reviews' 섹션에 끊김 없이 흐르는 무한 가로 스크롤 애니메이션 구현.
- **Hover Effects:** 모든 상품 카드와 아이콘에 부드러운 이미지 확대 및 그림자 효과 적용.

### 2. 페이지 라우팅 및 동적 UI
- **Dynamic Header:** 홈 페이지와 상세 페이지(회사소개)의 디자인이 서로 다른 헤더를 경로에 따라 자동으로 전환.
- **About Page:** 브랜드 스토리, 타임라인, 아틀리에 위치 정보 등을 담은 상세 페이지 구현.
- **Responsive Design:** 다양한 화면 크기에 대응하는 유연한 레이아웃.

### 3. 체계적인 에셋 관리
- **Constants:** 모든 이미지와 아이콘을 `src/constants/images.js`와 `icons.js`로 분리하여 관리.
- **Naming:** 의미 있는 명명 규칙을 통해 코드 가독성과 재사용성 극대화.

## 📁 프로젝트 구조

```text
Front/
├── src/
│   ├── components/
│   │   ├── common/       # Header, Footer, Layout 등 공통 컴포넌트
│   │   └── home/         # Home 페이지 전용 섹션 컴포넌트
│   ├── pages/            # Home, About 등 페이지 단위 컴포넌트
│   ├── constants/        # images.js, icons.js (에셋 관리)
│   ├── App.jsx           # 라우팅 설정
│   └── index.css         # 글로벌 스타일 및 커스텀 애니메이션
├── package.json
└── tailwind.config.js
```

## 🛠 설치 및 실행 방법

1. **의존성 설치**
   ```bash
   cd Front
   npm install
   ```

2. **개발 서버 실행**
   ```bash
   npm run dev
   ```

3. **빌드**
   ```bash
   npm run build
   ```

---
© 2026 늘:pepi-i. All rights reserved.
