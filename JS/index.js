
"use strict";

// == Globlal Constants & Variables 

// * DOM elements

// eslint-disable-next-line no-unused-vars
const mainSearchInput = document.querySelector('#mainSearchInput');
// eslint-disable-next-line no-unused-vars
const searchIconBox = document.querySelector('#searchIconBox');
// eslint-disable-next-line no-unused-vars
const mainSearchDeleteBtn= document.querySelector('#mainSearchDeleteBtn');
// eslint-disable-next-line no-unused-vars
const searchedWordsGrid = document.querySelector("#searchedWordsGrid");
// eslint-disable-next-line no-unused-vars
const ingredientsSearchInput = document.querySelector("#ingredientsSearchInput");
// eslint-disable-next-line no-unused-vars
const appliancesSearchInput = document.querySelector("#appliancesSearchInput");
// eslint-disable-next-line no-unused-vars
const ustensilsSearchInput = document.querySelector("#ustensilsSearchInput");
// eslint-disable-next-line no-unused-vars
const nothingFoundDiv = document.querySelector('#nothingFoundDiv');

// * data containers

const ingredientsSet = new Set;
const appliancesSet = new Set;
const ustensilsSet = new Set;
// eslint-disable-next-line no-unused-vars
const selectedTagsSet = new Set;

// eslint-disable-next-line no-unused-vars
let mainSearchValue = new String;
// eslint-disable-next-line no-unused-vars
let ingredientsSearchValue = new String;
// eslint-disable-next-line no-unused-vars
let appliancesSearchValue = new String;
// eslint-disable-next-line no-unused-vars
let ustensilsSearchValue = new String;
// eslint-disable-next-line no-unused-vars
let mainSearchResult = [];
// eslint-disable-next-line no-unused-vars
let currentSearch = [];


/**
 * @async
 * @function getRecipesData
 * @description Fetches recipe data from a JSON file. + Inserts the recipe cards into the DOM.
 * @listens {event} fetch - Fetches the JSON data.
 * @calls {function} InsertRecipeCardInDom 
 * @throws {Error} Will throw an error if the fetch operation fails.
 * @calledBy Direct init call in index.js
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
 * @async
 * @function InsertRecipeCardInDom
 * @description Inserts recipe cards into the DOM + updates the counter of found recipes
 * @param {Array} nRecipes - array of objects
 * @calls {function} RecipeCard 
 * @calls {function} addItemsInDropdownList 
 * @calls {function} dropdownItemsSelecting 
 * @calledBy {function} getRecipesData
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

    recipesNb.innerHTML = (totalRecipes < 10 ? `0${totalRecipes}` : `${totalRecipes}`)

    addItemsInDropdownList('#filterIngredientsList', ingredientsSet);
    addItemsInDropdownList('#filterAppliancesList', appliancesSet);
    addItemsInDropdownList('#filterUstensilsList', ustensilsSet);
    dropdownItemsSelecting();
}

getRecipesData();

// == functions definitions

/**
 * @function addItemsInDropdownList
 * @description transforms itemsSets in arrays and sorts them + Adds items to a dropdown list in the DOM.
 * @param {string} listId 
 * @param {Set} itemsSet - The set of items to be added to the dropdown list.
 * @calls {method} .sort 
 * @calls {method} .forEach
 * @calledBy {function} InsertRecipeCardInDom
 */

function addItemsInDropdownList(listId, itemsSet) {
    const currentList = document.querySelector(listId);

    //  resets the list
    currentList.innerHTML = (``);


    [...itemsSet].sort((a, b) => a.localeCompare(b, 'fr')).forEach((item) => {
        const currentListItem = document.createElement('li');
        currentListItem.className = 'filterDropdownItem';
        currentListItem.innerText = `${item}`;
        currentList.appendChild(currentListItem);
    });
}


function deleteByCloseBtn(idOfInput, idOfCloseSpan, clearSearchValue) {
    const searchDeleteBtn = document.querySelector(idOfCloseSpan);
    const searchInput = document.querySelector(idOfInput);

    searchDeleteBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearSearchValue();
        refreshWithNewCriterias();
    searchDeleteBtn.classList.remove(isVisible)

    });
}

deleteByCloseBtn('#mainSearchInput', '#mainSearchDeleteBtn', () => mainSearchValue = '');
deleteByCloseBtn('#ingredientsSearchInput', '#ingredientsSearchDeleteBtn', () => ingredientsSearchValue = '');
deleteByCloseBtn('#appliancesSearchInput', '#appliancesSearchDeleteBtn', () => appliancesSearchValue = '');
deleteByCloseBtn('#ustensilsSearchInput', '#ustensilsSearchDeleteBtn', () => ustensilsSearchValue = '');