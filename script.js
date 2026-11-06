window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  setTimeout(() => loader.classList.add("hidden"), 1200);
});

document.getElementById("openBtn").addEventListener("click", () => {
  document.querySelector(".intro").scrollIntoView({ behavior: "smooth" });
});

const musicBtn = document.getElementById("musicBtn");
const bgMusic = document.getElementById("bgMusic");
let musicPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!musicPlaying) {
    bgMusic.play().then(() => {
      musicPlaying = true;
      musicBtn.innerHTML = "❚❚";
    }).catch(() => {
      alert("Please make sure assets/music/our-song.mp3 exists.");
    });
  } else {
    bgMusic.pause();
    musicPlaying = false;
    musicBtn.innerHTML = "♪";
  }
});

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealElements.forEach(element => revealObserver.observe(element));

const photoCards = document.querySelectorAll(".photo-card");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");

photoCards.forEach(card => {
  card.addEventListener("click", () => {
    const image = card.querySelector("img");
    lightboxImage.src = image.src;
    lightbox.classList.add("active");
  });
});

lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("active");
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    lightbox.classList.remove("active");
  }
});

const surpriseBtn = document.getElementById("surpriseBtn");
const surpriseModal = document.getElementById("surpriseModal");
const closeModal = document.getElementById("closeModal");

surpriseBtn.addEventListener("click", () => {
  surpriseModal.classList.add("active");
  createHearts();
});

closeModal.addEventListener("click", () => {
  surpriseModal.classList.remove("active");
});

function createHearts() {
  for (let i = 0; i < 25; i++) {
    const heart = document.createElement("div");
    heart.innerHTML = "❤";
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 100 + "%";
    heart.style.bottom = "0";
    heart.style.fontSize = (Math.random() * 20 + 10) + "px";
    heart.style.color = "#ff9eb6";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "6000";
    heart.style.transition = "transform 4s ease, opacity 4s ease";

    document.body.appendChild(heart);

    setTimeout(() => {
      heart.style.transform =
        `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
      heart.style.opacity = "0";
    }, 50);

    setTimeout(() => heart.remove(), 4200);
  }
}

document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    surpriseModal.classList.remove("active");
    lightbox.classList.remove("active");
  }
});
