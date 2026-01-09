// CeremonIA - Accessibility Utilities
// WCAG 2.1 AA Compliance

/**
 * Focus Management for Modals
 * Traps focus within modal and returns focus when closed
 */
let previousActiveElement = null;

function trapFocus(modalElement) {
    const focusableElements = modalElement.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Save previous focus
    previousActiveElement = document.activeElement;

    // Focus first element
    if (firstElement) {
        firstElement.focus();
    }

    // Handle Tab key
    modalElement.addEventListener('keydown', function handleTab(e) {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Return focus when modal closes
    return function returnFocus() {
        if (previousActiveElement) {
            previousActiveElement.focus();
        }
    };
}

/**
 * Announce to screen readers
 */
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    // Remove after announcement
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

/**
 * Skip Link Handler
 */
function initSkipLinks() {
    // Create skip link if it doesn't exist
    if (!document.getElementById('skip-to-main')) {
        const skipLink = document.createElement('a');
        skipLink.id = 'skip-to-main';
        skipLink.href = '#main-content';
        skipLink.className = 'sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#2A2826] focus:text-white focus:px-4 focus:py-2 focus:font-luz focus:text-xs focus:uppercase focus:tracking-[0.2em]';
        skipLink.textContent = 'Skip to main content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
}

/**
 * Initialize accessibility features
 */
document.addEventListener('DOMContentLoaded', function() {
    initSkipLinks();
    
    // Add main content landmark if missing
    const mainContent = document.querySelector('main, [role="main"]');
    if (mainContent && !mainContent.id) {
        mainContent.id = 'main-content';
    }
});

// Export for use in other files
window.accessibilityUtils = {
    trapFocus,
    announceToScreenReader,
    initSkipLinks
};

