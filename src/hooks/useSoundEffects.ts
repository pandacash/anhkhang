import { useCallback, useRef } from 'react';

// Simple sound effects using Web Audio API
export const useSoundEffects = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playCorrectSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Happy ascending notes
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.4);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.4);
    } catch (error) {
      console.log('Sound effect not available');
    }
  }, [getAudioContext]);

  const playWrongSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      // Sad descending notes
      oscillator.frequency.setValueAtTime(392, ctx.currentTime); // G4
      oscillator.frequency.setValueAtTime(349.23, ctx.currentTime + 0.15); // F4
      oscillator.frequency.setValueAtTime(293.66, ctx.currentTime + 0.3); // D4

      gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.5);
    } catch (error) {
      console.log('Sound effect not available');
    }
  }, [getAudioContext]);

  const playTimeoutSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      
      // Play 3 short beeps
      for (let i = 0; i < 3; i++) {
        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        oscillator.frequency.setValueAtTime(440, ctx.currentTime + i * 0.2); // A4
        oscillator.type = 'square';

        gainNode.gain.setValueAtTime(0.2, ctx.currentTime + i * 0.2);
        gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + i * 0.2 + 0.15);

        oscillator.start(ctx.currentTime + i * 0.2);
        oscillator.stop(ctx.currentTime + i * 0.2 + 0.15);
      }
    } catch (error) {
      console.log('Sound effect not available');
    }
  }, [getAudioContext]);

  const playTickSound = useCallback(() => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);

      oscillator.frequency.setValueAtTime(880, ctx.currentTime); // A5
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.05);

      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + 0.05);
    } catch (error) {
      console.log('Sound effect not available');
    }
  }, [getAudioContext]);

  return {
    playCorrectSound,
    playWrongSound,
    playTimeoutSound,
    playTickSound
  };
};
