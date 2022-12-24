<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  // let dispatch = createEventDispatcher<{ change: TeamState }>();
  export let value: number;
  export let label: string;

  export let min: number = 0;
  export let max: number | undefined = undefined;

  function changeBy(amount: number) {
    value += amount;
  }
</script>

<div class="Counter">
  <input type="text" bind:value={label} class="label" />
  <div class="score">{value.toFixed(0)}</div>
  <button type="button" disabled={max !== undefined && value >= max} on:click={() => changeBy(1)}
    >+</button
  >
  <button type="button" disabled={value <= min} on:click={() => changeBy(-1)}>-</button>
</div>

<style lang="scss">
  .Counter {
    input.label {
      border: none;
      font-size: 1.5rem;
      &:focus {
        outline-color: var(--input-outline-focus);
      }
    }
  }
</style>
