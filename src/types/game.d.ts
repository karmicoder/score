import type { Duration } from 'moment';

export interface GameState {
  periodTimeRemaing: Duration;
  periodNumber?: number;
  teams: TeamState[];
}

export interface TeamState {
  name: string;
  score: number;
}
