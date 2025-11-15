import { writable, derived } from 'svelte/store';
import en from '../lib/localisation/en.json';
import de from '../lib/localisation/de.json';

type Locale = 'en' | 'de';

type Translations = typeof en;

const translations: Record<Locale, Translations>  = {en, de};

// Store for current language
export const locale = writable<Locale>('en');

export const t = derived(locale, ($locale): Translations => translations[$locale]);