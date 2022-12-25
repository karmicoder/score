<script lang="ts" context="module">
  function formatTimePart(timePart: number) {
    return timePart.toString().padStart(2, '0');
  }
</script>

<script lang="ts">
  import Button from '@smui/button';
  import Card from '@smui/card';

  import moment from 'moment';
  import { game, horn, triggerHornFor } from 'src/lib/game.store';

  const HORN_DURATION = 3000;

  const interval = 1000 / 100;
  let remainingDuration = $game.periodTimeRemaing;

  let intervalRef: NodeJS.Timer | undefined;
  let lastIntervalTime: moment.Moment | undefined;
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
    lastIntervalTime = moment();
    intervalRef = setInterval(() => {
      remainingDuration = remainingDuration
        .clone()
        .subtract(moment().diff(lastIntervalTime, 'ms'), 'ms');
      lastIntervalTime = moment();
    }, interval);
  };

  let handlePause = () => {
    clearInterval(intervalRef);
    intervalRef = undefined;
  };

  let handleReset = () => {
    remainingDuration = $game.periodTimeRemaing;
  };
</script>

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
      button {
        flex-grow: 1;
      }
    }
  }
</style>
