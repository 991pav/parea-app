"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Crown, Settings, Bell, Shield, LogOut, ArrowLeft, ChevronDown, Check, Baby } from "lucide-react"
import { useState } from "react"
import { PersonalInfo } from "./personal-info"
import { NotificationSettings } from "./notification-settings"
import { PrivacySettings } from "./privacy-settings"
import { AppSettings } from "./app-settings"

interface UserProfileProps {
  user: any
  onLogout: () => void
  onClose: () => void
  onSubscriptionClick: () => void
  activeChild: string
  setActiveChild: (child: string) => void
}

export function UserProfile({ user, onLogout, onClose, onSubscriptionClick, activeChild, setActiveChild }: UserProfileProps) {
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [showChildSelector, setShowChildSelector] = useState(false)

  // Simulation de plusieurs enfants
  const children = [
    { id: 1, name: "Emma", age: 8, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Lucas", age: 5, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  const isPremium = user?.subscription?.plan_type !== "free"

  const handleChildChange = (childName: string) => {
    setActiveChild(childName)
    setShowChildSelector(false)
    console.log("Switching to child:", childName)
  }

  if (activeSection === "personal") {
    return <PersonalInfo user={user} onBack={() => setActiveSection(null)} onSave={(data) => console.log("Saving personal info:", data)} />
  }

  if (activeSection === "notifications") {
    return <NotificationSettings onBack={() => setActiveSection(null)} />
  }

  if (activeSection === "privacy") {
    return <PrivacySettings onBack={() => setActiveSection(null)} />
  }

  if (activeSection === "app") {
    return <AppSettings onBack={() => setActiveSection(null)} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl min-h-screen">
        <header className="bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-lg font-bold text-gray-800">Mon profil</h1>
            <div className="w-16"></div>
          </div>
        </header>

        <main className="p-4 space-y-6">
          {/* Informations utilisateur */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={user?.profile?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-lg">
                    {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2 className="text-xl font-bold text-gray-800">{user?.profile?.full_name || "Utilisateur"}</h2>
                  <p className="text-gray-600">{user?.email}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    {isPremium ? (
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Premium
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-gray-300 text-gray-600">
                        Gratuit
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sélecteur d'enfant déplacé ici */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Baby className="h-5 w-5 mr-2 text-blue-500" />
                Enfant sélectionné
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setShowChildSelector(!showChildSelector)}
                  className="w-full justify-between bg-white border-gray-300 hover:bg-gray-50"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={children.find((c) => c.name === activeChild)?.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm">
                        {activeChild.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium text-gray-800">{activeChild}</p>
                      <p className="text-xs text-gray-500">{children.find((c) => c.name === activeChild)?.age} ans</p>
                    </div>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </Button>

                {showChildSelector && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {children.map((child) => (
                      <button
                        key={child.id}
                        onClick={() => handleChildChange(child.name)}
                        className="w-full flex items-center justify-between p-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={child.avatar || "/placeholder.svg"} />
                            <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm">
                              {child.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-left">
                            <p className="font-medium text-gray-800">{child.name}</p>
                            <p className="text-xs text-gray-500">{child.age} ans</p>
                          </div>
                        </div>
                        {activeChild === child.name && <Check className="h-4 w-4 text-blue-500" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Enfant sélectionné :</strong> {activeChild}
                </p>
                <p className="text-xs text-blue-600 mt-1">Toutes les données affichées concernent {activeChild}</p>
              </div>
            </CardContent>
          </Card>

          {/* Menu des paramètres */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <div className="space-y-1">
                <button
                  onClick={() => setActiveSection("personal")}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Informations personnelles</span>
                </button>

                <Separator />

                <button
                  onClick={() => setActiveSection("notifications")}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Notifications</span>
                </button>

                <Separator />

                <button
                  onClick={() => setActiveSection("privacy")}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <Shield className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Confidentialité</span>
                </button>

                <Separator />

                <button
                  onClick={onSubscriptionClick}
                  className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-purple-600" />
                    <span className="text-gray-800 font-medium">Abonnement</span>
                  </div>
                  {!isPremium && <Badge className="bg-purple-100 text-purple-700">Upgrade</Badge>}
                </button>

                <Separator />

                <button
                  onClick={() => setActiveSection("app")}
                  className="w-full flex items-center space-x-3 p-4 hover:bg-gray-50 transition-colors"
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-gray-800 font-medium">Paramètres de l'app</span>
                </button>
              </div>
            </CardContent>
          </Card>

          {/* Statistiques du profil */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-blue-600">127</p>
                  <p className="text-xs text-gray-600">Messages envoyés</p>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-green-600">45</p>
                  <p className="text-xs text-gray-600">Souvenirs partagés</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-purple-600">23</p>
                  <p className="text-xs text-gray-600">Échanges réussis</p>
                </div>
                <div className="bg-pink-50 rounded-lg p-3">
                  <p className="text-2xl font-bold text-pink-600">8.7</p>
                  <p className="text-xs text-gray-600">Note bienveillance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Déconnexion */}
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-0">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 p-4 hover:bg-red-50 transition-colors text-red-600"
              >
                <LogOut className="h-5 w-5" />
                <span className="font-medium">Se déconnecter</span>
              </button>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  )
}
