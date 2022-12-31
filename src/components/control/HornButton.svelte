<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { game, horn, triggerHornFor } from 'src/lib/game.store';
  import { getTimerContext } from 'src/lib/timer.context';

  const timer = getTimerContext();
  $: {
    if ($game.periodTimeRemaining <= 0) {
      timer.stop();
      triggerHornFor();
      $game.periodTimeRemaining = 0;
    }
  }
</script>

<div class="HornButton" class:horn-on={$horn}>
  <IconButton
    class="material-icons"
    on:mousedown={() => ($horn = true)}
    on:mouseup={() => ($horn = false)}
    on:mouseout={() => ($horn = false)}
  >
    {$horn ? 'notifications_active' : 'notifications'}
  </IconButton>
</div>

<style lang="scss">
  @use '@material/theme/color-palette';
  .HornButton {
    :global(.mdc-icon-button) {
      transition: color 0.2s ease, background-color 0.2s ease;
      border-radius: 50%;
    }

    &.horn-on :global(.mdc-icon-button) {
      color: color-palette.$orange-700;
      background-color: color-palette.$orange-100;
    }
  }
</style>
