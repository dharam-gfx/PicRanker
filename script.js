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

/*
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

const uploadBtn = document.getElementById( 'uploadBtn' );
const categoryImageContainer = document.querySelector( '.category-image' );
const  imagePreviewContainer = document.querySelector( '.image-preview-container' )
uploadBtn.addEventListener( 'click', () => {
    const files = document.getElementById( 'files' ).files;
    console.log(files);
    const date = Date.now();
    Array.from( files ).forEach( ( file, index ) => {
        console.log( file );
        const reader = new FileReader();
        reader.readAsDataURL( file );
        reader.onload = () => {
            const image = document.createElement( 'img' );
            image.src = reader.result;
            image.classList.add( 'w-1/5' );
            image.id = `image-preview-${index + date}`;
            image.draggable = true;
            console.log( image );
            image.addEventListener( 'dragstart', ( event ) => {
                event.dataTransfer.setData( 'text', event.target.id );
                console.log( "dragstart", event.target.id );
            } )
            imagePreviewContainer.appendChild( image );
        }
    } );
} )

document.addEventListener( 'dragend', ( event ) => {
    console.log( "dragend", event.target.id );
} );
document.addEventListener( "dragover", function ( event ) {
    event.preventDefault();
} );

categoryImageContainer.addEventListener( "dragenter", function ( event ) {
    console.log( event.target.classList );
    event.target.classList.add( "bg-gray-500" );

} );
categoryImageContainer.addEventListener( "dragleave", function ( event ) {
    console.log( event.target.classList );
    event.target.classList.remove( "bg-gray-500" );

} );

categoryImageContainer.addEventListener( "drop", function ( event ) {
    event.preventDefault();
    const id = event.dataTransfer.getData( 'text' );
    const image = document.getElementById( id );
    categoryImageContainer.appendChild( image );
    console.log( "drop", id );
})
