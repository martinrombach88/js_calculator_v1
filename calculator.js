export default class Calculator {
	constructor() {
		this.regex = /\d+|[\(\)\+\-\*\//]+/g;
	}

	calculate = (operator, base, newnum) => {
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

	calculateParen = (array) => {
		//output -> runs array with parens first

		//issues:
		//operators before a parens are left in the wrong order
		//e.g. 5 + (5+5) becomes (5+5) 5 +

		//handle multiple (infinite) parens
		//init sum/operator -> first paren calculation uses
		//the init sum/operator.
		//but -> two paren sums multiply each other.

		//1. handle paren operations
		//(5+5),(5+5) becomes (5+5) * (5+5)
		//(5+5),(5+5), +, 5 = ((5+5) * (5+5)) + 5
		//(5+5), (5+5), (5+5), (5+5),  +, 5 = ((5+5) * (5+5) * (5+5) * (5+5))

		//2. handle regular operations (apply to result of paren operations)

		// Uncaught TypeError: parens is not iterable
		//     at calculator.js:60:17

		//only works for single occurrence.
		//Could create array of all paren operations,
		//calculate and return. (while ?)

		//all paren operations multiply each other.

		let parens = array.splice(array.indexOf("("), array.indexOf(")") + 1);

		//delete 0, -1
		parens.shift();
		parens.pop();
		parens = this.calculate(parens[1], parens[0], parens[2]);

		return parens;
	};

	promptUser = () => {
		let userCalculation = prompt("Please enter your calculation");
		let calcArray = userCalculation.match(this.regex);
		let parens = this.calculateParen(calcArray);
		calcArray = [parens, ...calcArray];
		this.runAllOperations(calcArray);
	};

	runAllOperations = (calcArray) => {
		let base = 0;
		let operator = "";
		let initialBaseSet = false;
		let initialOperatorSet = false;

		for (let current in calcArray) {
			let item = calcArray[current];

			if (!initialBaseSet && isNaN(item)) {
				alert("Invalid calculation. Enter a number first.");
				break;
			}

			if (!initialBaseSet) {
				base = item;
				initialBaseSet = true;
				continue;
			}

			if (!initialOperatorSet && isNaN(item)) {
				operator = item;
				initialOperatorSet = true;
				continue;
			}

			if (initialBaseSet && initialOperatorSet && isNaN(item)) {
				operator = item;
				continue;
			}

			if (initialBaseSet && initialOperatorSet && !isNaN(item)) {
				base = this.calculate(operator, base, item);
				continue;
			}
		}
		alert(`${calcArray.join("")} = ${base}`);
	};
}
