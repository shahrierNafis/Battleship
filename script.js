import Player from "./Player.js"
//place ai board (not visible)
// make global player objects
let ai = Player.createAi()
let player = Player.create()

let playBtn = document.querySelector("#play div")
playBtn.addEventListener("click", (event) => {
    if (player.board.ships.length == 5) {
        let aiBoard = document.getElementById("ai")
        aiBoard.classList.remove("game-not-ready")
        event.target.classList.add("gray")
    }
})
function reset() {
    // reset global player objects
    ai = Player.createAi()
    player = Player.create()

    // reset playButton
    playBtn.classList.remove("gray")

    // reset cell
    let aiBoard = document.getElementById("ai")
    aiBoard.innerText = ""
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.dataset.coordinates = JSON.stringify([i, j])
            cell.addEventListener("click", () => {
                // hit 
                ai.board.receiveAttack([i, j])
                markCell(ai.board, cell)
                announceWinner()// announce Winner if any

                // makes a move and marks corresponding cell
                aiAttack()
                announceWinner()// announce Winner if any
            })
            aiBoard.appendChild(cell)
        }
    }
    // make cell unClickable until player places all ships
    aiBoard.classList.add("game-not-ready")

    let playerBoard = document.getElementById("player")
    playerBoard.innerText = ""
    for (let i = 0; i < 10; ++i) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement("div")
            cell.classList.add("cell")
            cell.dataset.coordinates = JSON.stringify([i, j])
            playerBoard.appendChild(cell)
        }
    }
    // let player place ships
    placePlayerShips()
}

function placePlayerShips() {

    takeSpace(Player.placeRandom(player.board, 5))
    takeSpace(Player.placeRandom(player.board, 4))
    takeSpace(Player.placeRandom(player.board, 3))
    takeSpace(Player.placeRandom(player.board, 3))
    takeSpace(Player.placeRandom(player.board, 2))
}

function takeSpace(shipCoordinates) {
    let playerBoard = document.getElementById("player")
    shipCoordinates.forEach(ship => {
        let [x, y] = ship
        playerBoard.querySelector(`[data-coordinates="${JSON.stringify([x, y])}"]`).classList.add("taken")
    });
}
function markCell(board, cell) {
    let coordinates = JSON.parse(cell.dataset.coordinates)
    let [x, y] = [coordinates[0], coordinates[1]]

    // if a ship gets hit add hit class to cell, else miss
    let ship = board.boardAsArray[x][y].ship
    if (ship) {
        cell.classList.add("hit")
    } else {
        cell.classList.add("miss")
    }
}
function aiAttack() {
    // make move and save the coordinates in move
    let [x, y] = ai.makeMove(player.board)
    // get corresponding cell from DOM
    let playerBoard = document.getElementById("player")
    let cell = playerBoard.querySelector(`[data-coordinates="${JSON.stringify([x, y])}"]`)
    // mark the cell
    markCell(player.board, cell)
}
function announceWinner() {
    setTimeout(() => {
        if (ai.board.allSunk) {
            alert("Player Wins!")
            reset()
        } else if (player.board.allSunk) {
            alert("AI Wins!")
            reset()
        }
    }, 0)
}
// initialize
reset()