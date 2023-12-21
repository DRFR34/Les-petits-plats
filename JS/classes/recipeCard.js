// eslint-disable-next-line no-unused-vars
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