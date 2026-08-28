import confetti from 'canvas-confetti';
import { playGrandCelebrationFanfare, playLevelUpSound, speakKorean } from './audio';

/**
 * Fires a light rewarding confetti burst
 */
export function triggerConfetti(): void {
  confetti({
    particleCount: 45,
    spread: 70,
    origin: { y: 0.7 },
    colors: ['#EF476F', '#FFD166', '#06D6A0', '#118AB2']
  });
}

/**
 * Fires a grand multi-stage confetti explosion with side cannons and sparkling stars
 */
export function triggerGrandConfetti(): void {
  const colors = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#F77F00', '#FF70A6'];

  // 1. Initial Center Burst
  confetti({
    particleCount: 80,
    spread: 100,
    origin: { y: 0.6 },
    colors,
    ticks: 200,
    gravity: 0.8,
    scalar: 1.2,
  });

  // 2. Left Cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors,
      ticks: 250,
    });
  }, 200);

  // 3. Right Cannon
  setTimeout(() => {
    confetti({
      particleCount: 60,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors,
      ticks: 250,
    });
  }, 400);

  // 4. Star & Ribbon Shower
  setTimeout(() => {
    confetti({
      particleCount: 50,
      spread: 120,
      origin: { y: 0.3 },
      shapes: ['star', 'circle'],
      colors: ['#FFD166', '#EF476F', '#06D6A0'],
      scalar: 1.4,
      ticks: 300,
    });
  }, 600);
}

/**
 * Triggers complete celebration with sound, confetti explosion, and Korean praise
 */
export function celebrateLevelComplete(levelNameBn: string, levelNameKr?: string): void {
  playGrandCelebrationFanfare();
  triggerGrandConfetti();

  // Speak celebratory cheer after fanfare onset
  setTimeout(() => {
    speakKorean('축하합니다! 참 잘했어요!', 1.0);
  }, 1200);
}
