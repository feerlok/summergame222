import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Eye } from 'lucide-react';
import type { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface QuestionModalProps {
  state: GameState;
  onShowAnswer: () => void;
  onTickTimer: () => void;
}

export function QuestionModal({ state, onShowAnswer, onTickTimer }: QuestionModalProps) {
  const { playTick, playTimeUp } = useSound();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const prevTimerRef = useRef(state.timer);

  const question = state.currentQuestion;
  const category = state.categories.find((c) => c.id === question?.categoryId);

  useEffect(() => {
    if (state.isTimerRunning && state.timer > 0) {
      timerRef.current = setInterval(() => {
        onTickTimer();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.isTimerRunning, state.timer, onTickTimer]);

  // Play tick sound on last 5 seconds
  useEffect(() => {
    if (state.timer <= 5 && state.timer > 0 && state.isTimerRunning) {
      if (state.timer !== prevTimerRef.current) {
        playTick();
      }
    }
    if (state.timer === 0 && prevTimerRef.current > 0) {
      playTimeUp();
    }
    prevTimerRef.current = state.timer;
  }, [state.timer, state.isTimerRunning, playTick, playTimeUp]);

  if (!question || !category) return null;

  const timerProgress = state.timer / state.maxTimer;
  const timerColor =
    timerProgress > 0.5
      ? '#43A047'
      : timerProgress > 0.25
      ? '#FF8F00'
      : '#FF5252';

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-game-navy/90 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${category.color}22, ${category.color}11)`,
          border: `3px solid ${category.color}44`,
          boxShadow: `0 20px 60px ${category.color}33`,
        }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        {/* Category header */}
        <div
          className="px-6 py-4 flex items-center justify-between"
          style={{ background: `linear-gradient(90deg, ${category.color}dd, ${category.color}88)` }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{category.icon}</span>
            <span className="font-rubik text-lg font-bold text-white uppercase tracking-wider">
              {category.name}
            </span>
          </div>
          <div
            className="font-rubik text-2xl font-black text-white px-4 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.3)' }}
          >
            {question.points} очков
          </div>
        </div>

        {/* Question content */}
        <div className="p-8 md:p-12 flex flex-col items-center gap-8">
          {/* Timer */}
          <div className="relative w-28 h-28 md:w-32 md:h-32">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              {/* Progress circle */}
              <circle
                cx="60"
                cy="60"
                r="52"
                fill="none"
                stroke={timerColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - timerProgress)}`}
                className="transition-all duration-1000 ease-linear"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.span
                className="font-rubik text-4xl md:text-5xl font-black text-white"
                animate={state.timer <= 5 ? { scale: [1, 1.1, 1] } : {}}
                transition={state.timer <= 5 ? { repeat: Infinity, duration: 0.5 } : {}}
                style={{ color: state.timer <= 5 ? '#FF5252' : '#FFFFFF' }}
              >
                {state.timer}
              </motion.span>
            </div>
          </div>

          {/* Question text */}
          <motion.h2
            className="font-rubik text-2xl md:text-4xl font-bold text-white text-center leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {question.question}
          </motion.h2>

          {/* Show answer button */}
          <Button
            onClick={onShowAnswer}
            className="font-rubik text-lg md:text-xl font-bold px-8 py-5 rounded-full bg-white/20 hover:bg-white/30 text-white border-2 border-white/20 hover:border-white/40 transition-all duration-300"
          >
            <Eye className="w-5 h-5 mr-2" />
            Показать ответ
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
