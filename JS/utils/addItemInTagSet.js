/* eslint-disable no-unused-vars */

/** 
 * 
 * @param {String} clickedItem - extracted from text content of <li> element
 */
function addItemInTagSet(clickedItem) {
    selectedTagsSet.add(clickedItem.textContent);
    console.log('addItemInTagSet() ->selectedTagsSet: ', selectedTagsSet);    
}
