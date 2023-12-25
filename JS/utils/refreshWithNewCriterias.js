

function refreshWithNewCriterias() {
    mainSearchValue = normalizeString(mainSearchInput.value);

    functionalMainSearch(mainSearchValue);
    console.log('refreshWithNewCriterias->currentSearch initial:', currentSearch);

    if (selectedTagsSet.size !== 0) {
        //  Converts selectedTagsSet in Array
        let selectedTagsArray = [...selectedTagsSet];

        selectedTagsArray.forEach(tag => {
            currentSearch = currentSearch.filter(recipe =>
                recipe.ingredients.some(ingredient => ingredient.ingredient.includes(tag)) ||
                recipe.appliance.includes(tag) ||
                recipe.ustensils.some(ustensil => ustensil.includes(tag))
            );
        });

        console.log('refreshWithNewCriterias->currentSearch final:', currentSearch);
    }


    dropdownIngredientsFiltering(ingredientsSearchValue);
    dropdownAppliancesFiltering(appliancesSearchValue);
    dropdownUstensilsFiltering(ustensilsSearchValue);

    clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);
    InsertRecipeCardInDom(currentSearch);

}


