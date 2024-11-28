/**
 * Character Details Page
 * Fetches and displays detailed information about a specific Disney character using its unique ID.
 */

// Retrieve the stored character ID from session storage
const characterId = sessionStorage.getItem('characterId');
const cImg = document.getElementById('cImg'); // Element for character image
const cName = document.getElementById('cName'); // Element for character name
const cMovie = document.getElementById('cMovie'); // Element for movies
const cTv = document.getElementById('cTv'); // Element for TV shows
const cUrl = document.getElementById('cUrl'); // Element for source URL

// Fetch and display character details when the page loads
window.addEventListener('load', async function () {
  const characterId = sessionStorage.getItem('characterId');
  if (characterId) {
    await DisneyAPI(characterId);
    truncateContent('cMovie');
    truncateContent('cTv');
  }
});

/**
 * DisneyAPI Function
 * Fetches detailed information about a character using its unique ID.
 * @param {string} query - The unique ID of the character to fetch.
 */
async function DisneyAPI(query) {
  const response = await fetch(`https://api.disneyapi.dev/character/${query}`);
  const data = await response.json();
  displayData(data); // Render the fetched data
}

/**
 * displayData Function
 * Populates the HTML elements with character details.
 * @param {Object} data - The fetched character data.
 */
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

/**
 * toggleContent Function
 * Toggles between displaying full content and truncated content for a specified HTML element.
 *
 * @param {string} elementId - The ID of the content container element.
 * @param {HTMLElement} button - The button element used to toggle content.
 */
function toggleContent(elementId, button) {
  // Get the content container element by ID
  const contentElement = document.getElementById(elementId);
  if (!contentElement) return; // Exit if the content element does not exist
  // Retrieve the full content from the 'data-full-content' attribute
  const fullContent = contentElement.getAttribute('data-full-content');
  const limit = 5; // Limit for the number of items displayed when truncated

  // Toggle logic based on the button's current text
  if (button.textContent.trim() === "View More") {
    // Show full content
      contentElement.innerHTML = fullContent;
      button.textContent = "View Less"; // Update button text
  } else {
    // Truncate content
    const contentArray = fullContent.split(', '); // Split the content into an array
    contentElement.innerHTML = contentArray.slice(0, limit).join(', ') + (contentArray.length > limit ? ', ...' : '');
    button.textContent = "View More"; // Update button text
  }
}

/**
 * truncateContent Function
 * Truncates the content of a specified HTML element to a limited number of items
 * and prepares a toggle button to display the full content if necessary.
 *
 * @param {string} elementId - The ID of the HTML element containing the content to be truncated.
 */
function truncateContent(elementId) {
  // Get the content element by its ID
  const contentElement = document.getElementById(elementId);
  if (!contentElement) return; // Exit if the content element does not exist
   // Retrieve the full content from the element's innerHTML
  const fullContent = contentElement.innerHTML; // Original content before truncation
  const contentArray = fullContent.split(', '); // Split the content into an array using ", " as a delimiter
  const limit = 5; // Maximum number of items to display when truncated

   // Store the full content in the 'data-full-content' attribute for later use
  contentElement.setAttribute('data-full-content', fullContent);

  // Get the associated toggle button using the elementId with "Button" appended
  const button = document.getElementById(`${elementId}Button`);
  if (!button) return; // Exit if the toggle button does not exist

  // Check if content exceeds the limit
  if (contentArray.length > limit) {
     // If the content exceeds the limit, truncate and show the button
      contentElement.innerHTML = contentArray.slice(0, limit).join(', ') + ', ...';
      button.style.display = 'inline'; // Make the button visible
  } else {
    // If the content is within the limit, hide the button
      button.style.display = 'none';
  }
}