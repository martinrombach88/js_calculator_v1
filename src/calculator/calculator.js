module.exports = class Calculator {
//export default class Calculator {
	constructor () {
		this.regex = /\d+|[\(\)\+\-\*\//]+/g;
		this.operators = /[\(\)\+\-\*\//]+/g;
	}


	calculate = () => {
		let userCalculation = prompt("Please enter your calculation");
		let calcArray = this.getInputArray(userCalculation)
		let parens = this.runParenOperations(calcArray);
		calcArray = parens != 0 ? [parens, ...calcArray] : calcArray;
		let result = this.runRegularOperations(calcArray);
		alert(`${userCalculation} = ${result}`);
	};

	getInputArray = (userInput) => {
		return userInput.match(this.regex).flatMap((char) => (char.length > 0 && char.match(this.operators) ? char.split('') : char));
	}

	stackMustPop = (stackTopElement, newElement) => {
		const operatorRanks = {
			'^': 3,
			'*': 2,
			'/': 2, 
			'+': 1,
			'-': 1
		}
		if (operatorRanks[stackTopElement] == operatorRanks[newElement]) {
			return true;
		}
		return operatorRanks[stackTopElement] > operatorRanks[newElement]
	}

	convertInfixToPostfix = (calcArray) => {
		const postfixResult = []
		const opStack = []
		//use pop rather than shift (shift has to reindex)
		//the end is the top, and the start is the bottom (lifo)
		//('Convert Infix (A + B) * (C + D) to Postfix A B + C D + *'
		
		for (let current in calcArray) {
			let c = calcArray[current];
			 let temp = parseInt(c);

			//rule one - if operand, push to postfix array
			if (Number.isInteger(temp)) {
				postfixResult.push(temp)
				continue
			}
			if (c.match(this.operators)) {
				opStack.push(c)
				continue
			}

		}
		return {0: postfixResult, 1:opStack}
		
		

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


	// runParenOperations = (array) => {
	// 	let base = 1;
	// 	let parens = array.splice(array.indexOf("("), array.indexOf(")") + 1);

	// 	while (parens.includes(")(")) {
	// 		let c = parens.splice(0, parens.indexOf(")(") + 1);
	// 		if (c[0] == "(") {
	// 			c.shift();
	// 		}
	// 		c.pop();
	// 		base = base * this.runRegularOperations(c);
	// 	}
	// 	parens.pop();
	// 	base = base * this.runRegularOperations(parens);
	// 	return base;
	// };

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


