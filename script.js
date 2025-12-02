document.addEventListener('DOMContentLoaded', () => {
    const resultInput = document.getElementById('result');
    const keys = document.querySelector('.keys');
    
    // Clear the initial '0' when the first input starts
    let calculationStarted = false;

    keys.addEventListener('click', (event) => {
        const button = event.target;
        if (button.tagName !== 'BUTTON') return;

        const input = button.dataset.input;
        const action = button.dataset.action;

        if (input) {
            handleInput(input);
        } else if (action === 'clear') {
            clearDisplay();
        } else if (action === 'calculate') {
            calculateResult();
        }
    });

    function handleInput(value) {
        // If display is '0' or an ERROR, and we press a number, clear it.
        if ((resultInput.value === '0' || resultInput.value === 'ERROR!') && value !== '.') {
            resultInput.value = value;
            calculationStarted = true;
        } else {
            // Simple logic to prevent duplicate operators (optional)
            const lastChar = resultInput.value.slice(-1);
            if (isOperator(lastChar) && isOperator(value)) {
                // Replace the last operator with the new one
                resultInput.value = resultInput.value.slice(0, -1) + value;
            } else {
                resultInput.value += value;
            }
            calculationStarted = true;
        }
    }

    function clearDisplay() {
        resultInput.value = '0';
        calculationStarted = false;
    }

    function calculateResult() {
        if (!calculationStarted) return;
        
        try {
            // Replace the 'x' display character with '*' for JavaScript eval
            const expression = resultInput.value.replace(/x/g, '*');
            // Use the built-in eval function for simple calculation
            let result = eval(expression);
            
            // Handle floating point errors (optional, for cleaner display)
            if (result % 1 !== 0) {
                 result = parseFloat(result.toFixed(5));
            }

            resultInput.value = result;
        } catch (error) {
            resultInput.value = 'ERROR!';
        }
        calculationStarted = false;
    }

    function isOperator(char) {
        return ['+', '-', '*', '/', 'x'].includes(char);
    }
});
