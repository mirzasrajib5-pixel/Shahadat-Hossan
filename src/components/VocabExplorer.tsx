import React, { useState } from 'react';
import { VocabCategory, VocabItem } from '../types';
import { VOCABULARY_LIST } from '../data/curriculumData';
import { speakKorean, speakBengali, playPopSound, playSuccessFanfare, playSoftTap } from '../utils/audio';
import { triggerGrandConfetti, celebrateLevelComplete } from '../utils/celebration';
import { LevelCelebrationModal } from './LevelCelebrationModal';
import { Volume2, Sparkles, Star, Award, Heart, Check, Play, Trophy } from 'lucide-react';

interface VocabExplorerProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

export const VocabExplorer: React.FC<VocabExplorerProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [selectedCategory, setSelectedCategory] = useState<VocabCategory>('animals');
  const [activeWordId, setActiveWordId] = useState<string | null>(null);
  const [completedWords, setCompletedWords] = useState<Set<string>>(new Set());
  const [completedCategories, setCompletedCategories] = useState<Set<VocabCategory>>(new Set());
  const [isPlayingAll, setIsPlayingAll] = useState<boolean>(false);

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

  const categories: { id: VocabCategory; labelBn: string; emoji: string; color: string; krTitle: string }[] = [
    { id: 'animals', labelBn: 'পশু-পাখি', emoji: '🐾', color: '#06D6A0', krTitle: '동물 단어 완성' },
    { id: 'food', labelBn: 'ফল ও খাবার', emoji: '🍎', color: '#EF476F', krTitle: '음식과 과일 단어 완성' },
    { id: 'colors', labelBn: 'রঙের মেলা', emoji: '🎨', color: '#118AB2', krTitle: '색깔 단어 완성' },
    { id: 'numbers', labelBn: 'সংখ্যা গণনা', emoji: '🔢', color: '#FFD166', krTitle: '숫자 단어 완성' },
    { id: 'family_body', labelBn: 'পরিবার ও শরীর', emoji: '👨‍👩‍👧', color: '#06D6A0', krTitle: '가족과 몸 단어 완성' },
    { id: 'phrases', labelBn: 'সহজ কথাবার্তা', emoji: '💬', color: '#EF476F', krTitle: '기본 인사 완성' },
  ];

  const currentItems = VOCABULARY_LIST.filter(item => item.category === selectedCategory);
  const currentCategoryMeta = categories.find(c => c.id === selectedCategory) || categories[0];

  const checkCategoryCompletion = (newCompletedSet: Set<string>, categoryId: VocabCategory) => {
    const items = VOCABULARY_LIST.filter(i => i.category === categoryId);
    const isCategoryComplete = items.every(item => newCompletedSet.has(item.id));

    if (isCategoryComplete && !completedCategories.has(categoryId)) {
      setCompletedCategories(prev => new Set(prev).add(categoryId));
      onEarnStar(15);

      const meta = categories.find(c => c.id === categoryId) || categories[0];
      setCelebrationData({
        isOpen: true,
        titleBn: `🎉 ${meta.labelBn} শব্দভাণ্ডার সমাপ্ত!`,
        titleKr: meta.krTitle,
        badgeEmoji: meta.emoji,
        descriptionBn: `চমৎকার! তুমি এই লেভেলের সবকটি (${items.length}টি) শব্দ সুন্দরভাবে উচ্চারণ করে শিখে ফেলেছো!`
      });
    }
  };

  const handleSpeak = async (item: VocabItem) => {
    setActiveWordId(item.id);
    playPopSound();
    await speakKorean(item.korean, speechSpeed);

    const nextCompleted = new Set<string>(completedWords);
    nextCompleted.add(item.id);
    setCompletedWords(nextCompleted);
    onEarnStar(1);

    checkCategoryCompletion(nextCompleted, selectedCategory);
    setTimeout(() => setActiveWordId(null), 600);
  };

  const handleSpeakSentence = async (sentence: string) => {
    playPopSound();
    await speakKorean(sentence, speechSpeed);
  };

  const handleSpeakBengaliPhonetic = async (item: VocabItem, e: React.MouseEvent) => {
    e.stopPropagation();
    playSoftTap();
    await speakBengali(`${item.korean}, এর বাংলা অর্থ ${item.bengaliMeaning}`);
  };

  const handlePlayAllCategory = async () => {
    if (isPlayingAll) return;
    setIsPlayingAll(true);
    const nextCompleted = new Set<string>(completedWords);

    for (const item of currentItems) {
      setActiveWordId(item.id);
      nextCompleted.add(item.id);
      setCompletedWords(new Set<string>(nextCompleted));
      await speakKorean(item.korean, speechSpeed);
      await new Promise(r => setTimeout(r, 800));
    }

    setActiveWordId(null);
    setIsPlayingAll(false);
    onEarnStar(5);
    checkCategoryCompletion(nextCompleted, selectedCategory);
  };

  const currentCompletedCount = currentItems.filter(i => completedWords.has(i.id)).length;
  const progressPercent = Math.round((currentCompletedCount / currentItems.length) * 100);

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

      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#EF476F] font-black text-xs uppercase tracking-wider">
              <Star className="w-4 h-4 fill-[#EF476F] text-[#EF476F]" />
              <span>লেভেল ৩: শিশুর প্রথম শব্দভাণ্ডার (어린이 단어)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              বাস্তব উদাহরণ ও ছবির রঙিন শব্দভাণ্ডার
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              ৫ বছরের শিশুদের চারপাশের প্রিয় বিষয়গুলো সহজে ছবি দেখে ও প্রমিত উচ্চারণ শুনে শিখুন।
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handlePlayAllCategory}
              disabled={isPlayingAll}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black font-bengali text-xs sm:text-sm shadow-md transition-all cursor-pointer ${
                isPlayingAll
                  ? 'bg-[#FFD166] text-[#2D3142] animate-pulse'
                  : 'bg-[#06D6A0] hover:bg-[#05b88a] text-white active:scale-95'
              }`}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>{isPlayingAll ? 'শব্দ উচ্চারণ হচ্ছে...' : 'সব শব্দ একসাথে শুনুন ▶️'}</span>
            </button>

            <div className="flex items-center gap-1.5 px-4 py-2 rounded-2xl bg-[#FFD166] text-[#2D3142] text-xs sm:text-sm font-black font-bengali shadow-xs">
              <Sparkles className="w-4 h-4 text-[#2D3142]" />
              <span>মোট শেখা: {completedWords.size} / {VOCABULARY_LIST.length}</span>
            </div>
          </div>
        </div>

        {/* Categories Tab Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const isCategoryDone = completedCategories.has(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playPopSound();
                  setSelectedCategory(cat.id);
                }}
                className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm flex flex-col items-center justify-center border-2 transition-all cursor-pointer relative ${
                  isSelected
                    ? 'bg-[#118AB2] text-white border-[#118AB2] shadow-md scale-102'
                    : 'bg-white hover:bg-[#F9FBF2] text-[#2D3142] border-[#E5E5E5] hover:border-[#118AB2]'
                }`}
              >
                {isCategoryDone && (
                  <span className="absolute top-1.5 right-1.5 text-xs">🏆</span>
                )}
                <span className="text-2xl mb-1">{cat.emoji}</span>
                <span className="tracking-wide">{cat.labelBn}</span>
              </button>
            );
          })}
        </div>

        {/* Category Progress Bar */}
        <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex justify-between text-xs font-black font-bengali text-gray-500 mb-1">
              <span>{currentCategoryMeta.labelBn} অগ্রগতি: {currentCompletedCount} / {currentItems.length} টি শব্দ</span>
              <span className="text-[#06D6A0]">{progressPercent}% সম্পন্ন</span>
            </div>
            <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FFD166] to-[#06D6A0] transition-all duration-300 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Vocabulary Cards Grid in Geometric Balance Theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {currentItems.map((item) => {
          const isDone = completedWords.has(item.id);
          const isActive = activeWordId === item.id;

          return (
            <div
              key={item.id}
              id={`vocab-card-${item.id}`}
              onClick={() => handleSpeak(item)}
              className={`bg-white rounded-3xl p-5 border-2 transition-all duration-300 relative group cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-lg ${
                isActive
                  ? 'border-[#06D6A0] ring-4 ring-[#06D6A0]/20 shadow-xl scale-102'
                  : isDone
                  ? 'border-[#06D6A0]/60 hover:border-[#06D6A0]'
                  : 'border-[#E5E5E5] hover:border-[#118AB2]'
              }`}
            >
              {/* Completed Badge */}
              {isDone && (
                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-[#06D6A0] text-white flex items-center justify-center font-bold text-xs shadow-xs">
                  <Check className="w-4 h-4" />
                </div>
              )}

              <div>
                {/* Huge Emoji Center in Geometric Box */}
                <div className="w-24 h-24 mx-auto rounded-2xl bg-[#F1FAEE] border-2 border-[#A8DADC] flex items-center justify-center text-5xl my-2 shadow-xs group-hover:scale-105 transition-transform">
                  {item.emoji}
                </div>

                {/* Korean Word & Pronunciation */}
                <div className="text-center mt-3">
                  <div className="text-2xl sm:text-3xl font-black text-[#2D3142] font-korean flex items-center justify-center gap-1.5">
                    <span>{item.korean}</span>
                    <Volume2 className="w-5 h-5 text-[#06D6A0]" />
                  </div>
                  <div className="text-xs sm:text-sm font-black text-[#118AB2] font-bengali mt-1">
                    [{item.bengaliPronunciation}]
                  </div>
                </div>

                {/* Bengali & English Meaning */}
                <div className="bg-[#FFF1E6] rounded-2xl p-2.5 mt-3 text-center border border-[#FAD2E1]">
                  <span className="text-base font-black text-[#2D3142] font-bengali block">
                    {item.bengaliMeaning}
                  </span>
                  <span className="text-xs text-gray-500 font-medium">
                    ({item.englishMeaning})
                  </span>
                </div>

                {/* Example sentence if exists */}
                {item.exampleSentenceKr && (
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSpeakSentence(item.exampleSentenceKr!);
                    }}
                    className="mt-3 p-2.5 rounded-2xl bg-[#E8F1F2] hover:bg-[#d6e8ea] text-left border border-[#B3E5FC] transition"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#0077B6] font-korean">
                      <span>{item.exampleSentenceKr}</span>
                      <Volume2 className="w-3 h-3 text-[#0077B6] shrink-0" />
                    </div>
                    <div className="text-[11px] text-gray-700 font-bengali mt-0.5 font-bold">
                      {item.exampleSentenceBn}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Touch Indicator & Bengali Audio */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bengali">
                <button
                  onClick={(e) => handleSpeakBengaliPhonetic(item, e)}
                  className="px-2.5 py-1 rounded-xl bg-[#F0F0F0] hover:bg-[#e0e0e0] text-[#2D3142] font-black text-[11px] flex items-center gap-1 cursor-pointer"
                >
                  <span>🗣️ বাংলায় অর্থ</span>
                </button>
                <span className="font-black text-[#EF476F] bg-[#FFF1E6] px-2 py-0.5 rounded-full text-[11px]">
                  +১ স্টার ⭐
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
