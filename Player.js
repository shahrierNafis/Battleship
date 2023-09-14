import Gameboard from "./Gameboard.js";
function create() {
    let board = Gameboard.create()
    return {
        get board() {
            return board;
        }
    }
}
/**
 * Creates an AI player.
 * The AI player randomly places ships on the gameboard and makes moves by attacking random positions.
 * @returns {object} An object with the AI player's gameboard and move-making function.
 */
function createAi() {
    // Create a new gameboard
    let board = Gameboard.create()

    // Place Carrier
    placeRandom(board, 5)

    // Place Battleship
    placeRandom(board, 4)

    // Place Cruiser
    placeRandom(board, 3)

    // Place Submarine
    placeRandom(board, 3)

    // Place Destroyer
    placeRandom(board, 2)

    /**
     * Makes a move by attacking a random position on the opponent's gameboard.
     * @returns {array} The move made by the AI player.
     */
    function makeMove(enemyBoard) {
        let move;
        let isLegal = false;
        while (!isLegal) {
            let [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
            move = [x, y]
            isLegal = enemyBoard.receiveAttack(move)
        }
        return move
    }

    // Return the AI player object
    return {
        get board() {
            return board;
        },
        makeMove
    }

} function placeRandom(board, shipLength) {
    let placed = false;
    let x, y
    let axis
    while (!placed) {
        [x, y] = [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)]
        axis = Math.random() < 0.5 ? "x" : "y";
        placed = board.placeShip([x, y], shipLength, axis)
    }
    const shipCoordinates = []
    shipCoordinates.push([x, y])
    if (axis == "x") {
        while (shipLength - 1) {
            x++
            shipCoordinates.push([x, y])
            shipLength--
        }
    }
    if (axis == "y") {
        while (shipLength - 1) {
            y++
            shipCoordinates.push([x, y])
            shipLength--
        }
    }
    return shipCoordinates
}
export default { create, createAi, placeRandom }