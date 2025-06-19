"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronDown, Calendar, Smartphone, Link, Check, ExternalLink } from "lucide-react"

export function CalendarSync() {
  const [isOpen, setIsOpen] = useState(false)
  const [connectedServices, setConnectedServices] = useState<string[]>([])

  const syncOptions = [
    {
      id: "google",
      name: "Google Calendar",
      icon: Calendar,
      description: "Synchronisation bidirectionnelle",
      color: "bg-blue-100 text-blue-700 border-blue-200",
      action: () => {
        // Simulation de connexion Google Calendar
        console.log("Connecting to Google Calendar...")
        setConnectedServices([...connectedServices, "google"])
      },
    },
    {
      id: "apple",
      name: "Calendrier iOS",
      icon: Smartphone,
      description: "Synchronisation avec l'app Calendrier",
      color: "bg-gray-100 text-gray-700 border-gray-200",
      action: () => {
        // Simulation de connexion Apple Calendar
        console.log("Connecting to Apple Calendar...")
        setConnectedServices([...connectedServices, "apple"])
      },
    },
    {
      id: "ical",
      name: "Lien iCal",
      icon: Link,
      description: "URL à copier dans votre calendrier",
      color: "bg-green-100 text-green-700 border-green-200",
      action: () => {
        // Génération d'un lien iCal
        const icalUrl = "https://parea.app/calendar/ical/user-id-123"
        navigator.clipboard.writeText(icalUrl)
        alert("Lien iCal copié dans le presse-papiers !")
      },
    },
  ]

  return (
    <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
      <CardHeader className="pb-3">
        <button onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-between w-full text-left">
          <CardTitle className="text-gray-800 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Connecter à un calendrier
          </CardTitle>
          <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Synchronisez vos événements Parea avec votre calendrier principal pour une vue d'ensemble complète.
        </p>
      </CardHeader>
      {isOpen && (
        <CardContent className="space-y-3">
          {syncOptions.map((option) => {
            const Icon = option.icon
            const isConnected = connectedServices.includes(option.id)
            return (
              <div
                key={option.id}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                  isConnected ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${option.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-gray-800">{option.name}</p>
                      {isConnected && (
                        <Badge className="bg-green-100 text-green-700 border-green-300 text-xs">
                          <Check className="h-3 w-3 mr-1" />
                          Connecté
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-gray-600">{option.description}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={option.action}
                  disabled={isConnected}
                  className={
                    isConnected
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 text-white"
                  }
                >
                  {isConnected ? (
                    <Check className="h-3 w-3" />
                  ) : option.id === "ical" ? (
                    <Link className="h-3 w-3" />
                  ) : (
                    <ExternalLink className="h-3 w-3" />
                  )}
                </Button>
              </div>
            )
          })}

          <div className="bg-blue-50 rounded-lg p-3 border border-blue-200 mt-4">
            <div className="flex items-start space-x-2">
              <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div>
                <p className="text-blue-800 text-sm font-medium">Astuce</p>
                <p className="text-blue-700 text-xs mt-1">
                  La synchronisation permet de voir vos événements Parea dans votre calendrier principal et vice versa.
                  Idéal pour éviter les conflits de planning !
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  )
}
