"use client"
import { useRouter } from 'next/navigation'

const NotificationAndCreateUserCards = () => {
  const router = useRouter()

  // Navigation handlers
  const goToNotifications = () => {
    router.push('/admin/notification')
  }

  const goToCreateMenuItem = () => {
    router.push('/admin/stock/add')
  }

  return (
    <div className="grid grid-rows-2 gap-6">
      {/* Restaurant notifications card */}
      <div className="bg-[#EB5757]/10 p-6 rounded-lg">
        {/* Icon and Title in a vertical stack */}
        <div className="flex flex-col mb-20">
          <div className="text-[#EB5757] mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </div>
          <h3 className="text-2xl font-bold font-poppins text-[#333333] mb-4">Restaurant Alerts</h3>
        </div>

        {/* Button in the bottom right */}
        <div className="flex justify-end">
          <button 
            onClick={goToNotifications}
            className="bg-[#EB5757] hover:bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium font-poppins transition duration-300"
          >
            View All
          </button>
        </div>
      </div>

      {/* Add new menu item card */}
      <div className="bg-[#EB5757]/10  p-6 rounded-lg">
        {/* Icon and Title in a vertical stack */}
        <div className="flex flex-col mb-4">
          <div className="text-[#EB5757] mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold font-poppins text-[#333333] mb-1">Add Menu Item</h3>
        </div>

        {/* Subtitle text */}
        <div className="text-[#666666] font-poppins mb-8">Add new dishes to your restaurant menu</div>

        {/* Button in the bottom right */}
        <div className="flex justify-end">
          <button 
            onClick={goToCreateMenuItem}
            className="bg-[#EB5757] hover:bg-red-600 text-white px-4 py-3 rounded-lg text-sm font-medium font-poppins transition duration-300 flex items-center"
          >
            Add Item
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NotificationAndCreateUserCards