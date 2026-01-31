/**
 * Electricity Calculator - Main JavaScript
 * Handles form interactions, validation, and UI enhancements
 */

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

/**
 * Initialize the application
 */
function initializeApp() {
    setupFormValidation();
    setupInputEffects();
    setupButtonEffects();
    setupResultAnimations();
    setupNumberFormatting();
}

/**
 * Form validation with visual feedback
 */
function setupFormValidation() {
    const form = document.querySelector('.calculator-form');
    if (!form) return;

    const inputs = form.querySelectorAll('.form-control');

    inputs.forEach(input => {
        // Real-time validation
        input.addEventListener('input', function() {
            validateInput(this);
        });

        // Validation on blur
        input.addEventListener('blur', function() {
            validateInput(this, true);
        });
    });

    // Form submission handling
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateInput(input, true)) {
                isValid = false;
            }
        });

        if (isValid) {
            showLoadingState();
        }
    });
}

/**
 * Validate individual input
 */
function validateInput(input, showError = false) {
    const value = parseFloat(input.value);
    const isRequired = input.hasAttribute('required');
    const min = parseFloat(input.getAttribute('min')) || 0;
    
    let isValid = true;

    if (isRequired && (input.value === '' || isNaN(value))) {
        isValid = false;
    } else if (value < min) {
        isValid = false;
    }

    // Update visual state
    if (showError && !isValid) {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
    } else if (input.value !== '') {
        input.classList.remove('is-invalid');
        if (isValid) {
            input.classList.add('is-valid');
        }
    } else {
        input.classList.remove('is-invalid', 'is-valid');
    }

    return isValid;
}

/**
 * Setup input focus and interaction effects
 */
function setupInputEffects() {
    const inputs = document.querySelectorAll('.form-control');

    inputs.forEach(input => {
        const wrapper = input.closest('.form-group');
        
        input.addEventListener('focus', function() {
            wrapper?.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            wrapper?.classList.remove('focused');
        });

        // Floating label effect (if value exists)
        if (input.value) {
            wrapper?.classList.add('has-value');
        }

        input.addEventListener('input', function() {
            if (this.value) {
                wrapper?.classList.add('has-value');
            } else {
                wrapper?.classList.remove('has-value');
            }
        });
    });
}

/**
 * Setup button click effects
 */
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            createRipple(e, this);
        });
    });

    // Reset button functionality
    const resetBtn = document.querySelector('.btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', function(e) {
            e.preventDefault();
            resetForm();
        });
    }
}

/**
 * Create ripple effect on button click
 */
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple 0.6s ease-out;
        pointer-events: none;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
}

/**
 * Show loading state on form submission
 */
function showLoadingState() {
    const submitBtn = document.querySelector('.btn-primary');
    if (submitBtn) {
        submitBtn.classList.add('btn-loading');
        submitBtn.innerHTML = '<span class="btn-text">Calculate</span>';
    }
}

/**
 * Reset form and clear validation states
 */
function resetForm() {
    const form = document.querySelector('.calculator-form');
    if (!form) return;

    form.reset();

    // Explicitly clear all number fields
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        if (input.type === 'number') {
            input.value = '';
        }
        input.classList.remove('is-valid', 'is-invalid');
        input.closest('.form-group')?.classList.remove('has-value', 'focused');
    });

    // Hide results if visible
    const results = document.querySelector('.results-section');
    if (results) {
        results.style.animation = 'fadeOutDown 0.3s ease forwards';
        setTimeout(() => {
            results.style.display = 'none';
        }, 300);
    }

    // Focus first input
    inputs[0]?.focus();
}

/**
 * Setup result card animations
 */
function setupResultAnimations() {
    const resultCards = document.querySelectorAll('.result-card');
    
    if (resultCards.length === 0) return;

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-in');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    resultCards.forEach(card => {
        observer.observe(card);
    });

    // Animate numbers
    animateNumbers();
}

/**
 * Animate number values in results
 */
function animateNumbers() {
    const numberElements = document.querySelectorAll('.result-value');
    
    numberElements.forEach(el => {
        const finalValue = el.textContent;
        const numericValue = parseFloat(finalValue.replace(/[^\d.-]/g, ''));
        
        if (isNaN(numericValue)) return;

        let startValue = 0;
        const duration = 800;
        const startTime = performance.now();
        
        function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = startValue + (numericValue - startValue) * easeOutQuart;
            
            // Format based on original format
            if (finalValue.includes('kWh')) {
                el.textContent = currentValue.toFixed(4) + ' kWh';
            } else if (finalValue.includes('W')) {
                el.textContent = currentValue.toFixed(2) + ' W';
            } else {
                el.textContent = currentValue.toFixed(2);
            }
            
            if (progress < 1) {
                requestAnimationFrame(updateNumber);
            } else {
                el.textContent = finalValue;
            }
        }
        
        requestAnimationFrame(updateNumber);
    });
}

/**
 * Setup number formatting for inputs
 */
function setupNumberFormatting() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        // Prevent invalid characters
        input.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter, decimal point, minus
            if ([46, 8, 9, 27, 13, 110, 190, 189].includes(e.keyCode) ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey) ||
                (e.keyCode === 67 && e.ctrlKey) ||
                (e.keyCode === 86 && e.ctrlKey) ||
                (e.keyCode === 88 && e.ctrlKey) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) &&
                (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }
        });
    });
}

/**
 * Add CSS animation for fadeOutDown
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
    
    .form-control.is-valid {
        border-color: #10b981;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%2310b981' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        padding-right: 40px;
    }
    
    .form-control.is-invalid {
        border-color: #ef4444;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23ef4444'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23ef4444' stroke='none'/%3e%3c/svg%3e");
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 16px;
        padding-right: 40px;
    }
    
    .form-group.focused .form-label {
        color: #6366f1;
    }
    
    .animate-in {
        animation: slideInRight 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
`;
document.head.appendChild(style);
