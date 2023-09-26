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

	//all paren operations multiply each other.
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
	//(1+1)(1+1+1)(1+1) +1
	promptUser = () => {
		let userCalculation = prompt("Please enter your calculation");
		let calcArray = userCalculation.match(this.regex);
		let parens = this.runParenOperations(calcArray);
		calcArray = parens != 0 ? [parens, ...calcArray] : calcArray;
		let base = this.runRegularOperations(calcArray);
		alert(`${userCalculation} = ${base}`);
	};

	testOperations = (array) => {
		console.log(array);
	};

	runRegularOperations = (calcArray) => {
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
		return base;
	};
}
