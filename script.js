// Várakozás a DOM betöltésére
document.addEventListener('DOMContentLoaded', () => {
    // Elemek kiválasztása
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('.navbar');
    const sections = document.querySelectorAll('section');
    const revealElements = document.querySelectorAll('.reveal');

    // Navigációs menü toggle funkció
    const navSlide = () => {
        // Burger menü kattintás esemény
        burger.addEventListener('click', () => {
            // Navigációs menü megjelenítése/elrejtése
            nav.classList.toggle('nav-active');
            
            // Navigációs linkek animálása
            navLinks.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
            
            // Burger animáció
            burger.classList.toggle('toggle');
        });
    };

    // Görgetéskor a navigációs sáv stílusának változtatása
    const navScroll = () => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };

    // Aktív menüpont kiemelése görgetéskor
    const highlightMenu = () => {
        const scrollPos = window.scrollY;
        
        // Minden szekció ellenőrzése
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Aktív link keresése és kiemelése
                navLinks.forEach(link => {
                    link.querySelector('a').classList.remove('active');
                    if (link.querySelector('a').getAttribute('href') === `#${sectionId}`) {
                        link.querySelector('a').classList.add('active');
                    }
                });
            }
        });
    };

    // Scroll reveal animációk
    const scrollReveal = () => {
        const revealPoint = 150;
        
        window.addEventListener('scroll', () => {
            revealElements.forEach(element => {
                const windowHeight = window.innerHeight;
                const revealTop = element.getBoundingClientRect().top;
                
                if (revealTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                } else {
                    element.classList.remove('active');
                }
            });
        });
    };

    // Görgetés a megfelelő szekcióhoz a menüpontokra kattintáskor
    const smoothScroll = () => {
        navLinks.forEach(link => {
            link.addEventListener('click', e => {
                e.preventDefault();
                
                // Burger menü bezárása mobilon
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
                
                const href = link.querySelector('a').getAttribute('href');
                const targetSection = document.querySelector(href);
                
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
            });
        });
    };

    // CTA gomb eseménykezelő
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const aboutSection = document.querySelector('#about');
            window.scrollTo({
                top: aboutSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }

    // Portfólió elemek hover effektus
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.opacity = '1';
            overlay.style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', () => {
            const overlay = item.querySelector('.portfolio-overlay');
            overlay.style.opacity = '0';
            overlay.style.transform = 'translateY(20px)';
        });
    });

    // Űrlap elküldés kezelése
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            
            // Űrlap adatok összegyűjtése
            const formData = new FormData(contactForm);
            const formValues = Object.fromEntries(formData.entries());
            
            // Itt lenne az AJAX kérés a szerver felé
            console.log('Űrlap adatok:', formValues);
            
            // Sikeres küldés visszajelzés
            alert('Köszönjük üzenetét! Hamarosan felvesszük Önnel a kapcsolatot.');
            contactForm.reset();
        });
    }

    // Animációk hozzáadása a szekcióelemekhez
    const addAnimationClasses = () => {
        // Rólunk szekció
        const aboutSection = document.querySelector('.about-section');
        if (aboutSection) {
            aboutSection.querySelector('.about-text').classList.add('reveal', 'reveal-left');
            aboutSection.querySelector('.about-image').classList.add('reveal', 'reveal-right');
        }
        
        // Szolgáltatások szekció
        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Portfólió szekció
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach((item, index) => {
            item.classList.add('reveal', 'reveal-bottom');
            item.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Kapcsolat szekció
        const contactSection = document.querySelector('.contact-section');
        if (contactSection) {
            contactSection.querySelector('.contact-info').classList.add('reveal', 'reveal-left');
            contactSection.querySelector('.contact-form').classList.add('reveal', 'reveal-right');
        }
    };

    // Parallax effektus a hero szekcióhoz
    const parallax = () => {
        const hero = document.querySelector('.hero');
        
        window.addEventListener('scroll', () => {
            const scrollPos = window.scrollY;
            if (hero && scrollPos < hero.offsetHeight) {
                hero.style.backgroundPositionY = `${scrollPos * 0.5}px`;
            }
        });
    };

    // Funkciók inicializálása
    navSlide();
    navScroll();
    smoothScroll();
    scrollReveal();
    addAnimationClasses();
    parallax();
    
    // Görgetéskor az aktív menüpont kiemelése
    window.addEventListener('scroll', highlightMenu);
    
    // Kezdeti animációk elindítása
    setTimeout(() => {
        scrollReveal();
        highlightMenu();
    }, 100);
});

// Oldal betöltés animáció
window.addEventListener('load', () => {
    // Betöltő képernyő elrejtése (ha lenne)
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     preloader.classList.add('preloader-finish');
    // }
    
    // Hero szekció animációk
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
});
