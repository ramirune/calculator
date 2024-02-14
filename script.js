const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

//  calculation logics
const calculate = {
	'+': (firstNum, secondNum) => firstNum + secondNum,
	'-': (firstNum, secondNum) => firstNum - secondNum,
	'*': (firstNum, secondNum) => firstNum * secondNum,
	'/': (firstNum, secondNum) => firstNum / secondNum,
	'=': (firstNum, secondNum) => secondNum,
};

// begin value
let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

// click number
function sendNumberValue(number) {
	if (!awaitingNextValue) {
		const displayValue = calculatorDisplay.textContent;
		calculatorDisplay.textContent =
			displayValue === '0' ? number : displayValue + number;
	} else {
		calculatorDisplay.textContent = number;
		awaitingNextValue = false;
	}
}

// click decimal
function addDecimal() {
	if (awaitingNextValue) return; /* opertor is active */
	if (!calculatorDisplay.textContent.includes('.')) {
		calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
	}
}

// click operator
function useOperator(operator) {
	// console.log(operator);
	const currentValue = Number(calculatorDisplay.textContent);
	if (operatorValue && awaitingNextValue) {
		operatorValue = operator;
		return;
	}

	if (!firstValue) {
		firstValue = currentValue;
	} else {
		const calculation = calculate[operatorValue](firstValue, currentValue);
		calculatorDisplay.textContent = calculation;
		firstValue = calculation;
	}

	awaitingNextValue = true;
	operatorValue = operator;
}

// reset clear
function resetAll() {
	firstValue = 0;
	operatorValue = '';
	awaitingNextValue = false;
	calculatorDisplay.textContent = '0';
}

// Event Listeners
inputBtns.forEach(inputBtn => {
	if (inputBtn.classList.length === 0) {
		inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
	} else if (inputBtn.classList.contains('operator')) {
		inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
	} else if (inputBtn.classList.contains('decimal')) {
		inputBtn.addEventListener('click', () => addDecimal());
	}
});

clearBtn.addEventListener('click', resetAll);
