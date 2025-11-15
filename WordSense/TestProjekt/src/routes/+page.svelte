<script lang="ts">
	
	import Counter from "./Counter.svelte";
	import { t } from '../stores/i18n';
	// <wa-button>
	import "@awesome.me/webawesome/dist/components/button/button.js";

	//import { Modal, Content, Trigger}  from "sv-popup"


</script>

<svelte:head>
	<title>WordSense</title>
	<meta name="description" content="Train your Vocabulary with WordSense" />
</svelte:head>

<section>
	<h1>{$t.page_title}</h1>

	<p>
		{$t.mainPage_Description}
	</p>

	<div class="buttonDiv">
		<wa-button class="gameButton">
			<div class="button_text">MainGame</div>
		</wa-button>
	</div>
	<div class="buttonDiv">
		<wa-button class="gameButton">
			<div class="button_text">MainGame</div>
		</wa-button>
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

	.buttonDiv {
		width: 100%;
		display: flex;
		justify-content: center; 
		align-items: center; 
		margin: 1rem 0; 
	}

	.button_text {
		position: relative;
		font-size: 5em;
		font-family: "Montserrat";
		width: 100%;
		height: 100%;
		top: 0;
		color: var(--color-bg-contrast);
		text-align: center;
	}

	wa-button.gameButton{
		display: block;
		width: 50%;
	}
	wa-button.gameButton::part(base) {
		border-radius: 2px;
		border: solid 2px;
		display: block;
		min-width:100% ;
		min-height: 6em;
		display: flex;
  		justify-content: center; 
  		align-items: center;
		border-radius: 4px;
		background: var(--background-color);
		border-top-color: var(--color-bg-contrast);
		border-left-color: var(--color-bg-contrast);
		border-bottom-color: var(--color-bg-contrast);
		border-right-color: var(--color-bg-contrast);
		color: var(--color-bg-contrast);
		font-size: 1.125em;
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
