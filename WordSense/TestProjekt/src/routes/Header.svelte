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
	</div>

	<nav>
		<ul>
			<li aria-current={page.url.pathname === "/" ? "page" : undefined}>
				<a href="/">WordSense</a>
			</li>
			<li
				aria-current={page.url.pathname === "/about"
					? "page"
					: undefined}
			>
				<a href="/about">About</a>
			</li>
		</ul>
	</nav>

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
					<wa-button
						variant="neutral"
						appearance="outlined"
						class = "header-Button"
						on:click={onToggleTheme}
					>
						<wa-icon name="sun" label="Light/Darkmode"></wa-icon>
					</wa-button>
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
		margin-right: 1em;
		width: 0 em;
		height: 3em;
	}

	.corner a {
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
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
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
		background: var(--color-bg-1);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current="page"]::before {
		--size: 6px;
		content: "";
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--color-theme-1);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--color-theme-1);
	}
</style>
