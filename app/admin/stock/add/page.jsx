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
import { UtensilsCrossed, DollarSign, Package, Upload, AlertCircle } from "lucide-react"

// Main Component
export default function MenuItemAddForm() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state for menu item
  const [menuItem, setMenuItem] = useState({
    itemCode: "",
    name: "",
    category: "",
    price: "",
    description: "",
    ingredients: "",
    allergies: "",
    stock: "",
    status: "Available",
    preparationTime: "",
    calories: "",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  })

  // Photos state for PhotoUpload component
  const [photos, setPhotos] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const categoryOptions = [
    "Main Course",
    "Appetizer", 
    "Pizza",
    "Burger",
    "Pasta",
    "Salad",
    "Dessert",
    "Beverage",
    "Side Dish",
    "Soup",
    "Sandwich",
    "Seafood",
    "Vegetarian",
    "Vegan",
    "Snack",
    "Other"
  ]

  const statusOptions = [
    "Available",
    "Low Stock", 
    "Out of Stock",
    "Discontinued"
  ]

  const handleInputChange = useCallback(
    (field, value) => {
      setMenuItem((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleCheckboxChange = (field) => {
    setMenuItem((prev) => ({
      ...prev,
      [field]: !prev[field]
    }))
  }

  const handleCancel = () => {
    router.back()
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
    if (!menuItem.itemCode.trim()) newErrors.itemCode = "Item code is required"
    if (!menuItem.name.trim()) newErrors.name = "Item name is required"
    if (!menuItem.category) newErrors.category = "Category is required"
    if (!menuItem.price.trim()) newErrors.price = "Price is required"
    if (!menuItem.description.trim()) newErrors.description = "Description is required"
    if (!menuItem.stock.trim()) newErrors.stock = "Stock quantity is required"

    // Validate price format
    if (menuItem.price && (isNaN(menuItem.price) || parseFloat(menuItem.price) <= 0)) {
      newErrors.price = "Price must be a valid positive number"
    }

    // Validate stock quantity
    if (menuItem.stock && (isNaN(menuItem.stock) || parseInt(menuItem.stock) < 0)) {
      newErrors.stock = "Stock must be a valid non-negative number"
    }

    // Validate preparation time if provided
    if (menuItem.preparationTime && (isNaN(menuItem.preparationTime) || parseInt(menuItem.preparationTime) <= 0)) {
      newErrors.preparationTime = "Preparation time must be a valid positive number"
    }

    // Validate calories if provided
    if (menuItem.calories && (isNaN(menuItem.calories) || parseInt(menuItem.calories) <= 0)) {
      newErrors.calories = "Calories must be a valid positive number"
    }

    return newErrors
  }, [menuItem])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Simulate API call - In a real app, you would send this to your backend
        const menuItemData = {
          id: Date.now(), // Temporary ID generation
          itemCode: menuItem.itemCode,
          name: menuItem.name,
          category: menuItem.category,
          price: `$${parseFloat(menuItem.price).toFixed(2)}`,
          description: menuItem.description,
          ingredients: menuItem.ingredients,
          allergies: menuItem.allergies,
          stock: parseInt(menuItem.stock),
          status: menuItem.status,
          preparationTime: menuItem.preparationTime ? parseInt(menuItem.preparationTime) : null,
          calories: menuItem.calories ? parseInt(menuItem.calories) : null,
          isVegetarian: menuItem.isVegetarian,
          isVegan: menuItem.isVegan,
          isGlutenFree: menuItem.isGlutenFree,
          photos: photos,
          createdAt: new Date().toISOString(),
        }

        console.log("Menu item data:", menuItemData)

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        showToast("Menu item added successfully!", "success")

        // Reset form
        setMenuItem({
          itemCode: "",
          name: "",
          category: "",
          price: "",
          description: "",
          ingredients: "",
          allergies: "",
          stock: "",
          status: "Available",
          preparationTime: "",
          calories: "",
          isVegetarian: false,
          isVegan: false,
          isGlutenFree: false,
        })
        setPhotos([])

        // Navigate back to menu list after successful creation
        setTimeout(() => router.push("/admin/stock/list"), 2000)
      } catch (error) {
        console.error("Error adding menu item:", error)
        showToast(error.message || "Failed to add menu item", "error")
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
        <title>Add Menu Item - Fudo Admin</title>
        <meta name="description" content="Add new menu item to your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="menu" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Menu Management</span>
                <span className="mx-2 text-lg">›</span>
                <span>Add New Item</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Add Menu Item</h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <FormSection title="Basic Information">
              <div className=" p-6 " >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Item Code */}
                  <FormField
                    title="Item Code"
                    placeholder="e.g., FOOD001"
                    value={menuItem.itemCode}
                    onChange={(e) => handleInputChange("itemCode", e.target.value)}
                    error={errors.itemCode}
                    required={true}
                    comment="Unique identifier for the menu item"
                  />

                  {/* Item Name */}
                  <FormField
                    title="Item Name"
                    placeholder="e.g., Classic Burger"
                    value={menuItem.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    error={errors.name}
                    required={true}
                  />

                  {/* Category */}
                  <DropdownField
                    title="Category"
                    value={menuItem.category}
                    onChange={(value) => handleInputChange("category", value)}
                    options={categoryOptions}
                    error={errors.category}
                    required={true}
                  />

                  {/* Price */}
                  <FormField
                    title="Price ($)"
                    placeholder="12.99"
                    value={menuItem.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    type="number"
                    icon={<DollarSign size={16} />}
                    error={errors.price}
                    required={true}
                  />

                  {/* Stock */}
                  <FormField
                    title="Stock Quantity"
                    placeholder="25"
                    value={menuItem.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    type="number"
                    icon={<Package size={16} />}
                    error={errors.stock}
                    required={true}
                  />

                  {/* Status */}
                  <DropdownField
                    title="Status"
                    value={menuItem.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    required={false}
                  />
                </div>

                {/* Description */}
                <div className="mt-6">
                  <FormField
                    title="Description"
                    placeholder="Describe the menu item..."
                    value={menuItem.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    isTextarea={true}
                    error={errors.description}
                    required={true}
                  />
                </div>
              </div>
            </FormSection>

            {/* Additional Details */}
            <FormSection title="Additional Details">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Ingredients */}
                  <FormField
                    title="Ingredients"
                    placeholder="List the main ingredients..."
                    value={menuItem.ingredients}
                    onChange={(e) => handleInputChange("ingredients", e.target.value)}
                    isTextarea={true}
                  />

                  {/* Allergies */}
                  <FormField
                    title="Allergies & Warnings"
                    placeholder="List any allergens or dietary warnings..."
                    value={menuItem.allergies}
                    onChange={(e) => handleInputChange("allergies", e.target.value)}
                    isTextarea={true}
                  />

                  {/* Preparation Time */}
                  <FormField
                    title="Preparation Time (minutes)"
                    placeholder="15"
                    value={menuItem.preparationTime}
                    onChange={(e) => handleInputChange("preparationTime", e.target.value)}
                    type="number"
                    error={errors.preparationTime}
                  />

                  {/* Calories */}
                  <FormField
                    title="Calories"
                    placeholder="520"
                    value={menuItem.calories}
                    onChange={(e) => handleInputChange("calories", e.target.value)}
                    type="number"
                    error={errors.calories}
                  />
                </div>

                {/* Dietary Options */}
                <div className="mt-6">
                  <label className="block text-sm font-medium text-[#333333] font-poppins mb-4">
                    Dietary Options
                  </label>
                  <div className="flex flex-wrap gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={menuItem.isVegetarian}
                        onChange={() => handleCheckboxChange("isVegetarian")}
                        className="w-4 h-4 text-[#EB5757] border-gray-300 rounded focus:ring-[#EB5757]"
                      />
                      <span className="text-sm font-poppins">Vegetarian</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={menuItem.isVegan}
                        onChange={() => handleCheckboxChange("isVegan")}
                        className="w-4 h-4 text-[#EB5757] border-gray-300 rounded focus:ring-[#EB5757]"
                      />
                      <span className="text-sm font-poppins">Vegan</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={menuItem.isGlutenFree}
                        onChange={() => handleCheckboxChange("isGlutenFree")}
                        className="w-4 h-4 text-[#EB5757] border-gray-300 rounded focus:ring-[#EB5757]"
                      />
                      <span className="text-sm font-poppins">Gluten-Free</span>
                    </label>
                  </div>
                </div>
              </div>
            </FormSection>

            {/* Image Upload */}
            <FormSection title="Menu Item Images">
              <div className="p-6">
                <PhotoUpload
                  title="Menu Item Photos"
                  photos={photos}
                  setPhotos={setPhotos}
                  maxPhotos={3}
                  comment="Upload high-quality images of the menu item. Recommended: 500x500px, max 5MB per image"
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
                    <span>Adding...</span>
                  </>
                ) : (
                  <>
                    <UtensilsCrossed size={16} />
                    <span>Add Menu Item</span>
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
