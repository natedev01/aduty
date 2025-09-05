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
        
        // Check each section
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                // Find and highlight active link
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

    // CTA button event handler
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const toolsSection = document.querySelector('#section2');
            window.scrollTo({
                top: toolsSection.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    }

    // Tool cards hover effect
    const toolCards = document.querySelectorAll('.tool-card, .utility-card, .resource-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1.1)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.1)';
            const icon = card.querySelector('i');
            if (icon) {
                icon.style.transform = 'scale(1)';
            }
        });
    });

    // Toggle switches functionality
    const toggleSwitches = document.querySelectorAll('.switch input[type="checkbox"]');
    toggleSwitches.forEach(toggle => {
        toggle.addEventListener('change', () => {
            const settingName = toggle.parentElement.previousElementSibling.textContent;
            console.log(`Setting "${settingName}" changed to: ${toggle.checked}`);
            
            // Handle dark mode toggle
            if (settingName.includes('Dark Mode')) {
                if (toggle.checked) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            }
        });
    });

    // Animációk hozzáadása a szekcióelemekhez
    const addAnimationClasses = () => {
        // Tools section
        const toolCards = document.querySelectorAll('.tool-card');
        toolCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Utilities section
        const utilityCards = document.querySelectorAll('.utility-card');
        utilityCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Resources section
        const resourceCards = document.querySelectorAll('.resource-card');
        resourceCards.forEach((card, index) => {
            card.classList.add('reveal', 'reveal-bottom');
            card.style.transitionDelay = `${index * 0.1}s`;
        });
        
        // Settings section
        const settingsSection = document.querySelector('.settings-section');
        if (settingsSection) {
            const settingsContainer = settingsSection.querySelector('.settings-container');
            if (settingsContainer) {
                settingsContainer.classList.add('reveal', 'reveal-bottom');
            }
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

// Page load animation
window.addEventListener('load', () => {
    // Hide preloader (if there was one)
    // const preloader = document.querySelector('.preloader');
    // if (preloader) {
    //     preloader.classList.add('preloader-finish');
    // }
    
    // Hero section animations
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '1';
    }
    
    // Initialize tool buttons
    const toolButtons = document.querySelectorAll('.tool-button');
    toolButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const toolName = button.parentElement.querySelector('h3').textContent;
            console.log(`Opening tool: ${toolName}`);
            alert(`${toolName} will open here. This functionality will be implemented later.`);
        });
    });
});
