import moment from 'moment';
import type { GameState } from 'src/types/game';
import { writable } from 'svelte/store';

export let game = writable<GameState>({
  periodNumber: 1,
  periodTimeRemaing: moment.duration(20, 'minute'),
  teams: [
    { name: 'Home', score: 0 },
    { name: 'Away', score: 0 }
  ]
});
