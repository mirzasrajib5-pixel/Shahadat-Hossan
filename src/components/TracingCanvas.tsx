import React, { useRef, useState, useEffect } from 'react';
import { HangulItem } from '../types';
import { HANGUL_VOWELS, HANGUL_CONSONANTS } from '../data/curriculumData';
import { speakKorean, playChime, playPopSound, playSuccessFanfare, playSoftTap } from '../utils/audio';
import { Pencil, RotateCcw, Volume2, Sparkles, Award, Palette, Eraser, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TracingCanvasProps {
  initialLetter?: HangulItem | null;
  speechSpeed: number;
  onEarnStar: (amount?: number) => void;
}

const TRACING_LETTERS = [...HANGUL_VOWELS, ...HANGUL_CONSONANTS];

const CRAYON_COLORS = [
  { name: 'লাল', value: '#EF476F', emoji: '🍓' },
  { name: 'নীল', value: '#118AB2', emoji: '🌊' },
  { name: 'সবুজ', value: '#06D6A0', emoji: '🌿' },
  { name: 'হলুদ', value: '#FFD166', emoji: '☀️' },
  { name: 'কালো', value: '#2D3142', emoji: '✏️' },
  { name: 'কমলা', value: '#F77F00', emoji: '🍊' },
];

export const TracingCanvas: React.FC<TracingCanvasProps> = ({
  initialLetter,
  speechSpeed,
  onEarnStar
}) => {
  const [selectedLetter, setSelectedLetter] = useState<HangulItem>(
    initialLetter || HANGUL_VOWELS[0]
  );
  const [activeColor, setActiveColor] = useState<string>('#EF476F');
  const [brushSize, setBrushSize] = useState<number>(18);
  const [isErasing, setIsErasing] = useState<boolean>(false);
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);

  useEffect(() => {
    if (initialLetter) {
      setSelectedLetter(initialLetter);
    }
  }, [initialLetter]);

  useEffect(() => {
    clearCanvas();
  }, [selectedLetter]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ('touches' in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY
      };
    } else {
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    }
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    isDrawingRef.current = true;
    setHasDrawn(true);
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = isErasing ? '#ffffff' : activeColor;
    ctx.lineWidth = brushSize;
    if (isErasing) {
      ctx.globalCompositeOperation = 'destination-out';
    } else {
      ctx.globalCompositeOperation = 'source-over';
    }
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawingRef.current) return;
    const { x, y } = getCoordinates(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    isDrawingRef.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.closePath();
  };

  const handleFinishTracing = () => {
    playSuccessFanfare();
    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 }
    });
    onEarnStar(5);
    speakKorean(selectedLetter.char, speechSpeed);
  };

  const handleNextLetter = () => {
    const currentIndex = TRACING_LETTERS.findIndex(l => l.id === selectedLetter.id);
    const nextIndex = (currentIndex + 1) % TRACING_LETTERS.length;
    setSelectedLetter(TRACING_LETTERS[nextIndex]);
    playPopSound();
  };

  const handlePrevLetter = () => {
    const currentIndex = TRACING_LETTERS.findIndex(l => l.id === selectedLetter.id);
    const prevIndex = (currentIndex - 1 + TRACING_LETTERS.length) % TRACING_LETTERS.length;
    setSelectedLetter(TRACING_LETTERS[prevIndex]);
    playPopSound();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-[#EF476F] font-black text-xs uppercase tracking-wider">
              <Pencil className="w-4 h-4" />
              <span>লেভেল ৪: হাঙ্গুল ট্রেসিং ও ড্রয়িং ক্যানভাস</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#2D3142] font-kids mt-1">
              রঙিন ক্রেয়ন দিয়ে কোরিয়ান বর্ণ আঁকা
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-bengali font-bold mt-0.5">
              গাইডলাইন দেখে আঙুল বা মাউস দিয়ে দাগ টেনে বর্ণ আঁকুন এবং স্টার জিতুন!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrevLetter}
              className="p-3 rounded-2xl bg-white hover:bg-[#F9FBF2] border-2 border-[#E5E5E5] text-[#2D3142] transition cursor-pointer"
              title="পূর্ববর্তী বর্ণ"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={() => {
                playPopSound();
                speakKorean(selectedLetter.char, speechSpeed);
              }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white font-black font-bengali shadow-xs transition active:scale-95 cursor-pointer"
            >
              <Volume2 className="w-5 h-5" />
              <span>উচ্চারণ: [{selectedLetter.soundBn}]</span>
            </button>

            <button
              onClick={handleNextLetter}
              className="p-3 rounded-2xl bg-white hover:bg-[#F9FBF2] border-2 border-[#E5E5E5] text-[#2D3142] transition cursor-pointer"
              title="পরবর্তী বর্ণ"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Letter Selection Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-4 mt-2 border-t border-gray-100">
          {TRACING_LETTERS.map((l) => {
            const isSelected = selectedLetter.id === l.id;
            return (
              <button
                key={l.id}
                onClick={() => {
                  playPopSound();
                  setSelectedLetter(l);
                }}
                className={`min-w-[48px] h-12 rounded-2xl font-korean font-black text-xl shrink-0 border-2 transition cursor-pointer ${
                  isSelected
                    ? 'bg-[#EF476F] text-white border-[#EF476F] shadow-md scale-105'
                    : 'bg-white hover:bg-[#FFF1E6] text-[#2D3142] border-[#E5E5E5]'
                }`}
              >
                {l.char}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Canvas & Toolbox */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* The Interactive Canvas Area */}
        <div className="lg:col-span-8 bg-white rounded-[36px] p-6 sm:p-8 border-4 border-[#EF476F] shadow-xl flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-4">
            <span className="text-xs font-black text-white bg-[#EF476F] px-3.5 py-1 rounded-full">
              স্ট্রোক সংখ্যা: {selectedLetter.strokes}টি
            </span>
            <button
              onClick={clearCanvas}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-gray-100 text-[#2D3142] font-bengali font-black text-xs border-2 border-[#2D3142] transition cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>মুছে আবার আঁকো</span>
            </button>
          </div>

          {/* Canvas Box with Visual Guide Background */}
          <div className="relative w-full max-w-[400px] aspect-square bg-[#F9FBF2] rounded-3xl border-4 border-dashed border-[#EF476F]/50 overflow-hidden select-none shadow-inner flex items-center justify-center">
            {/* Background Faint Letter Silhouette for Guided Tracing */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
              <span className="text-[240px] font-black font-korean text-[#2D3142] select-none">
                {selectedLetter.char}
              </span>
            </div>

            {/* Canvas overlay */}
            <canvas
              ref={canvasRef}
              width={400}
              height={400}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              className="relative z-10 w-full h-full cursor-crosshair touch-none"
            />
          </div>

          {/* Stroke Instruction Text */}
          <div className="mt-4 w-full bg-[#FFF1E6] rounded-2xl p-3.5 border-2 border-[#FAD2E1] text-center text-xs sm:text-sm font-bengali text-[#2D3142]">
            <span className="font-black text-[#EF476F]">পেন্সিল চালানোর নিয়ম: </span>
            {selectedLetter.strokeGuide.join(' ➔ ')}
          </div>

          {/* Celebratory Finish Button */}
          <div className="mt-5 flex items-center justify-center">
            <button
              onClick={handleFinishTracing}
              className="flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#EF476F] hover:bg-[#d8375c] text-white font-black font-bengali text-base shadow-lg active:scale-95 transition cursor-pointer"
            >
              <Sparkles className="w-5 h-5 fill-[#FFD166] text-[#FFD166]" />
              <span>আমার আঁকা শেষ! (+৫ স্টার ⭐)</span>
            </button>
          </div>
        </div>

        {/* Toolbox Sidebar in Geometric Balance */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Crayon Color Picker */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-sm">
            <h3 className="font-black text-[#2D3142] font-kids text-base mb-3 flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#118AB2]" />
              <span>পেন্সিলের রঙ বাছাই করুন</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {CRAYON_COLORS.map((c) => {
                const isSelected = !isErasing && activeColor === c.value;
                return (
                  <button
                    key={c.value}
                    onClick={() => {
                      playSoftTap();
                      setIsErasing(false);
                      setActiveColor(c.value);
                    }}
                    className={`p-3 rounded-2xl flex items-center gap-2 border-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#2D3142] shadow-md scale-105 ring-2 ring-gray-300'
                        : 'border-[#E5E5E5] hover:border-gray-400'
                    }`}
                  >
                    <div
                      className="w-5 h-5 rounded-full shadow-xs shrink-0"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="text-xs font-black font-bengali text-[#2D3142]">
                      {c.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Eraser Option */}
            <button
              onClick={() => {
                playSoftTap();
                setIsErasing(true);
              }}
              className={`w-full mt-3 p-3 rounded-2xl flex items-center justify-center gap-2 border-2 transition-all cursor-pointer ${
                isErasing
                  ? 'bg-[#2D3142] text-white border-[#2D3142] shadow-md'
                  : 'bg-white hover:bg-gray-100 text-[#2D3142] border-[#E5E5E5]'
              }`}
            >
              <Eraser className="w-4 h-4" />
              <span className="text-xs font-black font-bengali">ইরেজার / রবার ব্যবহার</span>
            </button>
          </div>

          {/* Stroke Thickness Picker */}
          <div className="bg-white rounded-3xl p-5 border-2 border-[#E5E5E5] shadow-sm">
            <h3 className="font-black text-[#2D3142] font-kids text-base mb-3">
              দাগের পুরুত্ব (Brush Size)
            </h3>
            <div className="flex items-center gap-2">
              {[12, 18, 26].map((size) => (
                <button
                  key={size}
                  onClick={() => setBrushSize(size)}
                  className={`flex-1 py-2 rounded-xl text-xs font-black border-2 transition cursor-pointer ${
                    brushSize === size
                      ? 'bg-[#118AB2] text-white border-[#118AB2]'
                      : 'bg-white text-[#2D3142] border-[#E5E5E5]'
                  }`}
                >
                  {size === 12 ? 'চিকন' : size === 18 ? 'মাঝারি' : 'মোটা'}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
