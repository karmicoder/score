export interface GameDef {
  createGame: (opts?: GameState) => GameState;
  createTeam: (name: string) => TeamState;
  controlComponent: ConstructorOfATypedSvelteComponent;
  scoreboardComponent: ConstructorOfATypedSvelteComponent;
}

export interface GameState {
  sport: string;
  periodTimeRemaining: number;
  periodNumber: number;
  teams: TeamState[];
}

export interface TeamState {
  id: string;
  name: string;
  score: number;
}
