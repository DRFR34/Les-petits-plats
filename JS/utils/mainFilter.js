

// listener on main input
// const mainSearchInput = document.querySelector('#mainSearchInput');

mainSearchInput.addEventListener('input', () => {
    if (mainSearchInput.value.length < 3 && mainSearchInput.value.length > 0) {
        return
    }
    mainSearchValue = normalizeString(mainSearchInput.value);
    console.log('Normalized mainSearchValue : ', mainSearchValue);
    refreshWithNewCriterias();
});





