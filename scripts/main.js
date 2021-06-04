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
    const checkWinner = (index1,index2,index3, player) => {
        if (gameBoard.boardBlock[index1].textContent == player.move &&
            gameBoard.boardBlock[index2].textContent == player.move &&
            gameBoard.boardBlock[index3].textContent == player.move) {
                playerNameContainer.style.color = (player.move == "O" ? "red" : "black");
                playerNameContainer.textContent = player.playerName + " Wins!";
                gameBoard.boardBlock[index1].classList.add('block-background');
                gameBoard.boardBlock[index2].classList.add('block-background');
                gameBoard.boardBlock[index3].classList.add('block-background');
                boardContainer.classList.add('disable-button');
            }
    };
    const checkWinnerAll = player => {
        // check for rows
        checkWinner(0, 1, 2, player);
        checkWinner(3, 4, 5, player);
        checkWinner(6, 7, 8, player);
        // check for columns
        checkWinner(0, 3, 6, player);
        checkWinner(1, 4, 7, player);
        checkWinner(2, 5, 8, player);
        // check for diagonals
        checkWinner(0, 4, 8, player);
        checkWinner(2, 4, 6, player);
    };

    return {turnCounter, decideTurn, checkWinnerAll};
})();

// player object contained in a factory function
const Player = (playerName, move) => {
    const toggleMove = () => (move == "X" ? "O" : "X");
    const togglePlayer = () => (playerName == "Player 1" ? "Player 2" : "Player 1");
    const makeTurn = index => {
        gameBoard.boardBlock[index].style.color = (move == "O") ? "rgb(170, 35, 35)" : "black";   
        gameBoard.boardBlock[index].classList.add('player-move');
        gameBoard.boardBlock[index].textContent = move;
        playerNameContainer.style.color = (playerName == "Player 1") ? "rgb(170, 35, 35)" : "black";
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

// make a player-based turn on button click
boardContainer.addEventListener('click', function(e) {
    let index = e.target.getAttribute('data-index');
    // if the board is currently empty, make a turn
    if (gameBoard.boardBlock[index].childNodes.length == 0) 
    {
        if (displayController.decideTurn(displayController.turnCounter) == "odd") {
            playerOne.makeTurn(index);
            displayController.checkWinnerAll(playerOne);
        } else {
            playerTwo.makeTurn(index);
            displayController.checkWinnerAll(playerTwo);
        }
    }
});

// clear board on button click
restartButton.addEventListener('click', function(e) {
    gameBoard.removeBoard(boardContainer);
    gameBoard.makeBoard();
    displayController.turnCounter = 1;  // restart the turn
    playerNameContainer.textContent = "Player 1's Turn: X";
    playerNameContainer.style.color = "black";
    boardContainer.classList.remove('disable-button');
});


    
        
