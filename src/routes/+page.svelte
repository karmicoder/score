<script lang="ts">
	import moment from 'moment';
	import GameClock from '../components/game-clock.svelte';
	let duration = moment.duration(20, 'minutes');
	let durationString = duration.toISOString();
</script>

<h1>Score</h1>
<div class="field">
	<label for="duration">Duration:</label>
	<input
		type="text"
		name="duration"
		bind:value={durationString}
		on:change={(e) => (duration = moment.duration(durationString))}
	/>
</div>
<GameClock {duration} />
