import React, { useState } from 'react';
import { speakKorean, speakBengali, playChime, playPopSound, playSuccessFanfare, playSoftTap } from '../utils/audio';
import { Sparkles, Volume2, Plus, ArrowRight, Wand2, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface SyllableBuilderProps {
  speechSpeed: number;
  onEarnStar: () => void;
}

const INITIAL_CONSONANTS = [
  { char: 'ㄱ', nameBn: 'গ / ক', id: 0 },
  { char: 'ㄴ', nameBn: 'ন', id: 2 },
  { char: 'ㄷ', nameBn: 'দ / ত', id: 3 },
  { char: 'ㄹ', nameBn: 'র / ল', id: 5 },
  { char: 'ㅁ', nameBn: 'ম', id: 6 },
  { char: 'ㅂ', nameBn: 'ব / প', id: 7 },
  { char: 'ㅅ', nameBn: 'স / শ', id: 9 },
  { char: 'ㅇ', nameBn: 'অ / নীরব', id: 11 },
  { char: 'ㅈ', nameBn: 'জ', id: 12 },
  { char: 'ㅊ', nameBn: 'ছ', id: 14 },
  { char: 'ㅋ', nameBn: 'খ', id: 15 },
  { char: 'ㅌ', nameBn: 'থ', id: 16 },
  { char: 'ㅍ', nameBn: 'ফ', id: 17 },
  { char: 'ㅎ', nameBn: 'হ', id: 18 }
];

const MEDIAL_VOWELS = [
  { char: 'ㅏ', soundBn: 'আ', id: 0 },
  { char: 'ㅑ', soundBn: 'ইয়া', id: 2 },
  { char: 'ㅓ', soundBn: 'অ', id: 4 },
  { char: 'ㅕ', soundBn: 'ইয়', id: 6 },
  { char: 'ㅗ', soundBn: 'ও', id: 8 },
  { char: 'ㅛ', soundBn: 'ইও', id: 12 },
  { char: 'ㅜ', soundBn: 'উ', id: 13 },
  { char: 'ㅠ', soundBn: 'ইউ', id: 17 },
  { char: 'ㅡ', soundBn: 'উ (দাঁত চেপে)', id: 18 },
  { char: 'ㅣ', soundBn: 'ই', id: 20 },
  { char: 'ㅐ', soundBn: 'এ', id: 1 },
  { char: 'ㅔ', soundBn: 'এ', id: 5 }
];

const EXAMPLE_WORDS_MAP: Record<string, { word: string; meaningBn: string; emoji: string }> = {
  '가': { word: '가방', meaningBn: 'স্কুল ব্যাগ', emoji: '🎒' },
  '나': { word: '나비', meaningBn: 'রঙিন প্রজাপতি', emoji: '🦋' },
  '다': { word: '다람쥐', meaningBn: 'কাঠবিড়ালি', emoji: '🐿️' },
  '라': { word: '라디오', meaningBn: 'রেডিও', emoji: '📻' },
  '마': { word: '마음', meaningBn: 'সুন্দর মন', emoji: '💖' },
  '바': { word: '바나나', meaningBn: 'পাকা কলা', emoji: '🍌' },
  '사': { word: '사과', meaningBn: 'মিষ্টি আপেল', emoji: '🍎' },
  '아': { word: '아기', meaningBn: 'ছোট্ট শিশু', emoji: '👶' },
  '자': { word: '자동차', meaningBn: 'ছোট গাড়ি', emoji: '🚗' },
  '차': { word: '차', meaningBn: 'গাড়ি / চা', emoji: '🍵' },
  '카': { word: '카메라', meaningBn: 'ছবি তোলার ক্যামেরা', emoji: '📷' },
  '타': { word: '타조', meaningBn: 'উটপাখি', emoji: '🦤' },
  '파': { word: '파란색', meaningBn: 'নীল রঙ', emoji: '🔵' },
  '하': { word: '하늘', meaningBn: 'নীল আকাশ', emoji: '☁️' },
  '고': { word: '고양이', meaningBn: 'মিষ্টি বিড়াল', emoji: '🐱' },
  '노': { word: '노래', meaningBn: 'মিষ্টি গান', emoji: '🎵' },
  '도': { word: '도토리', meaningBn: 'ওক ফল', emoji: '🌰' },
  '모': { word: '모자', meaningBn: 'টুপি', emoji: '🧢' },
  '보': { word: '보석', meaningBn: 'চকচকে রত্ন', emoji: '💎' },
  '소': { word: '소', meaningBn: 'দুধের গাভী / গরু', emoji: '🐮' },
  '오': { word: '오이', meaningBn: 'সবুজ শসা', emoji: '🥒' },
  '호': { word: '호랑이', meaningBn: 'বাঘ মামা', emoji: '🐯' },
  '구': { word: '구름', meaningBn: 'সাদা মেঘ', emoji: '☁️' },
  '누': { word: '누나', meaningBn: 'বড় বোন / দিদি', emoji: '👧' },
  '두': { word: '두부', meaningBn: 'নরম তোফু', emoji: '🧈' },
  '무': { word: '무지개', meaningBn: 'রংধনু', emoji: '🌈' },
  '우': { word: '우유', meaningBn: 'সাদা দুধ', emoji: '🥛' },
  '토': { word: '토끼', meaningBn: 'তুলতুলে খরগোশ', emoji: '🐰' },
  '포': { word: '포도', meaningBn: 'রসালো আঙুর', emoji: '🍇' },
  '치': { word: '치즈', meaningBn: 'মজার চিজ', emoji: '🧀' }
};

export const SyllableBuilder: React.FC<SyllableBuilderProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [selectedConsonant, setSelectedConsonant] = useState(INITIAL_CONSONANTS[0]); // ㄱ
  const [selectedVowel, setSelectedVowel] = useState(MEDIAL_VOWELS[0]); // ㅏ
  const [isAssembling, setIsAssembling] = useState(false);

  const assembledCharCode = 0xAC00 + (selectedConsonant.id * 21 + selectedVowel.id) * 28;
  const assembledChar = String.fromCharCode(assembledCharCode);

  const matchingWord = EXAMPLE_WORDS_MAP[assembledChar];

  const handleAssembleAndSpeak = async (charToSpeak: string) => {
    setIsAssembling(true);
    playPopSound();
    await speakKorean(charToSpeak, speechSpeed);
    setIsAssembling(false);
  };

  const handleMagicSparkle = () => {
    playSuccessFanfare();
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });
    onEarnStar();
    speakKorean(assembledChar, speechSpeed);
  };

  return (
    <div className="space-y-6">
      {/* Intro Geometric Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex items-center gap-2 text-[#118AB2] font-black text-xs uppercase tracking-wider">
          <Wand2 className="w-4 h-4" />
          <span>লেভেল ২: বর্ণ জোড়া ও শব্দ তৈরি (글자 만들기)</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
          লেগো ব্লকের মতো বর্ণ জোড়া জাদুকরি বক্স
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm font-bengali font-bold mt-0.5">
          একটি ব্যঞ্জনবর্ণ (Consonant) এবং একটি স্বরবর্ণ (Vowel) বেছে নিন — দেখুন কীভাবে দুইটি বর্ণ মিলে একটি কোরিয়ান ধ্বনি তৈরি হয়!
        </p>
      </div>

      {/* Main Interactive Stage in Geometric Balance Theme */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#06D6A0] shadow-xl">
        {/* The 3-Step Assembly Pipeline */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6">
          {/* Box 1: Consonant Block */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-white bg-[#118AB2] px-3.5 py-1 rounded-full mb-2">
              ১. ব্যঞ্জনবর্ণ (জায়ুম)
            </span>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#118AB2] text-white flex flex-col items-center justify-center shadow-lg border-3 border-[#2D3142] transform hover:scale-105 transition">
              <span className="text-4xl sm:text-5xl font-black font-korean">{selectedConsonant.char}</span>
              <span className="text-xs font-black font-bengali mt-1 text-[#FFD166]">
                [ {selectedConsonant.nameBn} ]
              </span>
            </div>
          </div>

          {/* Plus Sign */}
          <div className="w-10 h-10 rounded-full bg-[#FFD166] text-[#2D3142] flex items-center justify-center font-black text-xl shadow-xs">
            <Plus className="w-6 h-6" />
          </div>

          {/* Box 2: Vowel Block */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-white bg-[#EF476F] px-3.5 py-1 rounded-full mb-2">
              ২. স্বরবর্ণ (মোউম)
            </span>
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-[#EF476F] text-white flex flex-col items-center justify-center shadow-lg border-3 border-[#2D3142] transform hover:scale-105 transition">
              <span className="text-4xl sm:text-5xl font-black font-korean">{selectedVowel.char}</span>
              <span className="text-xs font-black font-bengali mt-1 text-[#FFD166]">
                [ {selectedVowel.soundBn} ]
              </span>
            </div>
          </div>

          {/* Arrow */}
          <div className="w-10 h-10 rounded-full bg-[#06D6A0] text-white flex items-center justify-center font-black shadow-xs">
            <ArrowRight className="w-6 h-6" />
          </div>

          {/* Box 3: Magic Assembled Block! */}
          <div className="flex flex-col items-center">
            <span className="text-xs font-black text-white bg-[#06D6A0] px-4 py-1 rounded-full mb-2 flex items-center gap-1 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
              <span>৩. তৈরি শব্দাংশ!</span>
            </span>
            <div
              onClick={() => handleAssembleAndSpeak(assembledChar)}
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-[32px] bg-[#06D6A0] text-white flex flex-col items-center justify-center shadow-xl border-4 border-[#2D3142] cursor-pointer transform hover:scale-105 active:scale-95 transition-all ${
                isAssembling ? 'animate-bounce' : ''
              }`}
            >
              <span className="text-5xl sm:text-6xl font-black font-korean filter drop-shadow-sm">
                {assembledChar}
              </span>
              <div className="flex items-center gap-1 text-xs font-black bg-[#2D3142] text-white px-3 py-1 rounded-full mt-2 font-bengali">
                <Volume2 className="w-3.5 h-3.5 text-[#FFD166]" />
                <span>ট্যাপ করে শুনুন</span>
              </div>
            </div>
          </div>
        </div>

        {/* Real-World Word Example for Assembled Character */}
        <div className="mt-8 max-w-xl mx-auto">
          {matchingWord ? (
            <div
              onClick={() => {
                playPopSound();
                speakKorean(matchingWord.word, speechSpeed);
              }}
              className="bg-[#F1FAEE] rounded-3xl p-4 sm:p-5 border-2 border-[#A8DADC] shadow-md flex items-center justify-between gap-4 cursor-pointer hover:border-[#457B9D] transition"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-4xl shadow-xs border border-[#A8DADC]">
                  {matchingWord.emoji}
                </div>
                <div>
                  <span className="text-xs font-black text-[#457B9D] uppercase font-bengali">
                    বাস্তব উদাহরণ
                  </span>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-2xl font-black text-[#2D3142] font-korean">
                      {matchingWord.word}
                    </span>
                    <Volume2 className="w-4 h-4 text-[#06D6A0]" />
                  </div>
                  <p className="text-sm font-black text-gray-700 font-bengali">
                    {matchingWord.meaningBn}
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleMagicSparkle();
                }}
                className="px-4 py-2.5 rounded-2xl bg-[#FFD166] hover:bg-[#f0c250] text-[#2D3142] font-black text-xs flex items-center gap-1.5 shadow-xs transition"
              >
                <Sparkles className="w-4 h-4" />
                <span>স্টার নিন</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#FFF1E6] rounded-2xl p-4 border-2 border-[#FAD2E1] text-center text-xs sm:text-sm text-[#2D3142] font-bengali font-bold">
              💡 আপনি যে কোনো ব্যঞ্জনবর্ণ ও স্বরবর্ণ জোড়া লাগিয়ে নতুন নতুন কোরিয়ান ধ্বনি তৈরি করতে পারেন!
            </div>
          )}
        </div>
      </div>

      {/* Selectors Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Consonant Picker */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-[#2D3142] font-kids text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#118AB2] text-white text-xs flex items-center justify-center font-bold">1</span>
              ব্যঞ্জনবর্ণ বাছাই করুন (Consonant)
            </h3>
            <span className="text-xs text-[#118AB2] font-black bg-[#E8F1F2] px-2.5 py-1 rounded-full">
              ১৪টি বর্ণ
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
            {INITIAL_CONSONANTS.map((c) => {
              const isSelected = selectedConsonant.char === c.char;
              return (
                <button
                  key={c.char}
                  onClick={() => {
                    playPopSound();
                    setSelectedConsonant(c);
                    speakKorean(c.char, speechSpeed);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#118AB2] text-white border-[#2D3142] shadow-md scale-105'
                      : 'bg-white hover:bg-[#E8F1F2] text-[#2D3142] border-[#E5E5E5]'
                  }`}
                >
                  <span className="text-2xl font-black font-korean">{c.char}</span>
                  <span className={`text-[10px] font-bold mt-0.5 font-bengali ${isSelected ? 'text-[#FFD166]' : 'text-gray-500'}`}>
                    {c.nameBn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Vowel Picker */}
        <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-black text-[#2D3142] font-kids text-lg flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-[#EF476F] text-white text-xs flex items-center justify-center font-bold">2</span>
              স্বরবর্ণ বাছাই করুন (Vowel)
            </h3>
            <span className="text-xs text-[#EF476F] font-black bg-[#FFF1E6] px-2.5 py-1 rounded-full">
              ১২টি বর্ণ
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
            {MEDIAL_VOWELS.map((v) => {
              const isSelected = selectedVowel.char === v.char;
              return (
                <button
                  key={v.char}
                  onClick={() => {
                    playPopSound();
                    setSelectedVowel(v);
                    speakKorean(v.char, speechSpeed);
                  }}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#EF476F] text-white border-[#2D3142] shadow-md scale-105'
                      : 'bg-white hover:bg-[#FFF1E6] text-[#2D3142] border-[#E5E5E5]'
                  }`}
                >
                  <span className="text-2xl font-black font-korean">{v.char}</span>
                  <span className={`text-[10px] font-bold mt-0.5 font-bengali ${isSelected ? 'text-[#FFD166]' : 'text-gray-500'}`}>
                    {v.soundBn}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
