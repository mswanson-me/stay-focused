let LISTITEMS = [];
const WEATHER_API = 'https://api.weather.gov/points/';
const WEATHER_KEY = 'thisFieldIntentionallyBlank';
let loc = '';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

/* Read existing list from localStorage, if one exists */
function loadExistingList(){
  if (localStorage.length > 0){
    for (let i = 0; i < localStorage.length; i++){
      LISTITEMS.push(JSON.parse(localStorage.getItem(i)));
    }
  };
}

/* Synchronizes localStorage with volatile LISTITEMS array */
function syncLocalStorage(){
  localStorage.clear();
  for (let i = 0; i < LISTITEMS.length; i++){
    let itemKey = i;
    let itemValue = JSON.stringify(LISTITEMS[i]);
    localStorage.setItem(itemKey, itemValue);
  };
}

/* Retrieves, formats, and renders date and time */
function renderDateTime(){
  let time = new Date();
  let year = time.getFullYear();
  let month = MONTHS[time.getMonth()];
  let day = time.getDate();
  let hours = time.getHours();
  let mins = time.getMinutes();
  let amPm = 'AM';
  
  if (hours > 12){
    hours = hours - 12;
    amPm = 'PM'
  };

  if (mins < 10){
    mins = '0' + mins;
  };

  $('.date').html(`${month} ${day}, ${year} <br /> ${hours}:${mins} ${amPm}`);
}

function renderWeather(data){
  const today = data.properties.periods[0];
  $('.weather').html(`High: ${today.temperature}${today.temperatureUnit} <br /> ${today.shortForecast} <br /> Wind: ${today.windDirection} ${today.windSpeed}`);
  console.log(today);
}

function getForecast(data){
  const settings = {
    url: data.properties.forecast,
    dataType: 'json',
    type: 'GET',
    success: renderWeather,
  };
  $.ajax(settings);
  console.log(data.properties.forecast);
}

function getWeather(query){
  const settings = {
    url: query,
    dataType: 'json',
    type: 'GET',
    success: getForecast,
  };
  $.ajax(settings);
}

navigator.geolocation.getCurrentPosition(function(position) {
  loc = position.coords.latitude + ',' + position.coords.longitude;
  let weatherRequest = WEATHER_API + loc;
  getWeather(weatherRequest);
});

/* Creates new item object and pushes it to LISTITEMS array */
function addNewItem(item){
  let itemObject = new Object();
  itemObject.item = item;
  itemObject.checked = false;
  LISTITEMS.push(itemObject);
}

/* Aggregates LISTITEMS content into an HTML string */
function populateList(){
  let listContent = '';
  
  for (let i = 0; i < LISTITEMS.length; i++){
    listContent = listContent + `<li class="list-item ${LISTITEMS[i].checked ? 'strikethrough' : ''}">${LISTITEMS[i].item}<span class="btn-group"><button type="button" class="complete-item fas fa-check"></button><button type="button" class="delete-item fas fa-trash"></button></span></li>`;
  };
  
  return listContent;
}

/* Renders the HTML string (usually from populateList) to the page */
function renderList(content){
  $('#itemList').html(content);
};

/* Initializes event listeners */
function initEventListeners(){  
  $('main').on('click', '.newItem', function(event){
    event.preventDefault();
    let input = $('input').val();
    if (input == ''){
      return;
    } else {
      addNewItem(input);
      renderList(populateList());
      $('input').val('');
    };
  });

  $('main').on('click', '.complete-item', function(event){
    let strikeIndex = $(event.target).closest('li').index();
    LISTITEMS[strikeIndex].checked = !LISTITEMS[strikeIndex].checked;
    renderList(populateList());
  });

  $('main').on('click', '.delete-item', function(event){
    let spliceIndex = $(event.target).closest('li').index();
    LISTITEMS.splice(spliceIndex, 1);
    renderList(populateList());
  });

  window.onbeforeunload = function(e) {
    e.preventDefault();
    syncLocalStorage();
    return undefined;
  };
};

/* The main function for the page
*  Loads existing list, inits event handlers
*  Init intervals for updating time, periodically saving list
*  Performs the initial list render
*/
function toDoLoop(){
  loadExistingList();
  initEventListeners();
  setInterval(renderDateTime, 1000);
  setInterval(syncLocalStorage, 600000);
  renderList(populateList());
};

$(toDoLoop());
