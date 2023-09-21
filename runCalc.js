//changing to calculator class ->
//How do you import the class? How do you make runCalc a module?

import Calculator from "./calculator";

const runCalc = () => {
	const calculator = new Calculator();
	calculator.promptUser();
};
export default runCalc;
