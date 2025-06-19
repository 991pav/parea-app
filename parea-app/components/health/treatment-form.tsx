"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Pill, Clock, Calendar } from "lucide-react"
import { useState } from "react"

interface TreatmentFormProps {
  onBack: () => void
  onSave: (data: any) => void
}

export function TreatmentForm({ onBack, onSave }: TreatmentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    dosage: "",
    frequency: "",
    duration: "",
    startDate: "",
    endDate: "",
    instructions: "",
    prescribedBy: "",
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
            <CardTitle className="text-slate-700">Nouveau traitement</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Formulaire */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardContent className="p-4 space-y-4">
            {/* Nom du médicament */}
            <div>
              <Label htmlFor="name" className="text-slate-700 flex items-center">
                <Pill className="h-4 w-4 mr-1" />
                Nom du médicament
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Doliprane, Vitamine D..."
                required
              />
            </div>

            {/* Posologie */}
            <div>
              <Label htmlFor="dosage" className="text-slate-700">
                Posologie
              </Label>
              <Input
                id="dosage"
                value={formData.dosage}
                onChange={(e) => handleChange("dosage", e.target.value)}
                placeholder="1 comprimé, 5ml, 2 gouttes..."
                required
              />
            </div>

            {/* Fréquence */}
            <div>
              <Label htmlFor="frequency" className="text-slate-700 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Fréquence
              </Label>
              <select
                id="frequency"
                value={formData.frequency}
                onChange={(e) => handleChange("frequency", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionner la fréquence</option>
                <option value="1 fois par jour">1 fois par jour</option>
                <option value="2 fois par jour">2 fois par jour</option>
                <option value="3 fois par jour">3 fois par jour</option>
                <option value="Matin">Le matin</option>
                <option value="Soir">Le soir</option>
                <option value="Matin et soir">Matin et soir</option>
                <option value="Si besoin">Si besoin</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Durée */}
            <div>
              <Label htmlFor="duration" className="text-slate-700">
                Durée du traitement
              </Label>
              <select
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange("duration", e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Sélectionner la durée</option>
                <option value="3 jours">3 jours</option>
                <option value="1 semaine">1 semaine</option>
                <option value="2 semaines">2 semaines</option>
                <option value="1 mois">1 mois</option>
                <option value="3 mois">3 mois</option>
                <option value="6 mois">6 mois</option>
                <option value="Permanent">Permanent</option>
                <option value="Autre">Autre</option>
              </select>
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="startDate" className="text-slate-700 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Date de début
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange("startDate", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="endDate" className="text-slate-700">
                  Date de fin
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange("endDate", e.target.value)}
                />
              </div>
            </div>

            {/* Prescrit par */}
            <div>
              <Label htmlFor="prescribedBy" className="text-slate-700">
                Prescrit par
              </Label>
              <Input
                id="prescribedBy"
                value={formData.prescribedBy}
                onChange={(e) => handleChange("prescribedBy", e.target.value)}
                placeholder="Dr. Martin, Dr. Dubois..."
              />
            </div>

            {/* Instructions */}
            <div>
              <Label htmlFor="instructions" className="text-slate-700">
                Instructions particulières
              </Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) => handleChange("instructions", e.target.value)}
                placeholder="À prendre pendant les repas, éviter l'exposition au soleil..."
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
          <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
            Enregistrer
          </Button>
        </div>
      </form>
    </div>
  )
}
