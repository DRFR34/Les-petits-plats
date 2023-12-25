

/**
 * 
 * 
 *
 * @param {Set} ingredientsSet
 * @param {Set} appliancesSet
 * @param {Set} ustensilsSet
 */
function clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet) {
    [ingredientsSet, appliancesSet, ustensilsSet].forEach(set => set.clear());
    
}
