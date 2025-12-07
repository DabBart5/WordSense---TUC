<script lang="ts">
    import { t } from "$lib/../stores/i18n";
    import { afterTransVerbs, beforeTransVerbs, getFromLangDict } from "$lib/constData.js";
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
        wordHistory

    } = data;

    let isTimer = $state(true);
    let isFree = $state(true);
    let correctAnswers = $state<number[]>([])

    $effect(() => {
    isTimer = (timer != -1) ;
    isFree = (maxRounds === -1);
    correctAnswers = roundsWon;
    })

    function wordWasAnsweredCorrectly(i: number){
        return correctAnswers.includes(i + 1); //AnswerArray starts at 1
    }

</script>

<section>
    {#if won}
    <h1> Congrats, you won</h1>
    {:else}
    <h1> Too bad, you lost</h1>
    {/if}

    <span class="buttonLine">
        <button onclick={() => goto("/")}>
            Return To Main-Menu
        </button>
        <form method="POST" action="?/startGame"  use:enhance>
            <!-- recreating the structure of the form in MainGameSettings -->
            <input type="hidden" name="language" value={language} />
            <input type="hidden" name="mode" value={mode} />
            <input type="hidden" name="isTimer" value={isTimer}/>
            <input type="hidden" name="timerval" value={timer} />
            <input type="hidden" name="isFree" value={isFree} />
            <input type="hidden" name="showExSentence" value={showExSentence}/>
            <input type="hidden" name="difficulty" value={difficulty} />


            <button type="submit">
                Play Again
            </button>
        </form>
    </span>
    <p>Here's your history:</p>
    <div>
        <ul>
            {#each wordHistory as word, i}
                {#if i % 4 === 0} <!-- words were featured in a game round (always the first one of a set of four)-->
                {#if wordWasAnsweredCorrectly((i / 4))} <!-- values in answerArray start counting at 1 -->
                    <li class="correctAnswer">
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
                {:else}
                <li class="wrongAnswer">
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

    .correctAnswer{
        display: block;
        border: 1px solid var(--color-bg-contrast);
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .buttonLine{
        display: flex;
        justify-content: center;
    }

    .wrongAnswer{
        display: block;
        border: 1px solid red;
        padding-left: 0.5rem;
        padding-right: 0.5rem;
        margin-bottom: 0.5rem;
    }

    p{
        margin: 1rem;
        font-size: var(--text-size-bigger);
        font-weight: 600;
    }

    .buttonLine button{
        margin: clamp(4px, 3vw, 8px);
    }
</style>