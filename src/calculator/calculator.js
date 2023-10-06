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

	precedenceSameOrHigher = (stack, newItem) => {
		let topItem = stack[stack.length -1]
		// return topItem
		//this structure doesn't work.
		const operationRanks = {
			"^": 3,
			"*" : 2, 
			"/": 2,
			"+": 1,
			"-": 1,
		}
		return operationRanks[topItem] >= operationRanks[newItem]
	}

	isOperator = (item) => {
		return item.match(this.operators)
	}
	
	pushBracketOperators = (stack, postfixResult) => {
		//1. slice from stack lastIndexOf ( to lastIndexOf )
		//2. pop all from stack -> for each in slice, push to postfix
		let bracketOperators = stack.splice(stack.lastIndexOf("("), stack.lastIndexOf(")") + 1);
		//remove left bracket
		bracketOperators.shift()
		bracketOperators.pop()
		postfixResult = [...postfixResult, ...bracketOperators.reverse()]


	}

	convertInfixToPostfix = (calcArray) => {
		let postfixResult = []
		const opStack = []
		let bracketOpen = false;
		let bracketStack = []
		//use pop rather than shift (shift has to reindex)
		//the end is the top, and the start is the bottom (lifo)
		//('Convert Infix (A + B) * (C + D) to Postfix A B + C D + *'
		
		for (let current in calcArray) {
			let c = calcArray[current];
			let temp = parseInt(c);
			
			//rule 1 - if operand, push to postfix array
			if (Number.isInteger(temp)) {
				postfixResult.push(temp)
				continue
			}

			if(c === "(") {
				opStack.push(c)
				bracketOpen = true;
				continue
			}

			if (bracketOpen && c === ")") {
				this.pushBracketOperators(opStack, postfixResult)			
				bracketOpen = false
				continue
			}
			//isOperator

			if(this.isOperator(c) && bracketOpen && !this.precedenceSameOrHigher(opStack, c)) {
				opStack.push(c)
				continue
			}
			//for item in opStack, reverse iterating
			//rule top cannot be same or higher + keep popping until top doesn't break rule
			
			if(this.isOperator(c) && this.precedenceSameOrHigher(opStack, c)) {
				postfixResult.push(opStack.pop())
				opStack.push(c)
				continue
			}

			if(this.isOperator(c) && !this.precedenceSameOrHigher(opStack, c)) {
				opStack.push(c)
				continue
			}

		}
		if(opStack.length > 0 ) {
			postfixResult = [...postfixResult, ...opStack.reverse()]
		}
		return postfixResult
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


