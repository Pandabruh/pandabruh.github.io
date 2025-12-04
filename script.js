/* ================== THEME TOGGLE ================== */
function toggleTheme() {
    const body = document.body;
    const newTheme = body.dataset.theme === "light" ? "dark" : "light";
    body.dataset.theme = newTheme;
    localStorage.setItem("theme", newTheme);
}
(function() {
    const saved = localStorage.getItem("theme");
    if(saved) document.body.dataset.theme = saved;
})();

/* ================== FADE IN ================== */
const faders = document.querySelectorAll('.fade');
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('visible'); });
});
faders.forEach(el => observer.observe(el));

/* ================== BACK TO TOP ================== */
const topBtn = document.getElementById("topBtn");
window.onscroll = () => { topBtn.style.display = window.scrollY > 500 ? "block" : "none"; };

/* ================== GALLERY MODAL ================== */
document.addEventListener("DOMContentLoaded", () => {
    const images = document.querySelectorAll(".gallery img");
    const modal = document.createElement("div");
    modal.classList.add("modal");
    const modalImg = document.createElement("img");
    modal.appendChild(modalImg);
    document.body.appendChild(modal);

    images.forEach(img => {
        img.addEventListener("click", () => {
            modalImg.src = img.src;
            modal.classList.add("show");
        });
    });

    modal.addEventListener("click", () => modal.classList.remove("show"));
});
