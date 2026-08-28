import React, { useEffect } from 'react';
import { Trophy, Star, Sparkles, CheckCircle2, ArrowRight, Volume2, X, Award } from 'lucide-react';
import { speakKorean, playGrandCelebrationFanfare } from '../utils/audio';
import { triggerGrandConfetti } from '../utils/celebration';

interface LevelCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleBn: string;
  titleKr: string;
  badgeEmoji: string;
  bonusStars?: number;
  descriptionBn: string;
  onNextLevel?: () => void;
}

export const LevelCelebrationModal: React.FC<LevelCelebrationModalProps> = ({
  isOpen,
  onClose,
  titleBn,
  titleKr,
  badgeEmoji,
  bonusStars = 15,
  descriptionBn,
  onNextLevel,
}) => {
  useEffect(() => {
    if (isOpen) {
      triggerGrandConfetti();
      playGrandCelebrationFanfare();
      setTimeout(() => {
        speakKorean('축하합니다! 참 잘했어요!', 1.0);
      }, 1100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-[36px] max-w-lg w-full p-6 sm:p-8 border-4 border-[#FFD166] shadow-2xl relative overflow-hidden text-center transform animate-in zoom-in-95 duration-300">
        {/* Background decorative bursts */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-[#FFF1E6] rounded-full blur-xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-[#F1FAEE] rounded-full blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-[#2D3142] transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Mascot Badge / Trophy */}
        <div className="relative inline-block mb-3">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-[#FFD166] to-[#F77F00] p-1.5 shadow-lg mx-auto flex items-center justify-center animate-bounce">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-5xl sm:text-6xl shadow-inner">
              {badgeEmoji || '🏆'}
            </div>
          </div>
          <div className="absolute -bottom-2 right-0 bg-[#EF476F] text-white p-1.5 rounded-full shadow-md">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        {/* Korean Cheer Callout */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF1E6] border border-[#FAD2E1] text-[#EF476F] font-black text-xs sm:text-sm font-korean mb-2">
          <Sparkles className="w-4 h-4 text-[#FFD166]" />
          <span>축하합니다! 참 잘했어요! 🎉</span>
        </div>

        {/* Main Title */}
        <h3 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids">
          {titleBn}
        </h3>
        <p className="text-sm font-black text-[#118AB2] font-korean mt-0.5">
          {titleKr}
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-gray-600 font-bengali font-bold mt-2.5 max-w-sm mx-auto leading-relaxed">
          {descriptionBn}
        </p>

        {/* Bonus Stars Reward Card */}
        <div className="my-5 p-4 rounded-3xl bg-[#F9FBF2] border-2 border-[#06D6A0] flex items-center justify-around shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FFD166] flex items-center justify-center shadow-xs">
              <Star className="w-7 h-7 text-[#2D3142] fill-[#2D3142]" />
            </div>
            <div className="text-left">
              <span className="text-xs font-black text-gray-400 font-bengali block">রিওয়ার্ড বোনাস</span>
              <span className="text-lg sm:text-xl font-black text-[#2D3142] font-kids">
                +{bonusStars} গোল্ডেন স্টার! ⭐
              </span>
            </div>
          </div>

          <div className="h-8 w-px bg-gray-200" />

          <div className="text-left">
            <span className="text-xs font-black text-gray-400 font-bengali block">অর্জিত ব্যাজ</span>
            <span className="text-sm font-black text-[#06D6A0] font-bengali">
              মাস্টার লেভেল ✅
            </span>
          </div>
        </div>

        {/* Audio Replay & Next Level Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => {
              triggerGrandConfetti();
              playGrandCelebrationFanfare();
              speakKorean('참 잘했어요!', 1.0);
            }}
            className="flex-1 py-3 px-4 rounded-2xl bg-[#F1FAEE] hover:bg-[#dcf5ec] text-[#06D6A0] border-2 border-[#06D6A0] font-black text-xs sm:text-sm font-bengali flex items-center justify-center gap-2 transition cursor-pointer"
          >
            <Volume2 className="w-4 h-4" />
            <span>আবার শুনুন ও বাজি ফোটান</span>
          </button>

          {onNextLevel ? (
            <button
              onClick={() => {
                onClose();
                onNextLevel();
              }}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#EF476F] hover:bg-[#d8375c] text-white font-black text-xs sm:text-sm font-bengali flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <span>পরবর্তী ধাপে যান</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white font-black text-xs sm:text-sm font-bengali flex items-center justify-center gap-2 shadow-md transition cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>দারুণ! এগিয়ে যাই</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
