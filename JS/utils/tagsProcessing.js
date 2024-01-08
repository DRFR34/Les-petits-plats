//== Functions definitions

/**
 * @function createTag
 * @description Creates a new tag (DOM element). + Adds it in searchedWordsGrid. + Calls fn to add listeners on close tags buttons.
 * @param {string} filterDropdownItem - The text content from the related droptown item
 * @calls {function} addListenersToCloseTags 
 * @calledBy {updateTagsGrid} 
 */
function createTag(filterDropdownItem) {
    let searchedWordTag = document.createElement('div');
    searchedWordTag.className = 'searchedWordTag';
    searchedWordTag.innerHTML = `
   <span class="searchedWord">${filterDropdownItem}</span>
   <span class="closeOrDeleteTag">&#x2A2F;</span>
   `
    searchedWordsGrid.appendChild(searchedWordTag);

    addListenersToCloseTags()
}

/** 
* @function addListenersToCloseTags
* @description When a close button is clicked, the corresponding tag is removed from selesctedTagSet. + Update the search results 
* @listens tagCloseBtn//all -
* @param {none} 
* @calls {method} .delete - on selectedTagset
* @calls {function} refreshWithNewCriterias 
* @calledBy {function} createTag 
*/
function addListenersToCloseTags() {
    const allTagsCloseBtn = document.querySelectorAll('.closeOrDeleteTag');
    allTagsCloseBtn.forEach((tagCloseBtn) => {
        tagCloseBtn.addEventListener('click', (event) => {
            let currentTag = event.target.parentElement;
            let tagText = currentTag.querySelector('.searchedWord').textContent;
            selectedTagsSet.delete(tagText);

            refreshWithNewCriterias();
        });
    });

}


/**
 * @function updateTagsGrid
 * @description Clears the grid. + Creates a new tag for each selected tag.
 * @param {none} 
 * @calls {function} createTag
 * @calledBy {function}  refreshWithNewCriterias
 */
// eslint-disable-next-line no-unused-vars
function updateTagsGrid() {
     //  clear tags grid
     searchedWordsGrid.innerHTML = ``;
     //  update tags
     selectedTagsSet.forEach((selectedTag) => {
         createTag(selectedTag);
     });
}

