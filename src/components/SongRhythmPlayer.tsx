import React, { useState, useEffect, useRef } from 'react';
import { Music, Play, Pause, RotateCcw, Volume2, Sparkles, Star, Award, Heart } from 'lucide-react';
import { speakKorean, playPopSound, playSuccessFanfare, playChime, playSoftTap } from '../utils/audio';
import { triggerGrandConfetti } from '../utils/celebration';

interface SongItem {
  id: string;
  titleBn: string;
  titleKr: string;
  emoji: string;
  tempoMs: number;
  lyrics: { kr: string; bn: string; roman: string }[];
  descriptionBn: string;
}

const NURSERY_SONGS: SongItem[] = [
  {
    id: 'ganada',
    titleBn: 'গানাডারা বর্ণমালা গান',
    titleKr: '가나다 노래 (Ga-Na-Da Song)',
    emoji: '🎵',
    tempoMs: 950,
    descriptionBn: '১৪টি ব্যঞ্জনবর্ণের সাথে "আ" স্বরবর্ণ যোগ করে ছন্দময় গানাডারা গান।',
    lyrics: [
      { kr: '가', bn: 'গা', roman: 'Ga' },
      { kr: '나', bn: 'না', roman: 'Na' },
      { kr: '다', bn: 'দা', roman: 'Da' },
      { kr: '라', bn: 'রা', roman: 'Ra' },
      { kr: '마', bn: 'মা', roman: 'Ma' },
      { kr: '바', bn: 'বা', roman: 'Ba' },
      { kr: '사', bn: 'সা', roman: 'Sa' },
      { kr: '아', bn: 'আ', roman: 'A' },
      { kr: '자', bn: 'জা', roman: 'Ja' },
      { kr: '차', bn: 'ছা', roman: 'Cha' },
      { kr: '카', bn: 'খা', roman: 'Ka' },
      { kr: '타', bn: 'থা', roman: 'Ta' },
      { kr: '파', bn: 'ফা', roman: 'Pa' },
      { kr: '하', bn: 'হা', roman: 'Ha' },
      { kr: '참 잘했어요!', bn: 'শাবাশ! অনেক ভালো!', roman: 'Cham Jal-haess-eo-yo!' }
    ]
  },
  {
    id: 'vowels',
    titleBn: '১০টি স্বরবর্ণের ছন্দ গান',
    titleKr: '모음 송 (Vowel Chant)',
    emoji: '🍎',
    tempoMs: 1000,
    descriptionBn: 'আ, ইয়া, অ, ইয়... সুরের তালে তালে ১০টি স্বরবর্ণ মনে রাখার ছন্দ।',
    lyrics: [
      { kr: '아', bn: 'আ', roman: 'A' },
      { kr: '야', bn: 'ইয়া', roman: 'Ya' },
      { kr: '어', bn: 'অ', roman: 'Eo' },
      { kr: '여', bn: 'ইয়', roman: 'Yeo' },
      { kr: '오', bn: 'ও', roman: 'O' },
      { kr: '요', bn: 'ইয়ো', roman: 'Yo' },
      { kr: '우', bn: 'উ', roman: 'U' },
      { kr: '유', bn: 'ইউ', roman: 'Yu' },
      { kr: '으', bn: 'উউ (দাঁত চেপে)', roman: 'Eu' },
      { kr: '이', bn: 'ই', roman: 'I' },
      { kr: '모음 끝!', bn: 'স্বরবর্ণ শেষ! 🎉', roman: 'Moeum Kkeut!' }
    ]
  },
  {
    id: 'greetings',
    titleBn: 'হ্যালো ও ধন্যবাদ গান',
    titleKr: '인사 노래 (Greetings Song)',
    emoji: '👋',
    tempoMs: 1400,
    descriptionBn: 'প্রতিদিনের প্রয়োজনীয় শুভেচ্ছা বাক্য সুরে সুরে শিখুন।',
    lyrics: [
      { kr: '안녕하세요', bn: 'নমস্কার / আসসালামু আলাইকুম', roman: 'An-nyeong-ha-se-yo' },
      { kr: '만나서 반가워요', bn: 'দেখা হয়ে ভালো লাগলো', roman: 'Man-na-seo ban-ga-wo-yo' },
      { kr: '감사합니다', bn: 'আপনাকে অনেক ধন্যবাদ', roman: 'Gam-sa-ham-ni-da' },
      { kr: '사랑해요', bn: 'তোমাকে ভালোবাসি', roman: 'Sa-rang-hae-yo' },
      { kr: '안녕!', bn: 'বিদায় বন্ধু!', roman: 'An-nyeong!' }
    ]
  },
  {
    id: 'numbers',
    titleBn: 'এক দুই তিন সংখ্যা গান',
    titleKr: '숫자 노래 (Numbers Song)',
    emoji: '🔢',
    tempoMs: 1100,
    descriptionBn: 'হানা, দুল, সেত... আঙুল গুনে কোরিয়ান সংখ্যা শেখার গান।',
    lyrics: [
      { kr: '하나', bn: 'এক (১)', roman: 'Hana' },
      { kr: '둘', bn: 'দুই (২)', roman: 'Dul' },
      { kr: '셋', bn: 'তিন (৩)', roman: 'Set' },
      { kr: '넷', bn: 'চার (৪)', roman: 'Net' },
      { kr: '다섯', bn: 'পাঁচ (৫)', roman: 'Daseot' },
      { kr: '여섯', bn: 'ছয় (৬)', roman: 'Yeoseot' },
      { kr: '일곱', bn: 'সাত (৭)', roman: 'Ilgop' },
      { kr: '여덟', bn: 'আট (৮)', roman: 'Yeodeol' },
      { kr: '아홉', bn: 'নয় (৯)', roman: 'Ahop' },
      { kr: '열', bn: 'দশ (১০)', roman: 'Yeol' },
      { kr: '만세!', bn: 'হুররে!', roman: 'Manse!' }
    ]
  }
];

interface SongRhythmPlayerProps {
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

export const SongRhythmPlayer: React.FC<SongRhythmPlayerProps> = ({
  speechSpeed,
  onEarnStar
}) => {
  const [selectedSongIndex, setSelectedSongIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const isPlayingRef = useRef<boolean>(false);

  const activeSong = NURSERY_SONGS[selectedSongIndex];

  useEffect(() => {
    // Reset play when switching songs
    setIsPlaying(false);
    isPlayingRef.current = false;
    setCurrentWordIndex(-1);
  }, [selectedSongIndex]);

  const handleTogglePlay = async () => {
    if (isPlaying) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      return;
    }

    setIsPlaying(true);
    isPlayingRef.current = true;
    playPopSound();

    for (let i = 0; i < activeSong.lyrics.length; i++) {
      if (!isPlayingRef.current) break;
      setCurrentWordIndex(i);
      const lyric = activeSong.lyrics[i];
      await speakKorean(lyric.kr, speechSpeed);
      await new Promise(r => setTimeout(r, activeSong.tempoMs * (1 / speechSpeed)));
    }

    if (isPlayingRef.current) {
      setIsPlaying(false);
      isPlayingRef.current = false;
      setCurrentWordIndex(-1);
      onEarnStar(5);
      triggerGrandConfetti();
      playSuccessFanfare();
    }
  };

  const handleManualSingLyric = (idx: number) => {
    playPopSound();
    setCurrentWordIndex(idx);
    speakKorean(activeSong.lyrics[idx].kr, speechSpeed);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner in Geometric Balance Theme */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#EF476F] font-black text-xs uppercase tracking-wider">
              <Music className="w-4 h-4" />
              <span>শিক্ষকের বিশেষ ফিচার: ছড়া ও গান (동요)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              গানের ছলে ছলে কোরিয়ান সুর
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              ৫ বছরের শিশুরা সুর ও ছন্দের মাধ্যমে যেকোনো ভাষা ৩ গুণ দ্রুত মনে রাখতে পারে!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTogglePlay}
              className={`flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-black text-sm font-bengali shadow-md transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-[#EF476F] text-white animate-pulse'
                  : 'bg-[#06D6A0] hover:bg-[#05b88a] text-white active:scale-95'
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-white" />}
              <span>{isPlaying ? 'গান থামান ⏸️' : 'পুরো গানটি একসাথে শুনুন ▶️ (+৫ ⭐)'}</span>
            </button>
          </div>
        </div>

        {/* Song Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
          {NURSERY_SONGS.map((song, idx) => {
            const isSel = selectedSongIndex === idx;
            return (
              <button
                key={song.id}
                onClick={() => {
                  playSoftTap();
                  setSelectedSongIndex(idx);
                }}
                className={`p-3.5 rounded-2xl font-black font-bengali text-xs sm:text-sm border-2 transition-all cursor-pointer flex flex-col items-center justify-center ${
                  isSel
                    ? 'bg-[#118AB2] text-white border-[#118AB2] shadow-md scale-102'
                    : 'bg-white hover:bg-gray-50 text-[#2D3142] border-[#E5E5E5]'
                }`}
              >
                <span className="text-2xl mb-1">{song.emoji}</span>
                <span className="truncate max-w-full font-bold">{song.titleBn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Karaoke / Singing Stage Area */}
      <div className="bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#FFD166] shadow-xl">
        <div className="text-center pb-5 border-b border-gray-100">
          <span className="px-4 py-1 rounded-full bg-[#FFF1E6] text-[#EF476F] text-xs font-black font-korean inline-block mb-1">
            {activeSong.titleKr}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-bengali mt-1">
            {activeSong.titleBn}
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 font-bengali font-bold mt-1">
            {activeSong.descriptionBn}
          </p>
        </div>

        {/* Bouncing Lyrics Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3.5 my-6">
          {activeSong.lyrics.map((item, idx) => {
            const isActive = currentWordIndex === idx;
            return (
              <button
                key={idx}
                onClick={() => handleManualSingLyric(idx)}
                className={`p-4 rounded-3xl border-3 flex flex-col items-center justify-center transition-all duration-200 cursor-pointer shadow-xs ${
                  isActive
                    ? 'bg-[#FFD166] text-[#2D3142] border-[#2D3142] scale-110 shadow-xl -translate-y-2 ring-4 ring-[#FFD166]/40'
                    : 'bg-white hover:bg-[#F9FBF2] text-[#2D3142] border-[#E5E5E5] hover:border-[#118AB2]'
                }`}
              >
                <span className="text-3xl sm:text-4xl font-black font-korean">
                  {item.kr}
                </span>
                <span className="text-xs font-black font-bengali mt-1 text-[#118AB2]">
                  [{item.bn}]
                </span>
                <span className="text-[10px] text-gray-400 font-medium">
                  {item.roman}
                </span>
              </button>
            );
          })}
        </div>

        {/* Teacher's Guidance Box */}
        <div className="p-4 rounded-2xl bg-[#F9FBF2] border-2 border-[#06D6A0] flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐯</span>
            <div>
              <span className="text-xs font-black text-[#06D6A0] font-bengali block">তোরি শিক্ষকের টিপস</span>
              <p className="text-xs sm:text-sm font-black text-[#2D3142] font-bengali">
                বাচ্চাকে সাথে নিয়ে একসাথে হাততালি দিয়ে দিয়ে গানের সুরে বলুন!
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              playPopSound();
              speakKorean('참 잘했어요!', speechSpeed);
              triggerGrandConfetti();
            }}
            className="px-4 py-2 rounded-2xl bg-[#06D6A0] text-white font-black text-xs font-bengali shadow-xs shrink-0 cursor-pointer"
          >
            👏 হাততালি ও বাহবা
          </button>
        </div>
      </div>
    </div>
  );
};
