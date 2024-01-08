/**
 * @class RecipeCard
 * @classdesc Used to create a recipe Card.
 * @calledBy {function} InsertRecipeCardInDom
 */
// eslint-disable-next-line no-unused-vars
class RecipeCard {

    /**
     * @constructor
     * @description Creates a new RecipeCard object.
     * @param {Object} recipe - The recipe data.
     * @param {number} recipe.id - The ID of the recipe.
     * @param {string} recipe.image -  ex: myImage.jpg 
     * @param {string} recipe.name - The name of the recipe.
     * @param {number} recipe.servings - The number of servings the recipe makes.
     * @param {Array} recipe.ingredients - Array of objects ex [{"ingredient": string , "quantity": number, "unit": string}...]
     * @param {number} recipe.time - number of minutes for preparing
     * @param {string} recipe.description - Long text
     * @param {string} recipe.appliance - one single string by recipe
     * @param {Array} recipe.ustensils - Array of strings
     * @returns {HTMLElement} The recipe card element.
     */
    constructor(recipe) {
        // eslint-disable-next-line no-unused-vars
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
        appliancesSet.add(capitalizeFirstLetter(appliance));

        ingredients.forEach((ingredientObject) => {
            const recipeIngredientsList = this.recipeCard.querySelector('.recipeIngredientsList')
            const ingredient = capitalizeFirstLetter(ingredientObject.ingredient)
            const quantity = ingredientObject.quantity;
            const unit = ingredientObject.unit;
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
        ustensils.forEach((ustensil) => {
            ustensilsSet.add(capitalizeFirstLetter(ustensil));
        });

        return this.recipeCard;
    }
}