<script lang="ts">
  import { locale } from 'svelte-i18n';
  import { onMount } from 'svelte';

  let open = false;
  let current = 'en';

  const languages = [
    { id: 'en', label: '🇬🇧' },
    { id: 'de', label: '🇩🇪' }
  ];

  onMount(() => {
    const saved = localStorage.getItem('lang');
    if (saved) {
      current = saved;
      locale.set(current);
    }
  });

  function selectLang(id: string) {
    current = id;
    locale.set(id);
    localStorage.setItem('lang', id);
    open = false;
  }
</script>

<style>
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .menu {
    position: absolute;
    background: var(--color-bg-1);
    border: 1px solid var(--color-bg-contrast);
    padding: 0.1rem;
    margin-top: 4px;
    min-width: 2rem;
    z-index: 10;
  }

  	div:hover {
		color: var(--color-bg-contrast);
	}

    wa-button.langButton::part(base):hover {
		transform: scale(1.05);
		background: var(--color-theme-1);
		color: var(--color-bg-contrast);
	}

    wa-button.langButton::part(base) {
		border-radius: 0px;
		border: solid 2px;
		background: var(--background-color);
		border-top-color: var(--color-bg-contrast);
		border-left-color: var(--color-bg-contrast);
		border-bottom-color: var(--color-bg-contrast);
		border-right-color: var(--color-bg-contrast);
		color: var(--color-bg-contrast);
		font-size: 1.125rem;
		box-shadow: 0 2px 10px #0002;
		transition: all var(--wa-transition-slow) var(--wa-transition-easing);
	}

	wa-button.langButton::part(base):active {
		border-top-color: var(--color-bg-contrast);
		border-right-color: var(--color-bg-contrast);
		border-bottom-color: var(--color-bg-contrast);
		border-left-color: var(--color-bg-contrast);
	}

	wa-button.langButton::part(base):focus-visible {
		outline: dashed 2px var(--color-bg-contrast);
		outline-offset: 4px;
	}
</style>

<div class="dropdown">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <wa-button variant="neutral"
             appearance="outlined"
             on:click={() => (open = !open)}>
    {current === 'en' ? '🇬🇧' : '🇩🇪'}
  </wa-button>

  {#if open}
    <div class="menu">
      {#each languages as lang}
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <wa-button  class = "langButton" on:click={() => selectLang(lang.id)}>
          {lang.label}
        </wa-button>
      {/each}
    </div>
  {/if}
</div>
