import Gameboard from "./Gameboard.js";
describe("placeShip function", () => {
    let board = Gameboard.create()

    test("x Axis", () => {
        board.placeShip([0, 0], 3)
        expect(board.board[2][0].isTaken).toBe(true)
        expect(board.board[4][0].isTaken).toBe(false)
    })
    test("y axis", () => {
        board.placeShip([0, 7], 3, "y")
        expect(board.board[0][7].isTaken).toBe(true)
        expect(board.board[0][5].isTaken).toBe(false)

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
