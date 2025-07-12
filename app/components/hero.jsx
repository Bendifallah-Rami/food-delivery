"use client"

import { Play, Clock, Star, ArrowRight } from "lucide-react"
import Image from "next/image"


export default function Hero() {
  return (
    <section className=" overflow-hidden font-poppins">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex flex-col lg:flex-row items-center justify-between min-h-[600px] py-12 lg:py-5">
          {/* Left Content */}
          <div className="flex-1 lg:pr-12 z-10 ">
            {/* More than Faster Badge */}
            <div className="inline-flex items-center bg-[#FEE9DE] text-[#EB5757] px-5 py-3 rounded-full text-sm font-medium mb-5">
              <span>More than Faster</span>
              <ArrowRight className="w-4 h-4 ml-2" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-7xl font-bold text-[#333333] leading-tight mb-6">
              Be The Fastest
            
              <br />In Delivering
              Your <span className="text-[#EB5757]">Food</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-[#333333] font-medium mb-8 max-w-md">
              Our job is to filling your tummy with delicious food and with fast and free delivery
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
              <button className="bg-[#EB5757] hover:bg-red-600 text-white px-8 py-4 rounded-full font-semibold transition-colors">
                Get Started
              </button>
              <button className="flex items-center text-gray-700 hover:text-gray-900 font-medium py-1 rounded-full transition-colors">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mr-3">
                  <Play className="w-5 h-5 text-red-500 ml-1" />
                </div>
                Watch Video
              </button>
            </div>

            {/* Customer Reviews */}
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full border-2 border-white"></div>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Our Happy Customer</p>
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600 ml-1">4.8 (12.5k Review)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image with Floating Elements */}
          <div >
                <Image 
                    src="/6990621_3489262.svg"
                    alt="Food Delivery Hero Image"
                    width={600}
                    height={500}
                    className="max-w-full"
                />
            </div>
          </div>
        </div>
     

    </section>
  )
}
