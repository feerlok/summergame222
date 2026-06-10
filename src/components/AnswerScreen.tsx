import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import type { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface AnswerScreenProps {
  state: GameState;
  onCorrect: () => void;
  onWrong: () => void;
  onNextTeam: () => void;
}

export function AnswerScreen({ state, onCorrect, onWrong, onNextTeam }: AnswerScreenProps) {
  const { playCorrect, playWrong } = useSound();
  const [judged, setJudged] = useState(false);

  const question = state.currentQuestion;
  const category = state.categories.find((c) => c.id === question?.categoryId);

  if (!question || !category) return null;

  const handleCorrect = () => {
    if (judged) return;
    setJudged(true);
    playCorrect();
    setTimeout(() => {
      onCorrect();
    }, 1500);
  };

  const handleWrong = () => {
    if (judged) return;
    setJudged(true);
    playWrong();
    setTimeout(() => {
      onWrong();
      onNextTeam();
    }, 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop with color based on judgment */}
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundColor: judged
            ? undefined
            : 'rgba(11, 29, 81, 0.95)',
        }}
        style={{ backgroundColor: 'rgba(11, 29, 81, 0.95)' }}
      />

      {/* Success/Error flash */}
      {judged && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: state.teams.find((t) => t.id === state.activeTeamId)
              ?.score !== undefined
              ? '#4CAF50'
              : '#F44336',
          }}
        />
      )}

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

        {/* Answer content */}
        <div className="p-8 md:p-12 flex flex-col items-center gap-6">
          {/* Original question */}
          <p className="font-rubik text-lg text-white/60 text-center">
            {question.question}
          </p>

          {/* Answer */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center justify-center gap-2 mb-3">
              <Lightbulb className="w-6 h-6 text-game-yellow" />
              <span className="font-rubik text-sm font-bold text-game-yellow uppercase tracking-wider">
                Правильный ответ
              </span>
            </div>
            <motion.h2
              className="font-rubik text-3xl md:text-5xl font-black text-white text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              {question.answer}
            </motion.h2>
          </motion.div>

          {/* Explanation */}
          <motion.div
            className="bg-white/10 rounded-xl p-4 md:p-6 max-w-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <p className="font-rubik text-base md:text-lg text-white/80 text-center leading-relaxed">
              {question.explanation}
            </p>
          </motion.div>

          {/* Judging buttons */}
          {!judged ? (
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleCorrect}
                className="font-rubik text-xl font-bold px-8 py-6 rounded-full bg-gradient-to-r from-game-green to-emerald-500 text-white hover:from-emerald-400 hover:to-game-green transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <CheckCircle className="w-6 h-6 mr-2" />
                ВЕРНО!
              </Button>
              <Button
                onClick={handleWrong}
                className="font-rubik text-xl font-bold px-8 py-6 rounded-full bg-gradient-to-r from-game-pink to-red-500 text-white hover:from-red-400 hover:to-game-pink transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                <XCircle className="w-6 h-6 mr-2" />
                НЕВЕРНО
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="mt-4 text-center"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <div className="flex items-center gap-2 text-game-green font-rubik text-xl font-bold">
                <CheckCircle className="w-6 h-6" />
                <span>Очки начислены!</span>
              </div>
              <p className="font-rubik text-white/50 text-sm mt-2">
                Возврат к игровому полю...
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
