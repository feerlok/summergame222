import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Play } from 'lucide-react';

interface SplashScreenProps {
  onStart: () => void;
}

export function SplashScreen({ onStart }: SplashScreenProps) {
  return (
    <motion.div
      className="min-h-screen w-full relative flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/assets/splash-bg.jpg)' }}
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-game-navy/80 via-game-navy/60 to-game-navy/80" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 20 + 10,
              height: Math.random() * 20 + 10,
              backgroundColor: ['#FFD600', '#FF8F00', '#43A047', '#FF5252', '#7E57C2'][i % 5],
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -30, 0],
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        {/* Mascot */}
        <motion.img
          src="/assets/mascot.png"
          alt="Талисман"
          className="w-40 h-40 md:w-56 md:h-56 object-contain drop-shadow-2xl"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
        />

        {/* Title */}
        <motion.h1
          className="font-rubik text-5xl md:text-7xl font-black text-white text-center tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
          style={{
            textShadow: '0 4px 20px rgba(255,214,0,0.5), 0 0 60px rgba(30,136,229,0.3)',
          }}
        >
          СВОЯ ИГРА
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="font-rubik text-xl md:text-2xl text-game-yellow font-bold tracking-wider"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Летний лагерь 2025
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-32 h-1 bg-gradient-to-r from-transparent via-game-yellow to-transparent rounded-full"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8 }}
        />

        {/* Start button */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-4"
        >
          <Button
            onClick={onStart}
            className="font-rubik text-xl md:text-2xl font-bold px-12 py-7 rounded-full bg-gradient-to-r from-game-yellow to-game-orange text-game-navy hover:from-white hover:to-game-yellow transition-all duration-300 shadow-[0_8px_30px_rgba(255,214,0,0.4)] hover:shadow-[0_12px_40px_rgba(255,214,0,0.6)] hover:-translate-y-1 active:translate-y-0"
          >
            <Play className="w-7 h-7 mr-3" />
            НАЧАТЬ ИГРУ!
          </Button>
        </motion.div>

        {/* Game info */}
        <motion.p
          className="font-rubik text-sm text-white/60 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          6 категорий · 30 вопросов · Сюрпризы
        </motion.p>
      </div>
    </motion.div>
  );
}
