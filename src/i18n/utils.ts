import { ui, defaultLang, showDefaultLang } from './ui.ts';

export function getLangFromUrl(url: URL) {
  const [, app, lang] = url.pathname.split('/');  
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: keyof typeof ui[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  }
}

export function useTranslatedPath(lang: keyof typeof ui) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function getRouteFromUrl(url: URL): string | undefined {
  const pathname = new URL(url).pathname;
  const parts = pathname?.split('/');
  // remove first 3 items
  parts.shift();
  parts.shift();
  parts.shift();
  const path = parts.join('/');

  if (path === undefined) {
    return undefined;
  }
  const currentLang = getLangFromUrl(url);

  return path;
}