import React, { useState } from 'react';
import { DayPlan, StickerItem } from '../types';
import { SEVEN_DAY_LESSON_PLAN, INITIAL_STICKERS } from '../data/curriculumData';
import { HANGUL_VOWELS, HANGUL_CONSONANTS } from '../data/curriculumData';
import { speakKorean, playSuccessFanfare, playPopSound, playChime, playSoftTap } from '../utils/audio';
import { Calendar, CheckCircle2, Award, Heart, Sparkles, BookOpen, Clock, Lightbulb, Smile, Printer, X } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ParentLessonGuideProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

export const ParentLessonGuide: React.FC<ParentLessonGuideProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const [completedDays, setCompletedDays] = useState<Set<number>>(new Set());
  const [stickers, setStickers] = useState<StickerItem[]>(INITIAL_STICKERS);
  const [showChartModal, setShowChartModal] = useState<boolean>(false);

  const currentPlan = SEVEN_DAY_LESSON_PLAN.find(p => p.day === activeDay) || SEVEN_DAY_LESSON_PLAN[0];

  const handleToggleDayComplete = (day: number) => {
    playSuccessFanfare();
    const nextSet = new Set(completedDays);
    if (nextSet.has(day)) {
      nextSet.delete(day);
    } else {
      nextSet.add(day);
      onEarnStar(10);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });

      setStickers(prev => {
        const lockedIndex = prev.findIndex(s => !s.unlocked);
        if (lockedIndex !== -1) {
          const updated = [...prev];
          updated[lockedIndex] = { ...updated[lockedIndex], unlocked: true };
          return updated;
        }
        return prev;
      });
    }
    setCompletedDays(nextSet);
  };

  const handleAwardManualSticker = (id: string) => {
    playSuccessFanfare();
    setStickers(prev =>
      prev.map(s => s.id === id ? { ...s, unlocked: true } : s)
    );
    onEarnStar(5);
    confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
  };

  return (
    <div className="space-y-8">
      {/* Top Banner in Geometric Balance Theme */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#EF476F] font-black text-xs uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>অভিভাবকদের নির্দেশিকা ও পাঠ পরিকল্পনা</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              ৫ বছরের শিশুর ৭ দিনের পরিকল্পিত পাঠশালা
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              প্রতিদিন মাত্র ১৫-২০ মিনিট খেলার ছলে বাচ্চাকে কোরিয়ান শেখানোর বিজ্ঞানসম্মত স্টেপ-বাই-স্টেপ গাইড।
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playPopSound();
                setShowChartModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#FFD166] hover:bg-[#f0c250] text-[#2D3142] font-black text-xs sm:text-sm font-bengali shadow-xs transition cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              <span>একনজরে বর্ণমালা চার্ট</span>
            </button>
          </div>
        </div>

        {/* 7-Day Day Selector Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mt-6">
          {SEVEN_DAY_LESSON_PLAN.map((plan) => {
            const isSelected = activeDay === plan.day;
            const isDone = completedDays.has(plan.day);
            return (
              <button
                key={plan.day}
                onClick={() => {
                  playSoftTap();
                  setActiveDay(plan.day);
                }}
                className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'bg-[#EF476F] text-white border-[#EF476F] shadow-md scale-105'
                    : isDone
                    ? 'bg-[#F1FAEE] text-[#06D6A0] border-[#06D6A0]'
                    : 'bg-white hover:bg-[#FFF1E6] text-[#2D3142] border-[#E5E5E5]'
                }`}
              >
                <div className="flex items-center gap-1">
                  <span className="text-xs font-black font-bengali">দিন {plan.day}</span>
                  {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-[#06D6A0]" />}
                </div>
                <span className="text-[11px] opacity-80 truncate max-w-full font-bengali mt-0.5">
                  {plan.day === 1 ? 'স্বরবর্ণ ১' : plan.day === 2 ? 'স্বরবর্ণ ২' : plan.day === 3 ? 'ব্যঞ্জনবর্ণ ১' : plan.day === 4 ? 'ব্যঞ্জনবর্ণ ২' : plan.day === 5 ? 'ব্যঞ্জনবর্ণ ৩' : plan.day === 6 ? 'রং ও সংখ্যা' : 'ভালোবাসা ও রিভিউ'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Day's Detailed Lesson Plan */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#118AB2] shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-gray-100 gap-4">
          <div>
            <span className="px-3.5 py-1 rounded-full bg-[#118AB2] text-white text-xs font-black font-bengali">
              {currentPlan.recommendedTime} পাঠ
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D3142] font-bengali mt-2">
              {currentPlan.titleBn}
            </h3>
            <p className="text-sm font-bold text-[#118AB2] font-korean mt-0.5">
              বিষয়বস্তু: {currentPlan.subtitle}
            </p>
          </div>

          <button
            onClick={() => handleToggleDayComplete(currentPlan.day)}
            className={`px-5 py-3 rounded-2xl font-black font-bengali text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer ${
              completedDays.has(currentPlan.day)
                ? 'bg-[#06D6A0] text-white'
                : 'bg-[#EF476F] hover:bg-[#d8375c] text-white active:scale-95'
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>{completedDays.has(currentPlan.day) ? 'পাঠ সম্পন্ন হয়েছে ✅' : 'আজকের পাঠ শেষ চিহ্নিত করুন (+১০ স্টার ⭐)'}</span>
          </button>
        </div>

        {/* Target Items Pills */}
        <div className="my-5">
          <span className="text-xs font-black text-gray-500 font-bengali block mb-2">
            🎯 আজকের লক্ষ্য বর্ণ ও শব্দসমূহ (ট্যাপ করে শুনুন):
          </span>
          <div className="flex flex-wrap gap-2">
            {currentPlan.targetItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  playPopSound();
                  speakKorean(item, speechSpeed);
                }}
                className="px-4 py-2 rounded-2xl bg-[#F1FAEE] hover:bg-[#dcf5ec] border-2 border-[#06D6A0] text-[#2D3142] font-black font-korean text-lg sm:text-xl shadow-xs transition active:scale-95 cursor-pointer"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Step-by-Step Activities */}
        <div className="my-5 p-4 sm:p-5 rounded-2xl bg-[#F9FBF2] border-2 border-[#E5E5E5]">
          <h4 className="text-sm font-black text-[#2D3142] font-bengali mb-3 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#EF476F]" />
            আজকের ১৫ মিনিটের অ্যাক্টিভিটি সূচি:
          </h4>
          <ul className="space-y-2.5">
            {currentPlan.activitiesBn.map((act, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-gray-700 font-bengali font-bold flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#FFD166] text-[#2D3142] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Parent Teaching Tip */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#FFF1E6] border-2 border-[#FAD2E1] flex items-start gap-3">
          <Lightbulb className="w-6 h-6 text-[#EF476F] shrink-0 mt-0.5" />
          <div>
            <h5 className="text-xs font-black text-[#EF476F] font-bengali uppercase tracking-wider">
              অভিভাবকের জন্য বিশেষ টিপস
            </h5>
            <p className="text-xs sm:text-sm text-[#2D3142] font-bengali font-bold mt-0.5 leading-relaxed">
              {currentPlan.parentTipBn}
            </p>
          </div>
        </div>
      </div>

      {/* Toddler Sticker Board in Geometric Balance */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#FFD166] shadow-xl">
        <div className="flex items-center justify-between mb-5">
          <div>
            <div className="flex items-center gap-2 text-[#2D3142] font-black text-xs">
              <Award className="w-5 h-5 text-[#FFD166]" />
              <span>শিশুর রিওয়ার্ড স্টিকার বোর্ড</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D3142] font-kids mt-1">
              সফলতা স্টিকার সংগ্রহশালা (Sticker Collection)
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 font-bengali font-bold">
              প্রতিদিনের পাঠ শেষে বাচ্চাকে এই সুন্দর স্টিকারগুলো উপহার দিন!
            </p>
          </div>

          <span className="px-3.5 py-1.5 rounded-full bg-[#FFD166] text-[#2D3142] text-xs font-black font-bengali shadow-xs">
            {stickers.filter(s => s.unlocked).length} / {stickers.length} টি স্টিকার
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stickers.map((stk) => (
            <div
              key={stk.id}
              onClick={() => !stk.unlocked && handleAwardManualSticker(stk.id)}
              className={`p-4 rounded-3xl border-3 text-center transition-all flex flex-col items-center justify-center cursor-pointer ${
                stk.unlocked
                  ? 'bg-[#F1FAEE] border-[#06D6A0] shadow-md transform hover:scale-105'
                  : 'bg-gray-50 border-gray-200 opacity-60 hover:opacity-80'
              }`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-xs flex items-center justify-center text-4xl mb-2">
                {stk.unlocked ? stk.emoji : '🔒'}
              </div>
              <span className="text-xs font-black text-[#2D3142] font-bengali">
                {stk.name}
              </span>
              <span className="text-[10px] text-[#06D6A0] font-black font-bengali mt-0.5">
                {stk.unlocked ? '✅ অর্জিত' : 'ট্যাপ করে আনলক করুন'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Hangul Chart Modal */}
      {showChartModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[85vh] overflow-y-auto p-6 sm:p-8 border-4 border-[#2D3142] shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4">
              <h3 className="text-xl font-black text-[#2D3142] font-kids">
                একনজরে সমগ্র হাঙ্গুল বর্ণমালা চার্ট
              </h3>
              <button
                onClick={() => setShowChartModal(false)}
                className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Vowels Grid */}
            <div className="mb-6">
              <h4 className="font-black text-[#06D6A0] text-sm mb-2 font-bengali">
                ১০টি প্রাথমিক স্বরবর্ণ (Vowels):
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {HANGUL_VOWELS.filter(v => v.category === 'vowels').map(v => (
                  <button
                    key={v.id}
                    onClick={() => speakKorean(v.char, speechSpeed)}
                    className="p-3 bg-[#F1FAEE] rounded-2xl border-2 border-[#06D6A0] text-center cursor-pointer hover:scale-105 transition"
                  >
                    <span className="text-2xl font-black font-korean block">{v.char}</span>
                    <span className="text-xs font-bold text-gray-600 font-bengali">[{v.soundBn}]</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Consonants Grid */}
            <div>
              <h4 className="font-black text-[#EF476F] text-sm mb-2 font-bengali">
                ১৪টি প্রাথমিক ব্যঞ্জনবর্ণ (Consonants):
              </h4>
              <div className="grid grid-cols-7 gap-2">
                {HANGUL_CONSONANTS.filter(c => c.category === 'consonants').map(c => (
                  <button
                    key={c.id}
                    onClick={() => speakKorean(c.char, speechSpeed)}
                    className="p-3 bg-[#FFF1E6] rounded-2xl border-2 border-[#EF476F] text-center cursor-pointer hover:scale-105 transition"
                  >
                    <span className="text-2xl font-black font-korean block">{c.char}</span>
                    <span className="text-xs font-bold text-gray-600 font-bengali">[{c.soundBn}]</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
