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
    const bestMove = getBestMove();
    makeMove(bestMove);
}

function getBestMove() {
    let bestScore = -Infinity;
    let bestMove;

    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'O';
            const score = minimax(board, 0, false);
            board[i] = '';

            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }

    return bestMove;
}

function minimax(board, depth, isMaximizing) {
    const scores = {
        X: -1,
        O: 1,
        tie: 0
    };

    if (checkWin('X')) {
        return scores.X - depth;
    } else if (checkWin('O')) {
        return scores.O + depth;
    } else if (board.every(cell => cell !== '')) {
        return scores.tie;
    }

    if (isMaximizing) {
        let maxScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                const score = minimax(board, depth + 1, false);
                board[i] = '';
                maxScore = Math.max(maxScore, score);
            }
        }
        return maxScore;
    } else {
        let minScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                const score = minimax(board, depth + 1, true);
                board[i] = '';
                minScore = Math.min(minScore, score);
            }
        }
        return minScore;
    }
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
