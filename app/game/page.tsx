'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// 임시 데이터 (실제로는 상수 파일로 분리하는 것이 좋습니다)
const ICECREAM_DATA = [
  { id: 1, name: '바닐라', image: 'https://via.placeholder.com/400/FFFFF0/000000?text=Vanilla' },
  { id: 2, name: '초콜릿', image: 'https://via.placeholder.com/400/5A3A22/FFFFFF?text=Chocolate' },
  { id: 3, name: '딸기', image: 'https://via.placeholder.com/400/FFB6C1/000000?text=Strawberry' },
  { id: 4, name: '민트초코', image: 'https://via.placeholder.com/400/98FF98/000000?text=MintChoco' },
  // 더 많은 아이스크림 추가 가능
];

export default function GamePage() {
  const router = useRouter();
  const [currentRound, setCurrentRound] = useState(1);
  const [candidates, setCandidates] = useState(ICECREAM_DATA);
  const [winners, setWinners] = useState<typeof ICECREAM_DATA>([]);

  // 현재 라운드의 두 후보 선택
  const currentPair = candidates.slice(0, 2);

  const handleSelect = (selected: typeof ICECREAM_DATA[0]) => {
    const newWinners = [...winners, selected];
    
    // 현재 라운드의 후보들을 제거
    const remainingCandidates = candidates.slice(2);

    if (remainingCandidates.length === 0) {
      if (newWinners.length === 1) {
        // 최종 우승자가 결정되면 결과 페이지로 이동
        router.push(`/result?winner=${selected.id}`);
      } else {
        // 다음 라운드 준비
        setCurrentRound(currentRound + 1);
        setCandidates(newWinners);
        setWinners([]);
      }
    } else {
      setCandidates(remainingCandidates);
      setWinners(newWinners);
    }
  };

  return (
    <div className="min-h-screen p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-8">글라쇼 월드컵 {currentRound}라운드</h1>
      
      <div className="flex flex-col sm:flex-row gap-8 justify-center items-center w-full max-w-4xl">
        {currentPair.map((icecream) => (
          <button
            key={icecream.id}
            onClick={() => handleSelect(icecream)}
            className="w-full sm:w-1/2 max-w-sm p-4 rounded-lg border hover:border-blue-500 transition-colors"
          >
            <div className="relative w-full aspect-square mb-4">
              <Image
                src={icecream.image}
                alt={icecream.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-semibold text-center">{icecream.name}</h2>
          </button>
        ))}
      </div>
    </div>
  );
}
