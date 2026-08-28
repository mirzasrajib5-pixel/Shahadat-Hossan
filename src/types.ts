export type TabType = 
  | 'alphabet' 
  | 'builder' 
  | 'vocab' 
  | 'sentence' 
  | 'dialogue' 
  | 'story' 
  | 'songs' 
  | 'culture' 
  | 'tracing' 
  | 'games' 
  | 'exam' 
  | 'guide';

export type AlphabetCategory = 'vowels' | 'consonants' | 'compound_vowels' | 'double_consonants';

export interface HangulItem {
  id: string;
  char: string;
  nameKr?: string;
  nameBn: string;
  soundBn: string;
  romanization: string;
  category: AlphabetCategory;
  exampleWord: string;
  exampleMeaningBn: string;
  exampleMeaningEn: string;
  exampleEmoji: string;
  exampleHanjaOrInfo?: string;
  strokes: number;
  strokeGuide: string[];
  funFactBn: string;
}

export type VocabCategory = 'animals' | 'food' | 'colors' | 'numbers' | 'family_body' | 'phrases';

export interface VocabItem {
  id: string;
  korean: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  englishMeaning: string;
  emoji: string;
  category: VocabCategory;
  exampleSentenceKr?: string;
  exampleSentenceBn?: string;
  audioText?: string;
}

export interface SentencePatternItem {
  id: string;
  patternTitleBn: string;
  patternTitleKr: string;
  descriptionBn: string;
  subjectOptions: { kr: string; bn: string; emoji: string }[];
  objectOptions: { kr: string; bn: string; emoji: string }[];
  verbOptions: { kr: string; bn: string; emoji: string }[];
  correctExamples: {
    kr: string;
    bnPron: string;
    bnMeaning: string;
    explanationBn: string;
  }[];
}

export interface DialogueLine {
  speaker: 'tori' | 'friend' | 'mom' | 'teacher';
  speakerNameBn: string;
  speakerEmoji: string;
  korean: string;
  bengaliPronunciation: string;
  bengaliMeaning: string;
  actionEmoji?: string;
}

export interface DialogueScenario {
  id: string;
  titleBn: string;
  titleKr: string;
  categoryBn: string;
  emoji: string;
  contextBn: string;
  dialogue: DialogueLine[];
  keyVocab: { kr: string; bn: string }[];
}

export interface CultureTopic {
  id: string;
  titleBn: string;
  titleKr: string;
  emoji: string;
  shortDescBn: string;
  mannerTipBn: string;
  audioPhraseKr: string;
  audioPhraseBn: string;
  interactiveAction: string;
  funFact: string;
}

export interface DayPlan {
  day: number;
  titleBn: string;
  subtitle: string;
  targetItems: string[];
  descriptionBn: string;
  activitiesBn: string[];
  parentTipBn: string;
  recommendedTime: string;
  completed?: boolean;
}

export interface StickerItem {
  id: string;
  name: string;
  emoji: string;
  unlocked: boolean;
  earnedDate?: string;
}

