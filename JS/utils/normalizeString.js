/**
 * @function normalizeString
 * @description Normalizes a string (removing accents, replacing certain characters, escaping user inputs, and converting the string to lowercase).
 * @param {string} string - The string to be normalized.
 * @returns {string} Returns the normalized string.
 */
// eslint-disable-next-line no-unused-vars
function normalizeString(string){
 
    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");

    //  escape user inputs
    string = encodeURIComponent(string);
    return string.toLowerCase();
}
