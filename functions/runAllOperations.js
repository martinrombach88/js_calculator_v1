import calculate from "./calculate";

const runAllOperations = (calcArray) => {
	let base = 0;
	let operator = "";
	let initialBaseSet = false;
	let initialOperatorSet = false;

	for (let current in calcArray) {
		let item = calcArray[current];

		if (!initialBaseSet && isNaN(item)) {
			alert("Invalid calculation. Enter a number first.");
			break;
		}

		if (!initialBaseSet) {
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
};

export default runAllOperations;
