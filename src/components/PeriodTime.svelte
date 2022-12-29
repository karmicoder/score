<script lang="ts" context="module">
  import type moment from 'moment';

  function formatTimePart(timePart: number) {
    return timePart.toString().padStart(2, '0');
  }
  function formatDuration(dur: moment.Duration) {
    if (dur.asMilliseconds() <= 0) {
      return '0.0';
    }
    let result = '';
    if (dur.asHours() >= 1) {
      result += formatTimePart(dur.hours()) + ':';
    }
    if (dur.asMinutes() >= 1) {
      result += formatTimePart(dur.minutes()) + ':';
    }
    result += formatTimePart(dur.seconds());
    if (dur.asMinutes() < 1) {
      result += '.' + dur.milliseconds().toFixed(0).slice(0, 2);
    }
    return result;
  }
</script>

<script lang="ts">
  export let value: moment.Duration;

  $: displayString = formatDuration(value);
</script>

<span class="PeriodTime">{displayString}</span>
