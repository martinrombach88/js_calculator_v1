/* test function - uncomment and replace default constructor to view tests

module.exports = class Calculator {
	constructor () {
		this.regex = /\d+|[\(\)\+\-\*\//]+/g;
		this.operators = /[\(\)\+\-\*\//]+/g;
	}

*/

export default class Calculator {
	constructor () {
		this.regex = /\d+|[\(\)\+\-\*\//]+/g;
		this.operators = /[\(\)\+\-\*\//]+/g;
	}

	testCalculate = (userCalculation) => {
		//test version of main calculate
		let calcArray = this.getInputArray(userCalculation)
		let postfixArray = this.convertInfixToPostfix(calcArray)
		return this.runPostfixOperations(postfixArray)
	}

	calculate = () => {
		//main function to run all the supplementary functions
		let userCalculation = prompt("Please enter your calculation");
		let calcArray = this.getInputArray(userCalculation)
		let postfixArray = this.convertInfixToPostfix(calcArray)
		alert(`${userCalculation} = ${this.runPostfixOperations(postfixArray)}`);
	};

	getInputArray = (userInput) => {
		//create array from regex + if string has two characters, split it
		return userInput.match(this.regex).flatMap((char) => (char.length > 0 && char.match(this.operators) ? char.split('') : char));
	}

	precedenceSameOrHigher = (stack, newItem) => {
		//compare top operators in stack with new item (current iteration)
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

				//keep comparing and empty stack of rule breaking items
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

	runPostfixOperations(postfixArray) {
		let stack = []
		for (let current in postfixArray) {
			let c = postfixArray[current]
			if(Number.isInteger(c)) {
				stack.push(c)
				continue
			}

			if(this.isOperator(c)) {
				let num1 = stack.pop();
				let num2 = stack.pop();
				stack.push(this.runOperation(c, num2, num1))
				continue
			}

			
		}
		return stack[0]
	}

}