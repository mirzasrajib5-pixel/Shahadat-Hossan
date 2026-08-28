import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Sparkles, CheckCircle2, RotateCcw, Award, Lightbulb, Play } from 'lucide-react';
import { SENTENCE_PATTERNS } from '../data/curriculumData';
import { speakKorean, playSuccessChime } from '../utils/audio';
import { triggerConfetti } from '../utils/celebration';

interface SentenceBuilderProps {
  onEarnStar: (count: number) => void;
  speechSpeed: number;
}

export const SentenceBuilder: React.FC<SentenceBuilderProps> = ({ onEarnStar, speechSpeed }) => {
  const [selectedPatternIndex, setSelectedPatternIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState<{ kr: string; bn: string; emoji: string } | null>(null);
  const [selectedObject, setSelectedObject] = useState<{ kr: string; bn: string; emoji: string } | null>(null);
  const [selectedVerb, setSelectedVerb] = useState<{ kr: string; bn: string; emoji: string } | null>(null);
  const [builtSentence, setBuiltSentence] = useState<{ kr: string; isComplete: boolean } | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);

  const pattern = SENTENCE_PATTERNS[selectedPatternIndex];

  const handleSelectSubject = (item: { kr: string; bn: string; emoji: string }) => {
    setSelectedSubject(item);
    speakKorean(item.kr, speechSpeed);
    checkSentenceCompletion(item, selectedObject, selectedVerb);
  };

  const handleSelectObject = (item: { kr: string; bn: string; emoji: string }) => {
    setSelectedObject(item);
    speakKorean(item.kr, speechSpeed);
    checkSentenceCompletion(selectedSubject, item, selectedVerb);
  };

  const handleSelectVerb = (item: { kr: string; bn: string; emoji: string }) => {
    setSelectedVerb(item);
    speakKorean(item.kr, speechSpeed);
    checkSentenceCompletion(selectedSubject, selectedObject, item);
  };

  const checkSentenceCompletion = (
    sub: typeof selectedSubject,
    obj: typeof selectedObject,
    vrb: typeof selectedVerb
  ) => {
    if (sub && obj && vrb) {
      const fullKr = `${sub.kr} ${obj.kr} ${vrb.kr}.`;
      setBuiltSentence({ kr: fullKr, isComplete: true });
      playSuccessChime();
      triggerConfetti();
      onEarnStar(3);
      setCompletedCount(prev => prev + 1);
      setTimeout(() => {
        speakKorean(fullKr, speechSpeed);
      }, 300);
    } else {
      setBuiltSentence(null);
    }
  };

  const handleReset = () => {
    setSelectedSubject(null);
    setSelectedObject(null);
    setSelectedVerb(null);
    setBuiltSentence(null);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Module Title Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            🧩
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              লেভেল ২ • ব্যাকরণ ও বাক্য গঠন (어린이 문장)
            </span>
            <h2 className="text-2xl md:text-3xl font-black">মজার বাক্য তৈরির কারখানা</h2>
            <p className="text-white/90 text-sm mt-1">
              কর্তা + কর্ম + ক্রিয়া সাজিয়ে নিজেই তৈরি করো সম্পূর্ণ কোরিয়ান বাক্য!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
          <Award className="w-5 h-5 text-amber-300" />
          <span className="font-bold text-sm">তৈরি বাক্য: {completedCount} টি</span>
        </div>
      </div>

      {/* Pattern Selector Tabs */}
      <div className="flex flex-wrap gap-2">
        {SENTENCE_PATTERNS.map((p, idx) => (
          <button
            key={p.id}
            id={`btn_pattern_${p.id}`}
            onClick={() => {
              setSelectedPatternIndex(idx);
              handleReset();
            }}
            className={`flex-1 min-w-[200px] text-left p-3.5 rounded-2xl border-2 transition-all font-medium text-sm flex items-center justify-between gap-2 ${
              selectedPatternIndex === idx
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-md shadow-emerald-500/20'
                : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <div className="truncate">
              <div className="font-black truncate">{p.patternTitleBn}</div>
              <div className="text-xs opacity-80 truncate">{p.patternTitleKr}</div>
            </div>
            {selectedPatternIndex === idx && <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />}
          </button>
        ))}
      </div>

      {/* Educational Teacher Note */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 text-amber-900 text-sm">
        <Lightbulb className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">শিক্ষকের বিশেষ টিপস: </span>
          {pattern.descriptionBn}
        </div>
      </div>

      {/* Interactive Sentence Workbench (Puzzle Slots) */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 text-slate-800 font-bold">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span>ব্লকগুলো বসিয়ে বাক্য বানাও:</span>
          </div>
          <button
            id="btn_reset_sentence"
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            নতুন করে সাজাও
          </button>
        </div>

        {/* Puzzle Assembly Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* 1. Subject Slot */}
          <div className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[110px] transition-all ${
            selectedSubject ? 'bg-sky-50 border-sky-400 text-sky-900 shadow-sm' : 'bg-slate-50 border-slate-300 text-slate-400'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">
              ১. কে করছে? (Subject)
            </span>
            {selectedSubject ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                <span className="text-3xl block">{selectedSubject.emoji}</span>
                <span className="text-xl font-black text-sky-700">{selectedSubject.kr}</span>
                <span className="text-xs text-slate-600 block">({selectedSubject.bn})</span>
              </motion.div>
            ) : (
              <span className="text-xs font-medium text-slate-400">নিচ থেকে নির্বাচন করুন</span>
            )}
          </div>

          {/* 2. Object Slot */}
          <div className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[110px] transition-all ${
            selectedObject ? 'bg-amber-50 border-amber-400 text-amber-900 shadow-sm' : 'bg-slate-50 border-slate-300 text-slate-400'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">
              ২. কী করছে / কোথায়? (Object)
            </span>
            {selectedObject ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                <span className="text-3xl block">{selectedObject.emoji}</span>
                <span className="text-xl font-black text-amber-700">{selectedObject.kr}</span>
                <span className="text-xs text-slate-600 block">({selectedObject.bn})</span>
              </motion.div>
            ) : (
              <span className="text-xs font-medium text-slate-400">নিচ থেকে নির্বাচন করুন</span>
            )}
          </div>

          {/* 3. Verb Slot */}
          <div className={`p-4 rounded-2xl border-2 border-dashed flex flex-col items-center justify-center min-h-[110px] transition-all ${
            selectedVerb ? 'bg-emerald-50 border-emerald-400 text-emerald-900 shadow-sm' : 'bg-slate-50 border-slate-300 text-slate-400'
          }`}>
            <span className="text-xs font-bold uppercase tracking-wider mb-1 text-slate-500">
              ৩. কী কাজ? (Verb)
            </span>
            {selectedVerb ? (
              <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="text-center">
                <span className="text-3xl block">{selectedVerb.emoji}</span>
                <span className="text-xl font-black text-emerald-700">{selectedVerb.kr}</span>
                <span className="text-xs text-slate-600 block">({selectedVerb.bn})</span>
              </motion.div>
            ) : (
              <span className="text-xs font-medium text-slate-400">নিচ থেকে নির্বাচন করুন</span>
            )}
          </div>
        </div>

        {/* Resulting Sentence Card when complete */}
        <AnimatePresence>
          {builtSentence && selectedSubject && selectedObject && selectedVerb && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 border-2 border-emerald-300 rounded-3xl p-6 text-center space-y-3 shadow-md"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5" />
                অসাধারণ! বাক্যটি সম্পূর্ণ হয়েছে! (+৩ ⭐)
              </div>
              <div className="text-3xl md:text-4xl font-black text-slate-800 tracking-wide">
                {builtSentence.kr}
              </div>
              <div className="text-sm font-semibold text-emerald-700">
                বাংলা অর্থ: {selectedSubject.bn} {selectedObject.bn} {selectedVerb.bn}।
              </div>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  id="btn_speak_built_sentence"
                  onClick={() => speakKorean(builtSentence.kr, speechSpeed)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex items-center gap-2 shadow-md shadow-emerald-600/30 transition-all hover:scale-105 active:scale-95"
                >
                  <Volume2 className="w-5 h-5" />
                  কোরিয়ান উচ্চারণ শুনো
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Selection Options Bank */}
        <div className="space-y-5 pt-4">
          {/* 1. Subjects list */}
          <div>
            <h4 className="text-xs font-black uppercase text-sky-700 tracking-wider mb-2 flex items-center gap-1.5">
              <span>১. কে কাজটি করছে (Subject)?</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {pattern.subjectOptions.map(sub => (
                <button
                  key={sub.kr}
                  id={`btn_sub_${sub.kr}`}
                  onClick={() => handleSelectSubject(sub)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedSubject?.kr === sub.kr
                      ? 'bg-sky-500 text-white border-sky-600 shadow-md font-bold'
                      : 'bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{sub.emoji}</span>
                  <div>
                    <div className="font-bold text-sm">{sub.kr}</div>
                    <div className="text-xs opacity-80">{sub.bn}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 2. Objects list */}
          <div>
            <h4 className="text-xs font-black uppercase text-amber-700 tracking-wider mb-2 flex items-center gap-1.5">
              <span>২. বস্তু বা স্থান (Object / Destination)?</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {pattern.objectOptions.map(obj => (
                <button
                  key={obj.kr}
                  id={`btn_obj_${obj.kr}`}
                  onClick={() => handleSelectObject(obj)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-2.5 transition-all ${
                    selectedObject?.kr === obj.kr
                      ? 'bg-amber-500 text-white border-amber-600 shadow-md font-bold'
                      : 'bg-slate-50 hover:bg-amber-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{obj.emoji}</span>
                  <div className="truncate">
                    <div className="font-bold text-sm truncate">{obj.kr}</div>
                    <div className="text-xs opacity-80 truncate">{obj.bn}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Verbs list */}
          <div>
            <h4 className="text-xs font-black uppercase text-emerald-700 tracking-wider mb-2 flex items-center gap-1.5">
              <span>৩. কাজের ধরন বা ক্রিয়া (Verb)?</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {pattern.verbOptions.map(vrb => (
                <button
                  key={vrb.kr}
                  id={`btn_vrb_${vrb.kr}`}
                  onClick={() => handleSelectVerb(vrb)}
                  className={`p-3 rounded-2xl border text-left flex items-center gap-3 transition-all ${
                    selectedVerb?.kr === vrb.kr
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold'
                      : 'bg-slate-50 hover:bg-emerald-50 text-slate-700 border-slate-200'
                  }`}
                >
                  <span className="text-2xl">{vrb.emoji}</span>
                  <div>
                    <div className="font-bold text-sm">{vrb.kr}</div>
                    <div className="text-xs opacity-80">{vrb.bn}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Reference Model Sentences */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          এই প্যাটার্নের আদর্শ উদাহরণ বাক্যসমূহ:
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {pattern.correctExamples.map((ex, i) => (
            <div
              key={i}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-emerald-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="font-black text-slate-800 text-base">{ex.kr}</span>
                  <button
                    id={`btn_listen_example_${i}`}
                    onClick={() => speakKorean(ex.kr, speechSpeed)}
                    className="p-1.5 rounded-lg bg-emerald-100 text-emerald-700 hover:bg-emerald-200 transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-emerald-700 font-semibold">{ex.bnPron}</div>
                <div className="text-xs text-slate-600 mt-1">{ex.bnMeaning}</div>
              </div>
              <div className="text-[11px] text-slate-400 mt-3 pt-2 border-t border-slate-200/60">
                {ex.explanationBn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
