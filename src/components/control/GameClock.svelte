<script lang="ts" context="module">
  function formatTimePart(timePart: number) {
    return timePart.toString().padStart(2, '0');
  }
</script>

<script lang="ts">
  import Button from '@smui/button';

  import moment from 'moment';
  import {
    game,
    pendingPeriodTime,
    horn,
    startPeriodTimer,
    triggerHornFor
  } from 'src/lib/game.store';

  $: remainingDuration = $game.periodTimeRemaing;

  let intervalRef: NodeJS.Timer | undefined;
  $: {
    if (remainingDuration.asMilliseconds() <= 0) {
      if (intervalRef) {
        triggerHornFor();
      }
      remainingDuration = moment.duration(0);
      handlePause();
    }
  }
  $: isRunning = !!intervalRef;

  let handleStart = () => {
    intervalRef = startPeriodTimer();
  };

  let handlePause = () => {
    clearInterval(intervalRef);
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
      e.preventDefault();
      if (isRunning) {
        handlePause();
      } else {
        handleStart();
      }
    } else if (e.code === 'KeyR') {
      e.preventDefault();
      handleReset();
    }
  };
</script>

<svelte:window on:keypress={handleGlobalKeypress} />
<div class="GameClock mdc-card padded">
  <div class="display">
    {#if remainingDuration.asHours() >= 1}{formatTimePart(
        remainingDuration.hours()
      )}:{/if}{#if remainingDuration.asMinutes() >= 1}{formatTimePart(
        remainingDuration.minutes()
      )}:{/if}{formatTimePart(
      remainingDuration.seconds()
    )}{#if remainingDuration.asMinutes() < 1}.{remainingDuration
        .milliseconds()
        .toString()
        .slice(0, 2)
        .padStart(2, '0')}{/if}
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
      font-family: monospace;
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
