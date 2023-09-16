import Player from "./Player.js"
import dom from "./dom.js";

// make global player objects
let ai
let player


/**
 * Resets the user interface and initializes the game.
 */
function reset() {
    // Reset global player objects
    ai = Player.createAi();
    player = Player.create();

    // Reset ships
    dom.resetShipPicker();

    // Reset playButton
    dom.resetPlayBtn(player);
    // playBtn.classList.remove("gray");

    // Reset boards
    dom.resetAiBoard(callBackAi);
    dom.resetPlayerBoard(dropCallback);
}



/**
 * Handles the callback for AI moves in the game.
 * @param {Event} e - The event object.
 */
function callBackAi(e) {
    // Do nothing if the cell is flagged  
    if (e.target.classList.contains("flagged")) {
        return;
    }

    // Player
    let aiBoard = document.getElementById("ai");
    let [x, y] = JSON.parse(e.target.dataset.coordinates)
    // hit 
    ai.board.receiveAttack([x, y])
    // get corresponding cell from DOM
    let cell = aiBoard.querySelector(`[data-coordinates="${JSON.stringify([x, y])}"]`)
    // mark the cell
    dom.markCell(ai.board, cell)

    setTimeout(announceWinner, 0)// announce Winner if any

    // AI
    let enemyBoard = document.getElementById("player")
    // let ai hit    
    let [a, b] = ai.makeMove(player.board)
    // get corresponding cell from DOM
    cell = enemyBoard.querySelector(`[data-coordinates="${JSON.stringify([a, b])}"]`)
    // mark the cell
    dom.markCell(player.board, cell)

    setTimeout(announceWinner, 0)// announce Winner if any
}
/**
 * Callback function for handling the drop event.
 * @param {Event} e - The drop event object.
 */
function dropCallback(e) {
    // Get the id of the dragged ship
    let id = e.dataTransfer.getData("id");

    // Get the ship element
    let ship = document.getElementById(id);

    // Get the coordinates of the drop target
    let [x, y] = JSON.parse(e.target.dataset.coordinates);

    // Get the length of the ship
    let shipLength = ship.dataset.shipLength;

    // Get the axis of the ship
    let axis = ship.dataset.axis;

    // Place the ship on the player's board at the specified coordinates
    let shipCoordinates = player.board.placeShip([x, y], shipLength, axis);

    // If placing the ship is successful
    if (shipCoordinates) {
        // Update the DOM to reflect the ship placement
        dom.takeSpace(shipCoordinates);

        // Hide the ship to prevent it from reappearing above
        ship.style.visibility = "hidden";
    }
}
/**
 * Function to announce the winner of the game.
 * If the AI's board is all sunk, it alerts "Player Wins!" and resets the game.
 * If the player's board is all sunk, it alerts "AI Wins!" and resets the game.
 */
function announceWinner() {
    if (ai.board.allSunk) {
        alert("Player Wins!");
        reset();
    } else if (player.board.allSunk) {
        alert("AI Wins!");
        reset();
    }
}

// initialize
reset()