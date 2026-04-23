function initInvite() {
  const inviteBtn = document.getElementById("inviteBtn");
  const inviteHint = document.getElementById("inviteHint");

  if (!inviteBtn || !inviteHint) {
    return;
  }

  const inviteUrl =
    "https://discord.com/oauth2/authorize?client_id=1496608248814374923&permission";

  inviteBtn.href = inviteUrl;
  inviteHint.textContent = "تم ضبط زر الدعوة بالرابط المحدد.";
}

function initSectionSlider() {
  const links = Array.from(document.querySelectorAll("[data-section-link]"));

  if (!links.length) {
    return;
  }

  const sections = links
    .map((link) => document.getElementById(link.dataset.sectionLink))
    .filter(Boolean);

  function setActive(sectionId) {
    links.forEach((link) => {
      const isActive = link.dataset.sectionLink === sectionId;
      link.classList.toggle("is-active", isActive);

      if (isActive) {
        link.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center"
        });
      }
    });
  }

  links.forEach((link) => {
    link.addEventListener("click", () => {
      setActive(link.dataset.sectionLink);
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible && visible.target.id) {
        setActive(visible.target.id);
      }
    },
    {
      threshold: [0.25, 0.5, 0.75],
      rootMargin: "-35% 0px -45% 0px"
    }
  );

  sections.forEach((section) => observer.observe(section));
}

initInvite();
initSectionSlider();
