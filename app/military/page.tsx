"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";

export default function MilitaryMainPage() {
  
  return (
    <main className="min-h-screen flex flex-col bg-emerald-900">
      <Toaster />
      <div className="absolute top-32 left-0 w-full h-45 overflow-hidden z-0">
        <Image 
          src="/bigpicture.png" 
          alt="Background" 
          fill
          className="object-cover"
          priority
        />
      </div> 
      <header className="bg-emerald-950 text-white h-32 relative z-10">
        <div className="container mx-auto px-1 py-2 flex items-center">
          <div className="mr-6">
            <div className="w-28 h-28 ">
              <Link href="/">
                <Image 
                  src="/militarylogo.png" 
                  alt="Militarylogo" 
                  width={256  } 
                  height={256} 
                  className="w-full h-full object-contain"
                />
              </Link>
            </div>
          </div>
          <div>
            <h1 className="text-xl font-bold">Силы народной мобилизации Комаринской Народной Республики</h1>
            <p className="text-sm mt-1">Служим Отчизне! Всегда ищем добровольцев!</p>
          </div>
        </div>
      </header>
    </main>
  );
}
