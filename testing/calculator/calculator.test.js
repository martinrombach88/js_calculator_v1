const Calculator = require("../../src/calculator/calculator")

describe("Calculator", () => {
    const testCalc = new Calculator()

    test('stackMustPop -> Test operator ranks * > + as true', () => {
        expect(testCalc.stackMustPop("*", "+")).toBe(true)
    })

    test('stackMustPop -> function ranks + > * as false', () => {
        expect(testCalc.stackMustPop("+", "*")).toBe(false)
    })
    test('getInputArray -> 1+1 becomes [1 + 1]', () => {
        expect(testCalc.getInputArray("1+1")).toStrictEqual(['1', '+', '1'])
        })

    test('getInputArray -> (1+1)(1+1) becomes [ ( 1 + 1 ) ( 1 + 1 ) ]', () => {
        expect(testCalc.getInputArray('(1+1)(1+1)')).toStrictEqual(['(','1','+','1',')','(','1','+','1',')'])
        })

    test('getInputArray -> )( becomes [ ) ( ]', () => {
        expect(testCalc.getInputArray(')(')).toStrictEqual([')','('])
        })


    // test('convertInfixToPostfix -> Infix A + B * C + D to Postfix A B C * + D +', () => {
    //     expect(testCalc.convertInfixToPostfix(['2','+','3','*','2','+','3'])).toStrictEqual(['2','3','2','*','+','3','+'])
    // })

    // test('convertInfixToPostfix -> Infix (A + B) * (C + D) to Postfix A B + C D + *', () => {
    //     expect(testCalc.convertInfixToPostfix(['(','5','+','5',')','*','(','5','+','5',')'])).toStrictEqual([5,5,'+',5,5,'+','*'])
    // })


    test('convertInfixToPostfix -> postfix collects all numbers and opstack collects all operators on loop', () => {
        expect(testCalc.convertInfixToPostfix(['1', '+', '1', '*', '1', '/','1','-', '1'])).toStrictEqual(
            {0: [1,1,1,1,1],
            1: ['+','*','/','-']})
    })




})
