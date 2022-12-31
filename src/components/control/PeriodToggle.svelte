<script lang="ts">
  import Counter from './Counter.svelte';

  export let periodCount: number;
  export let value: number;
  export let allowOT = true;

  let displayValueFn = () => {
    if (value <= periodCount) {
      return value.toFixed(0);
    }
    const otNumber = value - periodCount;
    return otNumber > 1 ? 'OT' + otNumber : 'OT';
  };
</script>

<h5>Period</h5>
<Counter bind:value min={1} max={allowOT ? undefined : periodCount} {displayValueFn} />
