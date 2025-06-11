document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.style.backgroundColor = 'rgba(44, 24, 16, 0.9)';
            } else {
                navbar.style.backgroundColor = '#2c1810';
            }
        });
    }

    // Hamburger menu functionality
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    }

    // Menu filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (categoryButtons.length > 0 && menuItems.length > 0) {
        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const category = button.getAttribute('data-category');

                menuItems.forEach(item => {
                    if (category === 'all' || item.getAttribute('data-category') === category) {
                        item.style.display = 'block'; // Or 'flex', 'grid' depending on .menu-item's display type if not default block
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // Menu item hover effect
    const menuItemsHover = document.querySelectorAll('.menu-item');
    menuItemsHover.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Initialize with "All Items" selected (if needed, though CSS handles initial active state)
    // If the first button is 'all' and should trigger filter on load:
    const initialActiveButton = document.querySelector('.category-btn.active');
    if (initialActiveButton && initialActiveButton.getAttribute('data-category') === 'all') {
        menuItems.forEach(item => {
            item.style.display = 'block';
        });
    }

    // Menu filter functionality with animations
    const filterBtns = document.querySelectorAll('.filter-btn');
    const menuCategories = document.querySelectorAll('.menu-category');

    function animateCategoryChange(categoryToShow) {
        // Instantly hide all categories except the one to show
        menuCategories.forEach(section => {
            if (section.id !== categoryToShow) {
                section.classList.add('hidden');
            } else {
                section.classList.remove('hidden');
            }
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const cat = btn.getAttribute('data-category');
            if (cat === 'all') {
                // Show all categories with animation
                menuCategories.forEach(section => {
                    section.classList.remove('hidden');
                });
            } else {
                animateCategoryChange(cat);
            }
        });
    });
});