<script lang="ts">
  import IconButton from '@smui/icon-button';
  export let value: number;

  export let min = 0;
  export let max: number | undefined = undefined;
  export let step = 1;
  export let displayValueFn = (value: number) => value.toFixed(0);

  const changeBy = (amount: number) => {
    value += amount;
  };
</script>

<div class="Counter">
  <IconButton
    size="mini"
    class="material-icons"
    touch
    disabled={value <= min}
    on:click={() => changeBy(-step)}
  >
    remove
  </IconButton>
  <div class="score">{displayValueFn(value)}</div>
  <IconButton
    touch
    size="mini"
    class="material-icons"
    disabled={max !== undefined && value >= max}
    on:click={() => changeBy(step)}
  >
    add
  </IconButton>
</div>

<style lang="scss">
  .Counter {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    .score {
      font-family: CursedTimer;
      font-size: 2.5rem;
      margin: 0 1rem;
      text-align: center;
    }
  }
</style>
