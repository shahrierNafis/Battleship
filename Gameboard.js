import Ship from "./Ship.js"
function create() {
    let board = [];
    for (let i = 0; i < 10; i++) {
        board.push([]);
        for (let j = 0; j < 10; j++) {
            board[i].push({ ship: null, isTaken: false })
        }

    }
    /**
     * Places a ship on the game board.
     * 
     * @param {Array} coordinates - The starting coordinates of the ship.
     * @param {number} shipLength - The length of the ship.
     * @param {string} axis - The axis on which the ship will be placed ("x" or "y").
     * @returns {boolean} - True if the ship was successfully placed, false otherwise.
     */
    function placeShip(coordinates, shipLength, axis = "x") {
        if (axis == "x") {
            // Check if coordinates are within the board limits
            if (coordinates[0] + (shipLength - 1) < 10) {
                // Check if the ship can be placed
                if (!board[coordinates[0]][coordinates[1]].isTaken &&
                    !board[coordinates[0] + (shipLength - 1)][coordinates[1]].isTaken) {
                    // Place the ship
                    let ship = Ship.create(shipLength);
                    for (let i = 0; i < shipLength; i++) {
                        board[coordinates[0] + i][coordinates[1]].ship = ship;
                        takeSpace(coordinates[0] + i, coordinates[1]);
                    }
                    return true;
                }
            }
        } else if (axis == "y") {
            // Check if coordinates are within the board limits
            if (coordinates[1] + (shipLength - 1) < 10) {
                // Check if the ship can be placed
                if (!board[coordinates[0]][coordinates[1]].isTaken &&
                    !board[coordinates[0]][coordinates[1] + (shipLength - 1)].isTaken) {
                    // Place the ship
                    let ship = Ship.create(shipLength);
                    for (let i = 0; i < shipLength; i++) {
                        board[coordinates[0]][coordinates[1] + i].ship = ship;
                        takeSpace(coordinates[0], coordinates[1] + i);
                    }
                    return true;
                }
            }
        }
        // Return false if the ship cannot be placed
        return false;
    }
    /**
     * Takes the space surrounding a given point on the board and marks it as taken.
     * @param {number} x - The x-coordinate of the point.
     * @param {number} y - The y-coordinate of the point.
     */
    function takeSpace(x, y) {
        // Right
        if (x + 1 < 10) board[x + 1][y].isTaken = true;

        // Bottom right
        if (x + 1 < 10 && y + 1 < 10) board[x + 1][y + 1].isTaken = true;

        // Bottom
        if (y + 1 < 10) board[x][y + 1].isTaken = true;

        // Bottom left
        if (x - 1 >= 0 && y + 1 < 10) board[x - 1][y + 1].isTaken = true;

        // Left
        if (x - 1 >= 0) board[x - 1][y].isTaken = true;

        // Top left
        if (x - 1 >= 0 && y - 1 >= 0) board[x - 1][y - 1].isTaken = true;

        // Top
        if (y - 1 >= 0) board[x][y - 1].isTaken = true;

        // Top right
        if (x + 1 < 10 && y - 1 >= 0) board[x + 1][y - 1].isTaken = true;
    }
    return {
        get board() {
            return board
        },
        placeShip
    }
}
export default { create }