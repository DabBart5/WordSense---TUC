<script lang="ts">
	import { Modal, Content, Trigger } from "sv-popup";
	import Counter from "./Counter.svelte";
	import { t } from "../stores/i18n";
	// <wa-button>
	import "@awesome.me/webawesome/dist/components/button/button.js";
    import MainGameSettings from "$lib/components/MainGameSettings.svelte";

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
			<Trigger as="Button">
				<button class="gameButton">
					MainGame
				</button>
			</Trigger>
		</Modal>
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

	.buttonDiv {
		width: 100%;
		display: block;
		justify-content: center;
		align-items: center;
		margin: 0.5rem 0;
	}

	.gameButton {
		flex:1;
		display: flex;
		width: 100%;
		height: fit-content;
		justify-content: center; /* centers content horizontally */
		align-items: center; /* centers vertically */
		padding: clamp(4px, 2vh, 12px);
		font-family: "Montserrat";
		color: var(--color-bg-contrast);
		text-align: center;
		font-size: var(--h2);
	}


	.gameButton:hover{
		transform: scale(1.03);
		background: var(--color-bg-contrast);
		color: var(--color-text-contrast);
	}

	.gameButton:active{
		transform: translateY(1px);
	}
</style>
