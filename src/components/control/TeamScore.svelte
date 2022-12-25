<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import Counter from './Counter.svelte';
  let dispatch = createEventDispatcher<{ change: number }>();
  export let score: number;
  $: dispatch('change', score);
</script>

<div class="TeamScore">
  <h5>Score</h5>
  <Counter bind:value={score} />
</div>
