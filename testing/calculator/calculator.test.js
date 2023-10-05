const Calculator = require("../../src/calculator/calculator")

describe("Calculator", () => {
    const testCalc = new Calculator()

    test('stackMustPop -> Test operator ranks * > + as true', () => {
        expect(testCalc.stackMustPop("*", "+")).toBe(true)
    })

    test('stackMustPop -> function ranks + > * as false', () => {
        expect(testCalc.stackMustPop("+", "*")).toBe(false)
    })
    test('getInputSeparate 1+1 String into array', () => {
        expect(testCalc.getInputArray("1+1")).toStrictEqual(['1', '+', '1'])
        })

    test('Separate (1+1)(1+1) String into array', () => {
        expect(testCalc.getInputArray('(1+1)(1+1)')).toStrictEqual(['(','1','+','1',')','(','1','+','1',')'])
        })

    test('Separate )( String into array', () => {
        expect(testCalc.getInputArray(')(')).toStrictEqual([')','('])
        })


    test('Convert Infix A + B * C + D to Postfix A B C * + D +', () => {
        expect(testCalc.convertInfixToPostfix(['2','+','3','*','2','+','3'])).toStrictEqual(['2','3','2','*','+','3','+'])
    })

    test('Convert Infix (A + B) * (C + D) to Postfix A B + C D + *', () => {
        expect(testCalc.convertInfixToPostfix(['(','5','+','5',')','*','(','5','+','5',')'])).toStrictEqual([5,5,'+',5,5,'+','*'])
    })

    test('test stack', () => {
    expect(testCalc.convertInfixToPostfix(['1','+','1'])).toStrictEqual([1, 1, '+'])
    })


})
