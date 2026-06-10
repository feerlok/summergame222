import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useGameState } from '@/hooks/useGameState';
import { useSound } from '@/hooks/useSound';
import { SplashScreen } from '@/components/SplashScreen';
import { GameBoard } from '@/components/GameBoard';
import { QuestionModal } from '@/components/QuestionModal';
import { AnswerScreen } from '@/components/AnswerScreen';
import { SurpriseModal } from '@/components/SurpriseModal';
import { FinalScreen } from '@/components/FinalScreen';
import { Confetti } from '@/components/Confetti';
import { AuctionControls } from '@/components/AuctionControls';

export default function App() {
  const {
    state,
    startGame,
    selectQuestion,
    showAnswer,
    answerCorrect,
    answerWrong,
    tickTimer,
    stopTimer,
    nextTeam,
    setTeamName,
    endGame,
    restartGame,
    selectSurprise,
    revealSurprise,
    setAuctionPoints,
  } = useGameState();

  const { playSelect } = useSound();
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showAuction, setShowAuction] = useState(false);

  // Handle timer for question screen
  useEffect(() => {
    if (state.screen === 'question' && state.isTimerRunning) {
      timerRef.current = setInterval(() => {
        tickTimer();
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [state.screen, state.isTimerRunning, tickTimer]);

  // Show confetti on final screen
  useEffect(() => {
    if (state.screen === 'final') {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [state.screen]);

  // Handle auction surprise
  useEffect(() => {
    if (
      state.screen === 'surprise' &&
      state.currentQuestion?.surpriseType === 'auction'
    ) {
      setShowAuction(true);
    } else {
      setShowAuction(false);
    }
  }, [state.screen, state.currentQuestion]);

  const handleStartGame = () => {
    playSelect();
    startGame();
  };

  const handleSelectQuestion = (categoryId: string, questionId: string) => {
    selectQuestion(categoryId, questionId);
  };

  const handleSelectSurprise = (surprise: { categoryIndex: number; questionIndex: number; type: 'mystery-bag' | 'audience' | 'auction' }) => {
    selectSurprise(surprise);
  };

  const handleRevealSurprise = () => {
    // For auction, show controls instead of immediately going to question
    if (state.currentQuestion?.surpriseType === 'auction') {
      // Auction controls will be shown, and when confirmed, revealSurprise is called
      return;
    }
    revealSurprise();
  };

  const handleAuctionConfirm = () => {
    setShowAuction(false);
    revealSurprise();
  };

  const handleShowAnswer = () => {
    stopTimer();
    showAnswer();
  };

  const handleAnswerCorrect = () => {
    answerCorrect();
    setTimeout(() => {
      nextTeam();
    }, 1500);
  };

  const handleAnswerWrong = () => {
    answerWrong();
    // nextTeam is called inside answerWrong in the reducer
  };

  return (
    <div className="min-h-screen bg-game-navy font-rubik overflow-hidden">
      <AnimatePresence mode="wait">
        {state.screen === 'splash' && (
          <SplashScreen key="splash" onStart={handleStartGame} />
        )}

        {state.screen === 'board' && (
          <GameBoard
            key="board"
            state={state}
            onSelectQuestion={handleSelectQuestion}
            onSelectSurprise={handleSelectSurprise}
            onEndGame={endGame}
            onSetTeamName={setTeamName}
          />
        )}

        {state.screen === 'final' && (
          <FinalScreen key="final" state={state} onRestart={restartGame} />
        )}
      </AnimatePresence>

      {/* Question Modal - overlay on top of board */}
      <AnimatePresence>
        {state.screen === 'question' && (
          <QuestionModal
            key="question"
            state={state}
            onShowAnswer={handleShowAnswer}
            onTickTimer={tickTimer}
          />
        )}
      </AnimatePresence>

      {/* Answer Screen - overlay on top of board */}
      <AnimatePresence>
        {state.screen === 'answer' && (
          <AnswerScreen
            key="answer"
            state={state}
            onCorrect={handleAnswerCorrect}
            onWrong={handleAnswerWrong}
            onNextTeam={nextTeam}
          />
        )}
      </AnimatePresence>

      {/* Surprise Modal */}
      <AnimatePresence>
        {state.screen === 'surprise' && (
          <SurpriseModal
            key="surprise"
            state={state}
            onReveal={handleRevealSurprise}
          />
        )}
      </AnimatePresence>

      {/* Auction Controls - shown inside surprise modal */}
      <AnimatePresence>
        {showAuction && state.screen === 'surprise' && (
          <motion.div
            key="auction"
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-game-navy/80 backdrop-blur-sm" />
            <motion.div
              className="relative z-10 flex flex-col items-center gap-6"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <h2 className="font-rubik text-3xl font-black text-game-orange">
                АУКЦИОН
              </h2>
              <p className="font-rubik text-white/70 text-center max-w-md">
                Команды по очереди повышают ставку. Кто больше поставит — тот отвечает на вопрос!
              </p>
              <AuctionControls
                state={state}
                onSetAuctionPoints={setAuctionPoints}
                onConfirm={handleAuctionConfirm}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti */}
      <Confetti active={showConfetti} />
    </div>
  );
}
