let listContent = '';

let LISTITEMS = [
  {
    item: 'task 1',
    checked: false,
  },
  {
    item: 'thing 2',
    checked: true,
  },
];

function addNewItem(item){
  let o = new Object();
  o.item = item;
  o.checked = false;
  LISTITEMS.push(o);
};

function populateList(){
  listContent = '';
  for (let i = 0; i < LISTITEMS.length; i++){
    listContent = listContent + `<li class='list-item'><button type="button" class="complete-item fas fa-check"></button>${LISTITEMS[i].item}<button type="button" class="delete-item fas fa-times"></button></li>`;
  };
  return listContent;
};

function renderList(content){
  $('#itemList').html(content);
};

function completeItem(){
  // addClass strikethrough to selected item
};

function deleteItem(){
  // remove selected item
};

function initEventListeners(){
  $('main').on('click', '.newItem', function(event){
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
  renderList(populateList());
};

$(toDoLoop());