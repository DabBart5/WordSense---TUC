<script lang="ts">
    // Import the correct generated type
    import type { PageData } from './$types';

    export let data: PageData;

    const words = data.words;
</script>

{#if words}
    <pre>{JSON.stringify(words, null, 2)}</pre>
{:else}
    <p>No data found.</p>
{/if}