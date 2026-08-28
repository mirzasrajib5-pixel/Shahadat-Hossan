import React from 'react';
import { TabType } from '../types';
import { Sparkles, Volume2, Turtle, Rabbit, Flame, Award, BookOpen, MessageCircle, Music, Puzzle, GraduationCap, Palette, Heart, Calendar } from 'lucide-react';
import { playSoftTap } from '../utils/audio';

interface NavbarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
  speechSpeed: number;
  onToggleSpeed: () => void;
  stars: number;
  streak: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  speechSpeed,
  onToggleSpeed,
  stars,
  streak
}) => {
  const tabs: { id: TabType; icon: React.ReactNode; labelBn: string; labelKr: string; badge?: string }[] = [
    { id: 'alphabet', icon: <span className="text-sm">🔤</span>, labelBn: 'বর্ণমালা', labelKr: '한글' },
    { id: 'builder', icon: <span className="text-sm">🧱</span>, labelBn: 'বর্ণ জোড়া', labelKr: '글자' },
    { id: 'vocab', icon: <span className="text-sm">🍎</span>, labelBn: 'শব্দভাণ্ডার', labelKr: '단어' },
    { id: 'sentence', icon: <Puzzle className="w-3.5 h-3.5" />, labelBn: 'বাক্য গঠন', labelKr: '문장', badge: 'নতুন' },
    { id: 'dialogue', icon: <MessageCircle className="w-3.5 h-3.5" />, labelBn: 'বাস্তব ডায়লগ', labelKr: '회화', badge: 'নতুন' },
    { id: 'story', icon: <BookOpen className="w-3.5 h-3.5" />, labelBn: 'পিকচার স্টোরি', labelKr: '그림책' },
    { id: 'songs', icon: <Music className="w-3.5 h-3.5" />, labelBn: 'ছড়া ও গান', labelKr: '동요' },
    { id: 'culture', icon: <Heart className="w-3.5 h-3.5" />, labelBn: 'সংস্কৃতি ও আদব', labelKr: '문화', badge: 'নতুন' },
    { id: 'tracing', icon: <Palette className="w-3.5 h-3.5" />, labelBn: 'ট্রেসিং ও আঁকা', labelKr: '쓰기' },
    { id: 'games', icon: <span className="text-sm">🎮</span>, labelBn: 'মজার খেলা', labelKr: '놀이' },
    { id: 'exam', icon: <GraduationCap className="w-3.5 h-3.5" />, labelBn: 'পরীক্ষা ও সনদ', labelKr: '수료증', badge: 'সনদপত্র' },
    { id: 'guide', icon: <Calendar className="w-3.5 h-3.5" />, labelBn: '৭ দিনের রুটিন', labelKr: '계획' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-amber-200/80 shadow-xs">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Brand & Logo */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none" 
          onClick={() => { playSoftTap(); onSelectTab('alphabet'); }}
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-black text-2xl shadow-md shadow-emerald-500/20 transform hover:scale-105 transition">
            🐯
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-lg sm:text-xl font-black tracking-tight text-slate-800 flex items-center gap-1.5">
                শিশু কোরিয়ান <span className="text-rose-500">একাডেমি</span>
              </h1>
              <span className="px-2 py-0.5 bg-amber-100 border border-amber-300 text-amber-900 rounded-full text-[10px] font-black uppercase">
                ৫+ বছর
              </span>
            </div>
            <p className="text-[11px] text-slate-500 font-bold">
              অভিজ্ঞ শিক্ষকের তৈরি পূর্ণাঙ্গ কোরিয়ান ভাষা শিক্ষা পাঠ্যক্রম
            </p>
          </div>
        </div>

        {/* Right Stats & Controls */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Daily Streak */}
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 text-xs font-black shadow-2xs">
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>{streak} দিন</span>
          </div>

          {/* Stars / Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-400/90 text-amber-950 text-xs font-black shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-900 fill-amber-900" />
            <span>{stars} ⭐</span>
          </div>

          {/* Voice Speed Toggle */}
          <button
            id="btn_toggle_speech_speed"
            onClick={() => {
              playSoftTap();
              onToggleSpeed();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition active:scale-95 cursor-pointer"
            title="উচ্চারণের গতি পরিবর্তন করুন"
          >
            {speechSpeed < 0.95 ? (
              <>
                <Turtle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="hidden sm:inline">ধীর (০.৮৫x)</span>
                <span className="sm:hidden">০.৮৫x</span>
              </>
            ) : (
              <>
                <Rabbit className="w-3.5 h-3.5 text-sky-600" />
                <span className="hidden sm:inline">স্বাভাবিক (১.০x)</span>
                <span className="sm:hidden">১.০x</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Curriculum Navigation Bar */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-max">
          {tabs.map((tab) => {
            const isActive = currentTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => {
                  playSoftTap();
                  onSelectTab(tab.id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer relative ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 font-black'
                    : 'bg-slate-50 text-slate-700 hover:bg-rose-50/60 hover:text-rose-600 border border-slate-200/80'
                }`}
              >
                {tab.icon}
                <span>{tab.labelBn}</span>
                <span className={`text-[10px] font-normal opacity-80 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                  ({tab.labelKr})
                </span>
                {tab.badge && !isActive && (
                  <span className="absolute -top-1.5 -right-1 px-1.5 py-0.2 bg-amber-400 text-amber-950 font-black text-[9px] rounded-full shadow-2xs">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </header>
  );
};
