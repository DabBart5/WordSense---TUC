<script lang="ts">

    export let data;
    const { wordSet, lives, showExSentence, maxRounds, mode, timer } = data;

    const randomizedAnswerOrder = shuffleWithOriginalIndex([0, 1, 2 , 3]);

    let correct = false;

    let countdown = timer;

function shuffleWithOriginalIndex(array: Array<number>) {
    // Tag each element with its original index
    const tagged = array.map((value, index) => ({
        value,
        originalIndex: index
    }));

    // Shuffle the tagged array (Fisher–Yates)
    for (let i = tagged.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [tagged[i], tagged[j]] = [tagged[j], tagged[i]];
    }

    return tagged;
}
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
                 {maxRounds}
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
        {#if showExSentence && mode === 'word'}
            {wordSet[0].exsentence[0]}
        {/if}
    </span>
    <form action="submitAnswer">
        <input type="hidden" name="correct" value={correct}>
        {#if mode === "word"}
            <ul>
                {#each randomizedAnswerOrder as position}
                    <!-- item.value = word, item.originalIndex = original position -->
                    <li>
                        <button type="button" onclick={() => correct = position.originalIndex === 0}>
                            {wordSet[position.value].definition}
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
                        <button type="button" onclick={() => correct = position.originalIndex === 0}>
                            {wordSet[position.value].word}
                        </button>
                    </li>
                {/each}
            </ul>
        </ul>
        {/if}
        <button type="submit"> Answer </button>
    </form>
</section>


<style>
    .headline {
        display: flex;
        justify-content: space-between;
    }
</style>
