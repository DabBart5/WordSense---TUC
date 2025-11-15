<script lang="ts">
	import Header from "./Header.svelte";
	import "../app.css";


	//setting up light/darkmode switch

	import { onMount } from "svelte";

	onMount(() => {
		// load saved theme or system preference
		const saved = localStorage.getItem("theme");
		const systemDark = window.matchMedia(
			"(prefers-color-scheme: dark)",
		).matches;

		const theme = saved ?? (systemDark ? "dark" : "light");

		document.documentElement.classList.toggle("dark", theme === "dark");
	});

	function toggleTheme() {
		const isDark = document.documentElement.classList.toggle("dark");
		localStorage.setItem("theme", isDark ? "dark" : "light");
	}
	//---

	let { children } = $props();
</script>

	<div class="app">
		<Header onToggleTheme={toggleTheme} />

		<main>
			{@render children()}
		</main>

		<footer>
			<p>
				visit <a href="https://svelte.dev/docs/kit"
					>svelte.dev/docs/kit</a
				> to learn about SvelteKit
			</p>
		</footer>
	</div>

<style>

	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 64rem;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
