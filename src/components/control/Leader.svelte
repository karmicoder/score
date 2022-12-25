<script lang="ts">
  import { game } from 'src/lib/game.store';
  $: tied = $game.teams.every((t) => t.score === $game.teams[0].score);
</script>

<div class="Leader">
  {#if tied}tied{:else}{$game.teams.slice().sort((a, b) => b.score - a.score)[0].name} is winning{/if}
</div>

<style lang="scss">
  .Leader {
    flex-basis: 100%;
  }
</style>
