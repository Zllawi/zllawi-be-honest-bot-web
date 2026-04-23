const THEME_KEY = "zllawi-ui-theme";

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function animateStatNumbers() {
  const numberNodes = document.querySelectorAll(".stat-num[data-count]");

  numberNodes.forEach((node) => {
    const targetValue = Number(node.dataset.count || 0);
    const duration = 850;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.round(targetValue * progress);
      node.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  });
}

function initThemeToggle() {
  const themeBtn = document.getElementById("themeToggle");

  if (!themeBtn) {
    return;
  }

  function updateIcon() {
    themeBtn.textContent = document.body.classList.contains("theme-dark")
      ? "☀"
      : "☾";
  }

  try {
    const saved = window.localStorage.getItem(THEME_KEY);

    if (saved === "dark") {
      document.body.classList.add("theme-dark");
    }
  } catch {
    // Ignore localStorage restrictions.
  }

  updateIcon();

  themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("theme-dark");
    updateIcon();

    try {
      const mode = document.body.classList.contains("theme-dark")
        ? "dark"
        : "light";
      window.localStorage.setItem(THEME_KEY, mode);
    } catch {
      // Ignore localStorage restrictions.
    }
  });
}

function initLoginForm() {
  const form = document.querySelector(".login-form");

  if (!form) {
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
}

animateStatNumbers();
initThemeToggle();
initLoginForm();
