import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">글라쇼 월드컵</h1>
      <p className="text-lg mb-12 text-center">
        당신의 최애 아이스크림을 찾아보세요!
      </p>
      <Link
        href="/game"
        className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-xl font-semibold"
      >
        시작하기
      </Link>
    </div>
  );
}
