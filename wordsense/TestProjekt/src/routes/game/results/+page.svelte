<script lang="ts">
    import { t } from "$lib/../stores/i18n";
    import {
        afterTransVerbs,
        beforeTransVerbs,
        getFromLangDict,
    } from "$lib/constData.js";
    import { availableLanguages } from "$lib/constData";
    import LanguageDropdown from "../../LanguageDropdown.svelte";
    import { goto } from "$app/navigation";
    import { enhance } from "$app/forms";
    let { data } = $props();

    const {
        showExSentence,
        timer,
        language,
        difficulty,
        lives,
        maxRounds,
        mode,
        roundsWon,
        won,
        wordHistory,
    } = data;

    const timerMode = inferTimerMode(timer);
    const timerVal = Number(timer);

    function inferTimerMode(timer: number){
        if (timer === -2) return 'auto';
        if (timer > 0) return 'timer';
        if (timer === -1) return "none";
        return "none";
    }

    let isTimer = $state(true);
    let isFree = $state(true);
    let correctAnswers = $state<number[]>([]);

    $effect(() => {
        isTimer = timer != -1;
        isFree = maxRounds === -1;
        correctAnswers = roundsWon;
    });

    function wordWasAnsweredCorrectly(i: number) {
        return correctAnswers.includes(i + 1); //AnswerArray starts at 1
    }
</script>

<section>
    {#if won}
        <h1>Congrats, you won</h1>
    {:else}
        <h1>Too bad, you lost</h1>
    {/if}

    <h2 class="showRemainingLives">
        {lives}/5
        <svg
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-labelledby="heartTitle1"
        >
            <title id="heartTitle1">Lives Remaining</title>
            <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
                2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
                C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5
                c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
        </svg>
    </h2>

    <span class="buttonLine">
        <button onclick={() => goto("/")}> Return To Main-Menu </button>
        <form method="POST" action="?/startGame" use:enhance>
            <!-- recreating the structure of the form in MainGameSettings -->
            <input type="hidden" name="language" value={language} />
            <input type="hidden" name="mode" value={mode} />
            <input type="hidden" name="timer" value={timerMode} />
            <input type="hidden" name="timerval" value={timerVal} />
            <input type="hidden" name="isFree" value={isFree} />
            <input type="hidden" name="showExSentence" value={showExSentence} />
            <input type="hidden" name="difficulty" value={difficulty} />

            <button type="submit"> Play Again </button>
        </form>
    </span>
    <p>Here's your history:</p>
    <div>
        <ul>
            {#each wordHistory as word, i}
                {#if i % 4 === 0}
                    <!-- words were featured in a game round (always the first one of a set of four)-->
                    {#if wordWasAnsweredCorrectly(i / 4)}
                        <li class="correctAnswer">
                            <span class="wordHeader">
                                {#if word.wordtype === "verb"}
                                    {getFromLangDict(
                                        word.language,
                                        beforeTransVerbs,
                                    )}
                                {/if}
                                {word.word}
                                {#if word.transitivity && word.wordtype === "verb"}
                                    {getFromLangDict(
                                        word.language,
                                        afterTransVerbs,
                                    )}
                                {/if}

                                ---

                                {word.pronunciation}
                            </span>
                            <span class="wordBody">
                                {word.definition}
                            </span>
                        </li>
                    {:else}
                        <li class="wrongAnswer">
                            <span class="wordHeader">
                                {#if word.wordtype === "verb"}
                                    {getFromLangDict(
                                        word.language,
                                        beforeTransVerbs,
                                    )}
                                {/if}
                                {word.word}
                                {#if word.transitivity && word.wordtype === "verb"}
                                    {getFromLangDict(
                                        word.language,
                                        afterTransVerbs,
                                    )}
                                {/if}

                                ---

                                {word.pronunciation}
                            </span>
                            <span class="wordBody">
                                {word.definition}
                            </span>
                        </li>
                    {/if}
                {/if}
            {/each}
        </ul>
    </div>
</section>

<style>
    .wordHeader {
        color: var(--color-text);
        text-align: left;
        border-bottom: 1px solid var(--color-bg-contrast);
        display: block;
        font-weight: bold;
        font-size: (var(--text-size-normal) + 2px);
    }

    .wordBody {
        color: var(--color-text);
        text-align: left;
        border: 1px 1px 1px 1px solid var(--color-bg-contrast);
        display: block;
        padding-left: 0.5rem;
        font-size: (var(--text-size-normal));
    }

    .correctAnswer {
        display: block;
        border: 1px solid var(--color-correct);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .buttonLine {
        display: flex;
        justify-content: center;
    }

    .wrongAnswer {
        display: block;
        border: 1px solid var(--color-incorrect);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    p {
        margin: 1rem;
        font-size: var(--text-size-bigger);
        font-weight: 600;
    }

    .buttonLine button {
        margin: clamp(4px, 3vw, 8px);
    }

    svg {
        height: 1.2em;
        width: auto;
        vertical-align: -0.125em;
        fill: var(--color-bg-contrast);
    }

    .showRemainingLives {
        display: flex;
        justify-content: center;
        font-size: var(--h2);
    }
</style>
