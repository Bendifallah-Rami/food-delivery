export default function WhatWeServe() {
  return (
    <section className="relative bg-white py-16 lg:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-red-50 text-red-500 px-6 py-2 rounded-full text-sm font-semibold tracking-wider uppercase mb-4">
            What We Serve
          </div>
          <h2 className="text-3xl lg:text-5xl font-bold text-[#333333] leading-tight">
            Your Favorite Food
            <br />
            Delivery Partner
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Easy To Order */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Placeholder for Easy To Order Image */}
              <div className="w-64 h-64 mx-auto  rounded-2xl flex items-center justify-center">
                <img
                  src="/5739256 1.svg"
                  alt="Easy To Order - Woman ordering food on mobile app"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-4">Easy To Order</h3>
            <p className="text-[#333333] text-lg leading-relaxed max-w-xs mx-auto">
              You only need a few steps in ordering food
            </p>
          </div>

          {/* Fastest Delivery */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Placeholder for Fastest Delivery Image */}
              <div className="w-64 h-64 mx-auto  rounded-2xl flex items-center justify-center">
                <img
                  src="/Take Away-rafiki 1.svg"
                  alt="Fastest Delivery - Delivery person on scooter"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-4">Fastest Delivery</h3>
            <p className="text-[#333333] text-lg leading-relaxed max-w-xs mx-auto">
              Delivery that is always ontime even faster
            </p>
          </div>

          {/* Best Quality */}
          <div className="text-center">
            <div className="relative mb-8">
              {/* Placeholder for Best Quality Image */}
              <div className="w-64 h-64 mx-auto  rounded-2xl flex items-center justify-center">
                <img
                  src="/Waiters-rafiki 1.svg"
                  alt="Best Quality - Chef and customer with quality food"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-4">Best Quality</h3>
            <p className="text-[#333333] text-lg leading-relaxed max-w-xs mx-auto">
              Not only fast for us quality is also number one
            </p>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-8 w-3 h-3 bg-red-400 rounded-full"></div>
      <div className="absolute top-32 right-12 w-4 h-4 bg-yellow-400 rounded-full"></div>
      <div className="absolute bottom-20 left-1/4 w-2 h-2 bg-red-400 rounded-full"></div>
      <div className="absolute bottom-32 right-8 w-3 h-3 bg-red-400 rounded-full"></div>
    </section>
  )
}
