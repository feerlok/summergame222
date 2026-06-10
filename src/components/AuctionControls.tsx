import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronUp, ChevronDown, Check } from 'lucide-react';
import type { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';

interface AuctionControlsProps {
  state: GameState;
  onSetAuctionPoints: (points: number, teamId: string) => void;
  onConfirm: () => void;
}

export function AuctionControls({ state, onSetAuctionPoints, onConfirm }: AuctionControlsProps) {
  const [currentBid, setCurrentBid] = useState(state.auctionPoints || 100);
  const [biddingTeam, setBiddingTeam] = useState(state.activeTeamId);

  const minBid = 100;
  const maxBid = 500;
  const step = 50;

  const handleIncrease = () => {
    if (currentBid < maxBid) {
      const newBid = currentBid + step;
      setCurrentBid(newBid);
      // Switch to other team
      const otherTeam = state.teams.find((t) => t.id !== biddingTeam);
      if (otherTeam) {
        setBiddingTeam(otherTeam.id);
        onSetAuctionPoints(newBid, otherTeam.id);
      }
    }
  };

  const handleDecrease = () => {
    if (currentBid > minBid) {
      const newBid = currentBid - step;
      setCurrentBid(newBid);
      const otherTeam = state.teams.find((t) => t.id !== biddingTeam);
      if (otherTeam) {
        setBiddingTeam(otherTeam.id);
        onSetAuctionPoints(newBid, otherTeam.id);
      }
    }
  };

  const currentTeam = state.teams.find((t) => t.id === biddingTeam);

  return (
    <motion.div
      className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="font-rubik text-xl font-bold text-game-orange text-center mb-4">
        Текущая ставка
      </h3>

      <div className="flex items-center justify-center gap-6 mb-4">
        <Button
          onClick={handleDecrease}
          disabled={currentBid <= minBid}
          variant="ghost"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
        >
          <ChevronDown className="w-6 h-6" />
        </Button>

        <div className="text-center">
          <motion.span
            className="font-rubik text-5xl font-black text-game-yellow"
            key={currentBid}
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {currentBid}
          </motion.span>
          <p className="font-rubik text-sm text-white/50">очков</p>
        </div>

        <Button
          onClick={handleIncrease}
          disabled={currentBid >= maxBid}
          variant="ghost"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white disabled:opacity-30"
        >
          <ChevronUp className="w-6 h-6" />
        </Button>
      </div>

      <div className="text-center mb-4">
        <p className="font-rubik text-sm text-white/60">
          Отвечает:{' '}
          <span className="font-bold" style={{ color: currentTeam?.color }}>
            {currentTeam?.name}
          </span>
        </p>
      </div>

      <Button
        onClick={onConfirm}
        className="w-full font-rubik text-lg font-bold py-4 rounded-xl bg-game-orange hover:bg-game-yellow hover:text-game-navy transition-all duration-300"
      >
        <Check className="w-5 h-5 mr-2" />
        ПОДТВЕРДИТЬ СТАВКУ
      </Button>
    </motion.div>
  );
}
