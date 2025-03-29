// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Get all category tab buttons
    const tabButtons = document.querySelectorAll('.nav-link');
    const indicators = document.querySelectorAll('.indicator');
    const categories = ['draft', 'bourbon', 'cocktail', 'special', 'bottle'];
    let currentCategoryIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Function to handle touch swiping
    function setupTouchEvents() {
        const touchContainer = document.querySelector('.touch-container');
        
        touchContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        touchContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }
    
    // Determine swipe direction and change category
    function handleSwipe() {
        const threshold = 50; // minimum distance for swipe
        const swipeDiff = touchEndX - touchStartX;
        
        if (swipeDiff > threshold) {
            // Swipe right - go to previous category
            if (currentCategoryIndex > 0) {
                switchCategory(currentCategoryIndex - 1);
            }
        } else if (swipeDiff < -threshold) {
            // Swipe left - go to next category
            if (currentCategoryIndex < categories.length - 1) {
                switchCategory(currentCategoryIndex + 1);
            }
        }
    }
    
    // Switch to a specific category
    function switchCategory(index) {
        if (index < 0 || index >= categories.length) return;
        
        currentCategoryIndex = index;
        
        // Update tab buttons
        tabButtons.forEach(btn => {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        });
        
        // Update indicators
        indicators.forEach((indicator, i) => {
            if (i === currentCategoryIndex) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Update active tab button
        tabButtons[currentCategoryIndex].classList.add('active');
        tabButtons[currentCategoryIndex].setAttribute('aria-selected', 'true');
        
        // Hide all sections
        document.querySelectorAll('.menu-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Show the target section
        const targetId = categories[currentCategoryIndex];
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        // Save to local storage
        saveActiveTab();
    }
    
    // Add click event listeners to each tab
    tabButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            switchCategory(index);
        });
    });
    
    // Add click event listeners to indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            switchCategory(index);
        });
    });
    
    // Save the last active tab to local storage
    function saveActiveTab() {
        localStorage.setItem('activeTab', categories[currentCategoryIndex]);
    }
    
    // Load the last active tab from local storage
    function loadActiveTab() {
        const activeTab = localStorage.getItem('activeTab');
        if (activeTab) {
            const index = categories.indexOf(activeTab);
            if (index !== -1) {
                switchCategory(index);
            }
        }
    }
    
    // Initialize swipe events
    setupTouchEvents();
    
    // Load the last active tab on page load
    loadActiveTab();
    
    // Handle keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            if (currentCategoryIndex > 0) {
                switchCategory(currentCategoryIndex - 1);
            }
        } else if (e.key === 'ArrowRight') {
            if (currentCategoryIndex < categories.length - 1) {
                switchCategory(currentCategoryIndex + 1);
            }
        }
    });
}); 