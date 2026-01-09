// CeremonIA - Core Logic
// Handling Mobile Nav and Modals

// Mobile Menu
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const body = document.body;

    if (menu.classList.contains('hidden')) {
        menu.classList.remove('hidden');
        menu.classList.add('flex');
        // Don't set overflow hidden on body - let the menu handle scrolling
        body.classList.add('menu-open');
    } else {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
        body.classList.remove('menu-open');
    }
}

// Global Modal Handler
// Usage: onclick="toggleModal('modal-id')"
function toggleModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;

    if (modal.classList.contains('hidden')) {
        modal.classList.remove('hidden');
        // Don't set overflow hidden on body - let the modal handle scrolling
        document.body.classList.add('modal-open');
    } else {
        modal.classList.add('hidden');
        document.body.classList.remove('modal-open');
    }
}

// Close on Escape Key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('[id$="-modal"]'); // Select all ending in -modal
        modals.forEach(modal => {
            if (!modal.classList.contains('hidden')) {
                modal.classList.add('hidden');
                document.body.classList.remove('modal-open');
            }
        });

        // Also close mobile menu
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            toggleMobileMenu();
        }
    }
});

// Smooth Scroll for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                toggleMobileMenu();
            }

            const headerOffset = 100;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }
    });
});

// Smart Navbar (Hide on Down, Show on Up)
let lastScrollY = window.scrollY;
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    if (!nav) return;

    const currentScrollY = window.scrollY;

    // If scrolling DOWN and past the header height (e.g. 100px), hide it
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        nav.classList.add('-translate-y-full');
    }
    // If scrolling UP, show it
    else if (currentScrollY < lastScrollY) {
        nav.classList.remove('-translate-y-full');
    }

    lastScrollY = currentScrollY;
});

// Password Visibility Toggle - Enhanced with ARIA
function togglePasswordVisibility(passwordId, toggleId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleButton = document.getElementById(toggleId);
    const eyeIcon = document.getElementById(passwordId.replace('password', 'eye-icon'));

    if (!passwordInput || !toggleButton) return;

    const isPassword = passwordInput.type === 'password';

    if (isPassword) {
        passwordInput.type = 'text';
        toggleButton.setAttribute('aria-label', 'Hide password');
        toggleButton.setAttribute('aria-pressed', 'true');
        if (eyeIcon) {
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
            `;
        }
    } else {
        passwordInput.type = 'password';
        toggleButton.setAttribute('aria-label', 'Show password');
        toggleButton.setAttribute('aria-pressed', 'false');
        if (eyeIcon) {
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            `;
        }
    }

    // Announce to screen readers
    if (window.accessibilityUtils) {
        window.accessibilityUtils.announceToScreenReader(
            isPassword ? 'Password is now visible' : 'Password is now hidden'
        );
    }
}

// Test Credentials (for static site testing)
// Simplified to 2 accounts: One End User, One Officiant
// Both accounts have mock data that covers all scenarios
const TEST_CREDENTIALS = {
    // End User - Can test both "first time" and "returning" flows
    // Starts completely fresh with no pre-filled data
    // After completing flow, becomes "returning user" automatically
    'user@ceremonia.com': {
        password: 'test1234',
        role: 'endUser',
        hasCeremony: false  // Will be set to true after generation
    }

    // OFFICIANT LOGIN DISABLED FOR DEMO
    // To re-enable: Uncomment the block below
    /*
    // Professional Officiant - Can test both "empty" and "with ceremonies" states
    // Starts with ceremonies (can delete to see empty state)
    ,'officiant@ceremonia.com': {
        password: 'test1234',
        role: 'officiant',
        hasCeremonies: true  // Has mock ceremonies, can delete to test empty state
    }
    */
};

// Login Handler (Static Simulation) - Enhanced with validation
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;
    const emailError = document.getElementById('login-email-error');
    const passwordError = document.getElementById('login-password-error');

    // Reset errors
    if (emailError) {
        emailError.classList.add('hidden');
        if (window.errorHandler) {
            window.errorHandler.hideInlineError('login-email-error');
        }
    }
    if (passwordError) {
        passwordError.classList.add('hidden');
        if (window.errorHandler) {
            window.errorHandler.hideInlineError('login-password-error');
        }
    }

    // Enhanced validation with email format check
    let hasErrors = false;

    if (!email) {
        if (emailError && window.errorHandler) {
            window.errorHandler.showInlineError('login-email-error', 'Email is required');
        } else if (emailError) {
            emailError.textContent = 'Email is required';
            emailError.classList.remove('hidden');
        }
        hasErrors = true;
    } else if (window.validationUtils) {
        const emailValidation = window.validationUtils.validateEmail(email);
        if (!emailValidation.valid) {
            if (emailError && window.errorHandler) {
                window.errorHandler.showInlineError('login-email-error', emailValidation.message);
            } else if (emailError) {
                emailError.textContent = emailValidation.message;
                emailError.classList.remove('hidden');
            }
            hasErrors = true;
        }
    }

    if (!password) {
        if (passwordError && window.errorHandler) {
            window.errorHandler.showInlineError('login-password-error', 'Password is required');
        } else if (passwordError) {
            passwordError.textContent = 'Password is required';
            passwordError.classList.remove('hidden');
        }
        hasErrors = true;
    }

    if (hasErrors) {
        // Announce errors to screen readers
        if (window.accessibilityUtils) {
            window.accessibilityUtils.announceToScreenReader('Please fix the errors in the form', 'assertive');
        }
        return;
    }

    // Check test credentials
    const testUser = TEST_CREDENTIALS[email.toLowerCase()];

    // Debug logging (remove in production)
    console.log('Login attempt:', { email: email.toLowerCase(), hasUser: !!testUser });

    if (testUser && testUser.password === password) {
        // Valid test credentials
        localStorage.setItem('userRole', testUser.role);
        localStorage.setItem('userEmail', email);

        // Initialize mock data for this user
        if (window.mockData) {
            window.mockData.initializeMockData(email);
        }

        // Set ceremony state based on role
        if (testUser.role === 'officiant') {
            // For Officiants, use hasCeremonies (plural)
            // Check if ceremonies exist in localStorage (from mock data)
            const ceremoniesJson = localStorage.getItem('officiantCeremonies');
            if (ceremoniesJson) {
                const ceremonies = JSON.parse(ceremoniesJson);
                localStorage.setItem('hasCeremonies', ceremonies.length > 0 ? 'true' : 'false');
            } else {
                localStorage.setItem('hasCeremonies', testUser.hasCeremonies ? 'true' : 'false');
            }
        } else {
            // For End Users, check if ceremony already exists
            // This allows testing both "first time" and "returning" scenarios
            const ceremonyExists = localStorage.getItem('ceremonyGenerated') === 'true';
            if (ceremonyExists) {
                // Returning user - ceremony already generated
                localStorage.setItem('ceremonyGenerated', 'true');
            } else {
                // First-time user - no ceremony yet
                localStorage.setItem('ceremonyGenerated', 'false');
            }
        }

        // Close login modal
        const loginModal = document.getElementById('login-modal');
        if (loginModal) loginModal.classList.add('hidden');

        // Route based on ROLE FIRST (as per requirements)
        if (testUser.role === 'officiant') {
            // Officiants ALWAYS go to Dashboard (their home/workspace)
            // Dashboard will show empty state if no ceremonies exist
            window.location.href = 'views/dashboard.html';
        } else {
            // End Users: Check if has ceremony
            if (testUser.hasCeremony) {
                // End Users with ceremony → Preview
                window.location.href = 'views/ceremony/preview.html';
            } else {
                // End Users without ceremony → Intro (once only) or Questionnaire
                const introSeen = localStorage.getItem('introSeen');
                if (introSeen === 'true') {
                    window.location.href = 'views/onboarding/questionnaire.html?block=1';
                } else {
                    window.location.href = 'views/onboarding/intro.html';
                }
            }
        }
    } else {
        // Invalid credentials - use error handler
        if (window.errorHandler) {
            window.errorHandler.showInlineError('login-password-error', 'Invalid email or password');
            // Also show error modal for better UX
            window.errorHandler.showErrorModal(
                window.errorHandler.ErrorTypes.AUTH,
                'Invalid email or password. Please check your credentials and try again.'
            );
        } else if (passwordError) {
            passwordError.textContent = 'Invalid email or password';
            passwordError.classList.remove('hidden');
        }

        // Announce error to screen readers
        if (window.accessibilityUtils) {
            window.accessibilityUtils.announceToScreenReader('Invalid email or password', 'assertive');
        }
    }
}

// Language Detection (Based on Browser)
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (!savedLang) {
        // Detect browser language
        const browserLang = navigator.language || navigator.userLanguage;
        const lang = browserLang.startsWith('fr') ? 'fr' : 'en';
        localStorage.setItem('preferredLanguage', lang);

        // Update HTML lang attribute
        const htmlElement = document.documentElement;
        if (htmlElement) {
            htmlElement.lang = lang;
        }
    } else {
        const htmlElement = document.documentElement;
        if (htmlElement) {
            htmlElement.lang = savedLang;
        }
    }
});