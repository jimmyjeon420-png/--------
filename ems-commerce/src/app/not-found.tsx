export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8 text-gray-600">찾을 수 없는 페이지입니다.</p>
        <a
          href="/"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          홈으로 돌아가기
        </a>
      </div>
    </div>
  );
}
