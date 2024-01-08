

/**
 * @function clearDropdownsLists
 * @description Deletes the content of the 3 Sets : ingredientsSet, appliancesSet, ustensilsSet
 * @param {Set} ingredientsSet - Set of strings
 * @param {Set} appliancesSet - Set of strings
 * @param {Set} ustensilsSet - Set of strings
 * @calls - No
 * @calledBy {functions} - functionalMainSearch() || fuctionalMainSearch() ; refreshWithNewCriterias()
 */
function clearDropdownsLists(ingredientsSet, appliancesSet, ustensilsSet) {
    [ingredientsSet, appliancesSet, ustensilsSet].forEach(set => set.clear());

}
