"use client"

import Image from "next/image"

import { useState } from "react"

export default function TestimonialSection() {
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [email, setEmail] = useState("")

  const handleDownloadClick = () => {
    setShowComingSoon(true)
    setTimeout(() => setShowComingSoon(false), 3000)
  }

  return (
    <div>
   
      {/* App Download Section */}
      <section className="relative  py-16 bg-[#FFDDCC]/25  mt-10 overflow-hidden rounded-4xl">
        {/* Decorative elements */}
        <div className="absolute top-8 right-16 w-3 h-3 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-16 left-16 w-2 h-2 bg-red-400 rounded-full"></div>
        <div className="absolute top-32 right-32 text-2xl">😊</div>
        <div className="absolute bottom-32 right-8 text-2xl">😋</div>
        <div className="absolute top-16 left-1/4 text-xl">🔥</div>

        <div className="max-w-4xl mx-auto  rounded-2xl" >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left side - Content */}
            <div className="space-y-6">
              <p className="text-red-500 font-semibold text-sm tracking-wider uppercase">Download App</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                Get Started With Fudo Today!
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                Discover food wherever and whenever and get your food delivered quickly.
              </p>

              <div className="relative">
                <button
                  onClick={handleDownloadClick}
                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-4 rounded-full transition-colors"
                >
                  Get The App
                </button>

                {showComingSoon && (
                  <div className="absolute top-full mt-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm">
                    Coming Soon! 🚀
                  </div>
                )}
              </div>
            </div>

            {/* Right side - App Mockups */}
            <div className="flex justify-center">
              <Image
                src="/Frame 19 (1).png"
                alt="App Mockup"
                width={500}
                height={500}
                className="w-full "
              />
            </div>
          </div>
        </div>
      </section>
     
    </div>
  )
}
