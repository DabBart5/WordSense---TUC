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


<label for="languageSelect" class="sr-only">Choose language</label>
<select id="languageSelect" bind:value={$locale}>
  {#each availableLanguages as lang}
    <option value={lang}>{flags[lang]} {lang}</option>
  {/each}
</select>

<style>

  select {
    color: var(--color-text);
    appearance: none;
    -webkit-appearance: none; 
    -moz-appearance: none;
    background: none; 
    border: 1px solid var(--color-bg-contrast);
    padding: 0.25em 0.5em; /* control vertical spacing */
    margin: 0;
    line-height: 1.2;       /* match font size */
    font-size: 1rem;
    background-color: var(--background-color);
    vertical-align: middle; /* aligns with text baseline */
      font-family: system-ui, sans-serif;  /* same as button */
  font-size: 1rem;
  line-height: 1.2;
  }

  option {
    text-align: center;
    text-align-last: center;
    text-align-last:center ;
    color: var(--color-text);
  }

.sr-only {
  position: absolute !important;  /* remove from flow */
  width: 1px;
  height: 1px;
  padding: 0;
  margin: 0;                     /* reset margin to avoid shifting */
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
  border: 0;
}
label {
  color: var(--color-bg-contrast);
}
</style>
