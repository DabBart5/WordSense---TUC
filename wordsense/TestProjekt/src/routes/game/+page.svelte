<script lang='ts'>
    export let data;
    const { words, gameId } = data;
</script>

<h1 >Game {gameId}</h1>

<ul>
    {#each words as word}
        <li>{word.word} — {word.definition}</li>
    {/each}
</ul>