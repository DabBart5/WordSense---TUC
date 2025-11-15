<script lang="ts">
  import { locale } from '../stores/i18n';
  import type { Locale } from '../stores/i18n';

  const languages: Locale[] = ['en', 'de'];
  let open = false;
    const listboxId = "language-listbox";

  const flags: Record<Locale, string> = {
    en: '🇬🇧',
    de: '🇩🇪'
  };

  function toggleLang() {
    open = !open;
  }

  function select(lang: Locale) {
    locale.set(lang);
    open = false;
  }

    function onOptionKeyDown(event: KeyboardEvent, lang: Locale) {
    // handle keyboard selection (Enter / Space)
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      select(lang);
    }
  }
</script>

<!-- svelte-ignore a11y_interactive_supports_focus -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<wa-button
  class="header-Button"
  variant="neutral"
	appearance="outlined"
  role="combobox"
  aria-expanded={open}
  aria-controls={listboxId}
  aria-haspopup="listbox"
  on:click={toggleLang}
>
  {flags[$locale]}
</wa-button>

<div
  id={listboxId}
  role="listbox"
  class="options"
  class:open={open}
>
  {#each languages as lang}
    <wa-button
      role="option"
      aria-selected={$locale === lang}
      tabindex="0"      
      on:click={() => select(lang)}
      on:keydown={(e: KeyboardEvent) => onOptionKeyDown(e, lang)}
      class="language-Button"
    >
      {flags[lang]}
    </wa-button>
  {/each}
</div>
<style>


  .options {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background-color: var(--background-color);
    border-radius: 4px;
    margin-top: 2px;
    z-index: 10;
  }

  .options.open {
    display: block;
  }

  wa-button.language-Button{
	width: 100%;
	border: var(--color-bg-contrast);
}

wa-button.language-Button::part(base) {
  border-radius: 4px;
  border: solid 1px;
	border-color: var(--color-bg-contrast);
	display: flex;
	justify-content: center;
	align-items: center;
	background: var(--color-bg-1);
	font-size: 1rem;
	transition: all var(--wa-transition-slow) var(--wa-transition-easing);
}

wa-button.language-Button::part(base):hover {
	background-color: var(--color-theme-2);
}
</style>