/* eslint-disable no-unused-vars */

/** 
 * @function addItemInTagSet
 * @description Adds text content of the clicked item in selectedTagsSet
 * @param {String} clickedItem - extracted from text content of <li> element
 */
function addItemInTagSet(clickedItem) {
    selectedTagsSet.add(clickedItem.textContent);
}
