document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');

    const fields = [
        { id: 'fullName', testId: 'test-contact-name', errorTestId: 'test-contact-error-name', required: true },
        { id: 'email', testId: 'test-contact-email', errorTestId: 'test-contact-error-email', required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Must be a valid email format (e.g., name@domain.com).' },
        { id: 'subject', testId: 'test-contact-subject', errorTestId: 'test-contact-error-subject', required: true },
        { id: 'message', testId: 'test-contact-message', errorTestId: 'test-contact-error-message', required: true, minLength: 10, message: 'Message must be at least 10 characters long.' }
    ];

    const showError = (fieldId, message) => {
        const errorElement = document.querySelector(`[data-testid="test-contact-error-${fieldId}"]`);
        const inputElement = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = message ? 'block' : 'none';
        }
        if (inputElement) {
            inputElement.setAttribute('aria-invalid', message ? 'true' : 'false');
            inputElement.setAttribute('aria-describedby', `error-${fieldId}`);
        }
    };

    const validateField = (field) => {
        const input = document.getElementById(field.id);
        const value = input.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required.';
        } else if (field.pattern && !field.pattern.test(value)) {
            isValid = false;
            errorMessage = field.message;
        } else if (field.minLength && value.length < field.minLength) {
            isValid = false;
            errorMessage = field.message;
        }

        showError(field.id.toLowerCase(), errorMessage);
        return isValid;
    };

    const validateForm = () => {
        let isFormValid = true;
        fields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    };

    fields.forEach(field => {
        const input = document.getElementById(field.id);
        input.addEventListener('blur', () => validateField(field));
        input.addEventListener('input', () => {
            if (input.value.trim().length > 0) {
                 validateField(field); 
            }
        });
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        successMessage.setAttribute('aria-hidden', 'true');
        successMessage.style.display = 'none';

        if (validateForm()) {
            form.reset();
            successMessage.setAttribute('aria-hidden', 'false');
            successMessage.style.display = 'block';
            
            console.log('Form Submitted Successfully!');
        } else {
            console.log('Form validation failed.');
        }
    });
});