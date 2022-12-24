<script lang="ts">
  import Counter from 'src/components/control/Counter.svelte';
  import { createEventDispatcher } from 'svelte';
  export let value: number;
  export let teamName: string;
  const dispatch = createEventDispatcher<{ change: number }>();
  $: dispatch('change', value);
</script>

<Counter label={teamName + 'SOG'} bind:value />
