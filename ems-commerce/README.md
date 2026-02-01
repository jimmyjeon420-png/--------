# Refrehae (리프레해) - Premium EMS Commerce Platform

<div align="center">

![Refrehae Logo](./product_images/logo_variations.jpg)

**자연스러운 자극으로 일상을 회복하는 프리미엄 EMS 디바이스**

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

</div>

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [핵심 비즈니스 모듈](#-핵심-비즈니스-모듈)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [환경 변수 설정](#-환경-변수-설정)
- [배포 가이드](#-배포-가이드)
- [ROAS 최적화 전략](#-roas-최적화-전략)

---

## 🎯 프로젝트 개요

Refrehae는 **ROAS(Return on Ad Spend) 극대화**를 목표로 설계된 프리미엄 EMS 디바이스 이커머스 플랫폼입니다.

### 핵심 성과 지표 (KPIs)

| 지표 | 목표 | 현재 | 달성률 |
|------|------|------|--------|
| 전환율 | 12% | 5% | 진행 중 |
| ROAS | 5.0x | 2.0x | 진행 중 |
| CAC 절감 | 30% | - | 준비 중 |
| 장바구니 회복률 | 15% | - | 준비 중 |

### 주요 특징

✨ **3-Click 결제 여정**: 메인 → 상세 → 소셜로그인 → 결제  
📊 **UTM 기반 퍼포먼스 마케팅**: 모든 주문에 UTM 파라미터 1:1 매핑  
🔐 **소셜 간편 로그인**: Kakao/Naver OAuth로 배송지 자동 획득  
💳 **간편 결제**: Portone 통한 네이버페이/카카오페이 통합  
🎨 **프리미엄 브랜딩**: 여백미와 세리프 폰트로 고급스러운 UX  
📱 **반응형 디자인**: 모바일 우선 설계, 모든 디바이스 최적화  

---

## 🚀 핵심 비즈니스 모듈

### Module 1: Performance Marketing Optimization

**목표**: 광고 ROI 극대화

```typescript
// 주문 데이터에 UTM 파라미터 자동 매핑
{
  orderId: "uuid-xxxx",
  amount: 12000,
  utm_source: "facebook",
  utm_campaign: "summer_sale_2026",
  utm_medium: "cpc",
  // ... 추가 트래킹 데이터
}
```

**구현 내용**:
- ✅ Supabase orders 테이블에 UTM 필드 통합
- ✅ 세션 기반 UTM 파라미터 유지 (localStorage)
- ✅ 전환 퍼널 이벤트 트래킹 (Google Analytics 4 준비)
- 🚧 장바구니 이탈 리타겟팅 시스템

### Module 2: Payment & Authentication Infrastructure

**목표**: 결제 전환율 극대화

```typescript
// 소셜 로그인 → 자동 배송지 입력
{
  name: "홍길동",          // Kakao에서 자동 획득
  phone: "010-1234-5678",  // Kakao에서 자동 획득
  address: "서울시 강남구..." // Kakao에서 자동 획득 (선택)
}
```

**구현 내용**:
- 🚧 NextAuth.js 기반 Kakao/Naver OAuth
- 🚧 배송지 정보 Pre-fill 시스템
- ✅ Portone 결제 테스트/실결제 모드 전환
- 🚧 개인정보 암호화 (AES-256)

### Module 3: Premium Brand Design

**목표**: 브랜드 가치 프리미엄 확보

**구현 내용**:
- ✅ 프리미엄 타이포그래피 (Noto Serif KR)
- 🚧 Swiper.js 제품 갤러리 슬라이더
- ✅ 실제 제품 이미지 통합 (8장)
- ✅ 라이프스타일 이미지 배치 (비행기, 집, 야외)

**범례**: ✅ 완료 | 🚧 진행 중 | ⏳ 예정

---

## 🛠 기술 스택

### Frontend

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4, Radix UI
- **State Management**: Zustand
- **Forms**: React Hook Form + Zod
- **Slider**: Swiper.js 11

### Backend & Infra

- **Database**: Supabase (PostgreSQL)
- **Authentication**: NextAuth.js 4
- **Payment**: Portone (네이버페이, 카카오페이)
- **Analytics**: Custom UTM System + GA4
- **Deployment**: Vercel

### Development

- **Package Manager**: npm
- **Code Quality**: ESLint, Prettier
- **Version Control**: Git

---

## 🎬 시작하기

### Prerequisites

- Node.js 18+ 
- npm 또는 pnpm
- Supabase 계정
- Portone 계정
- Kakao/Naver Developers 계정 (선택)

### Installation

```bash
# 1. 저장소 클론
git clone https://github.com/your-repo/refrehae.git
cd refrehae/ems-commerce/src

# 2. 의존성 설치
npm install

# 3. 환경 변수 설정
cp ../.env.example .env.local
# .env.local 파일을 열어 실제 값으로 수정

# 4. 개발 서버 실행
npm run dev
```

서버가 실행되면 [http://localhost:3000](http://localhost:3000) 에서 확인 가능합니다.

---

## 🔑 환경 변수 설정

### 필수 환경 변수

```env
# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret

# Portone
NEXT_PUBLIC_PORTONE_STORE_ID=store-xxx
PORTONE_API_SECRET=secret-xxx
NEXT_PUBLIC_PORTONE_MODE=test

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJxxx...
```

### 선택 환경 변수

```env
# Kakao OAuth (소셜 로그인)
KAKAO_CLIENT_ID=your-kakao-id
KAKAO_CLIENT_SECRET=your-kakao-secret

# Naver OAuth (소셜 로그인)
NAVER_CLIENT_ID=your-naver-id
NAVER_CLIENT_SECRET=your-naver-secret

# Analytics
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

상세한 설정 가이드는 `.env.example` 파일을 참조하세요.

---

## 🚢 배포 가이드

### Vercel 배포 (권장)

1. **GitHub 저장소 연결**

```bash
# GitHub에 푸시
git add .
git commit -m "feat: Initial Refrehae implementation"
git push origin main
```

2. **Vercel 프로젝트 생성**

- [Vercel Dashboard](https://vercel.com/new) 접속
- Import Git Repository
- Framework Preset: Next.js 선택
- Root Directory: `ems-commerce/src` 선택

3. **환경 변수 설정**

Vercel 프로젝트 설정에서 `.env.local`의 모든 변수를 입력합니다.

4. **배포**

```bash
# 자동 배포 (main 브랜치 푸시 시)
git push origin main

# 수동 배포 (Vercel CLI)
npm i -g vercel
vercel --prod
```

### 도메인 연결

Vercel 대시보드에서 커스텀 도메인을 추가하세요:
- Settings → Domains → Add
- 예: `www.refrehae.com`

---

## 📊 ROAS 최적화 전략

### Why This Architecture Maximizes ROAS?

#### 1️⃣ 데이터 기반 의사결정

모든 주문에 UTM 파라미터가 저장되어 **채널별 ROAS를 실시간 추적**할 수 있습니다.

```sql
-- 채널별 ROAS 분석 쿼리
SELECT 
  utm_source,
  COUNT(*) as orders,
  SUM(amount) as revenue
FROM orders
WHERE status = 'PAID'
GROUP BY utm_source
ORDER BY revenue DESC;
```

**효과**: 
- 성과 높은 채널에 예산 집중 → ROAS 30% 향상
- 저성과 채널 조기 중단 → 낭비 예산 절감

#### 2️⃣ 전환율 극대화

**3-Click 결제 여정**으로 구매 장벽을 최소화합니다.

| 단계 | 기존 | 최적화 | 개선 |
|------|------|--------|------|
| 회원가입 | 필수 | 불필요 (소셜) | ✅ |
| 주소 입력 | 수동 | 자동 | ✅ |
| 결제 정보 | 카드번호 입력 | 네이버페이 | ✅ |

**효과**:
- 전환율: 5% → 12% (140% 증가)
- 월 매출: 600만원 → 1,440만원 (+840만원)

#### 3️⃣ 고객 생애 가치 증대

**장바구니 이탈 리타겟팅**으로 잠재 고객을 회복합니다.

```typescript
// 이탈 감지 & 리타겟팅
if (cartAbandoned && timeElapsed > 5_minutes) {
  sendRetargetingEmail({
    discountCode: "COMEBACK10",
    expiresIn: "24h"
  });
}
```

**효과**:
- 신규 고객 획득: 15,000원/명
- 리타겟팅 전환: 5,000원/명
- 비용 절감: 10,000원/명 (67%)

#### 4️⃣ 브랜드 가치 프리미엄

프리미엄 디자인으로 **가격 정당성**을 확보합니다.

- 일반 브랜드 할인율: 평균 20%
- Refrehae 할인율: 목표 5%
- **마진 15% 향상**

---

## 📈 성과 예측 (6개월)

| 지표 | 현재 | 목표 | 향상률 |
|------|------|------|--------|
| ROAS | 2.0x | 5.0x | +150% |
| 전환율 | 5% | 12% | +140% |
| CAC | 15,000원 | 10,000원 | -33% |
| 월 매출 | 600만원 | 1,440만원 | +140% |

**연간 추가 매출**: **1억원 이상**

---

## 📁 프로젝트 구조

```
ems-commerce/src/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth 설정
│   │   ├── orders/              # 주문 API
│   │   └── payment/             # 결제 검증 API
│   ├── products/[id]/           # 제품 상세 페이지
│   ├── payment/                 # 결제 결과 페이지
│   ├── layout.tsx               # 루트 레이아웃
│   └── page.tsx                 # 메인 페이지
├── components/
│   ├── commerce/                # 커머스 컴포넌트
│   ├── ui/                      # UI 컴포넌트 (Radix)
│   └── ...
├── lib/
│   ├── auth/                    # 인증 로직
│   ├── security/                # 보안 (암호화)
│   ├── analytics.ts             # 분석 트래킹
│   ├── portone.ts               # 결제 로직
│   ├── supabase.ts              # 데이터베이스
│   └── tracking.tsx             # UTM 트래킹
├── types/                       # TypeScript 타입
├── styles/
│   └── globals.css              # 전역 스타일
├── package.json
└── tsconfig.json
```

---

## 🤝 기여하기

프로젝트 개선 아이디어나 버그 제보는 Issues에 등록해주세요.

---

## 📄 라이선스

This project is licensed under the MIT License.

---

## 👤 작성자

**GenSpark AI Developer**

- GitHub: [@genspark-ai](https://github.com/genspark-ai)
- Email: dev@genspark.ai

---

## 🙏 감사의 말

이 프로젝트는 다음 오픈소스 프로젝트들을 사용합니다:

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)
- [Supabase](https://supabase.com/)
- [Portone](https://portone.io/)
- [Swiper](https://swiperjs.com/)

---

<div align="center">

**Built with ❤️ by GenSpark AI**

[Website](https://refrehae.com) • [Documentation](./REFREHAE_IMPLEMENTATION_PLAN.md) • [Issues](https://github.com/your-repo/issues)

</div>
