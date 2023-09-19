let userCalculation = prompt("Please enter your calculation");
let calcArray = userCalculation.match(/\d+|[\+\-\*\//]+/g);
//Regex breakdown
//\d+ all occurrences of a number
//[\+\-\*\//]+ all occurences of the characters within []
//multiple assertions joined with |

//any other issues with input?
//parentheses

let base = 0; //base
let operator = ""; //operator
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
			return -1;
	}
};

for (let current in calcArray) {
	let item = calcArray[current];

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
//code below runs for single operator calculations only
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
