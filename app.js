const THEME_KEY = "zllawi-ui-theme";
const STATS_ENDPOINT =
  window.ZLLAWI_STATS_ENDPOINT ||
  `${window.location.origin.replace(/\/$/, "")}/api/stats`;
const STATS_REFRESH_MS = 60_000;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(Number(value || 0));
}

function parseNumber(textValue) {
  const cleaned = String(textValue || "").replace(/[^0-9]/g, "");
  return Number(cleaned || 0);
}

function animateNumber(element, targetValue) {
  const startValue = parseNumber(element.textContent);
  const endValue = Number(targetValue || 0);
  const durationMs = 800;
  const startTime = performance.now();

  function step(now) {
    const progress = Math.min((now - startTime) / durationMs, 1);
    const current = Math.round(startValue + (endValue - startValue) * progress);
    element.textContent = formatNumber(current);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }

  requestAnimationFrame(step);
}

function setStatusText(statusElement, statusText) {
  statusElement.textContent = statusText;
  const isOnline = statusText === "متصل";
  statusElement.classList.toggle("status-online", isOnline);
  statusElement.classList.toggle("status-offline", !isOnline);
}

function getDefaultStats() {
  return {
    guilds: Number(
      document.getElementById("statServers")?.dataset.default || 12
    ),
    users: Number(document.getElementById("statUsers")?.dataset.default || 1284),
    messagesSent: Number(
      document.getElementById("statMessages")?.dataset.default || 532
    ),
    botStatus: document.getElementById("statStatus")?.dataset.default || "متصل",
    live: false,
    source: "fallback"
  };
}

function renderStats(stats, { animate } = { animate: true }) {
  const serversEl = document.getElementById("statServers");
  const usersEl = document.getElementById("statUsers");
  const messagesEl = document.getElementById("statMessages");
  const statusEl = document.getElementById("statStatus");
  const noteEl = document.getElementById("statsSourceNote");

  if (!serversEl || !usersEl || !messagesEl || !statusEl) {
    return;
  }

  if (animate) {
    animateNumber(serversEl, stats.guilds);
    animateNumber(usersEl, stats.users);
    animateNumber(messagesEl, stats.messagesSent);
  } else {
    serversEl.textContent = formatNumber(stats.guilds);
    usersEl.textContent = formatNumber(stats.users);
    messagesEl.textContent = formatNumber(stats.messagesSent);
  }

  setStatusText(statusEl, stats.botStatus || "غير متصل");

  if (noteEl) {
    if (stats.live) {
      noteEl.textContent = "القيم حقيقية ومباشرة من Discord API.";
    } else {
      noteEl.textContent =
        "تعذر الوصول لـ Discord API حاليًا، يتم عرض القيم الافتراضية مؤقتًا.";
    }
  }
}

async function fetchLiveStats() {
  try {
    const response = await fetch(STATS_ENDPOINT, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    renderStats(
      {
        guilds: Number(data.guilds || 0),
        users: Number(data.users || 0),
        messagesSent: Number(data.messagesSent || 0),
        botStatus: data.botStatus || "غير متصل",
        live: Boolean(data.live)
      },
      { animate: true }
    );
  } catch {
    renderStats(getDefaultStats(), { animate: false });
  }
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

function initStats() {
  renderStats(getDefaultStats(), { animate: false });
  fetchLiveStats();
  window.setInterval(fetchLiveStats, STATS_REFRESH_MS);
}

initThemeToggle();
initLoginForm();
initStats();
