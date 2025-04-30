"use client";

import { useState, useRef } from "react";
import Image from "next/image";

// Game constants for Slot Machine
const SYMBOL_PATHS = [
  "/images/slots/cherry.svg",
  "/images/slots/lemon.svg",
  "/images/slots/orange.svg",
  "/images/slots/grape.svg",
  "/images/slots/diamond.svg",
  "/images/slots/seven.svg",
  "/images/slots/jackpot.svg"
];
const REEL_COUNT = 3;

export default function SlotMachine() {
  // Slot machine game state
  const [reels, setReels] = useState<string[]>(Array(REEL_COUNT).fill(SYMBOL_PATHS[0]));
  const [spinning, setSpinning] = useState(false);
  const [slotsResult, setSlotsResult] = useState<"" | "win" | "lose">("");
  const [slotsScore, setSlotsScore] = useState(100); // Starting credits
  const spinTimeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Get win amount based on symbol
  const getWinAmount = (symbolPath: string) => {
    if (symbolPath.includes("diamond")) return 100;
    if (symbolPath.includes("seven")) return 77;
    if (symbolPath.includes("jackpot")) return 50;
    return 20; // Base win for other symbols
  };

  // Spin the slot machine
  const spinSlotMachine = () => {
    if (spinning || slotsScore < 10) return;
    
    // Deduct credits
    setSlotsScore(prev => prev - 10);
    setSpinning(true);
    setSlotsResult("");
    
    // Clear any existing timeouts
    spinTimeoutsRef.current.forEach(timeout => clearTimeout(timeout));
    spinTimeoutsRef.current = [];
    
    // Spin each reel with increasing delay
    for (let i = 0; i < REEL_COUNT; i++) {
      const timeout = setTimeout(() => {
        setReels(prev => {
          const updated = [...prev];
          updated[i] = SYMBOL_PATHS[Math.floor(Math.random() * SYMBOL_PATHS.length)];
          return updated;
        });
        
        // If this is the last reel, check for win
        if (i === REEL_COUNT - 1) {
          setTimeout(() => {
            // Generate final results
            const finalReels = [
              SYMBOL_PATHS[Math.floor(Math.random() * SYMBOL_PATHS.length)],
              SYMBOL_PATHS[Math.floor(Math.random() * SYMBOL_PATHS.length)],
              SYMBOL_PATHS[Math.floor(Math.random() * SYMBOL_PATHS.length)]
            ];
            
            setReels(finalReels);
            setSpinning(false);
            
            // Determine if it's a win (all symbols match)
            const isWin = finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2];
            
            if (isWin) {
              // Award credits based on symbol
              const winAmount = getWinAmount(finalReels[0]);
              setSlotsScore(prev => prev + winAmount);
              setSlotsResult("win");
            } else {
              setSlotsResult("lose");
            }
          }, 500);
        }
      }, 500 + i * 500);
      
      spinTimeoutsRef.current.push(timeout);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex justify-between w-full max-w-[370px]">
        <div className="bg-blue-900 text-white p-2 rounded">
          <h3 className="text-sm font-bold">КРЕДИТЫ</h3>
          <p className="text-xl">{slotsScore}</p>
        </div>
        <button 
          onClick={() => {
            setSlotsScore(100);
            setSlotsResult("");
          }}
          className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-800"
          disabled={spinning}
        >
          Пополнить
        </button>
      </div>
      
      <div className="mb-4 text-gray-700 text-center">
        <p>Нажмите на рычаг, чтобы запустить барабаны!</p>
        <p>Соберите три одинаковых символа, чтобы выиграть!</p>
        <p>Стоимость одного вращения: 10 кредитов</p>
      </div>
      
      {/* Slot Machine */}
      <div className="bg-gradient-to-b from-red-700 to-red-900 p-6 rounded-lg shadow-lg mb-4">
        <div className="flex justify-center gap-4 mb-4">
          {reels.map((symbolPath, index) => (
            <div 
              key={index} 
              className="w-20 h-20 bg-white flex items-center justify-center rounded-md"
            >
              <Image 
                src={symbolPath} 
                alt={`Slot Symbol ${index + 1}`} 
                width={80} 
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
        
        <button
          onClick={spinSlotMachine}
          className={`mt-4 w-full py-3 rounded-lg text-white font-bold text-lg ${
            spinning || slotsScore < 10
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-500 hover:to-yellow-700 shadow-md"
          }`}
          disabled={spinning || slotsScore < 10}
        >
          {spinning ? "Вращение..." : "КРУТИТЬ!"}
        </button>
      </div>
      
      {/* Result message */}
      {slotsResult === "win" && (
        <div className="mt-2 p-4 bg-green-100 text-green-800 rounded text-center">
          <h3 className="text-xl font-bold">Поздравляем!</h3>
          <p>Вы выиграли! Кредиты зачислены на ваш счет.</p>
        </div>
      )}
      
      {slotsResult === "lose" && (
        <div className="mt-2 p-4 bg-red-100 text-red-800 rounded text-center">
          <p>Не повезло! Попробуйте еще раз.</p>
        </div>
      )}
      
      {slotsScore <= 0 && (
        <div className="mt-2 p-4 bg-red-100 text-red-800 rounded text-center">
          <h3 className="text-xl font-bold">У вас закончились кредиты!</h3>
          <p>Нажмите "Пополнить", чтобы продолжить игру.</p>
        </div>
      )}
    </div>
  );
}
