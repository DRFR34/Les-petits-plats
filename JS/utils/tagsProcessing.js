// const tag =`  
const seclectedTagsSet = new Set;
const searchedWordsGrid = document.querySelector("#searchedWordsGrid");

//== Functions
// eslint-disable-next-line no-unused-vars
// function dropdownItemsSelecting() {
//     const filterDropdownItems = document.querySelectorAll('.filterDropdownItem');
//             console.log('filterDropdownItems :',filterDropdownItems);
//             filterDropdownItems.forEach(filterDropdownItem => {
//                 filterDropdownItem.addEventListener('click', (event) => {


//                 // event.target.classList.add('isFilterCriteria');
//                 // event.target.parentElement.prepend(event.target);


//             seclectedTagsSet.add(event.target.textContent);

//              //  reinit grid
//             searchedWordsGrid.innerHTML =``;

//             seclectedTagsSet.forEach((seclectedTag) => {
//                 createTag(seclectedTag);



//                 filterDropdownItems.forEach (filterDropdownItem => {
//                     if(normalizeString(filterDropdownItem.textContent) === normalizeString(seclectedTag)) {
//                         filterDropdownItem.classList.add('isFilterCriteria');
//                         filterDropdownItem.parentElement.prepend(event.target);

//                         console.log('filterDropdownItem.parentElement:',filterDropdownItem.parentElement);

//                     }
//                 });


//             });

//         });
//     });
// }

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
    // console.log('filterDropdownItems :', filterDropdownItems);
    filterDropdownItems.forEach(filterDropdownItem => {
        filterDropdownItem.addEventListener('click', (event) => {
            //  Store a reference to the clicked item
            const clickedItem = event.target;

            seclectedTagsSet.add(clickedItem.textContent);
               console.log( 'dropdownItemsSelecting() ->seclectedTagsSet: ', seclectedTagsSet);
            //  refresh cards grid
            refreshWithNewCriterias();

            //  reinit grid
            searchedWordsGrid.innerHTML = ``;

            seclectedTagsSet.forEach((seclectedTag) => {
                createTag(seclectedTag);
            });

            seclectedTagsSet.forEach((seclectedTag) => {
                const filterIngredientsList = document.querySelectorAll('#filterIngredientsList .filterDropdownItem');

                const filterAppliancesList = document.querySelectorAll('#filterAppliancesList .filterDropdownItem');

                const filterUstensilsList = document.querySelectorAll('#filterUstensilsList .filterDropdownItem');

                dropdownItemsActivation(filterIngredientsList, seclectedTag);
                dropdownItemsActivation(filterAppliancesList, seclectedTag);
                dropdownItemsActivation(filterUstensilsList, seclectedTag);
                dropdownItemsDeselecting()
            });
        });
    });
}

function dropdownItemsActivation(filterItemsList, seclectedTag) {
    filterItemsList.forEach(item => {
        if (normalizeString(item.textContent) === normalizeString(seclectedTag)) {
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
 *  seclectedTagsSet
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

            seclectedTagsSet.delete(tagText);
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
    console.log('DropdownItemsCloseBtns :', DropdownItemsCloseBtns);

    DropdownItemsCloseBtns.forEach(DropdownItemCloseBtn => {
        DropdownItemCloseBtn.addEventListener('click', (event) => {
            //  Store a reference to the clicked item
            const clickedItemCloseBtn = event.target;

            seclectedTagsSet.delete(clickedItemCloseBtn.textContent);
            //  refresh cards grid
            refreshWithNewCriterias();

            //  reinit grid
            searchedWordsGrid.innerHTML = ``;

            seclectedTagsSet.forEach((seclectedTag) => {
                createTag(seclectedTag);
            });
        });
    });
}

function refreshWithNewCriterias() {
    const mainSearchInput = document.querySelector('#mainSearchInput');
    const recipesNb = document.querySelector('.recipesNb');
    const nothingFound = document.querySelector('#nothingFoundDiv');
    let mainSearchValue = normalizeString(mainSearchInput.value);

    functionalMainSearch(mainSearchValue);
    let dispalyedRecipes = document.querySelectorAll(".recipeCard");
    // console.log('dispalyedRecipes :', dispalyedRecipes);

    dispalyedRecipes.forEach((displayedRecipe) => {
        seclectedTagsSet.forEach((seclectedTag) => {

            // console.log('displayedRecipe.textContent:', displayedRecipe.textContent);

            if (!normalizeString(displayedRecipe.textContent).includes(normalizeString(seclectedTag))) {
                displayedRecipe.remove();
                
                // const recipesNb = document.querySelector('.recipesNb');
                // const nothingFound = document.querySelector('#nothingFound');


                let totalRecipes = recipesNb.textContent;
                const noRecipes = 0;
                totalRecipes -= 1;
                if (totalRecipes > 0) {
                    recipesNb.innerHTML = (`${totalRecipes}`);
                    nothingFound.className = ('');
                } else {
                    recipesNb.innerHTML = (`${noRecipes}`);
                    nothingFound.className = ('isVisible');

                }
            }
        });
    });
}


function refreshItemListOrder(filterDropdownItem) {
    let parentUl = filterDropdownItem.parentElement.querySelectorAll('.filterDropdownItem');
    let parentUlArray = Array.from(parentUl);
    // console.log('parentUl :', parentUl);
    // console.log('parentUlArray :', parentUlArray);
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