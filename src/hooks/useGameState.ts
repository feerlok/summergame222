import { useReducer, useCallback } from 'react';
import type { GameState, GameAction, SurpriseCell } from '@/types/game';
import { initialCategories, generateSurpriseCells } from '@/data/questions';

const createInitialState = (): GameState => ({
  screen: 'splash',
  categories: initialCategories.map((cat) => ({
    ...cat,
    questions: cat.questions.map((q) => ({ ...q })),
  })),
  teams: [
    { id: 'team1', name: 'Команда 1', score: 0, color: '#1E88E5' },
    { id: 'team2', name: 'Команда 2', score: 0, color: '#FF5252' },
  ],
  activeTeamId: 'team1',
  currentQuestion: null,
  surpriseCells: generateSurpriseCells(),
  timer: 30,
  maxTimer: 30,
  isTimerRunning: false,
  questionsAsked: 0,
  totalQuestions: 30,
  audienceQuestion: null,
  auctionPoints: 0,
  auctionTeam: null,
});

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...createInitialState(),
        screen: 'board',
        surpriseCells: generateSurpriseCells(),
      };

    case 'SELECT_QUESTION': {
      const category = state.categories.find((c) => c.id === action.categoryId);
      if (!category) return state;
      const question = category.questions.find((q) => q.id === action.questionId);
      if (!question || question.asked) return state;

      // Check if it's a surprise cell
      const catIdx = state.categories.findIndex((c) => c.id === action.categoryId);
      const qIdx = category.questions.findIndex((q) => q.id === action.questionId);
      const surpriseCell = state.surpriseCells.find(
        (s) => s.categoryIndex === catIdx && s.questionIndex === qIdx
      );

      if (surpriseCell) {
        return {
          ...state,
          currentQuestion: { ...question },
          screen: 'surprise',
          surpriseCells: state.surpriseCells.map((s) =>
            s.categoryIndex === catIdx && s.questionIndex === qIdx
              ? { ...s, type: surpriseCell.type }
              : s
          ),
          timer: 30,
          isTimerRunning: false,
        };
      }

      return {
        ...state,
        currentQuestion: { ...question },
        screen: 'question',
        timer: 30,
        isTimerRunning: true,
      };
    }

    case 'SHOW_ANSWER':
      return {
        ...state,
        screen: 'answer',
        isTimerRunning: false,
      };

    case 'ANSWER_CORRECT': {
      if (!state.currentQuestion) return state;
      const points = state.currentQuestion.points;
      const isAuction = state.auctionTeam === state.activeTeamId && state.auctionPoints > 0;
      const finalPoints = isAuction ? state.auctionPoints : points;

      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === state.activeTeamId
            ? { ...t, score: t.score + finalPoints }
            : t
        ),
        categories: state.categories.map((cat) => ({
          ...cat,
          questions: cat.questions.map((q) =>
            q.id === state.currentQuestion!.id ? { ...q, asked: true } : q
          ),
        })),
        questionsAsked: state.questionsAsked + 1,
        currentQuestion: { ...state.currentQuestion, asked: true },
        auctionPoints: 0,
        auctionTeam: null,
      };
    }

    case 'ANSWER_WRONG': {
      if (!state.currentQuestion) return state;
      const points = state.currentQuestion.points;
      const isAuction = state.auctionTeam === state.activeTeamId && state.auctionPoints > 0;
      const finalPoints = isAuction ? state.auctionPoints : points;

      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === state.activeTeamId
            ? { ...t, score: Math.max(0, t.score - finalPoints) }
            : t
        ),
        categories: state.categories.map((cat) => ({
          ...cat,
          questions: cat.questions.map((q) =>
            q.id === state.currentQuestion!.id ? { ...q, asked: true } : q
          ),
        })),
        questionsAsked: state.questionsAsked + 1,
        currentQuestion: { ...state.currentQuestion, asked: true },
        activeTeamId: state.teams.find((t) => t.id !== state.activeTeamId)!.id,
        auctionPoints: 0,
        auctionTeam: null,
      };
    }

    case 'TICK_TIMER': {
      if (state.timer <= 0) {
        return { ...state, timer: 0, isTimerRunning: false, screen: 'answer' };
      }
      return { ...state, timer: state.timer - 1 };
    }

    case 'STOP_TIMER':
      return { ...state, isTimerRunning: false };

    case 'RESET_TIMER':
      return { ...state, timer: state.maxTimer, isTimerRunning: false };

    case 'NEXT_TEAM': {
      const nextTeam = state.teams.find((t) => t.id !== state.activeTeamId);
      return {
        ...state,
        activeTeamId: nextTeam?.id || state.activeTeamId,
        screen: 'board',
        currentQuestion: null,
        timer: 30,
        isTimerRunning: false,
      };
    }

    case 'SET_TEAM_NAME':
      return {
        ...state,
        teams: state.teams.map((t) =>
          t.id === action.teamId ? { ...t, name: action.name } : t
        ),
      };

    case 'END_GAME':
      return { ...state, screen: 'final', isTimerRunning: false };

    case 'RESTART_GAME':
      return createInitialState();

    case 'SELECT_SURPRISE': {
      const { surprise } = action;
      const category = state.categories[surprise.categoryIndex];
      const question = category.questions[surprise.questionIndex];

      if (surprise.type === 'audience') {
        return {
          ...state,
          screen: 'surprise',
          currentQuestion: { ...question, isSurprise: true, surpriseType: 'audience' },
          audienceQuestion: { ...question },
          timer: 30,
          isTimerRunning: false,
        };
      }

      if (surprise.type === 'auction') {
        return {
          ...state,
          screen: 'surprise',
          currentQuestion: { ...question, isSurprise: true, surpriseType: 'auction' },
          auctionPoints: 100,
          auctionTeam: state.activeTeamId,
          timer: 30,
          isTimerRunning: false,
        };
      }

      // mystery-bag: random question from any category
      const allQuestions = state.categories.flatMap((cat) => cat.questions);
      const unanswered = allQuestions.filter((q) => !q.asked && q.id !== question.id);
      const randomQ = unanswered.length > 0
        ? unanswered[Math.floor(Math.random() * unanswered.length)]
        : question;

      return {
        ...state,
        screen: 'surprise',
        currentQuestion: { ...randomQ, isSurprise: true, surpriseType: 'mystery-bag' },
        timer: 30,
        isTimerRunning: false,
      };
    }

    case 'REVEAL_SURPRISE': {
      return {
        ...state,
        screen: 'question',
        isTimerRunning: true,
      };
    }

    case 'SET_AUCTION_POINTS':
      return {
        ...state,
        auctionPoints: action.points,
        auctionTeam: action.teamId,
      };

    case 'SET_AUDIENCE_QUESTION':
      return {
        ...state,
        audienceQuestion: action.question,
      };

    default:
      return state;
  }
}

export function useGameState() {
  const [state, dispatch] = useReducer(gameReducer, null, createInitialState);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const selectQuestion = useCallback(
    (categoryId: string, questionId: string) =>
      dispatch({ type: 'SELECT_QUESTION', categoryId, questionId }),
    []
  );
  const showAnswer = useCallback(() => dispatch({ type: 'SHOW_ANSWER' }), []);
  const answerCorrect = useCallback(() => dispatch({ type: 'ANSWER_CORRECT' }), []);
  const answerWrong = useCallback(() => dispatch({ type: 'ANSWER_WRONG' }), []);
  const tickTimer = useCallback(() => dispatch({ type: 'TICK_TIMER' }), []);
  const stopTimer = useCallback(() => dispatch({ type: 'STOP_TIMER' }), []);
  const nextTeam = useCallback(() => dispatch({ type: 'NEXT_TEAM' }), []);
  const setTeamName = useCallback(
    (teamId: string, name: string) => dispatch({ type: 'SET_TEAM_NAME', teamId, name }),
    []
  );
  const endGame = useCallback(() => dispatch({ type: 'END_GAME' }), []);
  const restartGame = useCallback(() => dispatch({ type: 'RESTART_GAME' }), []);
  const selectSurprise = useCallback(
    (surprise: SurpriseCell) => dispatch({ type: 'SELECT_SURPRISE', surprise }),
    []
  );
  const revealSurprise = useCallback(() => dispatch({ type: 'REVEAL_SURPRISE' }), []);
  const setAuctionPoints = useCallback(
    (points: number, teamId: string) => dispatch({ type: 'SET_AUCTION_POINTS', points, teamId }),
    []
  );

  return {
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
  };
}
