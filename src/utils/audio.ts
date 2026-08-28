// Audio Utility with Native Korean Natural Pronunciation & Synthesized Sound Effects

let audioCtx: AudioContext | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
const audioCache = new Map<string, string>();

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Map single Hangul jamo (vowels and consonants) to their natural vocalized syllable or Korean name
export const HANGUL_PHONETIC_MAP: Record<string, string> = {
  // Basic Vowels (모음) - Single vowels need silent ㅇ (이응) to produce clean natural vocal sound
  'ㅏ': '아',
  'ㅑ': '야',
  'ㅓ': '어',
  'ㅕ': '여',
  'ㅗ': '오',
  'ㅛ': '요',
  'ㅜ': '우',
  'ㅠ': '유',
  'ㅡ': '으',
  'ㅣ': '이',
  // Compound Vowels (이중모음)
  'ㅐ': '애',
  'ㅒ': '얘',
  'ㅔ': '에',
  'ㅖ': '예',
  'ㅘ': '와',
  'ㅙ': '왜',
  'ㅚ': '외',
  'ㅝ': '워',
  'ㅞ': '웨',
  'ㅟ': '위',
  'ㅢ': '의',
  // Basic Consonants (자음) - Standard natural letter names
  'ㄱ': '기역',
  'ㄴ': '니은',
  'ㄷ': '디귿',
  'ㄹ': '리을',
  'ㅁ': '미음',
  'ㅂ': '비읍',
  'ㅅ': '시옷',
  'ㅇ': '이응',
  'ㅈ': '지읒',
  'ㅊ': '치읓',
  'ㅋ': '키읔',
  'ㅌ': '티긑',
  'ㅍ': '피읖',
  'ㅎ': '히읗',
  // Double Consonants (쌍자음)
  'ㄲ': '쌍기역',
  'ㄸ': '쌍디귿',
  'ㅃ': '쌍비읍',
  'ㅆ': '쌍시옷',
  'ㅉ': '쌍지읒',
};

// Map single consonants to pure phonetic syllable (e.g. ㄱ -> 가, ㄴ -> 나) for toddler phonics
export const HANGUL_CONSONANT_SYLLABLE_MAP: Record<string, string> = {
  'ㄱ': '가',
  'ㄴ': '나',
  'ㄷ': '다',
  'ㄹ': '라',
  'ㅁ': '마',
  'ㅂ': '바',
  'ㅅ': '사',
  'ㅇ': '아',
  'ㅈ': '자',
  'ㅊ': '차',
  'ㅋ': '카',
  'ㅌ': '타',
  'ㅍ': '파',
  'ㅎ': '하',
  'ㄲ': '까',
  'ㄸ': '따',
  'ㅃ': '빠',
  'ㅆ': '싸',
  'ㅉ': '짜',
};

// Global cached Korean voice for client fallback
let cachedKoreanVoice: SpeechSynthesisVoice | null = null;

function loadKoreanVoices(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const krVoice = voices.find(v => 
    (v.lang === 'ko-KR' || v.lang === 'ko_KR' || v.lang.toLowerCase().startsWith('ko')) &&
    (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Premium') || v.name.includes('Online') || v.name.includes('Yuna') || v.name.includes('Sora') || v.name.includes('Seoyeon') || v.name.includes('Heami'))
  ) || voices.find(v => v.lang.toLowerCase().includes('ko') || v.lang.toLowerCase().includes('kr'));

  if (krVoice) {
    cachedKoreanVoice = krVoice;
  }
  return cachedKoreanVoice;
}

if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  loadKoreanVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    loadKoreanVoices();
  };
}

/**
 * Natural Korean speech pronunciation:
 * Prioritizes high-definition server-side natural Korean audio stream,
 * with seamless fallback to client Web Speech API.
 */
export function speakKorean(text: string, speed: number = 1.0): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    // Stop previous audio
    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      } catch {
        // ignore
      }
      currentAudioElement = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    // Resolve jamo to natural spoken text
    const trimmed = text.trim();
    const spokenText = HANGUL_PHONETIC_MAP[trimmed] || trimmed;

    // Use our server-side high-fidelity TTS route
    const ttsUrl = `/api/tts?text=${encodeURIComponent(spokenText)}&lang=ko`;
    const audio = new Audio();
    audio.src = ttsUrl;
    audio.playbackRate = Math.max(0.75, Math.min(1.2, speed));
    currentAudioElement = audio;

    let hasFallbackRun = false;

    const runFallbackWebSpeech = () => {
      if (hasFallbackRun) return;
      hasFallbackRun = true;

      if (!('speechSynthesis' in window)) {
        playChime();
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = 'ko-KR';
      utterance.rate = Math.max(0.75, Math.min(1.1, speed));
      utterance.pitch = 1.0;

      const voice = cachedKoreanVoice || loadKoreanVoices();
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();

      window.speechSynthesis.speak(utterance);
    };

    audio.onended = () => {
      currentAudioElement = null;
      resolve();
    };

    audio.onerror = () => {
      currentAudioElement = null;
      runFallbackWebSpeech();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        runFallbackWebSpeech();
      });
    }
  });
}

/**
 * Speak phonetic consonant syllable sound (e.g. '가' for 'ㄱ')
 */
export function speakConsonantPhonetic(consonantChar: string, speed: number = 1.0): Promise<void> {
  const syllable = HANGUL_CONSONANT_SYLLABLE_MAP[consonantChar] || consonantChar;
  return speakKorean(syllable, speed);
}

// Speak Bengali text for translation guidance
export function speakBengali(text: string): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve();
      return;
    }

    if (currentAudioElement) {
      try {
        currentAudioElement.pause();
        currentAudioElement.currentTime = 0;
      } catch {
        // ignore
      }
      currentAudioElement = null;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }

    const ttsUrl = `/api/tts?text=${encodeURIComponent(text.trim())}&lang=bn`;
    const audio = new Audio();
    audio.src = ttsUrl;
    audio.playbackRate = 1.0;
    currentAudioElement = audio;

    let hasFallbackRun = false;
    const runFallback = () => {
      if (hasFallbackRun) return;
      hasFallbackRun = true;

      if (!('speechSynthesis' in window)) {
        resolve();
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'bn-BD';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const bnVoice = voices.find(v => v.lang.includes('bn') || v.lang.includes('BD'));
      if (bnVoice) {
        utterance.voice = bnVoice;
      }

      utterance.onend = () => resolve();
      utterance.onerror = () => resolve();
      window.speechSynthesis.speak(utterance);
    };

    audio.onended = () => {
      currentAudioElement = null;
      resolve();
    };

    audio.onerror = () => {
      currentAudioElement = null;
      runFallback();
    };

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => runFallback());
    }
  });
}

// Play a cheerful celebration fanfare using Web Audio
export function playSuccessFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 523.25, time: 0.0, dur: 0.12 }, // C5
    { freq: 659.25, time: 0.12, dur: 0.12 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.12 }, // G5
    { freq: 1046.50, time: 0.38, dur: 0.35 }, // C6
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.01, now + time);
    gain.gain.linearRampToValueAtTime(0.25, now + time + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

// Grand triumphant victory fanfare for set/level completion
export function playGrandCelebrationFanfare(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  // Dynamic multi-stage trumpet and chime victory melody
  const melody = [
    // Pre-chord fanfare
    { freq: 523.25, time: 0.0, dur: 0.12, type: 'triangle' as OscillatorType, vol: 0.3 }, // C5
    { freq: 659.25, time: 0.12, dur: 0.12, type: 'triangle' as OscillatorType, vol: 0.3 }, // E5
    { freq: 783.99, time: 0.24, dur: 0.12, type: 'triangle' as OscillatorType, vol: 0.35 }, // G5
    { freq: 1046.50, time: 0.36, dur: 0.22, type: 'triangle' as OscillatorType, vol: 0.4 }, // C6
    
    // Quick triumphant trill
    { freq: 880.00, time: 0.58, dur: 0.10, type: 'triangle' as OscillatorType, vol: 0.3 }, // A5
    { freq: 987.77, time: 0.68, dur: 0.10, type: 'triangle' as OscillatorType, vol: 0.3 }, // B5
    { freq: 1046.50, time: 0.78, dur: 0.12, type: 'triangle' as OscillatorType, vol: 0.35 }, // C6
    { freq: 1174.66, time: 0.90, dur: 0.12, type: 'triangle' as OscillatorType, vol: 0.35 }, // D6
    
    // Grand Final Sustained Victory Chord (C6 + E6 + G6)
    { freq: 1046.50, time: 1.04, dur: 0.85, type: 'triangle' as OscillatorType, vol: 0.4 }, // C6
    { freq: 1318.51, time: 1.04, dur: 0.85, type: 'triangle' as OscillatorType, vol: 0.35 }, // E6
    { freq: 1567.98, time: 1.04, dur: 0.85, type: 'triangle' as OscillatorType, vol: 0.3 }, // G6

    // Sparkling bell sparkles on top
    { freq: 2093.00, time: 1.15, dur: 0.4, type: 'sine' as OscillatorType, vol: 0.2 }, // C7
    { freq: 2637.02, time: 1.30, dur: 0.4, type: 'sine' as OscillatorType, vol: 0.2 }, // E7
    { freq: 3135.96, time: 1.45, dur: 0.6, type: 'sine' as OscillatorType, vol: 0.2 }, // G7
  ];

  melody.forEach(({ freq, time, dur, type, vol }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.001, now + time);
    gain.gain.linearRampToValueAtTime(vol, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

// Level Up Sound (sparkling power-up arpeggio)
export function playLevelUpSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 440, time: 0.0, dur: 0.08 },
    { freq: 554.37, time: 0.07, dur: 0.08 },
    { freq: 659.25, time: 0.14, dur: 0.08 },
    { freq: 880, time: 0.21, dur: 0.25 },
  ];

  notes.forEach(({ freq, time, dur }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now + time);

    gain.gain.setValueAtTime(0.01, now + time);
    gain.gain.linearRampToValueAtTime(0.2, now + time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + time + dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + time);
    osc.stop(now + time + dur);
  });
}

// Play a friendly pop sound
export function playPopSound(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, now);
  osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

  gain.gain.setValueAtTime(0.3, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.1);
}

// Play gentle soft tap
export function playSoftTap(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(440, now);
  gain.gain.setValueAtTime(0.15, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.05);
}

// Play a gentle musical chime
export function playChime(): void {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const freqs = [587.33, 880]; // D5, A5
  freqs.forEach((f, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, now + i * 0.08);

    gain.gain.setValueAtTime(0.18, now + i * 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + i * 0.08);
    osc.stop(now + i * 0.08 + 0.3);
  });
}

export function playSuccessChime(): void {
  playChime();
}

export function playFanfare(): void {
  playSuccessFanfare();
}

