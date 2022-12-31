<script lang="ts">
  import { createTimerContext } from 'src/lib/timer.context';
  import log from 'loglevel';
  import { gameController } from 'src/lib/game.controller';
  log.setDefaultLevel('debug');
  createTimerContext();
  gameController();
</script>

<div class="baseLayout">
  <slot />
</div>
