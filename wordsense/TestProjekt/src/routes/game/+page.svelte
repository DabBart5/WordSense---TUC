<script lang="ts">
    import type { sveltekit } from "@sveltejs/kit/vite";

    let { data } = $props();

    import { onMount } from "svelte";
    const {
        wordSet,
        lives,
        showExSentence,
        maxRounds,
        mode,
        timer,
        currentRound,
        gameId,
        randomizedAnswerOrder
    } = data;

    
    let activeButton = $state(-1);

    let correct = $state(false);

    let countdown = $state(timer);

    let form: HTMLFormElement;

    onMount(() => {
        const interval = setInterval(() => {
            countdown -= 1;
            if (countdown <= 0) {
                clearInterval(interval);
                form?.requestSubmit();   // submit when countdown hits 0
            }
        }, 1000);

        

        return () => {
            clearInterval(interval);
        };
    });
</script>

<section>
    <!-- headline: lives, timer, round/rounds -->
    <span class="headline">
        <div style="text-align: left;">{lives} ❤️</div>
        <div>
            {#if countdown > 0}
                {countdown}
            {/if}
        </div>
        <div style="text-align: right;">
            {#if maxRounds > 0}
                {currentRound}/{maxRounds}
            {/if}
        </div>
    </span>
    <h1>
        {#if mode === "word"}
            {wordSet[0].word}
        {:else}
            {wordSet[0].definition}
        {/if}
    </h1>
    <span class="exampleSentence">
        {#if showExSentence && mode === "word"}
            {wordSet[0].exsentence[0]}
        {/if}
    </span>
    <form bind:this={form} method="POST" action="?/submitAnswer">
        <input type="hidden" name="correct" value={correct} />
        {#if mode === "word"}
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
                            {wordSet[position.value].definition} --- {position.originalIndex}
                        </button>
                    </li>
                {/each}
            </ul>
        {:else}
            <ul>
                <ul>
                    {#each randomizedAnswerOrder as position}
                        <!-- item.value = word, item.originalIndex = original position -->
                        <li>
                            <button
                                type="button"
                                onclick={() =>
                                    (correct = position.originalIndex === 0)}
                            >
                                {wordSet[position.value].word}
                            </button>
                        </li>
                    {/each}
                </ul>
            </ul>
        {/if}
        <input type="hidden" name="gameId" value={gameId} />
        <button type="submit"> Answer </button>
    </form>
</section>

<style>
    .headline {
        display: flex;
        justify-content: space-between;
    }

        .active {
        background-color: var(--color-bg-contrast);
        color: var(--background-color);
        top: 2px;
        left: 1px;
        box-shadow: none;
        border-color: white;
        box-shadow:
            inset 0 2px 4px rgba(0, 0, 0, 0.4),
            0 0 0 rgba(0, 0, 0, 0); /* removes outer shadow */

        transform: translateY(1px); /* subtle depression */
    }

</style>
