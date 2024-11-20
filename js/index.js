// Disney API from -> https://disneyapi.dev/

document.getElementById("search-btn1").addEventListener("click", () => DisneyAPI());

// function DisneyAPI() {
//   const cname = document.getElementById("cname1").value;
//   sessionStorage.clear();
//   sessionStorage.setItem("filteredCharacter", cname);
//   window.location.href = "../dictionary.html";
// }


function DisneyAPI() {
  const characterName = document.getElementById('cname1').value;
  console.log(characterName);

  if (characterName) {
      fetch(`https://api.disneyapi.dev/character?name=${characterName}`)
          .then(response => response.json())
          .then(data => {
              const mainCardContainer = document.getElementById("cha-card1");
              mainCardContainer.innerHTML = "";
              
              const secondaryCardContainer = document.getElementById("cha-card2");
              secondaryCardContainer.innerHTML = "";

              if (data.data && data.data.length > 0) {
                  data.data.forEach((character, index) => {
                      const id = character._id;
                      let imageUrl = character.imageUrl 
                          ? character.imageUrl 
                          : 'https://via.placeholder.com/500?text=Sorry,+No+Image';

                      let characterCard;

                      if (index === 0) {
                          characterCard = `<div class="card">
                                            <div class="row g-0 align-items-center h-100">
                                              <div class="col-md-5">
                                                <img src="${imageUrl}" alt="${character.name}" class="img-fluid rounded-start" style="width: 100%; height: 100%; object-fit: cover;">
                                              </div>
                                              <div class="col-md-7 d-flex flex-column justify-content-center ps-3">
                                                <div class="card-body">
                                                  <h5 class="card-title fs-1">${character.name}</h5>
                                                  <button class="custom-btn btn btn-primary mt-3" id="${id}" onClick="showDetails('${id}')">Details</button>
                                                </div>
                                              </div>
                                            </div>
                                          </div>`;
                          mainCardContainer.innerHTML = characterCard;
                      } 
                      else {
                          characterCard = `
                              <div class="col mb-4">
                                  <div class="custom-card h-100">
                                      <img src="${imageUrl}" class="custom-card-img" alt="${character.name}">
                                      <div class="custom-card-body">
                                          <h5 class="custom-card-title">${character.name}</h5>
                                          <button class="custom-btn btn btn-primary mt-3" id="${id}" onClick="showDetails('${id}')">Details</button>
                                      </div>
                                  </div>
                              </div>`;
                          secondaryCardContainer.innerHTML += characterCard;
                      }
                  });
              } else {
                  mainCardContainer.innerHTML = `<p class="text-center text-danger">No character found with that name. Please try again.</p>`;
              }
          })
          .catch(error => {
              console.error("Error fetching character:", error);
          });
  } else {
      alert("Please enter a character name.");
  }
}

function showDetails(id) {
  const cid = id;
  console.log(cid);
  localStorage.clear();
  localStorage.setItem("characterId", cid);
  window.location.href = "../detail.html";
}