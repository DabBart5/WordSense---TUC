<script lang="ts">
    import "@awesome.me/webawesome/dist/components/button/button.js";
    import { t } from "../../stores/i18n";
    import { availableLanguages } from "$lib/constData";

    //Setting Varaibles

    let showExSentence = $state(false);
    let isFree = $state(false);
    let isTimerClassic = $state(false);
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

            <select
                bind:value={selectedLanguage}
                onchange={changeLanguage}
                class="languageSelect"
            >
                {#each availableLanguages as lang}
                    <option value={lang}>{lang}</option>
                {/each}
            </select>

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
            <span class="break">
                <h2>Timer</h2>
                <br>
                <span class="timerCheckboxes">
                    <label>
                    Auto 
                    <input type="radio" name="timer" value="auto" checked onclick={() => {isTimerClassic = false}}>
                    </label>

                    <label style="justify-self:center;">
                    Classic 
                    <input type="radio" name="timer" value=timer onclick={() => {isTimerClassic = true}}/>
                    </label>

                    <label style="jusfify-self:end;">
                    None
                    <input type="radio" name="timer" value="none" onclick={() => {isTimerClassic = false}}>
                    </label>
                </span>
            </span>
            <input type="hidden" name="timerval" value={timer} />
            <div class:counter={isTimerClassic} class:visually-hidden={!isTimerClassic}>
                <button
                    type="button"
                    class="btn minus"
                    onclick={() => (timer > 5 ? (timer -= 5) : (timer += 0))}
                    >-5</button
                >
                <button type="button" class="btn display" id="counterDisplay" tabindex="-1">
                    {timer} {$t.sec}</button
                >
                <button
                    type="button"
                    class="btn plus"
                    onclick={() => (timer < 100 ? (timer += 5) : (timer += 0))}
                    >+5</button
                >
            </div>
            <span
                class:visually-hidden={isTimerClassic}
                class:emptyLineSpace={!isTimerClassic}
            ></span>
        </span>

        <div class="advancedSettingsDiv">
            <h2>
                Advanced Settings
            </h2>
            <span style="display:flex; align-content:space-between;">
                <p style="flex:1; font-size:var(--text-size-normal)">
                    No Roundlimit
                </p>
                <input
                        type="checkbox"
                        name="isFree"
                        value={isFree}
                        bind:checked={isFree}
                    />
            </span>
            <span style="display:flex; align-content:space-between;">
                <p style="flex:1; font-size:var(--text-size-normal)">
                    Show an example Sentence
                </p>
                <input
                        type="checkbox"
                        name="showExSentence"
                        value={showExSentence}
                        bind:checked={showExSentence}
                    />
                
            </span>
        </div>
       
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
        display: flex;
  flex-direction: column;
  justify-content: flex-start; 
        background-color: var(--background-color);
        border: 1px solid var(--color-bg-contrast);
        border-radius: 0px;
        padding: 1rem;
        color: var(--color-text);
    }

    .popUpHeader {
        margin-bottom: clamp(1rem, var(--gap-vertical), 2rem);
    }

    .headerLine {
        display: flex;
        padding-bottom: clamp(4px, var(--gap-vertical), 8px);
        border-bottom: solid 1px var(--color-bg-contrast);
    }

    .headerLine Button {
        flex: 1;
        margin: 0px 0.1rem 0px 0.1rem;
        height: 100%;
        height: clamp(2.5rem, 2.5vh, 5rem);
    }

    .languageSelect {
        width: 100%;
        height: clamp(3.2rem, 3.5vh, 7rem);
        font-size: var(--text-size-bigger);
        cursor: pointer;
        text-align: center;
        margin-bottom: var(--gap-vertical);
        padding: 0px;
        border: 1px solid var(--color-bg-contrast);
        background-color: var(--background-color);
        color: var(--color-text);
    }

    .languageSelect:hover {
        transform: scale(1);
        border: var(--color-bg-contrast);
        border: 1px solid var(--color-bg-contrast);
    }

    .line h2 {
        flex: 7;
        text-align: left;
        font-size: var(--text-size-normal);
    }

    h2 {
        font-size: var(--text-size-normal);
    }

    Button {
        flex: 1;
        font-size: var(--text-size-normal);
        height: min-content;
    }

    .active {
        background-color: var(--color-bg-contrast);
        color: var(--color-text-contrast);
        top: 2px;
        left: 1px;

        transform: translateY(1px); /* subtle depression */
    }

    .line {
        display: flex;
        border-bottom: 1px solid var(--color-bg-contrast);
        flex-wrap: wrap;
        padding-bottom: var(--gap-vertical);
        margin-top: var(--gap-vertical);
    }

    .line h2 {
        flex: 7;
    }

    .advancedSettingsDiv{
        border-top: solid 1px var(--color-bg-contrast);
        border-bottom: solid 1px var(--color-bg-contrast);
        padding-top: var(--gap-vertical);
    }

    .emptyLineSpace {
        flex: 3;
    }

    .counter {
        margin-top: var(--gap-vertical);
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
        border-right: none;
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

        width: fit-content;
        border-radius: 0;
        flex: 1;
        box-shadow: none;
        padding-left: calc(var(--text-size-normal) / 2);
        padding-right: calc(var(--text-size-normal) / 2);
    }

    .counter .display:hover {
        transform: scale(1.0);
        box-shadow: none;
    }

    /* RIGHT button: half-circle shape */
    .counter .plus {
        background-color: var(--background-color);
        color: var(--color-text);
        border-radius: 0 2rem 2rem 0; /* right half round */
        border: solid 1px var(--color-bg-contrast);
        border-left: none;
        flex: 1;
        padding: 0px;
        padding-right: 0.5rem;
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
        margin-top: var(--gap-vertical);
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
        min-height: 3rem;
    }

    .break {
        flex-basis: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        justify-content: space-between;
    }

    .timerCheckboxes{
        display: grid;
        grid-template-columns:auto 1fr auto;
        align-items: center;
    }

    .timerCheckboxes label{
        color: var(--color-text);
        vertical-align: center;
        font-size: var(--text-size-normal);
        gap: 0.4em;

    }
</style>
