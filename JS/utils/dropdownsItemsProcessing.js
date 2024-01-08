/**
 * @function dropdownItemsSelecting
 * @description  When an item is clicked, it is added to the set of selected tags + the search results are updated
 * @listens filterDropdownItem//all All of the dropdown items.
 * @param {none} 
 * @calls  {function} addItemInTagSet 
 * @calls {function} refreshWithNewCriterias 
 * @calledBy {function} InsertRecipeCardInDom
 */
// eslint-disable-next-line no-unused-vars
function dropdownItemsSelecting() {
    const filterDropdownItems = document.querySelectorAll('.filterDropdownItem');

    //  Places Listeners on dropdowns' <li>s
    filterDropdownItems.forEach(filterDropdownItem => {

        filterDropdownItem.addEventListener('click', (event) => {
            const clickedItem = event.target;

            addItemInTagSet(clickedItem);            
            refreshWithNewCriterias();
        });
    });
}


/**
 * @function dropdownItemsDeselecting
 * @description When a close button is clicked, the parent item is removed from the selectedTagsSet. + Updates the search results
 * @listens DropdownItemCloseBtn//all
 * @param {none} 
 * @calls {method} .delete() - on selectedTagsSet
 * @calls {function} refreshWithNewCriterias 
 * @calledBy {function} updateSelectedDropdrownsItems.
 */
function dropdownItemsDeselecting() {
    const DropdownItemsCloseBtns = document.querySelectorAll('.isFilterCriteria');

    DropdownItemsCloseBtns.forEach(DropdownItemCloseBtn => {
        DropdownItemCloseBtn.addEventListener('click', (event) => {

            //  Store a reference to the clicked item
            const itemText = event.target.textContent;

            selectedTagsSet.delete(itemText);

            // //  refresh cards grid
            refreshWithNewCriterias();
        });
    });
}


/**
 * @function updateSelectedDropdrownsItems
 * @description Updates the selected items in the dropdowns. For each entry in selectedTagsSet, it displays the corresponding items as active in the 3 dropdowns lists. +  Adds them listeners to their close buttons
 * @param {none} 
 * @calls {function} displayItemsAsActive 
 * @calls {function} dropdownItemsDeselecting 
 * @calledBy {function} refreshWithNewCriterias
 */
// eslint-disable-next-line no-unused-vars
function updateSelectedDropdrownsItems() {

    selectedTagsSet.forEach((selectedTag) => {
        const filterIngredientsList = document.querySelectorAll('#filterIngredientsList .filterDropdownItem');

        const filterAppliancesList = document.querySelectorAll('#filterAppliancesList .filterDropdownItem');

        const filterUstensilsList = document.querySelectorAll('#filterUstensilsList .filterDropdownItem');

        displayItemsAsActive(filterIngredientsList, selectedTag);
        displayItemsAsActive(filterAppliancesList, selectedTag);
        displayItemsAsActive(filterUstensilsList, selectedTag);

        dropdownItemsDeselecting()
    });

}


/**
 * @function displayItemsAsActive
 * @description If an item's text content matches the SelectedTag text, adds it the 'isFilterCriteria' class . + Moves it to the top of the list.
 * @param {NodeListOf<HTMLElement>} filterItemsList - The list of items
 * @param {string} selectedTag - element in selectedTagSet
 * @calls {function} normalizeString 
 * @calledBy {function} updateSelectedDropdrownsItems 
 */
function displayItemsAsActive(filterItemsList, selectedTag) {
    filterItemsList.forEach(item => {
        if (normalizeString(item.textContent) === normalizeString(selectedTag)) {
            item.classList.add('isFilterCriteria');
            item.parentElement.prepend(item);
        }
    });
}


// function refreshListOrder(filterItemsList) {
//     let listChilds = filterItemsList.querySelectorAll('.filterDropdownItem');
//     let listChildsArray = Array.from(listChilds);

//     //  Sort the items
//     listChildsArray.sort((a, b) => {
//         //  Place items with 'isFilterCriteria' class at the top
//         if (a.classList.contains('isFilterCriteria')) return -1;
//         if (b.classList.contains('isFilterCriteria')) return 1;

        
//         //  For items without 'isFilterCriteria' class, sort alphabetically
//         return a.textContent.localeCompare(b.textContent), (a.classList.contains('isFilterCriteria').textContent).localeCompare((b.classList.contains('isFilterCriteria').textContent), 'fr'); 
//     });

//     //  Append sorted items back to the parent
//     // const itemParent = filterDropdownItem.parentElement;
//     listChildsArray.forEach(item => filterItemsList.appendChild(item));

// }


// function refreshItemListOrder(filterDropdownItem) {
//     let parentUl = filterDropdownItem.parentElement.querySelectorAll('.filterDropdownItem');
//     let parentUlArray = Array.from(parentUl);

//     //  Sort the items
//     parentUlArray.sort((a, b) => {
//         //  Place items with 'isFilterCriteria' class at the top
//         if (a.classList.contains('isFilterCriteria')) return -1;
//         if (b.classList.contains('isFilterCriteria')) return 1;

        
//         //  For items without 'isFilterCriteria' class, sort alphabetically
//         return a.textContent.localeCompare(b.textContent), (a.classList.contains('isFilterCriteria').textContent).localeCompare((b.classList.contains('isFilterCriteria').textContent), 'fr'); 
//     });

//     //  Append sorted items back to the parent
//     const itemParent = filterDropdownItem.parentElement;
//     parentUlArray.forEach(item => itemParent.appendChild(item));

// }