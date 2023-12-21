// ! base v2
// ! base v2
// ! base v2
// ! base v2

/**
 *  
 */

// eslint-disable-next-line no-unused-vars
function functionalMainSearch(mainSearchValue){
        

    mainSearchResultSet = recipes.filter(recipe => Object.values(recipe).some(property => normalizeString(
        property.toString()).includes(mainSearchValue)
     ));
//  clear dropdowns lists
clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);

InsertRecipeCardInDom(mainSearchResultSet);
//  console.log('mainSearchResultSet :', mainSearchResultSet);

currentSearchSet = mainSearchResultSet;
        console.log('functionalMainSearch()-> mainSearchResultSet final:',mainSearchResultSet);
        console.log('functionalMainSearch()-> currentSearchSet final:',currentSearchSet);

}
