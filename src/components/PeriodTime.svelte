<script lang="ts" context="module">
  function formatTimePart(timePart: number) {
    return timePart.toString().padStart(2, '0');
  }
</script>

<script lang="ts">
  import type moment from 'moment';

  export let value: moment.Duration;
</script>

{#if value.asHours() >= 1}{formatTimePart(
    value.hours()
  )}:{/if}{#if value.asMinutes() >= 1}{formatTimePart(value.minutes())}:{/if}{formatTimePart(
  value.seconds()
)}{#if value.asMinutes() < 1}.{value.milliseconds().toString().slice(0, 2).padStart(2, '0')}{/if}
