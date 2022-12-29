<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import type { Penalty } from './HockeyGame';
  import Autocomplete from '@smui-extra/autocomplete';
  import { infractions, penaltyTimeRemaining, penaltyTypes } from './Penalty';
  import { game } from 'src/lib/game.store';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  import IconButton from '@smui/icon-button/src/IconButton.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import { titleCase } from 'src/lib/string';
  // import { penaltyDurationFor } from './Penalty';
  // import PeriodTime from 'src/components/PeriodTime.svelte';
  export let value: Penalty[] = [];
  const emptyPenalty: Partial<Penalty> = {
    type: 'minor',
    playerNumber: ''
  };
  let newPenalty: Partial<Penalty> = {
    ...emptyPenalty
  };

  const dispatcher = createEventDispatcher<{ change: Penalty[] }>();
  const handleAddPenalty = () => {
    const newValue: Penalty[] = [
      ...value,
      {
        ...(newPenalty as Penalty),
        timeAt: $game.periodTimeRemaing,
        periodAt: $game.periodNumber
      }
    ];
    dispatcher('change', newValue);
    newPenalty = { ...emptyPenalty };
  };
  const handleDelete = (index: number) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    dispatcher('change', newValue);
  };
  $: sortedInfractions = infractions.sort();
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
    <form class="new-penalty" on:submit={handleAddPenalty}>
      <Textfield
        required
        variant="outlined"
        type="text"
        name="playerNumber"
        label="P#"
        bind:value={newPenalty.playerNumber}
        pattern="[0-9]+"
        min="0"
        max="99"
        input$maxLength="2"
      />
      <Select required variant="outlined" name="type" bind:value={newPenalty.type}>
        {#each penaltyTypes as penaltyType}
          <Option value={penaltyType}>{titleCase(penaltyType)}</Option>
        {/each}
      </Select>
      <Autocomplete
        name="infraction"
        required
        label="Infraction"
        textfield$variant="outlined"
        options={sortedInfractions}
        bind:value={newPenalty.infraction}
      />
      <IconButton type="submit" size="button" color="primary" class="material-icons my-primary">
        add
      </IconButton>
    </form>
  </div>
</div>

<style lang="scss">
  @use '../../theme/smui-theme';

  @use '@material/theme/index' as theme;

  .PenaltyInput {
    .penalties {
      .penalty {
        display: flex;
        flex-flow: row nowrap;
        align-items: center;
        column-gap: 0.5rem;
        .time-remaining {
          flex-basis: 3rem;
        }
        .player {
          flex-basis: 1.5rem;
        }

        .infraction {
          flex-grow: 1;
          text-transform: capitalize;
        }
      }
    }

    form.new-penalty {
      display: flex;
      flex-flow: row wrap;
      :global(select[name='type']),
      :global(.mdc-text-field__input),
      :global(.mdc-deprecated-list-item) {
        text-transform: capitalize;
      }

      :global(label[name='playerNumber']) {
        width: 3.5rem;
      }
      :global([name='type']) {
        width: 10.5rem;
      }
      :global([name='infraction']) {
        width: 11rem;
      }

      :global(.mdc-icon-button) {
        @include theme.property(color, theme.$primary);
      }
    }
  }
</style>
