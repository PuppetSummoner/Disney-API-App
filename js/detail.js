// Assuming you've stored the character ID in session storage and want to use it to get the character details.

// First, retrieve the character ID from session storage
const characterId = localStorage.getItem('characterId');
const cImg = document.getElementById('cImg');
const cName = document.getElementById('cName');
const cMovie = document.getElementById('cMovie');
const cTv = document.getElementById('cTv');
const cUrl = document.getElementById('cUrl');

window.addEventListener('load', DisneyAPI(characterId));


async function DisneyAPI(query) {
  // console.log(`https://api.disneyapi.dev/character/${query}`)
      const response = await fetch(`https://api.disneyapi.dev/character/${query}`);
      const data = await response.json();
      // console.log(data);
      // chaName.innerHTML = "";
      // chaImg.innerHTML = "";
      displayData(data);
}
// function displayData(data) {
//   for (var i = 0; i < data.data.length; i++) {
//       const para = document.createElement("p"); //Create a p element to display the data
//       para.innerHTML = `${i}: ${data.data[i].name}`; //Add the first fact to the p element
//       const imgSrc = document.createElement("img"); //Create a p element to display the data
//       imgSrc.src = `${data.data[i].imageUrl}`
           
//       card.appendChild(para); //Append the p element to the facts div on the page
//       card.appendChild(imgSrc); //Append the p element to the facts div on the page
//       cardContainer.appendChild(card);
//   }
// }

function displayData(data) {
  cImg.innerHTML = `<img src="${data.data.imageUrl}" alt="${data.data.imageUrl}">`;
  cName.innerHTML = `${data.data.name}`;
  cMovie.innerHTML = `${data.data.films}`;
  cTv.innerHTML = `${data.data.tvShows}`;
  cUrl.innerHTML = `<a href="${data.data.sourceUrl}" class="btn btn-primary" target="_blank">Go to Disney Wiki!</a>`;

}


