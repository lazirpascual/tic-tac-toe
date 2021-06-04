const boardContainer = document.querySelector('#gameboard');

const gameboard = (() => {
    let boardBlock = [];
    const boardSize = 9;
    let turnCounter = 0;

    const makeBoard = () => {
        for (let board = 0; board < boardSize; board++) {
        boardBlock[board] = document.createElement('div');
        boardBlock[board].classList.add('gameboard-block');
        boardContainer.appendChild(boardBlock[board]);
        }
    };

    return {boardBlock, makeBoard};
})();

gameboard.makeBoard();