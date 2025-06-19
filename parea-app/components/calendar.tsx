"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  RotateCcw,
  Sparkles,
  Calendar as CalendarIcon,
  MessageSquare,
  ArrowLeft,
} from "lucide-react"
import { useState } from "react"
import { EventForm } from "./calendar/event-form"
import { CalendarSync } from "./calendar/calendar-sync"

interface CalendarProps {
  user?: any
  activeChild: string
  setActiveChild?: (child: string) => void
}

export function Calendar({ user, activeChild, setActiveChild }: CalendarProps) {
  // Définir juin 2025 comme date par défaut
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)) // Juin 2025
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showExchangeRequest, setShowExchangeRequest] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [exchangeComment, setExchangeComment] = useState("")
  const [exchangeNewDate, setExchangeNewDate] = useState("")
  const [exchangeNewTime, setExchangeNewTime] = useState("")
  const isPremium = user?.subscription?.plan_type !== "free"

  // Événements selon l'enfant actif
  const eventsEmma = [
    { id: 1, date: "2025-06-15", title: "Garde Emma", color: "blue", createdBy: "me" },
    { id: 2, date: "2025-06-16", title: "Pédiatre", color: "green", createdBy: "Sarah" },
    { id: 3, date: "2025-06-18", title: "Danse", color: "purple", createdBy: "me" },
  ]
  const eventsLucas = [
    { id: 1, date: "2025-06-17", title: "Garde Lucas", color: "blue", createdBy: "Sarah" },
    { id: 2, date: "2025-06-19", title: "Orthophoniste", color: "green", createdBy: "me" },
    { id: 3, date: "2025-06-20", title: "Football", color: "purple", createdBy: "Sarah" },
  ]
  const events = activeChild === "Lucas" ? eventsLucas : eventsEmma

  // Événements synchronisés avec le dashboard - Juin 2025
  const upcomingEvents = [
    {
      id: 1,
      type: "garde",
      title: `Garde - ${activeChild}`,
      date: "2025-06-15",
      time: "18:00",
      endTime: "19:00",
      parent: "Papa",
      color: "blue",
      description: "Récupération à l'école",
      location: "Chez Papa",
      createdBy: "me",
    },
    {
      id: 2,
      type: "garde",
      title: `Garde - ${activeChild}`,
      date: "2025-06-16",
      time: "00:00",
      endTime: "23:59",
      parent: "Papa",
      color: "blue",
      description: "Journée complète chez Papa",
      location: "Chez Papa",
      createdBy: "me",
    },
    {
      id: 3,
      type: "rdv",
      title: "Rendez-vous pédiatre",
      date: "2025-06-16",
      time: "14:30",
      endTime: "15:30",
      location: "Dr. Martin - Vaccins de rappel",
      color: "green",
      description: "Contrôle de routine et vaccins",
      status: "confirmed",
      createdBy: "other",
    },
    {
      id: 4,
      type: "garde",
      title: `Garde - ${activeChild}`,
      date: "2025-06-17",
      time: "00:00",
      endTime: "23:59",
      parent: "Papa",
      color: "blue",
      description: "Journée complète chez Papa",
      location: "Chez Papa",
      createdBy: "me",
    },
    {
      id: 5,
      type: "activite",
      title: "Cours de danse",
      date: "2025-06-18",
      time: "16:00",
      endTime: "17:00",
      location: "Club Étoile - Spectacle en préparation",
      color: "purple",
      description: "Préparation du spectacle de fin d'année",
      createdBy: "other",
    },
    {
      id: 6,
      type: "garde",
      title: `Garde - ${activeChild}`,
      date: "2025-06-18",
      time: "00:00",
      endTime: "23:59",
      parent: "Papa",
      color: "blue",
      description: "Journée complète chez Papa",
      location: "Chez Papa",
      createdBy: "me",
    },
    {
      id: 7,
      type: "garde",
      title: `Retour chez Maman`,
      date: "2025-06-19",
      time: "19:00",
      parent: "Maman",
      color: "pink",
      description: "Fin du weekend chez Papa",
      createdBy: "other",
    },
    // Juillet 2025
    {
      id: 8,
      type: "activite",
      title: "Stage de natation",
      date: "2025-07-05",
      time: "09:00",
      endTime: "12:00",
      location: "Piscine municipale",
      color: "orange",
      description: "Stage d'été - Semaine 1",
      createdBy: "me",
    },
    {
      id: 9,
      type: "garde",
      title: `Vacances chez Papa`,
      date: "2025-07-15",
      time: "00:00",
      endTime: "23:59",
      parent: "Papa",
      color: "blue",
      description: "Début des vacances d'été",
      createdBy: "me",
    },
    {
      id: 10,
      type: "rdv",
      title: "Contrôle ophtalmologue",
      date: "2025-07-22",
      time: "15:00",
      endTime: "16:00",
      location: "Dr. Durand",
      color: "green",
      description: "Contrôle annuel de la vue",
      createdBy: "other",
    },

    // Août 2025
    {
      id: 11,
      type: "activite",
      title: "Colonie de vacances",
      date: "2025-08-10",
      time: "00:00",
      endTime: "23:59",
      location: "Les Petits Aventuriers",
      color: "purple",
      description: "Séjour d'une semaine",
      createdBy: "other",
    },
    {
      id: 12,
      type: "garde",
      title: `Retour chez Maman`,
      date: "2025-08-20",
      time: "18:00",
      parent: "Maman",
      color: "pink",
      description: "Fin des vacances chez Papa",
      createdBy: "me",
    },

    // Septembre 2025
    {
      id: 13,
      type: "rdv",
      title: "Visite médicale scolaire",
      date: "2025-09-05",
      time: "10:00",
      endTime: "11:00",
      location: "École Saint-Martin",
      color: "green",
      description: "Obligatoire pour la rentrée",
      createdBy: "other",
    },
    {
      id: 14,
      type: "activite",
      title: "Reprise cours de danse",
      date: "2025-09-15",
      time: "16:00",
      endTime: "17:00",
      location: "Club Étoile",
      color: "purple",
      description: "Nouvelle saison",
      createdBy: "me",
    },
    {
      id: 15,
      type: "garde",
      title: `Weekend chez Papa`,
      date: "2025-09-20",
      time: "18:00",
      parent: "Papa",
      color: "blue",
      description: "Weekend de rentrée",
      createdBy: "me",
    },
  ]

  // État pour le filtre d'événements
  const [showFilter, setShowFilter] = useState(false)
  const [eventTypeFilter, setEventTypeFilter] = useState({
    garde: true,
    rdv: true,
    activite: true,
    loisirs: true,
    ecole: true,
  })

  // Générer les jours du mois
  const generateCalendarDays = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()

    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days = []
    const currentDate = new Date(startDate)

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDate))
      currentDate.setDate(currentDate.getDate() + 1)
    }

    return days
  }

  const calendarDays = generateCalendarDays(currentDate)
  const monthNames = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ]
  const dayNames = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]

  const getEventsForDate = (date: Date) => {
    const dateKey = date.toISOString().split("T")[0]
    return upcomingEvents.filter((event) => event.date === dateKey)
  }

  // Fonction utilitaire pour filtrer les événements selon le filtre actif
  const filterEvents = (eventsArr: any[]) => {
    return eventsArr.filter((ev) => eventTypeFilter[ev.type as keyof typeof eventTypeFilter])
  }

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + (direction === "next" ? 1 : -1))
    setCurrentDate(newDate)
  }

  const isToday = (date: Date) => {
    const today = new Date()
    return date.toDateString() === today.toDateString()
  }

  const isCurrentMonth = (date: Date) => {
    return date.getMonth() === currentDate.getMonth()
  }

  const getEventColor = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-100 text-blue-700 border border-blue-200"
      case "green":
        return "bg-green-100 text-green-700 border border-green-200"
      case "purple":
        return "bg-purple-100 text-purple-700 border border-purple-200"
      case "pink":
        return "bg-pink-100 text-pink-700 border border-pink-200"
      case "orange":
        return "bg-orange-100 text-orange-700 border border-orange-200"
      case "yellow":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border border-gray-200"
    }
  }

  const handleSaveEvent = (eventData: any) => {
    console.log("Saving event:", eventData)
    setShowEventForm(false)
  }

  const handleExchangeRequest = (event: any) => {
    setSelectedEvent(event)
    setShowExchangeRequest(true)
  }

  const handleSendExchangeRequest = () => {
    console.log("Exchange request:", {
      event: selectedEvent,
      newDate: exchangeNewDate,
      newTime: exchangeNewTime,
      comment: exchangeComment,
    })
    setShowExchangeRequest(false)
    setSelectedEvent(null)
    setExchangeComment("")
    setExchangeNewDate("")
    setExchangeNewTime("")
  }

  if (showEventForm) {
    return <EventForm onBack={() => setShowEventForm(false)} onSave={handleSaveEvent} user={user} />
  }

  if (showExchangeRequest) {
    return (
      <div className="p-4 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowExchangeRequest(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <CardTitle className="text-gray-800">Demande d'échange</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="font-medium text-gray-800">Événement actuel :</p>
              <p className="text-sm text-gray-600">{selectedEvent?.title}</p>
              <p className="text-xs text-gray-500">
                {selectedEvent?.date} à {selectedEvent?.time}
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nouvelle date proposée</label>
                <Input type="date" value={exchangeNewDate} onChange={(e) => setExchangeNewDate(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Nouvelle heure proposée</label>
                <Input type="time" value={exchangeNewTime} onChange={(e) => setExchangeNewTime(e.target.value)} />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Commentaire (optionnel)</label>
                <Textarea
                  placeholder="Expliquez la raison de votre demande..."
                  value={exchangeComment}
                  onChange={(e) => setExchangeComment(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                onClick={handleSendExchangeRequest}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                disabled={!exchangeNewDate || !exchangeNewTime}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Envoyer la demande
              </Button>
              <Button variant="outline" onClick={() => setShowExchangeRequest(false)} className="flex-1">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-pink-50 to-purple-50 min-h-screen">
      {/* En-tête avec navigation */}
      <Card className="bg-white/90 border border-pink-100 shadow-md">
        <CardHeader>
          <CardTitle className="text-black flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-pink-500" />
            Calendrier familial
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Suggestion IA */}
      {isPremium ? (
        <Card className="bg-gradient-to-r from-orange-100 to-yellow-100 border-orange-300 backdrop-blur-sm shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center">
                <span className="text-orange-700 font-bold text-sm">IA</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">Suggestion d'équilibrage</p>
                <p className="text-xs text-gray-700 mt-1">
                  Ce mois-ci, vous avez 65% du temps de garde. L'IA suggère de rééquilibrer le planning du mois
                  prochain.
                </p>
                <Button
                  size="sm"
                  className="mt-2 bg-orange-500/20 text-orange-700 border border-orange-500/30 hover:bg-orange-500/30"
                >
                  Voir les suggestions
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-gradient-to-r from-violet-500/10 to-purple-500/10 border-violet-500/30 backdrop-blur-xl">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Sparkles className="h-5 w-5 text-violet-400" />
              <div>
                <p className="text-sm font-medium text-gray-800">Suggestions IA Premium</p>
                <p className="text-xs text-gray-600">Optimisez automatiquement votre planning familial</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Navigation mois */}
      <div className="flex items-center justify-between my-4 px-2">
        <Button variant="ghost" size="icon" onClick={() => navigateMonth("prev")}
          className="text-pink-500 hover:bg-pink-50">
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <div className="text-lg font-bold text-black">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
        <Button variant="ghost" size="icon" onClick={() => navigateMonth("next")}
          className="text-pink-500 hover:bg-pink-50">
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Calendrier mensuel */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg">
        <CardContent className="p-4">
          {/* En-têtes des jours */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div key={day} className="text-center py-2">
                <span className="text-xs font-medium text-gray-600">{day}</span>
              </div>
            ))}
          </div>

          {/* Grille du calendrier */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((date, index) => {
              const dayEvents = filterEvents(getEventsForDate(date))
              const isCurrentMonthDay = isCurrentMonth(date)
              const isTodayDate = isToday(date)

              return (
                <div
                  key={index}
                  onClick={() => setSelectedDate(date)}
                  className={`
                    min-h-[80px] p-1 rounded-lg cursor-pointer transition-all duration-200 border
                    ${
                      isTodayDate
                        ? "bg-blue-50 border-blue-300 shadow-md"
                        : isCurrentMonthDay
                          ? "bg-white border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                          : "bg-gray-50 border-gray-100"
                    }
                    ${selectedDate?.toDateString() === date.toDateString() ? "ring-2 ring-blue-400" : ""}
                  `}
                >
                  <div
                    className={`text-sm font-medium mb-1 ${
                      isTodayDate ? "text-blue-700 font-bold" : isCurrentMonthDay ? "text-gray-900" : "text-gray-400"
                    }`}
                  >
                    {date.getDate()}
                  </div>

                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((event, eventIndex) => (
                      <div
                        key={eventIndex}
                        className={`text-xs px-1 py-0.5 rounded text-center truncate font-medium cursor-pointer ${getEventColor(event.color)} ${selectedEvent?.id === event.id ? 'ring-2 ring-blue-400' : ''}`}
                        onClick={e => {
                          e.stopPropagation();
                          setSelectedDate(date);
                          setSelectedEvent(event);
                        }}
                        title={event.title}
                      >
                        {event.title} {event.time !== "00:00" ? `— ${event.time}` : ""}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">+{dayEvents.length - 2} autres</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Actions rapides juste sous le calendrier */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <Button
          onClick={() => setShowEventForm(true)}
          className="bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-200"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouvel événement
        </Button>
        <Button
          onClick={() => setShowFilter(true)}
          className="bg-purple-100 text-purple-700 border border-purple-200 hover:bg-purple-200"
        >
          <Sparkles className="h-4 w-4 mr-2" />
          Filtrer les événements
        </Button>
      </div>

      {/* Légende compacte */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardContent className="p-3">
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded"></div>
              <span className="text-gray-600">Garde</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded"></div>
              <span className="text-gray-600">Rendez-vous</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-purple-500 rounded"></div>
              <span className="text-gray-600">Activité</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-orange-500 rounded"></div>
              <span className="text-gray-600">Loisirs</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-yellow-400 rounded"></div>
              <span className="text-gray-600">École</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Synchronisation calendrier */}
      <CalendarSync />

      {/* Modale de filtre d'événements */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-lg shadow-xl p-6 w-80">
            <h3 className="text-lg font-bold mb-4 text-gray-800">Filtrer les événements</h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={eventTypeFilter.garde} onChange={e => setEventTypeFilter(f => ({ ...f, garde: e.target.checked }))} />
                <span className="text-blue-700 font-medium">Garde</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={eventTypeFilter.rdv} onChange={e => setEventTypeFilter(f => ({ ...f, rdv: e.target.checked }))} />
                <span className="text-green-700 font-medium">Rendez-vous</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={eventTypeFilter.activite} onChange={e => setEventTypeFilter(f => ({ ...f, activite: e.target.checked }))} />
                <span className="text-purple-700 font-medium">Activité</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={eventTypeFilter.loisirs} onChange={e => setEventTypeFilter(f => ({ ...f, loisirs: e.target.checked }))} />
                <span className="text-orange-700 font-medium">Loisirs</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" checked={eventTypeFilter.ecole} onChange={e => setEventTypeFilter(f => ({ ...f, ecole: e.target.checked }))} />
                <span className="text-yellow-600 font-medium">École</span>
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <Button onClick={() => setShowFilter(false)} className="bg-blue-500 text-white">Fermer</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
