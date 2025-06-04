
function loadNavbar() {
    // Load navbar
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(html => {
            // Inject navbar HTML
            document.querySelector('header').outerHTML = html;
            
            // Initialize navbar functionality
            setupNavbar();
            setActiveLink();
            
            // Add Font Awesome for icons
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fontAwesome);
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}


// Setup responsive navbar
function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelector('.navbar-links');
    let hamburger = document.querySelector('.hamburger');

    // Create hamburger if not present
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        navbar.insertBefore(hamburger, navbarLinks);
    }

    function toggleMenu() {
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', String(!expanded));
        navbarLinks.classList.toggle('is-active');
        hamburger.classList.toggle('is-active');
    }

    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu on link click (mobile)
    navbarLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                hamburger.setAttribute('aria-expanded', 'false');
                navbarLinks.classList.remove('is-active');
                hamburger.classList.remove('is-active');
            }
        });
    });

    // Close menu on outside click
    document.addEventListener('click', (e) => {
        if (window.innerWidth > 900) return;
        if (!navbar.contains(e.target)) {
            hamburger.setAttribute('aria-expanded', 'false');
            navbarLinks.classList.remove('is-active');
            hamburger.classList.remove('is-active');
        }
    });

    // Responsive: show/hide hamburger
    function handleResize() {
        if (window.innerWidth <= 900) {
            hamburger.style.display = 'inline-flex';
            navbarLinks.classList.remove('is-active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        } else {
            hamburger.style.display = 'none';
            navbarLinks.classList.remove('is-active');
            hamburger.classList.remove('is-active');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    }
    window.addEventListener('resize', handleResize);
    handleResize();
}


// Set active link based on current page
function setActiveLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const currentPath = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Load footer dynamically
function loadFooter() {
    fetch('components/footer.html')
        .then(response => response.text())
        .then(html => {
            const placeholder = document.getElementById('footer-placeholder');
            if (placeholder) placeholder.outerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Initialize navbar and footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
});