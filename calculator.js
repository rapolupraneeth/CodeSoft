document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = Array.from(document.getElementsByClassName('button'));
    let currentInput = '';
    let operator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function handleOperator(value) {
        if (currentInput) {
            if (previousInput && operator) {
                previousInput = evaluate(previousInput, currentInput, operator).toString();
                updateDisplay(previousInput);
            } else {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = value;
            shouldResetDisplay = true;
        }
    }

    function evaluate(a, b, operator) {
        const numA = parseFloat(a);
        const numB = parseFloat(b);
        switch(operator) {
            case '+': return numA + numB;
            case '-': return numA - numB;
            case '*': return numA * numB;
            case '/': return numA / numB;
            default: return b;
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', (e) => {
            const value = e.target.getAttribute('data-value');

            switch(value) {
                case 'C':
                    currentInput = '';
                    operator = '';
                    previousInput = '';
                    updateDisplay('0');
                    break;
                case '=':
                    if (currentInput && previousInput && operator) {
                        try {
                            const result = evaluate(previousInput, currentInput, operator);
                            updateDisplay(result);
                            currentInput = result.toString();
                            previousInput = '';
                            operator = '';
                        } catch (error) {
                            updateDisplay('Error');
                            currentInput = '';
                            previousInput = '';
                            operator = '';
                        }
                    }
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    handleOperator(value);
                    break;
                case 'D': // Add delete functionality
                    currentInput = currentInput.slice(0, -1);
                    updateDisplay(currentInput);
                    break;
                default:
                    if (shouldResetDisplay) {
                        currentInput = '';
                        shouldResetDisplay = false;
                    }
                    currentInput += value;
                    updateDisplay(currentInput);
            }
        });
    });
});
