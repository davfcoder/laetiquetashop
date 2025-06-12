document.addEventListener('DOMContentLoaded', () => {
    // Get the theme buttons
    const themeButtons = document.querySelectorAll('.theme-button');
    
    // Get the saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') || 'default';
    
    // Apply the saved theme
    if (savedTheme !== 'default') {
        document.documentElement.setAttribute('data-theme', savedTheme);
    }
    
    // Add active class to the current theme button
    themeButtons.forEach(button => {
        if (button.getAttribute('data-theme') === savedTheme) {
            button.classList.add('active');
        }
    });
    
    // Add click event listeners to theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            themeButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the theme from the button's data attribute
            const theme = button.getAttribute('data-theme');
            
            // Set the theme
            if (theme === 'default') {
                document.documentElement.removeAttribute('data-theme');
            } else {
                document.documentElement.setAttribute('data-theme', theme);
            }
            
            // Save the theme to localStorage
            localStorage.setItem('theme', theme);
        });
    });
}); 