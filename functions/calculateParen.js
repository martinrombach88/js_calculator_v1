import calculate from "./calculate";

const calculateParen = (array) => {
	//only works for single occurrence.
	//Could create array of all paren operations,
	//calculate and return. (while ?)

	//all paren operations multiply each other.

	let parens = array.splice(array.indexOf("("), array.indexOf(")") + 1);

	//delete 0, -1
	parens.shift();
	parens.pop();
	parens = calculate(parens[1], parens[0], parens[2]);

	return parens;
};

export default calculateParen;
