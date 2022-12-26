import type { Duration } from 'moment';

export interface GameDef {
  createGame: (opts?: GameState) => GameState;
  createTeam: (name: string) => TeamState;
  controlComponent: ConstructorOfATypedSvelteComponent;
  scoreboardComponent: ConstructorOfATypedSvelteComponent;
}

export interface GameState {
  sport: string;
  periodTimeRemaing: Duration;
  periodNumber: number;
  teams: TeamState[];
}

export interface TeamState {
  id: string;
  name: string;
  score: number;
}
