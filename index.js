let listContent = '';
let listNote;
let LISTITEMS = [];

if (localStorage.length > 0){
  for (let i = 0; i < localStorage.length; i++){
    LISTITEMS.push(JSON.parse(localStorage.getItem(i)));
    console.log('list filled from localStorage');
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
  o.subList = [];
  o.note = '';
  LISTITEMS.push(o);
  console.log('item added...');
}

function addSubList(){

}

function addNote(){

}

function populateList(){
  listContent = '';

  for (let i = 0; i < LISTITEMS.length; i++){
    if (LISTITEMS[i].note == undefined){
      listNote = '';
    } else {
      listNote = `<p>${LISTITEMS[i].note}</p>`;
    };

    listContent = listContent + `<li class="list-item ${LISTITEMS[i].checked ? 'strikethrough' : ''}">${LISTITEMS[i].item}${listNote}<span class="btn-group"><button type="button" class="add-note fas fa-plus"></button><button type="button" class="complete-item fas fa-check"></button><button type="button" class="delete-item fas fa-trash"></button></span></li>`;
  };
  
  return listContent;
}

function renderList(content){
  $('#itemList').html(content);
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
  });

  $('main').on('click', '.add-note', function(event){
    let index = $(event.target).closest('li').index();
    LISTITEMS[index].note = 'testing';
    console.log(`note added: ${LISTITEMS[index].note}`)
    renderList(populateList());
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

function toDoLoop(){
  initEventListeners();
  setInterval(renderDateTime, 1000);
  setInterval(syncLocalStorage, 600000);
  renderList(populateList());
};

$(toDoLoop());
