"use client"

import { StaffProvider } from "./context/StaffContext"
import StaffNavigation from "./components/StaffNavigation"

export default function StaffLayout({ children }) {
  return (
    <StaffProvider>
      <div className="min-h-screen bg-gray-50">
        <StaffNavigation />
        <main className="pt-16">
          {children}
        </main>
      </div>
    </StaffProvider>
  )
}
