<script lang="ts">
	import Counter from "./Counter.svelte";
	import { t } from 'svelte-i18n';
	// <wa-button>
	import "@awesome.me/webawesome/dist/components/button/button.js";
</script>

<svelte:head>
	<title>{$t('page_title')}</title>
	<meta name="description" content="Train your Vocabulary with WordSense" />
</svelte:head>

<section>
	<h1>{$t('page_title')}</h1>

	<p>
		Play WordSense to train your Vocabulary. To start click the Button
		below!
	</p>
	<div class="buttonDiv">
		<span class ="buttonSpan">
			<wa-button class="gameButton">
				<div class="button_text">MainGame</div>
			</wa-button>
			<wa-button class="gameButton">
				<div class="button_text">MainGame</div>
			</wa-button>
		</span>
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: top;
		align-items: center;
		flex: 0.6;
	}

	h1 {
		width: 100%;
		text-align: center;
		font-family: "Montserrat";
		font-size: 8vw;
		color: var(--color-text);
	}

	p {
		width: 100%;
		font-size: 2vw;
		text-align: center;
		color: var(--color-text);
	}

	.buttonDiv{
		width: 100%;
		height: auto;
		min-width: 2em;
		min-height: 2em;

	}
	.buttonSpan{
		width: 100%;
		align-items: center;
		padding-left: 10vw;
		padding-right: 10vw;
	}

	.button_text {
		position: relative;
		font-size: 1.2 rem;
		width: 100%;
		height: 100%;
		top: 0;
		color: var(--color-bg-contrast);
		display: block;
	}

	wa-button.gameButton::part(base) {
		border-radius: 2px;
		border: solid 2px;
		min-width: 2em;
		min-height: 2em;
		background: var(--background-color);
		border-top-color: var(--color-bg-contrast);
		border-left-color: var(--color-bg-contrast);
		border-bottom-color: var(--color-bg-contrast);
		border-right-color: var(--color-bg-contrast);
		color: var(--color-bg-contrast);
		font-size: 1.125rem;
		box-shadow: 0 2px 10px #0002;
		transition: all var(--wa-transition-slow) var(--wa-transition-easing);
	}

	wa-button.gameButton::part(base):hover {
		transform: scale(1.05);
		background: var(--color-bg-contrast);
		color: var(--background-color);
	}

	wa-button.gameButton::part(base):active {
		border-top-color: var(--color-bg-contrast);
		border-right-color: var(--color-bg-contrast);
		border-bottom-color: var(--color-bg-contrast);
		border-left-color: var(--color-bg-contrast);
		transform: translateY(1px);
	}

	wa-button.gameButton::part(base):focus-visible {
		outline: dashed 2px var(--color-bg-contrast);
		outline-offset: 4px;
	}
</style>
