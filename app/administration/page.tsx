"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import CardGrid from "@/components/CardGrid";
export default function LoginPage() {

 
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
              <CardGrid/>

              {/* Video Section */}
            </div>
          </div>


        </div>
      </div>
    </main>
  );
}
