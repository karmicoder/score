import moment, { type Duration } from 'moment';
import type { GameState } from 'src/types/game';
import { get, writable } from 'svelte/store';

export let game = writable<GameState>({
  sport: 'none',
  periodNumber: 0,
  periodTimeRemaing: moment.duration(0),
  teams: []
});

export let pendingPeriodTime = writable<Duration | undefined>(undefined);

export let horn = writable<boolean>(false);

export function triggerHornFor(durationMs = 3000) {
  horn.set(true);
  setTimeout(() => {
    horn.set(false);
  }, durationMs);
}
const interval = 1000 / 100;

export function startPeriodTimer(): NodeJS.Timer {
  let lastIntervalTime = moment();
  return setInterval(() => {
    const currentGame = get(game);
    currentGame.periodTimeRemaing = currentGame.periodTimeRemaing
      .clone()
      .subtract(moment().diff(lastIntervalTime, 'ms'), 'ms');
    lastIntervalTime = moment();
    game.set(currentGame);
  }, interval);
}
