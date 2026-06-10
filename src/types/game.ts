export interface Question {
  id: string;
  categoryId: string;
  points: number;
  question: string;
  answer: string;
  explanation: string;
  asked: boolean;
  isSurprise?: boolean;
  surpriseType?: 'mystery-bag' | 'audience' | 'auction';
}

export interface Category {
  id: string;
  name: string;
  color: string;
  icon: string;
  questions: Question[];
}

export interface Team {
  id: string;
  name: string;
  score: number;
  color: string;
}

export type GameScreen =
  | 'splash'
  | 'board'
  | 'question'
  | 'answer'
  | 'surprise'
  | 'final';

export type SurpriseType = 'mystery-bag' | 'audience' | 'auction';

export interface SurpriseCell {
  categoryIndex: number;
  questionIndex: number;
  type: SurpriseType;
}

export interface GameState {
  screen: GameScreen;
  categories: Category[];
  teams: Team[];
  activeTeamId: string;
  currentQuestion: Question | null;
  surpriseCells: SurpriseCell[];
  timer: number;
  maxTimer: number;
  isTimerRunning: boolean;
  questionsAsked: number;
  totalQuestions: number;
  audienceQuestion: Question | null;
  auctionPoints: number;
  auctionTeam: string | null;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_QUESTION'; categoryId: string; questionId: string }
  | { type: 'SHOW_ANSWER' }
  | { type: 'ANSWER_CORRECT' }
  | { type: 'ANSWER_WRONG' }
  | { type: 'TICK_TIMER' }
  | { type: 'STOP_TIMER' }
  | { type: 'RESET_TIMER' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SET_TEAM_NAME'; teamId: string; name: string }
  | { type: 'END_GAME' }
  | { type: 'RESTART_GAME' }
  | { type: 'SELECT_SURPRISE'; surprise: SurpriseCell }
  | { type: 'REVEAL_SURPRISE' }
  | { type: 'SET_AUCTION_POINTS'; points: number; teamId: string }
  | { type: 'SET_AUDIENCE_QUESTION'; question: Question };
