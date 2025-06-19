"use client"

import { Calendar, Receipt, Home, Stethoscope, Heart } from "lucide-react"

interface NavigationProps {
  currentScreen: string
  onScreenChange: (screen: string) => void
  notifications?: {
    calendar?: number
    expenses?: number
    messages?: number
    health?: number
    memories?: number
  }
}

export function Navigation({ currentScreen, onScreenChange, notifications = {} }: NavigationProps) {
  const navItems = [
    {
      id: "calendar",
      icon: Calendar,
      label: "Planning",
      notifications: notifications.calendar || 0,
    },
    {
      id: "expenses",
      icon: Receipt,
      label: "Dépenses",
      notifications: notifications.expenses || 0,
    },
    {
      id: "dashboard",
      icon: Home,
      label: "Accueil",
      notifications: 0,
      isCenter: true,
    },
    {
      id: "health",
      icon: Stethoscope,
      label: "Santé",
      notifications: notifications.health || 0,
    },
    {
      id: "memories",
      icon: Heart,
      label: "Memories",
      notifications: notifications.memories || 0,
      special: true,
    },
  ]

  const NotificationBadge = ({ count }: { count: number }) => {
    if (count === 0) return null

    return (
      <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse-notification shadow-sm">
        <span className="text-[8px] leading-none">{count > 9 ? "9" : count}</span>
      </div>
    )
  }

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      <div className="bg-white/95 backdrop-blur-xl border-t border-gray-200 shadow-lg">
        <div className="flex justify-around items-center py-2 px-4 relative">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentScreen === item.id
            const isCenterButton = item.isCenter

            if (isCenterButton) {
              return (
                <button
                  key={item.id}
                  onClick={() => onScreenChange(item.id)}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white hover:scale-105 ${
                    isActive ? "scale-110" : ""
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  {isActive && (
                    <div className="absolute -bottom-2 w-2 h-2 bg-pastel-pink-500 rounded-full animate-bounce-gentle"></div>
                  )}
                </button>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => onScreenChange(item.id)}
                className={`relative flex flex-col items-center p-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? item.special
                      ? "text-red-500 bg-red-50 shadow-md"
                      : "text-pastel-blue-600 bg-pastel-blue-50"
                    : item.special
                      ? "text-red-400 hover:text-red-500 hover:bg-red-50 hover:shadow-md"
                      : "text-gray-500 hover:text-pastel-blue-500 hover:bg-pastel-blue-50"
                }`}
              >
                <div className="relative">
                  <Icon className="h-5 w-5 mb-1" />
                  <NotificationBadge count={item.notifications} />
                </div>
                <span className="text-xs font-medium">{item.label}</span>
                {isActive && !item.special && (
                  <div className="absolute -bottom-1 w-1 h-1 bg-pastel-blue-500 rounded-full"></div>
                )}
                {isActive && item.special && <div className="absolute -bottom-1 w-1 h-1 bg-red-500 rounded-full"></div>}
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
