let calc = prompt("Please enter your calculation");

let b = 0; //base
let n = 0; //newNum (for multi operator operations)
let o = ""; //operator
let baseChanged = false;
let operatorChanged = false;

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

//you need to split the calc string into nums and strings

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
		if (!operatorChanged) {
			if (isNaN(c)) {
				o = c;
				operatorChanged = true;
			}
		} else {
			if (!isNaN(c)) {
				alert(`${calc} = ${calculate(o, b, c)}`);
			}
		}
	}
}
