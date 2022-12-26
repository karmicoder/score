<script lang="ts">
  import Counter from 'src/components/control/Counter.svelte';
  import { createEventDispatcher } from 'svelte';
  export let value: number;
  const dispatch = createEventDispatcher<{ change: number }>();
  $: dispatch('change', value);
</script>

<div class="ShotsOnGoal">
  <h5>SOG</h5>
  <Counter bind:value />
</div>
