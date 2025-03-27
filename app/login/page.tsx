"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function LoginPage() {
  const [name, setName] = useState("");
  
  // Array of forbidden names
  const forbiddenNames = ["вов","вовка","володя","вовчик", "вова", "владимир", "вован", "кова", "vova", "vladimir", "azovchik", "азовчик", "4308чик", "каштан338", "даун338", "вовчик338", "boва"];
  
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    
    // Check if the input contains any forbidden words
    const lowerCaseValue = value.toLowerCase();
    const isForbidden = forbiddenNames.some(forbidden => 
      lowerCaseValue.includes(forbidden)
    );
    
    // If a forbidden word is found, replace it with "Чертила"
    if (isForbidden) {
      // Show toast notification
      toast.error("Такого имени не существует в природе", {
        position: "top-left",
        duration: 5000,
      });
      
      // Replace the forbidden word with "Чертила"
      forbiddenNames.forEach(forbidden => {
        // Create a case-insensitive regular expression
        const regex = new RegExp(forbidden, 'gi');
        value = value.replace(regex, "Чертила лысый");
      });
    }
    
    setName(value);
  };
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <div className="mr-6">
            {/* Emblem SVG */}
            <div className="w-16 h-16 relative">
            <Link href="/">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="100" cy="100" r="90" fill="#D22730" stroke="#FFD700" strokeWidth="5"/>
                  <path d="M100 20C55.8 20 20 55.8 20 100C20 144.2 55.8 180 100 180C144.2 180 180 144.2 180 100C180 55.8 144.2 20 100 20Z" fill="#FFD700" fillOpacity="0.2"/>
                  <rect x="70" y="60" width="60" height="80" fill="#D22730"/>
                  <rect x="85" y="50" width="30" height="100" fill="#FFD700"/>
                  <rect x="50" y="85" width="100" height="30" fill="#FFD700"/>
                </svg>
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Министерство внутренних дел Комаринской народной республики</h1>
            <p className="text-sm mt-1">Служим Закону, Народу, Отчизне!</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Form Section */}
              <div className="w-full md:w-1/2 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Авторизация</h2>
                <form className="space-y-6">
                  {/* Name Field */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="#E5E7EB"/>
                        <path d="M16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16Z" fill="#6B7280"/>
                        <path d="M16 18C12.6863 18 10 20.6863 10 24H22C22 20.6863 19.3137 18 16 18Z" fill="#6B7280"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Имя</label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите имя"
                        value={name}
                        onChange={handleNameChange}
                        required
                      />
                    </div>
                  </div>

                  {/* Surname Field */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="#E5E7EB"/>
                        <path d="M16 8C13.7909 8 12 9.79086 12 12C12 14.2091 13.7909 16 16 16C18.2091 16 20 14.2091 20 12C20 9.79086 18.2091 8 16 8Z" fill="#6B7280"/>
                        <path d="M10 24C10 20.6863 12.6863 18 16 18C19.3137 18 22 20.6863 22 24" stroke="#6B7280" strokeWidth="2"/>
                        <path d="M8 14H10M22 14H24" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Фамилия</label>
                      <input
                        type="text"
                        id="surname"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите фамилию"
                        required
                      />
                    </div>
                  </div>

                  {/* kkwarid Field */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="#E5E7EB"/>
                        <rect x="8" y="8" width="16" height="16" rx="2" stroke="#6B7280" strokeWidth="2"/>
                        <path d="M12 12H14M12 16H16M12 20H18" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="kkwarid" className="block text-sm font-medium text-gray-700 mb-1">Номер kkwarid</label>
                      <input
                        type="text"
                        id="kkwarid"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите номер kkwarid"
                        required
                      />
                    </div>
                  </div>

                  {/* ECID Field */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="#E5E7EB"/>
                        <rect x="6" y="10" width="20" height="12" rx="2" stroke="#6B7280" strokeWidth="2"/>
                        <path d="M10 14H10.01M14 14H14.01M18 14H18.01M22 14H22.01M10 18H10.01M14 18H14.01M18 18H18.01M22 18H22.01" stroke="#6B7280" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="ecid" className="block text-sm font-medium text-gray-700 mb-1">Номер ECID</label>
                      <input
                        type="text"
                        id="ecid"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите номер ECID"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone Field */}
                  <div className="flex items-center">
                    <div className="w-8 h-8 mr-4 flex-shrink-0">
                      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="32" height="32" rx="4" fill="#E5E7EB"/>
                        <path d="M22 12L18 8H14L10 12V24H22V12Z" stroke="#6B7280" strokeWidth="2"/>
                        <circle cx="16" cy="19" r="2" fill="#6B7280"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Номер телефона</label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Введите номер телефона"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      className="w-full bg-blue-900 text-white py-2 px-4 rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Войти
                    </button>
                  </div>
                </form>
              </div>

              {/* Video Section */}
              <div className="w-full md:w-1/2 bg-gray-900">
                <div className="h-full flex items-center justify-center p-4">
                  <div className="aspect-w-16 aspect-h-9 w-full">
                    <video 
                      className="w-full h-full object-cover rounded" 
                      autoPlay
                      muted
                      loop
                    >
                      <source src="/videos/video.mp4" type="video/mp4" />
                      Ваш браузер не поддерживает видео.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-blue-900 hover:underline">
              Вернуться на главную
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
