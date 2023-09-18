let calc = prompt("Please enter your calculation");

let b = 0; //base
let n = 0; //newNum
let baseChanged = false;
let o = ""; //operator

for (let current in calc) {
	let c = calc[current];

	//aim for baseChanged ternary that calls a switch?

	//if !baseChanged
	//if c == num && b = 0, b = c.
	if (!isNaN(c) && !baseChanged) {
		b = c;
		baseChanged = true;
		//if c == num && b = 0, invalid
	} else if (isNaN(c) && !baseChanged) {
		alert("Invalid calculation. Enter a number first.");
		break;
	}

	//if baseChanged

	//if c == string && t != 0, o = c.
}
alert(`b: ${b}, baseChanged: ${baseChanged}`);

//each iteration

const calculate = (operator, base, newnum) => {
	switch (operator) {
		case "+":
			return base + newnum;
		default:
			return "something went wrong";
	}
};
//if isNan, run switch. 2 nums, run method

//check if c is operator
