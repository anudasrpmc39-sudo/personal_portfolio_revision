document.addEventListener("DOMContentLoaded", function () {
  const search = document.getElementById("search");

  if (search) {
    search.addEventListener("keyup", function () {
      let filter = search.value.toLowerCase();
      let cards = document.querySelectorAll(".card");

      cards.forEach(card => {
        card.style.display = card.innerText.toLowerCase().includes(filter)
          ? "block"
          : "none";
      });
    });
  }
});
