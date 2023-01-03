import type { GameState } from 'src/types/game';
import { writable } from 'svelte/store';

let defaultGame: GameState = {
  sport: 'none',
  periodNumber: 1,
  periodTimeRemaining: 0,
  teams: []
};

export let game = writable<GameState>(defaultGame);

export let pendingPeriodTime = writable<number | undefined>(undefined);

export let horn = writable<boolean>(false);

export function triggerHornFor(durationMs = 3000) {
  horn.set(true);
  setTimeout(() => {
    horn.set(false);
  }, durationMs);
}
