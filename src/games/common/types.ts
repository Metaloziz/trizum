export interface GameProps {
  width: number;
  onTimerTick?(seconds : number): void;
  onEnd?(): void;
  onFeedbackSuccess?(): void;
  onFeedbackError?(): void;
}

export interface GameResult {
  result : 'win' | 'lose' | 'end';
  time : number;
  timeDiff? : number;
  score?: number;
  failed?: number;
  success?: number;
}

export interface Game {
  start(): void;
}
