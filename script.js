// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Categories and their corresponding elements
    const categories = ['draft', 'bourbon', 'cocktail', 'bottle', 'special', 'events'];
    let currentCategoryIndex = 0;
    
    // Initialize swiping variables
    let touchStartX = 0;
    let touchEndX = 0;
    
    // Get fresh references to all required elements
    function getUIElements() {
        return {
            tabButtons: document.querySelectorAll('.nav-link'),
            indicators: document.querySelectorAll('.indicator'),
            sections: categories.map(id => document.getElementById(id))
        };
    }
    
    // Verify all elements exist
    function verifyElements() {
        const elements = getUIElements();
        if (elements.tabButtons.length !== categories.length) {
            console.error('Tab button count mismatch:', elements.tabButtons.length, 'vs', categories.length);
            return false;
        }
        if (elements.indicators.length !== categories.length) {
            console.error('Indicator count mismatch:', elements.indicators.length, 'vs', categories.length);
            return false;
        }
        for (let i = 0; i < categories.length; i++) {
            if (!elements.sections[i]) {
                console.error('Missing section for category:', categories[i]);
                return false;
            }
        }
        return true;
    }
    
    // Set up the touch event listeners for swiping
    function setupTouchEvents() {
        const touchContainer = document.querySelector('.touch-container');
        if (!touchContainer) {
            console.error('Touch container not found');
            return;
        }
        
        // Remove old container and create new one to clear any existing listeners
        const newContainer = touchContainer.cloneNode(true);
        touchContainer.parentNode.replaceChild(newContainer, touchContainer);
        
        // Add touch events
        newContainer.addEventListener('touchstart', handleTouchStart, { passive: true });
        newContainer.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        // Add mouse events for desktop testing
        newContainer.addEventListener('mousedown', handleMouseStart);
        newContainer.addEventListener('mouseup', handleMouseEnd);
    }
    
    // Handle touch start event
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
    }
    
    // Handle touch end event
    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }
    
    // Handle mouse events for desktop testing
    function handleMouseStart(e) {
        touchStartX = e.screenX;
    }
    
    function handleMouseEnd(e) {
        touchEndX = e.screenX;
        handleSwipe();
    }
    
    // Process the swipe gesture
    function handleSwipe() {
        const threshold = 50; // minimum distance for swipe
        const swipeDiff = touchEndX - touchStartX;
        
        console.log('Swipe detected:', swipeDiff, 'Current category:', currentCategoryIndex);
        
        if (swipeDiff > threshold) {
            // Swipe right - go to previous category
            if (currentCategoryIndex > 0) {
                console.log('Swiping right to category:', currentCategoryIndex - 1);
                switchCategory(currentCategoryIndex - 1);
            }
        } else if (swipeDiff < -threshold) {
            // Swipe left - go to next category
            if (currentCategoryIndex < categories.length - 1) {
                console.log('Swiping left to category:', currentCategoryIndex + 1);
                switchCategory(currentCategoryIndex + 1);
            } else {
                console.log('At last category, cannot swipe further left');
            }
        }
    }
    
    // Switch to a specific category
    function switchCategory(index) {
        if (index < 0 || index >= categories.length) {
            console.error('Invalid category index:', index);
            return;
        }
        
        currentCategoryIndex = index;
        
        const elements = getUIElements();
        
        // Update tab buttons
        elements.tabButtons.forEach((btn, i) => {
            if (i === index) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            }
        });
        
        // Update indicators
        elements.indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
        
        // Hide all sections
        elements.sections.forEach(section => {
            if (section) section.classList.remove('active');
        });
        
        // Show the current section
        if (elements.sections[index]) {
            elements.sections[index].classList.add('active');
        }
        
        // Save to local storage
        localStorage.setItem('activeTab', categories[index]);
    }
    
    // Add click event listeners to tabs
    function setupTabListeners() {
        const elements = getUIElements();
        
        elements.tabButtons.forEach((button, index) => {
            // Clear any existing listeners
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            // Add new listener
            newButton.addEventListener('click', function(e) {
                e.preventDefault();
                switchCategory(index);
            });
        });
    }
    
    // Add click event listeners to indicators
    function setupIndicatorListeners() {
        const elements = getUIElements();
        
        elements.indicators.forEach((indicator, index) => {
            // Clear any existing listeners
            const newIndicator = indicator.cloneNode(true);
            indicator.parentNode.replaceChild(newIndicator, indicator);
            
            // Add new listener
            newIndicator.addEventListener('click', function() {
                switchCategory(index);
            });
        });
    }
    
    // Add keyboard navigation
    function setupKeyboardNavigation() {
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
    }
    
    // Load the last active tab from local storage
    function loadSavedTab() {
        const activeTab = localStorage.getItem('activeTab');
        if (activeTab) {
            const index = categories.indexOf(activeTab);
            if (index !== -1) {
                switchCategory(index);
            }
        }
    }
    
    // Initialize everything
    function init() {
        if (!verifyElements()) {
            console.error('Element verification failed. Some features may not work correctly.');
        }
        
        setupTabListeners();
        setupIndicatorListeners();
        setupTouchEvents();
        setupKeyboardNavigation();
        loadSavedTab();
        
        console.log('Menu navigation initialized with categories:', categories);
    }
    
    // Beer Filter System  
    // Handles categories: domestic, import, craft, canned-cocktails, non-alcoholic
    function setupBeerFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        const beerItems = document.querySelectorAll('.beer-item');
        
        if (filterButtons.length === 0 || beerItems.length === 0) {
            return; // No filters or beer items found
        }
        
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                const filter = this.getAttribute('data-filter');
                
                // Update active button
                filterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                
                // Filter beer items based on data-category attribute
                beerItems.forEach(item => {
                    if (filter === 'all') {
                        item.classList.remove('hidden');
                    } else {
                        const categories = item.getAttribute('data-category');
                        if (categories && categories.includes(filter)) {
                            item.classList.remove('hidden');
                        } else {
                            item.classList.add('hidden');
                        }
                    }
                });
                
                console.log('Beer filter applied:', filter);
            });
        });
        
        console.log('Beer filter system initialized with updated categories');
    }
    
    // Start the initialization
    init();
    setupBeerFilters();
}); 