const boardContainer = document.querySelector('#gameboard');
const restartButton = document.querySelector('#restart');

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

// player object container in a factory function
const Player = (playerName, move) => {
    const makeTurn = index => {
        const playerMarker = document.createElement('h1');
        playerMarker.textContent = move;
        playerMarker.classList.add('player-move');
        gameBoard.boardBlock[index].appendChild(playerMarker);
        displayController.turnCounter++;
    }
    return {playerName, move, makeTurn};
}

// instantiate two instances of Player
const playerOne = Player("Player One", "X");
const playerTwo = Player("Player Two", "O");

// create the board
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
});


    
        
