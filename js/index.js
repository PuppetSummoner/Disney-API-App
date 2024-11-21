// Disney API from -> https://disneyapi.dev/

/**
 * DisneyAPI Fetch and Display
 * Fetches character data from the Disney API based on user input and renders the results dynamically on the page.
 * Includes functionality for detailed character navigation.
 * No parent classes or dependencies required.
 */

// Event listener for the search button
document.getElementById("search-btn1").addEventListener("click", () => DisneyAPI());

/**
 * DisneyAPI Function
 * Fetches characters from the Disney API using the input value, renders the first character in a main card, and others in a secondary grid.
 */
function DisneyAPI() {
  const characterName = document.getElementById('cname1').value; // User's search input
  console.log(characterName);

  if (characterName) {
      fetch(`https://api.disneyapi.dev/character?name=${characterName}`)
          .then(response => response.json())
          .then(data => {
              const mainCardContainer = document.getElementById("cha-card1"); // Container for the first result
              mainCardContainer.innerHTML = "";
              
              const secondaryCardContainer = document.getElementById("cha-card2"); // Container for subsequent results
              secondaryCardContainer.innerHTML = "";

              // Render character cards
              if (data.data && data.data.length > 0) {
                  data.data.forEach((character, index) => {
                      const id = character._id; // Character's unique ID
                      let imageUrl = character.imageUrl 
                          ? character.imageUrl 
                          : 'https://via.placeholder.com/500?text=Sorry,+No+Image';

                      let characterCard;

                      // First character rendered in a detailed card
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
                      } else {
                        // Other characters rendered in smaller cards
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
                // No results found
                mainCardContainer.innerHTML = `<p class="text-center text-danger">No character found with that name. Please try again.</p>`;
              }
          })
          .catch(error => {
              console.error("Error fetching character:", error); // Log errors
          });
  } else {
      alert("Please enter a character name."); // Alert user if input is empty
  }
}

/**
 * showDetails Function
 * Navigates to the details page, storing the selected character's ID in localStorage.
 * 
 * @param {string} id - The unique identifier of the selected character.
 */
function showDetails(id) {
  const cid = id;
  console.log(cid); // Log the character ID
  localStorage.clear();
  localStorage.setItem("characterId", cid); // Store the character ID
  window.location.href = "../detail.html"; // Navigate to the details page
}