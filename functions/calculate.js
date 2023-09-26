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

export default calculate;
