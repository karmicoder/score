<script>
  import moment from 'moment';
  import Card from '@smui/card';
  import Textfield from '@smui/textfield';
  import { game } from 'src/lib/game.store';
  import Leader from 'src/components/control/Leader.svelte';
  import TeamScore from 'src/components/control/TeamScore.svelte';
  import GameClock from 'src/components/control/GameClock.svelte';
  import ShotsOnGoal from './ShotsOnGoal.svelte';
  import { isHockeyGame } from '.';
  import HornButton from 'src/components/control/HornButton.svelte';
  let durationString = $game.periodTimeRemaing?.toISOString();
  let hockeyGame = isHockeyGame($game) ? game : undefined;
</script>

<div class="HockeyControl">
  <pre>{JSON.stringify($game, null, 2)}</pre>
  {#if hockeyGame}
    <Card padded>
      <Textfield
        type="text"
        name="duration"
        label="Duration"
        bind:value={durationString}
        on:change={() => ($hockeyGame.periodTimeRemaing = moment.duration(durationString))} />
    </Card>
    <GameClock />
    <HornButton />
    {#each $game.teams || [] as team, index}
      <Card padded class="Team">
        <Textfield
          label="Team Name"
          type="text"
          bind:value={team.name}
          on:change={(e) => ($game.teams[index].name = e.detail)}
          class="team-name" />
        <TeamScore
          score={team.score}
          on:change={(e) => {
            $game.teams[index].score = e.detail;
          }} />
        <ShotsOnGoal
          teamName={team.name}
          value={team.shotsOnGoal}
          on:change={(e) => {
            console.log('shotsOnGoal change', { e, team });
            $game.teams[index].shotsOnGoal = e.detail;
          }} />
      </Card>
    {/each}
    <Leader />
  {:else}
    Not a hockey game
  {/if}
</div>

<style lang="scss">
  .HockeyControl {
    display: flex;
    flex-flow: row wrap;
    gap: 1rem;
    padding: 1rem;
    :global(> *) {
      flex: 11 1 15rem;
    }
    > pre {
      flex-basis: 100%;
    }
  }
</style>
