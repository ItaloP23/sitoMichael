document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // Toggle menu hamburger
    hamburgerMenu.addEventListener('click', function() {
        hamburgerMenu.classList.toggle('active');
        navLinks.classList.toggle('active');
        body.classList.toggle('menu-open');
    });

    // Chiudi menu quando si clicca su un link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });

    // Chiudi menu con tasto ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            hamburgerMenu.classList.remove('active');
            navLinks.classList.remove('active');
            body.classList.remove('menu-open');
        }
    });

    // Smooth scroll per i link interni alla pagina
    navLinksItems.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Solo per link interni (che iniziano con #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
