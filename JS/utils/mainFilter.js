/**
 * @listens {event} - in mainSearchInput
 * @description cheks the lenght of the input value changes. +  If the length is zero, it masks the delete button. +  If  0<length<3 it returns early.  + Otherwise, it normalizes the input value and sets it as mainSearchValue, then updates the search results.
 * @calls {function} normalizeString - Normalizes a string by converting it to lowercase and removing special characters.
 * @calls {function} refreshWithNewCriterias - Refreshes the search results based on new criteria.
 */
mainSearchInput.addEventListener('input', () => {
    const mainSearchDeleteBtn = document.querySelector('#mainSearchDeleteBtn');
    if (mainSearchInput.value.length === 0) {
        mainSearchDeleteBtn.classList.remove('isVisible');
    } else {
        mainSearchDeleteBtn.classList.add('isVisible');
    }

    if (mainSearchInput.value.length < 3 && mainSearchInput.value.length > 0) {
        return
    }
    mainSearchValue = normalizeString(mainSearchInput.value);

    refreshWithNewCriterias();

});





