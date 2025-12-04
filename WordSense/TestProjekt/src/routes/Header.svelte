<script lang="ts">
	import { page } from "$app/state";

	// Option 1: import all Web Awesome styles
	import "@awesome.me/webawesome/dist/styles/webawesome.css";

	// Option 2: import only the default theme
	import "@awesome.me/webawesome/dist/styles/themes/default.css";

	// <wa-button>
	import "@awesome.me/webawesome/dist/components/button/button.js";
	//<wa-input>
	import "@awesome.me/webawesome/dist/components/input/input.js";

	export let onToggleTheme; // incoming function from layout

    import LanguageDropdown from "./LanguageDropdown.svelte";

</script>

<header>
	<div class="corner">
		<!--Logo on the left side-->
		<a href="/" style="display: contents;">		
			<img src="favicon.svg" alt="WordSense Logo"/>
		</a>

	</div>

	<span class="corner">
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<ul>
			<li>
				<LanguageDropdown />
			</li>
			<li>
				<!-- svelte-ignore element_implicitly_closed -->
				<div>
					<!-- svelte-ignore a11y_consider_explicit_label -->
					<button on:click={onToggleTheme}>
						<wa-icon name="sun" label="Light/Darkmode"></wa-icon>
					</button>
				</div>
			</li>
		</ul>
	</span>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
		border-bottom: var(--size) solid var(--color-bg-contrast);
		border-bottom: 2px solid var(--color-bg-contrast);
	}

	.corner {
		display: flex;
		margin-right: 1em;
		width: 0 em;
		height: 3em;
	}

	/* .corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	} */


	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--color-bg-1);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}


	a:hover {
		color: var(--color-theme-1);
	}
</style>
