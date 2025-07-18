"use client"
import { useRouter } from "next/navigation" // Import useRouter from next/navigation for App Router


const StateCards = ({ cardsData }) => {
  const router = useRouter() // Initialize the router

  // Default data if none is provided
  const defaultCardsData = [
    {
      id: "users",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      title: "Users",
      count: "1,203 active users",
      buttonText: "View All",
      path: "/user/list",
    },
    {
      id: "technicians",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ),
      title: "Technicians",
      count: "45 available technicians",
      buttonText: "Manage",
      path: "/user/list",
    },
    {
      id: "requests",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-blue-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      title: "Requests",
      count: "28 pending requests",
      buttonText: "View Requests",
      path: "/request/list",
    },
  ]


  const cards = cardsData || defaultCardsData
  // Handle navigation
  const handleNavigation = (path) => {
    router.push(path)
  }

  return (
    <>
      <h1 className="text-2xl font-bold font-poppins mb-8 text-[#333333]">Quick Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.id} className="px-6 py-3 rounded-lg bg-[#EB5757]/10">
            <div className="flex flex-row items-center justify-start gap-3 mb-2">
            <div className="mb-2 bg-[#FEE9DE] w-min p-2 rounded-full">{card.icon}</div>
            <h2 className="text-xl font-semibold text-[#333333] font-poppins mb-2">{card.title}</h2>
            </div>
            <p className="text-sm font-poppins font-normal text-[#666666] mb-4">
              {card.count}
            </p>
            <button
              className="bg-[#EB5757] rounded-lg hover:bg-red-500 text-white  px-5 py-2 text-sm font-poppins font-medium transition duration-300 "
              onClick={() => handleNavigation(card.path)}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default StateCards