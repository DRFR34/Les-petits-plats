/**
 * 
 */

// eslint-disable-next-line no-unused-vars
function normalizeString(string){

    string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    
    // replace special caracters
    string = string.replace(/œ/g, "oe").replace(/æ/g, "ae").replace(/[']/g, " ");
  
    return string.toLowerCase();

}