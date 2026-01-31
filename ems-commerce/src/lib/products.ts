// 제품 데이터 타입 정의
export interface Product {
  id: string
  slug: string
  name: string
  nameEn: string
  price: number
  originalPrice?: number
  description: string
  shortDescription: string
  features: ProductFeature[]
  specs: ProductSpec[]
  images: string[]
  category: "body" | "face" | "accessory"
  badge?: string
  inStock: boolean
}

export interface ProductFeature {
  title: string
  description: string
  icon: "wave" | "weight" | "battery" | "waterproof" | "smart" | "portable"
}

export interface ProductSpec {
  label: string
  value: string
}

// 제품 데이터
export const products: Product[] = [
  {
    id: "refrehae-body-pro",
    slug: "body-pro",
    name: "리프레해 바디 프로",
    nameEn: "Refrehae Body Pro",
    price: 298000,
    originalPrice: 398000,
    description: "전문가급 EMS 테크놀로지를 담은 바디 케어 디바이스. 6가지 전용 모드와 20단계 강도 조절로 일상의 회복을 경험하세요. 인체공학적 디자인과 무선 충전 기능으로 언제 어디서나 편리하게 사용할 수 있습니다.",
    shortDescription: "전문가급 바디 케어를 위한 프리미엄 EMS 디바이스",
    features: [
      {
        title: "저주파 마이크로 커런트",
        description: "0.5Hz~100Hz 범위의 정밀한 자극으로 근육 깊숙이 전달",
        icon: "wave"
      },
      {
        title: "초경량 설계",
        description: "단 180g의 초경량 바디로 장시간 사용에도 부담 없는 착용감",
        icon: "weight"
      },
      {
        title: "올데이 배터리",
        description: "한 번 충전으로 최대 15회 사용 가능한 고효율 배터리",
        icon: "battery"
      },
      {
        title: "생활 방수 설계",
        description: "IPX5 등급의 방수 설계로 땀이나 물기에도 안심",
        icon: "waterproof"
      }
    ],
    specs: [
      { label: "제품 크기", value: "165 x 85 x 25mm" },
      { label: "제품 무게", value: "180g" },
      { label: "배터리 용량", value: "2,000mAh" },
      { label: "충전 시간", value: "약 2시간" },
      { label: "방수 등급", value: "IPX5" },
      { label: "주파수 범위", value: "0.5Hz ~ 100Hz" },
      { label: "강도 조절", value: "20단계" },
      { label: "모드", value: "6가지 전용 모드" }
    ],
    images: ["/products/body-pro-1.jpg", "/products/body-pro-2.jpg"],
    category: "body",
    badge: "BEST",
    inStock: true
  },
  {
    id: "refrehae-face-mini",
    slug: "face-mini",
    name: "리프레해 페이스 미니",
    nameEn: "Refrehae Face Mini",
    price: 198000,
    originalPrice: 258000,
    description: "섬세한 얼굴 라인을 위한 컴팩트 EMS 디바이스. 미세 전류 기술로 자연스러운 리프팅 효과를 경험하세요. 휴대하기 편한 사이즈로 여행 중에도 스킨케어 루틴을 유지할 수 있습니다.",
    shortDescription: "섬세한 페이셜 케어를 위한 컴팩트 EMS",
    features: [
      {
        title: "마이크로 커런트",
        description: "피부 자극 최소화를 위한 초미세 전류 기술",
        icon: "wave"
      },
      {
        title: "포켓 사이즈",
        description: "손 안에 쏙 들어오는 85g 초소형 디자인",
        icon: "portable"
      },
      {
        title: "스마트 센서",
        description: "피부 접촉을 감지하는 자동 온/오프 센서",
        icon: "smart"
      },
      {
        title: "USB-C 충전",
        description: "범용 USB-C 포트로 어디서든 간편 충전",
        icon: "battery"
      }
    ],
    specs: [
      { label: "제품 크기", value: "95 x 45 x 20mm" },
      { label: "제품 무게", value: "85g" },
      { label: "배터리 용량", value: "800mAh" },
      { label: "충전 시간", value: "약 1시간" },
      { label: "주파수 범위", value: "0.1Hz ~ 50Hz" },
      { label: "강도 조절", value: "10단계" },
      { label: "모드", value: "4가지 전용 모드" }
    ],
    images: ["/products/face-mini-1.jpg", "/products/face-mini-2.jpg"],
    category: "face",
    badge: "NEW",
    inStock: true
  },
  {
    id: "refrehae-gel-pad",
    slug: "gel-pad",
    name: "전용 젤 패드 세트",
    nameEn: "Premium Gel Pad Set",
    price: 28000,
    description: "리프레해 디바이스 전용 교체형 젤 패드. 피부 자극을 최소화하는 의료용 실리콘 소재로 안전하고 효과적인 EMS 전달을 보장합니다. 약 30회 사용 후 교체를 권장합니다.",
    shortDescription: "안전한 사용을 위한 교체형 젤 패드",
    features: [
      {
        title: "의료용 실리콘",
        description: "피부 자극 테스트를 통과한 안전한 소재",
        icon: "smart"
      },
      {
        title: "강력한 접착력",
        description: "반복 사용에도 유지되는 접착력",
        icon: "portable"
      }
    ],
    specs: [
      { label: "구성", value: "대형 2매 + 소형 4매" },
      { label: "소재", value: "의료용 실리콘 젤" },
      { label: "권장 사용 횟수", value: "약 30회" }
    ],
    images: ["/products/gel-pad-1.jpg"],
    category: "accessory",
    inStock: true
  }
]

// 제품 조회 함수
export function getProduct(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProducts(): Product[] {
  return products
}

export function getProductsByCategory(category: Product["category"]): Product[] {
  return products.filter(p => p.category === category)
}

// 가격 포맷팅
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("ko-KR").format(price) + "원"
}
