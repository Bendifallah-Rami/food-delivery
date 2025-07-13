import Image from "next/image"
import { Star } from "lucide-react"

export default function TestimonialSection() {
  return (
    <section className="relative py-4 px-4 overflow-hidden">
     
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Chef Image */}
            <div className="flex justify-center mb-8 lg:mb-0">
                <Image
                src="/Group 55.png"
                alt="Chef preparing food"
                width={400}
                height={400}
                className="w-full max-w-md  rounded-lg"
                />
            </div>
          {/* Right side - Testimonial Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <p className="text-[#EB5757]] font-semibold text-sm tracking-wider uppercase">What They Say</p>
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                What Our Customers Say About Us
              </h2>
            </div>

            <blockquote className="text-gray-600 text-lg leading-relaxed">
              "Fudo is the best. Besides the many and delicious meals, the service is also very good, especially in the
              very fast delivery. I highly recommend Fudo to you".
            </blockquote>

            {/* Customer Profile */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-semibold text-lg">T</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Theresa Jordan</h4>
                <p className="text-gray-500 text-sm">Food Enthusiast</p>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[1, 2, 3, 4].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <Star className="w-5 h-5 text-gray-300" />
              </div>
              <span className="font-semibold text-gray-900 ml-2">4.8</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
