"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Calendar, MessageCircle, Heart, Stethoscope, Euro } from "lucide-react"

interface NotificationSettingsProps {
  onBack: () => void
}

type NotificationSettings = {
  [key: string]: {
    push: boolean
    email: boolean
    sms: boolean
  }
}

export function NotificationSettings({ onBack }: NotificationSettingsProps) {
  const [settings, setSettings] = useState<NotificationSettings>({
    planning: {
      push: true,
      email: true,
      sms: false,
    },
    messages: {
      push: true,
      email: false,
      sms: true,
    },
    expenses: {
      push: true,
      email: true,
      sms: false,
    },
    health: {
      push: true,
      email: true,
      sms: false,
    },
    memories: {
      push: false,
      email: false,
      sms: false,
    },
    general: {
      push: true,
      email: true,
      sms: false,
    },
  })

  const notificationTypes = [
    {
      id: "planning",
      title: "Planning et garde",
      description: "Modifications, échanges, rappels",
      icon: Calendar,
      color: "text-blue-500",
    },
    {
      id: "messages",
      title: "Messages",
      description: "Nouveaux messages, réponses",
      icon: MessageCircle,
      color: "text-green-500",
    },
    {
      id: "expenses",
      title: "Dépenses",
      description: "Nouvelles dépenses, validations",
      icon: Euro,
      color: "text-purple-500",
    },
    {
      id: "health",
      title: "Santé",
      description: "Rendez-vous, rappels vaccins",
      icon: Stethoscope,
      color: "text-red-500",
    },
    {
      id: "memories",
      title: "Souvenirs",
      description: "Nouveaux souvenirs, commentaires",
      icon: Heart,
      color: "text-pink-500",
    },
    {
      id: "general",
      title: "Général",
      description: "Mises à jour, maintenance",
      icon: Bell,
      color: "text-gray-500",
    },
  ]

  const updateSetting = (type: string, method: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      [type]: {
        ...prev[type],
        [method]: value,
      },
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Notifications</h1>
        </div>

        <div className="space-y-4">
          {notificationTypes.map((type) => {
            const Icon = type.icon
            return (
              <Card key={type.id} className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center text-gray-800">
                    <Icon className={`h-5 w-5 mr-2 ${type.color}`} />
                    {type.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${type.id}-push`} className="text-gray-700">
                      Notifications push
                    </Label>
                    <Switch
                      id={`${type.id}-push`}
                      checked={settings[type.id]?.push}
                      onCheckedChange={(checked) => updateSetting(type.id, "push", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${type.id}-email`} className="text-gray-700">
                      Email
                    </Label>
                    <Switch
                      id={`${type.id}-email`}
                      checked={settings[type.id]?.email}
                      onCheckedChange={(checked) => updateSetting(type.id, "email", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor={`${type.id}-sms`} className="text-gray-700">
                      SMS
                    </Label>
                    <Switch
                      id={`${type.id}-sms`}
                      checked={settings[type.id]?.sms}
                      onCheckedChange={(checked) => updateSetting(type.id, "sms", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          Sauvegarder les préférences
        </Button>
      </div>
    </div>
  )
}
