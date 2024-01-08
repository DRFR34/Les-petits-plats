


/**
 * @function refreshWithNewCriterias
 * @description Refreshes the search results based on each new criteria. It filters the recipes based on selected tags and search values for ingredients, appliances, and utensils, clears the dropdown lists, inserts the recipe card in the DOM, and updates the selected dropdown items.
 * @param {none} 
 * @calls {function} normalizeString - Normalizes a string by converting it to lowercase and removing special characters.
 * @calls {function} nativeMainSearch - Performs the main search functionality.
 * @calls {function} dropdownIngredientsFiltering - Filters the recipes based on the ingredients search value.
 * @calls {function} dropdownAppliancesFiltering - Filters the recipes based on the appliances search value.
 * @calls {function} dropdownUstensilsFiltering - Filters the recipes based on the utensils search value.
 * @calls {function} clearDropdownsLists - Clears the dropdown lists for ingredients, appliances, and utensils.
 * @calls {function} InsertRecipeCardInDom - Inserts the recipe card in the DOM.
 * @calls {function} updateSelectedDropdrownsItems - Updates the selected items in the dropdowns.
 * @calledBy {eventListener} - in addListernerOnIngredientsInput - User input
 * @calledBy {eventListener} - in addListernerOnAppliancesInput - User input
 * @calledBy {eventListener} - in addListernerOnUstensilsInput - User input
 * @calledBy {eventListener} - mainSearchInput.addEventListener - User input
 * @calledBy {eventListener} - searchIconBox.addEventListener - User click
 */
// eslint-disable-next-line no-unused-vars
function refreshWithNewCriterias() {
    mainSearchValue = normalizeString(mainSearchInput.value);

    nativeMainSearch(mainSearchValue);

    if (selectedTagsSet.size !== 0) {
        //  Converts selectedTagsSet in Array in the aim to use forEach
        let selectedTagsArray = [...selectedTagsSet];

        selectedTagsArray.forEach(tag => {            
            currentSearch = currentSearch.filter(recipe =>
                recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient) === normalizeString(tag)) ||
                normalizeString(recipe.appliance) === normalizeString(tag) ||
                recipe.ustensils.some(ustensil => normalizeString(ustensil) === normalizeString(tag))
            );
        });

    }

    currentSearch.length === 0 ? nothingFoundDiv.classList.add('isVisible'): nothingFoundDiv.classList.remove('isVisible');
    // clears the 3 Sets, used by the RecipeCard class to build cards display
    clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);

    // Launch the filtreing of current recipes with the possible user entries in the dropdown inputs
    dropdownIngredientsFiltering(ingredientsSearchValue);
    dropdownAppliancesFiltering(appliancesSearchValue);
    dropdownUstensilsFiltering(ustensilsSearchValue);

    // Finaly, update the displaying with the new results
    updateTagsGrid();
    InsertRecipeCardInDom(currentSearch);
    updateSelectedDropdrownsItems();
}


