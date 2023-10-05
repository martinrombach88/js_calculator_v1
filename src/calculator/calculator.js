module.exports = class Calculator {
//export default class Calculator {

	calculate = () => {
		let userCalculation = prompt("Please enter your calculation");
		let calcArray = this.getInputCalculationArray(userCalculation)
		let parens = this.runParenOperations(calcArray);
		calcArray = parens != 0 ? [parens, ...calcArray] : calcArray;
		let result = this.runRegularOperations(calcArray);
		alert(`${userCalculation} = ${result}`);
	};

	getInputCalculationArray = (userInput) => {
		const regex = /\d+|[\(\)\+\-\*\//]+/g;
		const operators = /[\(\)\+\-\*\//]+/g;
		return userInput.match(regex).flatMap((char) => (char.length > 0 && char.match(operators) ? char.split('') : char));
	}

	convertInfixToPostfix = () => {
		// return ['5','5','+','5','5','+','*']
	}

	runOperation = (operator, base, newnum) => {
		switch (operator) {
			case "+":
				return parseFloat(base) + parseFloat(newnum);
			case "-":
				return parseFloat(base) - parseFloat(newnum);
			case "*":
				return parseFloat(base) * parseFloat(newnum);
			case "/":
				return parseFloat(base) / parseFloat(newnum);
			default:
				return 0;
		}
	};


	runParenOperations = (array) => {
		let base = 1;
		let parens = array.splice(array.indexOf("("), array.indexOf(")") + 1);

		while (parens.includes(")(")) {
			let c = parens.splice(0, parens.indexOf(")(") + 1);
			if (c[0] == "(") {
				c.shift();
			}
			c.pop();
			base = base * this.runRegularOperations(c);
		}
		parens.pop();
		base = base * this.runRegularOperations(parens);
		return base;
	};

	runRegularOperations = (calcArray) => {
		let result = 0;
		let operator = "";
		let initialResultSet = false;
		let initialOperatorSet = false;

		for (let current in calcArray) {
			let item = calcArray[current];
			if (!initialResultSet && isNaN(item)) {
				alert("Invalid calculation. Enter a number first.");
				break;
			}

			if (!initialResultSet) {
				result = item;
				initialResultSet = true;
				continue;
			}

			if (!initialOperatorSet && isNaN(item)) {
				operator = item;
				initialOperatorSet = true;
				continue;
			}

			if (initialResultSet && initialOperatorSet && isNaN(item)) {
				operator = item;
				continue;
			}

			if (initialResultSet && initialOperatorSet && !isNaN(item)) {
				result = this.runOperation(operator, result, item);
				continue;
			}
		}
		return result;
	};
}


