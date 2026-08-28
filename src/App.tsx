import React, { useState, useEffect } from 'react';
import { TabType, HangulItem } from './types';
import { Navbar } from './components/Navbar';
import { HangulExplorer } from './components/HangulExplorer';
import { SyllableBuilder } from './components/SyllableBuilder';
import { VocabExplorer } from './components/VocabExplorer';
import { SentenceBuilder } from './components/SentenceBuilder';
import { DailyDialoguePlayer } from './components/DailyDialoguePlayer';
import { CultureExplorer } from './components/CultureExplorer';
import { AcademyGraduation } from './components/AcademyGraduation';
import { TracingCanvas } from './components/TracingCanvas';
import { KidGames } from './components/KidGames';
import { SongRhythmPlayer } from './components/SongRhythmPlayer';
import { SpeakAndCheer } from './components/SpeakAndCheer';
import { MiniStoryReader } from './components/MiniStoryReader';
import { ParentLessonGuide } from './components/ParentLessonGuide';
import { speakKorean, speakBengali, playSuccessFanfare, playPopSound } from './utils/audio';
import { triggerGrandConfetti } from './utils/celebration';
import { Sparkles, Heart, Volume2, BookOpen, Smile, Award } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('alphabet');
  const [speechSpeed, setSpeechSpeed] = useState<number>(1.0); // Natural standard speed (1.0x)
  const [stars, setStars] = useState<number>(() => {
    const saved = localStorage.getItem('kkids_stars');
    return saved ? parseInt(saved, 10) : 15;
  });
  const [streak, setStreak] = useState<number>(1);
  const [tracingLetter, setTracingLetter] = useState<HangulItem | null>(null);

  useEffect(() => {
    localStorage.setItem('kkids_stars', stars.toString());
  }, [stars]);

  const handleEarnStar = (amount: number = 1) => {
    setStars(prev => prev + amount);
  };

  const handleToggleSpeed = () => {
    setSpeechSpeed(prev => (prev < 0.95 ? 1.0 : 0.85));
  };

  const handleSelectLetterForTracing = (letter: HangulItem) => {
    setTracingLetter(letter);
    setCurrentTab('tracing');
  };

  const handleMascotGreeting = () => {
    playSuccessFanfare();
    triggerGrandConfetti();
    speakKorean('안녕하세요! 만나서 반가워요!', speechSpeed);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 flex flex-col font-sans antialiased selection:bg-amber-200">
      {/* Top Header & Navigation */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        speechSpeed={speechSpeed}
        onToggleSpeed={handleToggleSpeed}
        stars={stars}
        streak={streak}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Mascot Greeting Banner */}
        <div className="bg-white rounded-3xl border-2 border-slate-100 p-5 sm:p-6 shadow-md relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-5 z-10">
            <div
              onClick={handleMascotGreeting}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-amber-400 text-slate-900 text-4xl sm:text-5xl flex items-center justify-center shadow-md border-2 border-amber-300 cursor-pointer transform hover:scale-105 active:scale-95 transition"
              title="তোরিকে ট্যাপ করে কোরিয়ান সালাম শুনুন ও বাজি ফোটান!"
            >
              🐯
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-white text-xs font-black shadow-2xs mb-1">
                <span>안녕! (আন্নিয়ং!)</span>
                <Volume2 className="w-3.5 h-3.5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                হ্যালো ছোট্ট বন্ধু! আমি তোমার কোরিয়ান বন্ধু "তোরি" 🐯
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5 max-w-xl">
                বর্ণমালা থেকে শুরু করে শব্দ, বাক্য গঠন, বাস্তব কথোপকথন, সংস্কৃতি ও সনদপত্র—সবকিছু একসাথে শেখার পূর্ণাঙ্গ একাডেমি!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            <button
              id="btn_mascot_greeting"
              onClick={handleMascotGreeting}
              className="px-5 py-2.5 rounded-2xl bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-rose-500/20 transition active:scale-95 flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>সালাম শুনো (안녕하세요)</span>
            </button>
          </div>

          {/* Decorative shapes */}
          <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-emerald-50 pointer-events-none" />
          <div className="absolute left-2/3 -top-10 w-24 h-24 rounded-full bg-amber-50 pointer-events-none" />
        </div>

        {/* Tab Views */}
        {currentTab === 'alphabet' && (
          <HangulExplorer
            speechSpeed={speechSpeed}
            onSelectLetterForTracing={handleSelectLetterForTracing}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'builder' && (
          <SyllableBuilder
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'vocab' && (
          <VocabExplorer
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'sentence' && (
          <SentenceBuilder
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'dialogue' && (
          <DailyDialoguePlayer
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'culture' && (
          <CultureExplorer
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'story' && (
          <MiniStoryReader
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'songs' && (
          <SongRhythmPlayer
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'tracing' && (
          <TracingCanvas
            initialLetter={tracingLetter}
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'games' && (
          <KidGames
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'exam' && (
          <AcademyGraduation
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}

        {currentTab === 'guide' && (
          <ParentLessonGuide
            speechSpeed={speechSpeed}
            onEarnStar={handleEarnStar}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-900 text-white py-5 px-6 sm:px-8 text-xs font-medium flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-slate-800">
        <div className="flex flex-wrap items-center gap-4 text-slate-400">
          <span className="text-emerald-400 font-bold">● ৪ স্তরের পূর্ণাঙ্গ পাঠ্যক্রম</span>
          <span className="text-amber-400 font-bold">● বাক্য ও বাস্তব কথোপকথন</span>
          <span className="text-rose-400 font-bold">● সংস্কৃতি, শিষ্টাচার ও সনদপত্র</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="font-bold text-slate-200">শিশু কোরিয়ান একাডেমি</span>
          <span>|</span>
          <span>প্রমিত সিউল উচ্চারণ, আনন্দময় গেম ও শিক্ষক-নির্দেশিকা</span>
        </div>
      </footer>
    </div>
  );
}
