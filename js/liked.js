function loadLikedCharacters() {
    const likedCharacters = JSON.parse(localStorage.getItem("likedCharacters")) || [];
    const likedContainer = document.getElementById("liked-characters");
    const removeAllButton = document.getElementById("removeAll");

    if (likedCharacters.length > 0) {
        likedContainer.innerHTML = ""; // Clear previous content if any

        likedCharacters.forEach(character => {
            const characterCard = document.createElement("div");
            characterCard.classList.add("col", "mb-4");

            characterCard.innerHTML = `<div class="custom-card h-100">
                                          <img src="${character.imageUrl}" class="custom-card-lg-img" alt="${character.name}">
                                          <div class="custom-card-body">
                                              <h5 class="custom-card-title">${character.name}</h5>
                                              <button class="btn btn-danger remove-btn" data-id="${character.id}">Remove</button>
                                          </div>
                                      </div>`;

            likedContainer.appendChild(characterCard);
        });

        // Add event listeners for individual remove buttons
        const removeButtons = document.querySelectorAll('.remove-btn');
        removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const characterId = e.target.dataset.id;
                removeCharacter(characterId);
            });
        });

        // Show 'Remove All' button
        if (removeAllButton) {
            removeAllButton.style.display = 'block';
        }

    } else {
        likedContainer.innerHTML = `<p>No liked characters yet. Go back and like some characters!</p>`;

        // Hide 'Remove All' button
        if (removeAllButton) {
            removeAllButton.style.display = 'none';
        }
    }
}

document.getElementById("removeAll").addEventListener("click", () => removeAllCharacters());

function removeCharacter(characterId) {
    let likedCharacters = JSON.parse(localStorage.getItem("likedCharacters")) || [];
    likedCharacters = likedCharacters.filter(character => character.id !== characterId);
    localStorage.setItem("likedCharacters", JSON.stringify(likedCharacters));
    loadLikedCharacters();
}

function removeAllCharacters() {
    localStorage.removeItem("likedCharacters");
    loadLikedCharacters();
}

// Call this function only when on the liked page
if (window.location.pathname.includes("liked.html")) {
    loadLikedCharacters();
}
