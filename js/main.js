
function loadNavbar() {
    fetch('components/navbar.html')
        .then(response => response.text())
        .then(html => {
            const temp = document.createElement('div');
            temp.innerHTML = html;
            
            const header = document.querySelector('header');
            if (header) {
                header.outerHTML = temp.innerHTML;
                
                setupNavbar();
                
                if (!document.querySelector('link[href*="font-awesome"]')) {
                    const fontAwesome = document.createElement('link');
                    fontAwesome.rel = 'stylesheet';
                    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css';
                    document.head.appendChild(fontAwesome);
                }
                
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
    
    navLinks.forEach(link => link.classList.remove('active'));
    
    if (currentPage === '' || currentPage.toLowerCase() === 'index.html') {
        const homeLinks = document.querySelectorAll('.navbar-links a[href="index.html" i], .navbar-links a[href="/" i], .navbar-links a[href="./" i]');
        homeLinks.forEach(link => link.classList.add('active'));
        return;
    }
    
    const currentPageLower = currentPage.toLowerCase();
    const currentPageNoExt = currentPageLower.endsWith('.html') ? currentPageLower.slice(0, -5) : currentPageLower;
    
    navLinks.forEach(link => {
        let linkPath = link.getAttribute('href');
        
        if (linkPath === '#') return;
        
        let linkPage = linkPath.split('/').pop();
        const linkPageLower = linkPage.toLowerCase();
        const linkPageNoExt = linkPageLower.endsWith('.html') ? linkPageLower.slice(0, -5) : linkPageLower;
        
        const isMatch = 
            linkPageLower === currentPageLower ||
            linkPageNoExt === currentPageNoExt ||
            linkPageNoExt === currentPageNoExt.toLowerCase() ||
            linkPath === currentPath ||
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