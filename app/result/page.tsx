'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// 임시 데이터 (game/page.tsx와 동일한 데이터를 사용해야 합니다)
const ICECREAM_DATA = [
  { id: 1, name: '바닐라', image: 'https://via.placeholder.com/400/FFFFF0/000000?text=Vanilla' },
  { id: 2, name: '초콜릿', image: 'https://via.placeholder.com/400/5A3A22/FFFFFF?text=Chocolate' },
  { id: 3, name: '딸기', image: 'https://via.placeholder.com/400/FFB6C1/000000?text=Strawberry' },
  { id: 4, name: '민트초코', image: 'https://via.placeholder.com/400/98FF98/000000?text=MintChoco' },
];

export default function ResultPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const winnerId = Number(searchParams.get('winner'));
  
  const winner = ICECREAM_DATA.find(ice => ice.id === winnerId);

  if (!winner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">결과를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const handleRestart = () => {
    router.push('/game');
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: '글라쇼 월드컵 결과',
        text: `내가 선택한 최고의 아이스크림은 "${winner.name}"입니다!`,
        url: window.location.href,
      });
    } catch (error) {
      console.log('공유하기가 지원되지 않거나 취소되었습니다.');
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">당신의 최애 아이스크림</h1>
      
      <div className="w-full max-w-md p-6 rounded-lg border">
        <div className="relative w-full aspect-square mb-6">
          <Image
            src={winner.image}
            alt={winner.name}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-8">{winner.name}</h2>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={handleRestart}
            className="w-full py-3 px-6 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            다시하기
          </button>
          
          <button
            onClick={handleShare}
            className="w-full py-3 px-6 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            결과 공유하기
          </button>
        </div>
      </div>
    </div>
  );
}
