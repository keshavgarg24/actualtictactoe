let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]              // Diagonals
];

const cells = document.querySelectorAll('.cell');
const messageElement = document.getElementById('message');

function makeMove(index) {
    if (board[index] === '' && !gameOver) {
        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;

        if (checkWin(currentPlayer)) {
            displayMessage(`${currentPlayer} wins!`);
            gameOver = true;
        } else if (board.every(cell => cell !== '')) {
            displayMessage('It\'s a tie!');
            gameOver = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            if (currentPlayer === 'O') {
                makeAIMove();
            }
        }
    }
}

function makeAIMove() {
    // Modified easy AI logic
    const winningMove = getWinningMove();
    const blockingMove = getBlockingMove();

    const move = winningMove || blockingMove || getRandomMove();

    makeMove(move);
}

function getWinningMove() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            if (checkWin('O')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    return null;
}

function getBlockingMove() {
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            if (checkWin('X')) {
                board[i] = '';
                return i;
            }
            board[i] = '';
        }
    }
    return null;
}

function getRandomMove() {
    const availableMoves = board.reduce((acc, cell, index) => (cell === '' ? [...acc, index] : acc), []);
    const randomIndex = Math.floor(Math.random() * availableMoves.length);
    return availableMoves[randomIndex];
}

function checkWin(player) {
    return winningCombos.some(combo => {
        return combo.every(index => board[index] === player);
    });
}

function displayMessage(msg) {
    messageElement.innerText = msg;
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => cell.innerText = '');
    messageElement.innerText = '';
}
