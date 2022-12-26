<script lang="ts">
  import { game, horn } from 'src/lib/game.store';
  import { createGame } from 'src/games/hockey/index';
  import { onMount } from 'svelte';
  import type { GameDef } from 'src/types/game';
  import hornSound from './horn-blast.mp3';
  onMount(() => {
    $game = createGame();
  });
  export let data: { sport: string };
  let hornElem: HTMLAudioElement | undefined = undefined;
  $: sportDefPromise = (
    import(`../../../../src/games/${data.sport}/index.ts`) as Promise<GameDef>
  ).then((sportDef) => {
    $game = sportDef.createGame();
    return sportDef;
  });
  $: {
    if (hornElem) {
      hornElem.currentTime = 0;
    }
    if ($horn) {
      hornElem?.play();
    } else {
      hornElem?.pause();
    }
  }
</script>

<audio src={hornSound} loop bind:this={hornElem} preload="auto" />
{#await sportDefPromise}
  <p>One Moment...</p>
{:then sportDef}
  <section class="scoreboard">
    <svelte:component this={sportDef.scoreboardComponent} />
  </section>
  <section class="control">
    <svelte:component this={sportDef.controlComponent} />
  </section>
{/await}
