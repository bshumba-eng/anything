// ED3N Café website interactions. Verify hours and menu with the café before publishing.
const hours = [
  { day: "Monday", open: "10:00", close: "17:00", display: "10:00 am – 5:00 pm" },
  { day: "Tuesday", open: "08:30", close: "17:00", display: "8:30 am – 5:00 pm" },
  { day: "Wednesday", open: "08:30", close: "17:00", display: "8:30 am – 5:00 pm" },
  { day: "Thursday", open: "08:30", close: "17:00", display: "8:30 am – 5:00 pm" },
  { day: "Friday", open: "08:30", close: "17:00", display: "8:30 am – 5:00 pm" },
  { day: "Saturday", open: "10:00", close: "17:00", display: "10:00 am – 5:00 pm" },
  { day: "Sunday", open: "13:00", close: "17:00", display: "1:00 pm – 5:00 pm" }
];

const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menuToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
  menuToggle.textContent = isOpen ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  if (menuToggle) { menuToggle.textContent = "☰"; menuToggle.setAttribute("aria-label", "Open navigation"); }
}));

const viewport = document.getElementById("menu-viewport");
document.getElementById("menu-left")?.addEventListener("click", () => viewport.scrollBy({ left: -320, behavior: "smooth" }));
document.getElementById("menu-right")?.addEventListener("click", () => viewport.scrollBy({ left: 320, behavior: "smooth" }));
document.querySelectorAll(".menu-tab").forEach(tab => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".menu-tab").forEach(other => {
      const active = other === tab;
      other.classList.toggle("active", active);
      other.setAttribute("aria-selected", String(active));
    });
    const category = tab.dataset.category;
    document.querySelectorAll(".menu-card").forEach(card => {
      card.hidden = category !== "all" && card.dataset.category !== category;
    });
    viewport.scrollTo({ left: 0, behavior: "smooth" });
  });
});

function renderHours() {
  const now = new Date();
  // Ireland uses Europe/Dublin to handle daylight-saving changes automatically.
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Dublin", weekday: "long", hour: "2-digit", minute: "2-digit", hourCycle: "h23"
  }).formatToParts(now);
  const p = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const todayName = p.weekday;
  const currentMinutes = Number(p.hour) * 60 + Number(p.minute);
  const today = hours.find(item => item.day === todayName);
  const openMinutes = today ? Number(today.open.slice(0,2)) * 60 + Number(today.open.slice(3)) : 0;
  const closeMinutes = today ? Number(today.close.slice(0,2)) * 60 + Number(today.close.slice(3)) : 0;
  const isOpen = Boolean(today && currentMinutes >= openMinutes && currentMinutes < closeMinutes);
  const status = document.getElementById("open-status");
  if (status) {
    status.classList.toggle("closed", !isOpen);
    status.innerHTML = `<i></i><span>${isOpen ? "Open right now" : "Closed right now"}</span>`;
  }
  const list = document.getElementById("hours-list");
  if (list) list.innerHTML = hours.map(item => `
    <div class="hours-row ${item.day === todayName ? "today" : ""}">
      <span class="day-name">${item.day}${item.day === todayName ? " · Today" : ""}</span><span>${item.display}</span>
    </div>`).join("");
}
renderHours();
document.getElementById("year").textContent = new Date().getFullYear();

let selectedRating = 0;
const ratingHint = document.getElementById("rating-hint");
document.querySelectorAll(".star-picker button").forEach(button => {
  button.addEventListener("click", () => {
    selectedRating = Number(button.dataset.rating);
    document.querySelectorAll(".star-picker button").forEach(star => {
      const selected = Number(star.dataset.rating) <= selectedRating;
      star.classList.toggle("selected", selected);
      star.setAttribute("aria-pressed", String(Number(star.dataset.rating) === selectedRating));
    });
    ratingHint.textContent = `${selectedRating} out of 5 — thank you!`;
  });
});

const storageKey = "ed3n-cafe-community-reviews";
function readReviews() {
  try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
  catch { return []; }
}
function renderReviews() {
  const reviews = readReviews();
  const count = document.getElementById("review-count");
  const list = document.getElementById("review-list");
  count.textContent = String(reviews.length);
  if (!reviews.length) {
    list.innerHTML = '<p class="empty-reviews">Be the first to leave a little love.</p>';
    return;
  }
  list.replaceChildren();
  reviews.slice().reverse().slice(0, 5).forEach(review => {
    const article = document.createElement("article");
    article.className = "review-entry";
    const top = document.createElement("div");
    top.className = "review-entry-top";
    const name = document.createElement("strong");
    name.textContent = review.name;
    const stars = document.createElement("span");
    stars.className = "review-stars";
    stars.textContent = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);
    top.append(name, stars);
    const message = document.createElement("p");
    message.textContent = review.message;
    article.append(top, message);
    list.append(article);
  });
}
document.getElementById("review-form").addEventListener("submit", event => {
  event.preventDefault();
  const feedback = document.getElementById("review-feedback");
  if (!selectedRating) {
    feedback.textContent = "Please choose a star rating before sharing your review.";
    return;
  }
  const name = document.getElementById("review-name").value.trim();
  const message = document.getElementById("review-message").value.trim();
  if (!name || !message) return;
  const reviews = readReviews();
  reviews.push({ name, message, rating: selectedRating, date: new Date().toISOString() });
  try {
    localStorage.setItem(storageKey, JSON.stringify(reviews.slice(-30)));
    renderReviews();
    feedback.textContent = "Thanks for sharing your experience! Your note is saved in this browser.";
    event.target.reset();
    selectedRating = 0;
    document.querySelectorAll(".star-picker button").forEach(star => {
      star.classList.remove("selected");
      star.setAttribute("aria-pressed", "false");
    });
    ratingHint.textContent = "Tap to rate your experience";
  } catch {
    feedback.textContent = "Your browser couldn't save this review. Please try again.";
  }
});
renderReviews();