import React, { useState } from 'react';
import { BookOpen, Volume2, ArrowLeft, ArrowRight, Sparkles, Star, Award, RotateCcw, CheckCircle } from 'lucide-react';
import { STORY_BOOKS, StoryBook } from '../data/curriculumData';
import { speakKorean, speakBengali, playPopSound, playSuccessFanfare, playSoftTap } from '../utils/audio';
import { triggerGrandConfetti } from '../utils/celebration';

interface MiniStoryReaderProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

export const MiniStoryReader: React.FC<MiniStoryReaderProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [selectedBookIndex, setSelectedBookIndex] = useState<number>(0);
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [completedBooks, setCompletedBooks] = useState<Set<string>>(new Set<string>());

  const currentBook: StoryBook = STORY_BOOKS[selectedBookIndex];
  const currentPage = currentBook.pages[currentPageIndex];

  const handleSelectBook = (idx: number) => {
    setSelectedBookIndex(idx);
    setCurrentPageIndex(0);
    setIsFinished(false);
  };

  const handleReadKorean = () => {
    playPopSound();
    speakKorean(currentPage.koreanText, speechSpeed);
  };

  const handleReadBengali = () => {
    playSoftTap();
    speakBengali(currentPage.bengaliTranslation);
  };

  const handleNextPage = () => {
    playSoftTap();
    if (currentPageIndex < currentBook.pages.length - 1) {
      setCurrentPageIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      if (!completedBooks.has(currentBook.id)) {
        const next = new Set(completedBooks);
        next.add(currentBook.id);
        setCompletedBooks(next);
        onEarnStar(10);
      }
      triggerGrandConfetti();
      playSuccessFanfare();
      speakKorean('참 잘했어요! 동화 끝!', speechSpeed);
    }
  };

  const handlePrevPage = () => {
    playSoftTap();
    if (currentPageIndex > 0) {
      setCurrentPageIndex(prev => prev - 1);
    }
  };

  const handleRestart = () => {
    playSoftTap();
    setCurrentPageIndex(0);
    setIsFinished(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            📖
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              লেভেল ৩ • রঙিন ছবির গল্প (어린이 그림책 도서관)
            </span>
            <h2 className="text-2xl md:text-3xl font-black">ছোট্ট সোনামণির ছবির গল্পঘর</h2>
            <p className="text-white/90 text-sm mt-1">
              ছবি দেখে দেখে সহজ কোরিয়ান বাক্য পড়া ও সুন্দর গল্প শোনা!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
          <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
          <span className="font-bold text-sm">পড়া হয়েছে: {completedBooks.size} / {STORY_BOOKS.length}</span>
        </div>
      </div>

      {/* Storybooks Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {STORY_BOOKS.map((book, idx) => {
          const isDone = completedBooks.has(book.id);
          const isSelected = selectedBookIndex === idx;

          return (
            <button
              key={book.id}
              id={`btn_story_${book.id}`}
              onClick={() => handleSelectBook(idx)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-white border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                  : 'bg-white border-slate-200 hover:border-emerald-300'
              }`}
            >
              {isDone && (
                <span className="absolute top-2.5 right-2.5 text-xs bg-emerald-500 text-white rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
              )}
              <div>
                <span className="text-3xl block mb-2">{book.coverEmoji}</span>
                <h4 className="font-black text-slate-800 text-sm">{book.titleBn}</h4>
              </div>
              <span className="text-xs text-emerald-600 font-semibold mt-2 truncate">{book.titleKr}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Story Reader Box */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-slate-100 shadow-xl max-w-3xl mx-auto">
        {!isFinished ? (
          <div className="space-y-6">
            {/* Header / Page Tracker */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 text-xs text-slate-500 font-bold">
              <span>{currentBook.titleBn}</span>
              <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
                পৃষ্ঠা {currentPageIndex + 1} / {currentBook.pages.length}
              </span>
            </div>

            {/* Huge Emoji Scene Stage */}
            <div className="h-48 sm:h-56 rounded-3xl bg-gradient-to-b from-emerald-50/50 via-teal-50/30 to-white border-2 border-emerald-200 flex items-center justify-center text-6xl sm:text-7xl shadow-inner select-none">
              {currentPage.emoji}
            </div>

            {/* Korean Story Line */}
            <div className="text-center space-y-2">
              <p className="text-2xl sm:text-3xl font-black text-slate-800 leading-relaxed">
                "{currentPage.koreanText}"
              </p>

              <p className="text-xs sm:text-sm font-black text-emerald-600">
                [{currentPage.bengaliPronunciation}]
              </p>

              <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 mt-3">
                <p className="text-sm sm:text-base font-bold text-slate-800">
                  "{currentPage.bengaliTranslation}"
                </p>
              </div>
            </div>

            {/* Keyword Highlighting Chips */}
            <div className="flex items-center justify-center gap-2 flex-wrap pt-2">
              <span className="text-xs font-bold text-slate-400">মূল শব্দ:</span>
              {currentPage.highlightWords.map((hw, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    playPopSound();
                    speakKorean(hw.kr, speechSpeed);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-emerald-50 border border-emerald-300 text-slate-800 font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition shadow-xs"
                >
                  <span className="font-black text-emerald-800">{hw.kr}</span>
                  <span className="text-[11px] text-emerald-600 font-medium">({hw.bn})</span>
                </button>
              ))}
            </div>

            {/* Audio Controls */}
            <div className="flex items-center justify-center gap-3 pt-3">
              <button
                id="btn_story_audio_kr"
                onClick={handleReadKorean}
                className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-emerald-600/20 transition active:scale-95"
              >
                <Volume2 className="w-4 h-4" />
                <span>কোরিয়ান অডিও শুনুন</span>
              </button>

              <button
                id="btn_story_audio_bn"
                onClick={handleReadBengali}
                className="px-5 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md shadow-rose-500/20 transition active:scale-95"
              >
                <span>🗣️ বাংলায় অর্থ</span>
              </button>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100">
              <button
                id="btn_story_prev"
                onClick={handlePrevPage}
                disabled={currentPageIndex === 0}
                className={`px-4 py-2.5 rounded-2xl font-bold text-xs flex items-center gap-1.5 border-2 ${
                  currentPageIndex === 0
                    ? 'opacity-40 border-slate-200 text-slate-400 cursor-not-allowed'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>পূর্ববর্তী পৃষ্ঠা</span>
              </button>

              <button
                id="btn_story_next"
                onClick={handleNextPage}
                className="px-6 py-2.5 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md shadow-teal-600/20 transition active:scale-95"
              >
                <span>{currentPageIndex === currentBook.pages.length - 1 ? 'গল্প শেষ করুন 🎉' : 'পরবর্তী পৃষ্ঠা'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 space-y-5">
            <div className="text-6xl animate-bounce">🏆 🌟 🐯</div>
            <h3 className="text-2xl sm:text-3xl font-black text-slate-800">
              অসাধারণ! "{currentBook.titleBn}" গল্প পড়া সম্পন্ন হয়েছে!
            </h3>
            <p className="text-sm font-bold text-emerald-600">
              +১০ গোল্ডেন স্টার ⭐ রিওয়ার্ড অর্জিত হয়েছে!
            </p>

            <div className="flex justify-center gap-3 pt-2">
              <button
                id="btn_story_restart"
                onClick={handleRestart}
                className="px-6 py-3 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-sm inline-flex items-center gap-2 shadow-md transition active:scale-95"
              >
                <RotateCcw className="w-4 h-4" />
                <span>প্রথম থেকে আবার পড়ো</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
