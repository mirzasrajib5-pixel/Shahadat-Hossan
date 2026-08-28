import React, { useState } from 'react';
import { AlphabetCategory, HangulItem } from '../types';
import { HANGUL_VOWELS, HANGUL_CONSONANTS } from '../data/curriculumData';
import { speakKorean, speakBengali, speakConsonantPhonetic, playChime, playPopSound, playSoftTap } from '../utils/audio';
import { triggerGrandConfetti, celebrateLevelComplete } from '../utils/celebration';
import { LevelCelebrationModal } from './LevelCelebrationModal';
import { PrintableWorksheetModal } from './PrintableWorksheetModal';
import { Volume2, Sparkles, Pencil, BookOpen, Play, CheckCircle2, Award, ChevronRight, Printer, Star } from 'lucide-react';

interface HangulExplorerProps {
  speechSpeed: number;
  onSelectLetterForTracing: (letter: HangulItem) => void;
  onEarnStar: (amount?: number) => void;
}

export const HangulExplorer: React.FC<HangulExplorerProps> = ({
  speechSpeed,
  onSelectLetterForTracing,
  onEarnStar
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AlphabetCategory>('vowels');
  const [featuredLetter, setFeaturedLetter] = useState<HangulItem>(HANGUL_VOWELS[0]);
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);
  const [completedLetterIds, setCompletedLetterIds] = useState<Set<string>>(new Set([HANGUL_VOWELS[0].id]));
  const [completedCategories, setCompletedCategories] = useState<Set<AlphabetCategory>>(new Set());

  // Modals state
  const [celebrationData, setCelebrationData] = useState<{
    isOpen: boolean;
    titleBn: string;
    titleKr: string;
    badgeEmoji: string;
    descriptionBn: string;
  }>({
    isOpen: false,
    titleBn: '',
    titleKr: '',
    badgeEmoji: '🏆',
    descriptionBn: ''
  });
  const [showPrintableModal, setShowPrintableModal] = useState<boolean>(false);

  const allVowels = HANGUL_VOWELS.filter(item => item.category === 'vowels');
  const compoundVowels = HANGUL_VOWELS.filter(item => item.category === 'compound_vowels');
  const basicConsonants = HANGUL_CONSONANTS.filter(item => item.category === 'consonants');
  const doubleConsonants = HANGUL_CONSONANTS.filter(item => item.category === 'double_consonants');

  const currentItems = 
    selectedCategory === 'vowels' ? allVowels :
    selectedCategory === 'consonants' ? basicConsonants :
    selectedCategory === 'compound_vowels' ? compoundVowels :
    doubleConsonants;

  const categoryNameMap: Record<AlphabetCategory, { bn: string; kr: string; emoji: string }> = {
    vowels: { bn: '১০টি মৌলিক স্বরবর্ণ সেট', kr: '기본 모음 10자 완성', emoji: '🍎' },
    consonants: { bn: '১৪টি মৌলিক ব্যঞ্জনবর্ণ সেট', kr: '기본 자음 14자 완성', emoji: '🐱' },
    compound_vowels: { bn: '১১টি মিশ্র স্বরবর্ণ সেট', kr: '복합 모음 완성', emoji: '🍓' },
    double_consonants: { bn: '৫টি জোড়া ব্যঞ্জনবর্ণ সেট', kr: '쌍자음 5자 완성', emoji: '🐵' }
  };

  const checkCategoryCompletion = (newCompletedSet: Set<string>, category: AlphabetCategory) => {
    const items = 
      category === 'vowels' ? allVowels :
      category === 'consonants' ? basicConsonants :
      category === 'compound_vowels' ? compoundVowels :
      doubleConsonants;

    const allDone = items.every(item => newCompletedSet.has(item.id));
    if (allDone && !completedCategories.has(category)) {
      setCompletedCategories(prev => new Set(prev).add(category));
      onEarnStar(15);
      
      const meta = categoryNameMap[category];
      setCelebrationData({
        isOpen: true,
        titleBn: `${meta.bn} সম্পন্ন হয়েছে!`,
        titleKr: meta.kr,
        badgeEmoji: meta.emoji,
        descriptionBn: `শাবাশ! তুমি এই সেটের সকল ${items.length}টি বর্ণ সফলভাবে পর্যবেক্ষণ ও উচ্চারণ করে শিখে ফেলেছো!`
      });
    }
  };

  const handleSelectLetter = (item: HangulItem) => {
    playSoftTap();
    setFeaturedLetter(item);
    speakKorean(item.char, speechSpeed);

    const nextSet = new Set<string>(completedLetterIds);
    nextSet.add(item.id);
    setCompletedLetterIds(nextSet);
    onEarnStar(1);
    checkCategoryCompletion(nextSet, selectedCategory);
  };

  const handlePlayKoreanSound = async (char: string) => {
    playPopSound();
    await speakKorean(char, speechSpeed);
    const nextSet = new Set<string>(completedLetterIds);
    nextSet.add(featuredLetter.id);
    setCompletedLetterIds(nextSet);
    checkCategoryCompletion(nextSet, selectedCategory);
  };

  const handlePlayPhoneticSyllable = async (char: string) => {
    playPopSound();
    await speakConsonantPhonetic(char, speechSpeed);
  };

  const handlePlayBengaliGuide = async (item: HangulItem) => {
    playSoftTap();
    const explanation = `${item.char} এর বাংলা উচ্চারণ ${item.soundBn}। যেমন ${item.exampleWord}, যার অর্থ ${item.exampleMeaningBn}।`;
    await speakBengali(explanation);
  };

  const handlePlayExampleWord = async (word: string) => {
    playPopSound();
    await speakKorean(word, speechSpeed);
  };

  const handlePlayAll = async () => {
    if (isPlayingAll) return;
    setIsPlayingAll(true);
    const nextSet = new Set<string>(completedLetterIds);

    for (const item of currentItems) {
      setFeaturedLetter(item);
      nextSet.add(item.id);
      setCompletedLetterIds(new Set<string>(nextSet));
      await speakKorean(item.char, speechSpeed);
      await new Promise(r => setTimeout(r, 650));
    }

    setIsPlayingAll(false);
    onEarnStar(5);
    checkCategoryCompletion(nextSet, selectedCategory);
  };

  const currentCategoryCompletedCount = currentItems.filter(i => completedLetterIds.has(i.id)).length;
  const progressPercent = Math.round((currentCategoryCompletedCount / currentItems.length) * 100);

  return (
    <div className="space-y-6">
      {/* Level Celebration Modal */}
      <LevelCelebrationModal
        isOpen={celebrationData.isOpen}
        onClose={() => setCelebrationData(prev => ({ ...prev, isOpen: false }))}
        titleBn={celebrationData.titleBn}
        titleKr={celebrationData.titleKr}
        badgeEmoji={celebrationData.badgeEmoji}
        descriptionBn={celebrationData.descriptionBn}
        bonusStars={15}
      />

      {/* Printable Worksheet Modal */}
      <PrintableWorksheetModal
        isOpen={showPrintableModal}
        onClose={() => setShowPrintableModal(false)}
      />

      {/* Top Filter and Plan Bar */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#06D6A0] font-black text-xs uppercase tracking-wider">
              <BookOpen className="w-4 h-4" />
              <span>লেভেল ১: বর্ণমালা পর্যবেক্ষণ ও প্রমিত উচ্চারণ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              কোরিয়ান বর্ণমালার রঙিন পাঠশালা
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              যেকোনো বর্ণ নির্বাচন করুন এবং সঠিক প্রমিত উচ্চারণ ও উদাহরণ দেখুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                playPopSound();
                setShowPrintableModal(true);
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-[#FFF1E6] hover:bg-[#fadcd0] text-[#EF476F] border border-[#FAD2E1] font-black text-xs font-bengali shadow-xs transition cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট শিট 🖨️</span>
            </button>

            <button
              onClick={handlePlayAll}
              disabled={isPlayingAll}
              className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl font-black font-bengali text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isPlayingAll
                  ? 'bg-[#FFD166] text-[#2D3142] animate-pulse'
                  : 'bg-[#118AB2] hover:bg-[#0e7496] text-white active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPlayingAll ? 'সবগুলো উচ্চারণ হচ্ছে...' : 'সবগুলো এক সাথে শুনুন ▶️'}</span>
            </button>
          </div>
        </div>

        {/* Category Tabs in Geometric Balance Palette */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          <button
            onClick={() => {
              playSoftTap();
              setSelectedCategory('vowels');
              setFeaturedLetter(allVowels[0]);
            }}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition-all cursor-pointer flex flex-col items-center justify-center relative ${
              selectedCategory === 'vowels'
                ? 'bg-[#06D6A0] text-white border-[#06D6A0] shadow-md scale-102'
                : 'bg-white text-[#2D3142] border-[#E5E5E5] hover:border-[#06D6A0]'
            }`}
          >
            {completedCategories.has('vowels') && (
              <span className="absolute top-1.5 right-1.5 text-xs">🏆</span>
            )}
            <span className="text-[11px] opacity-90 block">১০টি প্রাথমিক</span>
            <span className="text-base font-kids">🍎 স্বরবর্ণ (모음)</span>
          </button>

          <button
            onClick={() => {
              playSoftTap();
              setSelectedCategory('consonants');
              setFeaturedLetter(basicConsonants[0]);
            }}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition-all cursor-pointer flex flex-col items-center justify-center relative ${
              selectedCategory === 'consonants'
                ? 'bg-[#EF476F] text-white border-[#EF476F] shadow-md scale-102'
                : 'bg-white text-[#2D3142] border-[#E5E5E5] hover:border-[#EF476F]'
            }`}
          >
            {completedCategories.has('consonants') && (
              <span className="absolute top-1.5 right-1.5 text-xs">🏆</span>
            )}
            <span className="text-[11px] opacity-90 block">১৪টি প্রাথমিক</span>
            <span className="text-base font-kids">🐱 ব্যঞ্জনবর্ণ (자음)</span>
          </button>

          <button
            onClick={() => {
              playSoftTap();
              setSelectedCategory('compound_vowels');
              setFeaturedLetter(compoundVowels[0]);
            }}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition-all cursor-pointer flex flex-col items-center justify-center relative ${
              selectedCategory === 'compound_vowels'
                ? 'bg-[#118AB2] text-white border-[#118AB2] shadow-md scale-102'
                : 'bg-white text-[#2D3142] border-[#E5E5E5] hover:border-[#118AB2]'
            }`}
          >
            {completedCategories.has('compound_vowels') && (
              <span className="absolute top-1.5 right-1.5 text-xs">🏆</span>
            )}
            <span className="text-[11px] opacity-90 block">১১টি মিশ্র</span>
            <span className="text-base font-kids">🍓 মিশ্র স্বর (복합)</span>
          </button>

          <button
            onClick={() => {
              playSoftTap();
              setSelectedCategory('double_consonants');
              setFeaturedLetter(doubleConsonants[0]);
            }}
            className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition-all cursor-pointer flex flex-col items-center justify-center relative ${
              selectedCategory === 'double_consonants'
                ? 'bg-[#FFD166] text-[#2D3142] border-[#FFD166] shadow-md scale-102'
                : 'bg-white text-[#2D3142] border-[#E5E5E5] hover:border-[#FFD166]'
            }`}
          >
            {completedCategories.has('double_consonants') && (
              <span className="absolute top-1.5 right-1.5 text-xs">🏆</span>
            )}
            <span className="text-[11px] opacity-90 block">৫টি দ্বৈত</span>
            <span className="text-base font-kids">🐵 জোড়া ব্যঞ্জন (쌍자음)</span>
          </button>
        </div>

        {/* Progress Bar for Current Set */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-black font-bengali text-gray-500 mb-1">
              <span>চলতি সেটের অগ্রগতি: {currentCategoryCompletedCount} / {currentItems.length} টি বর্ণ</span>
              <span className="text-[#118AB2]">{progressPercent}% সম্পন্ন</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#06D6A0] to-[#118AB2] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Letter Selector Chips Horizontal Ribbon */}
        <div className="flex items-center gap-2 overflow-x-auto mt-4 pb-2 pt-1 no-scrollbar">
          {currentItems.map((item) => {
            const isSel = featuredLetter.id === item.id;
            const isDone = completedLetterIds.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleSelectLetter(item)}
                className={`min-w-[56px] h-14 rounded-2xl font-black text-2xl font-korean transition-all flex flex-col items-center justify-center cursor-pointer border-2 relative ${
                  isSel
                    ? 'bg-[#2D3142] text-[#FFD166] border-[#2D3142] shadow-md -translate-y-1 scale-105'
                    : isDone
                    ? 'bg-[#F1FAEE] text-[#2D3142] border-[#06D6A0]'
                    : 'bg-white text-[#2D3142] border-[#E5E5E5] hover:border-[#118AB2]'
                }`}
              >
                {isDone && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#06D6A0] text-white rounded-full text-[9px] flex items-center justify-center font-bold">
                    ✓
                  </span>
                )}
                <span>{item.char}</span>
                <span className="text-[10px] font-bengali font-bold text-gray-500 leading-none">
                  {item.soundBn}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Section: Geometric Balance Interactive Display */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column (7 cols): Big Letter Showcase & Controls */}
        <div className="lg:col-span-7 flex flex-col gap-5">
          <div className="bg-white rounded-[40px] border-4 border-[#118AB2] p-8 flex-1 flex flex-col items-center justify-center relative overflow-hidden shadow-xl min-h-[380px]">
            <div className="absolute top-6 left-8 flex items-center gap-2">
              <span className="px-3.5 py-1 rounded-full bg-[#118AB2] text-white text-xs font-black">
                {featuredLetter.strokes}টি দাগে লেখা
              </span>
              <span className="text-[#118AB2] font-black text-sm">
                /{featuredLetter.romanization}/
              </span>
            </div>

            {/* Giant Hangul Character */}
            <div className="text-[140px] sm:text-[180px] font-black leading-none text-[#2D3142] font-korean relative select-none my-4">
              {featuredLetter.char}
              <div className="absolute -top-2 -right-4 w-8 h-8 bg-[#EF476F] rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm">
                ১
              </div>
              {featuredLetter.strokes > 1 && (
                <div className="absolute top-28 -right-4 w-8 h-8 bg-[#06D6A0] rounded-full flex items-center justify-center text-white text-xs font-black shadow-sm">
                  ২
                </div>
              )}
            </div>

            {/* Name & Sound Description */}
            <div className="mt-2 text-center">
              <p className="text-3xl font-black text-[#118AB2] font-bengali">
                [ {featuredLetter.soundBn} ]
              </p>
              <p className="text-sm font-bold text-gray-500 mt-1 font-bengali">
                {featuredLetter.nameKr ? `কোরিয়ান নাম: ${featuredLetter.nameKr} (${featuredLetter.nameBn})` : `উচ্চারণ: '${featuredLetter.soundBn}' এর মতো`}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <button
              onClick={() => handlePlayKoreanSound(featuredLetter.char)}
              className="bg-[#06D6A0] hover:bg-[#05b88a] rounded-3xl p-4 flex flex-col items-center justify-center text-white font-black shadow-md transform active:scale-95 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-1">🔊</div>
              <span className="text-sm font-bengali">কোরিয়ান উচ্চারণ শুনো</span>
            </button>

            <button
              onClick={() => handlePlayBengaliGuide(featuredLetter)}
              className="bg-[#EF476F] hover:bg-[#d8375c] rounded-3xl p-4 flex flex-col items-center justify-center text-white font-black shadow-md transform active:scale-95 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-1">🗣️</div>
              <span className="text-sm font-bengali">বাংলায় বুঝিয়ে বলো</span>
            </button>

            <button
              onClick={() => {
                playPopSound();
                onSelectLetterForTracing(featuredLetter);
              }}
              className="bg-[#FFD166] hover:bg-[#f0c250] rounded-3xl p-4 flex flex-col items-center justify-center text-[#2D3142] font-black shadow-md transform active:scale-95 transition-all cursor-pointer"
            >
              <div className="text-3xl mb-1">🎨</div>
              <span className="text-sm font-bengali">নিজে আঁকো ও ট্রেস</span>
            </button>
          </div>
        </div>

        {/* Right Column (5 cols): Real Examples & Memory Trick Cards */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          <div className="bg-white rounded-[32px] p-6 shadow-md border-2 border-[#E5E5E5] flex flex-col flex-1">
            <h3 className="text-lg font-black text-[#2D3142] mb-4 flex items-center gap-2 font-bengali">
              <span className="text-2xl">🍎</span> বাস্তব উদাহরণ ও শব্দ
            </h3>

            <div className="flex flex-col gap-3 flex-1">
              {/* Primary Example Card */}
              <div
                onClick={() => handlePlayExampleWord(featuredLetter.exampleWord)}
                className="bg-[#F1FAEE] p-4 rounded-2xl flex items-center justify-between gap-4 border-2 border-[#A8DADC] cursor-pointer hover:border-[#457B9D] transition"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center text-3xl shadow-xs">
                    {featuredLetter.exampleEmoji}
                  </div>
                  <div>
                    <p className="text-xs font-black text-[#457B9D] uppercase font-bengali">
                      {featuredLetter.exampleMeaningBn}
                    </p>
                    <p className="text-2xl font-black text-[#2D3142] font-korean">
                      {featuredLetter.exampleWord}
                    </p>
                    <p className="text-xs text-gray-500 font-medium">
                      ({featuredLetter.exampleMeaningEn})
                    </p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#06D6A0] text-white flex items-center justify-center text-lg shadow-xs">
                  🔊
                </div>
              </div>

              {/* Memory Mnemonic Card */}
              <div className="bg-[#FFF1E6] p-4 rounded-2xl flex items-start gap-3 border-2 border-[#FAD2E1]">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0 mt-0.5">
                  💡
                </div>
                <div>
                  <p className="text-xs font-black text-[#EF476F] uppercase font-bengali">
                    শিশুদের মনে রাখার সহজ ট্রিক
                  </p>
                  <p className="text-xs sm:text-sm text-[#2D3142] font-bengali font-bold mt-1 leading-relaxed">
                    {featuredLetter.funFactBn}
                  </p>
                </div>
              </div>

              {/* Stroke Guide Step Card */}
              <div className="bg-[#E8F1F2] p-4 rounded-2xl flex items-center gap-3 border-2 border-[#B3E5FC] mt-auto">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-xl shadow-xs shrink-0">
                  ✏️
                </div>
                <div>
                  <p className="text-xs font-black text-[#0077B6] uppercase font-bengali">
                    দাগ টানার নিয়ম (Stroke Flow)
                  </p>
                  <p className="text-xs text-gray-700 font-bengali font-semibold mt-0.5">
                    {featuredLetter.strokeGuide.join(' ➔ ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Gamification / Star Card */}
          <div className="bg-[#118AB2] rounded-[32px] p-5 text-white flex items-center justify-between shadow-lg">
            <div>
              <p className="text-xs font-bold opacity-80 font-bengali">আজকের বর্ণ লক্ষ্যমাত্রা</p>
              <p className="text-xl font-black font-bengali">প্রতিদিন ৩টি বর্ণ শিখা</p>
            </div>
            <div className="flex -space-x-2">
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#EF476F] flex items-center justify-center text-xs font-bold">
                ⭐
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#FFD166] flex items-center justify-center text-xs font-bold text-[#2D3142]">
                ⭐
              </div>
              <div className="w-9 h-9 rounded-full border-2 border-white bg-[#06D6A0] flex items-center justify-center text-xs font-bold">
                ⭐
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
