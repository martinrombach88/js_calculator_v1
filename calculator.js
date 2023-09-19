let calcInput = prompt("Please enter your calculation");
let calc = calcInput.match(/\d+|[\+\-\*\//]+/g);
//Regex breakdown
//\d+ all occurrences of a number
//[\+\-\*\//]+ all occurences of the characters within []
//multiple assertions joined with |

//any other issues with input?

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

//issue with single strings solved by regex collection

for (let current in calc) {
	let c = calc[current];

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
				alert(`${calc.join("")} = ${calculate(o, b, c)}`);
			}
		}
	}
}
