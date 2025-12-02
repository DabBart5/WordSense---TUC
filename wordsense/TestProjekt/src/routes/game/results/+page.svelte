<script lang="ts">
    import { t } from "$lib/../stores/i18n";
    import { afterTransVerbs, beforeTransVerbs, getFromLangDict } from "$lib/constData.js";
    import { availableLanguages } from "$lib/localisation/languages";
    import LanguageDropdown from "../../LanguageDropdown.svelte";
    let { data } = $props();

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
    <h1> Congrats, you won</h1>
    {:else}
    <h1>Too bad, you lost</h1>
    {/if}

    <p>heres your history</p>
    <div>
        <ul>
            {#each wordHistory as word, i}
                {#if i % 4 === 0}
                    <li>
                        <span class="wordHeader">
                            {#if word.wordtype === 'verb'}
                                {getFromLangDict(word.language, beforeTransVerbs)}
                            {/if}
                            {word.word}
                            {#if word.transitivity && word.wordtype === 'verb'}
                                {getFromLangDict(word.language, afterTransVerbs)}
                            {/if}
                        </span>
                        <span class="wordBody">
                            {word.definition}
                        </span>
                        

                
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</section>

<style>
    .wordHeader{
        color: var(--color-text);
        text-align: left;
        border-bottom: 1px solid var(--color-bg-contrast);
        display: block;
        font-weight: bold;
        font-size: (var(--text-size-normal) + 2px);

    }
    
    .wordBody{
        color: var(--color-text);
        text-align: left;
        border: 1px 1px 1px 1px solid var(--color-bg-contrast);
        display: block;
        padding-left: 0.5rem;
        font-size: (var(--text-size-normal));
    }

    li{
        display: block;
        border: 1px solid var(--color-bg-contrast);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }
</style>