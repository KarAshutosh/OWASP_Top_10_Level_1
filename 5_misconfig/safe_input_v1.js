function sanitizeAndValidateInput(input) {

    const sanitizedInput = input.replace(/[<>&'"={}]/g, '');
  
    // Basic input validation
    if (typeof sanitizedInput !== 'string') {
        throw new Error('Invalid input type');
    }
  
    // Length validation
    const minLength = 4;
    const maxLength = 40;
    if (input.length < minLength || input.length > maxLength) {
        throw new Error(`Input length must be between ${minLength} and ${maxLength} characters`);
    }
    
    return sanitizedInput;
}

module.exports = {sanitizeAndValidateInput}