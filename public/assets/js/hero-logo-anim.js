/**
 * Hero Logo Entrance Animation
 * Antigravity-style: slow rise + fade + subtle scale
 */

document.addEventListener("DOMContentLoaded", () => {
    const logo = document.getElementById("hero-logo");
    if (!logo) return;

    // Force reflow
    logo.getBoundingClientRect();

    requestAnimationFrame(() => {
        logo.style.transition = `
        opacity 1.2s ease,
        transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)
      `;
        logo.style.opacity = "1";
        logo.style.transform = "translateY(0) scale(1)";
    });
});
