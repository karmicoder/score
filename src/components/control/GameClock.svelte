<script lang="ts">
  import Button from '@smui/button';

  import moment from 'moment';
  import { game, pendingPeriodTime, horn, triggerHornFor } from 'src/lib/game.store';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  import { onDestroy } from 'svelte';
  import { get } from 'svelte/store';
  const interval = 1000 / 100;

  export function startPeriodTimer() {
    let lastIntervalTime = moment();
    return setInterval(() => {
      const currentGame = get(game);
      currentGame.periodTimeRemaing = currentGame.periodTimeRemaing
        .clone()
        .subtract(moment().diff(lastIntervalTime, 'ms'), 'ms');
      lastIntervalTime = moment();
      game.set({ ...currentGame });
    }, interval);
  }

  let intervalRef: unknown;
  $: {
    if ($game.periodTimeRemaing.asMilliseconds() <= 0) {
      if (intervalRef) {
        triggerHornFor();
      }
      $game.periodTimeRemaing = moment.duration(0);
      handlePause();
    }
  }
  $: isRunning = !!intervalRef;

  let handleStart = () => {
    intervalRef = startPeriodTimer();
  };

  let handlePause = () => {
    clearInterval(intervalRef as number);
    intervalRef = undefined;
  };

  let handleReset = () => {
    if ($pendingPeriodTime) {
      $game.periodTimeRemaing = $pendingPeriodTime;
    }
  };

  let handleGlobalKeypress = (e: KeyboardEvent) => {
    console.log('handleGlobalKeypress', e);
    if (e.code === 'Space') {
      if (isRunning) {
        handlePause();
      } else {
        handleStart();
      }
    } else if (e.code === 'KeyR') {
      handleReset();
    }
  };

  onDestroy(() => {
    clearInterval(intervalRef as number);
  });
</script>

<svelte:window on:keypress|capture={handleGlobalKeypress} />
<div class="GameClock mdc-card padded">
  <div class="display">
    <PeriodTime value={$game.periodTimeRemaing} />
  </div>
  <div class="actions">
    <Button type="button" on:click={handleStart} disabled={isRunning || $horn}>Start</Button>
    <Button type="button" on:click={handlePause} disabled={!isRunning}>Stop</Button>
    <Button type="button" on:click={handleReset}>Reset</Button>
  </div>
</div>

<style lang="scss">
  .GameClock {
    padding: 1rem;
    width: 25%;
    min-width: 12rem;

    .display {
      font-size: 2rem;
      line-height: 3rem;
      font-family: 'CursedTimer', monospace;
      text-align: center;
    }

    .actions {
      margin-top: 1rem;
      display: flex;
      column-gap: 1rem;
      justify-content: center;
    }
  }
</style>
