// Font size control functionality
let currentFontSize = 16; // Default font size in pixels
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;

function createFontSizeControls() {
    const controlsDiv = document.createElement('div');
    controlsDiv.className = 'font-size-controls';
    
    const increaseBtn = document.createElement('button');
    increaseBtn.innerHTML = '+';
    increaseBtn.className = 'font-size-btn increase';
    increaseBtn.onclick = increaseFontSize;
    
    const decreaseBtn = document.createElement('button');
    decreaseBtn.innerHTML = '-';
    decreaseBtn.className = 'font-size-btn decrease';
    decreaseBtn.onclick = decreaseFontSize;
    
    controlsDiv.appendChild(increaseBtn);
    controlsDiv.appendChild(decreaseBtn);
    document.body.appendChild(controlsDiv);
}

function increaseFontSize() {
    if (currentFontSize < MAX_FONT_SIZE) {
        currentFontSize += 2;
        updateFontSize();
    }
}

function decreaseFontSize() {
    if (currentFontSize > MIN_FONT_SIZE) {
        currentFontSize -= 2;
        updateFontSize();
    }
}

function updateFontSize() {
    // Apply font size to the root element (html)
    document.documentElement.style.fontSize = `${currentFontSize}px`;
    
    // Store the current font size in localStorage for persistence
    localStorage.setItem('fontSize', currentFontSize);
}

// Initialize controls when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    createFontSizeControls();
    
    // Restore saved font size if it exists
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
        currentFontSize = parseInt(savedFontSize);
        updateFontSize();
    }
}); 