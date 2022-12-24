<script lang="ts">
  import moment from 'moment';
  import Leader from 'src/components/leader.svelte';
  import TeamScore from 'src/components/team-score.svelte';
  import GameClock from '../components/game-clock.svelte';
  import { game } from '../lib/game.store';
  let durationString = $game.periodTimeRemaing?.toISOString();
</script>

<h1>Score</h1>
<div class="field">
  <label for="duration">Duration:</label>
  <input
    type="text"
    name="duration"
    bind:value={durationString}
    on:change={() => ($game.periodTimeRemaing = moment.duration(durationString))}
  />
</div>
<GameClock />
{#each $game.teams || [] as team, index}
  <TeamScore
    {team}
    on:change={(e) => {
      console.log(team.name + ' score change', { detail: e.detail, index });
      $game.teams[index] = e.detail;
    }}
  />
{/each}
<Leader />
