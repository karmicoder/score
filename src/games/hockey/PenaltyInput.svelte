<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Penalty } from './HockeyGame';
  import { penaltyTimeRemaining } from './Penalty';
  import { game } from 'src/lib/game.store';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  import Button, { Icon } from '@smui/button';
  import IconButton from '@smui/icon-button/src/IconButton.svelte';
  // import { penaltyDurationFor } from './Penalty';
  // import PeriodTime from 'src/components/PeriodTime.svelte';
  export let value: Penalty[] = [];
  const dispatcher = createEventDispatcher<{ change: Penalty[] }>();
  const handleAddPenalty = () => {
    const newValue: Penalty[] = [
      ...value,
      {
        infraction: 'interference',
        timeAt: $game.periodTimeRemaing,
        playerNumber: 69,
        periodAt: $game.periodNumber,
        type: 'minor'
      }
    ];
    dispatcher('change', newValue);
  };
  const handleDelete = (index: number) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    dispatcher('change', newValue);
  };
</script>

<div class="PenaltyInput">
  <h5>Penalties</h5>
  <div class="penalties">
    {#each value as penalty, index}
      <div class="penalty">
        <span class="time-remaining">
          <PeriodTime value={penaltyTimeRemaining($game, penalty)} />
        </span>
        {#if penalty.playerNumber !== undefined}<span class="player">
            #{penalty.playerNumber}
          </span>{:else}[BENCH]{/if}
        <span class="infraction">{penalty.infraction}</span>
        <IconButton
          size="button"
          color="primary"
          class="material-icons"
          on:click={() => handleDelete(index)}
        >
          delete
        </IconButton>
      </div>
    {/each}
    <Button on:click={handleAddPenalty}><Icon>add</Icon> Add Penalty</Button>
  </div>
</div>
