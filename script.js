document.addEventListener('DOMContentLoaded', function() {
    // Initialisation des icônes Lucide
    lucide.createIcons();
    
    // Préchargement des images du méga-menu
    const preloadedImages = [];
    const imageUrls = [
        './assets/Image_Informatique.jpg',
        './assets/vente_materiel.jpg',
        './assets/maintenance_support.jpg',
        './assets/Optimisation_de_Systèmes.jpg',
        './assets/Image_Solaire.jpg',
        './assets/Dimensionnement_energetique.jpg',
        './assets/electricite_Generale.jpg',
        './assets/Diagnostic-de_pannes.jpg',
        './assets/Reparation_de_cartes.jpg',
        './assets/Maintenance_preventive.jpg',
        './assets/Expertise_specifique.jpg',
        './assets/Image_Formation.jpg'
    ];
    
    function preloadImages() {
        imageUrls.forEach(url => {
            const img = new Image();
            img.src = url;
            preloadedImages.push(img);
        });
    }
    
    // Typewriter Effect pour le Hero
    preloadImages();
    
    const typewriter = new Typewriter('#typewriter', {
        loop: true,
        delay: 75,
    });
    
    typewriter
        .typeString('Informatique.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Énergie Solaire.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Électronique.')
        .pauseFor(1500)
        .deleteAll()
        .typeString('Formation.')
        .pauseFor(1500)
        .deleteAll()
        .start();
    
    // Mega Menu Animation avec GSAP
    const megaMenuTrigger = document.getElementById('mega-menu-trigger');
    const megaMenu = document.getElementById('mega-menu');
    const header = document.getElementById('header');
    
    let isMegaMenuOpen = false;
    
    megaMenuTrigger.addEventListener('mouseenter', function() {
        if (!isMegaMenuOpen) {
            isMegaMenuOpen = true;
            megaMenu.classList.remove('hidden');
            
            gsap.from(megaMenu, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                ease: 'power2.out'
            });
            
            gsap.from('.mega-menu-column', {
                duration: 0.5,
                opacity: 0,
                y: 20,
                stagger: 0.1,
                ease: 'power2.out'
            });
        }
    });
    
    header.addEventListener('mouseleave', function() {
        if (isMegaMenuOpen) {
            isMegaMenuOpen = false;
            gsap.to(megaMenu, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                ease: 'power2.in',
                onComplete: function() {
                    megaMenu.classList.add('hidden');
                }
            });
        }
    });
    
    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMobileMenuOpen = false;
    
    mobileMenuBtn.addEventListener('click', function() {
        isMobileMenuOpen = !isMobileMenuOpen;
        if (isMobileMenuOpen) {
            mobileMenu.classList.remove('hidden');
            gsap.from(mobileMenu, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                ease: 'power2.out'
            });
        } else {
            gsap.to(mobileMenu, {
                duration: 0.3,
                opacity: 0,
                y: -10,
                ease: 'power2.in',
                onComplete: function() {
                    mobileMenu.classList.add('hidden');
                }
            });
        }
    });
    
    // Mobile Accordion
    const mobileAccordionTrigger = document.querySelector('.mobile-accordion-trigger');
    const mobileAccordionContent = document.querySelector('.mobile-accordion-content');
    
    if (mobileAccordionTrigger && mobileAccordionContent) {
        mobileAccordionTrigger.addEventListener('click', function() {
            mobileAccordionContent.classList.toggle('hidden');
            const icon = mobileAccordionTrigger.querySelector('svg');
            icon.classList.toggle('rotate-180');
        });
    }
    
    // Mega Menu Image Preview
    const megaMenuItems = document.querySelectorAll('.mega-menu-item');
    const previewImage = document.getElementById('preview-image');
    const previewPlaceholder = document.getElementById('preview-placeholder');
    const previewContent = document.getElementById('preview-content');
    const previewTitle = document.getElementById('preview-title');
    const previewDesc = document.getElementById('preview-desc');
    const previewLoading = document.getElementById('preview-loading');
    
    megaMenuItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const imageUrl = this.getAttribute('data-image');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            
            if (imageUrl && previewImage && previewPlaceholder && previewContent && previewTitle && previewDesc && previewLoading) {
                gsap.set(previewContent, { opacity: 1 });
                gsap.set(previewTitle, { opacity: 1 });
                gsap.set(previewDesc, { opacity: 1 });
                
                previewTitle.textContent = title;
                previewDesc.textContent = desc;
                
                previewLoading.classList.add('hidden');
                previewImage.src = imageUrl;
                
                previewPlaceholder.classList.add('hidden');
                previewContent.classList.remove('hidden');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (previewImage && previewPlaceholder && previewContent) {
                previewContent.classList.add('hidden');
                previewImage.src = '';
                previewTitle.textContent = '';
                previewDesc.textContent = '';
                previewPlaceholder.classList.remove('hidden');
                previewLoading.classList.remove('hidden');
            }
        });
    });
    
    // Smooth Scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    if (isMobileMenuOpen) {
                        isMobileMenuOpen = false;
                        gsap.to(mobileMenu, {
                            duration: 0.3,
                            opacity: 0,
                            y: -10,
                            ease: 'power2.in',
                            onComplete: function() {
                                mobileMenu.classList.add('hidden');
                            }
                        });
                    }
                    
                    if (isMegaMenuOpen) {
                        isMegaMenuOpen = false;
                        gsap.to(megaMenu, {
                            duration: 0.3,
                            opacity: 0,
                            y: -10,
                            ease: 'power2.in',
                            onComplete: function() {
                                megaMenu.classList.add('hidden');
                            }
                        });
                    }
                }
            }
        });
    });
    
    // Validation du formulaire
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        const name = document.getElementById('name');
        const nameError = document.getElementById('name-error');
        if (!name.value.trim()) {
            nameError.classList.remove('hidden');
            isValid = false;
        } else {
            nameError.classList.add('hidden');
        }
        
        const email = document.getElementById('email');
        const emailError = document.getElementById('email-error');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim() || !emailRegex.test(email.value)) {
            emailError.classList.remove('hidden');
            isValid = false;
        } else {
            emailError.classList.add('hidden');
        }
        
        const phone = document.getElementById('phone');
        const phoneError = document.getElementById('phone-error');
        if (phone && !phone.value.trim()) {
            phoneError.classList.remove('hidden');
            isValid = false;
        } else if (phone) {
            phoneError.classList.add('hidden');
        }
        
        if (isValid) {
            formSuccess.classList.remove('hidden');
            contactForm.reset();
            
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        }
    });
    
    // Service Cards Carousel Effect
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const mainImage = card.querySelector('.main-image-container');
        const carouselContainer = card.querySelector('.carousel-container');
        const carouselTrack = card.querySelector('.carousel-track');
        const description = card.querySelector('.service-description');
        const carouselImages = card.querySelectorAll('.carousel-image');
        let carouselInterval = null;
        let currentImageIndex = 0;
        
        carouselImages.forEach(img => {
            const tempImg = new Image();
            tempImg.src = img.src;
        });
        
        card.addEventListener('mouseenter', function() {
            gsap.to(description, {
                duration: 0.2,
                opacity: 0,
                onComplete: function() {
                    description.classList.add('hidden');
                }
            });
            
            carouselContainer.classList.remove('hidden');
            gsap.fromTo(carouselContainer, 
                { opacity: 0 },
                { opacity: 1, duration: 0.3 }
            );
            
            currentImageIndex = 0;
            gsap.set(carouselTrack, { x: 0 });
            carouselInterval = setInterval(() => {
                currentImageIndex = (currentImageIndex + 1) % 3;
                const translateX = -currentImageIndex * 100;
                
                gsap.to(carouselTrack, {
                    x: `${translateX}%`,
                    duration: 0.6,
                    ease: 'power2.inOut'
                });
            }, 2000);
        });
        
        card.addEventListener('mouseleave', function() {
            if (carouselInterval) {
                clearInterval(carouselInterval);
                carouselInterval = null;
            }
            
            gsap.to(carouselContainer, {
                duration: 0.2,
                opacity: 0,
                onComplete: function() {
                    carouselContainer.classList.add('hidden');
                    gsap.set(carouselTrack, { x: 0 });
                }
            });
            
            description.classList.remove('hidden');
            gsap.to(description, {
                opacity: 1,
                duration: 0.3
            });
        });
    });
    
    // FAQ Accordion
    const faqToggles = document.querySelectorAll('.faq-toggle');
    
    faqToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');
            const faqContent = faqItem.querySelector('.faq-content');
            const faqIcon = faqItem.querySelector('.faq-icon');
            const isOpen = !faqContent.classList.contains('hidden');
            
            faqToggles.forEach(otherToggle => {
                const otherItem = otherToggle.closest('.faq-item');
                const otherContent = otherItem.querySelector('.faq-content');
                const otherIcon = otherItem.querySelector('.faq-icon');
                
                if (otherItem !== faqItem) {
                    otherContent.classList.add('hidden');
                    otherIcon.setAttribute('data-lucide', 'plus');
                    otherIcon.classList.remove('text-[#F7941D]', 'rotate-45');
                    otherIcon.classList.add('text-[#00AEEF]');
                    lucide.createIcons();
                }
            });
            
            if (isOpen) {
                faqContent.classList.add('hidden');
                faqIcon.setAttribute('data-lucide', 'plus');
                faqIcon.classList.remove('text-[#F7941D]', 'rotate-45');
                faqIcon.classList.add('text-[#00AEEF]');
            } else {
                faqContent.classList.remove('hidden');
                faqIcon.setAttribute('data-lucide', 'minus');
                faqIcon.classList.remove('text-[#00AEEF]');
                faqIcon.classList.add('text-[#F7941D]');
            }
            lucide.createIcons();
        });
    });
});
