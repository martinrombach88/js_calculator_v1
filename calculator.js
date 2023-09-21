let userCalculation = prompt("Please enter your calculation");
let calcArray = userCalculation.match(/\d+|[\(\)\+\-\*\//]+/g);

let parens = calcArray.splice(
	calcArray.indexOf("("),
	calcArray.indexOf(")") + 1
);

calcArray = [...parens, ...calcArray];
alert(`array: ${calcArray}`);
alert(`splice: ${parens}`);

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
//(5+5), (5+5), (5+5), (5+5),  +, 5

//2. handle regular operations (apply to result of paren operations)

let base = 0;
let operator = "";
let initialBaseSet = false;
let initialOperatorSet = false;

const calculate = (operator, base, newnum) => {
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

// for (let current in calcArray) {
// 	let item = calcArray[current];

// 	if (!initialBaseSet && isNaN(item)) {
// 		alert("Invalid calculation. Enter a number first.");
// 		break;
// 	}

// 	if (!initialBaseSet) {
// 		base = item;
// 		initialBaseSet = true;
// 		continue;
// 	}

// 	if (!initialOperatorSet && isNaN(item)) {
// 		operator = item;
// 		initialOperatorSet = true;
// 		continue;
// 	}

// 	if (initialBaseSet && initialOperatorSet && isNaN(item)) {
// 		operator = item;
// 		continue;
// 	}

// 	if (initialBaseSet && initialOperatorSet && !isNaN(item)) {
// 		base = calculate(operator, base, item);
// 		continue;
// 	}
// }
// alert(`${calcArray.join("")} = ${base}`);
