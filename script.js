/* ═══════════════════════════════
   PORTFOLIO SCRIPT
═══════════════════════════════ */
const header = document.getElementById("header");
const scrollProgress = document.getElementById("scrollProgress");
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");
const mobileClose = document.getElementById("mobileClose");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section[id]");
const revealEls = document.querySelectorAll(".reveal");
const backToTop = document.getElementById("backToTop");
const yearEl = document.getElementById("year");

if (yearEl) yearEl.textContent = new Date().getFullYear();

/* Scroll effects */
function onScroll() {
  const scrollTop = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docH > 0 ? (scrollTop / docH) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = `${progress}%`;
  if (header) header.classList.toggle("scrolled", scrollTop > 30);
  if (backToTop) backToTop.classList.toggle("show", scrollTop > 500);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* Mobile menu */
menuToggle?.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active");
});
mobileClose?.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("active");
});
mobileMenu?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("open");
    menuToggle.classList.remove("active");
  });
});

/* Smooth scroll */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (!id || id === "#") return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: "smooth" });
  });
});

backToTop?.addEventListener("click", () =>
  window.scrollTo({ top: 0, behavior: "smooth" }),
);

/* Active nav on scroll */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`),
      );
    });
  },
  { rootMargin: "-40% 0px -50% 0px" },
);
sections.forEach((s) => sectionObserver.observe(s));

/* Reveal on scroll */
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.1 },
);
revealEls.forEach((el) => revealObserver.observe(el));

/* Typing effect */
const typedEl = document.getElementById("typedRole");
const roles = [
  "Data Dashboards",
  "Machine Learning Models",
  "Full-Stack Web Apps",
  "SQL Reports",
];
let rIdx = 0,
  cIdx = 0,
  typing = true;
function typeLoop() {
  if (!typedEl) return;
  const cur = roles[rIdx];
  if (typing) {
    typedEl.textContent = cur.slice(0, ++cIdx);
    if (cIdx === cur.length) {
      typing = false;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typedEl.textContent = cur.slice(0, --cIdx);
    if (cIdx === 0) {
      typing = true;
      rIdx = (rIdx + 1) % roles.length;
    }
  }
  setTimeout(typeLoop, typing ? 80 : 40);
}
if (typedEl) typeLoop();

/* Animated counters */
function animateCount(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || "";
  if (isNaN(target)) return;
  let count = 0;
  const step = target / 40;
  const iv = setInterval(() => {
    count += step;
    if (count >= target) {
      el.textContent = target + suffix;
      clearInterval(iv);
    } else el.textContent = Math.floor(count) + suffix;
  }, 25);
}
const statsBlock = document.querySelector(".hero-stats");
if (statsBlock) {
  new IntersectionObserver(
    (entries, obs) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll(".stat-num").forEach(animateCount);
        obs.disconnect();
      }
    },
    { threshold: 0.5 },
  ).observe(statsBlock);
}

/* Skills tabs */
document.querySelectorAll(".skill-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".skill-tab")
      .forEach((t) => t.classList.remove("active"));
    document
      .querySelectorAll(".skills-panel")
      .forEach((p) => p.classList.remove("active"));
    tab.classList.add("active");
    document
      .querySelector(`.skills-panel[data-panel="${tab.dataset.tab}"]`)
      ?.classList.add("active");
  });
});

/* Project filter */
document.querySelectorAll(".filter-btn[data-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    document
      .querySelectorAll(".filter-btn[data-filter]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".case-card, .mini-card").forEach((card) => {
      const cat = card.dataset.category || "";
      card.classList.toggle("hidden", filter !== "all" && cat !== filter);
    });
  });
});

/* Cert filter */
document.querySelectorAll(".filter-btn[data-cert-filter]").forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.certFilter;
    document
      .querySelectorAll(".filter-btn[data-cert-filter]")
      .forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    document.querySelectorAll(".cert-item").forEach((item) => {
      const cat = item.dataset.certCat || "";
      item.classList.toggle("hidden", filter !== "all" && cat !== filter);
    });
  });
});

/* Contact form */
const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");
const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const messageError = document.getElementById("messageError");

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
}

form?.addEventListener("submit", (e) => {
  e.preventDefault();
  [nameError, emailError, messageError].forEach((el) => {
    if (el) el.textContent = "";
  });

  const name = nameInput?.value.trim() || "";
  const email = emailInput?.value.trim() || "";
  const subject = subjectInput?.value.trim() || "";
  const message = messageInput?.value.trim() || "";
  let valid = true;

  if (!name) {
    nameError.textContent = "Name is required.";
    valid = false;
  }
  if (!email) {
    emailError.textContent = "Email is required.";
    valid = false;
  } else if (!isValidEmail(email)) {
    emailError.textContent = "Enter a valid email.";
    valid = false;
  }
  if (!message) {
    messageError.textContent = "Message is required.";
    valid = false;
  }
  if (!valid) return;

  const phone = "917481812280";
  const text = encodeURIComponent(
    `Hi Gaurav, this message is from your portfolio.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "N/A"}\n\nMessage:\n${message}`,
  );
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  form.reset();
});
