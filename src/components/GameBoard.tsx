import { motion } from 'framer-motion';
import { Trophy, Flag, Gift } from 'lucide-react';
import type { GameState, SurpriseCell } from '@/types/game';
import { Button } from '@/components/ui/button';
import { useSound } from '@/hooks/useSound';

interface GameBoardProps {
  state: GameState;
  onSelectQuestion: (categoryId: string, questionId: string) => void;
  onSelectSurprise: (surprise: SurpriseCell) => void;
  onEndGame: () => void;
  onSetTeamName: (teamId: string, name: string) => void;
}

export function GameBoard({
  state,
  onSelectQuestion,
  onSelectSurprise,
  onEndGame,
  onSetTeamName,
}: GameBoardProps) {
  const { playSelect } = useSound();
  const activeTeam = state.teams.find((t) => t.id === state.activeTeamId);

  const isSurpriseCell = (catIdx: number, qIdx: number): SurpriseCell | undefined => {
    return state.surpriseCells.find(
      (s) => s.categoryIndex === catIdx && s.questionIndex === qIdx
    );
  };

  return (
    <motion.div
      className="min-h-screen w-full bg-gradient-to-br from-game-navy via-[#0f2463] to-game-navy p-4 md:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4 md:mb-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src="/assets/mascot.png" alt="" className="w-10 h-10 object-contain" />
            <h1 className="font-rubik text-xl md:text-2xl font-bold text-white">
              СВОЯ ИГРА
            </h1>
          </div>

          {/* Score Board */}
          <div className="flex items-center gap-4 md:gap-8">
            {state.teams.map((team) => (
              <div
                key={team.id}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all duration-300 ${
                  team.id === state.activeTeamId
                    ? 'bg-white/20 ring-2 ring-game-yellow scale-105'
                    : 'bg-white/5'
                }`}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: team.color }}
                />
                <div className="flex flex-col">
                  <input
                    type="text"
                    value={team.name}
                    onChange={(e) => onSetTeamName(team.id, e.target.value)}
                    className="font-rubik text-sm font-bold text-white bg-transparent border-none outline-none w-28 md:w-32 focus:text-game-yellow transition-colors"
                  />
                  <span className="font-rubik text-lg font-black text-game-yellow">
                    {team.score}
                  </span>
                </div>
                {team.id === state.activeTeamId && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <Flag className="w-5 h-5 text-game-yellow" />
                  </motion.div>
                )}
              </div>
            ))}
          </div>

          {/* End game button */}
          <Button
            onClick={onEndGame}
            variant="ghost"
            className="font-rubik text-sm text-white/60 hover:text-white hover:bg-white/10"
          >
            <Trophy className="w-4 h-4 mr-2" />
            Завершить
          </Button>
        </div>

        {/* Active team indicator */}
        <motion.div
          className="mt-3 text-center"
          key={state.activeTeamId}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-rubik text-lg text-white/80">
            Ход команды:{' '}
            <span className="font-bold text-game-yellow">{activeTeam?.name}</span>
          </p>
        </motion.div>
      </div>

      {/* Game Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-3">
          {state.categories.map((category, catIdx) => (
            <div key={category.id} className="flex flex-col gap-2">
              {/* Category Header */}
              <motion.div
                className="rounded-xl p-3 text-center border-2"
                style={{
                  background: `linear-gradient(135deg, ${category.color}dd, ${category.color}88)`,
                  borderColor: `${category.color}44`,
                }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: catIdx * 0.05 }}
              >
                <span className="text-2xl md:text-3xl mb-1 block">{category.icon}</span>
                <h3 className="font-rubik text-xs md:text-sm font-bold text-white uppercase tracking-wider">
                  {category.name}
                </h3>
              </motion.div>

              {/* Question Cells */}
              {category.questions.map((question, qIdx) => {
                const surprise = isSurpriseCell(catIdx, qIdx);
                const isAsked = question.asked;

                return (
                  <motion.button
                    key={question.id}
                    className={`relative rounded-xl p-3 md:p-4 text-center font-rubik font-bold transition-all duration-200 border-2 ${
                      isAsked
                        ? 'bg-white/5 border-white/5 opacity-30 cursor-not-allowed'
                        : surprise
                        ? 'bg-gradient-to-br from-game-purple/40 to-game-pink/40 border-game-purple hover:border-game-yellow cursor-pointer hover:scale-105 hover:shadow-lg'
                        : 'bg-white/10 border-white/10 hover:bg-white/20 hover:border-white/30 cursor-pointer hover:scale-105 hover:shadow-lg'
                    }`}
                    style={
                      !isAsked && !surprise
                        ? {
                            borderColor: `${category.color}44`,
                            color: category.color,
                          }
                        : surprise && !isAsked
                        ? {
                            color: '#FFD600',
                          }
                        : {}
                    }
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isAsked ? 0.3 : 1, y: 0 }}
                    transition={{ delay: catIdx * 0.05 + qIdx * 0.03 }}
                    whileHover={!isAsked ? { scale: 1.05 } : {}}
                    whileTap={!isAsked ? { scale: 0.95 } : {}}
                    onClick={() => {
                      if (isAsked) return;
                      playSelect();
                      if (surprise) {
                        onSelectSurprise(surprise);
                      } else {
                        onSelectQuestion(category.id, question.id);
                      }
                    }}
                    disabled={isAsked}
                  >
                    {surprise && !isAsked ? (
                      <div className="flex flex-col items-center gap-1">
                        <Gift className="w-6 h-6 md:w-8 md:h-8 text-game-yellow" />
                        <span className="text-xs text-game-yellow/80">СЮРПРИЗ!</span>
                      </div>
                    ) : (
                      <span className="text-xl md:text-2xl font-black">
                        {isAsked ? '✓' : question.points}
                      </span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div className="max-w-7xl mx-auto mt-6">
        <div className="flex items-center justify-between text-white/50 font-rubik text-sm mb-2">
          <span>Прогресс игры</span>
          <span>
            {state.questionsAsked} / {state.totalQuestions}
          </span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-game-blue to-game-green rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${(state.questionsAsked / state.totalQuestions) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
}
