"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../components/dashboard/sidebar"
import Toast from "../../../components/form_components/toast"
import FormField from "../../../components/form_components/form_field"
import DropdownField from "../../../components/form_components/dropdown_field"
import FormSection from "../../../components/form_components/form_section"
import PhotoUpload from "../../../components/form_components/photoupload_field"
import PasswordField from "../../../components/form_components/password_field"
import { User, Mail, Phone, MapPin, UserCheck, Save, ArrowLeft } from "lucide-react"

export default function UserAddForm() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state for user
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    status: "Active",
    role: "Customer",
    dateOfBirth: "",
    gender: "",
    emergencyContact: "",
    emergencyPhone: "",
    notes: "",
  })

  // Photos state for PhotoUpload component
  const [photos, setPhotos] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const statusOptions = [
    "Active",
    "Inactive",
    "Suspended",
    "Pending"
  ]

  const roleOptions = [
    "Customer",
    "VIP Customer",
    "Corporate Client",
    "Delivery Partner"
  ]

  const genderOptions = [
    "Male",
    "Female",
    "Other",
    "Prefer not to say"
  ]

  const stateOptions = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", 
    "Connecticut", "Delaware", "Florida", "Georgia", "Hawaii", "Idaho", 
    "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", 
    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", 
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", 
    "New Hampshire", "New Jersey", "New Mexico", "New York", 
    "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", 
    "Pennsylvania", "Rhode Island", "South Carolina", "South Dakota", 
    "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington", 
    "West Virginia", "Wisconsin", "Wyoming"
  ]

  const handleInputChange = useCallback(
    (field, value) => {
      setUser((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleCancel = () => {
    router.push("/admin/user/list")
  }

  const showToast = useCallback((message, type = "success") => {
    setToast({
      visible: true,
      message,
      type,
    })
  }, [])

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }))
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = {}

    // Required fields
    if (!user.name.trim()) newErrors.name = "Name is required"
    if (!user.email.trim()) newErrors.email = "Email is required"
    if (!user.phone.trim()) newErrors.phone = "Phone is required"
    if (!user.password.trim()) newErrors.password = "Password is required"
    if (!user.confirmPassword.trim()) newErrors.confirmPassword = "Please confirm password"
    if (!user.address.trim()) newErrors.address = "Address is required"
    if (!user.city.trim()) newErrors.city = "City is required"
    if (!user.state) newErrors.state = "State is required"
    if (!user.zipCode.trim()) newErrors.zipCode = "Zip code is required"

    // Email validation
    if (user.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Password validation
    if (user.password && user.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long"
    }

    // Password confirmation
    if (user.password !== user.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    // Phone validation
    if (user.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(user.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Zip code validation
    if (user.zipCode && !/^\d{5}(-\d{4})?$/.test(user.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code"
    }

    return newErrors
  }, [user])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Simulate form submission
        const newUserData = {
          ...user,
          photos: photos,
          createdAt: new Date().toISOString(),
          id: Date.now() // Simulate ID generation
        }

        console.log("New user data:", newUserData)

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        showToast("User created successfully!", "success")

        // Navigate back to user list after successful creation
        setTimeout(() => router.push("/admin/user/list"), 2000)
      } catch (error) {
        console.error("Error creating user:", error)
        showToast(error.message || "Failed to create user", "error")
      } finally {
        setIsSubmitting(false)
      }
    } else {
      showToast("Please fill in all required fields correctly", "error")
    }
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      <Head>
        <title>Add New User - Fudo Admin</title>
        <meta name="description" content="Add new user to your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="users" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>User Management</span>
                <span className="mx-2 text-lg">›</span>
                <span>Add New User</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Add New User</h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <FormSection title="Basic Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <FormField
                    title="Full Name"
                    placeholder="e.g., John Doe"
                    value={user.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required={true}
                    icon={<User size={16} />}
                  />

                  {/* Email */}
                  <FormField
                    title="Email Address"
                    placeholder="e.g., john.doe@example.com"
                    value={user.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    type="email"
                    icon={<Mail size={16} />}
                    error={errors.email}
                    required={true}
                  />

                  {/* Phone */}
                  <FormField
                    title="Phone Number"
                    placeholder="e.g., +1234567890"
                    value={user.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    type="tel"
                    icon={<Phone size={16} />}
                    error={errors.phone}
                    required={true}
                  />

                  {/* Date of Birth */}
                  <FormField
                    title="Date of Birth"
                    value={user.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    type="date"
                    error={errors.dateOfBirth}
                  />

                  {/* Gender */}
                  <DropdownField
                    title="Gender"
                    value={user.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                    options={genderOptions}
                    error={errors.gender}
                    required={false}
                  />

                  {/* Role */}
                  <DropdownField
                    title="Role"
                    value={user.role}
                    onChange={(value) => handleInputChange("role", value)}
                    options={roleOptions}
                    error={errors.role}
                    required={false}
                  />

                  {/* Status */}
                  <DropdownField
                    title="Status"
                    value={user.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    required={false}
                  />
                </div>
              </div>
            </FormSection>

            {/* Login Credentials */}
            <FormSection title="Login Credentials">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Password */}
                  <PasswordField
                    title="Password"
                    placeholder="Enter password (min. 8 characters)"
                    value={user.password}
                    onChange={(e) => handleInputChange("password", e.target.value)}
                    error={errors.password}
                    required={true}
                  />

                  {/* Confirm Password */}
                  <PasswordField
                    title="Confirm Password"
                    placeholder="Confirm password"
                    value={user.confirmPassword}
                    onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                    error={errors.confirmPassword}
                    required={true}
                    showStrengthIndicator={false}
                  />
                </div>
                <div className="mt-3 text-sm text-gray-600">
                  These credentials will allow the user to log into the system. Make sure to provide a secure password.
                </div>
              </div>
            </FormSection>

            {/* Address Information */}
            <FormSection title="Address Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address */}
                  <div className="md:col-span-2">
                    <FormField
                      title="Street Address"
                      placeholder="e.g., 123 Main Street"
                      value={user.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      icon={<MapPin size={16} />}
                      error={errors.address}
                      required={true}
                    />
                  </div>

                  {/* City */}
                  <FormField
                    title="City"
                    placeholder="e.g., New York"
                    value={user.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    error={errors.city}
                    required={true}
                  />

                  {/* State */}
                  <DropdownField
                    title="State"
                    value={user.state}
                    onChange={(value) => handleInputChange("state", value)}
                    options={stateOptions}
                    error={errors.state}
                    required={true}
                  />

                  {/* Zip Code */}
                  <FormField
                    title="Zip Code"
                    placeholder="e.g., 12345"
                    value={user.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    error={errors.zipCode}
                    required={true}
                  />
                </div>
              </div>
            </FormSection>

            {/* Emergency Contact */}
            <FormSection title="Emergency Contact">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Emergency Contact Name */}
                  <FormField
                    title="Emergency Contact Name"
                    placeholder="e.g., Jane Doe"
                    value={user.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    icon={<User size={16} />}
                  />

                  {/* Emergency Contact Phone */}
                  <FormField
                    title="Emergency Contact Phone"
                    placeholder="e.g., +1234567890"
                    value={user.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    type="tel"
                    icon={<Phone size={16} />}
                  />
                </div>

                {/* Notes */}
                <div className="mt-6">
                  <FormField
                    title="Notes"
                    placeholder="Additional notes about the user..."
                    value={user.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    isTextarea={true}
                  />
                </div>
              </div>
            </FormSection>

            {/* Profile Photo */}
            <FormSection title="Profile Photo">
              <div className="p-6">
                <PhotoUpload
                  title="Profile Photo"
                  photos={photos}
                  setPhotos={setPhotos}
                  maxPhotos={1}
                  comment="Upload a profile photo. Recommended: 400x400px, max 2MB"
                />
              </div>
            </FormSection>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 text-[#333333] bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors font-poppins"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-6 py-2 bg-[#EB5757] text-white rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2 ${
                  isSubmitting ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Create User</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
