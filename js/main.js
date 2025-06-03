// Load components
function loadComponents() {
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

    // Load footer
    fetch('../components/footer.html')
        .then(response => response.text())
        .then(html => {
            document.querySelector('footer').outerHTML = html;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

// Setup responsive navbar
function setupNavbar() {
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const body = document.body;

    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('is-active');
            nav.classList.toggle('is-active');
            body.classList.toggle('nav-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        const isClickInsideNav = nav.contains(e.target);
        const isClickOnHamburger = hamburger.contains(e.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && nav.classList.contains('is-active')) {
            hamburger.classList.remove('is-active');
            nav.classList.remove('is-active');
            body.classList.remove('nav-open');
        }
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && nav) {
                hamburger.classList.remove('is-active');
                nav.classList.remove('is-active');
                body.classList.remove('nav-open');
            }
        });
    });

    // Handle scroll effects
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        
        lastScroll = currentScroll;
    });
}

// Set active link based on current page
function setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkPage = linkHref.split('/').pop();
        
        // Remove active class from all links
        link.classList.remove('active');
        
        // Add active class to current page link
        if (linkPage === currentPage || 
            (currentPage === '' && linkPage === 'index.html') ||
            (currentPage === 'index.html' && linkPage === '')) {
            link.classList.add('active');
            
            // Also highlight parent menu item if this is a subpage
            const parentNavItem = link.closest('.nav-item');
            if (parentNavItem) {
                parentNavItem.classList.add('active');
            }
        }
    });
}

// Form submission handler
function setupForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show thank you message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset the form
            contactForm.reset();
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    loadComponents();
    setupForm();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
