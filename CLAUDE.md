# Refrehae - EMS 젤패드 프리미엄 몰

## 프로젝트 개요
리프레해(Refrehae) EMS 젤패드 전용 온라인 쇼핑몰

## 제품 라인업 (고정)
| 제품명 | 가격 |
|--------|------|
| 리프레해 EMS 젤패드 (1개) | ₩9,000 |
| 리프레해 EMS 젤패드 (3개 세트) | ₩25,000 |
| 리프레해 EMS 젤패드 (5개 세트) | ₩40,000 |

## 기술 스택
- **프레임워크**: Next.js 14 (App Router)
- **언어**: TypeScript
- **스타일링**: Tailwind CSS + 커스텀 세리프 폰트
- **인증/DB**: Supabase
- **결제**: 포트원 (imp86325440) + 카카오페이 테스트 (TC00000004)

## 디자인 가이드
- **배경색**: #0a0a0a (딥 블랙)
- **포인트색**: #c9a962 (골드)
- **폰트**: Cormorant Garamond (영문), Noto Serif KR (한글)
- **스타일**: 프리미엄 미니멀리즘, 넓은 여백, 세리프 타이포그래피

## 이미지 매핑
- 히어로 배경: `/images/modle01.jpg` (비행기 모델)
- 브랜드 소개: `/images/model02.jpg` (제품 들고 있는 모델)
- 라이프스타일: `/images/image01.jpg` (요가/명상)
- 로고: `/images/logo01.jpg`
- 제품 이미지:
  - 1개: `/images/product_01.jpg`
  - 3개 세트: `/images/product_02.jpg`
  - 5개 세트: `/images/product_03.jpg`

## 데이터베이스 (Supabase)
- `orders` 테이블: UTM 트래킹 파라미터 포함
  - utm_source, utm_medium, utm_campaign, utm_term, utm_content

## 결제 설정
```javascript
IMP_UID: 'imp86325440'
PG: 'kakaopay.TC00000004'
```

## 파일 구조
```
app/
├── page.tsx          # 메인 페이지 (히어로, 제품)
├── layout.tsx        # 글로벌 레이아웃
├── globals.css       # 글로벌 스타일
├── checkout/         # 결제 페이지
├── dashboard/        # 마이페이지
└── auth/             # 로그인/회원가입
components/
├── auth-nav.tsx      # 인증 네비게이션
└── cart-icon.tsx     # 장바구니 아이콘
lib/
├── supabase.ts       # Supabase 클라이언트
├── portone.ts        # 포트원 설정
└── types.ts          # TypeScript 타입
```

## 검증 절차
```bash
npm run dev
```
