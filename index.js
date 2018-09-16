let listContent = '';
let LISTITEMS = [];

if (localStorage.length > 0){
  for (let i = 0; i < localStorage.length; i++){
    LISTITEMS.push(JSON.parse(localStorage.getItem(i)));
  }
};

function syncLocalStorage(){
  localStorage.clear();
  for (let i = 0; i < LISTITEMS.length; i++){
    let itemKey = i;
    let itemValue = JSON.stringify(LISTITEMS[i]);
    localStorage.setItem(itemKey, itemValue);
  };
}

function renderDateTime(){
  let time = new Date();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hours = time.getHours();
  let mins = time.getMinutes();
  
  if (mins < 10){
    mins = '0' + mins;
  }

  $('.date').html(`${month}/${day} ${hours}:${mins}`);
}

function addNewItem(item){
  let o = new Object();
  o.item = item;
  o.checked = false;
  LISTITEMS.push(o);
  console.log('item added...');
}

function populateList(){
  listContent = '';
  
  for (let i = 0; i < LISTITEMS.length; i++){
    listContent = listContent + `<li class="list-item ${LISTITEMS[i].checked ? 'strikethrough' : ''}">${LISTITEMS[i].item}<span class="btn-group"><button type="button" class="complete-item fas fa-check"></button><button type="button" class="delete-item fas fa-trash"></button></span></li>`;
  };
  
  console.log('populated...');
  return listContent;
}

function renderList(content){
  $('#itemList').html(content);
  console.log('rendered...');
};

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
    console.log('add item clicked...');
  });

  $('main').on('click', '.complete-item', function(event){
    let strikeIndex = $(event.target).closest('li').index();
    LISTITEMS[strikeIndex].checked = !LISTITEMS[strikeIndex].checked;
    console.log('item completed...');
    renderList(populateList());
  });

  $('main').on('click', '.delete-item', function(event){
    let spliceIndex = $(event.target).closest('li').index();
    LISTITEMS.splice(spliceIndex, 1);
    console.log('item deleted...');
    renderList(populateList());
  });

  window.onbeforeunload = function(e) {
    e.preventDefault();
    syncLocalStorage();
    return undefined;
  };
};

function toDoLoop(){
  console.log('initializing event listeners...');
  initEventListeners();
  setInterval(renderDateTime, 1000);
  setInterval(syncLocalStorage, 600000);
  renderList(populateList());
};

$(toDoLoop());
