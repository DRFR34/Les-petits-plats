
// ! base v3
// ! base v3
// ! base v3
// ! base v3



/** Release Note
 *  Done :  
 *      + deduplicate items in  dropdowns lists
 *      + A-B sorting of these items 
 *  ToDo :
 *      - place clicked items at the top of the list
 *      - use of the content of the items clicked in the filter
 * 
 */


"use strict";

const ingredientsSet = new Set;
const appliancesSet = new Set;
const ustensilsSet = new Set;

/**
 *  + fetches data from a JSON file (Asynchronous)
 *  + calls displayData() with the recipes data.Description placeholder
 * 
 * @async
 * @throws {Error} - If fetching fails
 * @returns {}
 */
async function getRecipesData() {
    try {
        const response = await fetch("./data/recipes.json");
        const allRecipes = await response.json();
        InsertRecipeCardInDom(allRecipes);

    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
    }

}

class RecipeCard {
    constructor(recipe) {
        const { id, image, name, servings, ingredients, time, description, appliance, ustensils } = recipe;
        this.recipeCard = document.createElement('article');
        this.recipeCard.className = 'recipeCard';
        this.recipeCard.id = `${id}`;
        this.recipeIngredientItem = document.createElement('li');
        this.recipeIngredientItem.className = 'recipeIngredientItem';
        this.recipeCard.innerHTML = ` 
        <span class="preparationTimeBox">${time}min</span>
        <div class="recipePhotoBox">
            <img class="recipePhoto" src="./Assets/dishes_photos/${image}" alt="Photo du plat">
        </div>
        <div class="recipeContent">
            <h2 class="recipeTitle">${name}</h2>
            <h3 class="recipeHowToTitle">recette</h3>
            <p class="recipeHowToText">${description}</p>
            <h3 class="recipeIngredientsTitle">ingrédients</h3>
            <ul class="recipeIngredientsList"></ul>
        </div>          
        `;

        //  deduplicate appliances for dropdown list 
        appliancesSet.add(appliance);


        ingredients.forEach((ingredientItem) => {
            const recipeIngredientsList = this.recipeCard.querySelector('.recipeIngredientsList')
            const ingredient = ingredientItem.ingredient;
            const quantity = ingredientItem.quantity;
            const unit = ingredientItem.unit;
            const recipeIngredientItem = document.createElement('li');
            recipeIngredientItem.classList.add('recipeIngredientItem');
            recipeIngredientItem.innerHTML = `
                <span class="ingredient"> ${ingredient}</span>
                <span class="ingredientQuantity">${quantity ? quantity : ""} ${unit ? unit : ""} </span>
            `
            recipeIngredientsList.appendChild(recipeIngredientItem);

            //  deduplicate ingredients for dropdown list           
            ingredientsSet.add(ingredient);
        });

        //  deduplicate ustensils for dropdown list 
        ustensils.forEach((ustensilItem) => {
            ustensilsSet.add(ustensilItem);
        });




        return this.recipeCard;
    }
}

async function InsertRecipeCardInDom(nRecipes) {
    const recipesCardsGrid = document.querySelector("#recipesCardsGrid");
    recipesCardsGrid.innerHTML = (``);
    let totalRecipes = 0;

    nRecipes.forEach((recipe) => {
        totalRecipes += 1;

        const recipeCard = new RecipeCard(recipe);
        recipesCardsGrid.appendChild(recipeCard);

        //    addIngredientsInDropdownList(ingredients)
    });

    const recipesNb = document.querySelector('.recipesNb');
    recipesNb.innerHTML = (`${totalRecipes}`)

    addAppliancesInDropdownList();
    addIngredientsInDropdownList();
    addUstensilsInDropdownList();
    dropdownItemsSelecting();
}

getRecipesData();

// == functions definitions

function addAppliancesInDropdownList() {
    const filterAppliancesList = document.querySelector('#filterAppliancesList');
    filterAppliancesList.innerHTML = (``);
   
    // while (filterAppliancesList.firstChild) {
    //     filterAppliancesList.removeChild(filterAppliancesList.lastChild);
    // }
    // filterAppliancesList.length
    // filterAppliancesList.removeChild();
    console.log('[...appliancesSet]', [...appliancesSet]);
    [...appliancesSet].sort().forEach((appliance) => {
        const filterApplianceItem = document.createElement('li');
        filterApplianceItem.className = 'filterDropdownItem';
        filterApplianceItem.innerText = `${appliance}`;
        filterAppliancesList.appendChild(filterApplianceItem);
    });

    console.log('addAppliancesInDropdownList()->filterAppliancesList:',filterAppliancesList);
}


function addIngredientsInDropdownList() {
    const filterIngredientsList = document.querySelector('#filterIngredientsList');
    filterIngredientsList.innerHTML = (``);
    [...ingredientsSet].sort().forEach((ingredient) => {
        const filterIngredientItem = document.createElement('li');
        filterIngredientItem.className = 'filterDropdownItem';
        filterIngredientItem.innerText = `${ingredient}`;
        filterIngredientsList.appendChild(filterIngredientItem);
    });
    console.log('addIngredientsInDropdownList()->filterIngredientsList:',filterIngredientsList);
}

/**
 *  + sort by A-B ustensilsSet, and 
 *  + insert each ustensil in the ustensils dropdown
 * @calledBy {fn} - fn
 * @param {none}
 * @returns {HTMLElements} - filterustensilItem
 */
function addUstensilsInDropdownList() {
    const filterUstensilsList = document.querySelector('#filterUstensilsList');
    filterUstensilsList.innerHTML = (``);

    /** 
     * transform ustensilsSet in array and sort
     * @param {String} - ustensilItem
     */
    [...ustensilsSet].sort().forEach((ustensilItem) => {
        const filterustensilItem = document.createElement('li');
        filterustensilItem.className = 'filterDropdownItem';
        filterustensilItem.innerText = `${ustensilItem}`;
        filterUstensilsList.appendChild(filterustensilItem)
    });
}


function deleteMainSearch() {
    const deleteMainSearch = document.querySelector('#deleteMainSearch');
    const mainSearchInput = document.querySelector('#mainSearchInput');

    deleteMainSearch.addEventListener('click', () => {
        mainSearchInput.value = '';
        refreshWithNewCriterias();
    });
}
deleteMainSearch();