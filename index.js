let listContent = '';
let LISTITEMS = [];
const time = new Date();

function renderDate(){
  $('.date').html(`${time.getMonth() + 1}/${time.getDate()}`);
}

function addNewItem(item){
  let o = new Object();
  o.item = item;
  o.checked = false;
  LISTITEMS.push(o);
  console.log(LISTITEMS);
}

function populateList(){
  listContent = '';
  for (let i = 0; i < LISTITEMS.length; i++){

  listContent = listContent + `<li class="list-item ${LISTITEMS[i].checked ? 'strikethrough' : ''}">${LISTITEMS[i].item}<span class="btn-group"><button type="button" class="complete-item fas fa-check"></button><button type="button" class="delete-item fas fa-times"></button></span></li>`;
  };
  console.log('populated...');
  return listContent;
}

function renderList(content){
  $('#itemList').html(content);
  console.log('rendered...');
};

function completeItem(){
  // addClass strikethrough to selected item
};

function deleteItem(){
  // remove selected item
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

  $('main').on('click', '.complete-item', function(event){
    let strikeIndex = $(event.target).closest('li').index();
    LISTITEMS[strikeIndex].checked = !LISTITEMS[strikeIndex].checked;
    console.log(LISTITEMS[strikeIndex].checked);
    $(event.target).closest('li').toggleClass('strikethrough');
  });

  $('main').on('click', '.delete-item', function(event){
    let spliceIndex = $(event.target).closest('li').index();
    LISTITEMS.splice(spliceIndex, 1);
    renderList(populateList());
  });
};

function toDoLoop(){
  console.log('initializing event listeners...');
  initEventListeners();
  renderDate();
  renderList(populateList());
};

$(toDoLoop());