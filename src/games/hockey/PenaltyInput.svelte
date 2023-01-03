<script lang="ts">
  import type { Penalty } from './HockeyGame';
  import Autocomplete from '@smui-extra/autocomplete';
  import { infractions, penaltyDurationFor, penaltyTypes } from './Penalty';
  import { game } from 'src/lib/game.store';
  import PeriodTime from 'src/components/PeriodTime.svelte';
  import IconButton from '@smui/icon-button/src/IconButton.svelte';
  import Textfield from '@smui/textfield';
  import Select, { Option } from '@smui/select';
  import { titleCase } from 'src/lib/string';
  import { flip } from 'svelte/animate';
  import moment from 'moment';
  import log from 'loglevel';

  export let value: Penalty[] = [];
  let addPenaltyForm: HTMLFormElement;
  const emptyPenalty: Partial<Penalty> = {
    type: 'minor',
    playerNumber: ''
  };
  let newPenalty: Partial<Penalty> = {
    ...emptyPenalty
  };

  const handleAddPenalty = (e: Event) => {
    e.preventDefault();
    if (!addPenaltyForm?.checkValidity()) {
      log.warn('PenaltyInput invalid, not submitting');
      return;
    }
    value = [
      ...value,
      {
        ...(newPenalty as Penalty),
        timeAt: $game.periodTimeRemaining,
        periodAt: $game.periodNumber,
        timeRemaining: penaltyDurationFor(newPenalty.type || 'minor').asMilliseconds()
      }
    ];
    newPenalty = { ...emptyPenalty };
  };
  const handleDelete = (index: number) => {
    const newValue = value.slice();
    newValue.splice(index, 1);
    value = newValue;
  };
  $: sortedInfractions = infractions.sort();
</script>

<div class="PenaltyInput">
  <h5>Penalties</h5>
  <form class="new-penalty" on:submit={handleAddPenalty} bind:this={addPenaltyForm}>
    <Textfield
      variant="outlined"
      type="text"
      name="playerNumber"
      label="P#"
      bind:value={newPenalty.playerNumber}
      pattern="[0-9]+"
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
      clearOnBlur={false}
      bind:value={newPenalty.infraction}
      textfield$required
    />
    <IconButton type="submit" size="button" class="material-icons my-primary">add</IconButton>
  </form>
  <div class="penalties">
    {#each value as penalty, index (penalty)}
      <div class="penalty" animate:flip>
        <span class="time-remaining">
          <PeriodTime value={moment.duration(penalty.timeRemaining, 'ms')} />
        </span>
        <span class="player">
          {#if penalty.playerNumber !== undefined && penalty.playerNumber !== ''}#{penalty.playerNumber}{:else}[BENCH]{/if}
        </span>
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
  </div>
</div>

<style lang="scss">
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
        @include theme.property(background-color, theme.$primary);
        height: 3.5rem;
      }
    }
  }
</style>
