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
    test('Convert Infix A + B * C + D to Postfix A B C * + D +', () => {
        expect(testCalc.convertInfixToPostfix(['2','+','3','*','2','+','3'])).toStrictEqual(['2','3','2','*','+','3','+'])
    })

    test('Convert Infix (A + B) * (C + D) to Postfix A B + C D + *', () => {
        expect(testCalc.convertInfixToPostfix(['(','5','+','5',')','*','(','5','+','5',')'])).toStrictEqual(['5','5','+','5','5','+','*'])
    })

})
