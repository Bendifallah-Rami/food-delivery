"use client"

import Image from "next/image"
import { useState } from "react"

export default function AppDownloadSection() {
  const [showComingSoon, setShowComingSoon] = useState(false)

  const handleDownloadClick = () => {
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 3000)
  }

  return (
    <div>
      {/* App Download Section */}
      <section className="relative py-8 sm:py-12 lg:py-16 bg-[#FFDDCC]/25 mt-6 lg:mt-10 overflow-hidden rounded-2xl lg:rounded-4xl mx-4 lg:mx-0">
        {/* Decorative elements - hidden on mobile */}
        <div className="absolute top-8 right-16 w-3 h-3 bg-red-400 rounded-full hidden sm:block"></div>
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-red-400 rounded-full hidden sm:block"></div>
        <div className="absolute top-32 right-32 text-xl lg:text-2xl hidden sm:block">😊</div>
        <div className="absolute bottom-32 right-8 text-xl lg:text-2xl hidden sm:block">😋</div>
        <div className="absolute top-16 left-1/4 text-lg lg:text-xl hidden sm:block">🔥</div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 rounded-2xl">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center">
            {/* Left side - Content */}
            <div className="space-y-4 lg:space-y-6 text-center lg:text-left">
              <p className="text-red-500 font-semibold text-xs sm:text-sm tracking-wider uppercase">Download App</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight">
                Get Started With Fudo Today!
              </h2>
              <p className="text-gray-600 text-base lg:text-lg leading-relaxed">
                Discover food wherever and whenever and get your food delivered quickly.
              </p>
              <div className="relative inline-block">
                <button
                  onClick={handleDownloadClick}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-colors text-sm sm:text-base"
                >
                  Get The App
                </button>
                {showComingSoon && (
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap z-10">
                    Coming Soon! 🚀
                  </div>
                )}
              </div>
            </div>

            {/* Right side - App Mockups */}
            <div className="flex justify-center mt-8 lg:mt-0">
              <div className="w-full max-w-sm lg:max-w-none">
                <Image src="/Frame 19 (1).png" alt="App Mockup" width={500} height={500} className="w-full h-auto" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
