<script lang="ts" context="module">
  function formatTimePart(timePart: number) {
    return timePart.toString().padStart(2, '0');
  }
</script>

<script lang="ts">
  import moment from 'moment';
  import { game } from 'src/lib/game.store';
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher<{ horn: () => void }>();
  const interval = 1000 / 60; // 1/60 sec
  let remainingDuration = $game.periodTimeRemaing;

  let intervalRef: NodeJS.Timer | undefined;
  let lastIntervalTime: moment.Moment | undefined;
  $: {
    if (remainingDuration.asMilliseconds() <= 0) {
      remainingDuration = moment.duration(0);
      handlePause();
      dispatch('horn');
    }
  }
  $: isRunning = !!intervalRef;
  $: isHorn = remainingDuration.asMilliseconds() <= 0;

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

<div class="GameClock">
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
    <button type="button" on:click={handleStart} disabled={isRunning || isHorn}
      >Start</button
    >
    <button type="button" on:click={handlePause} disabled={!isRunning}
      >Stop</button
    >
    <button type="button" on:click={handleReset}>Reset</button>
  </div>
  {#if isHorn}Horn!{/if}
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
      border: 1px solid orange;
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
