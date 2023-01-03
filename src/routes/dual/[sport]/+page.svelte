<script lang="ts">
  import type { GameDef } from 'src/types/game';
  import hornSound from './horn-blast.mp3';

  export let data: { sport: string };
  let hornElem: HTMLAudioElement | undefined = undefined;
  $: sportDefPromise = import(`../../../../src/games/${data.sport}/index.ts`) as Promise<GameDef>;
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
