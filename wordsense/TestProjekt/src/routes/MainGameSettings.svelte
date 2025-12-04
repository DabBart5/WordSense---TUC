<script lang="ts">
    import "@awesome.me/webawesome/dist/components/button/button.js";
    import { t } from "../stores/i18n";
    import { availableLanguages } from "$lib/constData";

    //Setting Varaibles

    let isTimer = $state(true)
    let language = $state("English");
    let mode = $state("word");
    let timer = $state(10);
    let selectedLanguage = $state("English");

    let difficulty = $state("A1");

    function changeLanguage() {
        language = selectedLanguage;
    }
</script>

<div class="popUp">
    <form method="POST" action="?/startGame">
        <h1 style="font-size: var(--h2);">Main Game</h1>
        <div class="popUpHeader">
            <input type="hidden" name="language" value={language} />
            <button
                onsubmit={changeLanguage}
                class="languageSelectBtn"
                type="button"
            >
                <select bind:value={selectedLanguage} class="language">
                    {#each availableLanguages as lang}
                        <option value={lang} onclick={() => (language = lang)} >
                            {lang}
                        </option>
                    {/each}
                </select>
            </button>

            <span class="headerLine">
                <input type="hidden" name="mode" value={mode} />

                <button
                    type="button"
                    class:active={mode === "word"}
                    onclick={() => (mode = "word")}
                >
                    {$t.word}
                </button>

                <button
                    type="button"
                    class:active={mode === "definition"}
                    onclick={() => (mode = "definition")}
                >
                    {$t.definition}
                </button>
            </span>
        </div>
        <span class="line">
            <h2>Timer</h2>
            <span class="checkboxContainer" >
                <input type="checkbox" name="isTimer" value="isTimer" bind:checked={isTimer}/>
            </span>
            <div class:counter={isTimer} class:visually-hidden={!isTimer}>
                <input type="hidden" name="timerval" value={timer} />
                <button
                    type="button"
                    class="btn minus"
                    onclick={() => (timer > 5 ? (timer -= 5) : (timer += 0))}
                    >-5</button
                >
                <button type="button" class="btn display" id="counterDisplay">
                    {timer} {$t.sec}</button
                >
                <button
                    type="button"
                    class="btn plus"
                    onclick={() => (timer < 60 ? (timer += 5) : (timer += 0))}
                    >+5</button
                >
            </div>
            <span class:visually-hidden={isTimer} class:emptyLineSpace={!isTimer}></span>
        </span>
        <span class="line">
            <h2>Free 
                <!-- <img src="info-circle.svg" alt="More Info Free" class="infoI"/> -->
            </h2>
            <span class="checkboxContainer">
                <input type="checkbox" name="isFree" value="isFree" />
            </span>
            <span class="emptyLineSpace"></span>
        </span>

        <span class="line">
            <h2>{$t.exampleSentence} 
                <!-- <img src="info-circle.svg" alt="More Info Example-Sentence" class="infoI"/> -->
            </h2>
            <span class="checkboxContainer">
                <input
                    type="checkbox"
                    name="showExSentence"
                    value="showExSentence"
                />
            </span>
            <span class="emptyLineSpace"></span>
        </span>
        <div class="difficultyDiv">
            <!-- difficulty -->
            <h2>{$t.difficulty}</h2>
            <span class="difficultyHint">
                <!--hint easy hard-->
                <div>easy</div>
                <div>hard</div>
            </span>

            <input type="hidden" name="difficulty" value={difficulty} />

            <span class="difficultyLine">
                <button
                    type="button"
                    class:active={difficulty === "A1"}
                    onclick={() => (difficulty = "A1")}
                >
                    A1
                </button>

                <button
                    type="button"
                    class:active={difficulty === "B1"}
                    onclick={() => (difficulty = "B1")}
                >
                    B1
                </button>

                <button
                    type="button"
                    class:active={difficulty === "C1"}
                    onclick={() => (difficulty = "C1")}
                >
                    C1
                </button>
            </span>
            <span class="difficultyLine">
                <button
                    type="button"
                    class:active={difficulty === "A2"}
                    onclick={() => (difficulty = "A2")}
                >
                    A2
                </button>

                <button
                    type="button"
                    class:active={difficulty === "B2"}
                    onclick={() => (difficulty = "B2")}
                >
                    B2
                </button>
                <button
                    type="button"
                    class:active={difficulty === "C2"}
                    onclick={() => (difficulty = "C2")}
                >
                    C2
                </button>
            </span>
        </div>
        <br />
        <div class="startButtonDiv">
            <button type="submit">
                {$t.start}
            </button>
        </div>
    </form>
</div>

<style>
    .popUp {
        height: 100%;
        width: 100%;
        display: block;
        background-color: var(--background-color);
        border: 1px solid var(--color-bg-contrast);
        border-radius: 0px;
        padding: 1rem;
    }

    .popUpHeader {

        margin-bottom: var(--gap-vertical);
    }

    .headerLine {
        display: flex;
    }

    .headerLine Button {
        flex: 1;
        margin-bottom: 0.5rem;
        margin: 0px 0.1rem 0px 0.1rem;
        height: 100%;
        height: clamp(2.5rem, 2.5vh, 5rem);
    }

    .languageSelectBtn {
        width: 100%;
        height: clamp(3.2rem, 3.5vh, 7rem);
        font-size: var(--h2);
        cursor: pointer;
        text-align: center;
        margin-bottom: var(--gap-vertical);
        padding: 0px;
        border: 1px solid var(--color-bg-contrast);
    }

    .languageSelectBtn:hover {
        transform: scale(1);

        border: var(--color-bg-contrast);
        border: 1px solid var(--color-bg-contrast);
    }

    h2 {
        flex: 2;
        width: 100%;
        text-align: left;
        font-size: var(--text-size-normal);
        color: var(--color-text);
    }

    button {
        flex: 1;
        font-size: var(--text-size-normal);
        height: min-content;
        margin-left: 0px;
    }

    .active {
        background-color: var(--color-bg-contrast);
        color: var(--color-text-contrast);
        top: 2px;
        left: 1px;

        transform: translateY(1px); /* subtle depression */
    }

    .language {
        background-color: var(--background-color);
        text-align: center;
        font-size: var(--text-size-normal);
        color: var(--color-bg-contrast);
        height: 100%;
        width: 100%;
        padding: 0.5rem;
        border: 0px;
    }

    .line {
        display: flex;
        border-bottom: 1px solid var(--color-bg-contrast);
        margin-top: var(--gap-vertical);
        margin-bottom: var(--gap-vertical);
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
        color: var(--color-text);
        border-radius: 2rem 0 0 2rem; /* left half round */
        border: solid 1px var(--color-bg-contrast);
        flex: 1;
        padding: 0px;
        padding-left: 0.5rem;
        margin: 0;
        text-align: center;
    }

    /* MIDDLE button: rectangle */
    .counter .display {
        background-color: var(--background-color);
        color: var(--color-text);
        cursor: default;
        border: 1px solid var(--color-bg-contrast);
        border-left: none;
        border-right: none;
        width:fit-content;
        border-radius: 0;
        flex: 1;
        box-shadow: none;
        padding-left: calc(var(--text-size-normal)/2);
        padding-right: calc(var(--text-size-normal)/2);
    }

    .counter .display:hover {
        transform: scale(1);
        box-shadow: none;
    }

    /* RIGHT button: half-circle shape */
    .counter .plus {
        background-color: var(--background-color);
        color: var(--color-text);
        border-radius: 0 2rem 2rem 0; /* right half round */
        border: solid 1px var(--color-bg-contrast);
        flex: 1;
        padding: 0px;
        padding-right: 0.5rem;
        margin: 0;
        margin-right: 0.5rem;
        text-align: center;
    }

    /* Optional hover effects */
    .counter .minus:hover {
        background-color: var(--color-bg-contrast);
        color: var(--color-text-contrast);
    }

    .counter .plus:hover {
        background-color: var(--color-bg-contrast);
        color: var(--color-text-contrast);
    }

    .difficultyDiv {
        display: block;
    }

    .difficultyHint {
        justify-content: space-between;
        display: flex;
        margin-bottom: var(--gap-vertical);
    }

    .difficultyHint div {
        color: var(--color-bg-contrast);
    }

    .difficultyLine {
        display: flex;
        margin-bottom: var(--gap-vertical);
    }

    .startButtonDiv {
        padding-top: 0.125rem;
        display: flex;
        min-height: 3rem;

    }

    .startButtonDiv Button {
        height: 100%;
        flex: 1;
        width: 100%;
        margin-right: 0px;
        min-height: 3rem;
    }

</style>
