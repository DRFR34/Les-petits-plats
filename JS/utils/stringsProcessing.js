/**
 * @function normalizeString
 * @description - Removes diacritics, replaces special characters, and converts to lowercase.
 * @param {string} string - The string to normalize
 * @returns {string} - The normalized string
 * @calls {method} String.prototype.normalize - Normalizes the string to the specified form
 * @calls {method} String.prototype.replace - Replaces matches in the string with a replacement
 * @calls {method} String.prototype.toLowerCase - Converts the string to lowercase
 * @calledBy {function || listener} - almost used in all functions and listeners
 */
// eslint-disable-next-line no-unused-vars
function normalizeString(string){

    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // replace special caracters
    string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  
    return string.toLowerCase();

}

/**
 * @function capitalizeFirstLetter
 * @description - Capitalize the first letter of the string (used for dropdowns items)
 * @param {string} string - string to transform
 * @returns {string} - The transformed string
 * @calls {method} String.prototype.normalize - Normalizes the string to the specified form
 * @calls {method} String.prototype.replace - Replaces matches in the string with a replacement
 * @calls {method} String.prototype.toLowerCase - Converts the string to lowercase
 * @calledBy {class} - RecipeCard 
 */
// eslint-disable-next-line no-unused-vars
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
