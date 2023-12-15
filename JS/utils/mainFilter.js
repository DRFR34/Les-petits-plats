

// listener on main input
const mainSearchInput = document.querySelector('#mainSearchInput');

mainSearchInput.addEventListener('input', () => {
    if (mainSearchInput.value.length < 3 && mainSearchInput.value.length > 0) {
        return

    }
    console.log('mainSearchInput.value:', mainSearchInput.value);
    let mainSearchValue = mainSearchInput.value;

    //== nativeSearch.js
    // nativeMainSearch(mainSearchValue);

    //== funtionnalSearch.
    // functionalMainSearch(mainSearchValue);

    refreshWithNewCriterias();

});





