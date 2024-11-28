document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission if validation fails
    if (!validateForm()) {
    } else {
      const nameInput = document.getElementById("name").value.trim();
      alert(`Thank you for submitting, ${nameInput}!`);
      window.location.href = "../index.html";
    }
  });

  function validateForm() {
    let x = document.forms["contact"]["name"].value;
    if (x == "") {
      alert("Please enter your name");
      return false;
    }
    let y = document.forms["contact"]["email"].value;
    if (y == "") {
      alert("Please enter an email");
      return false;
    }
    let z = document.forms["contact"]["message"].value;
    if (z == "") {
      alert("Please enter a message");
      return false;
    }
    return true;
  }
});


