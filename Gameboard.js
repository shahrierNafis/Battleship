import Ship from "./Ship.js"
function create() {
    let board = [];
    let ships = [];
    let allSunk = false;

    for (let i = 0; i < 10; i++) {
        board.push([]);
        for (let j = 0; j < 10; j++) {
            board[i].push({ ship: null, isTaken: false, hit: false })
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
    function placeShip([x, y], shipLength, axis = "x") {
        if (axis == "x") {
            // Check if coordinates are within the board limits
            if (x + (shipLength - 1) < 10) {
                // Check if the ship can be placed
                if (!board[x][y].isTaken &&
                    !board[x + (shipLength - 1)][y].isTaken) {
                    // Place the ship
                    let ship = Ship.create(shipLength);
                    // log ship
                    ships.push(ship)
                    for (let i = 0; i < shipLength; i++) {
                        board[x + i][y].ship = ship;
                        takeSpace(x + i, y);
                    }
                    return true;
                }
            }
        } else if (axis == "y") {
            // Check if coordinates are within the board limits
            if (y + (shipLength - 1) < 10) {
                // Check if the ship can be placed
                if (!board[x][y].isTaken &&
                    !board[x][y + (shipLength - 1)].isTaken) {
                    // Place the ship
                    let ship = Ship.create(shipLength);
                    // log ship
                    ships.push(ship)
                    for (let i = 0; i < shipLength; i++) {
                        board[x][y + i].ship = ship;
                        takeSpace(x, y + i);
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
    /**
     * Marks the specified location on the board as hit and updates the ship's hit status.
     * @param {Array} location - The [x, y] coordinates of the location to be attacked.
     * @returns {boolean} - True if the attack successfully hits the location, false otherwise.
     */
    function receiveAttack(location) {
        const [x, y] = location;

        // Check if the location has already been hit
        if (!board[x][y].hit) {
            board[x][y].hit = true;
            board[x][y].ship.hit();
            return true;
        }

        // Return false if the location has already been hit
        return false;
    }
    return {
        get board() {
            return board
        },
        placeShip, receiveAttack,
        get allSunk() {
            return ships.every(ship => ship.isSunk())
        }
    }
}
export default { create }