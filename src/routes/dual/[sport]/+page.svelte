<script lang="ts">
  import { game } from 'src/lib/game.store';
  import { createGame } from 'src/games/hockey/index';
  import { onMount } from 'svelte';
  import type { PageData } from './$types';
  import type { GameDef } from 'src/types/game';
  onMount(() => {
    $game = createGame();
  });
  export let data: { sport: string };
  $: sportDefPromise = (
    import(`../../../../src/games/${data.sport}/index.ts`) as Promise<GameDef>
  ).then((sportDef) => {
    $game = sportDef.createGame();
    return sportDef;
  });
</script>

sport is {data.sport}
{#await sportDefPromise}
  <p>One Moment...</p>
{:then sportDef}
  <svelte:component this={sportDef.controlComponent} />
{/await}
