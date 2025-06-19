"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Calendar, Clock, MapPin, User } from "lucide-react"
import { useState } from "react"

interface AppointmentFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function AppointmentForm({ onBack, onSave }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    type: "",
    doctor: "",
    date: "",
    time: "",
    location: "",
    reason: "",
    notes: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-4 space-y-4">
      {/* En-tête */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-slate-700">Nouveau rendez-vous</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Type de RDV */}
            <div>
              <Label htmlFor="type" className="text-slate-700">
                Type de rendez-vous
              </Label>
              <select
                id="type"
                value={formData.type}
                onChange={(e) => handleChange("type", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                required
              >
                <option value="">Sélectionner un type</option>
                <option value="Pédiatre">Pédiatre</option>
                <option value="Dentiste">Dentiste</option>
                <option value="Ophtalmologue">Ophtalmologue</option>
                <option value="ORL">ORL</option>
                <option value="Dermatologue">Dermatologue</option>
                <option value="Spécialiste">Autre spécialiste</option>
              </select>
            </div>

            {/* Médecin */}
            <div>
              <Label htmlFor="doctor" className="text-slate-700 flex items-center">
                <User className="h-4 w-4 mr-1" />
                Médecin
              </Label>
              <Input
                id="doctor"
                value={formData.doctor}
                onChange={(e) => handleChange("doctor", e.target.value)}
                placeholder="Dr. Martin"
                required
              />
            </div>

            {/* Date et heure */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="date" className="text-slate-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="time" className="text-slate-700 flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Heure
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleChange("time", e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Lieu */}
            <div>
              <Label htmlFor="location" className="text-slate-700 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Lieu
              </Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleChange("location", e.target.value)}
                placeholder="Cabinet médical, adresse..."
                required
              />
            </div>

            {/* Motif */}
            <div>
              <Label htmlFor="reason" className="text-slate-700">
                Motif de consultation
              </Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) => handleChange("reason", e.target.value)}
                placeholder="Contrôle de routine, vaccins..."
                required
              />
            </div>

            {/* Notes */}
            <div>
              <Label htmlFor="notes" className="text-slate-700">
                Notes (optionnel)
              </Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => handleChange("notes", e.target.value)}
                placeholder="Informations complémentaires..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" onClick={onBack}>
            Annuler
          </Button>
          <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  )
}
