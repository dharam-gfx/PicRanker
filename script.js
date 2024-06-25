// Import the tailwind config
tailwind.config = {
    theme: {
        extend: {
            colors: {
                clifford: '#da373d',
            }
        }
    },
    darkMode: 'class'
}

/**
 * Toggles between light and dark mode.
 * The mode is stored in local storage.
 */
const rootElement = document.querySelector( "html" );
const toggleThemeBtn = document.getElementById( "toggleThemeBtn" );
// Check if dark mode is currently enabled
; ( () => {
    const darkMode = localStorage.getItem( 'darkMode' ) || 'light';
    // Toggle the 'dark' class on the root element
    if ( darkMode === 'dark' ) {
        rootElement.classList.add( 'dark' );
        toggleThemeBtn.checked = true;
    }
} )();
// Function to toggle between light and dark mode
function toggleDarkMode() {
    // Check if dark mode is currently enabled
    const isDarkMode = rootElement.classList.contains( 'dark' );
    // Toggle the 'dark' class on the root element
    rootElement.classList.toggle( 'dark', !isDarkMode );
    // Save the current mode to local storage
    localStorage.setItem( 'darkMode', isDarkMode ? 'light' : 'dark' );
}


