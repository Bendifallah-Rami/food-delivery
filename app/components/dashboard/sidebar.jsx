"use client"

import {
  Home,
  ShoppingBag,
  Users,
  User,
  BarChart2,
  Bell,
  Settings,
  LogOut,
  Menu,
  X,
  Package,
  ChevronLeft,
  ChevronRight,
  Truck,
  UtensilsCrossed,
  Archive,
} from "lucide-react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"


// Tooltip component for collapsed sidebar
const Tooltip = ({ children, text }) => (
  <div className="group relative flex">
    {children}
    <div className="absolute left-12 scale-0 rounded bg-[#333333] p-2 text-xs text-white group-hover:scale-100 transition-all duration-100 z-50 whitespace-nowrap font-poppins">
      {text}
    </div>
  </div>
)

const Sidebar = ({ activeItem = "dashboard" }) => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)

  const navItems = [
    { key: "dashboard", label: "Dashboard", link: "/admin/dashboard", icon: <Home size={18} /> },
    { key: "orders", label: "Orders", link: "/admin/orders/list", icon: <ShoppingBag size={18} /> },
    { key: "menu", label: "Menu", link: "/admin/stock/list", icon: <UtensilsCrossed size={18} /> },
    { key: "delivery", label: "Delivery", link: "/admin/delivery", icon: <Truck size={18} /> },
    { key: "staff", label: "Staff", link: "/admin/staff/list", icon: <Users size={18} /> },
    { key: "customers", label: "Customers", link: "/admin/user/list", icon: <User size={18} /> },
    { key: "archives", label: "Archives", link: "/admin/archives", icon: <Archive size={18} /> },
    { key: "reports", label: "Reports", link: "/admin/reports", icon: <BarChart2 size={18} /> },
    { key: "notifications", label: "Notifications", link: "/admin/notification", icon: <Bell size={18} /> },
    { key: "settings", label: "Settings", link: "/admin/settings", icon: <Settings size={18} /> },
  ]

  useEffect(() => {
    setIsClient(true)
    
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }

      const savedCollapsed = localStorage.getItem("sidebarCollapsed")
      if (savedCollapsed === null) {
        setIsCollapsed(window.innerWidth < 1280 && window.innerWidth >= 768)
      } else {
        setIsCollapsed(JSON.parse(savedCollapsed))
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const toggleCollapse = () => {
    const newCollapsed = !isCollapsed
    setIsCollapsed(newCollapsed)
    if (isClient) {
      localStorage.setItem("sidebarCollapsed", JSON.stringify(newCollapsed))
    }
  }

  const handleNavItemClick = (itemLink) => {
    router.push(itemLink)
    if (windowWidth < 768) {
      setIsMobileMenuOpen(false)
    }
  }

  const sidebarWidth = isCollapsed ? "w-16" : "w-64"

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white shadow-md z-40 flex items-center justify-between px-4 border-b border-orange-100">
        <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-[#FEE9DE] transition-colors">
          {isMobileMenuOpen ? <X size={24} className="text-[#333333]" /> : <Menu size={24} className="text-[#333333]" />}
        </button>
        <div className="flex justify-center items-center">
          <h1 className="text-xl font-bold text-[#EB5757] font-poppins">Fudo</h1>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-[#0000007b] z-30 transition-all duration-300 ease-in-out"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-screen bg-white shadow-lg border-r border-orange-100 transition-all duration-300 ease-in-out ${sidebarWidth} z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-screen flex flex-col justify-start">
          <div className={`flex items-center justify-between ${isCollapsed ? "flex-col px-0" : "flex-row px-4"} border-b border-orange-100`}>
            <div className={`mt-3 p-3 flex justify-center items-center`}>
              {isCollapsed ? (
                <div className="w-8 h-8 bg-[#EB5757] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg font-poppins">F</span>
                </div>
              ) : (
                <h1 className="text-2xl font-bold text-[#EB5757] font-poppins">Fudo</h1>
              )}
            </div>
            <div className={`flex items-center ${isCollapsed ? "mt-2 justify-center" : "mt-3 justify-end"}`}>
              <button
                onClick={toggleCollapse}
                className="bg-[#EB5757] text-white rounded-full p-1 shadow-md flex w-8 h-8 items-center justify-center hover:bg-red-600 transition-colors"
              >
                {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              </button>
            </div>
          </div>

          <div className="mt-4 px-3 flex-1 overflow-y-visible">
            {navItems.map((item) => {
              const NavItem = (
                <div
                  key={item.key}
                  className={`${isCollapsed ? "px-3" : "px-4"} py-3 mb-1 rounded-md flex items-center transition-colors duration-150 cursor-pointer text-sm relative font-poppins ${
                    activeItem === item.key
                      ? "text-[#EB5757] bg-[#FEE9DE] font-medium"
                      : "text-[#333333] hover:bg-[#FEE9DE] hover:text-[#EB5757]"
                  }`}
                  onClick={() => handleNavItemClick(item.link)}
                >
                  <span className={`${isCollapsed ? "mr-0" : "mr-3"} text-current`}>{item.icon}</span>
                  {!isCollapsed && <span>{item.label}</span>}
                </div>
              )
              return isCollapsed ? (
                <Tooltip key={item.key} text={item.label}>{NavItem}</Tooltip>
              ) : (
                NavItem
              )
            })}
          </div>

          {/* Logout Button */}
          <div className="px-3 pb-4 border-t border-orange-100 pt-4">
            <div
              className={`${isCollapsed ? "px-3" : "px-4"} py-3 rounded-md flex items-center transition-colors duration-150 cursor-pointer text-sm font-poppins text-[#333333] hover:bg-red-50 hover:text-[#EB5757]`}
              onClick={() => {
                // Add logout functionality here
                console.log("Logout clicked");
              }}
            >
              <span className={`${isCollapsed ? "mr-0" : "mr-3"} text-current`}>
                <LogOut size={18} />
              </span>
              {!isCollapsed && <span>Logout</span>}
            </div>
          </div>
        </div>
      </div>

      <div className={`hidden lg:block ${isCollapsed ? "w-16" : "w-64"} transition-all duration-300`} />
      <div className="lg:hidden h-16" />
    </>
  )
}

export default Sidebar
