document.addEventListener('DOMContentLoaded', function() {
    // Scroll to top on page load
    window.scrollTo(0, 0);
    // Preloader and Delayed Content Appearance
    const preloader = document.getElementById('preloader');
    const header = document.querySelector('header');
    const heroContent = document.querySelector('.hero-content');

    if (preloader) {
        window.addEventListener('load', () => {
            // Hide preloader first
            setTimeout(() => {
                preloader.classList.add('hidden');

                // Then, after video plays for 1.5s, show header and hero content
                if (header && heroContent) {
                    // Check if we are on the homepage (where hero video exists)
                    if (document.getElementById('hero-video-background')) {
                        setTimeout(() => {
                            header.style.opacity = '1';
                            heroContent.style.opacity = '1';
                            heroContent.style.transform = 'translateY(0)';
                        }, 1500); // 1.5 seconds after preloader is hidden
                    } else {
                        // If not on homepage, show them immediately after preloader
                        header.style.opacity = '1';
                        heroContent.style.opacity = '1'; // Might not exist on other pages, but safe to try
                        if(heroContent) heroContent.style.transform = 'translateY(0)';
                    }
                }
            }, 500); // Preloader display time
        });
    } else {
        // Fallback if no preloader, show content (consider if this is needed or if preloader is guaranteed)
        if (header && heroContent) {
            if (document.getElementById('hero-video-background')) {
                 setTimeout(() => {
                    header.style.opacity = '1';
                    heroContent.style.opacity = '1';
                    heroContent.style.transform = 'translateY(0)';
                }, 1500); // 1.5 seconds delay
            } else {
                header.style.opacity = '1';
                heroContent.style.opacity = '1';
                if(heroContent) heroContent.style.transform = 'translateY(0)';
            }
        }
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate offset considering sticky header if any
                const headerOffset = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile nav if open
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Mobile navigation toggle
    const nav = document.querySelector('nav ul');
    const navContainer = document.querySelector('nav'); // Hamburger should be inside nav
    const hamburger = document.createElement('button');
    hamburger.classList.add('hamburger');
    hamburger.innerHTML = `
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
    `;
    hamburger.setAttribute('aria-label', 'Toggle navigation menu');
    hamburger.setAttribute('aria-expanded', 'false');

    if (navContainer && nav) {
        navContainer.appendChild(hamburger); // Append hamburger to nav container
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', nav.classList.contains('active'));
        });
    }
    
    // Form validation and submission with dummy loading
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formMessage.textContent = '';
            formMessage.className = ''; // Reset classes

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const submitButton = contactForm.querySelector('button[type="submit"]');

            if (!name || !email || !message) {
                displayFormMessage('Please fill in all fields.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                displayFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate server delay
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            displayFormMessage('Submitting your message...', 'loading'); // Optional loading message

            setTimeout(() => {
                // Simulate success
                displayFormMessage('Thank you for your message! We will get back to you soon.', 'success');
                contactForm.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Send Message';
            }, 1500); // 1.5 second delay
        });
    }

    function displayFormMessage(message, type) {
        if (!formMessage) return;
        formMessage.textContent = message;
        formMessage.className = type; // 'success', 'error', or 'loading'
    }

    // Email validation helper function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('main section[id]'); // Target sections within main
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Adjust offset as needed
            if (window.pageYOffset >= sectionTop) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // Scroll animations using Intersection Observer for better performance
    const animatedElements = document.querySelectorAll('.feature, .cause-card, .event-item');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of item visible
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observerInstance.unobserve(entry.target); // Stop observing once animated
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // Dummy content loading for Causes
    const causesGrid = document.getElementById('causes-grid-content');
    const causesLoadingSpinner = document.getElementById('causes-loading');
    if (causesGrid && causesLoadingSpinner) {
        setTimeout(() => {
            causesLoadingSpinner.style.display = 'none';
            const dummyCauses = [
                {
                    img: 'images/cause-education.jpg',
                    alt: 'Education Program',
                    title: 'Bright Futures Education',
                    desc: 'Empowering children with quality education and learning resources for a brighter tomorrow.',
                    btnText: 'Support Education'
                },
                {
                    img: 'images/cause-health.jpg',
                    alt: 'Healthcare Initiative',
                    title: 'Healthy Communities Initiative',
                    desc: 'Providing access to essential healthcare services and promoting wellness in underserved areas.',
                    btnText: 'Support Healthcare'
                },
                {
                    img: 'images/cause-environment.jpg',
                    alt: 'Environmental Conservation',
                    title: 'Green Planet Project',
                    desc: 'Dedicated to protecting our planet through conservation efforts and sustainable practices.',
                    btnText: 'Support Environment'
                }
            ];

            dummyCauses.forEach(cause => {
                const card = document.createElement('div');
                card.className = 'cause-card';
                card.innerHTML = `
                    <img src="${cause.img}" alt="${cause.alt}">
                    <div class="cause-card-content">
                        <h3>${cause.title}</h3>
                        <p>${cause.desc}</p>
                        <a href="#donate" class="btn btn-tertiary">${cause.btnText}</a>
                    </div>
                `;
                causesGrid.appendChild(card);
                // Re-observe for animation if cards are added dynamically and should animate
                observer.observe(card);
            });
        }, 2000); // Simulate 2-second loading time
    }

    // Dummy content loading for Events
    const eventsList = document.getElementById('events-list');
    const eventsLoadingSpinner = document.getElementById('events-loading');
    if (eventsList && eventsLoadingSpinner) {
        setTimeout(() => {
            eventsLoadingSpinner.style.display = 'none';
            const dummyEvents = [
                {
                    title: 'Annual Charity Gala 2024',
                    date: 'December 15, 2024',
                    desc: 'Join us for an inspiring evening of fundraising and celebration to support our vital projects.',
                    btnText: 'Learn More & Register'
                },
                {
                    title: 'Community Wellness Fair',
                    date: 'November 05, 2024',
                    desc: 'A day of free health check-ups, workshops, and fun activities for the whole family.',
                    btnText: 'View Event Details'
                },
                {
                    title: 'Youth Empowerment Workshop',
                    date: 'October 20, 2024',
                    desc: 'Equipping young individuals with skills and confidence for a successful future.',
                    btnText: 'Sign Up Now'
                }
            ];

            dummyEvents.forEach(event => {
                const item = document.createElement('div');
                item.className = 'event-item';
                item.innerHTML = `
                    <h3>${event.title}</h3>
                    <p><strong>Date:</strong> ${event.date}</p>
                    <p>${event.desc}</p>
                    <a href="#" class="btn btn-secondary">${event.btnText}</a>
                `;
                eventsList.appendChild(item);
                observer.observe(item);
            });
        }, 2500); // Simulate 2.5-second loading time
    }

    // Add CSS for hamburger menu and animations (if not already in CSS file, or for dynamic overrides)
    // This part is mostly handled by the CSS file now, but keeping a minimal version for hamburger if needed.
    const dynamicStyle = document.createElement('style');
    dynamicStyle.textContent = `
        .hamburger {
            display: none; /* Default hidden, shown by media query in main CSS */
            background: none;
            border: none;
            cursor: pointer;
            padding: 10px;
            z-index: 1001; /* Ensure it's above nav items if nav is absolute */
        }

        .hamburger .line {
            display: block;
            width: 25px;
            height: 3px;
            margin: 5px 0;
            background-color: var(--dark-color);
            transition: all 0.3s ease-in-out;
        }

        .hamburger.active .line:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }

        .hamburger.active .line:nth-child(2) {
            opacity: 0;
        }

        .hamburger.active .line:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }

        /* Animation classes for .feature, .cause-card, .event-item are now primarily in style.css */
        /* The .animate class is still added by JS to trigger the CSS-defined animations. */
        .feature.animate, .cause-card.animate, .event-item.animate {
            opacity: 1;
            transform: translateY(0);
        }
        #form-message.loading {
            color: var(--dark-color);
            background-color: var(--accent-color);
            border: 1px solid #FFDA47;
        }
    `;
    document.head.appendChild(dynamicStyle);

    // Account/Login Logic
    const accountNavItem = document.getElementById('account-nav-item');
    const loggedInUser = localStorage.getItem('loggedInUser');

    function updateNavAccountDisplay() {
        if (accountNavItem) {
            if (loggedInUser) {
                // User is logged in, display username and a logout option
                accountNavItem.innerHTML = `<span class="logged-in-user">Hi, ${loggedInUser}!</span> <button id="logout-button" class="btn btn-tertiary btn-small">Logout</button>`;
                const logoutButton = document.getElementById('logout-button');
                if (logoutButton) {
                    logoutButton.addEventListener('click', () => {
                        localStorage.removeItem('loggedInUser');
                        window.location.href = 'index.html'; // Redirect to home or login page
                    });
                }
            } else {
                // User is not logged in, display account icon linking to login page
                // This is the default state in HTML, but ensure it's correct if dynamically changing
                // Or, if the element is purely dynamic:
                // accountNavItem.innerHTML = `<a href="login.html" aria-label="Account"><img src="images/icon-account.svg" alt="Account" class="nav-icon"></a>`;
            }
        }
    }

    updateNavAccountDisplay(); // Call on page load

    // Login form handling (specific to login.html)
    const loginForm = document.getElementById('login-form');
    const loginMessage = document.getElementById('login-message');

    if (loginForm && loginMessage) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            loginMessage.textContent = '';
            loginMessage.className = 'form-message'; // Reset class

            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password'); // Password not validated, as per requirement
            const username = usernameInput.value.trim();

            if (!username || !passwordInput.value.trim()) {
                loginMessage.textContent = 'Please enter username and password.';
                loginMessage.classList.add('error');
                return;
            }

            // Simulate login (no backend)
            localStorage.setItem('loggedInUser', username);
            loginMessage.textContent = 'Login successful! Redirecting...';
            loginMessage.classList.add('success');

            setTimeout(() => {
                window.location.href = 'index.html'; // Redirect to homepage after login
            }, 1500);
        });
    }
});