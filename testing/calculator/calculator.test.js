const Calculator = require("../../src/calculator/calculator")

describe("Calculator", () => {
    const testCalc = new Calculator()

    test('Separate 1+1 String into array', () => {
        expect(testCalc.getInputCalculationArray("1+1")).toStrictEqual(['1', '+', '1'])
        })

    // test('Separate (1+1)(1+1)((1+1)(1+1))(1+1) String into array', () => {
    //     expect(testCalc.getInputCalculationArray('(1+1)(1+1)((1+1)(1+1))(1+1)')).toStrictEqual(['(','1', '+', '1',')','(','1', '+', '1',')','(','(','1', '+', '1',')','(','1', '+', '1',')' ])
    //     })
    test('Separate (1+1)(1+1) String into array', () => {
        expect(testCalc.getInputCalculationArray('(1+1)(1+1)')).toStrictEqual(['(','1','+','1',')','(','1','+','1',')'])
        })

    test('Separate )( String into array', () => {
        expect(testCalc.getInputCalculationArray(')(')).toStrictEqual([')','('])
        })
    // test('Expect output', () => {
    //     expect(testCalc.getInputCalculationArray('(1+1)(1+1)')).anything()
    // })
    
})
