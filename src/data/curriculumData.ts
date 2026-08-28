import { HangulItem, VocabItem, DayPlan, StickerItem, SentencePatternItem, DialogueScenario, CultureTopic } from '../types';

export const HANGUL_VOWELS: HangulItem[] = [
  {
    id: 'v_a',
    char: 'ㅏ',
    nameBn: 'আ (A)',
    soundBn: 'আ',
    romanization: 'a',
    category: 'vowels',
    exampleWord: '아이',
    exampleMeaningBn: 'শিশু / বাচ্চা',
    exampleMeaningEn: 'Child / Baby',
    exampleEmoji: '👶',
    strokes: 2,
    strokeGuide: ['১. উপর থেকে নিচে সোজা দাগ ( | )', '২. মাঝখান থেকে ডানে ছোট্ট দাগ ( ㅓ )'],
    funFactBn: 'ডান দিকে মুখ করা দাগ মানে উজ্জ্বল সূর্য উঠছে!'
  },
  {
    id: 'v_ya',
    char: 'ㅑ',
    nameBn: 'ইয়া (Ya)',
    soundBn: 'ইয়া',
    romanization: 'ya',
    category: 'vowels',
    exampleWord: '야구',
    exampleMeaningBn: 'বেসবল খেলা',
    exampleMeaningEn: 'Baseball',
    exampleEmoji: '⚾',
    strokes: 3,
    strokeGuide: ['১. সোজা লম্বা দাগ', '২. উপরে ডানে ছোট দাগ', '৩. নিচে ডানে ছোট দাগ'],
    funFactBn: 'দুইটি ছোট দাগ মানে দুইবার আলো ছড়াচ্ছে!'
  },
  {
    id: 'v_eo',
    char: 'ㅓ',
    nameBn: 'অ / অউ (Eo)',
    soundBn: 'অ',
    romanization: 'eo',
    category: 'vowels',
    exampleWord: '어머니',
    exampleMeaningBn: 'মা',
    exampleMeaningEn: 'Mother',
    exampleEmoji: '👩',
    strokes: 2,
    strokeGuide: ['১. বামে ছোট আড়াআড়ি দাগ', '২. উপর থেকে নিচে সোজা দাগ'],
    funFactBn: 'বাম দিকে দাগ দেওয়া মানে শান্ত সূর্যাস্ত।'
  },
  {
    id: 'v_yeo',
    char: 'ㅕ',
    nameBn: 'ইয় (Yeo)',
    soundBn: 'ইয়',
    romanization: 'yeo',
    category: 'vowels',
    exampleWord: '여우',
    exampleMeaningBn: 'শিয়াল মামা',
    exampleMeaningEn: 'Fox',
    exampleEmoji: '🦊',
    strokes: 3,
    strokeGuide: ['১. উপরে বামে ছোট দাগ', '২. নিচে বামে ছোট দাগ', '৩. সোজা লম্বা দাগ'],
    funFactBn: 'শিয়াল যেমন চটপটে, উচ্চারণও তেমনি চটপটে ইয়!'
  },
  {
    id: 'v_o',
    char: 'ㅗ',
    nameBn: 'ও (O)',
    soundBn: 'ও',
    romanization: 'o',
    category: 'vowels',
    exampleWord: '오이',
    exampleMeaningBn: 'শসা',
    exampleMeaningEn: 'Cucumber',
    exampleEmoji: '🥒',
    strokes: 2,
    strokeGuide: ['১. উপরে ছোট খাড়া দাগ', '২. নিচে শোয়ানো সোজা দাগ ( ㅡ )'],
    funFactBn: 'মাটির উপরে ছোট চারা গাছ যেন মাথা তুলেছে!'
  },
  {
    id: 'v_yo',
    char: 'ㅛ',
    nameBn: 'ইও (Yo)',
    soundBn: 'ইও',
    romanization: 'yo',
    category: 'vowels',
    exampleWord: '요리',
    exampleMeaningBn: 'মজার রান্না',
    exampleMeaningEn: 'Cooking',
    exampleEmoji: '🍳',
    strokes: 3,
    strokeGuide: ['১. বামে ছোট খাড়া দাগ', '২. ডানে ছোট খাড়া দাগ', '৩. নিচে শোয়ানো দাগ'],
    funFactBn: 'দুইটি স্প্রাউট একসাথে হাসছে!'
  },
  {
    id: 'v_u',
    char: 'ㅜ',
    nameBn: 'উ (U)',
    soundBn: 'উ',
    romanization: 'u',
    category: 'vowels',
    exampleWord: '우유',
    exampleMeaningBn: 'সাদা দুধ',
    exampleMeaningEn: 'Milk',
    exampleEmoji: '🥛',
    strokes: 2,
    strokeGuide: ['১. উপরে শোয়ানো লম্বা দাগ', '২. নিচ বরাবর নামানো খাড়া দাগ'],
    funFactBn: 'মাটির নিচে যেন শিকড় নামছে!'
  },
  {
    id: 'v_yu',
    char: 'ㅠ',
    nameBn: 'ইউ (Yu)',
    soundBn: 'ইউ',
    romanization: 'yu',
    category: 'vowels',
    exampleWord: '유리',
    exampleMeaningBn: 'স্বচ্ছ কাঁচ',
    exampleMeaningEn: 'Glass',
    exampleEmoji: '🪟',
    strokes: 3,
    strokeGuide: ['১. শোয়ানো লম্বা দাগ', '২. বামে নিচে দাগ', '৩. ডানে নিচে দাগ'],
    funFactBn: 'খুশিতে হাত তুলে থাকা কার্টুনের মতো!'
  },
  {
    id: 'v_eu',
    char: 'ㅡ',
    nameBn: 'উ (Eu - দাঁত চেপে)',
    soundBn: 'উ (সমতল)',
    romanization: 'eu',
    category: 'vowels',
    exampleWord: '으뜸',
    exampleMeaningBn: 'সেরা / চ্যাম্পিয়ন',
    exampleMeaningEn: 'Best / Number 1',
    exampleEmoji: '🥇',
    strokes: 1,
    strokeGuide: ['১. বাম থেকে ডানে সোজা শোয়ানো দাগ ( — )'],
    funFactBn: 'প্রশস্ত সমতল পৃথিবী বা মাটিকে বোঝায়।'
  },
  {
    id: 'v_i',
    char: 'ㅣ',
    nameBn: 'ই (I)',
    soundBn: 'ই',
    romanization: 'i',
    category: 'vowels',
    exampleWord: '이',
    exampleMeaningBn: 'সুন্দর দাঁত / সংখ্যা ২',
    exampleMeaningEn: 'Tooth / Two',
    exampleEmoji: '🦷',
    strokes: 1,
    strokeGuide: ['১. উপর থেকে নিচে সোজা খাড়া দাগ ( | )'],
    funFactBn: 'মাটির উপর দাঁড়িয়ে থাকা একজন মানুষকে বোঝায়।'
  },
  // Compound vowels popular for kids
  {
    id: 'v_ae',
    char: 'ㅐ',
    nameBn: 'এ (Ae)',
    soundBn: 'এ / এ্যা',
    romanization: 'ae',
    category: 'compound_vowels',
    exampleWord: '새',
    exampleMeaningBn: 'ছোট পাখি',
    exampleMeaningEn: 'Bird',
    exampleEmoji: '🐦',
    strokes: 3,
    strokeGuide: ['১. বামে ㅏ বর্ণ', '২. ডানে ㅣ বর্ণ জোড়া'],
    funFactBn: 'ㅏ এবং ㅣ একসাথে বন্ধু হয়ে তৈরি করেছে ㅐ!'
  },
  {
    id: 'v_e',
    char: 'ㅔ',
    nameBn: 'এ (E)',
    soundBn: 'এ',
    romanization: 'e',
    category: 'compound_vowels',
    exampleWord: '베개',
    exampleMeaningBn: 'নরম বালিশ',
    exampleMeaningEn: 'Pillow',
    exampleEmoji: '🛏️',
    strokes: 3,
    strokeGuide: ['১. বামে ㅓ বর্ণ', '২. ডানে ㅣ বর্ণ জোড়া'],
    funFactBn: 'ㅓ আর ㅣ মিলে হলো ㅔ!'
  },
  {
    id: 'v_wa',
    char: 'ㅘ',
    nameBn: 'ওয়া (Wa)',
    soundBn: 'ওয়া',
    romanization: 'wa',
    category: 'compound_vowels',
    exampleWord: '과일',
    exampleMeaningBn: 'মিষ্টি ফল',
    exampleMeaningEn: 'Fruit',
    exampleEmoji: '🍎',
    strokes: 4,
    strokeGuide: ['১. ㅗ লিখুন', '২. পাশে ㅏ লিখুন'],
    funFactBn: 'ㅗ ও ㅏ একসাথে জোড়া লেগে হয় ওয়া!'
  },
  {
    id: 'v_ui',
    char: 'ㅢ',
    nameBn: 'উই (Ui)',
    soundBn: 'উই',
    romanization: 'ui',
    category: 'compound_vowels',
    exampleWord: '의사',
    exampleMeaningBn: 'ডাক্তার কাকা',
    exampleMeaningEn: 'Doctor',
    exampleEmoji: '👨‍⚕️',
    strokes: 2,
    strokeGuide: ['১. নিচে ㅡ', '২. পাশে ㅣ'],
    funFactBn: 'ㅡ এবং ㅣ মিলে সুন্দর উই।'
  }
];

export const HANGUL_CONSONANTS: HangulItem[] = [
  {
    id: 'c_g',
    char: 'ㄱ',
    nameKr: '기역',
    nameBn: 'গিয়ক (G/K)',
    soundBn: 'গ / ক',
    romanization: 'g/k',
    category: 'consonants',
    exampleWord: '고양이',
    exampleMeaningBn: 'মিষ্টি বিড়াল',
    exampleMeaningEn: 'Cat',
    exampleEmoji: '🐱',
    strokes: 1,
    strokeGuide: ['১. ডানে গিয়ে কোণ করে নিচে নামুন ( ┐ )'],
    funFactBn: 'জিহ্বা যখন মুখের তালু স্পর্শ করে তখন দেখতে এমন লাগে!'
  },
  {
    id: 'c_n',
    char: 'ㄴ',
    nameKr: '니은',
    nameBn: 'নিউ্ন (N)',
    soundBn: 'ন',
    romanization: 'n',
    category: 'consonants',
    exampleWord: '나비',
    exampleMeaningBn: 'রঙিন প্রজাপতি',
    exampleMeaningEn: 'Butterfly',
    exampleEmoji: '🦋',
    strokes: 1,
    strokeGuide: ['১. উপর থেকে নেমে ডানে সোজা যান ( └ )'],
    funFactBn: 'নাক ও জিহ্বার ডগা দিয়ে ন উচ্চারণ হয়।'
  },
  {
    id: 'c_d',
    char: 'ㄷ',
    nameKr: '디귿',
    nameBn: 'দিগুত (D/T)',
    soundBn: 'দ / ত',
    romanization: 'd/t',
    category: 'consonants',
    exampleWord: '다람쥐',
    exampleMeaningBn: 'চটপটে কাঠবিড়ালি',
    exampleMeaningEn: 'Squirrel',
    exampleEmoji: '🐿️',
    strokes: 2,
    strokeGuide: ['১. উপরে আড়াআড়ি দাগ', '২. নিচে ㄴ এর মতো আকৃতি'],
    funFactBn: 'খুলে রাখা মিষ্টি মিষ্টি দরজার মতো!'
  },
  {
    id: 'c_r',
    char: 'ㄹ',
    nameKr: '리을',
    nameBn: 'রিউল (R/L)',
    soundBn: 'র / ল',
    romanization: 'r/l',
    category: 'consonants',
    exampleWord: '라디오',
    exampleMeaningBn: 'গানের রেডিও',
    exampleMeaningEn: 'Radio',
    exampleEmoji: '📻',
    strokes: 3,
    strokeGuide: ['১. উপরে ㄱ এর মতো', '২. মাঝে ㅡ দাগ', '৩. নিচে ㄴ জোড়া'],
    funFactBn: 'জিহ্বা বাঁকিয়ে সর্পিল গতিতে র এবং ল উচ্চারিত হয়!'
  },
  {
    id: 'c_m',
    char: 'ㅁ',
    nameKr: '미음',
    nameBn: 'মিউম (M)',
    soundBn: 'ম',
    romanization: 'm',
    category: 'consonants',
    exampleWord: '모자',
    exampleMeaningBn: 'সুন্দর টুপি',
    exampleMeaningEn: 'Hat / Cap',
    exampleEmoji: '🧢',
    strokes: 3,
    strokeGuide: ['১. বামে সোজা দাগ', '২. ডানে গিয়ে নিচে কোণ', '৩. নিচে বন্ধ করে দাগ'],
    funFactBn: 'দুইটি ঠোঁট বন্ধ করলে চারকোনা বক্সের মতো দেখায়!'
  },
  {
    id: 'c_b',
    char: 'ㅂ',
    nameKr: '비읍',
    nameBn: 'বিউপ (B/P)',
    soundBn: 'ব / প',
    romanization: 'b/p',
    category: 'consonants',
    exampleWord: '바나나',
    exampleMeaningBn: 'মিষ্টি পাকা কলা',
    exampleMeaningEn: 'Banana',
    exampleEmoji: '🍌',
    strokes: 4,
    strokeGuide: ['১. বামে খাড়া দাগ', '২. ডানে খাড়া দাগ', '৩. মাঝে দাগ', '৪. নিচে জোড়া'],
    funFactBn: 'যেন একটা ছোট্ট বালতি পানি নিয়ে দাঁড়িয়ে আছে!'
  },
  {
    id: 'c_s',
    char: 'ㅅ',
    nameKr: '시옷',
    nameBn: 'সিওত (S)',
    soundBn: 'স / শ',
    romanization: 's',
    category: 'consonants',
    exampleWord: '사과',
    exampleMeaningBn: 'লাল আপেল',
    exampleMeaningEn: 'Apple',
    exampleEmoji: '🍎',
    strokes: 2,
    strokeGuide: ['১. উপর থেকে বামে ঢালু দাগ', '২. মাঝখান থেকে ডানে ঢালু দাগ ( ^ )'],
    funFactBn: 'দাঁতের আকারের মতো দেখতে সুন্দর ছোট্ট পাহাড়!'
  },
  {
    id: 'c_ng',
    char: 'ㅇ',
    nameKr: '이응',
    nameBn: 'ইউং (Silent / Ng)',
    soundBn: 'শুরুতে নীরব, শেষে ং',
    romanization: 'ng / silent',
    category: 'consonants',
    exampleWord: '아기',
    exampleMeaningBn: 'ছোট্ট সোনা বেবি',
    exampleMeaningEn: 'Baby',
    exampleEmoji: '👶',
    strokes: 1,
    strokeGuide: ['১. উপর থেকে গোল করে বৃত্ত আঁকুন ( O )'],
    funFactBn: 'গলার খোলা মুখের মতো গোল্লা বৃত্ত!'
  },
  {
    id: 'c_j',
    char: 'ㅈ',
    nameKr: '지읒',
    nameBn: 'জিউত (J)',
    soundBn: 'জ',
    romanization: 'j',
    category: 'consonants',
    exampleWord: '자동차',
    exampleMeaningBn: 'ছোট গাড়ি',
    exampleMeaningEn: 'Car',
    exampleEmoji: '🚗',
    strokes: 2,
    strokeGuide: ['১. উপরে আড়াআড়ি দাগ দিয়ে কোণ', '২. নিচ থেকে ডানে দাগ'],
    funFactBn: 'ㅅ এর উপরে টুপি পরালেই জিউত হয়ে যায়!'
  },
  {
    id: 'c_ch',
    char: 'ㅊ',
    nameKr: '치읓',
    nameBn: 'ছিউত (Ch)',
    soundBn: 'ছ',
    romanization: 'ch',
    category: 'consonants',
    exampleWord: '치즈',
    exampleMeaningBn: 'মজাদার চিজ',
    exampleMeaningEn: 'Cheese',
    exampleEmoji: '🧀',
    strokes: 3,
    strokeGuide: ['১. একদম উপরে ছোট দাগ', '২. মাঝে ㅈ এর মতো বাকিটা'],
    funFactBn: 'জ এর মাথায় ছোট্ট পালক বসানো!'
  },
  {
    id: 'c_k',
    char: 'ㅋ',
    nameKr: '키읔',
    nameBn: 'খিউক (K)',
    soundBn: 'খ / ক (দম দিয়ে)',
    romanization: 'k',
    category: 'consonants',
    exampleWord: '코끼리',
    exampleMeaningBn: 'বড় শুঁড়ের হাতি',
    exampleMeaningEn: 'Elephant',
    exampleEmoji: '🐘',
    strokes: 2,
    strokeGuide: ['১. ㄱ এর মতো লিখুন', '২. মাঝে একটি অতিরিক্ত দাগ দিন'],
    funFactBn: 'ㄱ এর চেয়ে বেশি বাতাস বের হয়!'
  },
  {
    id: 'c_t',
    char: 'ㅌ',
    nameKr: '티읕',
    nameBn: 'থিউত (T)',
    soundBn: 'থ / ঠ',
    romanization: 't',
    category: 'consonants',
    exampleWord: '토끼',
    exampleMeaningBn: 'সাদা তুলতুলে খরগোশ',
    exampleMeaningEn: 'Rabbit',
    exampleEmoji: '🐰',
    strokes: 3,
    strokeGuide: ['১. উপরের দাগ', '২. মাঝের দাগ', '৩. নিচের ㄷ অংশ'],
    funFactBn: 'ইংরেজি E অক্ষরের মতো দেখতে!'
  },
  {
    id: 'c_p',
    char: 'ㅍ',
    nameKr: '피읖',
    nameBn: 'ফিউপ (P)',
    soundBn: 'ফ / প (দম দিয়ে)',
    romanization: 'p',
    category: 'consonants',
    exampleWord: '포도',
    exampleMeaningBn: 'রসালো আঙুর',
    exampleMeaningEn: 'Grapes',
    exampleEmoji: '🍇',
    strokes: 4,
    strokeGuide: ['১. উপরের লম্বা দাগ', '২. দুইটি খাড়া খুঁটি', '৩. নিচের জোড়া দাগ'],
    funFactBn: 'একটা ছোট্ট দরজা বা টেবিলের মতো!'
  },
  {
    id: 'c_h',
    char: 'ㅎ',
    nameKr: '히읗',
    nameBn: 'হিউত (H)',
    soundBn: 'হ',
    romanization: 'h',
    category: 'consonants',
    exampleWord: '호랑이',
    exampleMeaningBn: 'রাখাল বাঘ মামা',
    exampleMeaningEn: 'Tiger',
    exampleEmoji: '🐯',
    strokes: 3,
    strokeGuide: ['১. মাথায় ছোট দাগ', '২. মাঝের চওড়া দাগ', '৩. নিচে গোল বৃত্ত ( ㅇ )'],
    funFactBn: 'বৃত্তের মাথায় টুপি পরা একজন মানুষ!'
  },
  // Double consonants
  {
    id: 'c_kk',
    char: 'ㄲ',
    nameKr: '쌍기역',
    nameBn: 'সাং-গিয়ক (Kk)',
    soundBn: 'ক (শক্তভাবে)',
    romanization: 'kk',
    category: 'double_consonants',
    exampleWord: '꼬리',
    exampleMeaningBn: 'বানরের লেজ',
    exampleMeaningEn: 'Tail',
    exampleEmoji: '🐒',
    strokes: 2,
    strokeGuide: ['১. প্রথম ㄱ লিখুন', '২. পাশে আরেকটি ㄱ জোড়া দিন'],
    funFactBn: 'দুই ভাই ㄱ ও ㄱ হাত ধরাধরি করে দাঁড়িয়েছে!'
  },
  {
    id: 'c_tt',
    char: 'ㄸ',
    nameKr: '쌍디귿',
    nameBn: 'সাং-দিগুত (Tt)',
    soundBn: 'ত (শক্তভাবে)',
    romanization: 'tt',
    category: 'double_consonants',
    exampleWord: '딸기',
    exampleMeaningBn: 'মিষ্টি স্ট্রবেরি',
    exampleMeaningEn: 'Strawberry',
    exampleEmoji: '🍓',
    strokes: 4,
    strokeGuide: ['১. প্রথম ㄷ লিখুন', '২. পাশে আরেকটি ㄷ লিখুন'],
    funFactBn: 'দুইটি ㄷ পাশাপাশি বসেছে।'
  },
  {
    id: 'c_pp',
    char: 'ㅃ',
    nameKr: '쌍비읍',
    nameBn: 'সাং-বিউপ (Pp)',
    soundBn: 'প (শক্তভাবে)',
    romanization: 'pp',
    category: 'double_consonants',
    exampleWord: '빵',
    exampleMeaningBn: 'গরম নরম পাউরুটি',
    exampleMeaningEn: 'Bread',
    exampleEmoji: '🍞',
    strokes: 8,
    strokeGuide: ['১. প্রথম ㅂ লিখুন', '২. পাশে আরেকটি ㅂ লিখুন'],
    funFactBn: 'দুইটি ㅂ মিলে হলো ㅃ (প্পাং = রুটি)!'
  },
  {
    id: 'c_ss',
    char: 'ㅆ',
    nameKr: '쌍시옷',
    nameBn: 'সাং-সিওত (Ss)',
    soundBn: 'স (শক্তভাবে)',
    romanization: 'ss',
    category: 'double_consonants',
    exampleWord: '쌀',
    exampleMeaningBn: 'সাদা চাল / ধান',
    exampleMeaningEn: 'Rice (raw)',
    exampleEmoji: '🍚',
    strokes: 4,
    strokeGuide: ['১. প্রথম ㅅ লিখুন', '২. পাশে আরেকটি ㅅ লিখুন'],
    funFactBn: 'দুইটি ছোট পাহাড় একসাথে!'
  },
  {
    id: 'c_jj',
    char: 'ㅉ',
    nameKr: '쌍지읒',
    nameBn: 'সাং-জিউত (Jj)',
    soundBn: 'চ (শক্তভাবে)',
    romanization: 'jj',
    category: 'double_consonants',
    exampleWord: '찌개',
    exampleMeaningBn: 'গরম কোরিয়ান স্যুপ',
    exampleMeaningEn: 'Korean Stew',
    exampleEmoji: '🍲',
    strokes: 4,
    strokeGuide: ['১. প্রথম ㅈ লিখুন', '২. পাশে আরেকটি ㅈ লিখুন'],
    funFactBn: 'দুইটি ㅈ মিলে শক্তিশালী ㅉ তৈরি হয়!'
  }
];

export const VOCABULARY_LIST: VocabItem[] = [
  // Animals 🐾
  {
    id: 'ani_1',
    korean: '고양이',
    bengaliPronunciation: 'গোয়াঙ্গি (Go-yang-i)',
    bengaliMeaning: 'বিড়াল',
    englishMeaning: 'Cat',
    emoji: '🐱',
    category: 'animals',
    exampleSentenceKr: '귀여운 고양이에요.',
    exampleSentenceBn: 'মিষ্টি একটা বিড়াল।'
  },
  {
    id: 'ani_2',
    korean: '강아지',
    bengaliPronunciation: 'গাং-আ-জি (Gang-a-ji)',
    bengaliMeaning: 'কুকুরছানা',
    englishMeaning: 'Puppy / Dog',
    emoji: '🐶',
    category: 'animals',
    exampleSentenceKr: '강아지가 달려요.',
    exampleSentenceBn: 'কুকুরছানা দৌড়াচ্ছে।'
  },
  {
    id: 'ani_3',
    korean: '토끼',
    bengaliPronunciation: 'থোক্কি (To-kki)',
    bengaliMeaning: 'খরগোশ',
    englishMeaning: 'Rabbit',
    emoji: '🐰',
    category: 'animals',
    exampleSentenceKr: '토끼가 깡충깡충 뛰어요.',
    exampleSentenceBn: 'খরগোশ লাফিয়ে লাফিয়ে চলে।'
  },
  {
    id: 'ani_4',
    korean: '곰',
    bengaliPronunciation: 'গোম (Gom)',
    bengaliMeaning: 'ভালুক মামা',
    englishMeaning: 'Bear',
    emoji: '🐻',
    category: 'animals',
    exampleSentenceKr: '곰 세 마리가 한 집에 있어.',
    exampleSentenceBn: 'তিনটি ভালুক এক ঘরে থাকে (কোরিয়ান শিশুতোষ গান)।'
  },
  {
    id: 'ani_5',
    korean: '호랑이',
    bengaliPronunciation: 'হোরঙ্গি (Ho-rang-i)',
    bengaliMeaning: 'বাঘ',
    englishMeaning: 'Tiger',
    emoji: '🐯',
    category: 'animals',
    exampleSentenceKr: '멋진 호랑이에요.',
    exampleSentenceBn: 'বীর বাঘ।'
  },
  {
    id: 'ani_6',
    korean: '코끼리',
    bengaliPronunciation: 'খোক্কিরি (Ko-kki-ri)',
    bengaliMeaning: 'হাতি',
    englishMeaning: 'Elephant',
    emoji: '🐘',
    category: 'animals',
    exampleSentenceKr: '코끼리는 코가 길어요.',
    exampleSentenceBn: 'হাতির শুঁড় অনেক লম্বা।'
  },
  {
    id: 'ani_7',
    korean: '나비',
    bengaliPronunciation: 'নাবি (Na-bi)',
    bengaliMeaning: 'প্রজাপতি',
    englishMeaning: 'Butterfly',
    emoji: '🦋',
    category: 'animals',
    exampleSentenceKr: '나비가 팔랑팔랑 날아요.',
    exampleSentenceBn: 'প্রজাপতি ডানা মেলে উড়ছে।'
  },
  {
    id: 'ani_8',
    korean: '사자',
    bengaliPronunciation: 'সাজা (Sa-ja)',
    bengaliMeaning: 'সিংহ',
    englishMeaning: 'Lion',
    emoji: '🦁',
    category: 'animals',
    exampleSentenceKr: '사자는 동물의 왕이에요.',
    exampleSentenceBn: 'সিংহ বনের রাজা।'
  },

  // Food & Fruits 🍎
  {
    id: 'food_1',
    korean: '사과',
    bengaliPronunciation: 'সাগোয়া (Sa-gwa)',
    bengaliMeaning: 'আপেল',
    englishMeaning: 'Apple',
    emoji: '🍎',
    category: 'food',
    exampleSentenceKr: '맛있는 빨간 사과!',
    exampleSentenceBn: 'মজার লাল আপেল!'
  },
  {
    id: 'food_2',
    korean: '바나나',
    bengaliPronunciation: 'বানানা (Ba-na-na)',
    bengaliMeaning: 'কলা',
    englishMeaning: 'Banana',
    emoji: '🍌',
    category: 'food',
    exampleSentenceKr: '달콤한 바나나를 먹어요.',
    exampleSentenceBn: 'মিষ্টি কলা খাচ্ছি।'
  },
  {
    id: 'food_3',
    korean: '딸기',
    bengaliPronunciation: 'ত্তালগি (Ttal-gi)',
    bengaliMeaning: 'স্ট্রবেরি',
    englishMeaning: 'Strawberry',
    emoji: '🍓',
    category: 'food',
    exampleSentenceKr: '딸기가 좋아요.',
    exampleSentenceBn: 'স্ট্রবেরি আমার খুব পছন্দ।'
  },
  {
    id: 'food_4',
    korean: '우유',
    bengaliPronunciation: 'উইউ (U-yu)',
    bengaliMeaning: 'দুধ',
    englishMeaning: 'Milk',
    emoji: '🥛',
    category: 'food',
    exampleSentenceKr: '매일 우유를 마셔요.',
    exampleSentenceBn: 'প্রতিদিন দুধ খাই।'
  },
  {
    id: 'food_5',
    korean: '빵',
    bengaliPronunciation: 'প্পাং (Ppang)',
    bengaliMeaning: 'রুটি',
    englishMeaning: 'Bread',
    emoji: '🍞',
    category: 'food',
    exampleSentenceKr: '따뜻한 빵이에요.',
    exampleSentenceBn: 'গরম গরম নরম রুটি।'
  },
  {
    id: 'food_6',
    korean: '물',
    bengaliPronunciation: 'মুল (Mul)',
    bengaliMeaning: 'পানি',
    englishMeaning: 'Water',
    emoji: '💧',
    category: 'food',
    exampleSentenceKr: '시원한 물 주세요.',
    exampleSentenceBn: 'ঠান্ডা পানি দিন প্লিজ।'
  },
  {
    id: 'food_7',
    korean: '수박',
    bengaliPronunciation: 'সুবাক (Su-bak)',
    bengaliMeaning: 'তরমুজ',
    englishMeaning: 'Watermelon',
    emoji: '🍉',
    category: 'food',
    exampleSentenceKr: '시원하고 달콤한 수박!',
    exampleSentenceBn: 'রসালো মিষ্টি তরমুজ!'
  },
  {
    id: 'food_8',
    korean: '포도',
    bengaliPronunciation: 'ফো দো (Po-do)',
    bengaliMeaning: 'আঙুর',
    englishMeaning: 'Grapes',
    emoji: '🍇',
    category: 'food',
    exampleSentenceKr: '보라색 포도예요.',
    exampleSentenceBn: 'বেগুনি রঙের আঙুর।'
  },

  // Colors 🎨
  {
    id: 'col_1',
    korean: '빨간색',
    bengaliPronunciation: 'প্পাল-গান-সেক (Ppal-gan-saek)',
    bengaliMeaning: 'লাল রঙ',
    englishMeaning: 'Red color',
    emoji: '🔴',
    category: 'colors',
    exampleSentenceKr: '빨간색 사과예요.',
    exampleSentenceBn: 'লাল রঙের আপেল।'
  },
  {
    id: 'col_2',
    korean: '노란색',
    bengaliPronunciation: 'নোরান-সেক (No-ran-saek)',
    bengaliMeaning: 'হলুদ রঙ',
    englishMeaning: 'Yellow color',
    emoji: '🟡',
    category: 'colors',
    exampleSentenceKr: '노란색 바나나예요.',
    exampleSentenceBn: 'হলুদ রঙের কলা।'
  },
  {
    id: 'col_3',
    korean: '파란색',
    bengaliPronunciation: 'ফারান-সেক (Pa-ran-saek)',
    bengaliMeaning: 'নীল রঙ',
    englishMeaning: 'Blue color',
    emoji: '🔵',
    category: 'colors',
    exampleSentenceKr: '파란 하늘이 예뻐요.',
    exampleSentenceBn: 'নীল আকাশ অনেক সুন্দর।'
  },
  {
    id: 'col_4',
    korean: '초록색',
    bengaliPronunciation: 'ছোরোক-সেক (Cho-rok-saek)',
    bengaliMeaning: 'সবুজ রঙ',
    englishMeaning: 'Green color',
    emoji: '🟢',
    category: 'colors',
    exampleSentenceKr: '초록색 나무예요.',
    exampleSentenceBn: 'সবুজ রঙের গাছ।'
  },
  {
    id: 'col_5',
    korean: '분홍색',
    bengaliPronunciation: 'বুনহং-সেক (Bun-hong-saek)',
    bengaliMeaning: 'গোলাপি রঙ',
    englishMeaning: 'Pink color',
    emoji: '🌸',
    category: 'colors',
    exampleSentenceKr: '예쁜 분홍색 꽃이에요.',
    exampleSentenceBn: 'সুন্দর গোলাপি ফুল।'
  },
  {
    id: 'col_6',
    korean: '하얀색',
    bengaliPronunciation: 'হায়ান-সেক (Ha-yan-saek)',
    bengaliMeaning: 'সাদা রঙ',
    englishMeaning: 'White color',
    emoji: '⚪',
    category: 'colors',
    exampleSentenceKr: '하얀 눈이 내려요.',
    exampleSentenceBn: 'সাদা বরফ পড়ছে।'
  },

  // Numbers 🔢 (Native Korean numbers for counting items)
  {
    id: 'num_1',
    korean: '하나',
    bengaliPronunciation: 'হানা (Ha-na)',
    bengaliMeaning: 'এক (১)',
    englishMeaning: 'One (1)',
    emoji: '1️⃣',
    category: 'numbers',
    exampleSentenceKr: '사과 하나 주세요.',
    exampleSentenceBn: 'একটি আপেল দিন।'
  },
  {
    id: 'num_2',
    korean: '둘',
    bengaliPronunciation: 'দুল (Dul)',
    bengaliMeaning: 'দুই (২)',
    englishMeaning: 'Two (2)',
    emoji: '2️⃣',
    category: 'numbers',
    exampleSentenceKr: '눈이 둘 있어요.',
    exampleSentenceBn: 'আমার দুটি চোখ আছে।'
  },
  {
    id: 'num_3',
    korean: '셋',
    bengaliPronunciation: 'সেত (Set)',
    bengaliMeaning: 'তিন (৩)',
    englishMeaning: 'Three (3)',
    emoji: '3️⃣',
    category: 'numbers',
    exampleSentenceKr: '곰 세 마리!',
    exampleSentenceBn: 'তিনটি ভালুক!'
  },
  {
    id: 'num_4',
    korean: '넷',
    bengaliPronunciation: 'নেত (Net)',
    bengaliMeaning: 'চার (৪)',
    englishMeaning: 'Four (4)',
    emoji: '4️⃣',
    category: 'numbers',
    exampleSentenceKr: '다리가 넷이에요.',
    exampleSentenceBn: 'চারটি পা।'
  },
  {
    id: 'num_5',
    korean: '다섯',
    bengaliPronunciation: 'দাসত (Da-seot)',
    bengaliMeaning: 'পাঁচ (৫)',
    englishMeaning: 'Five (5)',
    emoji: '5️⃣',
    category: 'numbers',
    exampleSentenceKr: '손가락이 다섯 개!',
    exampleSentenceBn: 'হাতে পাঁচটি আঙুল!'
  },
  {
    id: 'num_6',
    korean: '열',
    bengaliPronunciation: 'ইওল (Yeol)',
    bengaliMeaning: 'দশ (১০)',
    englishMeaning: 'Ten (10)',
    emoji: '🔟',
    category: 'numbers',
    exampleSentenceKr: '열까지 세어봐요.',
    exampleSentenceBn: 'চল দশ পর্যন্ত গুনি।'
  },

  // Family & Body 👨‍👩‍👧
  {
    id: 'fam_1',
    korean: '엄마',
    bengaliPronunciation: 'ওম্মা (Eom-ma)',
    bengaliMeaning: 'আম্মু / মা',
    englishMeaning: 'Mom / Mommy',
    emoji: '👩‍👧',
    category: 'family_body',
    exampleSentenceKr: '엄마 사랑해요!',
    exampleSentenceBn: 'মা তোমাকে অনেক ভালোবাসি!'
  },
  {
    id: 'fam_2',
    korean: '아빠',
    bengaliPronunciation: 'আপ্পা (A-ppa)',
    bengaliMeaning: 'আব্বু / বাবা',
    englishMeaning: 'Dad / Daddy',
    emoji: '👨‍👦',
    category: 'family_body',
    exampleSentenceKr: '아빠 최고!',
    exampleSentenceBn: 'বাবা তুমি সেরা!'
  },
  {
    id: 'fam_3',
    korean: '눈',
    bengaliPronunciation: 'নুন (Nun)',
    bengaliMeaning: 'চোখ / বরফ',
    englishMeaning: 'Eye / Snow',
    emoji: '👀',
    category: 'family_body',
    exampleSentenceKr: '반짝반짝 눈!',
    exampleSentenceBn: 'উজ্জ্বল চোখ!'
  },
  {
    id: 'fam_4',
    korean: '코',
    bengaliPronunciation: 'খো (Ko)',
    bengaliMeaning: 'নাক',
    englishMeaning: 'Nose',
    emoji: '👃',
    category: 'family_body',
    exampleSentenceKr: '오뚝한 코!',
    exampleSentenceBn: 'সুন্দর ছোট্ট নাক!'
  },
  {
    id: 'fam_5',
    korean: '입',
    bengaliPronunciation: 'ইপ (Ip)',
    bengaliMeaning: 'মুখ / ঠোঁট',
    englishMeaning: 'Mouth',
    emoji: '👄',
    category: 'family_body',
    exampleSentenceKr: '냠냠 맛있는 입!',
    exampleSentenceBn: 'মজার মজার খাওয়ার মুখ!'
  },
  {
    id: 'fam_6',
    korean: '손',
    bengaliPronunciation: 'সোন (Son)',
    bengaliMeaning: 'হাত',
    englishMeaning: 'Hand',
    emoji: '✋',
    category: 'family_body',
    exampleSentenceKr: '예쁜 손뼉을 쳐요.',
    exampleSentenceBn: 'সুন্দর হাততালি দাও।'
  },

  // Daily Phrases 💬
  {
    id: 'phr_1',
    korean: '안녕하세요',
    bengaliPronunciation: 'আন্নিয়ং-হাসেও (An-nyeong-ha-se-yo)',
    bengaliMeaning: 'নমস্কার / আসসালামু আলাইকুম / হ্যালো',
    englishMeaning: 'Hello / Greetings',
    emoji: '👋',
    category: 'phrases',
    exampleSentenceKr: '선생님, 안녕하세요!',
    exampleSentenceBn: 'শিক্ষক মহাশয়, আদাব/নমস্কার!'
  },
  {
    id: 'phr_2',
    korean: '감사합니다',
    bengaliPronunciation: 'খামসাহামনিদা (Gam-sa-ham-ni-da)',
    bengaliMeaning: 'অনেক ধন্যবাদ',
    englishMeaning: 'Thank you very much',
    emoji: '🙏',
    category: 'phrases',
    exampleSentenceKr: '도와주셔서 감사합니다.',
    exampleSentenceBn: 'সাহায্য করার জন্য ধন্যবাদ।'
  },
  {
    id: 'phr_3',
    korean: '사랑해요',
    bengaliPronunciation: 'সারংহেও (Sa-rang-hae-yo)',
    bengaliMeaning: 'তোমাকে ভালোবাসি',
    englishMeaning: 'I love you',
    emoji: '❤️',
    category: 'phrases',
    exampleSentenceKr: '엄마 아빠 사랑해요!',
    exampleSentenceBn: 'মা-বাবা তোমাদের অনেক ভালোবাসি!'
  },
  {
    id: 'phr_4',
    korean: '안녕',
    bengaliPronunciation: 'আন্নিয়ং (An-nyeong)',
    bengaliMeaning: 'হাই / বিদায় (বন্ধুদের সাথে)',
    englishMeaning: 'Hi / Bye (informal)',
    emoji: '🎈',
    category: 'phrases',
    exampleSentenceKr: '친구야 안녕!',
    exampleSentenceBn: 'বন্ধু, হাই / টাটা!'
  },
  {
    id: 'phr_5',
    korean: '잘 자요',
    bengaliPronunciation: 'জাল জায়ো (Jal ja-yo)',
    bengaliMeaning: 'শুভ রাত্রি / ভালো করে ঘুমাও',
    englishMeaning: 'Good night / Sleep well',
    emoji: '🌙',
    category: 'phrases',
    exampleSentenceKr: '좋은 꿈 꾸고 잘 자요.',
    exampleSentenceBn: 'সুন্দর স্বপ্ন দেখে ঘুমাও।'
  }
];

export const SEVEN_DAY_LESSON_PLAN: DayPlan[] = [
  {
    day: 1,
    titleBn: 'দিন ১: প্রথম স্বরবর্ণের বন্ধুত্ব (Vowels Part 1)',
    subtitle: 'ㅏ, ㅑ, ㅓ, ㅕ, ㅗ এবং শসা (오이)',
    targetItems: ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', '오이'],
    descriptionBn: 'প্রথম দিনে বাচ্চাকে ৫টি সহজ স্বরবর্ণের সাথে পরিচয় করিয়ে দিন। মাটির উপর সূর্যোদয় (ㅏ) এবং সূর্যাস্তের (ㅓ) গল্প বলুন।',
    activitiesBn: [
      '১. বর্ণ কার্ডে ট্যাপ করে কোরিয়ান উচ্চারণ শুনুন।',
      '২. স্ক্রিনে ট্রেসিং ক্যানভাসে ㅏ ও ㅗ আঙুল দিয়ে আঁকুন।',
      '৩. শসা (오이) শব্দের ছবিটি দেখে উচ্চারণটি ৩ বার বলুন।'
    ],
    parentTipBn: 'বাচ্চাকে জোর করবেন না। প্রতিদিন মাত্র ১৫ মিনিট আনন্দের সাথে উচ্চারণ শুনে হাততালি দিন!',
    recommendedTime: '১৫ মিনিট'
  },
  {
    day: 2,
    titleBn: 'দিন ২: বাকি স্বরবর্ণ ও দুধ খাওয়া (Vowels Part 2)',
    subtitle: 'ㅛ, ㅜ, ㅠ, ㅡ, ㅣ এবং দুধ (우유), বাচ্চা (아이)',
    targetItems: ['ㅛ', 'ㅜ', 'ㅠ', 'ㅡ', 'ㅣ', '우유', '아이'],
    descriptionBn: 'মাটির নিচের শিকড় (ㅜ) ও মানুষের মতো সোজা দাঁড়া (ㅣ) শিখুন। দুধ ও শিশু শব্দ শিখুন।',
    activitiesBn: [
      '১. দুধের গ্লাস দেখে "উ-ইউ" (우유) বলে হাততালি দিন।',
      '২. বুদবুদ পপ গেম খেলে সঠিক স্বরবর্ণ ফাটিয়ে স্টার নিন।',
      '৩. "ই" (ㅣ) এবং "উ" (ㅡ) ট্রেস করে একটি গোল্ডেন স্টার অর্জন করুন।'
    ],
    parentTipBn: 'দুধ খাওয়ার সময় বাচ্চাকে বলুন: "চল আজ কোরিয়ান ভাষায় 우유 (উ-ইউ) বলে খাই!"',
    recommendedTime: '১৫-২০ মিনিট'
  },
  {
    day: 3,
    titleBn: 'দিন ৩: পশু-পাখির প্রথম ব্যঞ্জনবর্ণ (Consonants Part 1)',
    subtitle: 'ㄱ, ㄴ, ㄷ, ㄹ এবং বিড়াল (고양이), প্রজাপতি (나비)',
    targetItems: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', '고양이', '나비', '다람쥐'],
    descriptionBn: 'কোরিয়ান জিভ কীভাবে বাঁকে তা দিয়ে বর্ণ তৈরি। ㄱ দিয়ে বিড়াল ও ㄴ দিয়ে প্রজাপতি ডানা মেলা!',
    activitiesBn: [
      '১. বিড়াল দেখে "গোয়াঙ্গি" এবং প্রজাপতি দেখে "নাবি" বলুন।',
      '২. কার্ড ম্যাচিং খেলায় ছবি ও কোরিয়ান শব্দের কার্ড জোড়া লাগান।',
      '৩. ㄱ এবং ㄴ বর্ণের স্ট্রোক ১-২ ট্রেস করুন।'
    ],
    parentTipBn: 'বিড়াল বা প্রজাপতি দেখার সময় কোরিয়ান নাম মনে করিয়ে দিন। বাস্তব উদাহরণের চেয়ে ভালো শিক্ষক আর নেই!',
    recommendedTime: '১৫-২০ মিনিট'
  },
  {
    day: 4,
    titleBn: 'দিন ৪: মজার চারকোনা ও গোল্লা বর্ণ (Consonants Part 2)',
    subtitle: 'ㅁ, ㅂ, ㅅ, ㅇ এবং টুপি (모자), আপেল (사과), বেবি (아기)',
    targetItems: ['ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', '모자', '사과', '아기'],
    descriptionBn: 'মুখ বন্ধ করে চারকোনা বাক্স ㅁ (মিউম) এবং গোল বৃত্ত ㅇ (ইউং) দিয়ে শব্দ তৈরি!',
    activitiesBn: [
      '১. বর্ণ জোড়া (Syllable Builder) এ গিয়ে ㅁ + ㅏ = মা বানিয়ে শুনুন।',
      '২. লাল আপেল (사과) দেখে ৩ বার উচ্চারণ করুন।',
      '৩. সাউন্ড কুইজে শুনে সঠিক ছবির উপর ট্যাপ করুন।'
    ],
    parentTipBn: 'বাচ্চাকে আয়নার সামনে নিয়ে মুখ দিয়ে ㅁ (বক্স) এবং ㅇ (বৃত্ত) বানিয়ে দেখাতে পারেন।',
    recommendedTime: '১৫-২০ মিনিট'
  },
  {
    day: 5,
    titleBn: 'দিন ৫: বীর বাঘ ও খরগোশের বর্ণ (Consonants Part 3)',
    subtitle: 'ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅎ এবং খরগোশ (토끼), বাঘ (호랑이)',
    targetItems: ['ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', '토끼', '호랑이', '포도'],
    descriptionBn: 'শক্তিশালী বাতাস বের করার বর্ণ যেমন খিউক (ㅋ) ও থিউত (ㅌ)। লাফানো খরগোশ ও গর্জন করা বাঘ!',
    activitiesBn: [
      '১. সব ব্যঞ্জনবর্ণের চার্টে হাত দিয়ে সুর করে পড়ুন।',
      '২. মেমোরি কার্ড খেলায় বাঘ ও খরগোশ খুঁজে বের করুন।',
      '৩. আঙুর (포도) ও গাড়ি (자동차) শব্দ বলুন।'
    ],
    parentTipBn: 'বাঘের মতো হুংকার দিয়ে "호랑이" এবং খরগোশের মতো লাফিয়ে "토끼" অভিনয় করে শেখান!',
    recommendedTime: '২০ মিনিট'
  },
  {
    day: 6,
    titleBn: 'দিন ৬: রঙের মেলা ও সংখ্যা গণনা (Colors & Numbers)',
    subtitle: 'রঙ (লাল, হলুদ, নীল) এবং সংখ্যা ১ থেকে ৫ (하나, 둘, 셋, 넷, 다섯)',
    targetItems: ['빨간색', '노란색', '파란색', '하나', '둘', '셋', '넷', '다섯'],
    descriptionBn: 'আঙুল গুনে কোরিয়ান সংখ্যা শেখা ও ঘরের চারপাশের রঙের কোরিয়ান নাম বলা।',
    activitiesBn: [
      '১. হাতের ৫ আঙুল খুলে এক এক করে কোরিয়ান গণনা গুনুন।',
      '২. লাল জামা বা হলুদ খেলনা দেখিয়ে কোরিয়ান রঙের নাম বলুন।',
      '৩. বেলুন পপ গেমে রঙের বেলুন ফাটান।'
    ],
    parentTipBn: 'খেলনা গোনার সময় ১, ২, ৩ না বলে "হানা, দুল, সেত" বলে গুনে উৎসাহিত করুন।',
    recommendedTime: '১৫-২০ মিনিট'
  },
  {
    day: 7,
    titleBn: 'দিন ৭: ভালোবাসা ও মিষ্টি কথার উৎসব (Love & Review Party)',
    subtitle: '엄마, 아빠, 안녕하세요, 감사합니다, 사랑해요 ও সব স্টিকার আনলক',
    targetItems: ['엄মা', '아빠', '안녕하세요', '감사합니다', '사랑해요', '잘 자요'],
    descriptionBn: 'মা-বাবাকে "সারংহেও" (ভালোবাসি) বলা, হ্যালো বলা এবং পুরো সপ্তাহের সাফল্যের স্টার ও সার্টিফিকেট উদযাপন!',
    activitiesBn: [
      '১. মা বা বাবাকে জড়িয়ে ধরে "সারংহেও!" বলুন।',
      '২. সব গেমের মিক্সড কুইজ খেলে চূড়ান্ত স্টার মেডেল নিন।',
      '৩. স্টিকার বোর্ডে সুপারস্টার ট্রফি স্টিকার স্ট্যাম্প লাগান।'
    ],
    parentTipBn: 'বাচ্চাকে অনেক জড়িয়ে ধরুন ও প্রশংসা করুন। ওর আত্মবিশ্বাস বহুগুণ বেড়ে যাবে!',
    recommendedTime: '২০ মিনিট'
  }
];

export const INITIAL_STICKERS: StickerItem[] = [
  { id: 'stk_1', name: 'ছোট রাজপুত্র/রাজকন্যা', emoji: '👑', unlocked: true },
  { id: 'stk_2', name: 'সূর্যমুখী হাসি', emoji: '🌻', unlocked: true },
  { id: 'stk_3', name: 'হাঙ্গুল স্টার', emoji: '⭐', unlocked: false },
  { id: 'stk_4', name: 'তুখোর বিড়ালছানা', emoji: '🐱', unlocked: false },
  { id: 'stk_5', name: 'লাফানো খরগোশ', emoji: '🐰', unlocked: false },
  { id: 'stk_6', name: 'রঙিন রেইনবো', emoji: '🌈', unlocked: false },
  { id: 'stk_7', name: 'সুপার চ্যাম্পিয়ন কাপ', emoji: '🏆', unlocked: false },
  { id: 'stk_8', name: 'রকেট স্পিড', emoji: '🚀', unlocked: false }
];

// ==========================================
// 1. শিশুতোষ বাক্য গঠন ও ব্যাকরণ প্যাটার্ন (Sentence Patterns)
// ==========================================
export const SENTENCE_PATTERNS: SentencePatternItem[] = [
  {
    id: 'pat_eat',
    patternTitleBn: 'প্যাটার্ন ১: আমি [খাবার] খাই (~를/을 먹어요)',
    patternTitleKr: '나는 [음식]을/를 먹어요',
    descriptionBn: 'বাংলায় যেমন "আমি আপেল খাই", কোরিয়ান ভাষাতেও বাক্য গঠন একই রকম: কর্তা (Subject) + কর্ম (Object) + ক্রিয়া (Verb)।',
    subjectOptions: [
      { kr: '나는', bn: 'আমি', emoji: '🧒' },
      { kr: '토리는', bn: 'তোরি (বাঘ)', emoji: '🐯' },
      { kr: '동생은', bn: 'ছোট ভাই/বোন', emoji: '👶' },
      { kr: '토끼는', bn: 'খরগোশ', emoji: '🐰' }
    ],
    objectOptions: [
      { kr: '사과를', bn: 'আপেল', emoji: '🍎' },
      { kr: '우유를', bn: 'দুধ', emoji: '🥛' },
      { kr: '바나나를', bn: 'কলা', emoji: '🍌' },
      { kr: '당근을', bn: 'গাজর', emoji: '🥕' },
      { kr: '밥을', bn: 'ভাত', emoji: '🍚' },
      { kr: '물(물)을', bn: 'পানি', emoji: '💧' }
    ],
    verbOptions: [
      { kr: '먹어요', bn: 'খাই / খায়', emoji: '😋' },
      { kr: '마셔요', bn: 'পান করি / করে', emoji: '🥤' },
      { kr: '좋아해요', bn: 'পছন্দ করি', emoji: '❤️' }
    ],
    correctExamples: [
      {
        kr: '나는 사과를 먹어요.',
        bnPron: 'নানুন্ সাগোয়ারুল মগয়ো।',
        bnMeaning: 'আমি আপেল খাই।',
        explanationBn: '나는 (আমি) + 사과를 (আপেল) + 먹어요 (খাই)'
      },
      {
        kr: '토리는 우유를 마셔요.',
        bnPron: 'তোরিনুন্ উইউরুল মাশয়ো।',
        bnMeaning: 'তোরি দুধ পান করে।',
        explanationBn: 'পানীয় জিনিসের ক্ষেত্রে 먹어요 এর বদলে 마셔요 (পান করি) ব্যবহৃত হয়।'
      },
      {
        kr: '토끼는 당근을 좋아해요.',
        bnPron: 'থোক্কিনুন্ থাংগুনুল জোয়াহেয়ো।',
        bnMeaning: 'খরগোশ গাজর পছন্দ করে।',
        explanationBn: 'ভালো লাগা বা পছন্দের ক্ষেত্রে 좋아해요 (ভালোবাসি/পছন্দ করি) বসে।'
      }
    ]
  },
  {
    id: 'pat_see_go',
    patternTitleBn: 'প্যাটার্ন ২: আমি [জায়গায়] যাই (~에 가요) ও [জিনিস] দেখি',
    patternTitleKr: '[장소]에 가요 / [사물]을 봐요',
    descriptionBn: 'কোথাও যাওয়া বা কিছু দেখার ক্ষেত্রে সহজ কোরিয়ান নিয়ম।',
    subjectOptions: [
      { kr: '우리는', bn: 'আমরা', emoji: '👫' },
      { kr: '엄마는', bn: 'মা', emoji: '👩' },
      { kr: '아빠는', bn: 'বাবা', emoji: '👨' },
      { kr: '친구는', bn: 'বন্ধু', emoji: '👧' }
    ],
    objectOptions: [
      { kr: '공원에', bn: 'পার্কে (to park)', emoji: '🌳' },
      { kr: '유치원에', bn: 'কিন্ডারগার্টেনে', emoji: '🏫' },
      { kr: '집에', bn: 'বাড়িতে (to home)', emoji: '🏠' },
      { kr: '나비를', bn: 'প্রজাপতিকে', emoji: '🦋' },
      { kr: '별을', bn: 'আকাশের তারাকে', emoji: '⭐' }
    ],
    verbOptions: [
      { kr: '가요', bn: 'যাই / যায়', emoji: '🚶' },
      { kr: '와요', bn: 'আসি / আসে', emoji: '🏃' },
      { kr: '봐요', bn: 'দেখি / দেখে', emoji: '👀' },
      { kr: '만나요', bn: 'দেখা করি / করে', emoji: '🤝' }
    ],
    correctExamples: [
      {
        kr: '우리는 유치원에 가요.',
        bnPron: 'উরিনুন্ ইউছিওনে গায়ো।',
        bnMeaning: 'আমরা কিন্ডারগার্টেনে যাই।',
        explanationBn: 'জায়গার নামের পর 에 (এ / দিকে) যুক্ত হয়ে 가요 (যাই) বসে।'
      },
      {
        kr: '나는 나비를 봐요.',
        bnPron: 'নানুন্ নাবিরুল বয়ো।',
        bnMeaning: 'আমি প্রজাপতি দেখছি।',
        explanationBn: 'চোখ দিয়ে দেখার ক্রিয়া হলো 봐요 (দেখি)।'
      }
    ]
  },
  {
    id: 'pat_state',
    patternTitleBn: 'প্যাটার্ন ৩: এটা [সুন্দর / বড় / সুস্বাদু] (~이/가 예뻐요, 커요)',
    patternTitleKr: '[대상]이/가 예뻐요 / 맛있어요',
    descriptionBn: 'কোনো জিনিসের সৌন্দর্য, স্বাদ বা আকার বর্ণনা করার মিষ্টি কোরিয়ান বাক্য।',
    subjectOptions: [
      { kr: '꽃이', bn: 'ফুলটি', emoji: '🌸' },
      { kr: '사과가', bn: 'আপেলটি', emoji: '🍎' },
      { kr: '하늘이', bn: 'আকাশটি', emoji: '☁️' },
      { kr: '호랑이가', bn: 'বাঘটি', emoji: '🐯' }
    ],
    objectOptions: [
      { kr: '정말', bn: 'সত্যিই / অনেক', emoji: '✨' },
      { kr: '아주', bn: 'খুব', emoji: '🌟' },
      { kr: '너무', bn: 'ভীষণ', emoji: '💖' }
    ],
    verbOptions: [
      { kr: '예뻐요', bn: 'সুন্দর', emoji: '🌺' },
      { kr: '맛있어요', bn: 'সুস্বাদু / মজার', emoji: '😋' },
      { kr: '커요', bn: 'অনেক বড়', emoji: '🐘' },
      { kr: '귀여워요', bn: 'খুব কিউট / মিষ্টি', emoji: '🐱' }
    ],
    correctExamples: [
      {
        kr: '꽃이 아주 예뻐요.',
        bnPron: 'ক্বোছি আজু ইয়েপ্পয়ো।',
        bnMeaning: 'ফুলটি খুব সুন্দর।',
        explanationBn: 'সৌন্দর্য প্রকাশের সেরা শব্দ 예뻐요 (সুন্দর)।'
      },
      {
        kr: '사과가 정말 맛있어요.',
        bnPron: 'সাগোয়াগা জংমাল মাসিচ্চয়ো।',
        bnMeaning: 'আপেলটি সত্যিই অনেক সুস্বাদু।',
        explanationBn: 'খাবারের স্বাদের জন্য 맛있어요 (সুস্বাদু) ব্যবহৃত হয়।'
      }
    ]
  }
];

// ==========================================
// 2. দৈনন্দিন শিশুতোষ বাস্তব ডায়ালগ ও রোলপ্লে (Kid Dialogues)
// ==========================================
export const KID_DIALOGUES: DialogueScenario[] = [
  {
    id: 'dia_morning',
    titleBn: 'সকালের মিষ্টি শুভেচ্ছা ও ঘুম থেকে ওঠা',
    titleKr: '아침 인사와 기상 (Good Morning)',
    categoryBn: 'দৈনন্দিন জীবন',
    emoji: '☀️',
    contextBn: 'সকালে ঘুম থেকে উঠে মা-বাবাকে কোরিয়ান ভাষায় মিষ্টি সুরে সালাম দেওয়া।',
    dialogue: [
      {
        speaker: 'mom',
        speakerNameBn: 'আম্মু (엄마)',
        speakerEmoji: '👩',
        korean: '우리 아기, 잘 잤어요?',
        bengaliPronunciation: 'উরি আগি, জাল জাস্সয়ো?',
        bengaliMeaning: 'আমার সোনা বেবি, ভালো ঘুম হয়েছে?',
        actionEmoji: '🌅'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '네, 엄마! 안녕히 주무셨어요?',
        bengaliPronunciation: 'নে, অম্মা! আন্নিওংহি জুমুশিয়স্সয়ো?',
        bengaliMeaning: 'হ্যাঁ আম্মু! শুভ সকাল (ভালো ঘুম হয়েছে আপনার)?',
        actionEmoji: '🙇'
      },
      {
        speaker: 'mom',
        speakerNameBn: 'আম্মু (엄마)',
        speakerEmoji: '👩',
        korean: '참 착하네! 세수하고 밥 먹자.',
        bengaliPronunciation: 'ছাম ছাখাহানে! সেসুহাগো বাপ মকজা।',
        bengaliMeaning: 'অনেক ভালো বাচ্চা! মুখ ধুয়ে নাস্তা করে নাও।',
        actionEmoji: '🥣'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '네! 감사합니다!',
        bengaliPronunciation: 'নে! গামসাহামনিদা!',
        bengaliMeaning: 'জী! অনেক ধন্যবাদ!',
        actionEmoji: '❤️'
      }
    ],
    keyVocab: [
      { kr: '잘 잤어요?', bn: 'ভালো ঘুম হয়েছে?' },
      { kr: '안녕히 주무셨어요?', bn: 'শুভ সকাল (বড়দের উদ্দেশ্যে)' },
      { kr: '세수', bn: 'মুখ ধোয়া' },
      { kr: '감사합니다', bn: 'ধন্যবাদ' }
    ]
  },
  {
    id: 'dia_playground',
    titleBn: 'খেলার মাঠে নতুন বন্ধুর সাথে আলাপ',
    titleKr: '놀이터에서 친구 사귀기 (Making Friends)',
    categoryBn: 'বন্ধুত্ব ও সামাজিকতা',
    emoji: '🛝',
    contextBn: 'পার্কে বা স্কুলে সমবয়সী কোনো কোরিয়ান বাচ্চার সাথে ভাব জমানো।',
    dialogue: [
      {
        speaker: 'tori',
        speakerNameBn: 'তোরি (토리)',
        speakerEmoji: '🐯',
        korean: '안녕! 너 이름이 뭐야?',
        bengaliPronunciation: 'আন্নিওং! ন ইরুমি মুওয়া?',
        bengaliMeaning: 'হ্যালো! তোমার নাম কী?',
        actionEmoji: '👋'
      },
      {
        speaker: 'friend',
        speakerNameBn: 'বন্ধু মিনহো (민호)',
        speakerEmoji: '🧒',
        korean: '안녕! 나는 민호야. 같이 그네 탈래?',
        bengaliPronunciation: 'আন্নিওং! নানুন্ মিনহোইয়া। গাছি গুনে থাল্লে?',
        bengaliMeaning: 'হ্যালো! আমি মিনহো। চলো একসাথে দোলনায় চড়বে?',
        actionEmoji: '🎪'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'তোরি (토리)',
        speakerEmoji: '🐯',
        korean: '응, 좋아! 우리 친하게 지내자!',
        bengaliPronunciation: 'উং, জোয়া! উরি ছিনহাগে জিনেজা!',
        bengaliMeaning: 'হ্যাঁ, দারুণ হবে! চলো আমরা ভালো বন্ধু হই!',
        actionEmoji: '🤝'
      },
      {
        speaker: 'friend',
        speakerNameBn: 'বন্ধু মিনহো (민호)',
        speakerEmoji: '🧒',
        korean: '그래, 재미있게 놀자!',
        bengaliPronunciation: 'গুরে, জেমিইতকে নলজা!',
        bengaliMeaning: 'চলো, অনেক মজা করে খেলি!',
        actionEmoji: '🎉'
      }
    ],
    keyVocab: [
      { kr: '이름이 뭐야?', bn: 'তোমার নাম কী?' },
      { kr: '같이', bn: 'একসাথে' },
      { kr: '그네', bn: 'দোলনা' },
      { kr: '친하게 지내자', bn: 'চলো ভালো বন্ধু হই' }
    ]
  },
  {
    id: 'dia_snack',
    titleBn: 'পিপাসা ও খিদে পেলে মিষ্টি করে চাওয়া',
    titleKr: '간식과 물 부탁하기 (Asking for Snack & Water)',
    categoryBn: 'প্রয়োজন প্রকাশ',
    emoji: '🧃',
    contextBn: 'পানি বা খাবার চাওয়ার সময় ভদ্র ভাষায় প্রকাশ করার চমৎকার অভ্যাস।',
    dialogue: [
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '엄마, 목말라요. 물 주세요!',
        bengaliPronunciation: 'অম্মা, মংমাল্লায়ো। মুল জুসেয়ো!',
        bengaliMeaning: 'আম্মু, আমার তৃষ্ণা পেয়েছে। দয়া করে পানি দিন!',
        actionEmoji: '💧'
      },
      {
        speaker: 'mom',
        speakerNameBn: 'আম্মু (엄마)',
        speakerEmoji: '👩',
        korean: '여기 시원한 물이랑 맛있는 사과 있어.',
        bengaliPronunciation: 'য়গি শিওনহান মুরিরাং মাসিচ্চুন সাগোয়া ইস্স।',
        bengaliMeaning: 'এই নাও ঠান্ডা পানি আর সুস্বাদু লাল আপেল।',
        actionEmoji: '🍎'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '와! 잘 먹겠습니다!',
        bengaliPronunciation: 'ওয়া! জাল মক্কেতসুমনিদা!',
        bengaliMeaning: 'ওয়াও! আমি আনন্দের সাথে খাবার খাচ্ছি (খাওয়ার আগের দোয়া/শিষ্টাচার)!',
        actionEmoji: '😋'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '엄마, 정말 맛있어요! 잘 먹었습니다!',
        bengaliPronunciation: 'অম্মা, জংমাল মাসিচ্চয়ো! জাল মগস্সুমনিদা!',
        bengaliMeaning: 'আম্মু, অনেক মজা হয়েছে! খাওয়া শেষ (ধন্যবাদ)!',
        actionEmoji: '🙏'
      }
    ],
    keyVocab: [
      { kr: '목말라요', bn: 'তৃষ্ণা পেয়েছে' },
      { kr: '물 주세요', bn: 'পানি দিন' },
      { kr: '잘 먹겠습니다', bn: 'খাবার শুরুর শিষ্টাচার' },
      { kr: '잘 먹었습니다', bn: 'খাবার শেষের শিষ্টাচার' }
    ]
  },
  {
    id: 'dia_bedtime',
    titleBn: 'রাতের বিদায় ও মিষ্টি স্বপ্নের শুভকামনা',
    titleKr: '밤 인사와 굿나잇 (Good Night)',
    categoryBn: 'দৈনন্দিন জীবন',
    emoji: '🌙',
    contextBn: 'রাতে ঘুমাতে যাওয়ার আগে বড়দের সম্মান জানিয়ে মিষ্টি করে বিদায় জানানো।',
    dialogue: [
      {
        speaker: 'mom',
        speakerNameBn: 'আম্মু (엄마)',
        speakerEmoji: '👩',
        korean: '이제 잘 시간이야. 이 닦았어?',
        bengaliPronunciation: 'ইজে জাল শিগানিয়া। ই তাক্কাস্স?',
        bengaliMeaning: 'এখন ঘুমানোর সময়। দাঁত ব্রাশ করেছো?',
        actionEmoji: '🪥'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '네, 깨끗이 닦았어요!',
        bengaliPronunciation: 'নে, ক্কেক্কুছি তাক্কাস্সয়ো!',
        bengaliMeaning: 'হ্যাঁ, খুব পরিষ্কার করে ব্রাশ করেছি!',
        actionEmoji: '✨'
      },
      {
        speaker: 'tori',
        speakerNameBn: 'শিশু / তোরি (나)',
        speakerEmoji: '🐯',
        korean: '엄마, 안녕히 주무세요. 사랑해요!',
        bengaliPronunciation: 'অম্মা, আন্নিওংহি জুমুসেয়ো। সারংহেয়ো!',
        bengaliMeaning: 'আম্মু, শুভ রাত্রি (ভালোভাবে ঘুমান)। আপনাকে ভালোবাসি!',
        actionEmoji: '🛌'
      },
      {
        speaker: 'mom',
        speakerNameBn: 'আম্মু (엄마)',
        speakerEmoji: '👩',
        korean: '우리 아기 좋은 꿈 꿔! 사랑해~',
        bengaliPronunciation: 'উরি আগি জোউন ক্কুম ক্কো! সারংহে~',
        bengaliMeaning: 'আমার সোনা বেবি মিষ্টি স্বপ্ন দেখো! অনেক ভালোবাসি~',
        actionEmoji: '🌟'
      }
    ],
    keyVocab: [
      { kr: '이 닦기', bn: 'দাঁত ব্রাশ করা' },
      { kr: '안녕히 주무세요', bn: 'শুভ রাত্রি (সম্মানসূচক)' },
      { kr: '좋은 꿈 꿔', bn: 'মিষ্টি স্বপ্ন দেখো' },
      { kr: '사랑해요', bn: 'ভালোবাসি' }
    ]
  }
];

// ==========================================
// 3. কোরিয়ান সংস্কৃতি, আদব-কায়দা ও শিষ্টাচার (Culture & Etiquette)
// ==========================================
export const KOREAN_CULTURE_TOPICS: CultureTopic[] = [
  {
    id: 'cul_bow',
    titleBn: '১. মাথা ঝুঁকিয়ে বড়দের সম্মান জানিয়ে সালাম (배꼽인사)',
    titleKr: '배꼽손 예절 인사 (Bowing with hands on navel)',
    emoji: '🙇',
    shortDescBn: 'কোরিয়ায় ছোট বাচ্চারা নাভির উপর দুই হাত রেখে কোমর ঝুঁকিয়ে মিষ্টি করে "안녕하세요!" বলে।',
    mannerTipBn: 'দুই হাত পেটের কাছে জড়ো করে ৪৫ ডিগ্রি ঝুঁকলে কোরিয়ান শিক্ষকরা ও দাদুরা সবচেয়ে বেশি খুশি হন!',
    audioPhraseKr: '안녕하세요! 반갑습니다!',
    audioPhraseBn: 'নমস্কার / আসসালামু আলাইকুম! আপনার সাথে দেখা হয়ে খুব ভালো লাগলো!',
    interactiveAction: 'তোরির সাথে বাউ করুন!',
    funFact: 'কোরিয়ায় হাত মেলানোর চেয়ে মাথা ঝুঁকিয়ে সালাম দেওয়া বেশি আদব ও ভালোবাসার প্রতীক।'
  },
  {
    id: 'cul_two_hands',
    titleBn: '২. দুই হাতে জিনিস দেওয়া ও নেওয়া (두 손으로 공손히)',
    titleKr: '두 손으로 물건 주고받기 (Using Two Hands)',
    emoji: '🤲',
    shortDescBn: 'বড় কেউ কিছু দিলে বা বড়দের কিছু দেওয়ার সময় অবশ্যই দুই হাত দিয়ে ধরতে হয়।',
    mannerTipBn: 'এক হাত দিয়ে জিনিস দেওয়া কোরিয়ায় অভদ্রতা। তাই সবসময় দুই হাত বাড়িয়ে ধরবে এবং বলবে "감사합니다" (ধন্যবাদ)।',
    audioPhraseKr: '감사합니다! 잘 받겠습니다.',
    audioPhraseBn: 'আপনাকে অনেক ধন্যবাদ! আমি দুই হাত দিয়ে গ্রহণ করছি।',
    interactiveAction: 'দুই হাত বাড়িয়ে ধন্যবাদ বলুন!',
    funFact: 'এমনকি উপহার বা খাবার নেওয়ার সময়ও দুই হাত ব্যবহার করলে শিশু অনেক প্রশংসিত হয়।'
  },
  {
    id: 'cul_shoes',
    titleBn: '৩. ঘরে প্রবেশের আগে জুতো খোলা (신발 벗기)',
    titleKr: '실내에서 신발 벗기 (Taking off shoes)',
    emoji: '👟',
    shortDescBn: 'কোরিয়ান বাড়ি বা কিন্ডারগার্টেনের ঘরে ঢোকার মুখে জুতো খুলে সুন্দর করে সাজিয়ে রাখা হয়।',
    mannerTipBn: 'ঘরের মেঝে কোরিয়ায় খুব পরিষ্কার থাকে, কারণ কোরিয়ানরা মেঝেতে বসে খেলে ও খাবার খায় (অনডল মেঝে)।',
    audioPhraseKr: '신발을 벗고 들어갑니다.',
    audioPhraseBn: 'আমি জুতো খুলে ঘরে প্রবেশ করছি।',
    interactiveAction: 'দরজায় জুতো খুলে সালাম দিন!',
    funFact: 'শীতকালে কোরিয়ান ঘরের মেঝে নিচ থেকে গরম থাকে, একে বলা হয় ওন-ডল (온돌)!'
  },
  {
    id: 'cul_birthday',
    titleBn: '৪. জন্মদিনে সিউইড স্যুপ খাওয়া (미역국)',
    titleKr: '생일 미역국과 축하 (Birthday Seaweed Soup)',
    emoji: '🍲',
    shortDescBn: 'কোরিয়ায় বাচ্চাদের জন্মদিনে মায়ের ভালোবাসা স্মরণ করে পুষ্টিকর মিয়কগুক (Seaweed soup) রান্না করা হয়।',
    mannerTipBn: 'জন্মদিনের শুভেচ্ছা জানাতে বলতে হয় "생일 축하해요!" (শুভ জন্মদিন!)।',
    audioPhraseKr: '생일 축하합니다! 사랑해요!',
    audioPhraseBn: 'শুভ জন্মদিন! তোমাকে অনেক অনেক ভালোবাসি!',
    interactiveAction: 'জন্মদিনের শুভেচ্ছা গান গান!',
    funFact: 'মা যখন শিশুকে জন্ম দেন তখন স্বাস্থ্য ফিরে পেতে মিয়কগুক খান, তাই জন্মদিনে এটি খাওয়া বিশেষ ভালোবাসার চিহ্ন।'
  }
];

// ==========================================
// 4. ৩টি সম্পূর্ণ শিশুতোষ পিকচার স্টোরিবুক (Picture Stories)
// ==========================================
export interface StoryBook {
  id: string;
  titleBn: string;
  titleKr: string;
  coverEmoji: string;
  themeColor: string;
  descriptionBn: string;
  pages: {
    pageNumber: number;
    emoji: string;
    koreanText: string;
    bengaliPronunciation: string;
    bengaliTranslation: string;
    highlightWords: { kr: string; bn: string }[];
  }[];
}

export const STORY_BOOKS: StoryBook[] = [
  {
    id: 'sb_apple',
    titleBn: 'গল্প ১: ছোট্ট বাঘ তোরি ও লাল আপেল',
    titleKr: '아기 호랑이 토리와 빨간 사과',
    coverEmoji: '🐯 🍎 🌳',
    themeColor: '#118AB2',
    descriptionBn: 'বনের মাঝে বন্ধু প্রজাপতির সাথে মিলেমিশে খাবার ভাগাভাগি করার মিষ্টি গল্প।',
    pages: [
      {
        pageNumber: 1,
        emoji: '🐯 🌳 🍎',
        koreanText: '안녕! 나는 아기 호랑이 토리야. 숲속에서 빨간 사과를 만났어.',
        bengaliPronunciation: 'আন-নিওং! না-নুন আ-গি হো-রাং-ই তো-রি-ইয়া। সুপ-সো-কে-স পাল-গান সা-গোয়া-রুল মান-নাস-স।',
        bengaliTranslation: 'হ্যালো! আমি ছোট্ট বাঘ তোরি। আমি বনের মাঝে একটি লাল আপেল দেখতে পেয়েছি।',
        highlightWords: [
          { kr: '안녕', bn: 'হ্যালো' },
          { kr: '호랑이', bn: 'বাঘ' },
          { kr: '사과', bn: 'আপেল' }
        ]
      },
      {
        pageNumber: 2,
        emoji: '🦋 🌸 ✨',
        koreanText: '예쁜 나비가 날아왔어. "토리야, 우리 같이 놀자!"',
        bengaliPronunciation: 'ইয়ে-প্পুন না-বি-গা না-রা-ওয়াস-স। "তো-রি-ইয়া, উ-রি গা-ছি নল-জা!"',
        bengaliTranslation: 'একটি সুন্দর প্রজাপতি উড়ে এলো। সে বললো, "তোরি, চলো আমরা একসাথে খেলি!"',
        highlightWords: [
          { kr: '나비', bn: 'প্রজাপতি' },
          { kr: '우리', bn: 'আমরা' },
          { kr: '놀자', bn: 'খেলি' }
        ]
      },
      {
        pageNumber: 3,
        emoji: '🥛 🍎 😋',
        koreanText: '토리와 나비는 달콤한 우유와 사과를 나누어 먹었어.',
        bengaliPronunciation: 'তো-রি-ওয়া না-বি-নুন দাল-কোম-হান উ-ইউ-ওয়া সা-গোয়া-রুল না-নু-অ ম-গস-স।',
        bengaliTranslation: 'তোরি এবং প্রজাপতি মিষ্টি দুধ এবং আপেল ভাগাভাগি করে খেলো।',
        highlightWords: [
          { kr: '우유', bn: 'দুধ' },
          { kr: '사과', bn: 'আপেল' },
          { kr: '달콤한', bn: 'মিষ্টি' }
        ]
      },
      {
        pageNumber: 4,
        emoji: '❤️ 🌟 🎉',
        koreanText: '"사랑해 친구야!" 오늘 하루도 참 행복했어. 끝!',
        bengaliPronunciation: '"সা-রাং-হে ছিন-গু-ইয়া!" ও-নুল হা-রু-দো ছাম হেং-বক-হেস-স। ক্কুত!',
        bengaliTranslation: '"তোমাকে ভালোবাসি বন্ধু!" আজকের দিনটি অনেক আনন্দের ছিলো। সমাপ্ত!',
        highlightWords: [
          { kr: '사랑해', bn: 'ভালোবাসি' },
          { kr: '친구', bn: 'বন্ধু' },
          { kr: '행복', bn: 'আনন্দ' }
        ]
      }
    ]
  },
  {
    id: 'sb_rabbit_bday',
    titleBn: 'গল্প ২: সাদা খরগোশের জন্মদিনের সারপ্রাইজ পার্টি',
    titleKr: '하얀 토끼의 생일 파티 (Rabbit\'s Birthday)',
    coverEmoji: '🐰 🎂 🎁',
    themeColor: '#EF476F',
    descriptionBn: 'জন্মদিনের শুভেচ্ছা ও কেক কাটার আনন্দঘন মুহূর্তের রঙিন পিকচার স্টোরি।',
    pages: [
      {
        pageNumber: 1,
        emoji: '🐰 ☀️ 🎈',
        koreanText: '오늘은 하얀 토끼의 생일이에요. 하늘에 무지개가 떴어요.',
        bengaliPronunciation: 'ওনুরুন হায়ান থোক্কিয়ে সেঙ্গিরিয়েয়ো। হানুরে মুজিগেগা ত্তস্সয়ো।',
        bengaliTranslation: 'আজ সাদা খরগোশের জন্মদিন। আকাশে রঙিন রংধনু উঠেছে।',
        highlightWords: [
          { kr: '토끼', bn: 'খরগোশ' },
          { kr: '생일', bn: 'জন্মদিন' },
          { kr: '무지개', bn: 'রংধনু' }
        ]
      },
      {
        pageNumber: 2,
        emoji: '🐻 🐱 🎁',
        koreanText: '곰과 고양이가 찾아왔어요. "생일 축하해, 토끼야!"',
        bengaliPronunciation: 'গোমগোয়া গোয়াঙ্গিগা ছাজাওয়াস্সয়ো। "সেঙ্গিল ছুখাহে, থোক্কিয়া!"',
        bengaliTranslation: 'ভালুক ও বিড়াল বন্ধু উপহার নিয়ে এলো। "শুভ জন্মদিন, খরগোশ!"',
        highlightWords: [
          { kr: '곰', bn: 'ভালুক' },
          { kr: '고양이', bn: 'বিড়াল' },
          { kr: '축하해', bn: 'অভিনন্দন' }
        ]
      },
      {
        pageNumber: 3,
        emoji: '🎂 🕯️ 🍓',
        koreanText: '달콤한 딸기 케이크에 촛불을 껐어요. 후~',
        bengaliPronunciation: 'দালখোমহান ত্তালগি খেইখুয়ে ছোপ্পুরুল ক্কস্সয়ো। হু~',
        bengaliTranslation: 'সুস্বাদু স্ট্রবেরি কেকের মোমবাতি ফুঁ দিয়ে নেভানো হলো। ফুঁ~',
        highlightWords: [
          { kr: '딸기', bn: 'স্ট্রবেরি' },
          { kr: '케이크', bn: 'কেক' },
          { kr: '촛불', bn: 'মোমবাতি' }
        ]
      },
      {
        pageNumber: 4,
        emoji: '🎶 🥳 💖',
        koreanText: '다 같이 춤을 추고 노래했어요. "정말 고마워 친구들아!"',
        bengaliPronunciation: 'দা গাছি ছুমুল ছুগো নোরেহেস্সয়ো। "জংমাল গোমাও ছিনগুদুরা!"',
        bengaliTranslation: 'সবাই একসাথে নাচলো আর গান গাইলো। "তোমাদের অনেক ধন্যবাদ বন্ধুরা!"',
        highlightWords: [
          { kr: '노래', bn: 'গান' },
          { kr: '춤', bn: 'নাচ' },
          { kr: '고마워', bn: 'ধন্যবাদ' }
        ]
      }
    ]
  },
  {
    id: 'sb_school_day',
    titleBn: 'গল্প ৩: কিন্ডারগার্টেনে আমার প্রথম দিন',
    titleKr: '유치원에 가는 날 (First Day at School)',
    coverEmoji: '🎒 🏫 🌟',
    themeColor: '#06D6A0',
    descriptionBn: 'স্কুলে যাওয়া, শিক্ষককে সালাম ও নতুন বন্ধুদের সাথে গান গাওয়ার অনুপ্রেরণাদায়ক গল্প।',
    pages: [
      {
        pageNumber: 1,
        emoji: '👧 🎒 🚌',
        koreanText: '노란 버스를 타고 유치원에 가요. 가방이 반짝여요.',
        bengaliPronunciation: 'নোরান বসুরুল থাগো ইউছিওনে গায়ো। গাবাঙি বাঞ্জাকিয়য়ো।',
        bengaliTranslation: 'হলুদ বাসে চড়ে আমি কিন্ডারগার্টেনে যাচ্ছি। আমার স্কুল ব্যাগটি চকচক করছে।',
        highlightWords: [
          { kr: '버스', bn: 'বাস' },
          { kr: '유치원', bn: 'কিন্ডারগার্টেন' },
          { kr: '가방', bn: 'ব্যাগ' }
        ]
      },
      {
        pageNumber: 2,
        emoji: '👩‍🏫 🙇 🌸',
        koreanText: '선생님께 공손히 인사해요. "선생님, 안녕하세요!"',
        bengaliPronunciation: 'সনসেংনিমক্কে গংসনহি ইনসাহেয়ো। "সনসেংনিম, আন্নিওংহাসেয়ো!"',
        bengaliTranslation: 'শিক্ষককে মাথা ঝুঁকিয়ে সালাম জানাই। "শিক্ষক মহাশয়, নমস্কার!"',
        highlightWords: [
          { kr: '선생님', bn: 'শিক্ষক' },
          { kr: '인사', bn: 'সালাম/শুভেচ্ছা' }
        ]
      },
      {
        pageNumber: 3,
        emoji: '🎨 🖍️ 🌈',
        koreanText: '도화지에 크레파스로 예쁜 무지개를 그렸어요.',
        bengaliPronunciation: 'দোহোয়াজিয়ে খুরেপাসুরো ইয়েপ্পুন মুজিগেরুল গুরিয়স্সয়ো।',
        bengaliTranslation: 'ড্রয়িং পেপারে রঙ পেন্সিল দিয়ে একটি সুন্দর রংধনু আঁকলাম।',
        highlightWords: [
          { kr: '크레파스', bn: 'রঙ পেনসিল' },
          { kr: '그림', bn: 'ছবি' }
        ]
      },
      {
        pageNumber: 4,
        emoji: '🐯 👏 🏆',
        koreanText: '"참 잘했어요!" 선생님께서 별 스티커를 붙여주셨어요.',
        bengaliPronunciation: '"ছাম জালহেস্সয়ো!" সনসেংনিমক্কেস বিয়ল সুথিখোরুল বুছিয়জুশিয়স্সয়ো।',
        bengaliTranslation: '"অনেক সুন্দর হয়েছে!" শিক্ষক আমাকে একটি চকচকে গোল্ডেন স্টার স্টিকার দিলেন।',
        highlightWords: [
          { kr: '참 잘했어요', bn: 'শাবাশ / দারুণ হয়েছে' },
          { kr: '스티커', bn: 'স্টিকার' }
        ]
      }
    ]
  }
];

// ==========================================
// 5. চূড়ান্ত গ্র্যাজুয়েশন পরীক্ষা ও সনদপত্র প্রশ্নব্যাংক (Milestone Exam)
// ==========================================
export interface ExamQuestion {
  id: string;
  levelCategory: 'Alphabet' | 'Vocab' | 'Grammar' | 'Dialogue' | 'Culture';
  questionBn: string;
  audioPromptKr?: string;
  options: {
    id: string;
    textKr: string;
    textBn: string;
    emoji: string;
    isCorrect: boolean;
  }[];
  explanationBn: string;
}

export const GRADUATION_EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 'ex_1',
    levelCategory: 'Alphabet',
    questionBn: '১. এই বর্ণটি শুনে চিনুন: "ㅏ" এর বাংলা উচ্চারণ কোনটি?',
    audioPromptKr: 'ㅏ',
    options: [
      { id: '1', textKr: 'ㅏ', textBn: 'আ (A)', emoji: '🍎', isCorrect: true },
      { id: '2', textKr: 'ㅗ', textBn: 'ও (O)', emoji: '🥒', isCorrect: false },
      { id: '3', textKr: 'ㅜ', textBn: 'উ (U)', emoji: '🥛', isCorrect: false }
    ],
    explanationBn: 'ডানদিকে মুখ করা দাগ হলো "ㅏ" (আ)।'
  },
  {
    id: 'ex_2',
    levelCategory: 'Alphabet',
    questionBn: '২. "ㄱ" এবং "ㅏ" দুটি যুক্ত করলে কোন শব্দটি তৈরি হয়?',
    audioPromptKr: '가',
    options: [
      { id: '1', textKr: '가', textBn: 'গা (Ga)', emoji: '🎵', isCorrect: true },
      { id: '2', textKr: '나', textBn: 'না (Na)', emoji: '🦋', isCorrect: false },
      { id: '3', textKr: '다', textBn: 'দা (Da)', emoji: '🐿️', isCorrect: false }
    ],
    explanationBn: 'ㄱ (গ) + ㅏ (আ) = 가 (গা)।'
  },
  {
    id: 'ex_3',
    levelCategory: 'Vocab',
    questionBn: '৩. কোরিয়ান শব্দ "사과" (সা-গোয়া) এর অর্থ কী?',
    audioPromptKr: '사과',
    options: [
      { id: '1', textKr: '사과', textBn: 'লাল আপেল', emoji: '🍎', isCorrect: true },
      { id: '2', textKr: '우유', textBn: 'দুধ', emoji: '🥛', isCorrect: false },
      { id: '3', textKr: '나비', textBn: 'প্রজাপতি', emoji: '🦋', isCorrect: false }
    ],
    explanationBn: '사과 মানে আপেল।'
  },
  {
    id: 'ex_4',
    levelCategory: 'Vocab',
    questionBn: '৪. কোরিয়ান সংখ্যা "하나, 둘, 셋" (হানা, দুল, সেত) এর মানে কী?',
    audioPromptKr: '하나 둘 셋',
    options: [
      { id: '1', textKr: '1, 2, 3', textBn: 'এক, দুই, তিন', emoji: '🔢', isCorrect: true },
      { id: '2', textKr: '4, 5, 6', textBn: 'চার, পাঁচ, ছয়', emoji: '🎲', isCorrect: false },
      { id: '3', textKr: '7, 8, 9', textBn: 'সাত, আট, নয়', emoji: '🎯', isCorrect: false }
    ],
    explanationBn: '하나 (১), 둘 (২), 셋 (৩)।'
  },
  {
    id: 'ex_5',
    levelCategory: 'Grammar',
    questionBn: '৫. "আমি আপেল খাই" - এর সঠিক কোরিয়ান বাক্য কোনটি?',
    audioPromptKr: '나는 사과를 먹어요.',
    options: [
      { id: '1', textKr: '나는 사과를 먹어요', textBn: 'নানুন্ সাগোয়ারুল মগয়ো', emoji: '😋', isCorrect: true },
      { id: '2', textKr: '사과가 먹어요 나는', textBn: 'উল্টাপাল্টা বিন্যাস', emoji: '❌', isCorrect: false },
      { id: '3', textKr: '나는 우유를 가요', textBn: 'অর্থহীন বাক্য', emoji: '❓', isCorrect: false }
    ],
    explanationBn: 'কোরিয়ান বাক্য কাঠামো: কর্তা (나는) + কর্ম (사과를) + ক্রিয়া (먹어요)।'
  },
  {
    id: 'ex_6',
    levelCategory: 'Dialogue',
    questionBn: '৬. কোরিয়ায় বড়দের সাথে দেখা হলে সালাম দিতে কী বলতে হয়?',
    audioPromptKr: '안녕하세요',
    options: [
      { id: '1', textKr: '안녕하세요!', textBn: 'আন্নিওংহাসেয়ো! (নমস্কার/সালাম)', emoji: '🙇', isCorrect: true },
      { id: '2', textKr: '잘 자요', textBn: 'শুভ রাত্রি', emoji: '🛌', isCorrect: false },
      { id: '3', textKr: '배고파요', textBn: 'খিদে পেয়েছে', emoji: '🥣', isCorrect: false }
    ],
    explanationBn: 'বড়দের সাথে শুভেচ্ছা বিনিময়ে "안녕하세요!" বলা হয়।'
  },
  {
    id: 'ex_7',
    levelCategory: 'Dialogue',
    questionBn: '৭. খাবার শুরুর আগে কোরিয়ানরা কী বলে ধন্যবাদ প্রকাশ করে?',
    audioPromptKr: '잘 먹겠습니다',
    options: [
      { id: '1', textKr: '잘 먹겠습니다!', textBn: 'জাল মক্কেতসুমনিদা!', emoji: '🍽️', isCorrect: true },
      { id: '2', textKr: '미안해요', textBn: 'দুঃখিত', emoji: '😢', isCorrect: false },
      { id: '3', textKr: '잘 가요', textBn: 'বিদায়', emoji: '👋', isCorrect: false }
    ],
    explanationBn: 'খাবার শুরুতে "잘 먹겠습니다" (আনন্দের সাথে খাবো) বলা বাধ্যতামূলক শিষ্টাচার।'
  },
  {
    id: 'ex_8',
    levelCategory: 'Culture',
    questionBn: '৮. কোরিয়ায় বড়দের কোনো জিনিস দেওয়া বা নেওয়ার সময় কী নিয়ম মেনে চলা হয়?',
    audioPromptKr: '두 손으로 받아요',
    options: [
      { id: '1', textKr: '두 손으로', textBn: 'দুই হাত দিয়ে সম্মান জানিয়ে ধরা', emoji: '🤲', isCorrect: true },
      { id: '2', textKr: '한 손으로', textBn: 'এক হাত দিয়ে ধরা', emoji: '🖐️', isCorrect: false },
      { id: '3', textKr: '발로', textBn: 'পা দিয়ে ছোঁয়া', emoji: '🦶', isCorrect: false }
    ],
    explanationBn: 'কোরিয়ান সংস্কৃতিতে দুই হাত ব্যবহার করা সম্মান ও ভালোবাসার চিহ্ন।'
  }
];

