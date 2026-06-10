import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Users, Gavel, Sparkles, ArrowRight } from 'lucide-react';
import type { GameState, SurpriseType } from '@/types/game';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface SurpriseModalProps {
  state: GameState;
  onReveal: () => void;
}

const surpriseConfig: Record<
  SurpriseType,
  {
    title: string;
    description: string;
    icon: React.ReactNode;
    image: string;
    color: string;
  }
> = {
  'mystery-bag': {
    title: 'КОТ В МЕШКЕ!',
    description:
      'Секретный вопрос на случайную тему! Никто не знает, что внутри... Готовы рискнуть?',
    icon: <Gift className="w-12 h-12 text-game-pink" />,
    image: '/assets/surprise-bag.png',
    color: '#FF5252',
  },
  audience: {
    title: 'ВОПРОС ОТ ЗАЛА!',
    description:
      'Все играют! Кто первый даст правильный ответ — получит +200 очков!',
    icon: <Users className="w-12 h-12 text-game-blue" />,
    image: '/assets/audience.png',
    color: '#1E88E5',
  },
  auction: {
    title: 'АУКЦИОН!',
    description:
      'Торгуйтесь! Команды по очереди повышают ставку. Кто больше поставит — тот отвечает!',
    icon: <Gavel className="w-12 h-12 text-game-orange" />,
    image: '/assets/auction.png',
    color: '#FF8F00',
  },
};

export function SurpriseModal({ state, onReveal }: SurpriseModalProps) {
  const { playSurprise } = useSound();
  const [revealed, setRevealed] = useState(false);

  const currentSurprise = state.currentQuestion?.surpriseType;
  const surprise = currentSurprise ? surpriseConfig[currentSurprise] : null;

  if (!surprise) return null;

  const handleReveal = () => {
    setRevealed(true);
    playSurprise();
    setTimeout(() => {
      onReveal();
    }, 2000);
  };

  return (
    <motion.div
      className="fixed inset-0 z-40 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-game-navy/95 backdrop-blur-md" />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${surprise.color}22, ${surprise.color}11)`,
          border: `3px solid ${surprise.color}55`,
          boxShadow: `0 20px 60px ${surprise.color}33`,
        }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <div className="p-8 md:p-12 flex flex-col items-center gap-6">
          {/* Sparkle effects */}
          <AnimatePresence>
            {!revealed && (
              <>
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    style={{
                      left: `${15 + i * 15}%`,
                      top: `${20 + (i % 2) * 40}%`,
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  >
                    <Sparkles className="w-6 h-6 text-game-yellow" />
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>

          {/* Surprise image with shake animation */}
          <motion.div
            className="relative w-40 h-40 md:w-48 md:h-48"
            animate={
              revealed
                ? { scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }
                : { rotate: [-3, 3, -3, 3, -3, 0] }
            }
            transition={
              revealed
                ? { duration: 0.5 }
                : { duration: 0.5, repeat: Infinity, repeatDelay: 1 }
            }
          >
            <img
              src={surprise.image}
              alt={surprise.title}
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </motion.div>

          {/* Title */}
          <motion.h2
            className="font-rubik text-3xl md:text-5xl font-black text-center"
            style={{
              color: surprise.color,
              textShadow: `0 4px 20px ${surprise.color}44`,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {surprise.title}
          </motion.h2>

          {/* Description */}
          <motion.p
            className="font-rubik text-lg md:text-xl text-white/80 text-center leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {surprise.description}
          </motion.p>

          {/* Reveal button */}
          {!revealed ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Button
                onClick={handleReveal}
                className="font-rubik text-xl font-bold px-10 py-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
                style={{
                  background: `linear-gradient(135deg, ${surprise.color}, ${surprise.color}dd)`,
                  color: '#fff',
                }}
              >
                <Sparkles className="w-5 h-5 mr-2" />
                ОТКРЫТЬ СЮРПРИЗ!
              </Button>
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center gap-2 text-game-yellow font-rubik text-lg font-bold"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <ArrowRight className="w-5 h-5" />
              <span>Готовим вопрос...</span>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
