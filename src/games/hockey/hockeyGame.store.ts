import { game } from 'src/lib/game.store';
import { derived } from 'svelte/store';
import { isHockeyGame } from '.';

export const hockeyGame = derived(game, (v) => (isHockeyGame(v) ? v : undefined));
