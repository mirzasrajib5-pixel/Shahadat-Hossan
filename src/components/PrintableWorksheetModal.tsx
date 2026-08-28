import React from 'react';
import { X, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import { playPopSound } from '../utils/audio';

interface PrintableWorksheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrintableWorksheetModal: React.FC<PrintableWorksheetModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 border-4 border-[#2D3142] shadow-2xl flex flex-col">
        {/* Header (No print) */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-gray-100 mb-4 print:hidden">
          <div>
            <span className="text-xs font-black text-[#EF476F] uppercase font-bengali">
              অভিভাবকদের জন্য উপহার
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#2D3142] font-kids">
              ৫ বছরের শিশুর জন্য প্রিন্টযোগ্য হাঙ্গুল ওয়ার্কশিট 🖨️
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-2xl bg-[#06D6A0] hover:bg-[#05b88a] text-white font-black text-xs sm:text-sm font-bengali flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>প্রিন্ট করুন (Print A4)</span>
            </button>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Worksheet Body */}
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-3xl bg-white space-y-6 print:border-none print:p-0">
          <div className="text-center border-b pb-4">
            <h2 className="text-2xl font-black font-kids text-[#2D3142]">
              মজার কোরিয়ান বর্ণমালা প্র্যাকটিস শিট
            </h2>
            <div className="flex justify-between text-xs text-gray-500 font-bengali font-bold mt-2 px-4">
              <span>শিক্ষার্থীর নাম: ____________________</span>
              <span>তারিখ: ____________</span>
              <span>স্টার রেটিং: ⭐ ⭐ ⭐</span>
            </div>
          </div>

          {/* Section 1: Vowels Tracing Grid */}
          <div>
            <h4 className="text-sm font-black text-[#EF476F] font-bengali mb-2">
              ১. স্বরবর্ণগুলো দাগের ওপর হাত ঘুরিয়ে লেখো (Trace the Vowels):
            </h4>
            <div className="grid grid-cols-5 gap-3">
              {[
                { char: 'ㅏ', bn: 'আ', ex: '사과 🍎' },
                { char: 'ㅑ', bn: 'ইয়া', ex: '야구 ⚾' },
                { char: 'ㅓ', bn: 'অ', ex: '어머니 👩' },
                { char: 'ㅕ', bn: 'ইয়', ex: '여우 🦊' },
                { char: 'ㅗ', bn: 'ও', ex: '오리 🦆' },
                { char: 'ㅛ', bn: 'ইয়ো', ex: '요리 🍳' },
                { char: 'ㅜ', bn: 'উ', ex: '우유 🥛' },
                { char: 'ㅠ', bn: 'ইউ', ex: '유리 🪟' },
                { char: 'ㅡ', bn: 'উউ', ex: '으뜸 🥇' },
                { char: 'ㅣ', bn: 'ই', ex: '오이 🥒' }
              ].map((v, i) => (
                <div key={i} className="border-2 border-gray-400 border-dashed rounded-xl p-3 text-center">
                  <div className="text-3xl font-black font-korean text-gray-300">
                    {v.char}
                  </div>
                  <div className="text-[10px] font-bold text-gray-600 font-bengali mt-1">
                    [{v.bn}] {v.ex}
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 h-8"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Consonants Tracing Grid */}
          <div>
            <h4 className="text-sm font-black text-[#118AB2] font-bengali mb-2">
              ২. ব্যঞ্জনবর্ণগুলো পেনসিল দিয়ে আঁকো (Trace the Consonants):
            </h4>
            <div className="grid grid-cols-7 gap-2">
              {[
                { char: 'ㄱ', bn: 'গ/ক' },
                { char: 'ㄴ', bn: 'ন' },
                { char: 'ㄷ', bn: 'দ/ত' },
                { char: 'ㄹ', bn: 'র/ল' },
                { char: 'ㅁ', bn: 'ম' },
                { char: 'ㅂ', bn: 'ব/প' },
                { char: 'ㅅ', bn: 'স/শ' },
                { char: 'ㅇ', bn: 'অনুস্বার/নিরব' },
                { char: 'ㅈ', bn: 'জ' },
                { char: 'ㅊ', bn: 'ছ' },
                { char: 'ㅋ', bn: 'খ' },
                { char: 'ㅌ', bn: 'থ' },
                { char: 'ㅍ', bn: 'ফ' },
                { char: 'ㅎ', bn: 'হ' }
              ].map((c, i) => (
                <div key={i} className="border border-gray-300 rounded-lg p-2 text-center">
                  <div className="text-2xl font-black font-korean text-gray-300">
                    {c.char}
                  </div>
                  <div className="text-[9px] font-bold text-gray-500 font-bengali">
                    {c.bn}
                  </div>
                  <div className="border-t border-gray-200 mt-1 pt-1 h-6"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Coloring Animals & Words */}
          <div>
            <h4 className="text-sm font-black text-[#06D6A0] font-bengali mb-2">
              ৩. ছবির কোরিয়ান শব্দের নাম বলো ও রঙ করো (Color & Match):
            </h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="border-2 border-gray-300 rounded-2xl p-4 text-center">
                <div className="text-5xl mb-2">🍎</div>
                <div className="text-xl font-black font-korean">사과</div>
                <div className="text-xs font-bengali text-gray-600">সা-গোয়া (আপেল)</div>
              </div>
              <div className="border-2 border-gray-300 rounded-2xl p-4 text-center">
                <div className="text-5xl mb-2">🐱</div>
                <div className="text-xl font-black font-korean">고양이</div>
                <div className="text-xs font-bengali text-gray-600">গো-ইয়াং-ই (বিড়াল)</div>
              </div>
              <div className="border-2 border-gray-300 rounded-2xl p-4 text-center">
                <div className="text-5xl mb-2">🥛</div>
                <div className="text-xl font-black font-korean">우유</div>
                <div className="text-xs font-bengali text-gray-600">উ-ইউ (দুধ)</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
