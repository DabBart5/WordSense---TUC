import { register, init, getLocaleFromNavigator} from 'svelte-i18n';

// Register translation files
register('en', () => import('./en.json'));
register('de', () => import('./de.json'));

init({
  fallbackLocale: 'de',
  initialLocale: getLocaleFromNavigator() // auto-detect user language
});
