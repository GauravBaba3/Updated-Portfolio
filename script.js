const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section[id]");

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

navItems.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) return;
    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    const offsetTop = target.offsetTop - 68;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });

    if (navLinks && menuToggle) {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
});

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute("id");
      navItems.forEach((item) => {
        item.classList.toggle("active-link", item.getAttribute("href") === `#${id}`);
      });
    });
  },
  { rootMargin: "-42% 0px -45% 0px" }
);

sections.forEach((section) => sectionObserver.observe(section));

const form = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

function clearErrors() {
  if (nameError) nameError.textContent = "";
  if (emailError) emailError.textContent = "";
  if (messageError) messageError.textContent = "";
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    const name = nameInput ? nameInput.value.trim() : "";
    const email = emailInput ? emailInput.value.trim() : "";
    const subject = subjectInput ? subjectInput.value.trim() : "";
    const message = messageInput ? messageInput.value.trim() : "";
    let valid = true;

    if (!name) {
      if (nameError) nameError.textContent = "Name is required.";
      valid = false;
    }
    if (!email) {
      if (emailError) emailError.textContent = "Email is required.";
      valid = false;
    } else if (!validateEmail(email)) {
      if (emailError) emailError.textContent = "Enter a valid email.";
      valid = false;
    }
    if (!message) {
      if (messageError) messageError.textContent = "Message is required.";
      valid = false;
    }
    if (!valid) return;

    const phoneNumber = "917481812280";
    const text = `This message is from your portfolio website.%0A%0A
    Hello, I am ${name}%0A
    Email: ${email}%0A
    Subject: ${subject || "N/A"}%0A%0A
    Message:%0A${message}`;

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${text}`;
    window.open(whatsappUrl, "_blank");
    form.reset();
  });
}
