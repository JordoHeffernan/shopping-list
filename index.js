'use strict';

const STORE = [
  {name: "green apples", checked: false, hidden: false},
  {name: "red apples", checked: true, hidden: false},
  {name: "oranges", checked: false, hidden: false},
  {name: "milk", checked: true, hidden: false},
  {name: "brown bread", checked: false, hidden: false},
  {name: "white bread", checked: false, hidden: false},
  {name: "bread pudding", checked: true, hidden: false},
];

//create html element of an item in the store
function generateItemElement(item, itemIndex, template) {
  return `
    <li class="js-item-index-element  ${item.hidden ? "hidden" : ''}" data-item-index="${itemIndex}" >
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''} ">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}

//run generateItemElement function on all items in the STORE and join them into one string
function generateShoppingItemsString(shoppingList) {
  console.log("Generating shopping list element");

  const items = shoppingList.map((item, index) => generateItemElement(item, index));
  
  return items.join("");
}

// render the shopping list in the DOM
function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemsString(STORE);
  // insert that HTML into the DOM
  $('.js-shopping-list').html(shoppingListItemsString);
}


//add new item to store
function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({name: itemName, checked: false, hidden: false});
}

//when an item is submitted, run add to STORE function, reset input value, refresh list
function handleNewItemSubmit() {
  $('#js-shopping-list-form').submit(function(event) {
    event.preventDefault();
    console.log('`handleNewItemSubmit` ran');
    const newItemName = $('.js-shopping-list-entry').val();
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
  });
}

//provides index of item when their buttons are clicked
function getItemIndexFromElement(item) {
  const itemIndexString = $(item)
    .closest('.js-item-index-element')
    .attr('data-item-index');
  return parseInt(itemIndexString, 10);
}

//inverts checked-class of item
function toggleCheckedForListItem(itemIndex) {
  console.log("Toggling checked property for item at index " + itemIndex);
  STORE[itemIndex].checked = !STORE[itemIndex].checked;
}

//when check button is pressed, run toggle checked-class function 
function handleItemCheckClicked() {
  $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
    console.log('`handleItemCheckClicked` ran');
    const itemIndex = getItemIndexFromElement(event.currentTarget);
    toggleCheckedForListItem(itemIndex);
    renderShoppingList();
  });
}

//remove the item from the store when it's delete button is pushed
function handleDeleteItemClicked() {
    console.log('handlde Delete Function ran')
    $('.js-shopping-list').on('click', `.js-item-delete`, function(event) {
        const itemIndex = getItemIndexFromElement(event.currentTarget);
        STORE.splice(itemIndex, 1);
        renderShoppingList();
});
};

//reads a switch to see if list should display all items in store or only
//items that are unchecked
function displayUncheckedOrAll() {
  console.log('displayUncheckedOrAll function ran')
  $('#js-shopping-list-form').find('.js-select').change(function(event){
  const selectedDisplay = $('.js-select').find(':selected').text()
  if (selectedDisplay === "Unchecked") {
    for (let i=0;i<STORE.length; i++) {
    if (STORE[i].checked === true) {
      STORE[i].hidden = true
      }
    }
  }

  if (selectedDisplay === "All") {
    for (let i=0;i<STORE.length; i++) {
      STORE[i].hidden = false
    }
  }

  if (selectedDisplay === "Items to Display") {
    for (let i=0;i<STORE.length; i++) {
      STORE[i].hidden = false
    }
  }
  renderShoppingList()
}
  )}

function displaySearched() {
  $('#js-shoping-list-search-form').submit(function(event) {
    event.preventDefault();
    console.log('displaySearched ran');
    const searchFor = $('#js-shoping-list-search-form :input').val();
    console.log(searchFor)
    ;
    for (let i=0;i<STORE.length; i++) {
    if (!STORE[i].name.includes(searchFor)) {
      STORE[i].hidden = true
    }
    if (STORE[i].name.includes(searchFor)) {
      STORE[i].hidden = false
    }

    
  }
    $('.js-shopping-list-search').val('')
    renderShoppingList();
  });
}

function editTitle() {
  //when user selects name of an item on the list, they can change it
}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the shopping list, and activating our individual functions
// that handle new item submission and user clicks on the "check" and "delete" buttons
// for individual shopping list items.
function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
  displayUncheckedOrAll()
  displaySearched()
  editTitle()
}

// when the page loads, call `handleShoppingList`
$(handleShoppingList);






//const lastdisplayed = $(".js-select").val()
//$(".js-select").val(lastdisplayed)