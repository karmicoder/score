<script lang="ts">
  import moment from 'moment';
  import Card from '@smui/card';
  import Textfield from '@smui/textfield';
  import { game, pendingPeriodTime } from 'src/lib/game.store';
  import Leader from 'src/components/control/Leader.svelte';
  import TeamScore from 'src/components/control/TeamScore.svelte';
  import GameClock from 'src/components/control/GameClock.svelte';
  import ShotsOnGoal from './ShotsOnGoal.svelte';
  import HornButton from 'src/components/control/HornButton.svelte';
  import PeriodToggle from 'src/components/control/PeriodToggle.svelte';
  import PenaltyInput from './PenaltyInput.svelte';
  import { penaltyController } from './Penalty';
  import { onMount } from 'svelte';
  import { isHockeyGame } from '.';
  let durationString = $pendingPeriodTime
    ? moment.duration($pendingPeriodTime).toISOString()
    : 'PT20M';

  $: $pendingPeriodTime = moment.duration(durationString).asMilliseconds();
  penaltyController();
  onMount(() => {
    $pendingPeriodTime = moment.duration(20, 'minutes').asMilliseconds();
  });
</script>

<div class="HockeyControl">
  {#if isHockeyGame($game)}
    <Card padded>
      <Textfield type="text" name="duration" label="Duration" bind:value={durationString} />
    </Card>
    <GameClock />
    <HornButton />
    <Card padded>
      <PeriodToggle periodCount={3} bind:value={$game.periodNumber} />
    </Card>
    {#each $game.teams || [] as team, index}
      <Card padded class="Team">
        <Textfield
          label="Team Name"
          type="text"
          bind:value={team.name}
          class="team-name"
          required
          pattern="[A-Za-z0-9]+"
        />
        <TeamScore bind:score={team.score} />
        <ShotsOnGoal bind:value={team.shotsOnGoal} />
        <PenaltyInput bind:value={team.activePenalties} />
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
    align-items: flex-start;
    :global(> .mdc-card) {
      flex: 11 1 15rem;
    }
  }
</style>
