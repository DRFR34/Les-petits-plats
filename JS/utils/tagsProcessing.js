//== Functions definitions

// eslint-disable-next-line no-unused-vars

/**
 * 
 * @calledBy :
 * @calls : {
 *      createTag()
 *      dropdownItemsActivation()
 * }
 * 
 */
// eslint-disable-next-line no-unused-vars
function dropdownItemsSelecting() {
    const filterDropdownItems = document.querySelectorAll('.filterDropdownItem');
    
    //  Places Listeners on dropdowns' <li>s
    filterDropdownItems.forEach(filterDropdownItem => {
        filterDropdownItem.addEventListener('click', (event) => {
            //  Store a reference to the clicked item
            const clickedItem = event.target;

            addItemInTagSet(clickedItem);

            refreshWithNewCriterias();


            //  clear searchedWordsGrid
            searchedWordsGrid.innerHTML = ``;

            //  refresh cards grid and dropdowns
            selectedTagsSet.forEach((selectedTag) => {
                createTag(selectedTag);
            });

            selectedTagsSet.forEach((selectedTag) => {
                const filterIngredientsList = document.querySelectorAll('#filterIngredientsList .filterDropdownItem');

                const filterAppliancesList = document.querySelectorAll('#filterAppliancesList .filterDropdownItem');

                const filterUstensilsList = document.querySelectorAll('#filterUstensilsList .filterDropdownItem');

                dropdownItemsActivation(filterIngredientsList, selectedTag);
                dropdownItemsActivation(filterAppliancesList, selectedTag);
                dropdownItemsActivation(filterUstensilsList, selectedTag);
                dropdownItemsDeselecting()
            });
        });
    });
}


function dropdownItemsActivation(filterItemsList, selectedTag) {
    filterItemsList.forEach(item => {
        if (normalizeString(item.textContent) === normalizeString(selectedTag)) {
            item.classList.add('isFilterCriteria');
            item.parentElement.prepend(item);
        }
    });
}


/**
 * 
 * @param {DOMElement} filterDropdownItem 
 */
function createTag(filterDropdownItem) {
    let searchedWordTag = document.createElement('div');
    searchedWordTag.className = 'searchedWordTag';
    searchedWordTag.innerHTML = `
   <span class="searchedWord">${filterDropdownItem}</span>
   <span class="closeOrDeleteTag">&#x2A2F;</span>
   `
    searchedWordsGrid.appendChild(searchedWordTag);

    closeTagListener()
}


/**
 * @modify : 
 *  selectedTagsSet
 * @calledBy 
 *  + tagProcessing()}
 * @calls : 
 *  + refreshItemListOrder (filterDropdownItem)
 */
function closeTagListener() {
    const allTagsCloseBtn = document.querySelectorAll('.closeOrDeleteTag');
    allTagsCloseBtn.forEach((tagCloseBtn) => {
        tagCloseBtn.addEventListener('click', (event) => {
            let tagText = event.target.parentElement.querySelector('.searchedWord').textContent;

            selectedTagsSet.delete(tagText);
            // refreshWithNewCriterias();
            refreshWithNewCriterias();

            const filterDropdownItems = document.querySelectorAll('.filterDropdownItem');
            filterDropdownItems.forEach(filterDropdownItem => {
                if (normalizeString(filterDropdownItem.textContent) === normalizeString(tagText)) {
                    filterDropdownItem.classList.remove('isFilterCriteria');

                    refreshItemListOrder(filterDropdownItem);

                    event.target.parentElement.remove();
                }
            });
        });
    });

}


function dropdownItemsDeselecting() {
    const DropdownItemsCloseBtns = document.querySelectorAll('.isFilterCriteria');
    DropdownItemsCloseBtns.forEach(DropdownItemCloseBtn => {
        DropdownItemCloseBtn.addEventListener('click', (event) => {
            //  Store a reference to the clicked item
            const clickedItemCloseBtn = event.target;

            selectedTagsSet.delete(clickedItemCloseBtn.textContent);
            //  refresh cards grid
            // refreshWithNewCriterias();
            refreshWithNewCriterias();

            //  reinit grid
            searchedWordsGrid.innerHTML = ``;

            selectedTagsSet.forEach((selectedTag) => {
                createTag(selectedTag);
            });
        });
    });
}


function refreshItemListOrder(filterDropdownItem) {
    let parentUl = filterDropdownItem.parentElement.querySelectorAll('.filterDropdownItem');
    let parentUlArray = Array.from(parentUl);

    //  Sort the items
    parentUlArray.sort((a, b) => {
        
        //  Place items with 'isFilterCriteria' class at the top
        if (a.classList.contains('isFilterCriteria')) return -1;
        if (b.classList.contains('isFilterCriteria')) return 1;

        //  For items without 'isFilterCriteria' class, sort alphabetically
        return a.textContent.localeCompare(b.textContent);
    });

    //  Append sorted items back to the parent
    // const parent = filterDropdownItem[0].parentNode;
    const parent = filterDropdownItem.parentElement;
    parentUlArray.forEach(item => parent.appendChild(item));

}

