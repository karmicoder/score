<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Penalty } from './HockeyGame';
  import { game } from 'src/lib/game.store';
  import { penaltyDurationFor } from './Penalty';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  let value: Penalty[] = [];
</script>

<div class="PenaltyInput">
  <h5>Penalties</h5>
  <div class="penalties">
    {#each value as penalty}
      <div class="penalty">
        <span class="player">#{penalty.playerNumber}</span>
        <span class="period">P{penalty.periodAt}</span>
      </div>
    {/each}
  </div>
</div>
