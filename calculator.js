let userCalculation = prompt("Please enter your calculation");
let calcArray = userCalculation.match(/\d+|[\+\-\*\//]+/g);
//Regex breakdown
//\d+ all occurrences of a number
//[\+\-\*\//]+ all occurences of the characters within []
//multiple assertions joined with |

//any other issues with input?
//paranthes

let base = 0; //base
let operator = ""; //operator
let initialBaseSet = false;
let initialOperatorSet = false;

//let b = 0; //base
//let o = ""; //operator
//let n = 0; //newNum (for multi operator operations)
// let baseChanged = false;
// let newOperator = false;

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

//next:
//multiple operators
/*follow fab's rules:
1 - Avoid more than 2 indentations 
2 - Avoid to use if inside an if
3 - Avoid to use else statement
4 - Use the least indentation for happy path
*/

//first iteration
//1. set the base num
//2. set a temp operator
//3. set a temp addition num
//4. run calc on base, operator and addNum and set base to new value

//every subsequent iteration, until no extra operator
//1. update operator
//2. update addition num
//3. run calc on base/operator/addnum again

//return alert of base after all addnums used

for (let i = 0; i <= calcArray.length; i++) {
	let item = calcArray[i];

	if (!initialBaseSet && isNaN(item)) {
		alert("Invalid calculation. Enter a number first.");
		break;
	}

	if (!initialBaseSet) {
		//set
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
		base = calculate(operator, base, item);
		continue;
	}
}
alert(`${calcArray.join("")} = ${base}`);
/*
for (let current in calcArray) {
	let c = calcArray[current];

	//if !baseChanged
	//if c == num && b = 0, b = c.
	if (!baseChanged) {
		if (!isNaN(c)) {
			b = c;
			baseChanged = true;
			//if c == num && b = 0, invalid
		} else {
			alert("Invalid calculation. Enter a number first.");
			break;
		}
	} else {
		if (!newOperator) {
			if (isNaN(c)) {
				o = c;
				newOperator = true;
			}
		} else {
			if (!isNaN(c)) {
				alert(`${calcArray.join("")} = ${calculate(o, b, c)}`);
			}
		}
	}
}
*/
