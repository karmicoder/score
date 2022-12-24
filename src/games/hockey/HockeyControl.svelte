<script>
  import moment from 'moment';
  import { game } from 'src/lib/game.store';
  import Leader from 'src/components/control/Leader.svelte';
  import TeamScore from 'src/components/control/TeamScore.svelte';
  import GameClock from 'src/components/control/GameClock.svelte';
  import ShotsOnGoal from './ShotsOnGoal.svelte';
  import { isHockeyGame } from '.';
  let durationString = $game.periodTimeRemaing?.toISOString();
  let hockeyGame = isHockeyGame($game) ? game : undefined;
</script>

<h1>Score</h1>
<pre>{JSON.stringify($game, null, 2)}</pre>
{#if hockeyGame}<div class="field">
    <label for="duration">Duration:</label>
    <input
      type="text"
      name="duration"
      bind:value={durationString}
      on:change={() => ($hockeyGame.periodTimeRemaing = moment.duration(durationString))}
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
    <ShotsOnGoal
      teamName={team.name}
      value={team.shotsOnGoal}
      on:change={(e) => {
        console.log('shotsOnGoal change', { e, team });
        $game.teams[index].shotsOnGoal = e.detail;
      }}
    />
  {/each}
  <Leader />
{/if}
