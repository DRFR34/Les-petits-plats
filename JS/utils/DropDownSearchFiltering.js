
// == Launching functions :

addListernerOnIngredientsInput();
addListernerOnAppliancesInput();
addListernerOnUstensilsInput();


// == Functions definitions

// * Listeners

/**
 * @function addListernerOnIngredientsInput
 * @description Update ingredientsSearchValue  + launches the update of the search results
 * @listens {input} ingredientsSearchInput
 * @param {none} - 
 * @calls {function} normalizeString 
 * @calls {function} refreshWithNewCriterias
 * @calledBy {initialisation}
 */
function addListernerOnIngredientsInput() {
    ingredientsSearchInput.addEventListener('input', () => {
        ingredientsSearchValue = normalizeString(ingredientsSearchInput.value);
        refreshWithNewCriterias();
    });
}

/**
 * @function addListernerOnAppliancesInput
 * @description  Updates appliancesSearchValue  + launches the update of the search results
 * @listens {input} appliancesSearchInput
 * @param {none} - 
 * @calls {function} normalizeString 
 * @calls {function} refreshWithNewCriterias
 * @
 * @calledBy {initialisation}
 */
function addListernerOnAppliancesInput() {
    appliancesSearchInput.addEventListener('input', () => {
        appliancesSearchValue = normalizeString(appliancesSearchInput.value);
        refreshWithNewCriterias();

    });
}

/**
 * @function addListernerOnUstensilsInput
 * @description Update ustensilsSearchValue  + launches the update of the search results
 * @listens {input} ustensilsSearchInput
 * @param {none} 
 * @calls {function} normalizeString 
 * @calls {function} refreshWithNewCriterias
 * @calledBy {initialisation}
 */
function addListernerOnUstensilsInput() {
    ustensilsSearchInput.addEventListener('input', () => {
        ustensilsSearchValue = normalizeString(ustensilsSearchInput.value);
        refreshWithNewCriterias();

    });
}



/**
 * @function dropdownIngredientsFiltering
 * @description Filters the current search results based on the ingredients search value. Makes the delete button visible if the search value is not empty +  Filters the recipes that include the search value in their ingredients.
 * @param {string} ingredientsSearchValue - The search value for the ingredients
 * @calls {function} normalizeString 
 * @calledBy {function} - refreshWithNewCriterias
 */
// eslint-disable-next-line no-unused-vars
function dropdownIngredientsFiltering(ingredientsSearchValue) {
    const ingredientsSearchDeleteBtn = document.querySelector('#ingredientsSearchDeleteBtn');
   
    if (ingredientsSearchValue.length === 0) {
        ingredientsSearchDeleteBtn.classList.remove('isVisible');
        return;
    }
    ingredientsSearchDeleteBtn.classList.add('isVisible');    
    currentSearch = currentSearch.filter(recipe =>
        recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(ingredientsSearchValue))
    );
    }

/**
 * @function dropdownAppliancesFiltering
 * @description Filters the current search results based on the appliances search value + Makes the delete button visible if the search value is not empty + Filters the recipes that include the search value in their appliance.
 * @param {string} appliancesSearchValue - The search value for the appliances
 * @calls {function} normalizeString 
 * @calledBy {function} - refreshWithNewCriterias
 */
// eslint-disable-next-line no-unused-vars
function dropdownAppliancesFiltering(appliancesSearchValue) {
    const appliancesSearchDeleteBtn = document.querySelector('#appliancesSearchDeleteBtn');
    if (appliancesSearchValue.length === 0) {
        appliancesSearchDeleteBtn.classList.remove('isVisible');
        return;
    }
    appliancesSearchDeleteBtn.classList.add('isVisible');
    currentSearch = currentSearch.filter(recipe =>
        normalizeString(recipe.appliance).includes(appliancesSearchValue));
}

/**
 * @function dropdownUstensilsFiltering
 * @description Filters the current search results based on the ustensils search value + Makes the delete button visible if the search value is not empty + Filters the recipes that include the search value in their utensils.
 * @param {string} utensilsSearchValue - The search value for the utensils
 * @calls {function} normalizeString 
 * @calledBy {function} - refreshWithNewCriterias
 */
// eslint-disable-next-line no-unused-vars
function dropdownUstensilsFiltering(ustensilsSearchValue) {
    if (ustensilsSearchValue.length === 0) {
        ustensilsSearchDeleteBtn.classList.remove('isVisible');
        return;
    }
    ustensilsSearchDeleteBtn.classList.add('isVisible');
    currentSearch = currentSearch.filter(recipe =>
        recipe.ustensils.some(ustensil => normalizeString(ustensil).includes(ustensilsSearchValue))
    );
}

