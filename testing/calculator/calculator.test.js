const Calculator = require("../../src/calculator/calculator")

describe("Calculator", () => {
    const testCalc = new Calculator()

    test('Separate 1+1 String into array', () => {
        expect(testCalc.getInputCalculationArray("1+1")).toStrictEqual(['1', '+', '1'])
        })

    test('Separate (1+1)(1+1)((1+1)(1+1))(1+1) String into array', () => {
        expect(testCalc.getInputCalculationArray('(1+1)(1+1)((1+1)(1+1))(1+1)')).toStrictEqual(['(','1', '+', '1',')','(','1', '+', '1',')','(','(','1', '+', '1',')','(','1', '+', '1',')' ])
        })
})
