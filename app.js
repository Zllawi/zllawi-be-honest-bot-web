const INVITE_URL =
  "https://discord.com/oauth2/authorize?client_id=1496608248814374923&permission";

const SECTION_META = {
  dashboard: {
    title: "Dashboard",
    subtitle: "Overview of your bot and servers"
  },
  invite: {
    title: "Invite Bot",
    subtitle: "Add the bot to your Discord server"
  },
  terms: {
    title: "Terms of Use",
    subtitle: "Rules and usage policies"
  },
  help: {
    title: "Help",
    subtitle: "Quick answers and setup guidance"
  }
};

let countersAnimated = false;

function formatNumber(value) {
  return new Intl.NumberFormat("en-US").format(value);
}

function animateCounters() {
  const counters = document.querySelectorAll(".stat-value[data-count]");

  counters.forEach((counter) => {
    const endValue = Number(counter.dataset.count || 0);
    const durationMs = 850;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const current = Math.round(endValue * progress);
      counter.textContent = formatNumber(current);

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  });
}

function initInvite() {
  const inviteBtn = document.getElementById("inviteBtn");
  const inviteHint = document.getElementById("inviteHint");

  if (!inviteBtn || !inviteHint) {
    return;
  }

  inviteBtn.href = INVITE_URL;
  inviteHint.textContent = "رابط الدعوة جاهز. اضغط الزر لإضافة البوت.";
}

function initSections() {
  const navLinks = Array.from(
    document.querySelectorAll(".nav-link[data-target]")
  );
  const slidePills = Array.from(
    document.querySelectorAll(".slide-pill[data-target]")
  );
  const views = Array.from(document.querySelectorAll(".view"));

  const titleEl = document.getElementById("sectionTitle");
  const subtitleEl = document.getElementById("sectionSubtitle");

  function setActiveSection(sectionId) {
    views.forEach((view) => {
      view.classList.toggle("is-active", view.id === sectionId);
    });

    navLinks.forEach((button) => {
      button.classList.toggle("is-active", button.dataset.target === sectionId);
    });

    slidePills.forEach((button) => {
      const isActive = button.dataset.target === sectionId;
      button.classList.toggle("is-active", isActive);

      if (isActive) {
        button.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    });

    const meta = SECTION_META[sectionId];

    if (meta && titleEl && subtitleEl) {
      titleEl.textContent = meta.title;
      subtitleEl.textContent = meta.subtitle;
    }

    if (sectionId === "dashboard" && !countersAnimated) {
      animateCounters();
      countersAnimated = true;
    }
  }

  const controlButtons = [...navLinks, ...slidePills];

  controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveSection(button.dataset.target);
    });
  });

  const initialHash = window.location.hash.replace("#", "");
  const hasSection = views.some((view) => view.id === initialHash);
  setActiveSection(hasSection ? initialHash : "dashboard");
}

function initThemeToggle() {
  const toggleButton = document.getElementById("themeToggle");

  if (!toggleButton) {
    return;
  }

  function updateIcon() {
    toggleButton.textContent = document.body.classList.contains("theme-light")
      ? "☀"
      : "☾";
  }

  try {
    const savedTheme = window.localStorage.getItem("zllawi-theme");

    if (savedTheme === "light") {
      document.body.classList.add("theme-light");
    }
  } catch {
    // Ignore localStorage errors.
  }

  updateIcon();

  toggleButton.addEventListener("click", () => {
    document.body.classList.toggle("theme-light");
    updateIcon();

    try {
      const isLight = document.body.classList.contains("theme-light");
      window.localStorage.setItem("zllawi-theme", isLight ? "light" : "dark");
    } catch {
      // Ignore localStorage errors.
    }
  });
}

initInvite();
initSections();
initThemeToggle();
