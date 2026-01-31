'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

export default function BrandPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="h-14 bg-white border-b border-gray-100 flex items-center sticky top-0 z-50">
        <div className="container flex items-center justify-between">
          <h1 className="text-xl font-bold">EMS Beauty</h1>
        </div>
      </div>

      {/* 브랜드 소개 영역 */}
      <div className="container py-16 md:py-24">
        {/* 브랜드 로고 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="relative w-32 h-32 mx-auto mb-8">
            <Image
              src="/images/brand.jpg"
              alt="EMS Beauty 브랜드 로고"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">EMS Beauty</h1>
          <p className="text-lg text-gray-600 font-light">
            Refresh Your Life
          </p>
        </motion.div>

        {/* 브랜드 철학 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-20"
        >
          <div className="bg-gradient-to-b from-green-50 to-white rounded-2xl border border-green-100 p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-green-900">
              햇살 아래 자라는 나뭇잎처럼
            </h2>
            <p className="text-gray-700 leading-relaxed mb-6">
              현대인의 지친 일상에서 순간의 휴식과 활력을 되찾는 것이 우리의 목표입니다.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              햇살 아래 자라는 나뭇잎처럼 신선하고 생기 있게, 지친 몸과 마음을 다시 깨어나게 하는
              <span className="font-semibold"> Fresh한 경험</span>을 선사합니다.
            </p>
            <p className="text-gray-700 leading-relaxed">
              EMS Beauty는 단순한 제품이 아닌,
              <span className="font-semibold"> 일상 속 재충전의 순간</span>을 만들어가는 브랜드입니다.
            </p>
          </div>
        </motion.div>

        {/* 핵심 가치 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            우리의 가치
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* 가치 1: 휴대성 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">휴대성</h3>
              <p className="text-gray-600 leading-relaxed">
                언제 어디서나 간편하게 사용 가능한
                휴대용 사이즈. 직장, 집, 여행에서
                언제든지 당신의 건강 관리 파트너입니다.
              </p>
            </motion.div>

            {/* 가치 2: 신선함 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">신선함 (Fresh)</h3>
              <p className="text-gray-600 leading-relaxed">
                지친 하루를 마치고 순간의 휴식으로
                몸과 마음을 refresh 해보세요.
                활력 넘치는 내일을 위한 준비,
                EMS Beauty와 함께하세요.
              </p>
            </motion.div>

            {/* 가치 3: 신뢰성 */}
            <motion.div
              whileHover={{ y: -10 }}
              className="text-center"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-3">신뢰성</h3>
              <p className="text-gray-600 leading-relaxed">
                검증된 EMS 기술을 소형화하여
                프로페셔널한 마사지를 집에서도 경험하세요.
                품질과 효과에 대한 약속을 드립니다.
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* 제품 소개 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            EMS Recovery Patch
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 제품 이미지 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-96"
            >
              <Image
                src="/images/product_01.jpg"
                alt="EMS Mini Pad"
                fill
                className="object-cover rounded-2xl"
              />
            </motion.div>

            {/* 제품 설명 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-bold mb-6">
                Muscle Healing Solution
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-green-700 mb-2">
                    💪 Stimulate Muscle Healing
                  </h4>
                  <p className="text-gray-700">
                    Advanced EMS technology stimulates muscle fibers and promotes
                    natural healing. Provide relief and recovery where you need it most.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 mb-2">
                    🔄 Promote Blood Circulation
                  </h4>
                  <p className="text-gray-700">
                    Electrical muscle stimulation enhances blood flow to affected areas,
                    speeding up tissue repair in the shortest time.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 mb-2">
                    🎯 Universal for All Body Parts
                  </h4>
                  <p className="text-gray-700">
                    Recommended for neck, shoulder, arm, leg, knee and more.
                    Apply where it works. No limits on application areas.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-green-700 mb-2">
                    ⏱️ Quick Results
                  </h4>
                  <p className="text-gray-700">
                    Reduce pain and discomfort fast. Experience relief in minutes.
                    Perfect for daily use - at work, at home, or on the go.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* CTA 섹션 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-12 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Fresh한 일상, 지금 시작하세요
          </h2>
          <p className="text-lg mb-8 opacity-90">
            햇살 아래 자라는 나뭇잎처럼, 생기 있는 하루를 위해
          </p>
          <a
            href="/"
            className="inline-block bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
          >
            지금 구매하기
          </a>
        </motion.div>
      </div>

      {/* 푸터 */}
      <div className="bg-gray-900 text-white py-12 mt-20">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-lg mb-4">EMS Beauty</h3>
              <p className="text-gray-400 text-sm">
                일상 속 휴식과 활력을 선사하는
                EMS 마사지 제품의 선두주자
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">고객센터</h4>
              <ul className="text-gray-400 text-sm space-y-2">
                <li><a href="#" className="hover:text-white">문의하기</a></li>
                <li><a href="#" className="hover:text-white">배송 조회</a></li>
                <li><a href="#" className="hover:text-white">환불/교환</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">법인정보</h4>
              <p className="text-gray-400 text-sm">
                © 2024 EMS Beauty. All rights reserved.
              </p>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400 text-sm">
            <p>Refresh Your Life with EMS Beauty</p>
          </div>
        </div>
      </div>
    </div>
  );
}
