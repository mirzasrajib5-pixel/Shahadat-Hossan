import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, Heart, Award, CheckCircle, Info, Smile } from 'lucide-react';
import { KOREAN_CULTURE_TOPICS } from '../data/curriculumData';
import { speakKorean, playSuccessChime } from '../utils/audio';
import { triggerConfetti } from '../utils/celebration';

interface CultureExplorerProps {
  onEarnStar: (count: number) => void;
  speechSpeed: number;
}

export const CultureExplorer: React.FC<CultureExplorerProps> = ({ onEarnStar, speechSpeed }) => {
  const [selectedTopicIndex, setSelectedTopicIndex] = useState(0);
  const [practicedTopics, setPracticedTopics] = useState<Set<string>>(new Set<string>());
  const [isBowing, setIsBowing] = useState(false);

  const topic = KOREAN_CULTURE_TOPICS[selectedTopicIndex];

  const handlePractice = () => {
    speakKorean(topic.audioPhraseKr, speechSpeed);
    setIsBowing(true);
    setTimeout(() => setIsBowing(false), 2000);

    if (!practicedTopics.has(topic.id)) {
      const updated = new Set(practicedTopics);
      updated.add(topic.id);
      setPracticedTopics(updated);
      playSuccessChime();
      triggerConfetti();
      onEarnStar(4);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            🏮
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              লেভেল ৪ • সংস্কৃতি ও শিষ্টাচার (한국 문화와 예절)
            </span>
            <h2 className="text-2xl md:text-3xl font-black">কোরিয়ান আদব-কায়দা ও সংস্কৃতি</h2>
            <p className="text-white/90 text-sm mt-1">
              বড়দের সালাম দেওয়া, জুতো খোলা ও দুই হাতে সম্মান জানানোর চমৎকার অভ্যাস!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
          <Award className="w-5 h-5 text-amber-300" />
          <span className="font-bold text-sm">শিখেছি: {practicedTopics.size} / {KOREAN_CULTURE_TOPICS.length}</span>
        </div>
      </div>

      {/* Culture Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {KOREAN_CULTURE_TOPICS.map((t, idx) => {
          const isDone = practicedTopics.has(t.id);
          const isSelected = selectedTopicIndex === idx;

          return (
            <button
              key={t.id}
              id={`btn_culture_${t.id}`}
              onClick={() => setSelectedTopicIndex(idx)}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-white border-purple-500 shadow-md ring-2 ring-purple-500/20'
                  : 'bg-white border-slate-200 hover:border-purple-300'
              }`}
            >
              {isDone && (
                <span className="absolute top-2.5 right-2.5 text-xs bg-emerald-500 text-white rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
              )}
              <div>
                <span className="text-3xl block mb-2">{t.emoji}</span>
                <h4 className="font-black text-slate-800 text-sm">{t.titleBn}</h4>
              </div>
              <span className="text-xs text-purple-600 font-semibold mt-2">{t.titleKr}</span>
            </button>
          );
        })}
      </div>

      {/* Main Culture Learning Card */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-4xl p-3 bg-purple-50 rounded-2xl border border-purple-100">{topic.emoji}</span>
            <div>
              <h3 className="text-xl md:text-2xl font-black text-slate-900">{topic.titleBn}</h3>
              <div className="text-sm text-purple-600 font-bold">{topic.titleKr}</div>
            </div>
          </div>
        </div>

        {/* Story & Manner Explanation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-50/70 border border-purple-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-purple-900 text-sm">
              <Smile className="w-4 h-4 text-purple-600" />
              <span>সহজ ভাষায় শিশুদের জন্য:</span>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              {topic.shortDescBn}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 space-y-2">
            <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
              <Heart className="w-4 h-4 text-amber-600 fill-amber-600" />
              <span>শিষ্টাচারের গোল্ডেন রুল:</span>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed">
              {topic.mannerTipBn}
            </p>
          </div>
        </div>

        {/* Interactive Practice Station */}
        <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 text-white rounded-3xl p-6 md:p-8 text-center space-y-4 shadow-xl">
          <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider text-purple-200">
            অনুশীলন করুন ও মুখে বলুন
          </span>

          <motion.div
            animate={{ y: isBowing ? 20 : 0, rotate: isBowing ? 10 : 0 }}
            transition={{ duration: 0.5, repeat: isBowing ? 2 : 0 }}
            className="text-6xl my-2 inline-block"
          >
            {topic.emoji}
          </motion.div>

          <div className="text-2xl md:text-3xl font-black text-amber-300">
            {topic.audioPhraseKr}
          </div>

          <div className="text-sm text-purple-200 max-w-lg mx-auto">
            {topic.audioPhraseBn}
          </div>

          <div className="pt-2">
            <button
              id="btn_culture_practice"
              onClick={handlePractice}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 font-black rounded-2xl text-base shadow-lg shadow-amber-500/30 flex items-center gap-2 mx-auto hover:scale-105 active:scale-95 transition-all"
            >
              <Volume2 className="w-5 h-5 text-slate-900" />
              {topic.interactiveAction} (কোরিয়ান শুনো)
            </button>
          </div>
        </div>

        {/* Fun Culture Fact */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3 text-sky-900 text-sm">
          <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">মজার কোরিয়ান তথ্য: </span>
            {topic.funFact}
          </div>
        </div>
      </div>
    </div>
  );
};
