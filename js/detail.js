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

// function displayData(data) {
//   cImg.innerHTML = `<img src="${data.data.imageUrl}" alt="${data.data.imageUrl}">`;
//   cName.innerHTML = `${data.data.name}`;
//   cMovie.innerHTML = `${data.data.films}`;
//   cTv.innerHTML = `${data.data.tvShows}`;
//   cUrl.innerHTML = `<a href="${data.data.sourceUrl}" class="custom-btn" target="_blank">Go to Disney Wiki!</a>`;
// }



window.addEventListener('load', async function () {
  const characterId = localStorage.getItem('characterId');
  if (characterId) {
      await DisneyAPI(characterId);
      truncateContent('cMovie');
      truncateContent('cTv');
  }
});

async function DisneyAPI(query) {
  const response = await fetch(`https://api.disneyapi.dev/character/${query}`);
  const data = await response.json();
  displayData(data);
}

function displayData(data) {
  document.getElementById('cImg').innerHTML = `<img src="${data.data.imageUrl}" alt="${data.data.name}" class="img-fluid rounded">`;
  document.getElementById('cName').innerHTML = `${data.data.name}`;
  const filmsContent = data.data.films.length > 0 ? data.data.films.join(', ') : 'No films available';
  const tvShowsContent = data.data.tvShows.length > 0 ? data.data.tvShows.join(', ') : 'No TV shows available';
  document.getElementById('cMovie').innerHTML = filmsContent;
  document.getElementById('cTv').innerHTML = tvShowsContent;
  document.getElementById('cMovie').setAttribute('data-full-content', filmsContent);
  document.getElementById('cTv').setAttribute('data-full-content', tvShowsContent);
  document.getElementById('cUrl').innerHTML = `<a href="${data.data.sourceUrl}" class="custom-btn" target="_blank">Go to Disney Wiki!</a>`;
}

function toggleContent(elementId, button) {
  const contentElement = document.getElementById(elementId);
  if (!contentElement) return;
  const fullContent = contentElement.getAttribute('data-full-content');
  const limit = 5;

  if (button.textContent.trim() === "View More") {
      contentElement.innerHTML = fullContent;
      button.textContent = "View Less";
  } else {
      const contentArray = fullContent.split(', ');
      contentElement.innerHTML = contentArray.slice(0, limit).join(', ') + (contentArray.length > limit ? ', ...' : '');
      button.textContent = "View More";
  }
}

function truncateContent(elementId) {
  const contentElement = document.getElementById(elementId);
  if (!contentElement) return;
  const fullContent = contentElement.innerHTML;
  const contentArray = fullContent.split(', ');
  const limit = 5;
  contentElement.setAttribute('data-full-content', fullContent);
  const button = document.getElementById(`${elementId}Button`);
  if (contentArray.length > limit) {
      contentElement.innerHTML = contentArray.slice(0, limit).join(', ') + ', ...';
      button.style.display = 'inline';
  } else {
      button.style.display = 'none';
  }
}