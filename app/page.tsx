import Image from "next/image";
import Link from "next/link";

export default function Home() {
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
            {/* Emblem SVG */}
            <div className="w-24 h-24 relative">
              <Link href="/login">
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
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Министерство внутренних дел</h1>
            <h2 className="text-xl">Комаринской народной республики</h2>
            <p className="text-sm mt-2">Служим Сатане, Чертям, Аду!</p>
          </div>
          <div className="text-right">
            <p className="text-sm">111111, Комарин ул.</p>
            <p className="text-sm">Улица Аль-Комарина, 69</p>
            <p className="text-sm mt-2">Круглосуточный единый</p>
            <p className="text-sm">номер: 911</p>
          </div>
          <div className="ml-6">
            {/* Belarus Coat of Arms */}
            <div className="w-16 h-16 relative">
              <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="45" fill="#FFFFFF" stroke="#D22730" strokeWidth="2"/>
                <circle cx="50" cy="50" r="40" fill="#D22730"/>
                <path d="M50 15 L60 40 L85 40 L65 55 L75 80 L50 65 L25 80 L35 55 L15 40 L40 40 Z" fill="#FFFFFF"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6">
            <div className="relative group py-4">
              <button className="flex items-center text-gray-800 hover:text-blue-900 font-medium">
                <span>Территориальные подразделения</span>
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {/* Dropdown menu */}
              <div className="absolute left-0 mt-2 w-96 bg-white border border-gray-200 rounded shadow-lg z-10 hidden group-hover:block">
                <div className="p-4">
                  <div className="mb-4">
                    <h3 className="text-gray-600 mb-2">Карта КНР</h3>
                    <div className="relative h-64 bg-gray-200 rounded">
                      {/* Simple Belarus Map */}
                      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                        <path d="M100,100 L150,80 L200,70 L250,80 L300,100 L320,150 L310,200 L320,250 L300,300 L250,320 L200,330 L150,320 L100,300 L80,250 L90,200 L80,150 Z" 
                          fill="#EEEEEE" stroke="#CCCCCC" strokeWidth="2"/>
                        <circle cx="200" cy="200" r="10" fill="#666666"/>
                        <text x="200" y="230" textAnchor="middle" fill="#333333" fontSize="14">Комарин</text>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-blue-900 font-bold mb-4">МВД Комаринской народной республики</h3>
                  <ul className="space-y-3">
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">ГУВД Мингорисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Брестского облисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Витебского облисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Гомельского облисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Гродненского облисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Минского облисполкома</Link></li>
                    <li><Link href="#" className="text-gray-600 hover:text-blue-900">УВД Могилевского облисполкома</Link></li>
                  </ul>
                </div>
              </div>
            </div>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Новости</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">О министерстве</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Услуги</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Обращения</Link>
            <Link href="#" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Административные процедуры</Link>
            <Link href="/administration" className="py-4 text-gray-800 hover:text-blue-900 font-medium">Ваш черт лысый</Link>
            <div className="ml-auto flex items-center space-x-4">
              <button className="text-gray-800 hover:text-blue-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </button>
              <button className="text-gray-800 hover:text-blue-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                </svg>
              </button>
              <button className="text-gray-800 hover:text-blue-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100">
        <div className="container mx-auto px-4 py-6">
          {/* Video Player */}
          <div className="bg-white p-6 rounded shadow-sm">
            <h3 className="text-blue-900 font-bold mb-4">Видеоматериалы</h3>
            <div className="aspect-w-16 aspect-h-9">
              <video 
                className="w-full rounded" 
                controls
              >
                <source src="/videos/video.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
            </div>
            <div className="mt-4">
              <h4 className="font-bold text-gray-800">Обращение Министра внутренних дел</h4>
              <p className="text-gray-600 mt-2">
                Официальное обращение Министра внутренних дел Комаринской народной республики к гражданам.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
