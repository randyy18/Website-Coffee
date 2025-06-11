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
            e.stopPropagation(); // Prevent click from immediately closing via document listener
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link inside the nav
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


    // Carousel functionality
    const productsGrid = document.getElementById('productsGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const carouselDotsContainer = document.getElementById('carouselDots');
    const cards = document.querySelectorAll('.product-card');
    
    if (productsGrid && prevBtn && nextBtn && carouselDotsContainer && cards.length > 0) {
        let currentIndex = 0;
        let cardsPerView = calculateCardsPerView();
        let totalSlides = cards.length - 1; // Total slides is number of cards minus 1 for overlap
        let autoSlideInterval;

        function calculateCardsPerView() {
            if (window.innerWidth < 768) { // Mobile view
                return 1;
            }
            return 2; // Tablet and desktop view
        }

        function createDots() {
            carouselDotsContainer.innerHTML = '';
            // For mobile, total slides is number of cards
            // For desktop/tablet, total slides is cards.length - 1 due to overlap
            totalSlides = window.innerWidth < 768 ? cards.length : cards.length - 1;
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('div');
                dot.classList.add('dot');
                if (i === currentIndex) dot.classList.add('active');
                dot.addEventListener('click', () => goToSlide(i));
                carouselDotsContainer.appendChild(dot);
            }
        }

        function updateDots() {
            const dots = carouselDotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }

        function goToSlide(index) {
            const isMobile = window.innerWidth < 768;
            const maxIndex = isMobile ? cards.length - 1 : cards.length - 2;
            
            if (index < 0) {
                index = maxIndex;
            } else if (index > maxIndex) {
                index = 0;
            }
            
            currentIndex = index;
            
            // Calculate slide position
            if (isMobile) {
                // Mobile: move full width
                productsGrid.style.transform = `translateX(-${index * 100}%)`;
            } else {
                // Tablet/Desktop: move half width to show overlapping cards
                productsGrid.style.transform = `translateX(-${index * 50}%)`;
            }
            
            updateDots();
        }
        
        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function prevSlide() {
            goToSlide(currentIndex - 1);
        }

        function updateCarouselConfig() {
            cardsPerView = calculateCardsPerView();
            const isMobile = window.innerWidth < 768;
            
            // Update card widths
            cards.forEach(card => {
                if (isMobile) {
                    card.style.minWidth = '100%';
                } else {
                    card.style.minWidth = '50%'; // Each card takes half the width
                }
            });

            createDots();
            goToSlide(Math.min(currentIndex, totalSlides - 1));
        }

        // Event listeners for buttons
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);

        // Auto slide
        function startAutoSlide() {
            clearInterval(autoSlideInterval); // Clear existing interval
            autoSlideInterval = setInterval(nextSlide, 5000);
        }

        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Pause auto slide on hover
        productsGrid.addEventListener('mouseenter', stopAutoSlide);
        productsGrid.addEventListener('mouseleave', startAutoSlide);
        prevBtn.addEventListener('mouseenter', stopAutoSlide);
        prevBtn.addEventListener('mouseleave', startAutoSlide);
        nextBtn.addEventListener('mouseenter', stopAutoSlide);
        nextBtn.addEventListener('mouseleave', startAutoSlide);
        carouselDotsContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselDotsContainer.addEventListener('mouseleave', startAutoSlide);


        // Update on window resize
        window.addEventListener('resize', () => {
            stopAutoSlide(); // Stop during resize
            updateCarouselConfig();
            startAutoSlide(); // Restart after resize
        });

        // Add touch support for mobile
        let touchStartX = 0;
        let touchEndX = 0;

        if (productsGrid) {
            productsGrid.addEventListener('touchstart', (e) => {
                touchStartX = e.touches[0].clientX;
            }, false);

            productsGrid.addEventListener('touchmove', (e) => {
                touchEndX = e.touches[0].clientX;
            }, false);

            productsGrid.addEventListener('touchend', () => {
                handleSwipe();
            }, false);
        }

        function handleSwipe() {
            const swipeThreshold = 50; // minimum distance for swipe
            const diff = touchStartX - touchEndX;

            if (Math.abs(diff) > swipeThreshold) {
                if (diff > 0) {
                    // Swiped left
                    nextSlide();
                } else {
                    // Swiped right
                    prevSlide();
                }
            }
        }

        // Initial setup
        updateCarouselConfig();
        startAutoSlide();
    }


    // Scroll Animation for sections
    const sections = document.querySelectorAll('.section');
    if (sections.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1 // Trigger when 10% of the element is visible
        };

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {

                }
            });
        }, observerOptions);

        sections.forEach(section => {
            observer.observe(section);
        });
    }
});