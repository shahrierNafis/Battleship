import Gameboard from "./Gameboard.js";
function create() {
    let board = Gameboard.create()
    return {
        get board() {
            return board;
        }
    }
}
function createAi() {
    let board = Gameboard.create()
    function makeMove() {
        let move;
        let isLegal = false;
        while (!isLegal) {
            let [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            move = [x, y]
            isLegal = board.receiveAttack(move)
        }
        return move
    }

    return {
        get board() {
            return board;
        }, makeMove
    }
}
export default { create, createAi }