// CeremonIA - Form Validation Utilities
// Real-time validation, email format, password strength, character limits

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate email format
 */
function validateEmail(email) {
    if (!email) return { valid: false, message: 'Email is required' };
    if (!EMAIL_REGEX.test(email)) {
        return { valid: false, message: 'Please enter a valid email address' };
    }
    return { valid: true, message: '' };
}

/**
 * Password strength checker
 */
function checkPasswordStrength(password) {
    if (!password) {
        return { strength: 'none', score: 0, message: '' };
    }
    
    let score = 0;
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
        special: /[^A-Za-z0-9]/.test(password)
    };
    
    if (checks.length) score++;
    if (checks.uppercase) score++;
    if (checks.lowercase) score++;
    if (checks.number) score++;
    if (checks.special) score++;
    
    let strength = 'weak';
    let message = '';
    
    if (score <= 2) {
        strength = 'weak';
        message = 'Password is too weak';
    } else if (score <= 3) {
        strength = 'medium';
        message = 'Password is medium strength';
    } else {
        strength = 'strong';
        message = 'Password is strong';
    }
    
    return { strength, score, message, checks };
}

/**
 * Character limit validator
 */
function validateCharacterLimit(text, maxLength, fieldName = 'Field') {
    if (text.length > maxLength) {
        return {
            valid: false,
            message: `${fieldName} must be ${maxLength} characters or less (${text.length}/${maxLength})`
        };
    }
    return { valid: true, message: '' };
}

/**
 * Real-time email validation
 */
function setupEmailValidation(inputId, errorId) {
    const input = document.getElementById(inputId);
    const errorElement = document.getElementById(errorId);
    
    if (!input || !errorElement) return;
    
    let validationTimeout;
    
    input.addEventListener('input', function() {
        clearTimeout(validationTimeout);
        
        // Debounce validation
        validationTimeout = setTimeout(() => {
            const validation = validateEmail(this.value);
            
            if (this.value && !validation.valid) {
                showFieldError(input, errorElement, validation.message);
            } else {
                clearFieldError(input, errorElement);
            }
        }, 300);
    });
    
    input.addEventListener('blur', function() {
        const validation = validateEmail(this.value);
        if (!validation.valid) {
            showFieldError(input, errorElement, validation.message);
        }
    });
}

/**
 * Real-time password strength indicator
 */
function setupPasswordStrengthIndicator(inputId, indicatorId) {
    const input = document.getElementById(inputId);
    const indicator = document.getElementById(indicatorId);
    
    if (!input || !indicator) return;
    
    input.addEventListener('input', function() {
        const strength = checkPasswordStrength(this.value);
        
        if (!this.value) {
            indicator.classList.add('hidden');
            return;
        }
        
        indicator.classList.remove('hidden');
        
        // Update strength bar
        const strengthBar = indicator.querySelector('.strength-bar');
        const strengthText = indicator.querySelector('.strength-text');
        
        if (strengthBar) {
            strengthBar.className = `strength-bar h-1 transition-all duration-300 ${
                strength.strength === 'weak' ? 'bg-red-600 w-1/3' :
                strength.strength === 'medium' ? 'bg-yellow-600 w-2/3' :
                'bg-green-600 w-full'
            }`;
        }
        
        if (strengthText) {
            strengthText.textContent = strength.message;
            strengthText.className = `strength-text text-xs font-luz ${
                strength.strength === 'weak' ? 'text-red-600' :
                strength.strength === 'medium' ? 'text-yellow-600' :
                'text-green-600'
            }`;
        }
    });
}

/**
 * Setup character limit indicator
 */
function setupCharacterLimit(inputId, maxLength, counterId) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    
    if (!input || !counter) return;
    
    // Set maxlength attribute
    input.setAttribute('maxlength', maxLength);
    
    input.addEventListener('input', function() {
        const remaining = maxLength - this.value.length;
        counter.textContent = `${this.value.length}/${maxLength}`;
        
        if (remaining < 20) {
            counter.classList.add('text-red-600');
            counter.classList.remove('text-[#6B665F]');
        } else {
            counter.classList.remove('text-red-600');
            counter.classList.add('text-[#6B665F]');
        }
    });
    
    // Initial count
    counter.textContent = `${input.value.length}/${maxLength}`;
}

/**
 * Show field error
 */
function showFieldError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true');
    input.setAttribute('aria-describedby', errorElement.id);
    errorElement.textContent = message;
    errorElement.classList.remove('hidden');
    errorElement.setAttribute('role', 'alert');
}

/**
 * Clear field error
 */
function clearFieldError(input, errorElement) {
    input.removeAttribute('aria-invalid');
    input.removeAttribute('aria-describedby');
    errorElement.classList.add('hidden');
    errorElement.removeAttribute('role');
}

/**
 * Validate form before submission
 */
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return { valid: false, errors: [] };
    
    const errors = [];
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            const fieldName = field.getAttribute('aria-label') || field.placeholder || 'This field';
            errors.push(`${fieldName} is required`);
            field.setAttribute('aria-invalid', 'true');
        } else {
            field.removeAttribute('aria-invalid');
        }
    });
    
    // Validate email fields
    const emailFields = form.querySelectorAll('input[type="email"]');
    emailFields.forEach(field => {
        if (field.value) {
            const validation = validateEmail(field.value);
            if (!validation.valid) {
                errors.push(validation.message);
                field.setAttribute('aria-invalid', 'true');
            }
        }
    });
    
    return {
        valid: errors.length === 0,
        errors
    };
}

// Export for use in other files
window.validationUtils = {
    validateEmail,
    checkPasswordStrength,
    validateCharacterLimit,
    setupEmailValidation,
    setupPasswordStrengthIndicator,
    setupCharacterLimit,
    showFieldError,
    clearFieldError,
    validateForm
};

