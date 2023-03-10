import moment from 'moment';
import type { GameState } from 'src/types/game';
import HockeyControl from './HockeyControl.svelte';
import HockeyScoreboard from './HockeyScoreboard.svelte';
import type { HockeyGameState, HockeyTeamState } from './HockeyGame';
export function createTeam(name: string): HockeyTeamState {
  return {
    id: crypto.randomUUID(),
    name,
    score: 0,
    shotsOnGoal: 0,
    saves: 0,
    activePenalties: []
  };
}

export function createGame(opts?: Partial<GameState>): HockeyGameState {
  return {
    periodTimeRemaining: moment.duration(20, 'minute').asMilliseconds(),
    periodNumber: 1,
    teams: [createTeam('Home'), createTeam('Visitor')] as HockeyTeamState[],
    ...opts,
    sport: 'hockey'
  };
}

export function isHockeyGame(input: GameState): input is HockeyGameState {
  return input.sport === 'hockey';
}

export const controlComponent = HockeyControl;
export const scoreboardComponent = HockeyScoreboard;

export default {
  createGame,
  createTeam,
  controlComponent,
  scoreboardComponent
};
