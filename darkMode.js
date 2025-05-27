// Dark Mode Functionality
document.addEventListener('DOMContentLoaded', function() {
    const darkMode = document.querySelector(".dark-mode");
    const body = document.body;

    // Check for saved dark mode preference
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'enabled') {
        body.classList.add('active');
    }

    darkMode.addEventListener("click", () => {
        body.classList.toggle("active");
        
        // Save preference to localStorage
        if (body.classList.contains('active')) {
            localStorage.setItem('darkMode', 'enabled');
        } else {
            localStorage.setItem('darkMode', 'disabled');
        }
    });
}); 