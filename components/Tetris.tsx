"use client";

import { useEffect, useState, useCallback } from "react";

// Tetris constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;
const CELL_SIZE = 30;
const EMPTY_CELL = 0;

// Tetromino shapes and colors
const TETROMINOES = [
  {
    shape: [[1, 1, 1, 1]],
    color: "#00f0f0", // I - Cyan
  },
  {
    shape: [[2, 0, 0], [2, 2, 2]],
    color: "#0000f0", // J - Blue
  },
  {
    shape: [[0, 0, 3], [3, 3, 3]],
    color: "#f0a000", // L - Orange
  },
  {
    shape: [[4, 4], [4, 4]],
    color: "#f0f000", // O - Yellow
  },
  {
    shape: [[0, 5, 5], [5, 5, 0]],
    color: "#00f000", // S - Green
  },
  {
    shape: [[0, 6, 0], [6, 6, 6]],
    color: "#a000f0", // T - Purple
  },
  {
    shape: [[7, 7, 0], [0, 7, 7]],
    color: "#f00000", // Z - Red
  },
];

export default function Tetris() {
  // Game state
  const [board, setBoard] = useState<number[][]>([]);
  const [currentTetromino, setCurrentTetromino] = useState<{
    shape: number[][];
    position: { x: number; y: number };
    type: number;
  } | null>(null);
  const [nextTetromino, setNextTetromino] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(1);
  const [lines, setLines] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  // Initialize the game board
  const initializeBoard = useCallback(() => {
    const newBoard = Array(BOARD_HEIGHT)
      .fill(null)
      .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));
    setBoard(newBoard);
  }, []);

  // Auto-start the game when component mounts
  useEffect(() => {
    startGame();
  }, []);

  // Generate a random tetromino
  const generateRandomTetromino = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * TETROMINOES.length);
    return randomIndex;
  }, []);

  // Generate a random position for a new tetromino
  const generateRandomPosition = useCallback((shape: number[][]) => {
    // Calculate the width of the tetromino
    const tetrominoWidth = shape[0].length;
    
    // Generate a random x position within the board boundaries
    const maxX = BOARD_WIDTH - tetrominoWidth;
    const randomX = Math.floor(Math.random() * (maxX + 1));
    
    return {
      x: randomX,
      y: 0
    };
  }, []);

  // Start a new game
  const startGame = useCallback(() => {
    initializeBoard();
    const firstTetrominoType = generateRandomTetromino();
    const secondTetrominoType = generateRandomTetromino();
    
    const firstShape = TETROMINOES[firstTetrominoType].shape;
    const firstPosition = generateRandomPosition(firstShape);
    
    setCurrentTetromino({
      shape: firstShape,
      position: firstPosition,
      type: firstTetrominoType
    });
    
    setNextTetromino(secondTetrominoType);
    setGameOver(false);
    setScore(0);
    setLevel(1);
    setLines(0);
    setIsPaused(false);
    setGameStarted(true);
  }, [initializeBoard, generateRandomTetromino, generateRandomPosition]);

  // Rotate a tetromino
  const rotateTetromino = useCallback((tetromino: number[][]) => {
    const rotated = [];
    for (let i = 0; i < tetromino[0].length; i++) {
      const row = [];
      for (let j = tetromino.length - 1; j >= 0; j--) {
        row.push(tetromino[j][i]);
      }
      rotated.push(row);
    }
    return rotated;
  }, []);

  // Check if a move is valid
  const isValidMove = useCallback((tetromino: number[][], position: { x: number; y: number }) => {
    for (let y = 0; y < tetromino.length; y++) {
      for (let x = 0; x < tetromino[y].length; x++) {
        if (tetromino[y][x] !== EMPTY_CELL) {
          const boardX = position.x + x;
          const boardY = position.y + y;

          // Check if out of bounds
          if (
            boardX < 0 ||
            boardX >= BOARD_WIDTH ||
            boardY < 0 ||
            boardY >= BOARD_HEIGHT
          ) {
            return false;
          }

          // Check if cell is already occupied
          if (board[boardY] && board[boardY][boardX] !== EMPTY_CELL) {
            return false;
          }
        }
      }
    }
    return true;
  }, [board]);

  // Place the current tetromino on the board
  const placeTetromino = useCallback(() => {
    if (!currentTetromino) return;

    const { shape, position, type } = currentTetromino;
    const newBoard = [...board.map(row => [...row])];

    for (let y = 0; y < shape.length; y++) {
      for (let x = 0; x < shape[y].length; x++) {
        if (shape[y][x] !== EMPTY_CELL) {
          const boardX = position.x + x;
          const boardY = position.y + y;
          
          if (boardY < 0) {
            // Game over if tetromino is placed above the board
            setGameOver(true);
            return;
          }
          
          newBoard[boardY][boardX] = shape[y][x];
        }
      }
    }

    setBoard(newBoard);
    
    // Check for completed lines
    const completedLines: number[] = [];
    for (let y = 0; y < BOARD_HEIGHT; y++) {
      if (newBoard[y].every(cell => cell !== EMPTY_CELL)) {
        completedLines.push(y);
      }
    }
    
    if (completedLines.length > 0) {
      // Remove completed lines
      const updatedBoard = newBoard.filter((_, index) => !completedLines.includes(index));
      
      // Add new empty lines at the top
      const newEmptyLines = Array(completedLines.length)
        .fill(null)
        .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL));
      
      setBoard([...newEmptyLines, ...updatedBoard]);
      
      // Update score and level
      const newLines = lines + completedLines.length;
      const newScore = score + (completedLines.length === 1 ? 100 : 
                               completedLines.length === 2 ? 300 : 
                               completedLines.length === 3 ? 500 : 800) * level;
      const newLevel = Math.floor(newLines / 10) + 1;
      
      setLines(newLines);
      setScore(newScore);
      setLevel(newLevel);
    }
    
    // Generate next tetromino
    const nextTetrominoType = nextTetromino;
    const newNextTetromino = generateRandomTetromino();
    
    const nextShape = TETROMINOES[nextTetrominoType].shape;
    const nextPosition = generateRandomPosition(nextShape);
    
    setCurrentTetromino({
      shape: nextShape,
      position: nextPosition,
      type: nextTetrominoType
    });
    
    setNextTetromino(newNextTetromino);
  }, [board, currentTetromino, nextTetromino, generateRandomTetromino, score, level, lines]);

  // Move the current tetromino
  const moveTetromino = useCallback((dx: number, dy: number) => {
    if (!currentTetromino || gameOver || isPaused) return;

    const newPosition = {
      x: currentTetromino.position.x + dx,
      y: currentTetromino.position.y + dy
    };

    if (isValidMove(currentTetromino.shape, newPosition)) {
      setCurrentTetromino({
        ...currentTetromino,
        position: newPosition
      });
      return true;
    }
    
    // If moving down is not valid, place the tetromino
    if (dy > 0) {
      placeTetromino();
    }
    
    return false;
  }, [currentTetromino, gameOver, isPaused, isValidMove, placeTetromino]);

  // Rotate the current tetromino
  const rotate = useCallback(() => {
    if (!currentTetromino || gameOver || isPaused) return;

    const rotatedShape = rotateTetromino(currentTetromino.shape);
    
    // Try to rotate, if not possible due to walls, try to adjust position
    if (isValidMove(rotatedShape, currentTetromino.position)) {
      setCurrentTetromino({
        ...currentTetromino,
        shape: rotatedShape
      });
    } else {
      // Try to adjust position if rotation puts tetromino out of bounds
      const adjustments = [
        { x: -1, y: 0 }, { x: 1, y: 0 }, { x: -2, y: 0 }, { x: 2, y: 0 }, // Left/Right
        { x: 0, y: -1 }, { x: 0, y: -2 } // Up
      ];
      
      for (const adjustment of adjustments) {
        const adjustedPosition = {
          x: currentTetromino.position.x + adjustment.x,
          y: currentTetromino.position.y + adjustment.y
        };
        
        if (isValidMove(rotatedShape, adjustedPosition)) {
          setCurrentTetromino({
            ...currentTetromino,
            shape: rotatedShape,
            position: adjustedPosition
          });
          break;
        }
      }
    }
  }, [currentTetromino, gameOver, isPaused, rotateTetromino, isValidMove]);

  // Hard drop the current tetromino
  const hardDrop = useCallback(() => {
    if (!currentTetromino || gameOver || isPaused) return;

    let newY = currentTetromino.position.y;
    
    // Find the lowest valid position
    while (isValidMove(currentTetromino.shape, { x: currentTetromino.position.x, y: newY + 1 })) {
      newY++;
    }
    
    setCurrentTetromino({
      ...currentTetromino,
      position: { ...currentTetromino.position, y: newY }
    });
    
    placeTetromino();
  }, [currentTetromino, gameOver, isPaused, isValidMove, placeTetromino]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (gameStarted && !gameOver) {
      setIsPaused(!isPaused);
    }
  }, [gameStarted, gameOver, isPaused]);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted) return;
      
      switch (e.key) {
        case "ArrowLeft":
          moveTetromino(-1, 0);
          break;
        case "ArrowRight":
          moveTetromino(1, 0);
          break;
        case "ArrowDown":
          moveTetromino(0, 1);
          break;
        case "ArrowUp":
          rotate();
          break;
        case " ": // Space
          hardDrop();
          break;
        case "p":
        case "P":
          togglePause();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameStarted, moveTetromino, rotate, hardDrop, togglePause]);

  // Game loop
  useEffect(() => {
    if (!gameStarted || gameOver || isPaused) return;

    // Faster falling speed: base speed is now 500ms instead of 1000ms
    // and decreases more quickly with level
    const speed = 600 - (level - 1) * 60 > 60 ? 600 - (level - 1) * 50 : 50;
    
    const gameLoop = setInterval(() => {
      moveTetromino(0, 1);
    }, speed);

    return () => clearInterval(gameLoop);
  }, [gameStarted, gameOver, isPaused, level, moveTetromino]);

  // Get the color for a cell
  const getCellColor = (value: number) => {
    if (value === EMPTY_CELL) return "#111111";
    return TETROMINOES[value - 1].color;
  };

  // Render the next tetromino preview
  const renderNextTetromino = () => {
    const shape = TETROMINOES[nextTetromino].shape;
    const color = TETROMINOES[nextTetromino].color;
    
    return (
      <div className="bg-gray-800 p-2 rounded">
        <div 
          style={{ 
            display: "grid",
            gridTemplateRows: `repeat(${shape.length}, ${CELL_SIZE}px)`,
            gridTemplateColumns: `repeat(${shape[0].length}, ${CELL_SIZE}px)`,
            gap: "1px"
          }}
        >
          {shape.map((row, y) => 
            row.map((cell, x) => (
              <div 
                key={`next-${y}-${x}`}
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: cell ? color : "transparent",
                  border: cell ? "1px solid rgba(255, 255, 255, 0.2)" : "none"
                }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  // Render the game board with the current tetromino
  const renderBoard = () => {
    // Create a copy of the board to render the current tetromino
    const displayBoard = board.map(row => [...row]);
    
    // Add the current tetromino to the display board
    if (currentTetromino && !gameOver) {
      const { shape, position, type } = currentTetromino;
      
      for (let y = 0; y < shape.length; y++) {
        for (let x = 0; x < shape[y].length; x++) {
          if (shape[y][x] !== EMPTY_CELL) {
            const boardX = position.x + x;
            const boardY = position.y + y;
            
            if (boardY >= 0 && boardY < BOARD_HEIGHT && boardX >= 0 && boardX < BOARD_WIDTH) {
              displayBoard[boardY][boardX] = type + 1; // +1 because tetromino types are 0-indexed
            }
          }
        }
      }
    }
    
    return (
      <div 
        className="border-2 border-gray-600 bg-gray-900"
        style={{ 
          display: "grid",
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, ${CELL_SIZE}px)`,
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, ${CELL_SIZE}px)`,
          gap: "1px"
        }}
      >
        {displayBoard.map((row, y) => 
          row.map((cell, x) => (
            <div 
              key={`${y}-${x}`}
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: getCellColor(cell),
                border: cell !== EMPTY_CELL ? "1px solid rgba(255, 255, 255, 0.2)" : "none"
              }}
            />
          ))
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-[500px]">
        <div className="bg-blue-900 text-white p-2 rounded">
          <h3 className="text-sm font-bold">СЧЕТ</h3>
          <p className="text-xl">{score}</p>
        </div>
        <div className="bg-blue-900 text-white p-2 rounded">
          <h3 className="text-sm font-bold">УРОВЕНЬ</h3>
          <p className="text-xl">{level}</p>
        </div>
        <div className="bg-blue-900 text-white p-2 rounded">
          <h3 className="text-sm font-bold">ЛИНИИ</h3>
          <p className="text-xl">{lines}</p>
        </div>
      </div>
      
      <div className="mb-4 text-gray-700">
        <p>Используйте <strong>стрелки</strong> для управления, <strong>пробел</strong> для быстрого падения.</p>
        <p>Нажмите <strong>P</strong> для паузы.</p>
      </div>
      
      <div className="flex gap-4">
        <div>
          {renderBoard()}
        </div>
        
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-gray-700 mb-2">СЛЕДУЮЩАЯ ФИГУРА</h3>
            {renderNextTetromino()}
          </div>
          
          <div className="flex flex-col gap-2">
            <button 
              onClick={startGame}
              className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
            >
              {gameStarted ? "Новая игра" : "Начать игру"}
            </button>
            
            {gameStarted && !gameOver && (
              <button 
                onClick={togglePause}
                className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                {isPaused ? "Продолжить" : "Пауза"}
              </button>
            )}
          </div>
        </div>
      </div>
      
      {gameOver && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 rounded text-center">
          <h3 className="text-xl font-bold">Игра окончена! Вы лысый черт!</h3>
          <p>Ваш счет: {score}</p>
          <button 
            onClick={startGame}
            className="mt-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Играть снова
          </button>
        </div>
      )}
      
      {isPaused && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded text-center">
          <h3 className="text-xl font-bold">Пауза</h3>
          <p>Нажмите "Продолжить" или клавишу P, чтобы продолжить игру.</p>
        </div>
      )}
    </div>
  );
}
