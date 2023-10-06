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
		//create array from regex + if string has two characters, split it
		return userInput.match(this.regex).flatMap((char) => (char.length > 0 && char.match(this.operators) ? char.split('') : char));
	}

	precedenceSameOrHigher = (stack, newItem) => {
		//compare top operator in stack with new item (current iteration)
		let topItem = stack[stack.length -1]
		const operationRanks = {
			"^": 3,
			"*" : 2, 
			"/": 2,
			"+": 1,
			"-": 1,
			"": 0,
		}
		return operationRanks[topItem] >= operationRanks[newItem]
	}

	isOperator = (item) => {
		return item.match(this.operators)
	}
	
	pushBracketOperators = (stack, postfixResult) => {
		//slice our all relevant operators and delete left bracket, append postfixResult
		let bracketOperators = stack.splice(stack.indexOf("("), stack.length - 1);
		bracketOperators.shift()
		// console.log( [...postfixResult, ...bracketOperators])
		return [...postfixResult, ...bracketOperators]
		
	}

	convertInfixToPostfix = (calcArray) => {
		//opStack acts as a stack, the end is the top, and the start is the bottom (lifo)
		let postfixResult = []
		const opStack = []
		let bracketOpen = false;
		
		for (let current in calcArray) {
			let c = calcArray[current];
			let temp = parseInt(c);
			
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
				postfixResult = this.pushBracketOperators(opStack, postfixResult)		
				bracketOpen = false
				continue
			}

			if(this.isOperator(c) && bracketOpen && !this.precedenceSameOrHigher(opStack, c)) {
				opStack.push(c)
				continue
			}
			
			if(this.isOperator(c) && this.precedenceSameOrHigher(opStack, c)) {
				postfixResult.push(opStack.pop())
				while(this.precedenceSameOrHigher(opStack, c)) {
					postfixResult.push(opStack.pop())
					
				}
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


