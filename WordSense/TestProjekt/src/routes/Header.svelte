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
		<a href="/" tabindex="0" class="logo-link">
			<img src="favicon.svg" alt="WordSense Logo" />
		</a>
	</div>

	
	<span class="corner">
		<ul>
			<li>
				<LanguageDropdown />
			</li>
			<li>
				<button
					class="theme-toggle-button"
					on:click={onToggleTheme}
					aria-label="Toggle light/dark mode"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 24 24"
						role="img"
						aria-hidden="false"
					>
						<title>Light/Dark Mode</title>
						<circle cx="12" cy="12" r="5" fill="currentColor" />
						<g stroke="currentColor" stroke-width="2">
							<line x1="12" y1="1" x2="12" y2="3" />
							<line x1="12" y1="21" x2="12" y2="23" />
							<line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
							<line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
							<line x1="1" y1="12" x2="3" y2="12" />
							<line x1="21" y1="12" x2="23" y2="12" />
							<line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
							<line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
						</g>
					</svg>
				</button>
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

	.logo-link {
		display: inline-block; /* keeps the <a> focusable */
	}

	.logo-link img {
		display: block; /* removes inline spacing */
		width: auto; /* natural width */
		height: auto; /* preserve aspect ratio */
		max-height: 50px; /* optional: max height */
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background-color);
		background-size: contain;
		vertical-align: center;
	}

	li {
		position: relative;
		height: 100%;
	}

	button {
		border: 1px solid var(--color-bg-contrast);
		color: var(--color-bg-contrast);
	}

	button:hover{
		background-color: var(--color-bg-contrast);
		color: var(--background-color);
	}

	.theme-toggle-button {
		display: inline-flex; /* like a regular button */
		align-items: center;
		justify-content: center;
		width: auto; /* match dropdown width if needed */
		height: 2.5em; /* same as language button height */
		padding: 0 0.5em; /* similar horizontal padding */
		border: 1px solid var(--color-bg-contrast);
		background: var(--background-color);
		cursor: pointer;
	}
	.theme-toggle-button svg {
		width: inherit;
		height: inherit;
	}
</style>
