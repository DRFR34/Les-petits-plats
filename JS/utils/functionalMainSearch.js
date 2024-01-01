// eslint-disable-next-line no-unused-vars

/**
 * @function functionalMainSearch
 * @description Performs a primary search within a set of recipes.
 * @param {string} mainSearchValue - The primary search value.
 * @calledBy {function} refreshWithNewCriterias @ utils/refreshWithNewCriterias.js
 */
function functionalMainSearch(mainSearchValue) {
    mainSearchValue = normalizeString(mainSearchValue);

     /**
     * @function resultsByProperty - internal fn
     * @description Checks if a property of a recipe matches mainSearchValue.
     * @param {Object} recipe - The recipe to check.
     * @param {string} property - The property of the recipe to check.
     * @returns {boolean} Returns true if the property matches mainSearchValue, otherwise false.
     * @calledBy {function} filterRecipes - internal
    */
    function resultsByProperty(recipe, property) {
        
        /**
         * @function checkProperty - internal fn
         * @description Checks to see if a property of an object or array matches mainSearchValue.
         * @param {Object|string|number} item - The item to be checked.
         * @returns {boolean} Returns true if the item matches mainSearchValue, else false.
         * @calledBy {function} resultsByProperty - internal
         */
        function checkProperty(item) {
            if (typeof item === 'object') {
                return Object.values(item).some(subProperty => normalizeString(subProperty.toString()).includes(mainSearchValue));
            } else {
                return normalizeString(item.toString()).includes(mainSearchValue);
            }
        }

        if (Array.isArray(recipe[property])) {
            return recipe[property].some(checkProperty);
        } else {
            return normalizeString(recipe[property].toString()).includes(mainSearchValue);
        }
    }

    /**
     * @function filterRecipes - internal fn
     * @description Filters recipes based on the primary search value.
     * @param {Object} recipe - The recipe to filter.
     * @returns {boolean} Returns true if the recipe matches the primary search value, otherwise false.
     * @calledBy {function} functionalMainSearch @ utils/functionalMainSearch.js
     */
    function filterRecipes(recipe) {
        return ["name", "appliance", "ingredients", "ustensils", "description"].some(property => resultsByProperty(recipe, property));
    }

    let mainSearchResult = recipes.filter(filterRecipes);

    //  clear dropdowns lists
    clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet);

    InsertRecipeCardInDom(mainSearchResult);

    currentSearch = mainSearchResult;
}
