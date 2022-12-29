<script lang="ts">
  import { game } from 'src/lib/game.store';
</script>

<div class="HockeyScoreboard">
  <pre>{JSON.stringify($game, null, 2)}</pre>
</div>

<style lang="scss">
  pre {
    max-height: 20rem;
    overflow-y: auto;
  }
</style>
