// const searchIconBox = document.querySelector('#searchIconBox');

// * launches filtering when click on the main search btn

searchIconBox.addEventListener('click', () => {
    console.log('click on mainSearchBtn');
    refreshWithNewCriterias();
});


// * Makes bistable behavior of the dropdowns 
/**
 * @listens click - all elements with the .dropdownSymbol class 
 * @description When one is clicked, toggles the .DropdownIsActive class for its parent element and stops the event propagation.
 * @function (callback) - Event Listener's callback
 * @calledBy User interaction.
 */
const dropdownSymbols = document.querySelectorAll('.dropdownSymbol');
dropdownSymbols.forEach((dropdownSymbol) => {
    dropdownSymbol.addEventListener('click', (event) => {
        //  Prevent the event from bubbling up to the document
        event.stopPropagation(); 
        event.target.parentElement.classList.toggle('DropdownIsActive');
    });
});


/**
 * @listens mousedown - click on document object
 * @description when user clicks, checks if the event target is outside of any dropdown. If yes, close the parent dropdown menu (by removing CCS class 'DropdownIsActive') 
 * @function (callback) - Event Listener's callback
 * @calledBy User interaction.
 */
document.addEventListener('mousedown', (event) => {
    dropdownSymbols.forEach((dropdownSymbol) => {
        // If the click was outside the dropdown, remove the 'DropdownIsActive' class
        if (!dropdownSymbol.parentElement.contains(event.target)) {
            dropdownSymbol.parentElement.classList.remove('DropdownIsActive');
        }
    });
});

