'use strict';

const apiKey = '29bKb1Igx9ZUQIEUd6IcWHtTwdq0wFzMusraShkQ';

const searchURL = 'https://developer.nps.gov/api/v1/parks';

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the articles array, stopping at the max number of results
  for (let i = 0; i < responseJson.data.length & i< maxResults ; i++){
    //description, and image
    $('#results-list').append(
      `<li>
      <h3>${responseJson.data[i].fullName}</h3>
      <p><a href="${responseJson.data[i].url}" target="_blank">${responseJson.data[i].name}</a></p>
      <h3>State(s):${responseJson.data[i].states}</h3>
      <p>${responseJson.data[i].description}</p>
      <p><a href="${responseJson.data[i].directionsUrl}" target="_blank">Click for directions</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getParks(searchState, maxResults=10) {

  const url = searchURL + '?' + 'stateCode=' + searchState + '&limit=' + maxResults+'&api_key=' +apiKey;

  console.log(url);

  /*const options = {
    headers: new Headers({
      "X-Api-Key": apiKey})
  };*/

  /*const options = {
    "X-Api-Key": apiKey
  }*/

  fetch(url)
    .then(response => {

      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    console.log(searchTerm);
    const searchState = searchTerm.split(',');
   console.log(searchState);
    const maxResults = $('#js-max-results').val();
    getParks(searchState, maxResults);
  });
}

$(watchForm);