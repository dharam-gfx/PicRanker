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

//* Toggles between light and dark mode.

function toggleDarkMode() {
    // Check if dark mode is currently enabled
    const isDarkMode = rootElement.classList.contains( 'dark' );
    // Toggle the 'dark' class on the root element
    rootElement.classList.toggle( 'dark', !isDarkMode );
    // Save the current mode to local storage
    localStorage.setItem( 'darkMode', isDarkMode ? 'light' : 'dark' );
}

//* Get references to the necessary DOM elements
const uploadBtn = document.getElementById( 'uploadBtn' );
const imagePreviewContainer = document.querySelector( '.image-preview-container' );
const addCategories = document.getElementById( 'addCategories' );
const categoryItems = document.querySelector( '.category-items' );
const categoryContainer = document.querySelector( '.category-container' );
const uploadContainer = document.querySelector( '.upload-container' );

//* Add event listener for upload button click event
uploadBtn.addEventListener( 'click', () => {
    const files = document.getElementById( 'files' ).files;
    files[0] && uploadContainer.children[0].classList.remove( 'hidden' );
    const date = Date.now();
    files.length && Array.from( files ).forEach( ( file, index ) => {
        const reader = new FileReader();
        reader.readAsDataURL( file );
        //* Add event listener for reader onload event
        reader.onload = () => {
            const image = document.createElement( 'img' );
            image.src = reader.result;
            image.classList.add( 'sm:w-[130px]', 'w-1/4' );
            image.id = `image-preview-${index + date}`;
            image.draggable = true;

            //* Add event listener for image dragstart event
            image.addEventListener( 'dragstart', ( event ) => {
                event.dataTransfer.setData( 'text', event.target.id );
            } )
            imagePreviewContainer.appendChild( image );
        }
    } );
} );

//* Add event listener for addCategories button click event
addCategories.addEventListener( 'click', ( event ) => {
    const categories = document.getElementById( 'categories' ).value;
    const color = document.getElementById( 'colorPicker' ).value;
    // Validate input
    if ( categories.trim().length === 0 ) {
        alert( 'Please enter a valid category' );
        return;
    }
    categoryContainer.classList.remove( 'hidden' );

    const item = `<div class="category-item mb-3">
                <div class="category flex gap-4 p-2 bg-[${color}] rounded-md">
                    <div class="category-name flex justify-center items-center">
                        <h3 class="text-xl font-bold">${categories}</h3>
                    </div>
                    <div class="category-image rounded-md flex-1 flex flex-wrap gap-4 justify-center" draggable="true">
                    </div>
                </div>
            </div>`;
    // Add category item to category container
    const htmlItem = domParser( item );
    const categoryImageContainer = htmlItem.querySelector( '.category-image' );

    //* Add event listener for categoryImageContainer dragenter event
    categoryImageContainer.addEventListener( "dragenter", function ( event ) {
        event.target.classList.add( "bg-gray-500" );
    } );

    //* Add event listener for categoryImageContainer dragleave event
    categoryImageContainer.addEventListener( "dragleave", function ( event ) {
        event.target.classList.remove( "bg-gray-500" );
    } );

    //* Add event listener for categoryImageContainer drop event
    categoryImageContainer.addEventListener( "drop", function ( event ) {
        event.preventDefault();
        const id = event.dataTransfer.getData( 'text' );
        const image = document.getElementById( id );
        this.appendChild( image );
        event.target.classList.remove( "bg-gray-500" );
    } );

    categoryItems.appendChild( htmlItem );

} )

//* Add event listener for document dragover event
document.addEventListener( "dragover", function ( event ) {
    event.preventDefault();
} );

// document.addEventListener( 'dragend', ( event ) => {
//     console.log( "dragend", event.target.id );
// } );

//* Parses an HTML string into a DOM element.
function domParser( str ) {
    // Use DOMParser to parse the HTML string into a Document object
    const parser = new DOMParser();
    const doc = parser.parseFromString( str, 'text/html' );
    // Return the first child element of the Document's body
    return Array.from( doc.body.children )[0];
}

