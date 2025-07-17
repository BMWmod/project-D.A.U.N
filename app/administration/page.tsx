"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, Toaster } from "sonner";
import CardGrid from "@/components/CardGrid";
export default function AdministrationPage() {

 
  return (
    <main className="min-h-screen flex flex-col bg-gray-100">
      <Toaster />
      {/* Header */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6 flex items-center">
          <div className="mr-6">
            {/* Emblem SVG */}
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
          <div>
            <h1 className="text-xl font-bold">Органы общественной безопастности Комаринской Народной Республики</h1>
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
