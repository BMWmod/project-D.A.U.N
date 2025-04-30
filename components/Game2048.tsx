"use client";

import { useEffect, useState } from "react";

// Game constants
const GRID_SIZE = 4;
const CELL_SIZE = 80;
const CELL_GAP = 10;

export default function Game2048() {
  const [grid, setGrid] = useState<number[][]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameWon, setGameWon] = useState(false);

  // Initialize the game
  useEffect(() => {
    startGame();
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          moveUp();
          break;
        case "ArrowDown":
          moveDown();
          break;
        case "ArrowLeft":
          moveLeft();
          break;
        case "ArrowRight":
          moveRight();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [grid, gameOver]);

  // Start a new game
  const startGame = () => {
    // Create an empty grid
    const newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() => Array(GRID_SIZE).fill(0));

    // Add two initial tiles
    addRandomTile(newGrid);
    addRandomTile(newGrid);

    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
    setGameWon(false);
  };

  // Add a random tile (2 or 4) to an empty cell
  const addRandomTile = (grid: number[][]) => {
    const emptyCells = [];
    
    // Find all empty cells
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === 0) {
          emptyCells.push({ r, c });
        }
      }
    }

    if (emptyCells.length === 0) return;

    // Choose a random empty cell
    const { r, c } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    
    // 90% chance for a 2, 10% chance for a 4
    grid[r][c] = Math.random() < 0.9 ? 2 : 4;
  };

  // Check if the game is over
  const checkGameOver = (grid: number[][]) => {
    // Check if there are any empty cells
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === 0) return false;
      }
    }

    // Check if there are any possible merges
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        const val = grid[r][c];
        
        // Check right
        if (c < GRID_SIZE - 1 && grid[r][c + 1] === val) return false;
        
        // Check down
        if (r < GRID_SIZE - 1 && grid[r + 1][c] === val) return false;
      }
    }

    return true;
  };

  // Check if the player has won (reached 2048)
  const checkWin = (grid: number[][]) => {
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        if (grid[r][c] === 2048) return true;
      }
    }
    return false;
  };

  // Move functions
  const moveLeft = () => {
    const newGrid = [...grid.map(row => [...row])];
    let changed = false;
    let newScore = score;

    for (let r = 0; r < GRID_SIZE; r++) {
      const row = newGrid[r];
      const originalRow = [...row];
      
      // Remove zeros
      const filteredRow = row.filter(cell => cell !== 0);
      
      // Merge tiles
      for (let i = 0; i < filteredRow.length - 1; i++) {
        if (filteredRow[i] === filteredRow[i + 1]) {
          filteredRow[i] *= 2;
          newScore += filteredRow[i];
          filteredRow[i + 1] = 0;
        }
      }
      
      // Remove zeros again after merging
      const mergedRow = filteredRow.filter(cell => cell !== 0);
      
      // Fill with zeros
      while (mergedRow.length < GRID_SIZE) {
        mergedRow.push(0);
      }
      
      // Update the grid row
      newGrid[r] = mergedRow;
      
      // Check if the row changed
      if (!changed) {
        changed = !originalRow.every((val, index) => val === mergedRow[index]);
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      
      if (checkWin(newGrid)) {
        setGameWon(true);
      } else if (checkGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveRight = () => {
    const newGrid = [...grid.map(row => [...row])];
    let changed = false;
    let newScore = score;

    for (let r = 0; r < GRID_SIZE; r++) {
      const row = newGrid[r];
      const originalRow = [...row];
      
      // Remove zeros
      const filteredRow = row.filter(cell => cell !== 0);
      
      // Merge tiles (from right to left)
      for (let i = filteredRow.length - 1; i > 0; i--) {
        if (filteredRow[i] === filteredRow[i - 1]) {
          filteredRow[i] *= 2;
          newScore += filteredRow[i];
          filteredRow[i - 1] = 0;
        }
      }
      
      // Remove zeros again after merging
      const mergedRow = filteredRow.filter(cell => cell !== 0);
      
      // Fill with zeros at the beginning
      const newRow = Array(GRID_SIZE - mergedRow.length).fill(0).concat(mergedRow);
      
      // Update the grid row
      newGrid[r] = newRow;
      
      // Check if the row changed
      if (!changed) {
        changed = !originalRow.every((val, index) => val === newRow[index]);
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      
      if (checkWin(newGrid)) {
        setGameWon(true);
      } else if (checkGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveUp = () => {
    const newGrid = [...grid.map(row => [...row])];
    let changed = false;
    let newScore = score;

    for (let c = 0; c < GRID_SIZE; c++) {
      // Extract column
      const column = newGrid.map(row => row[c]);
      const originalColumn = [...column];
      
      // Remove zeros
      const filteredColumn = column.filter(cell => cell !== 0);
      
      // Merge tiles
      for (let i = 0; i < filteredColumn.length - 1; i++) {
        if (filteredColumn[i] === filteredColumn[i + 1]) {
          filteredColumn[i] *= 2;
          newScore += filteredColumn[i];
          filteredColumn[i + 1] = 0;
        }
      }
      
      // Remove zeros again after merging
      const mergedColumn = filteredColumn.filter(cell => cell !== 0);
      
      // Fill with zeros
      while (mergedColumn.length < GRID_SIZE) {
        mergedColumn.push(0);
      }
      
      // Update the grid column
      for (let r = 0; r < GRID_SIZE; r++) {
        newGrid[r][c] = mergedColumn[r];
      }
      
      // Check if the column changed
      if (!changed) {
        changed = !originalColumn.every((val, index) => val === mergedColumn[index]);
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      
      if (checkWin(newGrid)) {
        setGameWon(true);
      } else if (checkGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  const moveDown = () => {
    const newGrid = [...grid.map(row => [...row])];
    let changed = false;
    let newScore = score;

    for (let c = 0; c < GRID_SIZE; c++) {
      // Extract column
      const column = newGrid.map(row => row[c]);
      const originalColumn = [...column];
      
      // Remove zeros
      const filteredColumn = column.filter(cell => cell !== 0);
      
      // Merge tiles (from bottom to top)
      for (let i = filteredColumn.length - 1; i > 0; i--) {
        if (filteredColumn[i] === filteredColumn[i - 1]) {
          filteredColumn[i] *= 2;
          newScore += filteredColumn[i];
          filteredColumn[i - 1] = 0;
        }
      }
      
      // Remove zeros again after merging
      const mergedColumn = filteredColumn.filter(cell => cell !== 0);
      
      // Fill with zeros at the beginning
      const newColumn = Array(GRID_SIZE - mergedColumn.length).fill(0).concat(mergedColumn);
      
      // Update the grid column
      for (let r = 0; r < GRID_SIZE; r++) {
        newGrid[r][c] = newColumn[r];
      }
      
      // Check if the column changed
      if (!changed) {
        changed = !originalColumn.every((val, index) => val === newColumn[index]);
      }
    }

    if (changed) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
      
      if (checkWin(newGrid)) {
        setGameWon(true);
      } else if (checkGameOver(newGrid)) {
        setGameOver(true);
      }
    }
  };

  // Get the background color for a cell based on its value
  const getCellBackgroundColor = (value: number) => {
    const colors: Record<number, string> = {
      0: "#cdc1b4",
      2: "#eee4da",
      4: "#ede0c8",
      8: "#f2b179",
      16: "#f59563",
      32: "#f67c5f",
      64: "#f65e3b",
      128: "#edcf72",
      256: "#edcc61",
      512: "#edc850",
      1024: "#edc53f",
      2048: "#edc22e",
    };
    
    return colors[value] || "#3c3a32";
  };

  // Get the text color for a cell based on its value
  const getCellTextColor = (value: number) => {
    return value <= 4 ? "#776e65" : "#f9f6f2";
  };

  // Get the font size for a cell based on its value
  const getCellFontSize = (value: number) => {
    if (value < 100) return "24px";
    if (value < 1000) return "20px";
    return "16px";
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-[370px]">
        <div className="bg-blue-900 text-white p-2 rounded">
          <h3 className="text-sm font-bold">СЧЕТ</h3>
          <p className="text-xl">{score}</p>
        </div>
        <button 
          onClick={startGame}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Новая игра
        </button>
      </div>
      
      <div className="mb-4 text-gray-700">
        <p>Используйте <strong>стрелки</strong> на клавиатуре для перемещения плиток.</p>
        <p>Объединяйте одинаковые числа, чтобы получить 2048!</p>
        <p>В случае проигрыша вы становитесь лысым чертом!</p>
      </div>
      
      {/* Game grid */}
      <div 
        className="bg-[#bbada0] p-[10px] rounded-md"
        style={{ 
          width: `${GRID_SIZE * CELL_SIZE + (GRID_SIZE + 1) * CELL_GAP}px`,
          height: `${GRID_SIZE * CELL_SIZE + (GRID_SIZE + 1) * CELL_GAP}px`,
          position: "relative"
        }}
      >
        {/* Grid cells (background) */}
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
          const row = Math.floor(index / GRID_SIZE);
          const col = index % GRID_SIZE;
          
          return (
            <div 
              key={`cell-${row}-${col}`}
              className="absolute rounded-md"
              style={{
                width: `${CELL_SIZE}px`,
                height: `${CELL_SIZE}px`,
                backgroundColor: "#cdc1b4",
                top: `${row * CELL_SIZE + (row + 1) * CELL_GAP}px`,
                left: `${col * CELL_SIZE + (col + 1) * CELL_GAP}px`,
              }}
            />
          );
        })}
        
        {/* Tile cells (with numbers) */}
        {grid.map((row, rowIndex) => 
          row.map((value, colIndex) => {
            if (value === 0) return null;
            
            return (
              <div 
                key={`tile-${rowIndex}-${colIndex}`}
                className="absolute rounded-md flex items-center justify-center font-bold"
                style={{
                  width: `${CELL_SIZE}px`,
                  height: `${CELL_SIZE}px`,
                  backgroundColor: getCellBackgroundColor(value),
                  color: getCellTextColor(value),
                  fontSize: getCellFontSize(value),
                  top: `${rowIndex * CELL_SIZE + (rowIndex + 1) * CELL_GAP}px`,
                  left: `${colIndex * CELL_SIZE + (colIndex + 1) * CELL_GAP}px`,
                }}
              >
                {value}
              </div>
            );
          })
        )}
      </div>
      
      {/* Game over message */}
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
      
      {/* Game won message */}
      {gameWon && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-center">
          <h3 className="text-xl font-bold">Поздравляем!</h3>
          <p>Вы достигли 2048! Ваш счет: {score}</p>
          <p className="mt-2">Вы можете продолжить игру или начать новую.</p>
          <button 
            onClick={startGame}
            className="mt-2 bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          >
            Новая игра
          </button>
        </div>
      )}
    </div>
  );
}
