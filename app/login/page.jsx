"use client"

import { useState } from "react"
import { Eye, EyeOff, Phone, Mail, Lock, ShoppingBag, Truck, DollarSign, Clock, Pizza, Coffee } from "lucide-react"
import Link from "next/link"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Login attempt:", formData)
  }

  const handleGoogleLogin = () => {
    console.log("Google login clicked")
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const getInputIcon = () => {
    if (formData.emailOrPhone.includes("@")) {
      return <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    } else if (formData.emailOrPhone.match(/^\+?[\d\s\-$$$$]+$/)) {
      return <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    }
    return <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row relative overflow-hidden">
      {/* Food-related floating elements - hidden on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
        <div className="absolute top-16 left-12 opacity-10 animate-pulse">
          <Truck className="w-8 h-8 lg:w-16 lg:h-16 text-[#EB5757]" />
        </div>
        <div className="absolute top-32 right-20 opacity-15 animate-bounce">
          <ShoppingBag className="w-6 h-6 lg:w-12 lg:h-12 text-[#EB5757]" />
        </div>
        <div className="absolute bottom-32 left-16 opacity-10 animate-pulse">
          <DollarSign className="w-8 h-8 lg:w-14 lg:h-14 text-[#EB5757]" />
        </div>
        <div className="absolute bottom-20 right-16 opacity-15 animate-bounce">
          <Clock className="w-6 h-6 lg:w-10 lg:h-10 text-[#EB5757]" />
        </div>
        <div className="absolute top-1/2 left-8 opacity-10 animate-pulse">
          <Pizza className="w-6 h-6 lg:w-12 lg:h-12 text-[#EB5757]" />
        </div>
        <div className="absolute top-1/3 right-8 opacity-15 animate-bounce">
          <Coffee className="w-6 h-6 lg:w-10 lg:h-10 text-[#EB5757]" />
        </div>
      </div>

      {/* Left side - Logo and branding */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 sm:px-8 py-8 lg:py-0 relative z-10">
        <div className="text-center max-w-md w-full">
          <div className="flex items-center justify-center space-x-3 mb-4 lg:mb-6">
            <div className="w-12 h-12 lg:w-16 lg:h-16 bg-[#EB5757] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg lg:text-2xl">FD</span>
            </div>
            <span className="text-2xl lg:text-4xl font-bold text-gray-900">Fudo</span>
          </div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3 lg:mb-4">Welcome Back</h1>
          <p className="text-gray-600 text-base lg:text-lg leading-relaxed mb-4 lg:mb-0">
            Sign in to your account and continue enjoying delicious meals delivered right to your door.
          </p>
          <div className="mt-4 lg:mt-6 flex items-center justify-center space-x-4 lg:space-x-8 text-xs lg:text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-3 h-3 lg:w-4 lg:h-4 mr-1" />
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-8 pb-8 lg:py-0 relative z-10">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
            <div className="text-center mb-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-1">Sign In</h2>
              <p className="text-gray-600 text-sm lg:text-base">Welcome back! Please sign in to your account</p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 group mb-3"
            >
              <svg
                className="w-4 h-4 lg:w-5 lg:h-5 mr-3 group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm lg:text-base">Continue with Google</span>
            </button>

            {/* Divider */}
            <div className="relative mb-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-1">
                    Email or Phone Number
                  </label>
                  <div className="relative">
                    {getInputIcon()}
                    <input
                      id="emailOrPhone"
                      name="emailOrPhone"
                      type="text"
                      required
                      value={formData.emailOrPhone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm lg:text-base"
                      placeholder="Enter your email or phone number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors text-sm lg:text-base"
                      placeholder="Enter your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 space-y-2 sm:space-y-0">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-[#EB5757] focus:ring-red-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm text-[#EB5757] hover:text-red-600 text-left sm:text-right">
                  Forgot password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#EB5757] hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors mt-6"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <p className="text-gray-600 text-sm lg:text-base">
                  Don't have an account?{" "}
                  <Link href="/signup" className="text-[#EB5757] hover:text-red-600 font-medium">
                    Sign up
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
