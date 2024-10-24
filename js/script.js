window.addEventListener('load', refresh());
document.getElementById("search-btn").addEventListener("click",DisneyAPI);

function refresh() {
    fetch(`https://api.disneyapi.dev/character`)
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
            characterCard.classList.add("card");
            characterCard.innerHTML = `<h3>${character.name}</h3>
                                      <img src="${character.imageUrl}" alt="${character.name}">
                                      <button id="${id}" onClick="showDetails(id)">details</button>`;
            cardContainer.appendChild(characterCard);
        });



        } else {
            cardContainer.innerHTML = `<p>No character found with that name. Please try again.</p>`;
        }
        })
        .catch(error => {
        console.error("Error fetching character:", error);
        });
}


function DisneyAPI() {
    const characterName = document.getElementById("cname").value;
    if (characterName) {
    fetch(`https://api.disneyapi.dev/character?name=${characterName}`)
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
                characterCard.classList.add("card");
                // characterCard.innerHTML = `<h3>${character.name}</h3>
                //                             <img src="${character.imageUrl}" alt="${character.name}">
                //                             <button id="${id}" onClick="showDetails(id)">details</button>`;
                                            
                // characterCard.innerHTML = `<div class="card" style="width: 18rem;">
                //                            <img src="${character.imageUrl}" class="card-img-top" alt="${character.name}">
                //                             <div class="card-body">
                //                              <h3 class="card-title">${character.name}</h3>
                //                              <button class="btn btn-primary" id="${id}" onClick="showDetails(id)">details</button>
                //                             </div>
                //                            </div>`;

                characterCard.innerHTML = `<div class="col">
                                                <div class="card border-0">
                                                    <img src="${character.imageUrl}" class="card-img-top post-image" alt="${character.name}">
                                                    <div class="card-body">
                                                        <h5 class="card-title">${character.name}</h5>
                                                        <button class="btn btn-primary" id="${id}" onClick="showDetails(id)">details</button>
                                                    </div>
                                                </div>
                                            </div>`
                                      
                cardContainer.appendChild(characterCard);
                scrolled.style.display = "block"
            });
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



// function DisneyAPI() {
//     const characterName = document.getElementById("cname").value;
//     if (characterName) {
//     fetch(`https://api.disneyapi.dev/character?name=${characterName}`)
//         .then(response => response.json())
//         .then(data => {
//         const cardContainer = document.getElementById("cha-card");
//         cardContainer.innerHTML = ""; 
        
//         if (data.data && data.data.length > 0) {
//             data.data.forEach(character => {
//                 const id = character._id;
//             const characterCard = document.createElement("div");
//             characterCard.classList.add("card");
//             characterCard.innerHTML = `
//                 <h3><a href="#">${character.name}</a></h3>
//                 <img src="${character.imageUrl}" alt="${character.name}">
//                 <button id="${id}" onClick="showDetails(id)">details</button>`;
//             cardContainer.appendChild(characterCard);
//             });
//         } else {
//             cardContainer.innerHTML = `<p>No character found with that name. Please try again.</p>`;
//         }
//         })
//         .catch(error => {
//         console.error("Error fetching character:", error);
//         });
//     } else {
//     alert("Please enter a character name.");
//     }
// };


//   <p>Films: ${character.films.join(", ")}</p>


const scrolled = document.getElementById('navbar-scrolled');
scrolled.style.display = "none"

document.addEventListener('DOMContentLoaded', function() {
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            scrolled.style.display = "block"
        } else {
            scrolled.style.display = "none"
        }
    });
    
});
