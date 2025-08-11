"use client"

import { createContext, useContext, useState, useEffect } from "react"

const StaffContext = createContext()

export const useStaff = () => {
  const context = useContext(StaffContext)
  if (!context) {
    throw new Error('useStaff must be used within a StaffProvider')
  }
  return context
}

export const StaffProvider = ({ children }) => {
  const [orders, setOrders] = useState([])
  const [notifications, setNotifications] = useState([])
  const [deliveryPersons, setDeliveryPersons] = useState([])

  // Initialize mock data
  useEffect(() => {
    const initialOrders = [
      {
        id: "ORD12344",
        customerName: "Alice Brown",
        customerPhone: "+1234567892",
        customerAddress: "789 Pine St, Manhattan, NY 10002",
        items: [
          { name: "Beef Tacos", quantity: 3 },
          { name: "Guacamole", quantity: 1 },
          { name: "Sprite", quantity: 1 }
        ],
        status: "Pending Confirmation",
        orderTime: "14:25",
        estimatedTime: "20 mins",
        priority: "Normal",
        totalAmount: "$22.50"
      },
      {
        id: "ORD12345",
        customerName: "John Doe",
        customerPhone: "+1234567890",
        customerAddress: "123 Main St, New York, NY 10001",
        items: [
          { name: "Classic Burger", quantity: 2 },
          { name: "French Fries", quantity: 1 },
          { name: "Coca Cola", quantity: 2 }
        ],
        status: "Confirmed",
        orderTime: "14:30",
        estimatedTime: "15 mins",
        priority: "Normal",
        totalAmount: "$28.97"
      },
      {
        id: "ORD12346",
        customerName: "Sarah Wilson",
        customerPhone: "+1234567891",
        customerAddress: "456 Oak Ave, Brooklyn, NY 11201",
        items: [
          { name: "Margherita Pizza", quantity: 1 },
          { name: "Caesar Salad", quantity: 1 }
        ],
        status: "Preparing",
        orderTime: "14:35",
        estimatedTime: "12 mins",
        priority: "High",
        startedAt: "14:37",
        totalAmount: "$26.48"
      },
      {
        id: "ORD12347",
        customerName: "Mike Johnson",
        customerPhone: "+1234567890",
        customerAddress: "123 Main St, New York, NY 10001",
        items: [
          { name: "Chicken Wings", quantity: 1 },
          { name: "Buffalo Sauce", quantity: 1 }
        ],
        status: "Ready",
        orderTime: "14:20",
        estimatedTime: "Complete",
        priority: "Normal",
        startedAt: "14:22",
        readyAt: "14:35",
        totalAmount: "$18.99"
      }
    ]

    const initialDeliveryPersons = [
      { id: "DP001", name: "John Smith", phone: "+1234567893", status: "Available", currentOrders: 0 },
      { id: "DP002", name: "Maria Garcia", phone: "+1234567894", status: "Busy", currentOrders: 2 },
      { id: "DP003", name: "David Wilson", phone: "+1234567895", status: "Available", currentOrders: 0 }
    ]

    setOrders(initialOrders)
    setDeliveryPersons(initialDeliveryPersons)
  }, [])

  // Order management functions
  const confirmOrder = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Confirmed", confirmedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    // Add notification
    addNotification({
      type: "order_confirmed",
      title: "Order Confirmed",
      message: `Order ${orderId} has been confirmed and sent to kitchen`,
      orderId: orderId,
      priority: "normal"
    })
  }

  const rejectOrder = (orderId) => {
    const rejectedOrder = orders.find(order => order.id === orderId)
    setOrders(prev => prev.filter(order => order.id !== orderId))
    
    // Add notification
    addNotification({
      type: "order_rejected",
      title: "Order Rejected",
      message: `Order ${orderId} has been rejected`,
      orderId: orderId,
      priority: "high"
    })
  }

  const startCooking = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Preparing", startedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    addNotification({
      type: "cooking_started",
      title: "Cooking Started",
      message: `Kitchen has started preparing order ${orderId}`,
      orderId: orderId,
      priority: "normal"
    })
  }

  const markReady = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Ready", readyAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    addNotification({
      type: "order_ready",
      title: "Order Ready",
      message: `Order ${orderId} is ready for pickup/delivery`,
      orderId: orderId,
      priority: "high"
    })
  }

  const assignDelivery = (orderId, deliveryPersonId) => {
    const deliveryPerson = deliveryPersons.find(dp => dp.id === deliveryPersonId)
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Assigned", assignedTo: deliveryPerson?.name, assignedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    setDeliveryPersons(prev => prev.map(dp => 
      dp.id === deliveryPersonId 
        ? { ...dp, status: "Busy", currentOrders: dp.currentOrders + 1 }
        : dp
    ))
    
    addNotification({
      type: "delivery_assigned",
      title: "Delivery Assigned",
      message: `Order ${orderId} assigned to ${deliveryPerson?.name}`,
      orderId: orderId,
      priority: "normal"
    })
  }

  const startDelivery = (orderId) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Out for Delivery", deliveryStarted: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    addNotification({
      type: "delivery_started",
      title: "Delivery Started",
      message: `Order ${orderId} is out for delivery`,
      orderId: orderId,
      priority: "normal"
    })
  }

  const completeDelivery = (orderId) => {
    const completedOrder = orders.find(order => order.id === orderId)
    const deliveryPerson = deliveryPersons.find(dp => dp.name === completedOrder?.assignedTo)
    
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: "Delivered", deliveredAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) }
        : order
    ))
    
    if (deliveryPerson) {
      setDeliveryPersons(prev => prev.map(dp => 
        dp.id === deliveryPerson.id 
          ? { ...dp, status: "Available", currentOrders: Math.max(0, dp.currentOrders - 1) }
          : dp
      ))
    }
    
    addNotification({
      type: "delivery_completed",
      title: "Delivery Completed",
      message: `Order ${orderId} has been successfully delivered`,
      orderId: orderId,
      priority: "normal"
    })
  }

  // Notification management
  const addNotification = (notification) => {
    const newNotification = {
      ...notification,
      id: `NOT${Date.now()}`,
      timestamp: new Date(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(notif => 
      notif.id === notificationId 
        ? { ...notif, read: true }
        : notif
    ))
  }

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })))
  }

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId))
  }

  const value = {
    // State
    orders,
    notifications,
    deliveryPersons,
    
    // Order actions
    confirmOrder,
    rejectOrder,
    startCooking,
    markReady,
    assignDelivery,
    startDelivery,
    completeDelivery,
    
    // Notification actions
    addNotification,
    markNotificationRead,
    markAllNotificationsRead,
    deleteNotification,
    
    // Stats
    getOrderStats: () => {
      const pending = orders.filter(o => o.status === "Pending Confirmation").length
      const confirmed = orders.filter(o => o.status === "Confirmed").length
      const preparing = orders.filter(o => o.status === "Preparing").length
      const ready = orders.filter(o => o.status === "Ready").length
      const assigned = orders.filter(o => o.status === "Assigned").length
      const outForDelivery = orders.filter(o => o.status === "Out for Delivery").length
      const delivered = orders.filter(o => o.status === "Delivered").length
      
      return {
        pending,
        confirmed,
        preparing,
        ready,
        assigned,
        outForDelivery,
        delivered,
        total: orders.length,
        unreadNotifications: notifications.filter(n => !n.read).length
      }
    }
  }

  return (
    <StaffContext.Provider value={value}>
      {children}
    </StaffContext.Provider>
  )
}
