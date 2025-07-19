"use client"

import { useState, useCallback, useRef } from "react"
import { useRouter } from "next/navigation"
import Head from "next/head"
import Sidebar from "../../../components/dashboard/sidebar"
import Toast from "../../../components/form_components/toast"
import FormField from "../../../components/form_components/form_field"
import DropdownField from "../../../components/form_components/dropdown_field"
import FormSection from "../../../components/form_components/form_section"
import { User, Phone, MapPin, CreditCard, Clock, Package, ShoppingCart, Save, ArrowLeft } from "lucide-react"

export default function OrderAddForm() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // Form state for order
  const [order, setOrder] = useState({
    orderNumber: `ORD-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`,
    customer: "",
    customerPhone: "",
    customerEmail: "",
    deliveryAddress: "",
    city: "",
    state: "",
    zipCode: "",
    paymentMethod: "Credit Card",
    status: "Pending",
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 5.00,
    totalAmount: 0,
    notes: "",
    estimatedDelivery: "",
    specialInstructions: "",
  })

  // Mock menu items for selection
  const [menuItems] = useState([
    { id: 1, name: "Classic Burger", price: 12.99, category: "Main Course" },
    { id: 2, name: "Margherita Pizza", price: 18.50, category: "Pizza" },
    { id: 3, name: "Caesar Salad", price: 9.99, category: "Salad" },
    { id: 4, name: "Chicken Wings", price: 14.99, category: "Appetizer" },
    { id: 5, name: "Pasta Carbonara", price: 16.99, category: "Pasta" },
    { id: 6, name: "Chocolate Cake", price: 6.99, category: "Dessert" },
    { id: 7, name: "Coca Cola", price: 2.99, category: "Beverage" },
    { id: 8, name: "French Fries", price: 4.99, category: "Side Dish" }
  ])

  // Order items state
  const [orderItems, setOrderItems] = useState([])

  // Form validation
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Available options for dropdowns
  const statusOptions = [
    "Pending",
    "Confirmed",
    "Preparing",
    "Ready",
    "Out for Delivery",
    "Delivered",
    "Cancelled"
  ]

  const paymentMethodOptions = [
    "Credit Card",
    "Debit Card",
    "PayPal",
    "Cash on Delivery",
    "Mobile Payment"
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
      setOrder((prev) => ({ ...prev, [field]: value }))
      // Clear error for this field when user starts typing
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: null }))
      }
    },
    [errors],
  )

  const handleAddItem = (menuItem) => {
    const existingItem = orderItems.find(item => item.id === menuItem.id)
    if (existingItem) {
      setOrderItems(prev => 
        prev.map(item => 
          item.id === menuItem.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setOrderItems(prev => [...prev, { ...menuItem, quantity: 1 }])
    }
    calculateTotal()
  }

  const handleRemoveItem = (itemId) => {
    setOrderItems(prev => prev.filter(item => item.id !== itemId))
    calculateTotal()
  }

  const handleQuantityChange = (itemId, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(itemId)
      return
    }
    setOrderItems(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, quantity: parseInt(quantity) }
          : item
      )
    )
    calculateTotal()
  }

  const calculateTotal = useCallback(() => {
    const subtotal = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
    const tax = subtotal * 0.08 // 8% tax
    const total = subtotal + tax + order.deliveryFee
    
    setOrder(prev => ({
      ...prev,
      subtotal,
      tax,
      totalAmount: total
    }))
  }, [orderItems, order.deliveryFee])

  const handleCancel = () => {
    router.push("/admin/orders/list")
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
    if (!order.customer.trim()) newErrors.customer = "Customer name is required"
    if (!order.customerPhone.trim()) newErrors.customerPhone = "Phone number is required"
    if (!order.deliveryAddress.trim()) newErrors.deliveryAddress = "Delivery address is required"
    if (!order.city.trim()) newErrors.city = "City is required"
    if (!order.state) newErrors.state = "State is required"
    if (!order.zipCode.trim()) newErrors.zipCode = "Zip code is required"
    if (orderItems.length === 0) newErrors.items = "At least one item is required"

    // Phone validation
    if (order.customerPhone && !/^[\+]?[1-9][\d]{0,15}$/.test(order.customerPhone.replace(/\s/g, ''))) {
      newErrors.customerPhone = "Please enter a valid phone number"
    }

    // Email validation (if provided)
    if (order.customerEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(order.customerEmail)) {
      newErrors.customerEmail = "Please enter a valid email address"
    }

    // Zip code validation
    if (order.zipCode && !/^\d{5}(-\d{4})?$/.test(order.zipCode)) {
      newErrors.zipCode = "Please enter a valid zip code"
    }

    return newErrors
  }, [order, orderItems])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formErrors = validateForm()
    setErrors(formErrors)

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true)

      try {
        // Simulate form submission
        const newOrderData = {
          ...order,
          items: orderItems,
          createdAt: new Date().toISOString(),
          id: Date.now() // Simulate ID generation
        }

        console.log("New order data:", newOrderData)

        // Simulate form submission delay
        await new Promise(resolve => setTimeout(resolve, 1500))

        // Show success message
        showToast("Order created successfully!", "success")

        // Navigate back to orders list after successful creation
        setTimeout(() => router.push("/admin/orders/list"), 2000)
      } catch (error) {
        console.error("Error creating order:", error)
        showToast(error.message || "Failed to create order", "error")
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
        <title>Add New Order - Fudo Admin</title>
        <meta name="description" content="Add new order to your restaurant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="orders" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Orders Management</span>
                <span className="mx-2 text-lg">›</span>
                <span>Add New Order</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Add New Order</h1>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Order Information */}
            <FormSection title="Order Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Order Number */}
                  <FormField
                    title="Order Number"
                    value={order.orderNumber}
                    onChange={(e) => handleInputChange("orderNumber", e.target.value)}
                    icon={<Package size={16} />}
                    comment="Auto-generated order number"
                    disabled={true}
                  />

                  {/* Status */}
                  <DropdownField
                    title="Status"
                    value={order.status}
                    onChange={(value) => handleInputChange("status", value)}
                    options={statusOptions}
                    required={false}
                  />

                  {/* Estimated Delivery */}
                  <FormField
                    title="Estimated Delivery Time"
                    placeholder="e.g., 30 mins"
                    value={order.estimatedDelivery}
                    onChange={(e) => handleInputChange("estimatedDelivery", e.target.value)}
                    icon={<Clock size={16} />}
                  />
                </div>
              </div>
            </FormSection>

            {/* Customer Information */}
            <FormSection title="Customer Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Customer Name */}
                  <FormField
                    title="Customer Name"
                    placeholder="e.g., John Doe"
                    value={order.customer}
                    onChange={(e) => handleInputChange("customer", e.target.value)}
                    error={errors.customer}
                    required={true}
                    icon={<User size={16} />}
                  />

                  {/* Customer Phone */}
                  <FormField
                    title="Phone Number"
                    placeholder="e.g., +1234567890"
                    value={order.customerPhone}
                    onChange={(e) => handleInputChange("customerPhone", e.target.value)}
                    type="tel"
                    icon={<Phone size={16} />}
                    error={errors.customerPhone}
                    required={true}
                  />

                  {/* Customer Email */}
                  <FormField
                    title="Email Address"
                    placeholder="e.g., john.doe@example.com"
                    value={order.customerEmail}
                    onChange={(e) => handleInputChange("customerEmail", e.target.value)}
                    type="email"
                    error={errors.customerEmail}
                  />
                </div>
              </div>
            </FormSection>

            {/* Delivery Information */}
            <FormSection title="Delivery Information">
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Delivery Address */}
                  <div className="md:col-span-2">
                    <FormField
                      title="Delivery Address"
                      placeholder="e.g., 123 Main Street"
                      value={order.deliveryAddress}
                      onChange={(e) => handleInputChange("deliveryAddress", e.target.value)}
                      icon={<MapPin size={16} />}
                      error={errors.deliveryAddress}
                      required={true}
                    />
                  </div>

                  {/* City */}
                  <FormField
                    title="City"
                    placeholder="e.g., New York"
                    value={order.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    error={errors.city}
                    required={true}
                  />

                  {/* State */}
                  <DropdownField
                    title="State"
                    value={order.state}
                    onChange={(value) => handleInputChange("state", value)}
                    options={stateOptions}
                    error={errors.state}
                    required={true}
                  />

                  {/* Zip Code */}
                  <FormField
                    title="Zip Code"
                    placeholder="e.g., 12345"
                    value={order.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    error={errors.zipCode}
                    required={true}
                  />

                  {/* Payment Method */}
                  <DropdownField
                    title="Payment Method"
                    value={order.paymentMethod}
                    onChange={(value) => handleInputChange("paymentMethod", value)}
                    options={paymentMethodOptions}
                    icon={<CreditCard size={16} />}
                    required={false}
                  />
                </div>
              </div>
            </FormSection>

            {/* Order Items */}
            <FormSection title="Order Items">
              <div className="p-6">
                {/* Menu Items Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-[#333333] mb-4 font-poppins">Add Items</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {menuItems.map((item) => (
                      <div key={item.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-[#333333] font-poppins">{item.name}</h4>
                          <span className="text-[#EB5757] font-bold font-poppins">${item.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3 font-poppins">{item.category}</p>
                        <button
                          type="button"
                          onClick={() => handleAddItem(item)}
                          className="w-full bg-[#EB5757] text-white py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins text-sm"
                        >
                          Add to Order
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Items */}
                {orderItems.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-[#333333] mb-4 font-poppins">Order Summary</h3>
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex-1">
                            <h4 className="font-medium text-[#333333] font-poppins">{item.name}</h4>
                            <p className="text-sm text-gray-600 font-poppins">${item.price} each</p>
                          </div>
                          <div className="flex items-center space-x-3">
                            <input
                              type="number"
                              min="1"
                              value={item.quantity}
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                              className="w-16 px-2 py-1 border border-gray-300 rounded text-center font-poppins"
                            />
                            <span className="font-bold text-[#333333] font-poppins w-16 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-red-500 hover:text-red-700 font-poppins"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Order Total */}
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg">
                      <div className="space-y-2">
                        <div className="flex justify-between font-poppins">
                          <span>Subtotal:</span>
                          <span>${order.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-poppins">
                          <span>Tax (8%):</span>
                          <span>${order.tax.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-poppins">
                          <span>Delivery Fee:</span>
                          <span>${order.deliveryFee.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between font-bold text-lg font-poppins">
                            <span>Total:</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {errors.items && (
                  <p className="text-red-500 text-sm mt-2 font-poppins">{errors.items}</p>
                )}
              </div>
            </FormSection>

            {/* Additional Information */}
            <FormSection title="Additional Information">
              <div className="p-6">
                <div className="grid grid-cols-1 gap-6">
                  {/* Special Instructions */}
                  <FormField
                    title="Special Instructions"
                    placeholder="Any special cooking instructions..."
                    value={order.specialInstructions}
                    onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    isTextarea={true}
                  />

                  {/* Notes */}
                  <FormField
                    title="Order Notes"
                    placeholder="Additional notes about the order..."
                    value={order.notes}
                    onChange={(e) => handleInputChange("notes", e.target.value)}
                    isTextarea={true}
                  />
                </div>
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
                    <span>Create Order</span>
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
