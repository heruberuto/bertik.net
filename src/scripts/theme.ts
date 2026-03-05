// Constants
const THEME = "theme";
const LIGHT = "light";
const DARK = "dark";
const SYSTEM = "system";
const THEME_SEQUENCE = [LIGHT, DARK, SYSTEM] as const;
type ThemeMode = (typeof THEME_SEQUENCE)[number];

// Initial color scheme
// Can be "light", "dark", "system", or empty string for system's prefers-color-scheme
const initialColorScheme = "";

function isThemeMode(value: string | null | undefined): value is ThemeMode {
  return value === LIGHT || value === DARK || value === SYSTEM;
}

function getSystemTheme(): typeof LIGHT | typeof DARK {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? DARK : LIGHT;
}

function resolveTheme(mode: ThemeMode): typeof LIGHT | typeof DARK {
  return mode === SYSTEM ? getSystemTheme() : mode;
}

function getPreferThemeMode(): ThemeMode {
  // get theme mode from local storage (user's explicit choice)
  const currentTheme = localStorage.getItem(THEME);
  if (isThemeMode(currentTheme)) return currentTheme;

  // return initial color scheme if it is set (site default)
  if (isThemeMode(initialColorScheme)) return initialColorScheme;

  // default to system color scheme
  return SYSTEM;
}

function getNextTheme(mode: ThemeMode): ThemeMode {
  const currentIndex = THEME_SEQUENCE.indexOf(mode);
  return THEME_SEQUENCE[(currentIndex + 1) % THEME_SEQUENCE.length];
}

// Use existing theme mode from inline script if available, otherwise detect
const inlineThemeValue = window.theme?.themeValue;
let themeValue: ThemeMode = isThemeMode(inlineThemeValue)
  ? inlineThemeValue
  : getPreferThemeMode();

function setPreference(): void {
  localStorage.setItem(THEME, themeValue);
  reflectPreference();
}

function reflectPreference(): void {
  const resolvedTheme = resolveTheme(themeValue);
  document.firstElementChild?.setAttribute("data-theme", resolvedTheme);

  const themeBtn = document.querySelector<HTMLButtonElement>("#theme-btn");
  themeBtn?.setAttribute("aria-label", `Theme: ${themeValue}`);
  themeBtn?.setAttribute("title", `Theme: ${themeValue}`);
  themeBtn?.setAttribute("data-theme-mode", themeValue);
  themeBtn
    ?.querySelectorAll<HTMLElement>(".theme-icon")
    .forEach(icon => icon.classList.add("hidden"));
  themeBtn
    ?.querySelector<HTMLElement>(`.theme-icon-${themeValue}`)
    ?.classList.remove("hidden");

  // Get a reference to the body element
  const body = document.body;

  // Check if the body element exists before using getComputedStyle
  if (body) {
    // Get the computed styles for the body element
    const computedStyles = window.getComputedStyle(body);

    // Get the background color property
    const bgColor = computedStyles.backgroundColor;

    // Set the background color in <meta theme-color ... />
    document
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
}

// Update the global theme API
if (window.theme) {
  window.theme.setPreference = setPreference;
  window.theme.reflectPreference = reflectPreference;
} else {
  window.theme = {
    themeValue,
    setPreference,
    reflectPreference,
    getTheme: () => themeValue,
    setTheme: (val: string) => {
      if (isThemeMode(val)) {
        themeValue = val;
      }
    },
  };
}

// Ensure theme is reflected (in case body wasn't ready when inline script ran)
reflectPreference();

function setThemeFeature(): void {
  // set on load so screen readers can get the latest value on the button
  reflectPreference();

  // now this script can find and listen for clicks on the control
  const themeBtn = document.querySelector<HTMLButtonElement>("#theme-btn");
  if (!themeBtn || themeBtn.dataset.themeBound === "true") return;

  themeBtn.dataset.themeBound = "true";
  themeBtn.addEventListener("click", () => {
    themeValue = getNextTheme(themeValue);
    window.theme?.setTheme(themeValue);
    setPreference();
  });
}

// Set up theme features after page load
setThemeFeature();

// Runs on view transitions navigation
document.addEventListener("astro:after-swap", setThemeFeature);

// Set theme-color value before page transition
// to avoid navigation bar color flickering in Android dark mode
document.addEventListener("astro:before-swap", event => {
  const astroEvent = event;
  const bgColor = document
    .querySelector("meta[name='theme-color']")
    ?.getAttribute("content");

  if (bgColor) {
    astroEvent.newDocument
      .querySelector("meta[name='theme-color']")
      ?.setAttribute("content", bgColor);
  }
});

// sync with system changes
window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", () => {
    if (themeValue === SYSTEM) {
      reflectPreference();
    }
  });
