"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter, useParams } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../../components/dashboard/sidebar"
import Toast from "../../../../components/form_components/toast"
import FormField from "../../../../components/form_components/form_field"
import DropdownField from "../../../../components/form_components/dropdown_field"
import FormSection from "../../../../components/form_components/form_section"
import PhotoUpload from "../../../../components/form_components/photoupload_field"
import { User, Mail, Phone, MapPin, DollarSign, Calendar, Save, ArrowLeft } from "lucide-react"

export default function StaffEditForm() {
  const router = useRouter()
  const params = useParams()
  const staffId = params.id
  const fileInputRef = useRef(null)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state for staff - with default values for editing
  const [staff, setStaff] = useState({
    name: staffId === '1' ? "Alex Johnson" : staffId === '2' ? "Sarah Wilson" : staffId === '3' ? "Mike Davis" : "Emily Brown",
    email: staffId === '1' ? "alex.johnson@restaurant.com" : staffId === '2' ? "sarah.wilson@restaurant.com" : staffId === '3' ? "mike.davis@restaurant.com" : "emily.brown@restaurant.com",
    phone: staffId === '1' ? "+1234567890" : staffId === '2' ? "+1234567891" : staffId === '3' ? "+1234567892" : "+1234567893",
    address: staffId === '1' ? "123 Main St" : staffId === '2' ? "456 Oak Ave" : staffId === '3' ? "789 Pine Rd" : "321 Elm St",
    city: staffId === '1' ? "New York" : staffId === '2' ? "Los Angeles" : staffId === '3' ? "Chicago" : "Miami",
    state: staffId === '1' ? "New York" : staffId === '2' ? "California" : staffId === '3' ? "Illinois" : "Florida",
    zipCode: staffId === '1' ? "10001" : staffId === '2' ? "90210" : staffId === '3' ? "60601" : "33101",
    position: staffId === '1' ? "Chef" : staffId === '2' ? "Waitress" : staffId === '3' ? "Cashier" : "Sous Chef",
    department: staffId === '1' ? "Kitchen" : staffId === '2' ? "Service" : staffId === '3' ? "Front Desk" : "Kitchen",
    status: staffId === '1' ? "Active" : staffId === '2' ? "Active" : staffId === '3' ? "On Leave" : "Active",
    shift: staffId === '1' ? "Morning" : staffId === '2' ? "Evening" : staffId === '3' ? "Night" : "Morning",
    hireDate: staffId === '1' ? "2024-01-15" : staffId === '2' ? "2024-02-20" : staffId === '3' ? "2024-03-10" : "2024-01-20",
    salary: staffId === '1' ? "45000" : staffId === '2' ? "32000" : staffId === '3' ? "28000" : "38000",
    manager: staffId === '1' ? "Head Chef" : staffId === '2' ? "Service Manager" : staffId === '3' ? "Front Desk Manager" : "Head Chef",
    emergencyContact: staffId === '1' ? "Jane Johnson" : staffId === '2' ? "John Wilson" : staffId === '3' ? "Sarah Davis" : "Mark Brown",
    emergencyPhone: staffId === '1' ? "+1234567899" : staffId === '2' ? "+1234567898" : staffId === '3' ? "+1234567897" : "+1234567896",
    notes: staffId === '1' ? "Experienced chef with 5+ years" : staffId === '2' ? "Excellent customer service skills" : staffId === '3' ? "Currently on medical leave" : "Great team player",
    employeeId: `EMP00${staffId}`,
    socialSecurity: "***-**-****",
    dateOfBirth: staffId === '1' ? "1990-05-15" : staffId === '2' ? "1988-08-22" : staffId === '3' ? "1992-12-03" : "1987-03-18",
    gender: staffId === '1' ? "Male" : staffId === '2' ? "Female" : staffId === '3' ? "Male" : "Female",
  })

  // Photos state for PhotoUpload component
  const [photos, setPhotos] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const statusOptions = [
    "Active",
    "On Leave",
    "Terminated",
    "Probation"
  ]

  const positionOptions = [
    "Chef",
    "Sous Chef",
    "Line Cook",
    "Prep Cook",
    "Dishwasher",
    "Server",
    "Waitress",
    "Bartender",
    "Host/Hostess",
    "Cashier",
    "Manager",
    "Assistant Manager",
    "Delivery Driver",
    "Cleaner",
    "Other"
  ]

  const departmentOptions = [
    "Kitchen",
    "Service",
    "Front Desk",
    "Management",
    "Delivery",
    "Maintenance",
    "Administration"
  ]

  const shiftOptions = [
    "Morning",
    "Evening",
    "Night",
    "Weekend",
    "Full-time",
    "Part-time"
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
      setStaff((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleCancel = () => {
    router.push("/admin/staff/list")
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
    if (!staff.name.trim()) newErrors.name = "Name is required"
    if (!staff.email.trim()) newErrors.email = "Email is required"
    if (!staff.phone.trim()) newErrors.phone = "Phone is required"
    if (!staff.position) newErrors.position = "Position is required"
    if (!staff.department) newErrors.department = "Department is required"
    if (!staff.hireDate) newErrors.hireDate = "Hire date is required"
    if (!staff.salary.trim()) newErrors.salary = "Salary is required"
    if (!staff.employeeId.trim()) newErrors.employeeId = "Employee ID is required"

    // Email validation
    if (staff.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(staff.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    // Phone validation
    if (staff.phone && !/^[\+]?[1-9][\d]{0,15}$/.test(staff.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number"
    }

    // Salary validation
    if (staff.salary && (isNaN(staff.salary.replace(/[$,]/g, '')) || parseFloat(staff.salary.replace(/[$,]/g, '')) <= 0)) {
      newErrors.salary = "Salary must be a valid positive number"
    }

    return newErrors
  }, [staff])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Simulate form submission
        const updatedStaffData = {
          ...staff,
          photos: photos,
          updatedAt: new Date().toISOString(),
        }

        console.log("Updated staff data:", updatedStaffData)

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        showToast("Staff member updated successfully!", "success")

        // Navigate back to staff list after successful update
        setTimeout(() => router.push("/admin/staff/list"), 2000)
      } catch (error) {
        console.error("Error updating staff:", error)
        showToast(error.message || "Failed to update staff member", "error")
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
        <title>Edit Staff Member - Fudo Admin</title>
        <meta name="description" content="Edit staff member information" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="staff" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Staff Management</span>
                <span className="mx-2 text-lg">›</span>
                <span>Edit Staff #{staffId}</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Edit Staff Member #{staffId}</h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information */}
            <FormSection title="Personal Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <FormField
                    title="Full Name"
                    placeholder="e.g., John Doe"
                    value={staff.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required={true}
                    icon={<User size={16} />}
                  />

                  {/* Employee ID */}
                  <FormField
                    title="Employee ID"
                    placeholder="e.g., EMP001"
                    value={staff.employeeId}
                    onChange={(e) => handleInputChange("employeeId", e.target.value)}
                    error={errors.employeeId}
                    required={true}
                    comment="Unique employee identifier"
                  />

                  {/* Email */}
                  <FormField
                    title="Email Address"
                    placeholder="e.g., john.doe@restaurant.com"
                    value={staff.email}
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
                    value={staff.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    type="tel"
                    icon={<Phone size={16} />}
                    error={errors.phone}
                    required={true}
                  />

                  {/* Date of Birth */}
                  <FormField
                    title="Date of Birth"
                    value={staff.dateOfBirth}
                    onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                    type="date"
                    icon={<Calendar size={16} />}
                    error={errors.dateOfBirth}
                  />

                  {/* Gender */}
                  <DropdownField
                    title="Gender"
                    value={staff.gender}
                    onChange={(value) => handleInputChange("gender", value)}
                    options={genderOptions}
                    error={errors.gender}
                    required={false}
                  />

                  {/* Social Security */}
                  <FormField
                    title="Social Security Number"
                    placeholder="e.g., 123-45-6789"
                    value={staff.socialSecurity}
                    onChange={(e) => handleInputChange("socialSecurity", e.target.value)}
                    type="password"
                    comment="For payroll purposes only"
                  />
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
                      value={staff.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      icon={<MapPin size={16} />}
                      error={errors.address}
                    />
                  </div>

                  {/* City */}
                  <FormField
                    title="City"
                    placeholder="e.g., New York"
                    value={staff.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    error={errors.city}
                  />

                  {/* State */}
                  <DropdownField
                    title="State"
                    value={staff.state}
                    onChange={(value) => handleInputChange("state", value)}
                    options={stateOptions}
                    error={errors.state}
                  />

                  {/* Zip Code */}
                  <FormField
                    title="Zip Code"
                    placeholder="e.g., 12345"
                    value={staff.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    error={errors.zipCode}
                  />
                </div>
              </div>
            </FormSection>

            {/* Employment Information */}
            <FormSection title="Employment Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Position */}
                  <DropdownField
                    title="Position"
                    value={staff.position}
                    onChange={(value) => handleInputChange("position", value)}
                    options={positionOptions}
                    error={errors.position}
                    required={true}
                  />

                  {/* Department */}
                  <DropdownField
                    title="Department"
                    value={staff.department}
                    onChange={(value) => handleInputChange("department", value)}
                    options={departmentOptions}
                    error={errors.department}
                    required={true}
                  />

                  {/* Hire Date */}
                  <FormField
                    title="Hire Date"
                    value={staff.hireDate}
                    onChange={(e) => handleInputChange("hireDate", e.target.value)}
                    type="date"
                    icon={<Calendar size={16} />}
                    error={errors.hireDate}
                    required={true}
                  />

                  {/* Salary */}
                  <FormField
                    title="Salary"
                    placeholder="e.g., $45,000 or 45000"
                    value={staff.salary}
                    onChange={(e) => handleInputChange("salary", e.target.value)}
                    icon={<DollarSign size={16} />}
                    error={errors.salary}
                    required={true}
                  />

                  {/* Shift */}
                  <DropdownField
                    title="Shift"
                    value={staff.shift}
                    onChange={(value) => handleInputChange("shift", value)}
                    options={shiftOptions}
                    required={false}
                  />

                  {/* Status */}
                  <DropdownField
                    title="Status"
                    value={staff.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    required={false}
                  />

                  {/* Manager */}
                  <FormField
                    title="Manager"
                    placeholder="e.g., Head Chef"
                    value={staff.manager}
                    onChange={(e) => handleInputChange("manager", e.target.value)}
                    icon={<User size={16} />}
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
                    value={staff.emergencyContact}
                    onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    icon={<User size={16} />}
                  />

                  {/* Emergency Contact Phone */}
                  <FormField
                    title="Emergency Contact Phone"
                    placeholder="e.g., +1234567890"
                    value={staff.emergencyPhone}
                    onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                    type="tel"
                    icon={<Phone size={16} />}
                  />
                </div>

                {/* Notes */}
                <div className="mt-6">
                  <FormField
                    title="Notes"
                    placeholder="Additional notes about the staff member..."
                    value={staff.notes}
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
                  title="Staff Photo"
                  photos={photos}
                  setPhotos={setPhotos}
                  maxPhotos={1}
                  comment="Upload a staff photo. Recommended: 400x400px, max 2MB"
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
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Save size={16} />
                    <span>Update Staff Member</span>
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
