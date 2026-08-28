import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Play, Pause, RotateCcw, Sparkles, MessageCircle, Mic, Star, CheckCircle, ChevronRight } from 'lucide-react';
import { KID_DIALOGUES } from '../data/curriculumData';
import { speakKorean, playSuccessChime } from '../utils/audio';
import { triggerConfetti } from '../utils/celebration';

interface DailyDialoguePlayerProps {
  onEarnStar: (count: number) => void;
  speechSpeed: number;
}

export const DailyDialoguePlayer: React.FC<DailyDialoguePlayerProps> = ({ onEarnStar, speechSpeed }) => {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [activeLineIndex, setActiveLineIndex] = useState<number | null>(null);
  const [isPlayingAll, setIsPlayingAll] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState<Set<string>>(new Set<string>());

  const scenario = KID_DIALOGUES[selectedScenarioIndex];

  const handlePlayLine = (lineIndex: number) => {
    setActiveLineIndex(lineIndex);
    const line = scenario.dialogue[lineIndex];
    speakKorean(line.korean, speechSpeed);
  };

  const handlePlayAll = async () => {
    if (isPlayingAll) {
      setIsPlayingAll(false);
      return;
    }
    setIsPlayingAll(true);
    for (let i = 0; i < scenario.dialogue.length; i++) {
      setActiveLineIndex(i);
      const line = scenario.dialogue[i];
      speakKorean(line.korean, speechSpeed);
      // Wait for approx duration based on line length
      await new Promise(resolve => setTimeout(resolve, Math.max(2200, line.korean.length * 280)));
    }
    setIsPlayingAll(false);
    if (!completedScenarios.has(scenario.id)) {
      const next = new Set(completedScenarios);
      next.add(scenario.id);
      setCompletedScenarios(next);
      playSuccessChime();
      triggerConfetti();
      onEarnStar(5);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            💬
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              লেভেল ৩ • বাস্তব কথোপকথন (어린이 일상 회화)
            </span>
            <h2 className="text-2xl md:text-3xl font-black">দৈনন্দিন শিশুতোষ কথাবার্তা</h2>
            <p className="text-white/90 text-sm mt-1">
              ঘুম থেকে ওঠা, বন্ধুদের সাথে খেলা ও মা-বাবার সাথে মিষ্টি কোরিয়ান ডায়ালগ!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
          <Star className="w-5 h-5 text-amber-300 fill-amber-300" />
          <span className="font-bold text-sm">সম্পন্ন: {completedScenarios.size} / {KID_DIALOGUES.length}</span>
        </div>
      </div>

      {/* Scenario Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {KID_DIALOGUES.map((sc, idx) => {
          const isDone = completedScenarios.has(sc.id);
          const isSelected = selectedScenarioIndex === idx;
          return (
            <button
              key={sc.id}
              id={`btn_dialogue_${sc.id}`}
              onClick={() => {
                setSelectedScenarioIndex(idx);
                setActiveLineIndex(null);
                setIsPlayingAll(false);
              }}
              className={`p-4 rounded-2xl border-2 text-left transition-all flex flex-col justify-between relative ${
                isSelected
                  ? 'bg-white border-rose-500 shadow-md shadow-rose-500/10 ring-2 ring-rose-500/20'
                  : 'bg-white border-slate-200 hover:border-rose-300'
              }`}
            >
              {isDone && (
                <span className="absolute top-2.5 right-2.5 text-xs bg-emerald-500 text-white rounded-full p-0.5">
                  <CheckCircle className="w-3.5 h-3.5" />
                </span>
              )}
              <div>
                <span className="text-3xl block mb-2">{sc.emoji}</span>
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-wider">{sc.categoryBn}</span>
                <h4 className="font-black text-slate-800 text-sm mt-0.5">{sc.titleBn}</h4>
              </div>
              <span className="text-xs text-slate-400 mt-2 truncate">{sc.titleKr}</span>
            </button>
          );
        })}
      </div>

      {/* Main Conversation Theater */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
        {/* Scenario Header & Action bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{scenario.emoji}</span>
              <h3 className="text-xl font-black text-slate-800">{scenario.titleBn}</h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">{scenario.contextBn}</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              id="btn_play_all_dialogue"
              onClick={handlePlayAll}
              className={`px-4 py-2 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
                isPlayingAll
                  ? 'bg-amber-500 text-white hover:bg-amber-600'
                  : 'bg-rose-500 text-white hover:bg-rose-600 hover:scale-105 active:scale-95'
              }`}
            >
              {isPlayingAll ? (
                <>
                  <Pause className="w-4 h-4" />
                  থামাও
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  পুরো কথোপকথন শুনো
                </>
              )}
            </button>
          </div>
        </div>

        {/* Comic Dialogue Bubbles */}
        <div className="space-y-4 pt-2">
          {scenario.dialogue.map((line, idx) => {
            const isMe = line.speaker === 'tori';
            const isActive = activeLineIndex === idx;

            return (
              <motion.div
                key={idx}
                animate={{ scale: isActive ? 1.02 : 1 }}
                className={`flex gap-3 items-end ${isMe ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Character Avatar */}
                <div className="flex flex-col items-center shrink-0">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-sm ${
                    isMe ? 'bg-amber-100 border border-amber-300' : 'bg-rose-100 border border-rose-300'
                  }`}>
                    {line.speakerEmoji}
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 mt-1">{line.speakerNameBn}</span>
                </div>

                {/* Speech Bubble */}
                <div
                  onClick={() => handlePlayLine(idx)}
                  className={`max-w-[78%] p-4 rounded-3xl cursor-pointer border-2 transition-all relative ${
                    isMe
                      ? isActive
                        ? 'bg-amber-500 text-white border-amber-600 shadow-lg shadow-amber-500/20'
                        : 'bg-amber-50 text-slate-800 border-amber-200 hover:border-amber-400'
                      : isActive
                        ? 'bg-rose-500 text-white border-rose-600 shadow-lg shadow-rose-500/20'
                        : 'bg-slate-50 text-slate-800 border-slate-200 hover:border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className={`text-lg md:text-xl font-black ${isActive ? 'text-white' : 'text-slate-900'}`}>
                      {line.korean}
                    </span>
                    <button
                      id={`btn_speak_line_${idx}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePlayLine(idx);
                      }}
                      className={`p-1.5 rounded-xl transition-colors shrink-0 ${
                        isActive ? 'bg-white/30 text-white' : 'bg-white text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className={`text-xs font-semibold ${isActive ? 'text-white/90' : 'text-rose-600'}`}>
                    {line.bengaliPronunciation}
                  </div>

                  <div className={`text-xs mt-1 ${isActive ? 'text-white/80' : 'text-slate-600'}`}>
                    বাংলা: {line.bengaliMeaning}
                  </div>

                  {line.actionEmoji && (
                    <span className="absolute -top-2 right-4 text-sm bg-white shadow-xs rounded-full px-1.5 py-0.5 border border-slate-100">
                      {line.actionEmoji}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Key Vocabulary Highlights */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 mt-6">
          <div className="text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>এই ডায়ালগের গুরুত্বপূর্ণ শব্দসমূহ:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {scenario.keyVocab.map((v, i) => (
              <button
                key={i}
                id={`btn_vocab_${v.kr}`}
                onClick={() => speakKorean(v.kr, speechSpeed)}
                className="px-3 py-1.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-xs"
              >
                <span className="font-bold text-slate-800">{v.kr}</span>
                <span className="text-slate-500 font-medium">({v.bn})</span>
                <Volume2 className="w-3 h-3 text-rose-500" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
