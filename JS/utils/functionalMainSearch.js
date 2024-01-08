
// eslint-disable-next-line no-unused-vars
function functionalMainSearch(mainSearchValue) {
   
    mainSearchValue = normalizeString(mainSearchValue);

    mainSearchValue.length === 0 ? mainSearchDeleteBtn.classList.remove('isVisible') : mainSearchDeleteBtn.classList.add('isVisible') ;

    function checkProperty(recipe, property) {
        if (Array.isArray(recipe[property])) {
            return recipe[property].some(item => {
                if (typeof item === 'object') {
                    return Object.values(item).some(subProperty => normalizeString(subProperty.toString()).includes(mainSearchValue));
                } else {
                    return normalizeString(item.toString()).includes(mainSearchValue);
                }
            });
        } else {
            return normalizeString(recipe[property].toString()).includes(mainSearchValue);
        }
    }

    let mainSearchResult = recipes.filter(recipe => {
        return ["name", "appliance", "ingredients", "ustensils", "description"].some(property => checkProperty(recipe, property));
    });

    
    //  reinit the 3 Sets used by the class Recipcard to build recipes cards
    clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);
    
    //  updates Dom elements
    InsertRecipeCardInDom(mainSearchResult);

    //  updates currentSearch (the global search var)
    currentSearch = mainSearchResult;
}

// function nativeMainSearch(mainSearchValue) {
//     mainSearchValue = normalizeString(mainSearchValue);

//     mainSearchValue.length === 0 ? mainSearchDeleteBtn.classList.remove('isVisible') : mainSearchDeleteBtn.classList.add('isVisible') ;

//     function checkProperty(recipe, property) {
//         if (Array.isArray(recipe[property])) {
//             for (let j = 0; j < recipe[property].length; j++) {
//                 if (typeof recipe[property][j] === 'object') {
//                     for (let subKey in recipe[property][j]) {
//                         if (normalizeString(recipe[property][j][subKey].toString()).includes(mainSearchValue)) {
//                             return true;
//                         }
//                     }
//                 } else if (normalizeString(recipe[property][j].toString()).includes(mainSearchValue)) {
//                     return true;
//                 }
//             }
//         } else if (normalizeString(recipe[property].toString()).includes(mainSearchValue)) {
//             return true;
//         }
//         return false;
//     }

//     let mainSearchResult = [];
//     for (let i = 0; i < recipes.length; i++) {
//         let recipe = recipes[i];
//         if (checkProperty(recipe, "name") || checkProperty(recipe, "appliance") || checkProperty(recipe, "ingredients") || checkProperty(recipe, "ustensils") || checkProperty(recipe, "description")) {
//             mainSearchResult.push(recipe);
//         }
//     }

//     //  reinit the 3 Sets used by the class Recipcard to build recipes cards
//     clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);
    
//     //  updates Dom elements
//     InsertRecipeCardInDom(mainSearchResult);

//     //  updates currentSearch (the global search var)
//     currentSearch = mainSearchResult;

    
// }