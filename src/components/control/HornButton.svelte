<script lang="ts">
  import IconButton from '@smui/icon-button';
  import { horn } from 'src/lib/game.store';
</script>

<div class="HornButton" class:horn-on={$horn}>
  <IconButton
    class="material-icons"
    on:mousedown={() => ($horn = true)}
    on:mouseup={() => ($horn = false)}
    on:mousleave={() => ($horn = false)}
    >{$horn ? 'notifications_active' : 'notifications'}</IconButton>
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
