import Player from "./Player.js";
const ai = Player.createAi()
describe("", () => {
    test("", () => {
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