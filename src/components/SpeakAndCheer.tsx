import React, { useState } from 'react';
import { Mic, Volume2, Sparkles, CheckCircle2, Trophy, RotateCcw, Heart, Star, ChevronRight } from 'lucide-react';
import { speakKorean, speakBengali, playSuccessFanfare, playPopSound, playSoftTap } from '../utils/audio';
import { triggerGrandConfetti } from '../utils/celebration';

interface PracticeItem {
  id: string;
  korean: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  emoji: string;
  praiseKr: string;
  praiseBn: string;
}

const PRACTICE_ITEMS: PracticeItem[] = [
  {
    id: 'sp_1',
    korean: '사과',
    bengaliPronunciation: 'সা-গোয়া',
    bengaliMeaning: 'আপেল',
    emoji: '🍎',
    praiseKr: '완벽해요! 아주 잘했어요!',
    praiseBn: 'একদম নিখুঁত! খুব চমৎকার উচ্চারণ!'
  },
  {
    id: 'sp_2',
    korean: '우유',
    bengaliPronunciation: 'উ-ইউ',
    bengaliMeaning: 'দুধ',
    emoji: '🥛',
    praiseKr: '최고예요! 참 잘했어요!',
    praiseBn: 'সবচেয়ে সুন্দর হয়েছে!'
  },
  {
    id: 'sp_3',
    korean: '나비',
    bengaliPronunciation: 'না-বি',
    bengaliMeaning: 'প্রজাপতি',
    emoji: '🦋',
    praiseKr: '예쁘게 잘 말했어요!',
    praiseBn: 'খুব মিষ্টি করে বলেছো!'
  },
  {
    id: 'sp_4',
    korean: '엄마',
    bengaliPronunciation: 'অম-মা',
    bengaliMeaning: 'মা',
    emoji: '👩',
    praiseKr: '대단해요! 멋져요!',
    praiseBn: 'অসাধারণ! দারুণ!'
  },
  {
    id: 'sp_5',
    korean: '아빠',
    bengaliPronunciation: 'আ-প্পা',
    bengaliMeaning: 'বাবা',
    emoji: '👨',
    praiseKr: '짝짝짝! 정말 잘했어요!',
    praiseBn: 'তালি তালি! দারুণ হয়েছে!'
  },
  {
    id: 'sp_6',
    korean: '사랑해',
    bengaliPronunciation: 'সা-রাং-হে',
    bengaliMeaning: 'ভালোবাসি',
    emoji: '❤️',
    praiseKr: '사랑해요! 최고!',
    praiseBn: 'ভালোবাসি! সেরা বলেছো!'
  }
];

interface SpeakAndCheerProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

export const SpeakAndCheer: React.FC<SpeakAndCheerProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [hasPracticed, setHasPracticed] = useState<boolean>(false);
  const [practicedCount, setPracticedCount] = useState<number>(0);

  const currentItem = PRACTICE_ITEMS[currentIndex];

  const handleListen = () => {
    playPopSound();
    speakKorean(currentItem.korean, speechSpeed);
  };

  const handleCheerSpeaking = () => {
    setHasPracticed(true);
    setPracticedCount(c => c + 1);
    onEarnStar(3);
    playSuccessFanfare();
    triggerGrandConfetti();

    setTimeout(() => {
      speakKorean(currentItem.praiseKr, speechSpeed);
    }, 700);
  };

  const handleNext = () => {
    playSoftTap();
    setHasPracticed(false);
    const nextIdx = (currentIndex + 1) % PRACTICE_ITEMS.length;
    setCurrentIndex(nextIdx);
    setTimeout(() => {
      speakKorean(PRACTICE_ITEMS[nextIdx].korean, speechSpeed);
    }, 400);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#06D6A0] font-black text-xs uppercase tracking-wider">
              <Mic className="w-4 h-4" />
              <span>শিশুর বাচনভঙ্গি ও উচ্চারণ বিকাশ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              মুখে বলো ও তোরির বাহবা পাও!
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              বাচ্চা মুখে শব্দ উচ্চারণ করবে এবং তোরির কাছ থেকে হাততালি ও উপহার পাবে।
            </p>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#F1FAEE] border-2 border-[#06D6A0] text-[#06D6A0] text-xs sm:text-sm font-black font-bengali">
            <Trophy className="w-4 h-4" />
            <span>অনুশীলন সম্পন্ন: {practicedCount} বার</span>
          </div>
        </div>
      </div>

      {/* Main Speaking Stage Card in Geometric Theme */}
      <div className="bg-white rounded-[36px] p-6 sm:p-10 border-4 border-[#06D6A0] shadow-xl text-center max-w-2xl mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <span className="px-3.5 py-1 rounded-full bg-[#F1FAEE] text-[#06D6A0] text-xs font-black font-bengali">
            শব্দ {currentIndex + 1} / {PRACTICE_ITEMS.length}
          </span>
          <span className="text-xs font-black text-gray-400 font-bengali">
            প্রতি উচ্চারণে +৩ স্টার ⭐
          </span>
        </div>

        {/* Big Emoji & Word */}
        <div className="w-32 h-32 mx-auto rounded-3xl bg-[#FFF1E6] border-3 border-[#FAD2E1] flex items-center justify-center text-7xl shadow-sm mb-4">
          {currentItem.emoji}
        </div>

        <h3 className="text-4xl sm:text-5xl font-black text-[#2D3142] font-korean">
          {currentItem.korean}
        </h3>

        <p className="text-lg font-black text-[#118AB2] font-bengali mt-1">
          [{currentItem.bengaliPronunciation}] • {currentItem.bengaliMeaning}
        </p>

        {/* Step 1 & Step 2 Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 my-8">
          <button
            onClick={handleListen}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#118AB2] hover:bg-[#0e7496] text-white font-black text-sm flex items-center justify-center gap-2 shadow-md cursor-pointer transition active:scale-95"
          >
            <Volume2 className="w-5 h-5" />
            <span>১. উচ্চারণ শুনুন</span>
          </button>

          <button
            onClick={handleCheerSpeaking}
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-[#EF476F] hover:bg-[#d8375c] text-white font-black text-base flex items-center justify-center gap-2.5 shadow-xl cursor-pointer transition active:scale-95 animate-pulse"
          >
            <Mic className="w-6 h-6" />
            <span>২. আমি মুখে বলেছি! 🎤</span>
          </button>
        </div>

        {/* Cheer Praise Box when practiced */}
        {hasPracticed ? (
          <div className="p-5 rounded-3xl bg-[#F1FAEE] border-3 border-[#06D6A0] text-center animate-in zoom-in-95 duration-200">
            <div className="text-3xl mb-1">🐯 👏 🌟</div>
            <h4 className="text-xl font-black text-[#06D6A0] font-korean">
              {currentItem.praiseKr}
            </h4>
            <p className="text-sm font-black text-[#2D3142] font-bengali mt-1">
              {currentItem.praiseBn} (+৩ স্টার ⭐ অর্জিত!)
            </p>

            <button
              onClick={handleNext}
              className="mt-4 px-6 py-2.5 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white font-black text-sm font-bengali inline-flex items-center gap-2 shadow-md cursor-pointer"
            >
              <span>পরবর্তী শব্দে যাও</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bengali font-bold text-gray-500">
            💡 টিপস: বাচ্চা মুখে বলার পর "আমি মুখে বলেছি" বাটনে ট্যাপ করলে তোরি বাজি ফুটিয়ে বাহবা দেবে!
          </div>
        )}
      </div>
    </div>
  );
};
