'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default function PaymentFailPage() {
  const searchParams = useSearchParams();
  const errorCode = searchParams.get('code');
  const errorMessage = searchParams.get('message');

  useEffect(() => {
    console.log('[결제 실패]', { code: errorCode, message: errorMessage });
  }, [errorCode, errorMessage]);

  const getErrorText = (code: string | null) => {
    const errorMap: Record<string, string> = {
      CANCELLED: '사용자가 결제를 취소했습니다',
      INVALID_REQUEST: '잘못된 결제 요청입니다',
      PAYMENT_FAILED: '결제 처리에 실패했습니다',
      NETWORK_ERROR: '네트워크 오류가 발생했습니다',
      INVALID_AMOUNT: '결제 금액이 올바르지 않습니다',
    };
    return errorMap[code || ''] || '결제 처리 중 오류가 발생했습니다';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* 오류 아이콘 */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-2">결제 실패</h1>
          <p className="text-gray-600">결제 처리가 완료되지 못했습니다</p>
        </div>

        {/* 오류 정보 */}
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-6 mb-6">
          <h2 className="font-semibold mb-4 text-red-600">오류 상세</h2>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-600 mb-1">오류 메시지</p>
              <p className="text-gray-900 font-medium">
                {errorMessage || getErrorText(errorCode)}
              </p>
            </div>
            {errorCode && (
              <div>
                <p className="text-gray-600 mb-1">오류 코드</p>
                <p className="font-mono text-gray-900">{errorCode}</p>
              </div>
            )}
          </div>
        </div>

        {/* 안내 메시지 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-yellow-900">
            💡 결제가 실패했으나 이미 결제된 경우 자동으로 환불 처리됩니다.
            <br />
            환불은 결제 수단에 따라 3~5일이 소요될 수 있습니다.
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="space-y-3">
          <Link href="/" className="block">
            <Button className="w-full bg-red-600 hover:bg-red-700">
              다시 결제하기
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" className="w-full">
              쇼핑 계속하기
            </Button>
          </Link>
        </div>

        {/* FAQ */}
        <div className="mt-12 bg-gray-50 rounded-lg p-6">
          <h3 className="font-semibold mb-4">자주 묻는 질문</h3>
          <div className="space-y-4 text-sm">
            <details className="cursor-pointer">
              <summary className="font-medium text-gray-900 mb-2">
                결제 취소를 원합니다
              </summary>
              <p className="text-gray-600 ml-4">
                결제가 정상 완료되지 않았으므로 추가 조치가 필요하지 않습니다.
                다시 결제하기를 클릭하여 재시도해주세요.
              </p>
            </details>
            <details className="cursor-pointer">
              <summary className="font-medium text-gray-900 mb-2">
                계속 결제 오류가 발생합니다
              </summary>
              <p className="text-gray-600 ml-4">
                다른 결제 수단을 시도해보거나 고객센터로 문의해주세요.
              </p>
            </details>
          </div>
        </div>
      </div>
    </div>
  );
}
