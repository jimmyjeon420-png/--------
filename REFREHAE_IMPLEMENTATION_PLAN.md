# Refrehae (리프레해) - 프리미엄 EMS 커머스 성장 전략 Implementation Plan

## 🎯 Executive Summary

본 문서는 Refrehae 브랜드의 ROAS(Return on Ad Spend) 극대화를 위한 3대 핵심 비즈니스 모듈 구현 계획을 제시합니다.

### 📊 핵심 성과 지표 (KPIs)

- **목표 전환율**: 3-Click 결제 여정으로 5% → 12% 전환율 달성
- **고객 획득 비용(CAC) 절감**: UTM 기반 채널 최적화로 30% 절감
- **장바구니 이탈 회복률**: 리타겟팅으로 15% 회복

---

## 📦 Module 1: Performance Marketing Optimization (퍼포먼스 마케팅 최적화)

### 1.1 UTM 파라미터 1:1 매핑 시스템

#### 데이터베이스 스키마
```sql
-- Supabase orders 테이블 (이미 구현됨)
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 제품 정보
  bundle_id VARCHAR(100) NOT NULL,
  bundle_name VARCHAR(200) NOT NULL,
  quantity INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  shipping_fee INTEGER NOT NULL,
  
  -- 고객 정보
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20) NOT NULL,
  customer_address TEXT NOT NULL,
  marketing_consent BOOLEAN DEFAULT FALSE,
  
  -- UTM 트래킹 (핵심 ROAS 최적화 데이터)
  utm_source VARCHAR(100),
  utm_medium VARCHAR(100),
  utm_campaign VARCHAR(100),
  utm_term VARCHAR(100),
  utm_content VARCHAR(100),
  
  -- 결제 정보
  status VARCHAR(20) DEFAULT 'PENDING',
  payment_id VARCHAR(200),
  payment_method VARCHAR(50),
  
  -- 타임스탬프
  created_at TIMESTAMP DEFAULT NOW(),
  paid_at TIMESTAMP,
  
  -- 추가 트래킹 필드 (보강)
  referrer TEXT,
  landing_page TEXT,
  session_id VARCHAR(100),
  events JSONB -- 전환 퍼널 이벤트 저장
);

-- UTM 분석을 위한 인덱스
CREATE INDEX idx_orders_utm_source ON orders(utm_source);
CREATE INDEX idx_orders_utm_campaign ON orders(utm_campaign);
CREATE INDEX idx_orders_created_at ON orders(created_at);
```

#### 비즈니스 로직: ROAS 계산

```typescript
// 채널별 ROAS 계산 쿼리 예시
SELECT 
  utm_source,
  utm_campaign,
  COUNT(*) as total_orders,
  SUM(amount) as total_revenue,
  -- 광고비는 별도 테이블에서 조인
  SUM(amount) / SUM(ad_spend.cost) as ROAS
FROM orders o
LEFT JOIN ad_spend ON o.utm_campaign = ad_spend.campaign_id
WHERE o.status = 'PAID'
  AND o.created_at >= '2026-01-01'
GROUP BY utm_source, utm_campaign
ORDER BY ROAS DESC;
```

### 1.2 3-Click 결제 여정 (Conversion Funnel Optimization)

#### 여정 맵 (Journey Map)

```
1️⃣ 메인 히어로 (Hero Section)
   └─ CTA: "지금 구매하기" → 상세 페이지 이동
   └─ 트래킹: page_view, hero_cta_click

2️⃣ 제품 상세 페이지 (Product Detail)
   └─ 번들 선택 (1ea/3ea/5ea)
   └─ CTA: "주문하기" → 소셜 로그인 프롬프트
   └─ 트래킹: view_item, bundle_selected, initiate_checkout

3️⃣ 소셜 간편 가입/로그인 (Social Auth)
   └─ Kakao/Naver 1-Click 로그인
   └─ 자동: 이름, 연락처, 배송지 Pre-fill
   └─ 트래킹: login_success, form_prefilled

4️⃣ 네이버페이 결제 (Payment)
   └─ Portone 통한 네이버페이/카카오페이
   └─ 트래킹: payment_attempt, payment_success
```

#### 전환율 극대화 전략

1. **마찰 제거 (Friction Reduction)**
   - 회원가입 불필요 (소셜 로그인)
   - 주소 입력 불필요 (자동 획득)
   - 결제 정보 입력 최소화

2. **신뢰 구축 (Trust Building)**
   - 실제 고객 사진 (비행기 내부, 집에서 사용)
   - 프리미엄 브랜딩 (여백미, 세리프 폰트)
   - 명확한 가격 정책 (1ea 9,000원, 3ea 25,000원, 5ea 40,000원)

3. **긴급성 조성 (Urgency)**
   - "재고 있음 · 2-3일 내 발송"
   - 한정 번들 혜택 강조

### 1.3 장바구니 이탈 리타겟팅

#### 이탈 감지 트리거

```typescript
// 이탈 시나리오
1. 번들 선택 후 5분 이상 이탈 → 리마인드 알림
2. 주문서 작성 중 이탈 → 할인 쿠폰 제공
3. 결제 직전 이탈 → 우선 배송 혜택

// 구현: localStorage + 서버 이벤트 로깅
interface AbandonedCart {
  sessionId: string;
  bundleId: string;
  abandonedAt: Date;
  utmParams: UTMParams;
  lastPage: string;
}
```

---

## 🔐 Module 2: Payment & Authentication Infrastructure (결제 및 인증 인프라)

### 2.1 NextAuth 소셜 로그인 설정

#### NextAuth 설정 파일

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const authOptions = {
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "profile_nickname,account_email,phone_number,shipping_address"
        }
      }
    }),
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // 배송지 정보 저장
      if (profile) {
        token.phone = profile.phone_number;
        token.address = profile.address;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.phone = token.phone;
      session.user.address = token.address;
      return session;
    },
  },
};
```

### 2.2 배송지 정보 Pre-fill 시스템

#### 비즈니스 가치
- **전환율 증가**: 입력 필드 0개 → 주문 완료율 2배 향상
- **사용자 경험**: "간편하다"는 인식 → 재구매율 증가

```typescript
// components/commerce/OrderForm.tsx
function OrderForm() {
  const { data: session } = useSession();
  
  // 소셜 로그인 시 자동 Pre-fill
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        phone: session.user.phone || '',
        address: session.user.address || '',
      });
      
      // 트래킹: Pre-fill 성공
      trackEvent('form_prefilled', {
        provider: session.user.provider,
        fields_filled: 3,
      });
    }
  }, [session]);
}
```

### 2.3 Portone 결제 모드 전환

#### 환경 변수 구조

```env
# .env.local

# Portone 설정
NEXT_PUBLIC_PORTONE_STORE_ID=store-xxx-xxx
PORTONE_API_SECRET=secret_xxx

# 테스트 모드 설정
NEXT_PUBLIC_PORTONE_MODE=test # or production
NEXT_PUBLIC_PORTONE_TEST_CHANNEL_KEY=channel-key-test-xxx
NEXT_PUBLIC_PORTONE_PROD_CHANNEL_KEY=channel-key-prod-xxx

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...

# NextAuth
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-secret-key

# Kakao OAuth
KAKAO_CLIENT_ID=xxx
KAKAO_CLIENT_SECRET=xxx

# Naver OAuth
NAVER_CLIENT_ID=xxx
NAVER_CLIENT_SECRET=xxx
```

### 2.4 보안 강화 (Encryption)

```typescript
// lib/security/encryption.ts
import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!;
const IV_LENGTH = 16;

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
}

export function decrypt(text: string): string {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encrypted = parts[1];
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    iv
  );
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}
```

---

## 🎨 Module 3: Premium Brand Design (프리미엄 브랜드 디자인)

### 3.1 디자인 시스템 (Design System)

#### 타이포그래피

```css
/* globals.css */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;700&display=swap');

:root {
  /* Primary Font - Sans Serif */
  --font-sans: 'Noto Sans KR', sans-serif;
  
  /* Secondary Font - Serif for Premium Feel */
  --font-serif: 'Noto Serif KR', serif;
  
  /* Typography Scale */
  --text-xs: 0.75rem;    /* 12px */
  --text-sm: 0.875rem;   /* 14px */
  --text-base: 1rem;     /* 16px */
  --text-lg: 1.125rem;   /* 18px */
  --text-xl: 1.25rem;    /* 20px */
  --text-2xl: 1.5rem;    /* 24px */
  --text-3xl: 1.875rem;  /* 30px */
  --text-4xl: 2.25rem;   /* 36px */
  --text-5xl: 3rem;      /* 48px */
  
  /* Letter Spacing for Premium Feel */
  --tracking-tight: -0.025em;
  --tracking-normal: 0em;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
  --tracking-luxury: 0.3em; /* 럭셔리 브랜드 스타일 */
}

.heading-premium {
  font-family: var(--font-serif);
  font-weight: 300;
  letter-spacing: var(--tracking-luxury);
  line-height: 1.2;
}
```

#### 여백 시스템 (Spacing System)

```css
/* 프리미엄 브랜드의 여백미 */
:root {
  --space-xs: 0.5rem;   /* 8px */
  --space-sm: 1rem;     /* 16px */
  --space-md: 1.5rem;   /* 24px */
  --space-lg: 2rem;     /* 32px */
  --space-xl: 3rem;     /* 48px */
  --space-2xl: 4rem;    /* 64px */
  --space-3xl: 6rem;    /* 96px */
  --space-4xl: 8rem;    /* 128px */
  --space-5xl: 12rem;   /* 192px */
}

/* 섹션 간 여백 (Premium Spacing) */
section {
  padding-top: var(--space-4xl);
  padding-bottom: var(--space-4xl);
}

@media (min-width: 1024px) {
  section {
    padding-top: var(--space-5xl);
    padding-bottom: var(--space-5xl);
  }
}
```

### 3.2 Swiper.js 슬라이더 구현

#### 메인 페이지 히어로 슬라이더

```typescript
// components/hero-swiper.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export function HeroSwiper() {
  const slides = [
    {
      image: '/images/lifestyle_airplane.jpg',
      title: '어디서나 회복의 시간',
      subtitle: '비행 중에도 편안한 근육 관리',
    },
    {
      image: '/images/lifestyle_indoor.jpg',
      title: '일상 속 자연스러운 케어',
      subtitle: '집에서 시작하는 건강한 라이프스타일',
    },
    {
      image: '/images/lifestyle_outdoor.jpg',
      title: '자연과 함께하는 회복',
      subtitle: '야외에서도 편리한 EMS 케어',
    },
  ];

  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      effect="fade"
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      pagination={{ clickable: true }}
      loop={true}
      className="hero-swiper"
    >
      {slides.map((slide, idx) => (
        <SwiperSlide key={idx}>
          <div className="relative h-screen">
            <img 
              src={slide.image} 
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="heading-premium text-5xl mb-4">
                  {slide.title}
                </h1>
                <p className="text-xl tracking-wider">{slide.subtitle}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
```

#### 상세 페이지 제품 갤러리

```typescript
// components/product-gallery.tsx
'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';
import { useState } from 'react';

export function ProductGallery({ images }: { images: string[] }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="space-y-4">
      {/* Main Swiper */}
      <Swiper
        modules={[Navigation, Thumbs]}
        thumbs={{ swiper: thumbsSwiper }}
        navigation
        className="product-main-swiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img 
              src={img} 
              alt={`Product ${idx + 1}`}
              className="w-full h-auto"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnails */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        watchSlidesProgress
        className="product-thumb-swiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <img 
              src={img} 
              alt={`Thumb ${idx + 1}`}
              className="cursor-pointer opacity-60 hover:opacity-100"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
```

### 3.3 실제 제품 이미지 통합

#### 이미지 리소스 맵핑

```
/public/images/
├── logo_variations.jpg        → 로고 배리에이션 (3가지 색상)
├── product_packaging.jpg      → 제품 패키징
├── product_colors.jpg         → 3가지 컬러 제품
├── product_package_detail.jpg → 패키지 디테일
├── lifestyle_airplane.jpg     → 비행기 내부 사용 (프리미엄)
├── lifestyle_home.jpg         → 집에서 사용 (편안함)
├── lifestyle_indoor.jpg       → 실내 요가/명상 (웰니스)
└── lifestyle_outdoor.jpg      → 야외 자연 (힐링)

활용 전략:
- Hero Section: lifestyle_airplane, lifestyle_indoor (고급스러운 첫인상)
- About Section: product_packaging, product_package_detail (제품 신뢰도)
- Product Detail: product_colors, lifestyle scenes (구매 욕구 자극)
```

---

## 📈 ROAS 극대화 비즈니스 로직 분석

### Why This Structure Maximizes ROAS

#### 1. 데이터 기반 의사결정 (Data-Driven Decision Making)

**UTM 1:1 매핑의 파워:**
```
시나리오: 
- Facebook 광고 A 캠페인: 100만원 지출 → 주문 50건 → 매출 450만원 → ROAS 4.5
- Naver 검색 광고 B: 100만원 지출 → 주문 80건 → 매출 720만원 → ROAS 7.2

Action:
→ Naver 검색 광고에 예산 집중
→ Facebook은 리타겟팅 전용으로 전환
→ 전체 ROAS 30% 향상
```

#### 2. 전환율 극대화 (Conversion Rate Optimization)

**3-Click 여정의 심리학:**
```
기존 5-Step 여정:
메인 → 상세 → 회원가입 → 주소입력 → 결제정보입력 → 결제
전환율: 5% (100명 중 5명 구매)

최적화 3-Click 여정:
메인 → 상세 → 소셜로그인(자동입력) → 결제
전환율: 12% (100명 중 12명 구매)

매출 영향:
- 월 방문자 10,000명 기준
- 기존: 500건 × 12,000원 = 600만원
- 최적화: 1,200건 × 12,000원 = 1,440만원
- 증가: +840만원/월 (+140%)
```

#### 3. 고객 생애 가치 증대 (LTV Increase)

**리타겟팅의 경제학:**
```
신규 고객 획득 비용: 15,000원/명
리타겟팅 고객 전환 비용: 5,000원/명

장바구니 이탈 시나리오:
- 월 1,000명 이탈
- 리타겟팅 15% 전환 → 150명 회복
- 절감 비용: (15,000 - 5,000) × 150 = 150만원/월
- 추가 매출: 150명 × 12,000원 = 180만원/월
```

#### 4. 브랜드 가치 프리미엄 (Brand Premium)

**프리미엄 디자인의 가격 탄력성:**
```
일반 디자인: 9,000원 제품 → 가격 민감도 높음 → 할인 요구
프리미엄 디자인: 9,000원 제품 → 가치 인정 → 정가 구매

비교:
- 일반 브랜드 평균 할인율: 20%
- Refrehae 목표 할인율: 5%
- 동일 매출에서 마진 15% 향상
```

### ROI 계산 시뮬레이션

```typescript
// 월 매출 시뮬레이션
const 월_방문자 = 10000;
const 기존_전환율 = 0.05;
const 최적화_전환율 = 0.12;
const 평균_객단가 = 12000;
const 월_광고비 = 3000000;

// 기존 구조
const 기존_주문 = 월_방문자 * 기존_전환율; // 500건
const 기존_매출 = 기존_주문 * 평균_객단가; // 6,000,000원
const 기존_ROAS = 기존_매출 / 월_광고비; // 2.0

// 최적화 구조
const 최적화_주문 = 월_방문자 * 최적화_전환율; // 1,200건
const 최적화_매출 = 최적화_주문 * 평균_객단가; // 14,400,000원
const 최적화_ROAS = 최적화_매출 / 월_광고비; // 4.8

console.log('ROAS 향상:', 최적화_ROAS - 기존_ROAS); // +2.8 (140% 증가)
```

---

## 🚀 Deployment Checklist

### Pre-Launch

- [ ] 환경 변수 모두 설정 완료
- [ ] Supabase 데이터베이스 마이그레이션
- [ ] Portone 테스트 결제 검증
- [ ] Kakao/Naver OAuth 앱 승인
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 성능 테스트 (Lighthouse Score 90+)

### Launch

- [ ] Vercel 배포
- [ ] 도메인 연결
- [ ] SSL 인증서 확인
- [ ] GA4/Facebook Pixel 설치
- [ ] 모니터링 대시보드 설정

### Post-Launch

- [ ] A/B 테스트 설정
- [ ] 전환 퍼널 분석
- [ ] 주간 ROAS 리포트
- [ ] 고객 피드백 수집

---

## 📚 기술 스택

- **Frontend**: Next.js 16, React 19, TypeScript
- **Styling**: Tailwind CSS 4, Radix UI
- **Authentication**: NextAuth.js (Kakao, Naver)
- **Payment**: Portone (네이버페이, 카카오페이)
- **Database**: Supabase (PostgreSQL)
- **Tracking**: Custom UTM System, GA4, Facebook Pixel
- **Image Slider**: Swiper.js
- **Deployment**: Vercel

---

## 👥 담당자 및 일정

| 모듈 | 담당 | 소요 시간 | 우선순위 |
|------|------|-----------|----------|
| Module 1 (Marketing) | GenSpark AI | 4시간 | 🔴 High |
| Module 2 (Payment) | GenSpark AI | 6시간 | 🔴 High |
| Module 3 (Design) | GenSpark AI | 5시간 | 🟡 Medium |
| Testing & QA | - | 3시간 | 🔴 High |
| **Total** | - | **18시간** | - |

---

## 🎓 결론

이 구조는 단순한 이커머스 사이트가 아닌, **데이터 기반 성장 엔진**입니다.

### 핵심 성공 요인

1. **측정 가능성**: 모든 고객 행동이 UTM과 이벤트로 추적됨
2. **최적화 가능성**: 데이터 기반으로 광고 채널을 실시간 조정
3. **확장 가능성**: 성공 패턴을 다른 제품으로 복제 가능

### 예상 성과 (6개월 기준)

- ROAS: 2.0 → 5.0 (150% 향상)
- 전환율: 5% → 12% (140% 향상)
- CAC: 15,000원 → 10,000원 (33% 절감)
- 월 매출: 600만원 → 1,440만원 (140% 성장)

**Total Impact**: 광고비 대비 매출액 2.5배 증가, 연간 추가 매출 1억원 이상

---

*Document Created by: GenSpark AI Developer*  
*Date: 2026-02-01*  
*Version: 1.0*
