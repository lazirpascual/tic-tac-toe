const boardContainer = document.querySelector('#gameboard');
const restartButton = document.querySelector('#restart');
const playerNameContainer = document.querySelector('#player');

// gameboard object contained in a module pattern
const gameBoard = (() => {
    let boardBlock = [];
    const boardSize = 9;
    const makeBoard = () => {
        for (let board = 0; board < boardSize; board++) {
        boardBlock[board] = document.createElement('div');
        boardBlock[board].classList.add('gameboard-block');
        boardContainer.appendChild(boardBlock[board]);
        boardBlock[board].setAttribute('data-index', board);
        }
    };
    const removeBoard = parent => {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    };

    return {boardBlock, makeBoard, removeBoard};
})();

// displayController object contained in a module pattern
const displayController = (() => {
    let turnCounter = 1;
    const decideTurn = counter => (counter % 2 == 0) ? "even" : "odd";

    return {turnCounter, decideTurn};
})();

// player object contained in a factory function
const Player = (playerName, move) => {
    const toggleMove = () => (move == "X" ? "O" : "X");
    const togglePlayer = () => (playerName == "Player 1" ? "Player 2" : "Player 1");
    const makeTurn = index => {
        const playerMarker = document.createElement('h1');
        playerMarker.textContent = move;
        playerMarker.classList.add('player-move');
        gameBoard.boardBlock[index].appendChild(playerMarker);
        playerNameContainer.classList.add('player-name');
        playerNameContainer.textContent = togglePlayer() + "'s Turn: " + toggleMove();
        displayController.turnCounter++; // increment counter to update turn
    }
    return {playerName, move, makeTurn};
}

// instantiate two instances of Player
const playerOne = Player("Player 1", "X");
const playerTwo = Player("Player 2", "O");

// create the board when page loads
gameBoard.makeBoard();

// make a turn based on player on button click
boardContainer.addEventListener('click', function(e) {
    let index = e.target.getAttribute('data-index');
    // if the board is currently empty, make a turn
    if (gameBoard.boardBlock[index].childNodes.length == 0) 
    {
        if (displayController.decideTurn(displayController.turnCounter) == "odd") {
            playerOne.makeTurn(index);
        } else {
            playerTwo.makeTurn(index);
        }
    }
});

// clear board on button click
restartButton.addEventListener('click', function(e) {
    gameBoard.removeBoard(boardContainer);
    gameBoard.makeBoard();
    displayController.turnCounter = 1;  // restart the turn
    playerNameContainer.textContent = "Player 1's Turn: X";
});


    
        
