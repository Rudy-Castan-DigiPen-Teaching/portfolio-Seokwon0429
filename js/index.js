const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav__link");
const themeToggle = document.querySelector(".theme-toggle");
const themeToggleText = document.querySelector(".theme-toggle__text");
const themeToggleIcon = themeToggle ? themeToggle.querySelector("i") : null;
const themeStorageKey = "portfolio-theme";

function readSavedTheme() {
    try {
        const savedTheme = localStorage.getItem(themeStorageKey);
        return savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";
    } catch (e) {
        return "dark";
    }
}

function saveTheme(theme) {
    try {
        localStorage.setItem(themeStorageKey, theme);
    } catch (e) {
        return;
    }
}

function applyTheme(theme) {
    const isDark = theme === "dark";

    document.documentElement.dataset.theme = theme;

    if (!themeToggle) {
        return;
    }

    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

    if (themeToggleText) {
        themeToggleText.textContent = isDark ? "Dark" : "Light";
    }

    if (themeToggleIcon) {
        themeToggleIcon.className = isDark ? "fas fa-moon" : "fas fa-sun";
    }
}

applyTheme(readSavedTheme());

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(nextTheme);
        saveTheme(nextTheme);
    });
}

if (navToggle) {
    navToggle.addEventListener("click", () => {
        document.body.classList.toggle("nav-open");
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
    });
});

const revealItems = document.querySelectorAll(
    ".service, .portfolio__item, .resume-item, .about-me__body, .about-me__img, .portfolio-item-individual, .demo-panel"
);

if ("IntersectionObserver" in window && revealItems.length > 0) {
    document.body.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }

            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
        });
    }, {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.12
    });

    revealItems.forEach((item, index) => {
        item.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
        revealObserver.observe(item);
    });
}

// Help iframe of webgl demos get access to the keyboard by giving them focus when clicked
document.addEventListener("DOMContentLoaded", function () {
    const iframe = document.getElementById("demo");
    if (!iframe) {
        return;
    }
    iframe.addEventListener("load", function () {
        try {
            const iframeDoc = iframe.contentWindow.document;
            iframeDoc.addEventListener("mousedown", function () {
                iframe.contentWindow.Module.canvas.focus();
            });
        } catch (e) {
            console.error(e);
        }
    });
});
