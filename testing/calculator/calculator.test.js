const Calculator = require("../../src/calculator/calculator")

describe("Calculator", () => {
    const testCalc = new Calculator()

    // test('stackMustPop -> Function can return top of stack', () => {
    // expect(testCalc.stackMustPop(["-", "*"])).toStrictEqual("-")
    // })


    // test('stackMustPop -> Test operator ranks * > + as true', () => {
    //     expect(testCalc.stackMustPop(["*"], "+")).toBe(true)
    // })

    // test('stackMustPop -> function ranks + > * as false', () => {
    //     expect(testCalc.stackMustPop(["+"], "*")).toBe(false)
    // })
    test('getInputArray -> 1+1 becomes [1 + 1]', () => {
        expect(testCalc.getInputArray("1+1")).toStrictEqual(['1', '+', '1'])
        })

    test('getInputArray -> (1+1)(1+1) becomes [ ( 1 + 1 ) ( 1 + 1 ) ]', () => {
        expect(testCalc.getInputArray('(1+1)(1+1)')).toStrictEqual(['(','1','+','1',')','(','1','+','1',')'])
        })

    test('getInputArray -> )( becomes [ ) ( ]', () => {
        expect(testCalc.getInputArray(')(')).toStrictEqual([')','('])
        })

    // test('convertInfixToPostfix -> postfix can collect all numbers and opstack collects all operators on loop (need differentouput object', () => {
    //     expect(testCalc.convertInfixToPostfix(['1', '+', '1', '*', '1', '/','1','-', '1'])).toStrictEqual(
    //         { 'opStack': ['+','*','/','-'],'postfixStack': [1,1,1,1,1]})
    // })

    



    
    test('convertInfixToPostfix -> 1 * 2 + 3 -> 1 2 * 3 +', () => {
        expect(testCalc.convertInfixToPostfix(['1', '*', '2', '+', '3'])).toStrictEqual([1, 2, '*', 3, '+'])
        })

    test('convertInfixToPostfix -> 1 * (2 + 3) -> 1 2 3 + *', () => {
    expect(testCalc.convertInfixToPostfix(['1', '*', '(', '2', '+', '3', ')'])).toStrictEqual([1, 2, 3, '+', '*'])
    })

    test('convertInfixToPostfix -> Infix 1+2/3 * (4+5) - 6 -> 1 2 3 / 4 5 + * + 6 - ', () => {
    expect(testCalc.convertInfixToPostfix(['1','+', '2' ,'/','3','*','(','4','+','5',')','-','6'])).toStrictEqual([1, 2, 3, '/', 4, 5,'+', '*', '+', 6, '-'])

    //the problem with this is NOT brackets. It's the fact that you don't keep comparing c to the stack until it's all popped.
    //
    })

    test('calculate -> 1+1 = 2', () => {
    expect(testCalc.calculate('1 + 1')).toStrictEqual(2);
    })

    test('calculate -> 1 * 2 + 3', () => {
        expect(testCalc.calculate('1 * 2 + 3')).toStrictEqual(5);
    })

    test('calculate -> 1+2/3 * (4+5) - 6', () => {
    expect(testCalc.calculate('1 + 2 / 3 * ( 4 + 5 ) - 6')).toStrictEqual(1)
    })

})

