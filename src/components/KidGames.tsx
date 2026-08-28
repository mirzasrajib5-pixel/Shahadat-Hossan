import React, { useState, useEffect } from 'react';
import { HANGUL_VOWELS, HANGUL_CONSONANTS, VOCABULARY_LIST } from '../data/curriculumData';
import { speakKorean, playPopSound, playSuccessFanfare, playChime, playSoftTap } from '../utils/audio';
import { Sparkles, Trophy, Volume2, RotateCcw, Award, CheckCircle2, HelpCircle, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';

interface KidGamesProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

type GameType = 'bubble' | 'matching' | 'memory' | 'sound_quiz';

export const KidGames: React.FC<KidGamesProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [activeGame, setActiveGame] = useState<GameType>('bubble');

  // Game 1: Bubble Pop State
  const [bubbleTarget, setBubbleTarget] = useState<any>(null);
  const [bubbleOptions, setBubbleOptions] = useState<any[]>([]);
  const [bubbleScore, setBubbleScore] = useState<number>(0);
  const [poppedIds, setPoppedIds] = useState<Set<string>>(new Set());

  // Game 2: Matching State
  const [matchLeftSelected, setMatchLeftSelected] = useState<string | null>(null);
  const [matchRightSelected, setMatchRightSelected] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [matchItems, setMatchItems] = useState<any[]>([]);

  // Game 3: Memory Flip State
  const [memoryCards, setMemoryCards] = useState<any[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedMemoryIndices, setMatchedMemoryIndices] = useState<Set<number>>(new Set());

  // Game 4: Sound Quiz State
  const [quizQuestion, setQuizQuestion] = useState<any>(null);
  const [quizOptions, setQuizOptions] = useState<any[]>([]);
  const [quizScore, setQuizScore] = useState<number>(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | null>(null);

  // Initialize Bubble Pop Round
  const initBubbleRound = () => {
    const pool = [...HANGUL_VOWELS.slice(0, 10), ...HANGUL_CONSONANTS.slice(0, 10), ...VOCABULARY_LIST.slice(0, 10)];
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const target = shuffled[0];
    const choices = shuffled.slice(0, 4).sort(() => 0.5 - Math.random());
    
    if (!choices.find(c => c.id === target.id)) {
      choices[0] = target;
      choices.sort(() => 0.5 - Math.random());
    }

    setBubbleTarget(target);
    setBubbleOptions(choices);
    setPoppedIds(new Set());
    
    setTimeout(() => {
      if (target && 'char' in target && target.char) {
        speakKorean(target.char, speechSpeed);
      } else if (target && 'korean' in target && target.korean) {
        speakKorean(target.korean, speechSpeed);
      }
    }, 400);
  };

  // Initialize Matching Round
  const initMatchingRound = () => {
    const pool = [...VOCABULARY_LIST].sort(() => 0.5 - Math.random()).slice(0, 4);
    setMatchItems(pool);
    setMatchedPairs(new Set());
    setMatchLeftSelected(null);
    setMatchRightSelected(null);
  };

  // Initialize Memory Round
  const initMemoryRound = () => {
    const pool = [...VOCABULARY_LIST].sort(() => 0.5 - Math.random()).slice(0, 4);
    const duplicated = [
      ...pool.map((item, idx) => ({ ...item, uniqueId: `a_${idx}`, isImage: false })),
      ...pool.map((item, idx) => ({ ...item, uniqueId: `b_${idx}`, isImage: true }))
    ].sort(() => 0.5 - Math.random());

    setMemoryCards(duplicated);
    setFlippedIndices([]);
    setMatchedMemoryIndices(new Set());
  };

  // Initialize Sound Quiz
  const initQuizRound = () => {
    const pool = [...VOCABULARY_LIST].sort(() => 0.5 - Math.random());
    const target = pool[0];
    const choices = pool.slice(0, 3).sort(() => 0.5 - Math.random());
    if (!choices.find(c => c.id === target.id)) {
      choices[0] = target;
      choices.sort(() => 0.5 - Math.random());
    }
    setQuizQuestion(target);
    setQuizOptions(choices);
    setQuizFeedback(null);

    setTimeout(() => {
      speakKorean(target.korean, speechSpeed);
    }, 300);
  };

  useEffect(() => {
    if (activeGame === 'bubble') initBubbleRound();
    if (activeGame === 'matching') initMatchingRound();
    if (activeGame === 'memory') initMemoryRound();
    if (activeGame === 'sound_quiz') initQuizRound();
  }, [activeGame]);

  const handleBubbleClick = (item: any) => {
    if (item.id === bubbleTarget.id) {
      playPopSound();
      const nextPopped = new Set(poppedIds).add(item.id);
      setPoppedIds(nextPopped);
      setBubbleScore(s => s + 1);
      onEarnStar(3);

      playSuccessFanfare();
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 }
      });

      setTimeout(() => {
        initBubbleRound();
      }, 1200);
    } else {
      playPopSound();
      speakKorean(item.char || item.korean, speechSpeed);
    }
  };

  const handleMatchClick = (side: 'left' | 'right', id: string) => {
    playPopSound();
    if (side === 'left') {
      setMatchLeftSelected(id);
      if (matchRightSelected) {
        checkMatch(id, matchRightSelected);
      }
    } else {
      setMatchRightSelected(id);
      if (matchLeftSelected) {
        checkMatch(matchLeftSelected, id);
      }
    }
  };

  const checkMatch = (leftId: string, rightId: string) => {
    if (leftId === rightId) {
      playSuccessFanfare();
      const nextMatched = new Set(matchedPairs).add(leftId);
      setMatchedPairs(nextMatched);
      setMatchLeftSelected(null);
      setMatchRightSelected(null);
      onEarnStar(3);

      if (nextMatched.size === matchItems.length) {
        confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
        setTimeout(initMatchingRound, 1500);
      }
    } else {
      setTimeout(() => {
        setMatchLeftSelected(null);
        setMatchRightSelected(null);
      }, 500);
    }
  };

  const handleCardFlip = (idx: number) => {
    if (flippedIndices.length >= 2 || flippedIndices.includes(idx) || matchedMemoryIndices.has(idx)) {
      return;
    }
    playPopSound();
    const nextFlipped = [...flippedIndices, idx];
    setFlippedIndices(nextFlipped);

    const card = memoryCards[idx];
    speakKorean(card.korean, speechSpeed);

    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = memoryCards[firstIdx];
      const secondCard = memoryCards[secondIdx];

      if (firstCard.id === secondCard.id) {
        playSuccessFanfare();
        const nextMatched = new Set(matchedMemoryIndices).add(firstIdx).add(secondIdx);
        setMatchedMemoryIndices(nextMatched);
        setFlippedIndices([]);
        onEarnStar(4);

        if (nextMatched.size === memoryCards.length) {
          confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          setTimeout(initMemoryRound, 2000);
        }
      } else {
        setTimeout(() => {
          setFlippedIndices([]);
        }, 1200);
      }
    }
  };

  const handleQuizAnswer = (option: any) => {
    if (quizFeedback) return;
    if (option.id === quizQuestion.id) {
      setQuizFeedback('correct');
      playSuccessFanfare();
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.5 } });
      setQuizScore(s => s + 1);
      onEarnStar(3);

      setTimeout(() => {
        initQuizRound();
      }, 1500);
    } else {
      setQuizFeedback('wrong');
      playPopSound();
      setTimeout(() => {
        setQuizFeedback(null);
      }, 1000);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Game Switcher */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#FFD166] font-black text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4 text-[#2D3142]" />
              <span className="text-[#2D3142]">লেভেল ৫: খেলাচ্ছলে কোরিয়ান চর্চা (어린이 게임)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              ৫ বছরের বাচ্চাদের মজার গেম জোন
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              খেলে খেলে সঠিক বর্ণ ও ছবি চিনে নিন এবং গোল্ডেন স্টার সংগ্রহ করুন!
            </p>
          </div>
        </div>

        {/* Game Tabs in Geometric Balance */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <button
            onClick={() => setActiveGame('bubble')}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center justify-center ${
              activeGame === 'bubble'
                ? 'bg-[#EF476F] text-white border-[#EF476F] shadow-md scale-102'
                : 'bg-white hover:bg-[#FFF1E6] text-[#2D3142] border-[#E5E5E5]'
            }`}
          >
            <span className="text-2xl block mb-1">🎈</span>
            <span>বুদবুদ পপ খেলা</span>
          </button>

          <button
            onClick={() => setActiveGame('matching')}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center justify-center ${
              activeGame === 'matching'
                ? 'bg-[#118AB2] text-white border-[#118AB2] shadow-md scale-102'
                : 'bg-white hover:bg-[#E8F1F2] text-[#2D3142] border-[#E5E5E5]'
            }`}
          >
            <span className="text-2xl block mb-1">🧩</span>
            <span>কার্ড জোড়া মিলানো</span>
          </button>

          <button
            onClick={() => setActiveGame('memory')}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center justify-center ${
              activeGame === 'memory'
                ? 'bg-[#06D6A0] text-white border-[#06D6A0] shadow-md scale-102'
                : 'bg-white hover:bg-[#F1FAEE] text-[#2D3142] border-[#E5E5E5]'
            }`}
          >
            <span className="text-2xl block mb-1">🧠</span>
            <span>স্মৃতি পরীক্ষা গেম</span>
          </button>

          <button
            onClick={() => setActiveGame('sound_quiz')}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition cursor-pointer flex flex-col items-center justify-center ${
              activeGame === 'sound_quiz'
                ? 'bg-[#FFD166] text-[#2D3142] border-[#FFD166] shadow-md scale-102'
                : 'bg-white hover:bg-amber-50 text-[#2D3142] border-[#E5E5E5]'
            }`}
          >
            <span className="text-2xl block mb-1">🔊</span>
            <span>শব্দ শুনে কুইজ</span>
          </button>
        </div>
      </div>

      {/* Game Stage Area */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#FFD166] shadow-xl min-h-[420px] flex flex-col justify-center">
        {/* Game 1: Bubble Pop */}
        {activeGame === 'bubble' && bubbleTarget && (
          <div className="text-center space-y-6">
            <div className="bg-[#FFF1E6] rounded-3xl p-5 border-2 border-[#FAD2E1] max-w-lg mx-auto">
              <span className="text-xs font-black text-[#EF476F] uppercase font-bengali">
                টাস্ক: নিচের শব্দ বা বর্ণটি শুনে সঠিক বেলুনটি ফোটাও!
              </span>
              <div className="flex items-center justify-center gap-3 mt-3">
                <button
                  onClick={() => speakKorean(bubbleTarget.char || bubbleTarget.korean, speechSpeed)}
                  className="px-5 py-2.5 rounded-2xl bg-[#EF476F] hover:bg-[#d8375c] text-white font-black text-sm flex items-center gap-2 shadow-md cursor-pointer"
                >
                  <Volume2 className="w-5 h-5" />
                  <span>পুনরায় শুনুন</span>
                </button>
              </div>
            </div>

            {/* Balloons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto pt-2">
              {bubbleOptions.map((opt) => {
                const isPopped = poppedIds.has(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleBubbleClick(opt)}
                    className={`h-32 sm:h-36 rounded-3xl flex flex-col items-center justify-center border-4 border-[#2D3142] transition-all cursor-pointer shadow-lg transform active:scale-95 ${
                      isPopped
                        ? 'bg-[#06D6A0] text-white opacity-50 scale-90'
                        : 'bg-[#FFD166] hover:bg-[#f0c250] text-[#2D3142] hover:-translate-y-2'
                    }`}
                  >
                    <span className="text-3xl sm:text-4xl font-black font-korean">
                      {opt.char || opt.korean}
                    </span>
                    <span className="text-xs font-black font-bengali mt-1 text-[#2D3142]">
                      {opt.soundBn || opt.bengaliMeaning}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Game 2: Matching */}
        {activeGame === 'matching' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-black text-white bg-[#118AB2] px-4 py-1.5 rounded-full">
                বাম পাশের ছবির সাথে ডান পাশের কোরিয়ান শব্দ মিলিয়ে দিন
              </span>
            </div>

            <div className="grid grid-cols-2 gap-6 max-w-xl mx-auto pt-4">
              {/* Left Column: Emoji Cards */}
              <div className="space-y-3">
                {matchItems.map((item) => {
                  const isMatched = matchedPairs.has(item.id);
                  const isSelected = matchLeftSelected === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleMatchClick('left', item.id)}
                      className={`w-full p-4 rounded-2xl flex items-center gap-3 border-2 transition-all font-black text-sm cursor-pointer ${
                        isMatched
                          ? 'bg-[#06D6A0] text-white border-[#06D6A0] opacity-50'
                          : isSelected
                          ? 'bg-[#118AB2] text-white border-[#2D3142] shadow-md scale-105'
                          : 'bg-white hover:bg-gray-50 text-[#2D3142] border-[#E5E5E5]'
                      }`}
                    >
                      <span className="text-3xl">{item.emoji}</span>
                      <span className="font-bengali">{item.bengaliMeaning}</span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Korean Words */}
              <div className="space-y-3">
                {[...matchItems].reverse().map((item) => {
                  const isMatched = matchedPairs.has(item.id);
                  const isSelected = matchRightSelected === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={isMatched}
                      onClick={() => handleMatchClick('right', item.id)}
                      className={`w-full p-4 rounded-2xl flex items-center justify-between border-2 transition-all font-black text-base cursor-pointer ${
                        isMatched
                          ? 'bg-[#06D6A0] text-white border-[#06D6A0] opacity-50'
                          : isSelected
                          ? 'bg-[#118AB2] text-white border-[#2D3142] shadow-md scale-105'
                          : 'bg-white hover:bg-gray-50 text-[#2D3142] border-[#E5E5E5]'
                      }`}
                    >
                      <span className="font-korean text-xl">{item.korean}</span>
                      <span className="text-xs text-gray-400 font-bengali">[{item.bengaliPronunciation}]</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Game 3: Memory Flip */}
        {activeGame === 'memory' && (
          <div className="space-y-6">
            <div className="text-center">
              <span className="text-xs font-black text-white bg-[#06D6A0] px-4 py-1.5 rounded-full">
                একই কোরিয়ান শব্দ ও ছবি ওয়ালা কার্ড জোড়া খুঁজে বের করুন
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4">
              {memoryCards.map((card, idx) => {
                const isFlipped = flippedIndices.includes(idx) || matchedMemoryIndices.has(idx);
                return (
                  <button
                    key={card.uniqueId}
                    onClick={() => handleCardFlip(idx)}
                    className={`h-28 rounded-2xl flex items-center justify-center font-black transition-all transform cursor-pointer border-3 ${
                      isFlipped
                        ? 'bg-[#F1FAEE] border-[#06D6A0] text-[#2D3142] shadow-md'
                        : 'bg-[#2D3142] border-[#2D3142] text-[#FFD166] hover:scale-105'
                    }`}
                  >
                    {isFlipped ? (
                      <div className="text-center">
                        <span className="text-3xl block">{card.emoji}</span>
                        <span className="text-xs font-korean font-black mt-1 block">{card.korean}</span>
                      </div>
                    ) : (
                      <span className="text-2xl font-black">?</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Game 4: Sound Quiz */}
        {activeGame === 'sound_quiz' && quizQuestion && (
          <div className="space-y-6 max-w-lg mx-auto text-center">
            <div className="bg-[#FFF1E6] rounded-3xl p-6 border-2 border-[#FAD2E1]">
              <p className="text-xs font-black text-[#EF476F] uppercase font-bengali mb-2">
                কোরিয়ান উচ্চারণটি শুনুন এবং সঠিক অর্থ বা ছবিতে ট্যাপ করুন
              </p>
              <button
                onClick={() => speakKorean(quizQuestion.korean, speechSpeed)}
                className="px-6 py-3 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white font-black text-base flex items-center justify-center gap-2 mx-auto shadow-md cursor-pointer"
              >
                <Volume2 className="w-6 h-6" />
                <span>উচ্চারণ শুনুন</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {quizOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleQuizAnswer(opt)}
                  className="p-4 rounded-2xl bg-white hover:bg-gray-50 border-2 border-[#E5E5E5] hover:border-[#118AB2] transition flex flex-col items-center justify-center shadow-xs cursor-pointer"
                >
                  <span className="text-4xl mb-1">{opt.emoji}</span>
                  <span className="text-sm font-black font-bengali text-[#2D3142]">
                    {opt.bengaliMeaning}
                  </span>
                </button>
              ))}
            </div>

            {quizFeedback && (
              <div
                className={`p-3 rounded-2xl font-black text-sm font-bengali ${
                  quizFeedback === 'correct'
                    ? 'bg-[#06D6A0] text-white'
                    : 'bg-[#EF476F] text-white'
                }`}
              >
                {quizFeedback === 'correct' ? '🎉 শাবাশ! সঠিক উত্তর হয়েছে!' : '❌ আবার চেষ্টা করো বন্ধু!'}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
