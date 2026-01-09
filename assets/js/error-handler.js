// CeremonIA - Error Handling Utilities
// User-friendly error messages and retry mechanisms

/**
 * Error Types
 */
const ErrorTypes = {
    NETWORK: 'network',
    VALIDATION: 'validation',
    GENERATION: 'generation',
    AUTH: 'auth',
    UNKNOWN: 'unknown'
};

/**
 * User-friendly error messages
 */
const ErrorMessages = {
    network: {
        title: 'Connection Error',
        message: 'We couldn\'t connect to the server. Please check your internet connection and try again.',
        retry: true
    },
    validation: {
        title: 'Validation Error',
        message: 'Please check your input and try again.',
        retry: false
    },
    generation: {
        title: 'Generation Failed',
        message: 'We couldn\'t generate your ceremony text. Please try again or contact support if the problem persists.',
        retry: true
    },
    auth: {
        title: 'Authentication Error',
        message: 'Invalid email or password. Please check your credentials and try again.',
        retry: false
    },
    unknown: {
        title: 'Something Went Wrong',
        message: 'An unexpected error occurred. Please try again or contact support.',
        retry: true
    }
};

/**
 * Show error modal
 */
function showErrorModal(errorType, customMessage = null, onRetry = null) {
    const error = ErrorMessages[errorType] || ErrorMessages.unknown;
    const message = customMessage || error.message;
    
    // Create or get error modal
    let errorModal = document.getElementById('error-modal');
    if (!errorModal) {
        errorModal = createErrorModal();
        document.body.appendChild(errorModal);
    }
    
    // Update content
    document.getElementById('error-title').textContent = error.title;
    document.getElementById('error-message').textContent = message;
    
    // Show/hide retry button
    const retryButton = document.getElementById('error-retry');
    if (error.retry && onRetry) {
        retryButton.classList.remove('hidden');
        retryButton.onclick = function() {
            closeErrorModal();
            onRetry();
        };
    } else {
        retryButton.classList.add('hidden');
    }
    
    // Show modal
    errorModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    
    // Focus on close button for accessibility
    const closeButton = errorModal.querySelector('[aria-label="Close error modal"]');
    if (closeButton) {
        closeButton.focus();
    }
    
    // Announce to screen readers
    if (window.accessibilityUtils) {
        window.accessibilityUtils.announceToScreenReader(`${error.title}: ${message}`, 'assertive');
    }
}

/**
 * Create error modal HTML
 */
function createErrorModal() {
    const modal = document.createElement('div');
    modal.id = 'error-modal';
    modal.className = 'hidden fixed inset-0 z-[70] flex items-center justify-center';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'error-title');
    modal.setAttribute('aria-describedby', 'error-message');
    modal.setAttribute('aria-modal', 'true');
    
    modal.innerHTML = `
        <div class="absolute inset-0 bg-[#2A2826]/90 backdrop-blur-sm" onclick="closeErrorModal()" aria-label="Close error modal"></div>
        <div class="bg-white p-12 w-full max-w-md relative z-10 animate-[fadeInUp_0.3s_ease-out] shadow-2xl">
            <button onclick="closeErrorModal()" 
                aria-label="Close error modal"
                class="absolute top-6 right-6 text-2xl hover:rotate-90 transition-transform">×</button>
            <div class="mb-6">
                <svg class="w-16 h-16 mx-auto text-red-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <h2 id="error-title" class="font-goldney text-3xl text-center mb-4"></h2>
                <p id="error-message" class="font-luz text-sm text-[#6B665F] text-center leading-relaxed"></p>
            </div>
            <div class="flex gap-4">
                <button onclick="closeErrorModal()" 
                    class="flex-1 py-3 border border-[#E5E2DD] hover:bg-[#F9F8F6] transition-colors uppercase tracking-[0.2em] text-xs font-luz text-[#6B665F]">
                    Close
                </button>
                <button id="error-retry" 
                    class="hidden flex-1 bg-[#2A2826] text-white py-3 font-luz uppercase tracking-[0.2em] text-xs hover:bg-[#823AAF] transition-colors">
                    Try Again
                </button>
            </div>
        </div>
    `;
    
    return modal;
}

/**
 * Close error modal
 */
function closeErrorModal() {
    const errorModal = document.getElementById('error-modal');
    if (errorModal) {
        errorModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

/**
 * Handle generation error with retry
 */
function handleGenerationError(error, retryFunction) {
    showErrorModal(ErrorTypes.GENERATION, null, retryFunction);
}

/**
 * Handle network error with retry
 */
function handleNetworkError(error, retryFunction) {
    showErrorModal(ErrorTypes.NETWORK, null, retryFunction);
}

/**
 * Show inline error message
 */
function showInlineError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.classList.remove('hidden');
        element.setAttribute('role', 'alert');
        element.setAttribute('aria-live', 'polite');
    }
}

/**
 * Hide inline error message
 */
function hideInlineError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
        element.removeAttribute('role');
        element.removeAttribute('aria-live');
    }
}

// Export for use in other files
window.errorHandler = {
    showErrorModal,
    closeErrorModal,
    handleGenerationError,
    handleNetworkError,
    showInlineError,
    hideInlineError,
    ErrorTypes
};

// Close error modal on Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeErrorModal();
    }
});

