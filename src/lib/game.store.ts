import moment from 'moment';
import type { GameState } from 'src/types/game';
import { writable } from 'svelte/store';

export let game = writable<GameState>({
  sport: 'none',
  periodNumber: 0,
  periodTimeRemaing: moment.duration(0),
  teams: []
});
