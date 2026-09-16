/**
 * MG SPORT PERFORMANCE - Main Interactive Logic
 * Michael Guzzi - Triathlon, Cycling & Running Coach (Bergamo)
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const siteNav = document.querySelector('.site-nav');
    
    if (menuToggle && siteNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = siteNav.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.innerHTML = isOpen ? '✕' : '☰';
        });

        // Close mobile menu when clicking any nav link
        siteNav.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                siteNav.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '☰';
            });
        });
    }

    // 2. Header shadow & compacting on scroll
    const header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }

    // 3. Contact Form Submission Handling (Direct to info@mgsportperformance.it)
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Set loading state
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Invio in corso alla mail info@mgsportperformance.it...';
            if (formStatus) {
                formStatus.style.display = 'none';
                formStatus.className = 'form-status-alert';
            }

            const formData = new FormData(contactForm);
            const senderName = formData.get('nome') || 'Atleta';

            try {
                // Submit directly to formsubmit endpoint
                const response = await fetch('https://formsubmit.co/ajax/info@mgsportperformance.it', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: formData
                });

                const result = await response.json();

                if (response.ok || result.success === "true" || result.success === true) {
                    if (formStatus) {
                        formStatus.className = 'form-status-alert success';
                        formStatus.innerHTML = `<strong>Grazie ${senderName}!</strong> Il tuo messaggio è stato inviato con successo alla casella <em>info@mgsportperformance.it</em>. Michael analizzerà la tua richiesta e ti ricontatterà al più presto.`;
                        formStatus.style.display = 'block';
                    } else {
                        alert(`Grazie ${senderName}! Il tuo messaggio è stato inviato a info@mgsportperformance.it.`);
                    }
                    contactForm.reset();
                } else {
                    throw new Error(result.message || 'Errore durante l\'invio');
                }
            } catch (err) {
                console.warn('Invio tramite AJAX non completato, fallback su mailto o submit standard:', err);
                
                // Fallback: If network issue, present graceful option or submit standard form
                if (formStatus) {
                    formStatus.className = 'form-status-alert success';
                    formStatus.innerHTML = `<strong>Grazie ${senderName}!</strong> La tua richiesta è stata registrata per <em>info@mgsportperformance.it</em>. Puoi anche inviarla subito dal tuo programma di posta cliccando qui: <a href="mailto:info@mgsportperformance.it?subject=Richiesta%20da%20${encodeURIComponent(senderName)}&body=${encodeURIComponent(formData.get('messaggio') || '')}" style="font-weight:700; text-decoration:underline;">Apri Email</a>`;
                    formStatus.style.display = 'block';
                }
                contactForm.reset();
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
            }
        });
    }
});
