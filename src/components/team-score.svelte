<script lang="ts">
  import type { TeamState } from 'src/types/game';
  import { createEventDispatcher } from 'svelte';
  let dispatch = createEventDispatcher<{ change: TeamState }>();
  export let team: TeamState;

  function raiseChange() {
    dispatch('change', team);
  }
  function changeScoreBy(amount: number) {
    team.score += amount;
    raiseChange();
  }
</script>

<div class="TeamScore">
  <input type="text" bind:value={team.name} on:input={raiseChange} class="team-name" />
  <div class="score">{team.score.toFixed(0)}</div>
  <button type="button" on:click={() => changeScoreBy(1)}>+</button>
  <button type="button" on:click={() => changeScoreBy(-1)}>-</button>
</div>

<style lang="scss">
  .TeamScore {
    .team-name {
      border: none;
      font-size: 1.5rem;
      &:focus {
        outline-color: var(--input-outline-focus);
      }
    }
  }
</style>
