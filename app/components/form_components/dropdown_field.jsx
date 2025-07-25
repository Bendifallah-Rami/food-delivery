
import React, { useEffect, useState, useRef } from "react"
import { Check, AlertTriangle, ChevronDown } from "lucide-react"

const DropdownField = ({
    title,
    value,
    onChange,
    icon,
    iconBg,
    updateText,
    description,
    options = [],
    error = null,
    required = false,
  }) => {
    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef(null)
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen)
    }
  
    const handleSelect = (option) => {
      onChange(option)
      setIsOpen(false)
    }
  
    // Handle click outside to close dropdown
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false)
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }, [])
  
    return (
      <div className="flex flex-col gap-2" ref={dropdownRef}>
        {title && (
          <h2 className="text-sm  text-[#333333]">
            {title} {required && <span className="text-red-500">*</span>}
          </h2>
        )}
  
        <div className="relative">
          <div
            className={`flex items-center justify-between border ${error ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-none"} rounded-lg px-4 py-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors shadow-sm shadow-neutral-300 dark:shadow-neutral-800`}
            onClick={toggleDropdown}
          >
            <div className="flex items-center">
              {icon && <div className={`${iconBg}  mr-2`}>{icon}</div>}
  
              <div className="flex items-start flex-col text-sm">
                {value && <span className="text-[#333333] ">{value}</span>}
                {!value && <span className="text-neutral-400 ">{title}</span>}
                <span className="text-xs text-neutral-500 ">{updateText}</span>
              </div>
            </div>
            <ChevronDown
              size={18}
              className={`text-[#333333] dark:text-neutral-100 transition-transform duration-200 ${isOpen ? "transform rotate-180" : ""}`}
            />
          </div>
  
          {isOpen && options.length > 0 && (
            <ul className="absolute w-full mt-1 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-700 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
              {options.map((option, index) => (
                <li
                  key={index}
                  className={`px-4 py-2 hover:bg-[#EB5757]/10 cursor-pointer ${value === option ? "bg-[#EB5757]/10 text-[#333333]" : ""}`}
                  onClick={() => handleSelect(option)}
                >
                  <div className="flex items-center">
                    {value === option && <Check size={16} className="mr-2 text-blue-500" />}
                    <span className={value === option ? "ml-0" : "ml-6"}>{option}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
  
        {error && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center">
            <AlertTriangle size={12} className="mr-1" />
            {error}
          </p>
        )}
  
        {description && !error && <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{description}</p>}
      </div>
    )
  }

  export default DropdownField;