<script lang="ts">
    import { enhance } from "$app/forms";
    import { fly, slide } from "svelte/transition";
    import { invalidate, goto } from "$app/navigation";
    import type { sveltekit } from "@sveltejs/kit/vite";
    import {
        afterTransVerbs,
        beforeTransVerbs,
        getFromLangDict,
    } from "$lib/constData.js";
    import ReportWord from "$lib/components/ReportWord.svelte";

    let { data } = $props();

    // Declare stateful runes
    let wordSet = $state(data.wordSet);
    let lives = $state(data.lives);
    let showExSentence = $state(data.showExSentence);
    let maxRounds = $state(data.maxRounds);
    let mode = $state(data.mode);
    let timer = $state(data.timer);
    let currentRound = $state(data.currentRound);
    let gameId = $state(data.gameId);
    let randomizedAnswerOrder = $state(data.randomizedAnswerOrder);

    // When `data` changes (after invalidate), update state
    $effect(() => {
        wordSet = data.wordSet;
        lives = data.lives;
        showExSentence = data.showExSentence;
        maxRounds = data.maxRounds;
        mode = data.mode;
        timer = data.timer;
        currentRound = data.currentRound;
        gameId = data.gameId;
        randomizedAnswerOrder = data.randomizedAnswerOrder;
    });

    let activeButton = $state(-1);

    let correct = $state(false);

    let timerInterval: any;

    // svelte-ignore state_referenced_locally
    let countdown = $state(timer);

    let form: HTMLFormElement;

    $effect(() => {
        // Cleanup previous interval
        if (timerInterval) clearInterval(timerInterval);

        // Reset countdown to the latest value from load()
        correct = false;
        activeButton = -1;
        countdown = data.timer;


        if (data.timer > 0) {
            timerInterval = setInterval(() => {
                countdown -= 0.2;

                if (countdown <= 0) {
                    clearInterval(timerInterval);
                    form?.requestSubmit();
                }
            }, 200);
        }

        // Cleanup when effect re-runs or component unmounts
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    });

    async function afterSubmit({ result }: any) {
        if (!result) return; // Safety check

        if (result.type === "redirect") {
            goto(result.location);
            return;
        }

        if (result.type === "success") {
            await invalidate("game:state");
        }
    }
</script>

<section>
    <!-- headline: lives, timer, round/rounds -->
    <span class="headline">
        <div class="lives">{lives} ❤️</div>
        <div class="barContainer">
            {#if countdown > 0}
                <span
                    class="countdownBar"
                    style="width: {(countdown / timer) * 100}%"
                >
                </span>
            {/if}
        </div>
        <div class="rounds">
            {#if maxRounds > 0}
                {currentRound}/{maxRounds}
            {/if}
        </div>
    </span>
    <h1>
        {#if mode === "word"}
            {#if wordSet[0].wordtype === "verb"}
                {getFromLangDict(wordSet[0].language, beforeTransVerbs)}
            {/if}
            {wordSet[0].word}
            {#if wordSet[0].transitivity && wordSet[0].wordtype === "verb"}
                {getFromLangDict(wordSet[0].language, afterTransVerbs)}
            {/if}
        {:else}
            {wordSet[0].definition}
        {/if}
    </h1>
    <span class="exampleSentence">
        {#if showExSentence && mode === "word"}
                {wordSet[0].exsentence[0]}
        {/if}
    </span>
    <form
        bind:this={form}
        method="POST"
        action="?/submitAnswer"
        use:enhance={afterSubmit}
    >
        <div class="btnContainer">
            <input type="hidden" name="correct" value={correct} />
            {#if mode === "word"}
                <ul>
                    {#each randomizedAnswerOrder as position, i}
                        <!-- item.value = word, item.originalIndex = original position -->

                        <button
                            type="button"
                            class:active={activeButton === i}
                            onclick={() => {
                                correct = position.originalIndex === 0;
                                activeButton = i;
                            }}
                        >
                            {wordSet[position.value].definition} --- {position.originalIndex}
                        </button>
                    {/each}
                </ul>
            {:else}
                <ul>
                    <ul>
                        {#each randomizedAnswerOrder as position, i}
                            <!-- item.value = word, item.originalIndex = original position -->
                            <li>
                                <button
                                    type="button"
                                    class:active={activeButton === i}
                                    onclick={() => {
                                correct = position.originalIndex === 0;
                                activeButton = i;
                            }}
                                >
                                    {#if wordSet[position.value].wordtype === "verb"}
                                        {getFromLangDict(
                                            wordSet[position.value].language,
                                            beforeTransVerbs,
                                        )}
                                    {/if}
                                    {wordSet[position.value].word}
                                    {#if wordSet[position.value].transitivity && wordSet[position.value].wordtype === "verb"}
                                        {getFromLangDict(
                                            wordSet[position.value].language,
                                            afterTransVerbs,
                                        )}
                                    {/if}
                                </button>
                            </li>
                        {/each}
                    </ul>
                </ul>
            {/if}
        </div>
        <input type="hidden" name="gameId" value={gameId} />
        <button type="submit" style="font-weight:600; justify-content:center;"> Answer </button>
    </form>
    <div>
        <ReportWord wordSet={wordSet} mode={mode}/>
    </div>
</section>

<style>
    .headline {
        display: flex;
        justify-content: space-between;
        color: var(--color-bg-contrast);
    }

    button {
        padding: 12px;
        text-align: center;
        white-space: normal; /* allow wrapping */
        overflow-wrap: break-word;

        display: flex; /* centers text nicely */
        align-items: left;
        justify-content: left;

        /* This makes each cell auto-fit to the largest button */
        width:100%;
        height: 100%;
        column-width: 1;
    }
    .active {
        background-color: var(--color-bg-contrast);
        color: var(--background-color);
        top: 2px;
        left: 1px;
        box-shadow: none;
        border-color: var(--background-color);
        box-shadow:
            inset 0 2px 4px rgba(0, 0, 0, 0.4),
            0 0 0 rgba(0, 0, 0, 0); /* removes outer shadow */

        transform: translateY(1px); /* subtle depression */
        box-sizing: border-box;
    }

    li {
        flex: 1; /* same width each (share row space) */
        display: flex;
        align-items: flex-start; /* vertically center */
        justify-content: center;
        text-align: center;
        white-space: normal;
        overflow-wrap: break-word;
        margin-bottom: 0.2rem;
        width: 100%;
        height: 100%;
        margin-left: 0px;
    }

    ul {
        flex: 1;
        display: grid;
        grid-auto-flow: row; /* or "row" depending on layout */
        grid-auto-rows: 1fr; /* equal width columns */
        gap: 10px;
        width: 100%;
        padding-left: 0px;
        list-style-type: none;
    }
    .btnContainer {
        display: flex;
        margin-bottom: 3rem;
    }

    .barContainer {
        flex: 8;
    }

    .countdownBar {
        height: 1rem;
        border-radius: 10px 10px 10px 10px;
        background: var(--color-bg-contrast);
        display: flex;
        justify-content: center;
        align-items: center;
        color: var(--color-bg-contrast);
        font-weight: bold;
        transition: width 0.4s linear;
        color: var(--background-color);
    }

    .lives {
        flex: 2;
        text-align: left;
        margin-left: 10px;
    }

    .rounds {
        flex: 2;
        text-align: right;
        margin-right: 10px;
    }

    .exampleSentence{
        color: var(--color-bg-contrast);
        font-size: var(--text-size-normal);
        font-weight: 500;
        text-align: center;
        justify-content: center;
        width: 100%;
        flex: 1;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: var(--h2);
    }

    section {
        display: flex;
        flex-direction: column;
    }
</style>
