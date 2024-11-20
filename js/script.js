// Disney API from -> https://disneyapi.dev/
window.addEventListener('load', dictionary());
document.getElementById("search-btn2").addEventListener("click", () => DisneyAPI());

let currentPage = 1;

function dictionary(page = 1) {
    fetch(`https://api.disneyapi.dev/character?page=${page}`)
    .then(response => response.json())
    .then(data => {
        const cardContainer = document.getElementById("cha-card");
        cardContainer.innerHTML = ""; 
        
        if (data.data && data.data.length > 0) {
            data.data.forEach(character => {
                const id = character._id;
                // console.log(id);
                // showDetails(character); 
                const characterCard = document.createElement("div");
            
                let imageUrl;
                if (!character.imageUrl) {
                    imageUrl = 'https://via.placeholder.com/500?text=Sorry,+No+Image'
                }   else {
                    imageUrl = character.imageUrl
                }

                characterCard.innerHTML = `<div class="col mb-4">
                                                <div class="custom-card">
                                                    <img src="${imageUrl}" class="custom-card-img" alt="${character.name}">
                                                    <div class="custom-card-body">
                                                        <h5 class="custom-card-title">${character.name}</h5>
                                                        <button class="custom-btn" id="${id}" onClick="showDetails(id)">Details</button>
                                                    </div>
                                                </div>
                                            </div>`
                                

                
                cardContainer.appendChild(characterCard);
            });

            // navigation buttons
            const prevBtn = document.getElementById('prev-btn');
            const nextBtn = document.getElementById('next-btn');
            prevBtn.style.display = page > 1 ? 'inline-block' : 'none';
            nextBtn.style.display = page < 149 ? 'inline-block' : 'none';

    } else {
        cardContainer.innerHTML = `<p>No character found with that name. Please try again.</p>`;
    }
    })
    .catch(error => {
    console.error("Error fetching character:", error);
    });
}


function DisneyAPI() {
    const characterName = document.getElementById('cname2').value;
    console.log(characterName);
    if (characterName) {
    fetch(`https://api.disneyapi.dev/character?name=${characterName}`)
        .then(response => response.json())
        .then(data => {
            const cardContainer = document.getElementById("cha-card");
            cardContainer.innerHTML = ""; 
            // console.log(data.data);

            if (data.data && data.data.length > 0) {
                data.data.forEach(character => {
                    const id = character._id;
                    // console.log(id);
                    // showDetails(character); 
                    const characterCard = document.createElement("div");

                    let imageUrl;
                    if (!character.imageUrl) {
                        imageUrl = 'https://via.placeholder.com/500?text=Sorry,+No+Image'
                    }   else {
                        imageUrl = character.imageUrl
                    }

                    characterCard.innerHTML = `<div class="col mb-4">
                                                    <div class="custom-card h-100">
                                                        <img src="${character.imageUrl}" class="custom-card-lg-img" alt="${character.name}">
                                                        <div class="custom-card-body">
                                                            <h5 class="custom-card-title">${character.name}</h5>
                                                            <button class="custom-btn" id="${id}" onClick="showDetails(id)">Details</button>
                                                        </div>
                                                    </div>
                                                </div>`
                                    
                                        
                    cardContainer.appendChild(characterCard);
                });
                // Hide navigation buttons during filtered search
                document.getElementById('prev-btn').style.display = 'none';
                document.getElementById('next-btn').style.display = 'none';
            } else {
                cardContainer.innerHTML = `<p>No character found with that name. Please try again.</p>`;
            }
        })
        .catch(error => {
        console.error("Error fetching character:", error);
        });
    } else {
    alert("Please enter a character name.");
    }
};

function showDetails(id) {
    const cid = id;
    console.log(cid);
    localStorage.clear();
    localStorage.setItem("characterId", cid);
    window.location.href = "../detail.html";
}

document.getElementById('prev-btn').addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        dictionary(currentPage);
    }
});

document.getElementById('next-btn').addEventListener("click", () => {
    currentPage++;
    dictionary(currentPage);
});

// const scrolled = document.getElementById('navbar-scrolled');
// scrolled.style.display = "none"

// document.addEventListener('DOMContentLoaded', function() {
//     window.addEventListener('scroll', function() {
//         if (window.scrollY > 50) {
//             scrolled.style.display = "block"
//         } else {
//             scrolled.style.display = "none"
//         }
//     });
    
// });
