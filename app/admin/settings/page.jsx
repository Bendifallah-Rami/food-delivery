"use client"

import { useState, useCallback, useEffect } from "react"
import { useRouter } from "next/navigation"
import Sidebar from "../../components/dashboard/sidebar"
import Toast from "../../components/form_components/toast"
import FormField from "../../components/form_components/form_field"
import DropdownField from "../../components/form_components/dropdown_field"
import FormSection from "../../components/form_components/form_section"
import PhotoUpload from "../../components/form_components/photoupload_field"
import { 
  User, 
  Settings as SettingsIcon, 
  Shield, 
  Bell, 
  Palette,
  Globe,
  Database,
  CreditCard,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Save,
  RefreshCw,
  Download,
  Upload,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun
} from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const [isMounted, setIsMounted] = useState(false)

  // State for toast notifications
  const [toast, setToast] = useState({
    visible: false,
    message: "",
    type: "success",
  })

  // State for active tab
  const [activeTab, setActiveTab] = useState("profile")

  // State for showing passwords
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  })

  // Profile settings state
  const [profileData, setProfileData] = useState({
    firstName: "John",
    lastName: "Admin",
    email: "admin@fudo.com",
    phone: "+1 (555) 123-4567",
    role: "Super Admin",
    profilePhoto: null,
    bio: "Restaurant management system administrator"
  })

  // Security settings state
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorEnabled: true,
    loginNotifications: true,
    sessionTimeout: "30"
  })

  // System settings state
  const [systemData, setSystemData] = useState({
    restaurantName: "Fudo Restaurant",
    timezone: "America/New_York",
    currency: "USD",
    language: "English",
    dateFormat: "MM/DD/YYYY",
    theme: "light",
    autoBackup: true,
    backupFrequency: "daily"
  })

  // Notification settings state
  const [notificationData, setNotificationData] = useState({
    emailNotifications: true,
    orderAlerts: true,
    lowStockAlerts: true,
    customerSignups: false,
    dailyReports: true,
    securityAlerts: true,
    marketingEmails: false
  })

  // Payment settings state
  const [paymentData, setPaymentData] = useState({
    stripeEnabled: true,
    paypalEnabled: false,
    cashOnDelivery: true,
    taxRate: "8.5",
    serviceFee: "2.5",
    deliveryFee: "3.99"
  })

  const tabs = [
    { id: "profile", label: "Profile", icon: <User size={18} /> },
    { id: "security", label: "Security", icon: <Shield size={18} /> },
    { id: "system", label: "System", icon: <SettingsIcon size={18} /> },
    { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
    { id: "payments", label: "Payments", icon: <CreditCard size={18} /> },
    { id: "backup", label: "Backup & Data", icon: <Database size={18} /> }
  ]

  useEffect(() => {
    setIsMounted(true)
  }, [])

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

  const handleProfileSave = () => {
    // Save profile data logic here
    showToast("Profile updated successfully!", "success")
  }

  const handleSecuritySave = () => {
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast("Passwords do not match!", "error")
      return
    }
    // Save security data logic here
    showToast("Security settings updated successfully!", "success")
  }

  const handleSystemSave = () => {
    // Save system data logic here
    showToast("System settings updated successfully!", "success")
  }

  const handleNotificationSave = () => {
    // Save notification data logic here
    showToast("Notification preferences updated successfully!", "success")
  }

  const handlePaymentSave = () => {
    // Save payment data logic here
    showToast("Payment settings updated successfully!", "success")
  }

  const handleBackupNow = () => {
    showToast("Backup started successfully!", "success")
  }

  const handleExportData = () => {
    showToast("Data export started successfully!", "success")
  }

  const handleImportData = () => {
    showToast("Data import completed successfully!", "success")
  }

  if (!isMounted) {
    return (
      <div className="flex min-h-screen bg-white overflow-hidden">
        <Sidebar activeItem="settings" />
        <div className="flex-1 overflow-auto">
          <div className="p-4 md:p-8 lg:p-12">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
              <div className="h-64 bg-gray-200 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-white overflow-hidden">
      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} visible={toast.visible} onClose={hideToast} />

      {/* Sidebar */}
      <Sidebar activeItem="settings" />

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-8 lg:p-12">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col items-start gap-6 text-[#333333]">
              <div className="text-sm flex items-center font-poppins">
                <span>Admin</span>
                <span className="mx-2 text-lg">›</span>
                <span>Settings</span>
              </div>
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl lg:text-3xl font-bold font-poppins">Settings</h1>
              </div>
            </div>
          </div>

          {/* Settings Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-3 px-1 border-b-2 font-medium text-sm font-poppins transition-colors flex items-center space-x-2 ${
                      activeTab === tab.id
                        ? "border-[#EB5757] text-[#EB5757]"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Profile Settings */}
          {activeTab === "profile" && (
            <div className="space-y-6">
              <FormSection title="Profile Information">
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                      <PhotoUpload
                        title="Profile Photo"
                        value={profileData.profilePhoto}
                        onChange={(photo) => setProfileData(prev => ({ ...prev, profilePhoto: photo }))}
                      />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          title="First Name"
                          value={profileData.firstName}
                          onChange={(value) => setProfileData(prev => ({ ...prev, firstName: value }))}
                          placeholder="Enter first name"
                        />
                        <FormField
                          title="Last Name"
                          value={profileData.lastName}
                          onChange={(value) => setProfileData(prev => ({ ...prev, lastName: value }))}
                          placeholder="Enter last name"
                        />
                      </div>
                      <FormField
                        title="Email Address"
                        value={profileData.email}
                        onChange={(value) => setProfileData(prev => ({ ...prev, email: value }))}
                        placeholder="Enter email address"
                        type="email"
                      />
                      <FormField
                        title="Phone Number"
                        value={profileData.phone}
                        onChange={(value) => setProfileData(prev => ({ ...prev, phone: value }))}
                        placeholder="Enter phone number"
                      />
                      <FormField
                        title="Role"
                        value={profileData.role}
                        onChange={(value) => setProfileData(prev => ({ ...prev, role: value }))}
                        placeholder="Enter role"
                        disabled
                      />
                      <FormField
                        title="Bio"
                        value={profileData.bio}
                        onChange={(value) => setProfileData(prev => ({ ...prev, bio: value }))}
                        placeholder="Enter bio"
                        multiline
                        rows={3}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleProfileSave}
                      className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save Changes</span>
                    </button>
                  </div>
                </div>
              </FormSection>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <FormSection title="Change Password">
                <div className="p-6">
                  <div className="space-y-6 max-w-md">
                    <div className="relative">
                      <FormField
                        title="Current Password"
                        value={securityData.currentPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, currentPassword: value }))}
                        placeholder="Enter current password"
                        type={showPassword.current ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.current ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="relative">
                      <FormField
                        title="New Password"
                        value={securityData.newPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, newPassword: value }))}
                        placeholder="Enter new password"
                        type={showPassword.new ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.new ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    <div className="relative">
                      <FormField
                        title="Confirm New Password"
                        value={securityData.confirmPassword}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, confirmPassword: value }))}
                        placeholder="Confirm new password"
                        type={showPassword.confirm ? "text" : "password"}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword.confirm ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSecuritySave}
                      className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                    >
                      <Lock size={16} />
                      <span>Update Password</span>
                    </button>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Security Preferences">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#333333] font-poppins">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 font-poppins">Add an extra layer of security to your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securityData.twoFactorEnabled}
                          onChange={(e) => setSecurityData(prev => ({ ...prev, twoFactorEnabled: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#333333] font-poppins">Login Notifications</h4>
                        <p className="text-sm text-gray-600 font-poppins">Get notified when someone logs into your account</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={securityData.loginNotifications}
                          onChange={(e) => setSecurityData(prev => ({ ...prev, loginNotifications: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>

                    <div className="max-w-md">
                      <DropdownField
                        title="Session Timeout (minutes)"
                        value={securityData.sessionTimeout}
                        onChange={(value) => setSecurityData(prev => ({ ...prev, sessionTimeout: value }))}
                        options={["15", "30", "60", "120", "Never"]}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          )}

          {/* System Settings */}
          {activeTab === "system" && (
            <div className="space-y-6">
              <FormSection title="Restaurant Information">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      title="Restaurant Name"
                      value={systemData.restaurantName}
                      onChange={(value) => setSystemData(prev => ({ ...prev, restaurantName: value }))}
                      placeholder="Enter restaurant name"
                    />
                    <DropdownField
                      title="Timezone"
                      value={systemData.timezone}
                      onChange={(value) => setSystemData(prev => ({ ...prev, timezone: value }))}
                      options={["America/New_York", "America/Los_Angeles", "Europe/London", "Asia/Tokyo"]}
                    />
                    <DropdownField
                      title="Currency"
                      value={systemData.currency}
                      onChange={(value) => setSystemData(prev => ({ ...prev, currency: value }))}
                      options={["USD", "EUR", "GBP", "JPY", "CAD"]}
                    />
                    <DropdownField
                      title="Language"
                      value={systemData.language}
                      onChange={(value) => setSystemData(prev => ({ ...prev, language: value }))}
                      options={["English", "Spanish", "French", "German", "Italian"]}
                    />
                    <DropdownField
                      title="Date Format"
                      value={systemData.dateFormat}
                      onChange={(value) => setSystemData(prev => ({ ...prev, dateFormat: value }))}
                      options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]}
                    />
                    <DropdownField
                      title="Theme"
                      value={systemData.theme}
                      onChange={(value) => setSystemData(prev => ({ ...prev, theme: value }))}
                      options={["Light", "Dark", "Auto"]}
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleSystemSave}
                      className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </FormSection>
            </div>
          )}

          {/* Notification Settings */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <FormSection title="Notification Preferences">
                <div className="p-6">
                  <div className="space-y-6">
                    {[
                      { key: "emailNotifications", label: "Email Notifications", desc: "Receive notifications via email" },
                      { key: "orderAlerts", label: "Order Alerts", desc: "Get notified when new orders are placed" },
                      { key: "lowStockAlerts", label: "Low Stock Alerts", desc: "Alert when inventory is running low" },
                      { key: "customerSignups", label: "Customer Signups", desc: "Notification for new customer registrations" },
                      { key: "dailyReports", label: "Daily Reports", desc: "Receive daily summary reports" },
                      { key: "securityAlerts", label: "Security Alerts", desc: "Important security notifications" },
                      { key: "marketingEmails", label: "Marketing Emails", desc: "Promotional and marketing communications" }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">{item.label}</h4>
                          <p className="text-sm text-gray-600 font-poppins">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={notificationData[item.key]}
                            onChange={(e) => setNotificationData(prev => ({ ...prev, [item.key]: e.target.checked }))}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handleNotificationSave}
                      className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save Preferences</span>
                    </button>
                  </div>
                </div>
              </FormSection>
            </div>
          )}

          {/* Payment Settings */}
          {activeTab === "payments" && (
            <div className="space-y-6">
              <FormSection title="Payment Methods">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">Stripe</h4>
                          <p className="text-sm text-gray-600 font-poppins">Credit card processing</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentData.stripeEnabled}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, stripeEnabled: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-yellow-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">PayPal</h4>
                          <p className="text-sm text-gray-600 font-poppins">PayPal payments</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentData.paypalEnabled}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, paypalEnabled: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <CreditCard className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">Cash on Delivery</h4>
                          <p className="text-sm text-gray-600 font-poppins">Pay when order is delivered</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={paymentData.cashOnDelivery}
                          onChange={(e) => setPaymentData(prev => ({ ...prev, cashOnDelivery: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Pricing Configuration">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FormField
                      title="Tax Rate (%)"
                      value={paymentData.taxRate}
                      onChange={(value) => setPaymentData(prev => ({ ...prev, taxRate: value }))}
                      placeholder="8.5"
                      type="number"
                    />
                    <FormField
                      title="Service Fee (%)"
                      value={paymentData.serviceFee}
                      onChange={(value) => setPaymentData(prev => ({ ...prev, serviceFee: value }))}
                      placeholder="2.5"
                      type="number"
                    />
                    <FormField
                      title="Delivery Fee ($)"
                      value={paymentData.deliveryFee}
                      onChange={(value) => setPaymentData(prev => ({ ...prev, deliveryFee: value }))}
                      placeholder="3.99"
                      type="number"
                    />
                  </div>
                  <div className="flex justify-end mt-6">
                    <button
                      onClick={handlePaymentSave}
                      className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                    >
                      <Save size={16} />
                      <span>Save Settings</span>
                    </button>
                  </div>
                </div>
              </FormSection>
            </div>
          )}

          {/* Backup & Data Settings */}
          {activeTab === "backup" && (
            <div className="space-y-6">
              <FormSection title="Backup Settings">
                <div className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-[#333333] font-poppins">Automatic Backups</h4>
                        <p className="text-sm text-gray-600 font-poppins">Automatically backup your data</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          checked={systemData.autoBackup}
                          onChange={(e) => setSystemData(prev => ({ ...prev, autoBackup: e.target.checked }))}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#EB5757]"></div>
                      </label>
                    </div>

                    <div className="max-w-md">
                      <DropdownField
                        title="Backup Frequency"
                        value={systemData.backupFrequency}
                        onChange={(value) => setSystemData(prev => ({ ...prev, backupFrequency: value }))}
                        options={["Hourly", "Daily", "Weekly", "Monthly"]}
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        onClick={handleBackupNow}
                        className="bg-[#EB5757] text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors font-poppins flex items-center space-x-2"
                      >
                        <Database size={16} />
                        <span>Backup Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              </FormSection>

              <FormSection title="Data Management">
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Download className="w-8 h-8 text-green-600" />
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">Export Data</h4>
                          <p className="text-sm text-gray-600 font-poppins">Download your data as a backup</p>
                        </div>
                      </div>
                      <button
                        onClick={handleExportData}
                        className="w-full bg-green-50 text-green-700 px-4 py-2 rounded-lg hover:bg-green-100 transition-colors font-poppins"
                      >
                        Export All Data
                      </button>
                    </div>

                    <div className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <Upload className="w-8 h-8 text-blue-600" />
                        <div>
                          <h4 className="font-medium text-[#333333] font-poppins">Import Data</h4>
                          <p className="text-sm text-gray-600 font-poppins">Restore data from a backup file</p>
                        </div>
                      </div>
                      <button
                        onClick={handleImportData}
                        className="w-full bg-blue-50 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors font-poppins"
                      >
                        Import Data
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-red-800 font-poppins">Danger Zone</h4>
                        <p className="text-sm text-red-600 font-poppins mb-4">These actions cannot be undone. Please be careful.</p>
                        <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-poppins flex items-center space-x-2">
                          <Trash2 size={16} />
                          <span>Delete All Data</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </FormSection>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
