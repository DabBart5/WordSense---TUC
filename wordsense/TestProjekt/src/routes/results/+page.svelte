<script lang="ts">
    let { data } = $props();

    import { onMount } from "svelte";
    const {
        lives,
        maxRounds,
        mode,
        won,
        wordHistory

    } = data;

    


</script>

<section>
    {#if won}
    Congrats you won
    {:else}
    Too bad, you lost
    {/if}

    <p>heres your history</p>
    <div>
        <ul>
            {#each wordHistory as word, i}
                {#if i % 4 === 0}
                    <li>

                        {word.word} - {word.definition}

                
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</section>

<style>

</style>