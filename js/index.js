// Disney API from -> https://disneyapi.dev/

document.getElementById("search-btn1").addEventListener("click", () => DisneyAPI());

function DisneyAPI() {
  const cname = document.getElementById("cname1").value;
  sessionStorage.clear();
  sessionStorage.setItem("filteredCharacter", cname);
  window.location.href = "../dictionary.html";
}
