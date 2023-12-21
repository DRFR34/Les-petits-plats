
// ! base v5
// ! base v5


"use strict";

// == Globlal Constants & Variables 

// * DOM elements

const mainSearchInput = document.querySelector('#mainSearchInput');
const searchedWordsGrid = document.querySelector("#searchedWordsGrid");
const ingredientsSearchInput = document.querySelector("#ingredientsSearchInput");
const appliancesSearchInput = document.querySelector("#appliancesSearchInput");
const ustensilsSearchInput = document.querySelector("#ustensilsSearchInput");


// * data containers

const ingredientsSet = new Set;
const appliancesSet = new Set;
const ustensilsSet = new Set;
const selectedTagsSet = new Set;

let mainSearchValue = new String;
let ingredientsSearchValue = new String;
let appliancesSearchValue = new String;
let ustensilsSearchValue = new String;
let mainSearchResultSet = [];
let currentSearchSet = [];


/**
 * 
 
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


/**
 * @param {Array} nRecipes - arrray of objects recipes 
 * @return {Array}
 */
async function InsertRecipeCardInDom(nRecipes) {
    // console.log('InsertRecipeCardInDom ->nRecipes :', nRecipes);
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

    addItemsInDropdownList('#filterIngredientsList', ingredientsSet);
    addItemsInDropdownList('#filterAppliancesList', appliancesSet);
    addItemsInDropdownList('#filterUstensilsList', ustensilsSet);
    dropdownItemsSelecting();
}

getRecipesData();

// == functions definitions

/**
 *  + transforms itemsSets in arrays and sorts them
 *  + injects each item in DOM
 * @param {String} listId 
 * @param {Set} - itemsSet
 */
function addItemsInDropdownList(listId, itemsSet) {
    const currentList = document.querySelector(listId);

    // resets the list
    currentList.innerHTML = (``);

    [...itemsSet].sort().forEach((item) => {
        const currentListItem = document.createElement('li');
        currentListItem.className = 'filterDropdownItem';
        currentListItem.innerText = `${item}`;
        currentList.appendChild(currentListItem);
    });
}


function deleteByCloseBtn(idOfInput, idOfCloseSpan, clearSearchValue) {
    const deleteSearch = document.querySelector(idOfCloseSpan);
    const searchInput = document.querySelector(idOfInput);

    deleteSearch.addEventListener('click', () => {
        console.log('deleteByCloseBtn '+ idOfInput  + 'initial :', searchInput.value);
        console.log('deleteByCloseBtn relatedSearchValue' + 'initial :', searchInput.value);
        
        searchInput.value = '';
        clearSearchValue();
        console.log('deleteByCloseBtn relatedSearchValue' + 'final :', searchInput.value);

        console.log('deleteByCloseBtn '+ idOfInput  + 'final :', searchInput.value);
        refreshWithNewCriterias();
    });
}
deleteByCloseBtn('#mainSearchInput','#deleteMainSearch', () => mainSearchValue ='');
deleteByCloseBtn('#ingredientsSearchInput','#deleteIngredientsSearch', () => ingredientsSearchValue = '');
deleteByCloseBtn('#appliancesSearchInput','#deleteAppliancesSearch', () => appliancesSearchValue = '');
deleteByCloseBtn('#ustensilsSearchInput','#deleteUstensilsSearch', () => ustensilsSearchValue = '');