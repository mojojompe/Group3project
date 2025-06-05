
function loadNavbar() {
    // Load navbar
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            // Create a temporary container to hold the navbar HTML
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            // Insert the navbar into the header
            const header = document.querySelector('header');
            if (header) {
                header.outerHTML = temp.innerHTML;
                
                // Initialize navbar functionality
                setupNavbar();
                
                // Add Font Awesome
                if (!document.querySelector('link[href*="font-awesome"]')) {
                    const fontAwesome = document.createElement('link');
                    fontAwesome.rel = 'stylesheet';
                    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
                    document.head.appendChild(fontAwesome);
                }
                
                // Set active link after a small delay to ensure DOM is ready
                setTimeout(setActiveLink, 50);
            }
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}


function setupNavbar() {
    const navbar = document.querySelector('.navbar');
    const navbarLinks = document.querySelector('.navbar-links');
    let hamburger = document.querySelector('.hamburger');

    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.setAttribute('aria-label', 'Toggle navigation');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<img src="images/Menu.svg" alt="Menu" style="width:32px;height:32px;display:block;">';
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

    navbarLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 900) {
                hamburger.setAttribute('aria-expanded', 'false');
                navbarLinks.classList.remove('is-active');
                hamburger.classList.remove('is-active');
            }
        });
    });

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
    const navLinks = document.querySelectorAll('.navbar-links a:not(.join-us-btn)');
    const currentPath = window.location.pathname;
    let currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove active class from all links first
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Special case for home page (root or index.html)
    if (currentPage === '' || currentPage.toLowerCase() === 'index.html') {
        const homeLinks = document.querySelectorAll('.navbar-links a[href="index.html" i], .navbar-links a[href="/" i], .navbar-links a[href="./" i]');
        homeLinks.forEach(link => link.classList.add('active'));
        return;
    }
    
    // Normalize current page name for comparison (lowercase and remove .html if present without it in the URL)
    const currentPageLower = currentPage.toLowerCase();
    const currentPageNoExt = currentPageLower.endsWith('.html') ? currentPageLower.slice(0, -5) : currentPageLower;
    
    // Check each link against current page
    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href');
        
        // Skip if it's a hash link (like # for Resources)
        if (linkPath === '#') return;
        
        // Extract just the filename from the link path and normalize
        let linkPage = linkPath.split('/').pop();
        const linkPageLower = linkPage.toLowerCase();
        const linkPageNoExt = linkPageLower.endsWith('.html') ? linkPageLower.slice(0, -5) : linkPageLower;
        
        // Check if the link matches the current page
        const isMatch = 
            // Exact match (case insensitive)
            linkPageLower === currentPageLower ||
            // Match without .html extension
            linkPageNoExt === currentPageNoExt ||
            // Match with different case
            linkPageNoExt === currentPageNoExt.toLowerCase() ||
            // Match with full path
            linkPath === currentPath ||
            // Match with ./ prefix
            linkPath === `./${currentPage}` ||
            linkPath === `./${currentPageLower}`;
            
        if (isMatch) {
            link.classList.add('active');
        }
    });
}

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

document.addEventListener('DOMContentLoaded', () => {
    loadNavbar();
    loadFooter();
});