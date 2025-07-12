"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Phone,
  User,
  Mail,
  Lock,
  ShoppingBag,
  Truck,
  DollarSign,
  Clock,
  Pizza,
  Coffee,
} from "lucide-react"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle signup logic here - integrate with your authentication system
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match")
      return
    }
    console.log("Signup attempt:", formData)
  }

  const handleGoogleSignup = () => {
    // Handle Google signup logic here
    console.log("Google signup clicked")
    // You can integrate with Google OAuth here
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen flex relative overflow-hidden bg-gray-50">
      {/* Food-related floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Delivery truck */}
        <div className="absolute top-16 left-12 opacity-10 animate-pulse">
          <Truck className="w-16 h-16 text-[#EB5757]" />
        </div>
        {/* Shopping bag */}
        <div className="absolute top-32 right-20 opacity-15 animate-bounce">
          <ShoppingBag className="w-12 h-12 text-[#EB5757]" />
        </div>
        {/* Dollar sign */}
        <div className="absolute bottom-32 left-16 opacity-10 animate-pulse">
          <DollarSign className="w-14 h-14 text-[#EB5757]" />
        </div>
        {/* Clock */}
        <div className="absolute bottom-20 right-16 opacity-15 animate-bounce">
          <Clock className="w-10 h-10 text-[#EB5757]" />
        </div>
        {/* Pizza */}
        <div className="absolute top-1/2 left-8 opacity-10 animate-pulse">
          <Pizza className="w-12 h-12 text-[#EB5757]" />
        </div>
        {/* Coffee */}
        <div className="absolute top-1/3 right-8 opacity-15 animate-bounce">
          <Coffee className="w-10 h-10 text-[#EB5757]" />
        </div>
      </div>
      {/* Left side - Logo and branding */}
      <div className="flex-1 flex flex-col justify-center items-center px-8 relative z-10">
        <div className="text-center max-w-md">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-16 h-16 bg-[#EB5757] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">FD</span>
            </div>
            <span className="text-4xl font-bold text-gray-900">Fudo</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to Fudo</h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Your favorite food delivery service. Fast, reliable, and delicious meals delivered right to your door.
          </p>
          <div className="mt-6 flex items-center justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="w-4 h-4 mr-1" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              <span>Best Prices</span>
            </div>
          </div>
        </div>
      </div>
      {/* Right side - Signup form */}
      <div className="flex-1 flex items-center justify-center px-8 relative z-10">
        <div className="max-w-md w-full">
          {" "}
          {/* Changed max-w-sm back to max-w-md for slightly more width */}
          <div className=" rounded-2xl  p-6 bg-white shadow-lg ">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h2>
              <p className="text-gray-600">Join us and start ordering</p>
            </div>
            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 font-medium hover:bg-gray-50 hover:shadow-md transition-all duration-200 group mb-3"
            >
              <svg className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
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
              Continue with Google
            </button>
            {/* Divider */}
            <div className="relative mb-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with email</span>
              </div>
            </div>
            {/* Signup Form */}
            <form onSubmit={handleSubmit}>
              <div className="space-y-2">
                {" "}
                {/* Changed space-y-3 to space-y-2 for even less vertical space */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-0.5">
                      First Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                        placeholder="First name"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-0.5">
                      Last Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-3 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-0.5">
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
                      className="w-full pl-10 pr-10 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                      placeholder="Create a password"
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
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-0.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      required
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-10 py-1.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors" /* Changed py-2 to py-1.5 */
                      placeholder="Confirm your password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center mt-2">
                {" "}
                {/* Changed mt-3 to mt-2 */}
                <input
                  id="terms"
                  name="terms"
                  type="checkbox"
                  required
                  className="h-4 w-4 text-[#EB5757] focus:ring-red-500 border-gray-300 rounded"
                />
                <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                  I agree to the{" "}
                  <Link href="/terms" className="text-[#EB5757] hover:text-red-600">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-[#EB5757] hover:text-red-600">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-[#EB5757] hover:bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors mt-3" /* Changed py-3 to py-2.5, mt-4 to mt-3 */
              >
                Create Account
              </button>
              <div className="text-center mt-2">
                {" "}
                {/* Changed mt-3 to mt-2 */}
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-[#EB5757] hover:text-red-600 font-medium">
                    Sign in
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
