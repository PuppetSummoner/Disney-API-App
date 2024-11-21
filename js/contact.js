document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent submitting default foam

    const nameInput = document.getElementById("name").value;
    alert(`Thank you for submitting, ${nameInput}!`);
  });
});
