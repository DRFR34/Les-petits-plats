// eslint-disable-next-line no-unused-vars
const functionalMainSearch = (mainSearchValue) => {
    // mainSearchValue = normalizeString(mainSearchValue);

    const resultRecipesName = () => {
        // return recipes.filter(recipe => recipe.name.includes(mainSearchValue));
        return recipes.filter(recipe => normalizeString(recipe.name).includes(mainSearchValue));
    }

    const resultRecipesIngredients = () => {
        return recipes.filter(recipe => 
            // recipe.ingredients.some(ingredient => ingredient.ingredient.includes(mainSearchValue));
            recipe.ingredients.some(ingredient => normalizeString(ingredient.ingredient).includes(mainSearchValue))
        );
    }

    const resultRecipesDescription = () => {
        // return recipes.filter(recipe => recipe.description.includes(mainSearchValue));
        return recipes.filter(recipe => normalizeString(recipe.description).includes(mainSearchValue));
    }

    let mainSearchResult = [...resultRecipesName(), ...resultRecipesIngredients(), ...resultRecipesDescription()];    

    if(mainSearchResult.length === 0){
        ["#recipesCardsGrid", "#filterAppliancesList", "#filterIngredientsList", "#filterUstensilsList"].forEach(selector => {
            const element = document.querySelector(selector);
            if (element) {
                element.innerHTML = 'Aucune recette trouvée';
            }
        });

        console.log('Aucune recette trouvée');  
    }

    const jsonObject = mainSearchResult.map(JSON.stringify);        
    const uniqueSet = new Set(jsonObject);
    mainSearchResult = Array.from(uniqueSet).map(JSON.parse);    
            // console.log('mainSearchResult :', mainSearchResult); 

    //  reset of dropdowns lists
    [ingredientsSet, appliancesSet, ustensilsSet].forEach(set => set.clear());

    InsertRecipeCardInDom(mainSearchResult);
}
