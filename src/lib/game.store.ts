import moment from 'moment';
import type { GameState } from 'src/types/game';
import { writable } from 'svelte/store';

export let game = writable<GameState>({
  sport: 'none',
  periodNumber: 0,
  periodTimeRemaing: moment.duration(0),
  teams: []
});

export let horn = writable<boolean>(false);

export function triggerHornFor(durationMs = 3000) {
  horn.set(true);
  setTimeout(() => {
    horn.set(false);
  }, durationMs);
}
