import type moment from 'moment';
import type { GameState, TeamState } from 'src/types/game';

export interface HockeyGameState extends GameState {
  sport: 'hockey';
  teams: HockeyTeamState[];
}

export interface HockeyTeamState extends TeamState {
  shotsOnGoal: number;
  saves: number;
  activePenalties: Penalty[];
}

export type Infraction =
  | 'unsportsmanlike'
  | 'hooking'
  | 'slashing'
  | 'cross-checking'
  | 'roughing'
  | 'boarding'
  | 'too many men'
  | 'interference'
  | 'high-sticking'
  | 'fighting';

export type PenaltyType = 'minor' | 'major' | 'misconduct' | 'game misconduct' | 'match';

export interface Penalty {
  type: PenaltyType;
  periodAt: number;
  timeAt: moment.Duration;
  playerNumber?: number; // undefined = bench
  infraction: Infraction;
}
