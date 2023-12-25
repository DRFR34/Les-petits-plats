// ! base v2
// ! base v2
// ! base v2
// ! base v2

/**
 *  
 */

// eslint-disable-next-line no-unused-vars
function functionalMainSearch(mainSearchValue) {
    let stack = new Error().stack;
    console.log('functionalMainSearch() callers list : ', stack);

    mainSearchResult = recipes.filter(recipe => Object.values(recipe).some(property => normalizeString(
        property.toString()).includes(mainSearchValue)
    ));

    console.log('mainSearchResult:', mainSearchResult);

    //  clear dropdowns lists
    clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);

    InsertRecipeCardInDom(mainSearchResult);
    //  console.log('mainSearchResult :', mainSearchResult);

    currentSearch = mainSearchResult;
    console.log('functionalMainSearch()-> mainSearchResult final:', mainSearchResult);
    console.log('functionalMainSearch()-> currentSearch final:', currentSearch);

}
