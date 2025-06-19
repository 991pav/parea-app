"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Save, MapPin, Baby, Clock, CalendarIcon } from "lucide-react"

interface EventFormProps {
  onBack: () => void
  onSave: (eventData: any) => void
  user?: any
}

export function EventForm({ onBack, onSave, user }: EventFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "garde",
    childId: "1",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    recurring: false,
  })

  const eventTypes = [
    { id: "garde", label: "Temps de garde", color: "bg-blue-100 text-blue-700", icon: Baby },
    { id: "rdv", label: "Visite médicale", color: "bg-green-100 text-green-700", icon: CalendarIcon },
    { id: "activite", label: "Activité", color: "bg-purple-100 text-purple-700", icon: Clock },
    { id: "ecole", label: "École", color: "bg-orange-100 text-orange-700", icon: CalendarIcon },
    { id: "autre", label: "Autre", color: "bg-gray-100 text-gray-700", icon: CalendarIcon },
  ]

  const children = [
    { id: "1", name: user?.profile?.child_name || "Emma", age: 6 },
    { id: "2", name: "Lucas", age: 4 },
  ]

  const handleSave = () => {
    if (!formData.title || !formData.date || !formData.startTime) {
      alert("Veuillez remplir les champs obligatoires")
      return
    }

    onSave(formData)
  }

  const openMaps = () => {
    if (formData.location) {
      const encodedLocation = encodeURIComponent(formData.location)
      // Détection du système pour ouvrir l'app appropriée
      const userAgent = navigator.userAgent
      if (/iPad|iPhone|iPod/.test(userAgent)) {
        window.open(`maps://maps.apple.com/?q=${encodedLocation}`, "_blank")
      } else {
        window.open(`https://maps.google.com/?q=${encodedLocation}`, "_blank")
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Nouvel événement</h1>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
          <CardHeader>
            <CardTitle className="text-gray-800">Créer un événement</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Titre */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-700">
                Titre de l'événement *
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Ex: Garde chez Papa, RDV pédiatre..."
                className="bg-white border-gray-300 text-gray-800"
              />
            </div>

            {/* Type d'événement */}
            <div className="space-y-2">
              <Label className="text-gray-700">Type d'événement *</Label>
              <div className="grid grid-cols-2 gap-2">
                {eventTypes.map((type) => {
                  const Icon = type.icon
                  return (
                    <button
                      key={type.id}
                      onClick={() => setFormData({ ...formData, type: type.id })}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.type === type.id
                          ? `${type.color} border-current shadow-md`
                          : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Icon className="h-4 w-4 mx-auto mb-1" />
                      <span className="text-xs font-medium">{type.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Enfant concerné */}
            <div className="space-y-2">
              <Label className="text-gray-700">Enfant concerné</Label>
              <div className="flex space-x-2">
                {children.map((child) => (
                  <button
                    key={child.id}
                    onClick={() => setFormData({ ...formData, childId: child.id })}
                    className={`flex-1 p-3 rounded-lg border transition-all ${
                      formData.childId === child.id
                        ? "bg-blue-100 text-blue-700 border-blue-300 shadow-md"
                        : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Baby className="h-4 w-4 mx-auto mb-1" />
                    <div className="text-xs font-medium">{child.name}</div>
                    <div className="text-xs text-gray-500">{child.age} ans</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <Label htmlFor="date" className="text-gray-700">
                Date *
              </Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="bg-white border-gray-300 text-gray-800"
              />
            </div>

            {/* Heures */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="startTime" className="text-gray-700">
                  Heure de début *
                </Label>
                <Input
                  id="startTime"
                  type="time"
                  value={formData.startTime}
                  onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                  className="bg-white border-gray-300 text-gray-800"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="endTime" className="text-gray-700">
                  Heure de fin
                </Label>
                <Input
                  id="endTime"
                  type="time"
                  value={formData.endTime}
                  onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                  className="bg-white border-gray-300 text-gray-800"
                />
              </div>
            </div>

            {/* Lieu */}
            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-700">
                Lieu
              </Label>
              <div className="flex space-x-2">
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Adresse ou nom du lieu"
                  className="flex-1 bg-white border-gray-300 text-gray-800"
                />
                {formData.location && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={openMaps}
                    className="px-3 border-gray-300 text-gray-600 hover:bg-gray-50"
                  >
                    <MapPin className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-700">
                Commentaire
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Informations complémentaires..."
                className="bg-white border-gray-300 text-gray-800 min-h-[80px]"
              />
            </div>

            {/* Récurrence */}
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="recurring"
                checked={formData.recurring}
                onChange={(e) => setFormData({ ...formData, recurring: e.target.checked })}
                className="rounded border-gray-300"
              />
              <Label htmlFor="recurring" className="text-gray-700 text-sm">
                Événement récurrent (chaque semaine)
              </Label>
            </div>

            {/* Aperçu */}
            {formData.title && formData.date && formData.startTime && (
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <h4 className="font-medium text-gray-800 mb-2">Aperçu de l'événement</h4>
                <div className="space-y-1 text-sm">
                  <p className="text-gray-700">
                    <strong>{formData.title}</strong>
                  </p>
                  <p className="text-gray-600">
                    {new Date(formData.date).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}{" "}
                    à {formData.startTime}
                    {formData.endTime && ` - ${formData.endTime}`}
                  </p>
                  {formData.location && <p className="text-gray-600">📍 {formData.location}</p>}
                  <Badge className={eventTypes.find((t) => t.id === formData.type)?.color}>
                    {eventTypes.find((t) => t.id === formData.type)?.label}
                  </Badge>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-2 pt-4">
              <Button
                onClick={handleSave}
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Créer l'événement
              </Button>
              <Button variant="outline" onClick={onBack} className="border-gray-300 text-gray-700 hover:bg-gray-50">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
