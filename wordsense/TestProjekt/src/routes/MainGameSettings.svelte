<script lang="ts">
    import "@awesome.me/webawesome/dist/components/button/button.js";
    import { t } from "../stores/i18n";
    // import Counter from "./Counter.svelte";
    // import { form } from "$app/server";
    import {availableLanguages} from "$lib/localisation/languages"
    
    //Setting Varaibles

    let language = $state("English");
    let mode = $state("word");
    // let isTimer = $state(false);
    // let modeIsFree = $state(false);
    // let showExSentence = $state(false);
    let timer = $state(10);
    let selectedLanguage = $state('English');

    let difficulty = $state("A1");

    function changeLanguage() {
        language = selectedLanguage;
    }
</script>
<!-- vielleicht musst du nochmal bei den checkoxes nochmal was machen -->

<!-- svelte-ignore component_name_lowercase -->
<form method="POST" action="?/startGame" class="mainGameSettings">
    <h1 class="popUpHeading">Main Game</h1>
    <div class="popUpHeader">
        <span class="headerLine">
            <h2>Language</h2>
            <span class="dropdown">
                <input type="hidden" name="language" value={language}>
                <!-- svelte-ignore component_name_lowercase -->
                <button onsubmit={changeLanguage} class="languageSelectForm" type = "button">
                    <select bind:value={selectedLanguage} class="language">
                        {#each availableLanguages as lang}
                            <option value={lang} onclick={() => language = lang}>
                                {lang}
                            </option>
                        {/each}
                    </select>
                </button>
            </span>
        </span>
        <br />
        <span class="headerLine">
            <input type="hidden" name="mode" value={mode}>
            <h2>Game Mode</h2>
            <button
                type = "button"
                class:active={mode === "word"}
                onclick={() => (mode = "word")}
            >
                {$t.word}
            </button>

            <button
                type = "button"
                class:active={mode === "definition"}
                onclick={() => (mode = "definition")}
            >
                {$t.definition}
            </button>
        </span>
    </div>
    <span class="line">
        <h2>Timer</h2>
        <span class="checkboxContainer">
            <input type="checkbox" name="isTimer" value="isTimer">
        </span>
        <div class="counter">
             <input type="hidden" name="timerval" value={timer}>
            <button type="button" class="btn minus" onclick={() => timer > 5 ? timer -= 5 : timer += 0}>-5</button>
            <button type="button" class="btn display" id="counterDisplay"> {timer} {$t.sec}</button>
            <button type="button" class="btn plus" onclick={() => timer < 60 ? timer += 5 : timer += 0}>+5</button>
        </div>
    </span>
    <span class="line">
        <h2>free</h2>
        <span class="checkboxContainer">
            <input type="checkbox" name="isFree" value="isFree">
        </span>
        <span class="emptyLineSpace"></span>
    </span>

    <span class="line">
        <h2>{$t.exampleSentence}</h2>
        <span class="checkboxContainer">
            <input type="checkbox" name="showExSentence" value="showExSentence">
            <!-- schau mal ob das hier noch schöner geht, sodass die checkbox vielleicht direkt mit der variable verlinkt ist-->
        </span>
        <span class="emptyLineSpace"></span>
    </span>
    <br />
    <div class="difficultyDiv">
        <!-- difficulty -->
         <h2>{$t.difficulty}</h2>
        <span class="difficultyHint">
            <!--hint easy hard-->
            <div>easy</div>
            <div>hard</div>
        </span>

        <input type="hidden" name="difficulty" value={difficulty}>

        <div class="diffcultyButtons">
            <span class="difficultyLine">
                <button
                    type = "button"
                    class:active={difficulty === "A1"}
                    onclick={() => (difficulty = "A1")}
                >
                    A1
                </button>

                <button
                    type = "button"
                    class:active={difficulty === "B1"}
                    onclick={() => (difficulty = "B1")}
                >
                    B1
                </button>

                <button
                    type = "button"
                    class:active={difficulty === "C1"}
                    onclick={() => (difficulty = "C1")}
                >
                    C1
                </button>
            </span>
            <span class="difficultyLine">
                <button
                    type = "button"
                    class:active={difficulty === "A2"}
                    onclick={() => (difficulty = "A2")}
                >
                    A2
                </button>

                <button
                    type = "button"
                    class:active={difficulty === "B2"}
                    onclick={() => (difficulty = "B2")}
                >
                    B2
                </button>
                <button
                    type = "button"
                    class:active={difficulty === "C2"}
                    onclick={() => (difficulty = "C2")}
                >
                    C2
                </button>
            </span>
        </div>
    </div>
    <br>
    <div class="startButtonDiv">
        <button type = "submit">
            {$t.start}
        </button>
    </div>
</form>

<style>
    .mainGameSettings {
        background-color: var(--background-color);
        border-radius: 3px;
        border: 1px solid var(--color-bg-contrast);
    }

    .popUpHeading {
        font-size: clamp(3rem, 7vw, 5rem);
        color: var(--color-text);
        text-align: center;
        font-family: "Montserrat";
    }

    .popUpHeader {
        border-bottom: 1px solid var(--color-bg-contrast);
    }

    .headerLine {
        display: flex;
        justify-content: space-between;
        
    }

    .languageSelectForm {
        flex: 4;
        width: 100%;
        margin-right: 0px;
        height: min-content;
        padding: 0px;
        border: 1px solid var(--color-bg-contrast);
        font-size: var(--text-size-normal);
        cursor: pointer;
        text-align: center;
        background-color: var(--color-theme-1);


    }

    h2 {
        flex: 2;
        width: 100%;
        text-align: left;
        margin-left: 10px;
        font-size: var(--text-size-normal);
        color: var(--color-bg-contrast);
    }

    button {
        background-color: rgba(161, 161, 161, 0.925);
        color: black;
        width: 100%;
        flex: 1;
        margin-right: 10px;
        font-size: var(--text-size-normal);
        height: min-content;
        margin-left: 0px;
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

    .dropdown {
        position: relative;
        flex: 3;
        margin-right: 10px;
        height: fit-content;
        background-color: var(--background-color);
    }

    .language{
        background-color: var(--background-color);
        text-align: center;
        font-size: var(--text-size-normal);
        color: var(--color-bg-contrast);
        height: min-content;
    }

    .language option{
        background-color: var(--background-color);
        height: min-content;
    }

    .language option:hover{
        background-color: var(--color-bg-contrast);
    }

    .line {
        display: flex;
        border-bottom: 1px solid var(--color-bg-contrast);
        margin-top: 0.5rem;
        margin-bottom: 0.3rem;
    }

    .line h2 {
        flex: 2;
    }

    .checkboxContainer {
        flex: 1;
    }

    .emptyLineSpace {
        flex: 3;
    }

    .counter {
        display: flex;
        flex: 3;
    }

    /* Reset button defaults */
    .counter .btn {
        border: none;
        cursor: pointer;
        display: inline-flex;
        text-align: center;
        flex-shrink: 0;
    }

    /* LEFT button: half-circle shape */
    .counter .minus {
        background-color: var(--background-color);
        color: var(--color-bg-contrast);
        border-radius: 30px 0 0 30px; /* left half round */
        border: solid 1px var(--color-bg-contrast);
        flex: 1;
        padding: 0px;
        padding-left: 0.5rem;
        margin: 0;
        text-align: center;
    }

    /* MIDDLE button: rectangle */
    .counter .display {
        background-color: #f1f1f1;
        color: #333;
        cursor: default; /* optional to disable click highlight */
        border: 1px solid var(--color-bg-contrast);
        border-left: none;
        border-right: none;
        width: min-content;
        border-radius: 0;
        flex: 1;
        margin: 0;
    }

    /* RIGHT button: half-circle shape */
    .counter .plus {
        background-color: var(--background-color);
        color: var(--color-bg-contrast);
        border-radius: 0 30px 30px 0; /* right half round */
        border: solid 1px var(--color-bg-contrast);
        flex: 1;
        padding: 0px;
        padding-right: 0.5rem;
        margin: 0;
        margin-right: 10px;
        text-align: center;
    }

    /* Optional hover effects */
    .counter .minus:hover {
        background-color: gray;
    }

    .counter .plus:hover {
        background-color: gray;
    }

    .difficultyDiv {
        display: block;
    }
    .difficultyHint {
        justify-content: space-between;
        display: flex;
        margin: 0px 10px 10px 10px;
    }

    .difficultyHint div{
        color: var(--color-bg-contrast);
    }

    .diffcultyButtons{
        display: block;
        margin: 0px 0px 0px 10px;
    }
    .difficultyLine{
        display: flex;
        margin-bottom: 5px;
    }

    .startButtonDiv{
        align-self: right;
        border-top:  1px solid var(--color-bg-contrast);
        padding-top:2px ;
    }
</style>
