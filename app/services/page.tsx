"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Game2048 from "@/components/Game2048";
import SlotMachine from "@/components/SlotMachine";
import Tetris from "@/components/Tetris";

// Game types
type GameType = "selection" | "2048" | "slots" | "tetris";

export default function ServicesPage() {
  // Game selection state
  const [currentView, setCurrentView] = useState<GameType>("selection");

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-2 flex justify-end items-center">
          <Link href="/login" className="font-bold uppercase text-gray-800 hover:text-gray-900">Войти</Link>
        </div>
      </header>

      {/* Main Header with Logo */}
      <div className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <div className="mr-6">
            {/* Logo */}
            <div className="w-24 h-24 relative">
              <Link href="/">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={256} 
                  height={256} 
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Органы общественной безопастности</h1>
            <h2 className="text-xl">Комаринской народной республики</h2>
            <p className="text-sm mt-2">Служим Закону, Народу, Отчизне!</p>
          </div>
          <div className="text-right">
            <p className="text-sm">111111, Комарин ул.</p>
            <p className="text-sm">Улица Аль-Комарина, 69</p>
            <p className="text-sm mt-2">Круглосуточный единый</p>
            <p className="text-sm">номер: 911</p>
          </div>
          <div className="ml-6">
            {/* Logo */}
            <div className="w-16 h-16 relative">
                <Image 
                  src="/logo.png" 
                  alt="Logo" 
                  width={64} 
                  height={64} 
                  className="w-full h-full object-contain"
                />
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6">
            <Link href="/" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Главная</Link>
            <Link href="/wanted" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Их розыскивает ООБ</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">О министерстве</Link>
            <Link href="/services" className="py-4 text-blue-900 font-bold border-b-2 border-blue-900">Услуги</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Обращения</Link>
            <Link href="/military" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Military</Link>
            <Link href="/administration" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Ваш черт лысый</Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Игры</h2>
            
            {/* Back button when in a game */}
            {currentView !== "selection" && (
              <button
                onClick={() => setCurrentView("selection")}
                className="mb-6 flex items-center text-blue-900 hover:text-blue-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                Назад к выбору игр
              </button>
            )}
            
            {/* Game Selection Gallery */}
            {currentView === "selection" && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 2048 Game Card */}
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image 
                      src="/images/games/2048.svg" 
                      alt="2048 Game" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Игра 2048</h3>
                    <p className="text-gray-700 mb-4">
                      Классическая головоломка, в которой вы объединяете числа, чтобы получить плитку 2048. 
                      Используйте стрелки на клавиатуре для перемещения плиток. Объединяйте одинаковые числа, 
                      чтобы получить большие значения!
                    </p>
                    <button 
                      onClick={() => setCurrentView("2048")}
                      className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                    >
                      Играть
                    </button>
                  </div>
                </div>
                
                {/* Slot Machine Game Card */}
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image 
                      src="/images/games/slots.svg" 
                      alt="Slot Machine" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Одноногий бандит</h3>
                    <p className="text-gray-700 mb-4">
                      Классический игровой автомат в стиле казино. Крутите барабаны и соберите три одинаковых 
                      символа, чтобы выиграть! Разные символы приносят разные награды. Особые символы, такие как 
                      бриллиант или семерка, дают больше кредитов.
                    </p>
                    <button 
                      onClick={() => setCurrentView("slots")}
                      className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                    >
                      Играть
                    </button>
                  </div>
                </div>
                
                {/* Tetris Game Card */}
                <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-100">
                    <Image 
                      src="/images/games/tetris.svg" 
                      alt="Tetris Game" 
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">Тетрис</h3>
                    <p className="text-gray-700 mb-4">
                      Легендарная игра-головоломка, в которой вы управляете падающими блоками разной формы. 
                      Выстраивайте блоки в линии, чтобы очищать игровое поле. Используйте стрелки для управления 
                      и пробел для быстрого падения.
                    </p>
                    <button 
                      onClick={() => setCurrentView("tetris")}
                      className="w-full bg-blue-900 text-white py-2 rounded hover:bg-blue-800 transition-colors"
                    >
                      Играть
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {/* 2048 Game */}
            {currentView === "2048" && <Game2048 />}
            
            {/* Slot Machine Game */}
            {currentView === "slots" && <SlotMachine />}
            
            {/* Tetris Game */}
            {currentView === "tetris" && <Tetris />}
          </div>
        </div>
      </div>
    </main>
  );
}
