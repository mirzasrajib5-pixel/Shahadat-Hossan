import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, Award, Sparkles, CheckCircle2, XCircle, RotateCcw, Printer, Star, Heart, Check } from 'lucide-react';
import { GRADUATION_EXAM_QUESTIONS, ExamQuestion } from '../data/curriculumData';
import { speakKorean, playSuccessChime, playFanfare } from '../utils/audio';
import { triggerGrandConfetti, triggerConfetti } from '../utils/celebration';

interface AcademyGraduationProps {
  onEarnStar: (count: number) => void;
  speechSpeed: number;
}

export const AcademyGraduation: React.FC<AcademyGraduationProps> = ({ onEarnStar, speechSpeed }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [score, setScore] = useState(0);
  const [isExamCompleted, setIsExamCompleted] = useState(false);
  const [studentName, setStudentName] = useState('ছোট্ট সোনা');

  const question: ExamQuestion = GRADUATION_EXAM_QUESTIONS[currentQuestionIndex];

  const handleSelectOption = (optionId: string) => {
    if (isAnswerChecked) return;
    setSelectedOptionId(optionId);
  };

  const handleCheckAnswer = () => {
    if (!selectedOptionId || isAnswerChecked) return;
    setIsAnswerChecked(true);

    const chosen = question.options.find(o => o.id === selectedOptionId);
    if (chosen?.isCorrect) {
      setScore(prev => prev + 1);
      playSuccessChime();
      triggerConfetti();
      onEarnStar(3);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex + 1 < GRADUATION_EXAM_QUESTIONS.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedOptionId(null);
      setIsAnswerChecked(false);
    } else {
      setIsExamCompleted(true);
      playFanfare();
      triggerGrandConfetti();
      onEarnStar(15);
    }
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerChecked(false);
    setScore(0);
    setIsExamCompleted(false);
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl shadow-inner">
            🎓
          </div>
          <div>
            <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider mb-1">
              চূড়ান্ত পরীক্ষা ও সনদপত্র • (수료증 & 종합 시험)
            </span>
            <h2 className="text-2xl md:text-3xl font-black">হাঙ্গুল একাডেমি সমাপনী পরীক্ষা</h2>
            <p className="text-white/90 text-sm mt-1">
              বর্ণ, শব্দ, বাক্য ও শিষ্টাচারের সহজ পরীক্ষা দিয়ে অর্জন করো তোমার নিজের সার্টিফিকেট!
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-2xl backdrop-blur-sm">
          <Star className="w-5 h-5 text-amber-200 fill-amber-200" />
          <span className="font-bold text-sm">স্কোর: {score} / {GRADUATION_EXAM_QUESTIONS.length}</span>
        </div>
      </div>

      {!isExamCompleted ? (
        /* Question Card */
        <div className="bg-white rounded-3xl p-6 md:p-8 border-2 border-slate-100 shadow-lg space-y-6">
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span>প্রশ্ন {currentQuestionIndex + 1} / {GRADUATION_EXAM_QUESTIONS.length}</span>
              <span className="text-amber-600 uppercase">বিভাগ: {question.levelCategory}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / GRADUATION_EXAM_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question text & Audio prompt */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg md:text-xl font-black text-slate-900 leading-snug">
                {question.questionBn}
              </h3>
            </div>
            {question.audioPromptKr && (
              <button
                id="btn_exam_audio_prompt"
                onClick={() => speakKorean(question.audioPromptKr!, speechSpeed)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm flex items-center gap-2 shadow-xs transition-colors shrink-0"
              >
                <Volume2 className="w-4 h-4" />
                কোরিয়ান শুনো
              </button>
            )}
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              let btnStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:border-amber-400';

              if (isAnswerChecked) {
                if (opt.isCorrect) {
                  btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-md font-bold';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-md';
                } else {
                  btnStyle = 'bg-slate-100 text-slate-400 border-slate-200 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'bg-amber-500 text-white border-amber-600 shadow-md font-bold';
              }

              return (
                <button
                  key={opt.id}
                  id={`btn_exam_opt_${opt.id}`}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={isAnswerChecked}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-2 ${btnStyle}`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <div className="text-xl font-black">{opt.textKr}</div>
                  <div className="text-xs font-semibold">{opt.textBn}</div>
                </button>
              );
            })}
          </div>

          {/* Explanation & Action Buttons */}
          {isAnswerChecked ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4 pt-2 border-t border-slate-100"
            >
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-slate-700">
                <span className="font-bold text-amber-700">ব্যাখ্যা: </span>
                {question.explanationBn}
              </div>
              <div className="flex justify-end">
                <button
                  id="btn_next_exam_question"
                  onClick={handleNextQuestion}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black rounded-2xl text-base shadow-md shadow-orange-500/20 flex items-center gap-2"
                >
                  <span>{currentQuestionIndex + 1 === GRADUATION_EXAM_QUESTIONS.length ? 'ফলাফল ও সনদপত্র দেখাও' : 'পরের প্রশ্ন'}</span>
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="flex justify-end pt-2">
              <button
                id="btn_check_exam_answer"
                onClick={handleCheckAnswer}
                disabled={!selectedOptionId}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-black rounded-2xl text-base shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all"
              >
                <Check className="w-5 h-5" />
                উত্তর যাচাই করো
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Printable Certificate View */
        <div className="space-y-6">
          {/* Certificate Controller & Name Input */}
          <div className="bg-white rounded-3xl p-6 border-2 border-slate-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="w-full md:w-auto">
              <label className="block text-xs font-bold text-slate-600 mb-1">
                সার্টিফিকেটে শিক্ষার্থীর নাম লিখুন:
              </label>
              <input
                id="input_student_name"
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="যেমন: আরিয়ান / আনিকা"
                className="px-4 py-2.5 border-2 border-slate-200 focus:border-amber-500 rounded-2xl text-sm font-bold text-slate-800 w-full md:w-64 outline-none"
              />
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto justify-end">
              <button
                id="btn_restart_exam"
                onClick={handleRestart}
                className="px-4 py-2.5 border-2 border-slate-200 hover:border-slate-300 rounded-2xl text-xs font-bold text-slate-600 flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                আবার পরীক্ষা দাও
              </button>
              <button
                id="btn_print_certificate"
                onClick={handlePrintCertificate}
                className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl text-sm font-black flex items-center gap-2 shadow-md shadow-orange-500/20 transition-all hover:scale-105"
              >
                <Printer className="w-4 h-4" />
                সার্টিফিকেট প্রিন্ট / সেভ করুন
              </button>
            </div>
          </div>

          {/* Official Graduation Certificate Paper */}
          <div
            id="official_korean_certificate"
            className="bg-gradient-to-br from-amber-50/50 via-white to-amber-50/50 border-[10px] border-double border-amber-600 rounded-3xl p-8 md:p-12 text-center space-y-6 shadow-2xl relative overflow-hidden"
          >
            {/* Corner Decorative Ornaments */}
            <div className="absolute top-4 left-4 text-2xl text-amber-500 font-serif">🌸</div>
            <div className="absolute top-4 right-4 text-2xl text-amber-500 font-serif">🌸</div>
            <div className="absolute bottom-4 left-4 text-2xl text-amber-500 font-serif">🌸</div>
            <div className="absolute bottom-4 right-4 text-2xl text-amber-500 font-serif">🌸</div>

            {/* Certificate Header */}
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl">🏆</div>
              <span className="text-xs font-black tracking-[0.3em] uppercase text-amber-700 block">
                KOREAN LANGUAGE ACADEMY FOR KIDS
              </span>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                শিশু কোরিয়ান একাডেমি সমাপনী সনদপত্র
              </h1>
              <div className="text-sm font-bold text-amber-600">
                어린이 한국어 교육과정 수료증 (Certificate of Completion)
              </div>
            </div>

            {/* Divider */}
            <div className="w-24 h-1 bg-amber-500 mx-auto rounded-full" />

            {/* Student Name Display */}
            <div className="space-y-3 py-2">
              <p className="text-sm text-slate-600">এই মর্মে অত্যন্ত আনন্দের সাথে সনদপত্র প্রদান করা হচ্ছে প্রিয় শিক্ষার্থী:</p>
              <div className="text-3xl md:text-4xl font-black text-amber-800 underline decoration-amber-300 decoration-wavy decoration-2">
                {studentName || 'ছোট্ট সোনা'}
              </div>
              <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                সে সফলতার সাথে হাঙ্গুল বর্ণমালা (Hangul), শব্দভাণ্ডার (Vocabulary), শিশুতোষ বাক্য গঠন (Sentences), বাস্তব কথোপকথন ও কোরিয়ান সংস্কৃতির শিষ্টাচার দক্ষতা অর্জন করেছে।
              </p>
            </div>

            {/* Score & Star Badge */}
            <div className="inline-flex items-center gap-4 bg-amber-100/70 border border-amber-300 px-6 py-3 rounded-2xl">
              <div className="flex items-center gap-1 text-amber-600">
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
                <Star className="w-5 h-5 fill-amber-500" />
              </div>
              <div className="text-sm font-black text-amber-900">
                অর্জিত মান: চমৎকার ফলাফল ({score} / {GRADUATION_EXAM_QUESTIONS.length})
              </div>
            </div>

            {/* Signatures & Seal */}
            <div className="pt-8 grid grid-cols-2 gap-4 border-t border-amber-200/60 max-w-md mx-auto text-xs text-slate-600">
              <div>
                <div className="font-serif italic font-bold text-slate-800 text-sm mb-1">🐯 শিক্ষক তোরি (Tori)</div>
                <div>কোরিয়ান ভাষা শিক্ষক ও মেন্টর</div>
              </div>
              <div>
                <div className="font-bold text-slate-800 text-sm mb-1">{new Date().toLocaleDateString('bn-BD')}</div>
                <div>সনদ প্রদানের তারিখ</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
