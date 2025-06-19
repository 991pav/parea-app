"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Calendar,
  TrendingUp,
  Bell,
  Sparkles,
  Crown,
  AlertCircle,
  CheckCircle,
  Clock,
  RotateCcw,
  X,
  MessageCircle,
  Euro,
  Heart,
  Stethoscope,
  Users,
  Star,
  Gift,
  Target,
  Zap,
  Check,
  Receipt,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

interface DashboardProps {
  user?: any
  activeChild: string
  onUpgradeClick: () => void
  setActiveChild: (child: string) => void
  setCurrentScreen: (screen: string) => void
  setSelectedConversation: (conversation: any) => void
}

export function Dashboard({ user, activeChild, onUpgradeClick, setActiveChild, setCurrentScreen, setSelectedConversation }: DashboardProps) {
  const isPremium = user?.subscription?.plan_type !== "free"
  const [showCounterProposal, setShowCounterProposal] = useState<number | null>(null)
  const [counterProposalDate, setCounterProposalDate] = useState("")
  const [counterProposalTime, setCounterProposalTime] = useState("")
  const [counterProposalComment, setCounterProposalComment] = useState("")
  const [showChildSelector, setShowChildSelector] = useState(false)
  const [showEventForm, setShowEventForm] = useState(false)
  const children = [
    { id: 1, name: "Emma", age: 8, avatar: "/placeholder.svg?height=40&width=40" },
    { id: 2, name: "Lucas", age: 5, avatar: "/placeholder.svg?height=40&width=40" },
  ]

  // Calendrier hebdomadaire
  const getWeekDays = () => {
    const today = new Date(2025, 5, 15) // 15 juin 2025
    const startOfWeek = new Date(today)
    startOfWeek.setDate(today.getDate() - today.getDay())

    const days = []
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek)
      day.setDate(startOfWeek.getDate() + i)
      days.push(day)
    }
    return days
  }

  const weekDays = getWeekDays()
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const weekEvents = [
    {
      date: "2025-06-15",
      events: [{ time: "18:00", title: "Garde Emma", color: "blue" }],
    },
    {
      date: "2025-06-16",
      events: [{ time: "14:30", title: "Pédiatre", color: "green" }],
    },
    {
      date: "2025-06-18",
      events: [{ time: "16:00", title: "Danse", color: "purple" }],
    },
  ]

  const getEventsForDay = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]
    const dayEvents = weekEvents.find((d) => d.date === dateKey)
    return dayEvents?.events || []
  }

  // Notifications de modifications de planning
  const [planningNotifications, setPlanningNotifications] = useState([
    {
      id: 1,
      type: "planning_change",
      title: "Modification de planning",
      description: "Sarah a proposé un échange pour le weekend du 25-26 Juin",
      author: "Sarah",
      time: "Il y a 2h",
      status: "pending",
      action: "Accepter l'échange",
    },
    {
      id: 2,
      type: "planning_confirmed",
      title: "Planning confirmé",
      description: "Garde du 15-19 Juin confirmée chez Papa",
      author: "Système",
      time: "Il y a 5h",
      status: "confirmed",
    },
    {
      id: 3,
      type: "planning_reminder",
      title: "Rappel de garde",
      description: "Récupération d'Emma demain à 18h00",
      author: "Système",
      time: "Il y a 1j",
      status: "reminder",
    },
  ])

  const getEventColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 border-blue-200"
      case "green":
        return "bg-green-50 border-green-200"
      case "purple":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const getEventBadgeColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "green":
        return "bg-green-100 text-green-700 border border-green-200"
      case "purple":
        return "bg-purple-100 text-purple-700 border border-purple-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleAcceptChange = (notificationId: number) => {
    setPlanningNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, status: "confirmed", title: "Modification acceptée" } : notif,
      ),
    )
  }

  const handleCounterProposal = (notificationId: number) => {
    setShowCounterProposal(notificationId)
  }

  const handleSendCounterProposal = () => {
    if (showCounterProposal) {
      setPlanningNotifications((prev) =>
        prev.map((notif) =>
          notif.id === showCounterProposal
            ? {
                ...notif,
                status: "counter_proposed",
                title: "Contre-proposition envoyée",
                description: `Nouvelle proposition : ${counterProposalDate} à ${counterProposalTime}`,
              }
            : notif,
        ),
      )
      setShowCounterProposal(null)
      setCounterProposalDate("")
      setCounterProposalTime("")
      setCounterProposalComment("")
    }
  }

  // Statistiques et événements selon l'enfant actif
  const quickStatsEmma = [
    {
      title: "Temps de garde",
      value: "65%",
      change: "+5%",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Messages échangés",
      value: "127",
      change: "+12",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Dépenses partagées",
      value: "245 €",
      change: "-15 €",
      icon: Receipt,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-red-600",
    },
  ]
  const quickStatsLucas = [
    {
      title: "Temps de garde",
      value: "48%",
      change: "-2%",
      icon: Clock,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      title: "Messages échangés",
      value: "54",
      change: "+3",
      icon: MessageCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      textColor: "text-green-700",
    },
    {
      title: "Dépenses partagées",
      value: "98 €",
      change: "+8 €",
      icon: Receipt,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      textColor: "text-blue-600",
    },
  ]
  const quickStats = activeChild === "Lucas" ? quickStatsLucas : quickStatsEmma

  // Événements à venir selon l'enfant
  const upcomingEventsEmma = [
    { id: 1, title: "Garde Emma", date: "15 juin 2025", time: "18:00", color: "blue", type: "Garde", icon: Users },
    { id: 2, title: "Pédiatre", date: "16 juin 2025", time: "14:30", color: "green", type: "Santé", icon: Stethoscope },
    { id: 3, title: "Danse", date: "18 juin 2025", time: "16:00", color: "purple", type: "Activité", icon: Heart },
  ]
  const upcomingEventsLucas = [
    { id: 1, title: "Garde Lucas", date: "17 juin 2025", time: "19:00", color: "blue", type: "Garde", icon: Users },
    { id: 2, title: "Orthophoniste", date: "19 juin 2025", time: "10:00", color: "green", type: "Santé", icon: Stethoscope },
    { id: 3, title: "Football", date: "20 juin 2025", time: "17:00", color: "purple", type: "Sport", icon: Heart },
  ]
  const upcomingEvents = activeChild === "Lucas" ? upcomingEventsLucas : upcomingEventsEmma

  const handleChildChange = (childName: string) => {
    if (typeof setActiveChild === 'function') setActiveChild(childName)
    setShowChildSelector(false)
  }

  if (showCounterProposal) {
    return (
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-gray-800">Contre-proposition</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Proposez une alternative pour l'échange de garde</p>
            <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
              Envoyer la contre-proposition
            </Button>
            <Button variant="outline" onClick={() => setShowCounterProposal(null)} className="w-full">
              Annuler
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-pink-50 to-violet-50 min-h-screen">
      {/* En-tête */}
      <Card className="bg-white/90 border border-pink-100 shadow-md">
        <CardContent className="p-6">
          <div className="flex items-center mb-4 space-x-4">
            <Avatar className="h-12 w-12 border border-pink-200 flex-shrink-0">
              <AvatarImage src={user?.profile?.avatar_url || '/placeholder-user.jpg'} />
              <AvatarFallback className="bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white text-lg">
                {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-bold text-black truncate">Bienvenue, {user?.profile?.full_name || 'Parent'} !</h2>
              <span className="text-sm text-pink-500 block truncate">Tableau de bord de {activeChild}</span>
            </div>
          </div>

          {/* Déplacement du bouton Changer d'enfant ici, centré */}
          <div className="flex flex-col items-center mb-4">
            <Button
              className="w-full max-w-xs bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white hover:from-pastel-pink-500 hover:to-pastel-purple-500 shadow-md mb-2 hover:scale-105 transition-all duration-200"
              onClick={() => setShowChildSelector(!showChildSelector)}
            >
              Changer d'enfant
            </Button>
            {showChildSelector && (
              <div className="mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-20">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => handleChildChange(child.name)}
                    className={`w-full flex items-center justify-between p-3 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${activeChild === child.name ? 'bg-pink-50' : ''}`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={child.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white text-sm">
                          {child.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-left">
                        <p className="font-medium text-gray-800">{child.name}</p>
                        <p className="text-xs text-gray-500">{child.age} ans</p>
                      </div>
                    </div>
                    {activeChild === child.name && <Check className="h-4 w-4 text-pink-500" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Barre de progression du mois */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Progression du mois</span>
              <span className="font-semibold text-gray-800">65%</span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full blur-sm"
                style={{ 
                  width: '65%',
                  background: 'linear-gradient(to right, #e60000 0%, #e66600 8.33%, #e6cc00 16.66%, #b3e600 25%, #66e600 33.33%, #00e600 41.66%, #00e666 50%, #00e6cc 58.33%, #00b3e6 66.66%, #0066e6 75%, #0000e6 83.33%, #6600e6 91.66%, #cc00e6 100%)'
                }}
              ></div>
            </div>
            <p className="text-xs text-gray-500">🎯 Objectif : Équilibre parfait atteint !</p>
          </div>
        </CardContent>
      </Card>

      {/* Statistiques rapides */}
      <div className="space-y-3">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card
              key={index}
              className="bg-gray-100 border border-gray-200"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <p className={`text-xs font-medium ${stat.textColor}`}>{stat.change} ce mois</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Prochains événements */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Prochains événements
            <Badge className="ml-2 bg-blue-100 text-blue-700 border border-blue-200">
              {upcomingEvents.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {upcomingEvents.map((event, index) => {
              const Icon = event.icon
              const colorClasses = {
                blue: "bg-blue-50 border-l-blue-400",
                green: "bg-green-50 border-l-green-400",
                purple: "bg-purple-50 border-l-purple-400",
                orange: "bg-orange-50 border-l-orange-400",
              }
              return (
                <div
                  key={event.id}
                  className={`p-4 border-l-4 ${colorClasses[event.color as keyof typeof colorClasses]}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-800">{event.title}</p>
                        <p className="text-sm text-gray-600">{event.date}</p>
                        <p className="text-xs text-gray-500">🕐 {event.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className="bg-gray-100 text-gray-700 border border-gray-200">
                        {event.type}
                      </Badge>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Notifications de planning */}
      <Card className="bg-white border border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center text-gray-800">
            <Bell className="h-5 w-5 mr-2 text-orange-500" />
            Modifications de planning
            <Badge className="ml-2 bg-orange-100 text-orange-700 border border-orange-200">
              {planningNotifications.length}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {planningNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-l-4 ${
                  notification.status === "pending"
                    ? "bg-orange-50 border-l-orange-400"
                    : "bg-green-50 border-l-green-400"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      notification.status === "pending"
                        ? "bg-orange-100"
                        : "bg-green-100"
                    }`}>
                      {notification.status === "pending" ? (
                        <AlertCircle className="h-4 w-4 text-orange-600" />
                      ) : (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{notification.title}</p>
                      <p className="text-sm text-gray-600">{notification.description}</p>
                      <p className="text-xs text-gray-500">{notification.time}</p>
                    </div>
                  </div>
                  {notification.status === "pending" && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-green-500 text-white"
                        onClick={() => handleAcceptChange(notification.id)}
                      >
                        Accepter
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleCounterProposal(notification.id)}
                      >
                        Contre-proposer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Suggestions IA */}
      {isPremium ? (
        <Card className="bg-yellow-50 border border-yellow-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2 flex items-center">
                  💡 Suggestion IA Premium
                  <Star className="h-4 w-4 ml-2 text-yellow-500" />
                </h3>
                <p className="text-gray-700 mb-3">
                  Excellente nouvelle ! Votre planning est parfaitement équilibré ce mois-ci. 
                  L'IA suggère de maintenir cette dynamique pour le mois prochain.
                </p>
                <div className="flex items-center space-x-2">
                  <Button size="sm" className="bg-yellow-400 text-white border border-yellow-500">
                    <Target className="h-3 w-3 mr-1" />
                    Voir les suggestions
                  </Button>
                  <Badge className="bg-green-100 text-green-700 border border-green-200">
                    🎯 Optimisé
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-purple-50 border border-purple-200">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-400 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800 mb-2">✨ Suggestions IA Premium</h3>
                <p className="text-gray-700 mb-3">
                  Découvrez comment l'IA peut optimiser automatiquement votre planning familial 
                  et vous faire gagner du temps précieux !
                </p>
                <Button
                  onClick={onUpgradeClick}
                  className="bg-purple-400 text-white border border-purple-500"
                >
                  <Gift className="h-4 w-4 mr-2" />
                  Essayer gratuitement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions rapides */}
      <div className="grid grid-cols-2 gap-4">
        <Button className="h-16 bg-blue-500 text-white border border-blue-600" onClick={() => setShowEventForm(true)}>
          <Calendar className="h-5 w-5 mr-2" />
          <div className="text-left">
            <div className="font-semibold">Nouvel événement</div>
            <div className="text-xs opacity-90">Planifier</div>
          </div>
        </Button>
        <Button className="h-16 bg-green-500 text-white border border-green-600" onClick={() => { setCurrentScreen("messages"); if (typeof setSelectedConversation === 'function') setSelectedConversation(null); }}>
          <MessageCircle className="h-5 w-5 mr-2" />
          <div className="text-left">
            <div className="font-semibold">Messages</div>
            <div className="text-xs opacity-90">Communiquer</div>
          </div>
        </Button>
      </div>

      {/* Formulaire d'ajout d'événement contextuel */}
      {showEventForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 relative">
            <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-700" onClick={() => setShowEventForm(false)}>
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-bold mb-4 text-blue-700 flex items-center"><Calendar className="h-5 w-5 mr-2" />Nouvel événement</h3>
            {/* Ici tu peux intégrer le formulaire d'événement ou un composant EventForm si besoin */}
            <Input className="mb-3" placeholder="Titre de l'événement" />
            <Input className="mb-3" type="date" />
            <Input className="mb-3" type="time" />
            <Textarea className="mb-3" placeholder="Description (optionnel)" />
            <div className="flex space-x-2">
              <Button className="flex-1 bg-blue-500 text-white" onClick={() => setShowEventForm(false)}>Créer</Button>
              <Button className="flex-1" variant="outline" onClick={() => setShowEventForm(false)}>Annuler</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
