<script lang="ts">
    import { enhance } from "$app/forms";
    import { invalidate, goto } from "$app/navigation";
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

    let shaking = $state(false);

    function shakeScreen() {
        if (correct === false) {
            shaking = true;
            setTimeout(() => (shaking = false), 300); // must match animation duration
        }
    }

    function handleNextRound() {
        nextRound({ result: response });
    }

    let response = $state();
    let submitted = $state(false);

    let activeButton = $state(-1);

    let correct = $state(false);

    let timerInterval: any;

    // svelte-ignore state_referenced_locally
    let countdown = $state(timer);

    let formElement = $state<HTMLFormElement | null>(null);

    $effect(() => {
        // Cleanup previous interval
        if (timerInterval) clearInterval(timerInterval);

        // Reset countdown to the latest value from load()
        // showQuestion = true;
        submitted = false;
        correct = false;
        activeButton = -1;
        countdown = data.timer;

        if (data.timer > 0) {
            timerInterval = setInterval(() => {
                countdown -= 0.2;

                if (countdown <= 0 && submitted === false) {
                    clearInterval(timerInterval);
                    formElement?.requestSubmit();
                } else if (submitted) {
                    clearInterval(timerInterval);
                }
            }, 200);
        }

        // Cleanup when effect re-runs or component unmounts
        return () => {
            if (timerInterval) clearInterval(timerInterval);
        };
    });

    async function nextRound({ result }: any) {
        if (!result) return;

        if (result.type === "redirect") {
            goto(result.location);
            return;
        }

        if (result.type === "success") {
            await invalidate("game:state");
        }
    }
</script>

<section class:shake={shaking}>
    <!-- headline: lives, timer, round/rounds -->
    <span class="headline">
        <div class="lives">
            {lives}
            <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="heartTitle2"
            >
                <title id="heartTitle2">Lives Remaining</title>
                <!-- svg for the heart  -->
                <path
                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
             2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
             C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
             c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                />
            </svg>
        </div>
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
            "{wordSet[0].exsentence[0]}"
        {/if}
    </span>

    {#if !submitted}
        <form
            bind:this={formElement}
            method="POST"
            action="?/submitAnswer"
            use:enhance={() => {
                // before submit (optional)

                return ({ result }) => {
                    submitted = true;

                    shakeScreen();

                    response = result;
                };
            }}
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
                                {wordSet[position.value].definition}
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
                                            correct =
                                                position.originalIndex === 0;
                                            activeButton = i;
                                        }}
                                    >
                                        {#if wordSet[position.value].wordtype === "verb"}
                                            {getFromLangDict(
                                                wordSet[position.value]
                                                    .language,
                                                beforeTransVerbs,
                                            )}
                                        {/if}
                                        {wordSet[position.value].word}
                                        {#if wordSet[position.value].transitivity && wordSet[position.value].wordtype === "verb"}
                                            {getFromLangDict(
                                                wordSet[position.value]
                                                    .language,
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
            <button
                type="submit"
                style="font-weight:600; justify-content:center;"
                disabled={submitted}
            >
                Answer
            </button>
        </form>
    {:else}
        <ul class="resultsUL">
            {#each randomizedAnswerOrder as position, i}

                <div class="Answer"
                    class:chosenAnswer={activeButton === i}
                    class:correctAnswer={position.originalIndex === 0}>
                    <span class="wordInAnswer">
                        {wordSet[position.value].word}
                    ({wordSet[position.value].pronunciation})
                    </span>
                    <span class="defInAnswer">
                        {wordSet[position.value].definition}
                    </span>
                </div>
            {/each}
        </ul>
        <span class="proceedLine">
            <div>
                <ReportWord {wordSet} {mode} />
                <!-- took out form from the parameters, if it doesnt work maybe its because of this-->
            </div>
            <button onclick={handleNextRound} class="nextQuestionBtn">
                Next Question
            </button>
        </span>
    {/if}
</section>

<style>
    .headline {
        display: flex;
        justify-content: space-between;
        color: var(--color-bg-contrast);
    }

    button {
        padding: 8px;
        padding-top: clamp(4px, 1.3vw, 12px);
        padding-bottom: clamp(4px, 1.3vw, 12px);
        text-align: center;
        white-space: normal; /* allow wrapping */
        overflow-wrap: break-word;

        display: flex; /* centers text nicely */
        align-items: left;
        justify-content: left;

        /* This makes each cell auto-fit to the largest button */
        width: 100%;
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
        margin-top: clamp(1rem, 2vh, 2rem);
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
        font-size: var(--text-size-normal);
    }

    .rounds {
        flex: 2;
        text-align: right;
        margin-right: 10px;
        font-size: var(--text-size-normal);
    }

    .exampleSentence {
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

    svg {
        height: 1.2em;
        width: auto;
        vertical-align: -0.125em;
        fill: var(--color-bg-contrast);
    }

    .shake {
        animation: shake 0.3s ease-in-out;
    }

    @keyframes shake {
        0%,
        100% {
            transform: translateX(0);
        }
        20% {
            transform: translateX(-5px);
        }
        40% {
            transform: translateX(5px);
        }
        60% {
            transform: translateX(-5px);
        }
        80% {
            transform: translateX(5px);
        }
    }

    .resultsUL {
        display: block;
        gap: var(--vertical-gap) 2px; /* row gap | column gap */
        width: 100%;
        padding-left: 0;
        list-style: none;
    }

    .Answer {
        flex: 1; /* same width each (share row space) */
        display: block;
        text-align: left;
        white-space: normal;
        overflow-wrap: break-word;
        margin-bottom: 0.2rem;
        width: 100%;
        height: 100%;
        border: solid 1px var(--color-bg-contrast);
        color: var(--color-text);
        padding: 8px;
        padding-top: clamp(4px, 1.3vw, 8px);
        padding-bottom: clamp(4px, 1.3vw, 8px);
    }

    .chosenAnswer {
        border: 2px solid var(--color-incorrect);
    }

    .correctAnswer {
        border: 2px solid var(--color-correct);
    }

    .proceedLine {
        display: grid;
        grid-template-columns: 1fr auto;
    }

    .nextQuestionBtn {
        justify-content: center;
        min-width: 40px;
        padding: clamp(0px, 1vw, 8px);
        padding-top: clamp(4px, 1.3vw, 12px);
        padding-bottom: clamp(4px, 1.3vw, 12px);
    }

    .wordInAnswer{
        display: block;
        border-bottom: 1px solid var(--color-bg-contrast);
    }

    .defInAnswer{
        display: block;
        padding-left: 4px;
    }
</style>
