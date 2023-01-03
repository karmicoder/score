import log from 'loglevel';
import type { GameState } from 'src/types/game';
import { onDestroy, onMount } from 'svelte';
import { LS_GAME } from './constants';
import { game, triggerHornFor } from './game.store';
import { createTickListener, getTimerContext } from './timer.context';

export function gameController() {
  let $game: GameState;
  let $isRunning: boolean;
  let timer = getTimerContext();

  onMount(() => {
    if (localStorage && localStorage[LS_GAME]) {
      try {
        game.set(JSON.parse(localStorage[LS_GAME]));
      } catch (err) {
        log.error('Error parsing GameState from localStorage', err);
      }
    }
    return game.subscribe((newGame) => {
      localStorage[LS_GAME] = JSON.stringify(newGame);
    });
  });

  log.debug('gameController');
  // run down time remaining when clock is running
  createTickListener((sinceLastTickMs) => {
    if ($game) {
      $game.periodTimeRemaining -= sinceLastTickMs;
      game.set($game);
    }
  });

  const hornCheck = () => {
    // sound horn if no periodTimeRemaining and timer is running
    if ($game && $game.periodTimeRemaining <= 0 && $isRunning) {
      log.debug('horn!');
      timer.stop();
      triggerHornFor();
      $game.periodTimeRemaining = 0;
      game.set($game);
    }
  };
  const unsubGame = game.subscribe((newGame) => {
    $game = newGame;
    hornCheck();
  });
  const unsubIsRunning = timer.isRunning.subscribe((newIsRunning) => {
    $isRunning = newIsRunning;
    hornCheck();
  });

  onDestroy(() => {
    unsubGame();
    unsubIsRunning();
  });
}
