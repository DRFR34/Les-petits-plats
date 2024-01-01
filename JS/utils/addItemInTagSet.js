/* eslint-disable no-unused-vars */

/** 
 * @function addItemInTagSet
 * @description Extracts the text content of the cicked Li, and adds it in the Set selectedTagsSet
 * @param {HTMLHtmlElement} clickedItem - <li> element
 * @calledBy {function}  dropdownItemsSelecting() - @ /utils/tagsProcessing.js
 */
function addItemInTagSet(clickedItem) {
    selectedTagsSet.add(clickedItem.textContent); 
}
