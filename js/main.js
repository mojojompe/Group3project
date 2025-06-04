
function loadNavbar() {
    // Load navbar
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('header').outerHTML = html;
            
            setupNavbar();
            setActiveLink();
            
            const fontAwesome = document.createElement('link');
            fontAwesome.rel = 'stylesheet';
            fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
            document.head.appendChild(fontAwesome);
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
    const navLinks = document.querySelectorAll('.navbar-links a');
    const currentPath = window.location.pathname;
    
    // Special case for index.html or root path
    if (currentPath.endsWith('/') || currentPath.endsWith('index.html')) {
        const homeLink = document.querySelector('.navbar-links a[href="index.html"], .navbar-links a[href="/"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
        return;
    }
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        // Remove active class from all links first
        link.classList.remove('active');
        
        // Check if the link's href matches the current page
        if (currentPath.endsWith(linkPath)) {
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