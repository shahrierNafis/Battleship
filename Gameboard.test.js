import Gameboard from "./Gameboard.js";

let board = Gameboard.create()

describe("placeShip function", () => {

    test("x Axis", () => {
        board.placeShip([0, 0], 3)
        expect(board.boardAsArray[2][0].isTaken).toBe(true)
        expect(board.boardAsArray[4][0].isTaken).toBe(false)
    })
    test("y axis", () => {
        board.placeShip([0, 7], 3, "y")
        expect(board.boardAsArray[0][7].isTaken).toBe(true)
        expect(board.boardAsArray[0][5].isTaken).toBe(false)

    })
    test("over board", () => {
        // 3
        expect(board.placeShip([9, 0], 3)).toBeFalsy()
        expect(board.placeShip([0, 9], 3, "y")).toBeFalsy()
        // 1
        expect(board.placeShip([9, 0], 1)).toBeTruthy()
        expect(board.placeShip([9, 9], 1, "y")).toBeTruthy()
    })
    test("on boat", () => {
        // start of the board
        expect(board.placeShip([0, 0], 3)).toBeFalsy()
        expect(board.placeShip([0, 7], 3, "y")).toBeFalsy()
        // end of the board
        expect(board.placeShip([2, 0], 1)).toBeFalsy()
        expect(board.placeShip([0, 9], 1, "y")).toBeFalsy()
    })
    test("near boat", () => {
        expect(board.placeShip([0, 1], 3)).toBeFalsy()
        expect(board.placeShip([3, 0], 3)).toBeFalsy()

        expect(board.placeShip([0, 6], 3, "y")).toBeFalsy()
        expect(board.placeShip([1, 7], 3, "y")).toBeFalsy()

    })
})
describe("receiveAttack", () => {
    test("attack", () => {
        board.receiveAttack([0, 0])
        expect(board.boardAsArray[0][0].ship.hits).toBe(1)
        expect(board.boardAsArray[0][0].hit).toBe(true)
    })
    test("reattack", () => {
        expect(board.receiveAttack([0, 0])).toBe(false)
    })
})

describe("allSunk", () => {
    test("allSunk", () => {
        expect(board.allSunk).toBe(false)
        board.receiveAttack([0, 0])
        board.receiveAttack([1, 0])
        board.receiveAttack([2, 0])
        expect(board.allSunk).toBe(false)
        board.receiveAttack([0, 7])
        board.receiveAttack([0, 8])
        board.receiveAttack([0, 9])
        expect(board.allSunk).toBe(false)
        board.receiveAttack([9, 0])
        board.receiveAttack([9, 9])
        expect(board.allSunk).toBe(true)
    })
})