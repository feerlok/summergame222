import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Crown, Star, Medal } from 'lucide-react';
import type { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface FinalScreenProps {
  state: GameState;
  onRestart: () => void;
}

export function FinalScreen({ state, onRestart }: FinalScreenProps) {
  const { playWin } = useSound();
  const [countedScores, setCountedScores] = useState<number[]>([0, 0]);

  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  const isTie = sortedTeams[0].score === sortedTeams[1].score;

  useEffect(() => {
    playWin();
  }, [playWin]);

  // Animate score counting
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic

      setCountedScores(
        sortedTeams.map((team) => Math.round(team.score * eased))
      );

      if (step >= steps) {
        clearInterval(timer);
        setCountedScores(sortedTeams.map((team) => team.score));
      }
    }, interval);

    return () => clearInterval(timer);
  }, [sortedTeams]);

  return (
    <motion.div
      className="min-h-screen w-full relative flex flex-col items-center justify-center p-4 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-game-navy via-[#1a1a5e] to-game-navy" />

      {/* Floating stars */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.6, 0.2],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            <Star
              className="text-game-yellow"
              style={{
                width: Math.random() * 20 + 10,
                height: Math.random() * 20 + 10,
              }}
            />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 max-w-2xl w-full">
        {/* Trophy */}
        <motion.img
          src="/assets/trophy.png"
          alt="Кубок"
          className="w-32 h-32 md:w-44 md:h-44 object-contain drop-shadow-2xl"
          initial={{ scale: 0, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        />

        {/* Title */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="font-rubik text-4xl md:text-6xl font-black text-white mb-2"
            style={{ textShadow: '0 4px 20px rgba(255,214,0,0.5)' }}
          >
            ИГРА ОКОНЧЕНА!
          </h1>
          <p className="font-rubik text-lg text-white/60">Отличная игра!</p>
        </motion.div>

        {/* Winner announcement */}
        {isTie ? (
          <motion.div
            className="text-center bg-white/10 rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Crown className="w-12 h-12 text-game-yellow mx-auto mb-3" />
            <h2 className="font-rubik text-2xl md:text-3xl font-bold text-game-yellow">
              НИЧЬЯ!
            </h2>
            <p className="font-rubik text-white/70 mt-2">
              Обе команды набрали одинаковое количество очков!
            </p>
          </motion.div>
        ) : (
          <motion.div
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Crown className="w-14 h-14 text-game-yellow mx-auto mb-3" />
            </motion.div>
            <h2
              className="font-rubik text-3xl md:text-4xl font-black mb-1"
              style={{
                color: winner.color,
                textShadow: `0 4px 20px ${winner.color}44`,
              }}
            >
              {winner.name}
            </h2>
            <p className="font-rubik text-xl text-white/70">ПОБЕДИТЕЛЬ!</p>
          </motion.div>
        )}

        {/* Scores */}
        <motion.div
          className="w-full flex flex-col gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          {sortedTeams.map((team, idx) => (
            <motion.div
              key={team.id}
              className={`relative rounded-2xl p-5 md:p-6 flex items-center justify-between border-2 ${
                idx === 0 && !isTie
                  ? 'bg-gradient-to-r from-game-yellow/20 to-game-orange/20 border-game-yellow'
                  : 'bg-white/10 border-white/10'
              }`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + idx * 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: team.color }}
                >
                  {idx === 0 && !isTie ? (
                    <Crown className="w-6 h-6 text-white" />
                  ) : (
                    <Medal className="w-6 h-6 text-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-rubik text-lg md:text-xl font-bold text-white">
                    {team.name}
                  </h3>
                  <p className="font-rubik text-sm text-white/50">
                    {idx === 0 && !isTie ? 'Победитель' : 'Участник'}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <motion.span
                  className="font-rubik text-3xl md:text-4xl font-black"
                  style={{ color: team.color }}
                >
                  {countedScores[idx]}
                </motion.span>
                <p className="font-rubik text-xs text-white/40">очков</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex gap-8 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div>
            <p className="font-rubik text-2xl font-black text-game-yellow">
              {state.questionsAsked}
            </p>
            <p className="font-rubik text-xs text-white/50">Вопросов задано</p>
          </div>
          <div>
            <p className="font-rubik text-2xl font-black text-game-blue">
              {state.totalQuestions}
            </p>
            <p className="font-rubik text-xs text-white/50">Всего вопросов</p>
          </div>
        </motion.div>

        {/* Restart button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8 }}
        >
          <Button
            onClick={onRestart}
            className="font-rubik text-xl font-bold px-10 py-6 rounded-full bg-gradient-to-r from-game-yellow to-game-orange text-game-navy hover:from-white hover:to-game-yellow transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            ИГРАТЬ СНОВА
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
