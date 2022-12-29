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
  | 'delay of game'
  | 'equipment violation'
  | 'illegal substitution'
  | 'charging'
  | 'holding'
  | 'holding the stick'
  | 'tripping'
  | 'elbowing'
  | 'spearing'
  | 'roughing'
  | 'boarding'
  | 'too many men'
  | 'interference'
  | 'goaltender interference'
  | 'check to the head'
  | 'high-sticking'
  | 'abuse of officials'
  | 'instigating'
  | 'embellishment'
  | 'fighting';

export type PenaltyType =
  | 'minor'
  | 'double minor'
  | 'major'
  | 'misconduct'
  | 'game misconduct'
  | 'match';

export interface Penalty {
  type: PenaltyType;
  periodAt: number;
  timeAt: moment.Duration;
  playerNumber?: string; // undefined = bench
  infraction: Infraction;
}
