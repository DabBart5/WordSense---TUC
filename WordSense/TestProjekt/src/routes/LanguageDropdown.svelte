<script lang="ts">
  import { locale } from "../stores/i18n";
  import type { Locale } from "../stores/i18n";

  export const availableLanguages = ["en", "de"] as const;

  const flags: Record<Locale, string> = {
    en: "🇬🇧",
    de: "🇩🇪",
  };

  $: locale.set($locale);
</script>


  <select bind:value={$locale}>
    {#each availableLanguages as lang}
      <option value={lang}>{flags[lang]}</option>
    {/each}
  </select>


<style>

  select {
  appearance: none;
  -webkit-appearance: none; /* Safari */
  -moz-appearance: none; /* Firefox */

  background: none; /* removes arrow in some browsers */
  border: 1px solid var(--color-bg-contrast);


  /* Remove default background arrow space on some browsers */
  background-image: none;

  justify-content: center;
  background-color: var(--background-color);
  }
  option {
    text-align: center;
    text-align-last:center ;
  }
</style>
