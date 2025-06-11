// Modal functionality
function showModal() {
    document.getElementById('appModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('appModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('appModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = 'rgba(44, 24, 16, 0.9)';
    } else {
        navbar.style.backgroundColor = '#2c1810';
    }
});

// Reward card hover effect
const rewardCards = document.querySelectorAll('.reward-card');
rewardCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
    });
    card.addEventListener('mouseleave', function() {
    });
});

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

if (hamburger && navLinks) { // Ensure elements exist before adding listeners
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside (improved to be more robust)
    document.addEventListener('click', (e) => {
        // Check if the nav links are active and the click is outside both hamburger and navlinks
        if (navLinks.classList.contains('active') && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}