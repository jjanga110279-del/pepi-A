import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/common/Layout';

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center py-20">
        <h1 className="text-8xl md:text-9xl font-logo font-black italic text-[#dc2626] mb-4 select-none opacity-20">
          404
        </h1>
        
        <div className="space-y-4 mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
            요청하신 페이지가 삭제되었거나, 주소가 변경되어 찾을 수 없습니다.<br className="hidden md:block" />
            입력하신 주소가 정확한지 다시 한번 확인해 주세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mx-auto">
          <Link
            to="/"
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-full font-bold transition-colors"
          >
            홈으로 이동
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex-1 border border-gray-200 hover:bg-gray-50 text-gray-600 py-4 rounded-full font-bold transition-colors"
          >
            이전 페이지
          </button>
        </div>

        <div className="mt-16 text-sm text-gray-400 font-logo italic">
          늘:pepi-i
        </div>
      </div>
    </Layout>
  );
}
