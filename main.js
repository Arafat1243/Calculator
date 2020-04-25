class Calculator {
    constructor() {
        this.previousOperandTextElement = document.querySelector('[data-previous-operand]'),
            this.currentOperandTextElement = document.querySelector('[data-current-operand]'),
            this.clear(),
            this.default(),
            this.setting(),
            this.colorPlat();
        let colorScame = localStorage.getItem('colorScame');
        if (colorScame != null && colorScame != undefined) {
            const body = document.querySelector('body');
            body.classList.replace(body.classList[0], colorScame);
            document.querySelectorAll('.color-btn').forEach((btn) => {
                btn.classList.remove('active');
                if (btn.classList.contains(colorScame)) {
                    btn.classList.add('active');
                }
            });
        }

    }
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return
        }
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = '';

    }
    getDisplayNumber(number) {
        const stringNumber = number.toString(),
            integerDigits = parseFloat(stringNumber.split('.')[0]),
            decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            return integerDisplay
        }
    }
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
            this.previousOperandTextElement.innerText = '';
        }
    }
    default () {
        const numberButtons = document.querySelectorAll('[data-number]'),
            operationButtons = document.querySelectorAll('[data-operation]'),
            equalsButton = document.querySelector('[data-equals]'),
            allClearButton = document.querySelector('[data-all-clear]'),
            deleteButton = document.querySelector('[data-delete]');
        numberButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.appendNumber(button.innerText);
                calculator.updateDisplay();
            });
        });

        operationButtons.forEach(button => {
            button.addEventListener('click', () => {
                calculator.chooseOperation(button.innerText);
                calculator.updateDisplay();
            });
        });
        equalsButton.addEventListener('click', () => {
            calculator.compute();
            calculator.updateDisplay();
        });
        allClearButton.addEventListener('click', () => {
            calculator.clear();
            calculator.updateDisplay();
        });
        deleteButton.addEventListener('click', () => {
            calculator.delete();
            calculator.updateDisplay();
        });
    }
    setting() {
        document.querySelector('.control').addEventListener('click', (e) => {
            e.target.classList.toggle('active')
            document.querySelector('.color-scame').classList.toggle('active');
        });
    }
    colorPlat() {
        const colorPlate = document.querySelector('.color-scame');
        colorPlate.addEventListener('click', (e) => {
            if (e.target.classList.contains('color-btn')) {
                document.querySelectorAll('.color-btn').forEach((btn) => {
                    btn.classList.remove('active');
                });
                e.target.classList.add('active');
                document.querySelector('body').classList.replace(document.querySelector('body').classList[0], e.target.classList[1]);
                localStorage.setItem('colorScame', e.target.classList[1]);
            }
        });
    }
}
// selection section

const calculator = new Calculator();
// event section