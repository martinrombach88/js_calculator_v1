let calcInput = prompt("Please enter your calculation");
let calcNums = calcInput.match(/\d+/g);
let calcOps = calcInput.match(/[\+\-\*\//]+/);
//Regex breakdown

alert(`nums = ${calcNums}`);
alert(`ops = ${calcOps}`);
//make a calcOperators, then merge the arrays (at 1, 3, 5 etc)
//or make a regex that also grabs the operators!

let b = 0; //base
let n = 0; //newNum (for multi operator operations)
let o = ""; //operator
let baseChanged = false;
let newOperator = false;

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
			return -1;
	}
};

//you are iterating over the letters. so this only
//calculates single numbers

//you need to split the calc string into nums and strings.
//the logic should operate the same for a split array of numbers and arrays

// for (let current in calc) {
// 	let c = calc[current];

// 	//if !baseChanged
// 	//if c == num && b = 0, b = c.
// 	if (!baseChanged) {
// 		if (!isNaN(c)) {
// 			b = c;
// 			baseChanged = true;
// 			//if c == num && b = 0, invalid
// 		} else {
// 			alert("Invalid calculation. Enter a number first.");
// 			break;
// 		}
// 	} else {
// 		if (!newOperator ) {
// 			if (isNaN(c)) {
// 				o = c;
// 				newOperator  = true;
// 			}
// 		} else {
// 			if (!isNaN(c)) {
// 				alert(`${calc} = ${calculate(o, b, c)}`);
// 			}
// 		}
// 	}
// }
