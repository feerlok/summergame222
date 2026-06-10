import { useCallback, useRef } from 'react';

export function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const getCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new AudioContext();
    }
    return audioCtxRef.current;
  }, []);

  const playTone = useCallback(
    (frequency: number, duration: number, type: OscillatorType = 'sine', volume: number = 0.3) => {
      const ctx = getCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      gain.gain.setValueAtTime(volume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    },
    [getCtx]
  );

  const playSelect = useCallback(() => {
    playTone(800, 0.1, 'sine', 0.2);
  }, [playTone]);

  const playCorrect = useCallback(() => {
    playTone(523, 0.15, 'sine', 0.3);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 150);
    setTimeout(() => playTone(784, 0.3, 'sine', 0.3), 300);
  }, [playTone]);

  const playWrong = useCallback(() => {
    playTone(200, 0.4, 'sawtooth', 0.15);
  }, [playTone]);

  const playTick = useCallback(() => {
    playTone(1000, 0.05, 'square', 0.1);
  }, [playTone]);

  const playTimeUp = useCallback(() => {
    playTone(300, 0.3, 'sawtooth', 0.2);
    setTimeout(() => playTone(200, 0.4, 'sawtooth', 0.2), 300);
  }, [playTone]);

  const playSurprise = useCallback(() => {
    playTone(400, 0.1, 'sine', 0.3);
    setTimeout(() => playTone(500, 0.1, 'sine', 0.3), 100);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.3), 200);
    setTimeout(() => playTone(800, 0.4, 'sine', 0.4), 300);
  }, [playTone]);

  const playStart = useCallback(() => {
    playTone(392, 0.15, 'sine', 0.3);
    setTimeout(() => playTone(523, 0.15, 'sine', 0.3), 150);
    setTimeout(() => playTone(659, 0.15, 'sine', 0.3), 300);
    setTimeout(() => playTone(784, 0.4, 'sine', 0.4), 450);
  }, [playTone]);

  const playWin = useCallback(() => {
    const notes = [523, 587, 659, 698, 784, 880, 988, 1047];
    notes.forEach((freq, i) => {
      setTimeout(() => playTone(freq, 0.2, 'sine', 0.25), i * 100);
    });
  }, [playTone]);

  return {
    playSelect,
    playCorrect,
    playWrong,
    playTick,
    playTimeUp,
    playSurprise,
    playStart,
    playWin,
  };
}
