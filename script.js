// LANGUAGE TOGGLE
function toggleLanguage() {
  const en = document.querySelectorAll(".en");
  const bn = document.querySelectorAll(".bn");

  en.forEach(e => {
    e.style.display = (e.style.display === "none") ? "inline" : "none";
  });

  bn.forEach(b => {
    b.style.display = (b.style.display === "none") ? "inline" : "none";
  });
}


// SMOOTH SCROLL (for anchor links)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// ACTIVE NAV HIGHLIGHT
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});


// SIMPLE FADE-IN ON SCROLL
const elements = document.querySelectorAll(".section-block, .card");

window.addEventListener("scroll", () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const screenHeight = window.innerHeight;

    if (position < screenHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// INITIAL STYLE FOR ANIMATION
elements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = "translateY(20px)";
  el.style.transition = "0.5s ease";
});

document.querySelectorAll(".clickable").forEach(card => {
  card.addEventListener("click", () => {
    const details = card.querySelector(".details");
    details.style.display = (details.style.display === "block") ? "none" : "block";
  });
});

const dois = [
  "10.3945/cdn.123.456", 
  "10.1016/j.vaccine.2022.01.001"
];

const container = document.getElementById("publications");

dois.forEach(doi => {
  fetch(`https://api.crossref.org/works/${doi}`)
    .then(res => res.json())
    .then(data => {
      const item = data.message;

      const div = document.createElement("div");
      div.className = "section-block";

      div.innerHTML = `
        <h3>${item.title[0]}</h3>
        <p>${item.author.map(a => a.family).join(", ")}</p>
        <p>${item["container-title"][0]}</p>
        <a href="${item.URL}" target="_blank">View</a>
      `;

      container.appendChild(div);
    });
});

