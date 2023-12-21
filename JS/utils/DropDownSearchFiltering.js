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
        console.log('addListernerOnIngredientsInput()-> ingredientsSearchInput.value:', ingredientsSearchInput.value);

        console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue:', ingredientsSearchValue);
        console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue.length:', ingredientsSearchValue.length);
        
        refreshWithNewCriterias();

    });
}


function addListernerOnAppliancesInput() {
    appliancesSearchInput.addEventListener('input', () => {
        appliancesSearchValue = normalizeString(appliancesSearchInput.value);
                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchInput.value:', ingredientsSearchInput.value);

                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue:', ingredientsSearchValue);
                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue.length:', ingredientsSearchValue.length);
        // DropDownIngredientFiltering(ingredientsInputValue);
        refreshWithNewCriterias();

    });
}

function addListernerOnUstensilsInput() {
    ustensilsSearchInput.addEventListener('input', () => {
        ustensilsSearchValue = normalizeString(ustensilsSearchInput.value);
                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchInput.value:', ingredientsSearchInput.value);

                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue:', ingredientsSearchValue);
                // console.log('addListernerOnIngredientsInput()-> ingredientsSearchValue.length:', ingredientsSearchValue.length);
        // DropDownIngredientFiltering(ingredientsInputValue);
        refreshWithNewCriterias();

    });
}


// * Filters


function dropdownIngredientsFiltering(ingredientsSearchValue){
    console.log('IngredientSearchFiltering()->currentSearchSet initial', currentSearchSet);
    if(ingredientsSearchValue.length === 0){ return}

    currentSearchSet = currentSearchSet.filter(recipe => 
        recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(ingredientsSearchValue))
    );
    console.log('dropdownIngredientsFiltering()->currentSearchSet final', currentSearchSet);
}


function dropdownAppliancesFiltering(appliancesSearchValue){
    console.log('dropdownAppliancesFiltering()->currentSearchSet initial', currentSearchSet);
    if(appliancesSearchValue.length === 0){ return}

    currentSearchSet = currentSearchSet.filter(recipe => 
        normalizeString(recipe.appliance).includes(appliancesSearchValue));
    console.log('dropdownAppliancesFiltering()->currentSearchSet final', currentSearchSet);
}


function dropdownUstensilsFiltering(ustensilsSearchValue){
    console.log('dropdownUstensilsFiltering()->currentSearchSet initial', currentSearchSet);
    if(ustensilsSearchValue.length === 0){ return}

    currentSearchSet = currentSearchSet.filter(recipe => 
        recipe.ustensils.some(ustensil => normalizeString(ustensil).includes(ustensilsSearchValue))
    );
    console.log('dropdownUstensilsFiltering()->currentSearchSet final', currentSearchSet);
}
