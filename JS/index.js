// ! base 1 
// ! base 1 
// ! base 1 
// ! base 1 
/** Note de version
 *  OK : Affichage de toutes les cartes + remplissage des listes des menus déroulants + compte des recettes affichées 
 *  A faire :
 *      -  supprimer les doublons dans les listes dropDown
 *      -  items triés par ordre alphabetique
 *      - remontée des items cliqués en début de liste
 *      - uilisation du contenu des items cliqués dans le filtre
 * 
 */




/**
 * - fetches data from a JSON file (Asynchronous)
 * - calls displayData() with the recipes data.Description placeholder
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

        const filterAppliancesList = document.querySelector('#filterAppliancesList');
        const filterApplianceItem = document.createElement('li');
        filterApplianceItem.className ='filterDropdownItem';
        filterApplianceItem.innerText = `${appliance}`;
        filterAppliancesList.appendChild(filterApplianceItem);


        ingredients.forEach((ingredientItem)=> {
            const recipeIngredientsList = this.recipeCard.querySelector('.recipeIngredientsList')
            const ingredient = ingredientItem.ingredient ;
            const quantity = ingredientItem.quantity;
            const unit = ingredientItem.unit;
            const recipeIngredientItem = document.createElement('li');
        recipeIngredientItem.classList.add('recipeIngredientItem');
        recipeIngredientItem.innerHTML = `
            <span class="ingredient"> ${ingredient}</span>
            <span class="ingredientQuantity">${quantity ? quantity:"" } ${unit? unit : ""} </span>
        `
        recipeIngredientsList.appendChild(recipeIngredientItem);

        const filterIngredientsList = document.querySelector('#filterIngredientsList');
        const filterIngredientItem = document.createElement('li');
        filterIngredientItem.className ='filterDropdownItem';
        filterIngredientItem.innerText = `${ingredient}`;
        filterIngredientsList.appendChild(filterIngredientItem);
        });

        ustensils.forEach((ustensilItem)=> {
            const filterUstensilsList = document.querySelector('#filterUstensilsList');
            const filterustensilItem = document.createElement('li');
            filterustensilItem.className ='filterDropdownItem';
            filterustensilItem.innerText = `${ustensilItem}`;
        filterUstensilsList.appendChild(filterustensilItem);   
        });    



        return this.recipeCard;
    }
}

async function InsertRecipeCardInDom(allRecipes){
    const recipesCardsGrid = document.querySelector("#recipesCardsGrid");
    recipesCardsGrid.innerHTML=(``)
    let totalRecipes = 0;
    allRecipes.forEach((recipe) => { 
        totalRecipes += 1 ;    
       const recipeCard = new RecipeCard(recipe);
       recipesCardsGrid.appendChild(recipeCard);
    });

    const recipesNb = document.querySelector('.recipesNb');
    recipesNb.innerHTML = (`${totalRecipes}`)
}
getRecipesData();

