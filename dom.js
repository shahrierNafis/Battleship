
/**
 * Resets the ship picker by creating a new set of ships and updating the DOM.
 */
function resetShipPicker() {
    // Get the ship picker element
    let ships = document.querySelector("#ship-picker");

    // Remove old nodes
    ships.innerHTML = "click to rotate";

    // Add the ships to the DOM
    ships.append(
        createCarrier(),
        createBattleship(),
        createCruiser(),
        createSubmarine(),
        createDestroyer());
}
/**
     * Generates a ship element with a specified quantity of ship cells.
     *
     * @param {number} quantity - The number of cells to generate.
     * @returns {HTMLElement} - The ship element with the generated cells.
     */
function genShip(quantity) {
    // Create a div element to represent the ship
    let ship = document.createElement("div");

    // Generate the specified quantity of ship cells
    while (quantity) {
        // Create a div element to represent a ship cell
        let cell = document.createElement("div");

        // Add the "ship-cell" class to the ship cell
        cell.classList.add("ship-cell");

        // Set the display style of the ship cell to "inline-block"
        cell.style.display = "inline-block";

        // Set the width and height of the ship cell to match the size of the board cells
        cell.style.width = "calc(100vh / 16)";
        cell.style.height = "calc(100vh / 16)";

        // Append the ship cell to the ship element
        ship.appendChild(cell);

        quantity--;
    }

    // Return the ship element
    return ship;
} function createCarrier() {
    let carrier = document.createElement("div")
    carrier.id = "carrier"
    carrier.classList.add("ship")
    carrier.setAttribute("draggable", "true")
    carrier.dataset.shipLength = 5;
    carrier.dataset.axis = "y";
    carrier.append(...genShip(5).childNodes)
    addShipBehaviour(carrier)
    return carrier
} function createBattleship() {

    let battleship = document.createElement("div")
    battleship.id = "battleship"
    battleship.classList.add("ship")
    battleship.setAttribute("draggable", "true")
    battleship.dataset.shipLength = 4;
    battleship.dataset.axis = "y";
    battleship.append(...genShip(4).childNodes)
    addShipBehaviour(battleship);
    return battleship
} function createCruiser() {
    let cruiser = document.createElement("div")
    cruiser.id = "cruiser"
    cruiser.classList.add("ship")
    cruiser.setAttribute("draggable", "true")
    cruiser.dataset.shipLength = 3;
    cruiser.dataset.axis = "y";
    cruiser.append(...genShip(3).childNodes)
    addShipBehaviour(cruiser)
    return cruiser
} function createSubmarine() {

    let submarine = document.createElement("div")
    submarine.id = "submarine"
    submarine.classList.add("ship")
    submarine.setAttribute("draggable", "true")
    submarine.dataset.shipLength = 3;
    submarine.dataset.axis = "y";
    submarine.append(...genShip(3).childNodes)
    addShipBehaviour(submarine)
    return submarine
} function createDestroyer() {
    let destroyer = document.createElement("div")
    destroyer.id = "destroyer"
    destroyer.classList.add("ship")
    destroyer.setAttribute("draggable", "true")
    destroyer.dataset.shipLength = 2;
    destroyer.dataset.axis = "y";
    destroyer.append(...genShip(2).childNodes)
    addShipBehaviour(destroyer)
    return destroyer
}
/**
 * Adds ship behavior to a given ship element.
 * 
 * @param {HTMLElement} ship - The ship element to add behavior to.
 */
function addShipBehaviour(ship) {
    // Rotate the ship when clicked
    ship.addEventListener("click", e => {
        ship = e.target.parentNode
        ship.classList.toggle("rotate90")
        if (ship.dataset.axis == "y") {
            ship.dataset.axis = "x";
        } else ship.dataset.axis = "y";
    })

    // Hide the ship and move a ghost element when dragged
    ship.addEventListener("dragstart", (e) => {
        let ghost = e.target.cloneNode(true)
        ghost.style.position = "absolute"
        ghost.style.top = "-1000px"

        // Rotate ghost 90deg if the real element is rotated
        if (e.target.classList.contains("rotate90")) {
            ghost.childNodes.forEach(cell => cell.style.display = "block")
        }

        document.body.appendChild(ghost)

        // Hide the real element
        e.target.style.opacity = "0"

        // Clear the drag data cache (for all formats/types)
        e.dataTransfer.clearData();

        e.dataTransfer.setData("id", e.target.id);

        e.dataTransfer.setDragImage(ghost, window.innerWidth * .02, window.innerHeight * 0.035);
    })

    // Unhide the ship if dropped other than the board
    ship.addEventListener("dragend", (e) => {
        // Reappear
        e.target.style.opacity = "100"
    })
}
/**
 * Reset the AI board by removing all cells and adding new ones.
 * @param {function} callBackAi - Callback function to be executed when a cell is clicked.
 */
function resetAiBoard(callBackAi) {
    // Get the AI board element
    let aiBoard = document.getElementById("ai");

    // Remove all existing cells from the AI board
    aiBoard.innerText = "";

    // Create new cells for the AI board
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; j++) {
            // Create a new cell element
            let cell = document.createElement("div");

            // Add the "cell" class to the cell element
            cell.classList.add("cell");

            // Set the coordinates of the cell as a data attribute
            cell.dataset.coordinates = JSON.stringify([i, j]);

            // Add the click event listener to the cell element
            cell.addEventListener("click", callBackAi);

            // flag cell if right clicked
            cell.addEventListener("contextmenu", e => {
                e.preventDefault()
                e.target.classList.toggle("flagged")
            })
            // Append the cell element to the AI board
            aiBoard.appendChild(cell);
        }
    }

    // Make the AI board unclickable until the player places all ships
    aiBoard.classList.add("game-not-ready");
}
/**
 * Reset the play button for a player.
 * @param {Player} player - The player object.
 */
function resetPlayBtn(player) {
    // Find the play button element
    let playBtn = document.querySelector("#play");

    // Clear the content of the play button
    playBtn.innerText = "";

    // Create a new div element for the play text
    let playText = document.createElement("div");
    playText.innerText = "PLAY";

    // Add event listener to the play text
    playText.addEventListener("click", (event) => {
        // Check if all ships are placed
        if (player.board.ships.length == 5) {
            let aiBoard = document.getElementById("ai");
            aiBoard.classList.remove("game-not-ready");
            event.target.classList.add("gray");
        }
        // If all ships are not placed, warn the user
        else {
            let ships = document.querySelectorAll(".ship");
            ships.forEach(ship => ship.classList.add("warn-unused"));
            setTimeout(() => {
                ships.forEach(ship => ship.classList.remove("warn-unused"));
            }, 500);
        }
    });

    // Append the play text to the play button
    playBtn.appendChild(playText);
}
/**
 * Resets the player board by removing all cells and adding new cells.
 * 
 * @param {function} dropCallback - The callback function to be called when a cell is dropped.
 */
function resetPlayerBoard(dropCallback) {
    let playerBoard = document.getElementById("player");
    playerBoard.innerText = "";

    // Loop through each row
    for (let i = 0; i < 10; ++i) {
        // Loop through each column
        for (let j = 0; j < 10; j++) {
            // Create a new cell
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.coordinates = JSON.stringify([i, j]);

            // Add event listeners for drag and drop
            cell.addEventListener("dragover", e => e.preventDefault());
            cell.addEventListener("drop", dropCallback);

            // Add the cell to the player board
            playerBoard.appendChild(cell);
        }
    }
}
/**
 * Marks a cell on the board based on the given coordinates.
 * If the cell contains a ship, the cell is marked as a hit.
 * Otherwise, the cell is marked as a miss.
 * 
 * @param {object} board - The game board.
 * @param {HTMLElement} cell - The cell to mark.
 */
function markCell(board, cell) {
    // Parse the coordinates from the cell's data attribute
    let coordinates = JSON.parse(cell.dataset.coordinates);

    // Extract the x and y values from the coordinates
    let [x, y] = coordinates;

    // Get the ship at the specified coordinates
    let ship = board.boardAsArray[x][y].ship;

    // If a ship exists, mark the cell as a hit
    // Otherwise, mark the cell as a miss
    if (ship) {
        cell.classList.add("hit");
    } else {
        cell.classList.add("miss");
    }
}
/**
 * Adds class "taken" to the cells surrounding the ship coordinates and
 * adds class "ship-cell" to the ship coordinates on the player board.
 * 
 * @param {Array} shipCoordinates - The coordinates of the ship
 */
function takeSpace(shipCoordinates) {
    let playerBoard = document.getElementById("player")

    shipCoordinates.forEach(ship => {
        let [x, y] = ship

        let coordinateArr = []

        // Right
        if (x + 1 < 10) coordinateArr.push([x + 1, y])

        // Bottom right
        if (x + 1 < 10 && y + 1 < 10) coordinateArr.push([x + 1, y + 1])

        // Bottom
        if (y + 1 < 10) coordinateArr.push([x, y + 1])

        // Bottom left
        if (x - 1 >= 0 && y + 1 < 10) coordinateArr.push([x - 1, y + 1])

        // Left
        if (x - 1 >= 0) coordinateArr.push([x - 1, y])

        // Top left
        if (x - 1 >= 0 && y - 1 >= 0) coordinateArr.push([x - 1, y - 1])

        // Top
        if (y - 1 >= 0) coordinateArr.push([x, y - 1])

        // Top right
        if (x + 1 < 10 && y - 1 >= 0) coordinateArr.push([x + 1, y - 1])

        coordinateArr.forEach(([x, y]) => {
            playerBoard.querySelector(`[data-coordinates="${JSON.stringify([x, y])}"]`)
                .classList.add("taken")
        })

        playerBoard.querySelector(`[data-coordinates="${JSON.stringify([x, y])}"]`).classList.add("ship-cell")
    });
}
export default { resetShipPicker, resetAiBoard, resetPlayBtn, resetPlayerBoard, markCell, takeSpace, }