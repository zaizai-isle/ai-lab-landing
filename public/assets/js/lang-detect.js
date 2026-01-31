/**
 * Language detection & redirect
 * Default: English
 * If browser prefers Chinese → redirect to /zh/
 */

(function () {
    const path = window.location.pathname;
  
    // already in explicit language path
    if (path.startsWith("/en") || path.startsWith("/zh")) return;
  
    const lang = navigator.language || navigator.userLanguage;
  
    if (lang && lang.toLowerCase().startsWith("zh")) {
      window.location.replace("/zh/");
    } else {
      window.location.replace("/en/");
    }
  })();
  