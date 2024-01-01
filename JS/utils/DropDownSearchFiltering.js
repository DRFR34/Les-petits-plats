//! todo: cf baks/v2 for draft of DRY code


// == Launching functions :

addListernerOnIngredientsInput();
addListernerOnAppliancesInput();
addListernerOnUstensilsInput();


// == Functions definitions

// * Listeners
function addListernerOnIngredientsInput() {
    ingredientsSearchInput.addEventListener('input', () => {
        ingredientsSearchValue = normalizeString(ingredientsSearchInput.value);
        refreshWithNewCriterias();
    });
}


function addListernerOnAppliancesInput() {
    appliancesSearchInput.addEventListener('input', () => {
        appliancesSearchValue = normalizeString(appliancesSearchInput.value);
        refreshWithNewCriterias();
    });
}

function addListernerOnUstensilsInput() {
    ustensilsSearchInput.addEventListener('input', () => {
        ustensilsSearchValue = normalizeString(ustensilsSearchInput.value);
        refreshWithNewCriterias();
    });
}


// * Filters


function dropdownIngredientsFiltering(ingredientsSearchValue) {
    if (ingredientsSearchValue.length === 0) { return }

    currentSearch = currentSearch.filter(recipe =>
        recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(ingredientsSearchValue))
    );
}


function dropdownAppliancesFiltering(appliancesSearchValue) {
    if (appliancesSearchValue.length === 0) { return }

    currentSearch = currentSearch.filter(recipe =>
        normalizeString(recipe.appliance).includes(appliancesSearchValue));
}


function dropdownUstensilsFiltering(ustensilsSearchValue) {
    if (ustensilsSearchValue.length === 0) { return }

    currentSearch = currentSearch.filter(recipe =>
        recipe.ustensils.some(ustensil => normalizeString(ustensil).includes(ustensilsSearchValue))
    );
}

