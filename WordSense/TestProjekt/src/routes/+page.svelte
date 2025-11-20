<script lang="ts">
	import { Modal, Content, Trigger } from "sv-popup";
	import Counter from "./Counter.svelte";
	import { t } from "../stores/i18n";
	// <wa-button>
	import "@awesome.me/webawesome/dist/components/button/button.js";
    import MainGameSettings from "./MainGameSettings.svelte";

	//import { Modal, Content, Trigger}  from "sv-popup"
</script>

<svelte:head>
	<title>WordSense</title>
	<meta name="description" content="Train your Vocabulary with WordSense" />
</svelte:head>

<!--<section class = "main-column"> taken out for now-->
<section>
	<h1>{$t.page_title}</h1>

	<p>
		{$t.mainPage_Description}
	</p>
	<div class="buttonDiv">
		<Modal button={false}>
			<Content>
				<MainGameSettings />
			</Content>
			<Trigger>
				<wa-button class="gameButton">
					<span class="button_text">MainGame</span>
				</wa-button>
			</Trigger>
		</Modal>
	</div>
	<div class="buttonDiv">
		<wa-button class="gameButton">
			<span class="button_text">MainGame</span>
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
		font-size: var(--h1);
		color: var(--color-text);
	}

	p {
		width: 100%;
		font-size: var(--text-size-normal);
		text-align: center;
		color: var(--color-text);
	}

	.button_text {
		content: "";
		display: block; /* make text a block-level element */
		width: 100%; /* span fills the button */
		text-align: justify; /* stretches text edge to edge */
		text-justify: inter-word; /* spacing between words */
		font-size: clamp(2rem, 15vw, 5rem);
	}

	.buttonDiv {
		width: 100%;
		display: block;
		justify-content: center;
		align-items: center;
		margin: 0.5rem 0;
	}

	wa-button.gameButton {
		display: flex;
		width: 100%;
		justify-content: center; /* centers content horizontally */
		align-items: center; /* centers vertically */
		min-height: 3rem;
		padding: 12px;
		position: relative;
		font-family: "Montserrat";
		color: var(--color-bg-contrast);
		text-align: center;
	}
	wa-button.gameButton::part(base) {
		border-radius: 2px;
		border: solid 2px;
		display: block;
		min-height: 5rem;
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
