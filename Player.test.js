import Player from "./Player.js";
const ai = Player.createAi()
describe("ai", () => {
    test("ships", () => {
        expect(ai.board.ships.length).toBe(5)

        expect(ai.board.ships[0].length).toBe(5)
        expect(ai.board.ships[1].length).toBe(4)
        expect(ai.board.ships[2].length).toBe(3)
        expect(ai.board.ships[3].length).toBe(3)
        expect(ai.board.ships[4].length).toBe(2)

    })
    test("makeMove", () => {
        let rep = 100
        let moves = []
        while (rep) {
            let move = JSON.stringify(ai.makeMove())
            expect(moves.includes(move)).toBe(false)
            moves.push(move)
            rep--
        }
    })
})