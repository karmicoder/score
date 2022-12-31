<script lang="ts">
  import Button from '@smui/button';
  import log from 'loglevel';
  import moment from 'moment';
  import { game, pendingPeriodTime } from 'src/lib/game.store';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  import { getTimerContext } from 'src/lib/timer.context';
  const timer = getTimerContext();
  let isRunning = timer.isRunning;
  $: periodTimeRemaining = moment.duration($game.periodTimeRemaining, 'ms');
  let handleReset = () => {
    if ($pendingPeriodTime) {
      $game.periodTimeRemaining = $pendingPeriodTime;
    } else {
      log.error("Can't reset clock, $pendingPeriodTime is undefined");
    }
  };

  let handleGlobalKeypress = (e: KeyboardEvent) => {
    if (e.target instanceof HTMLInputElement && !e.target.disabled) {
      return;
    }
    console.log('handleGlobalKeypress', e);
    if (e.code === 'Space') {
      if ($isRunning) {
        timer.stop();
      } else {
        timer.start();
      }
    } else if (e.code === 'KeyR') {
      handleReset();
    }
  };
</script>

<svelte:window on:keypress|capture={handleGlobalKeypress} />
<div class="GameClock mdc-card padded">
  <div class="display">
    <PeriodTime value={periodTimeRemaining} />
  </div>
  <div class="actions">
    <Button type="button" on:click={timer.start} disabled={$isRunning}>Start</Button>
    <Button type="button" on:click={timer.stop} disabled={!$isRunning}>Stop</Button>
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
