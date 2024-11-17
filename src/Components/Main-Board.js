import React, { useState } from 'react';
import '../CSS/main.css';

export default function MainBoard() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const handleClick = (index) => {
        // Prevent further clicks if a winner exists or if the cell is already filled
        if (board[index] || winner) return;

        const newBoard = [...board];
        newBoard[index] = isXNext ? 'X' : 'O';
        setBoard(newBoard);

        // Check for a winner after placing the current move
        const gameWinner = calculateWinner(newBoard);
        if (gameWinner) {
            setWinner(gameWinner); // Update winner state to stop the game
            return; // Stop further execution if a winner is found
        }

        // Only switch player if there is no winner
        setIsXNext(!isXNext);
    };

    const calculateWinner = (squares) => {
        const winningLines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (let i = 0; i < winningLines.length; i++) {
            const [a, b, c] = winningLines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]; // Return the winning player ('X' or 'O')
            }
        }
        return null;
    };

    const resetGame = () => {
        setBoard(Array(9).fill(null)); // Reset the board
        setIsXNext(true);              // Reset to player X's turn
        setWinner(null);               // Clear the winner
    };

    const status = winner ? `Winner is ${winner}` : `Next player is ${isXNext ? 'X' : 'O'}`;

    return (
        <div>
            <h2>{status}</h2>
            <div className='board'>
                {board.map((cell, index) => (
                    <div className='cell' key={index} onClick={() => handleClick(index)}>
                        {cell}
                    </div>
                ))}
            </div>
            {winner && (
                <button onClick={resetGame} className="play-again">
                    Play Again
                </button>
            )}
        </div>
    );
}
