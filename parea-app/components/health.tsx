"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Pill, AlertCircle, Plus, ExternalLink, ChevronDown, Syringe, FileText } from "lucide-react"
import { useState } from "react"
import { AppointmentForm } from "./health/appointment-form"
import { TreatmentForm } from "./health/treatment-form"

interface HealthProps {
  user?: any
  activeChild: string
  setActiveChild?: (child: string) => void
}

export function Health({ user, activeChild, setActiveChild }: HealthProps) {
  const [isVaccinationOpen, setIsVaccinationOpen] = useState(false)
  const [showAppointmentForm, setShowAppointmentForm] = useState(false)
  const [showTreatmentForm, setShowTreatmentForm] = useState(false)

  // Données santé selon l'enfant actif
  const appointmentsEmma = [
    {
      id: 1,
      type: "Pédiatre",
      doctor: "Dr. Martin",
      date: "16 Nov",
      time: "14:30",
      status: "confirmed",
    },
    {
      id: 2,
      type: "Dentiste",
      doctor: "Dr. Dubois",
      date: "28 Nov",
      time: "16:00",
      status: "pending",
    },
  ]
  const appointmentsLucas = [
    {
      id: 1,
      type: "Orthophoniste",
      doctor: "Dr. Leroy",
      date: "19 Nov",
      time: "10:00",
      status: "pending",
    },
    {
      id: 2,
      type: "Ophtalmo",
      doctor: "Dr. Bernard",
      date: "25 Nov",
      time: "11:00",
      status: "confirmed",
    },
  ]
  const appointments = activeChild === "Lucas" ? appointmentsLucas : appointmentsEmma

  const vaccinationsEmma = [
    {
      id: 1,
      name: "DTP (Diphtérie, Tétanos, Polio)",
      lastDate: "15 Sept 2023",
      nextDate: "15 Sept 2024",
      status: "up-to-date",
    },
    {
      id: 2,
      name: "ROR (Rougeole, Oreillons, Rubéole)",
      lastDate: "10 Mars 2023",
      nextDate: "10 Mars 2025",
      status: "up-to-date",
    },
    {
      id: 3,
      name: "Méningocoque C",
      lastDate: "5 Jan 2022",
      nextDate: "5 Jan 2025",
      status: "due-soon",
    },
  ]
  const vaccinationsLucas = [
    {
      id: 1,
      name: "Coqueluche",
      lastDate: "20 Sept 2023",
      nextDate: "20 Sept 2024",
      status: "up-to-date",
    },
    {
      id: 2,
      name: "Hépatite B",
      lastDate: "15 Mars 2023",
      nextDate: "15 Mars 2025",
      status: "due-soon",
    },
  ]
  const vaccinations = activeChild === "Lucas" ? vaccinationsLucas : vaccinationsEmma

  const treatmentsEmma = [
    {
      id: 1,
      name: "Vitamine D",
      dosage: "1 goutte/jour",
      duration: "Permanent",
      status: "active",
    },
  ]
  const treatmentsLucas = [
    {
      id: 1,
      name: "Fer",
      dosage: "1 comprimé/jour",
      duration: "3 mois",
      status: "active",
    },
  ]
  const treatments = activeChild === "Lucas" ? treatmentsLucas : treatmentsEmma

  // Gestion des formulaires
  const handleSaveAppointment = (data: any) => {
    console.log("Saving appointment:", data)
    setShowAppointmentForm(false)
  }

  const handleSaveTreatment = (data: any) => {
    console.log("Saving treatment:", data)
    setShowTreatmentForm(false)
  }

  if (showAppointmentForm) {
    return <AppointmentForm onBack={() => setShowAppointmentForm(false)} onSave={handleSaveAppointment} />
  }

  if (showTreatmentForm) {
    return <TreatmentForm onBack={() => setShowTreatmentForm(false)} onSave={handleSaveTreatment} />
  }

  return (
    <div className="p-4 space-y-4">
      {/* En-tête */}
      <Card className="bg-gradient-to-r from-red-100 to-pink-100">
        <CardContent className="p-4 text-center">
          <div className="w-12 h-12 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-2">
            <Pill className="h-6 w-6 text-red-600" />
          </div>
          <h2 className="font-bold text-slate-700">Espace Santé {activeChild}</h2>
          <p className="text-sm text-slate-600">Suivi médical centralisé</p>
          <Button
            size="sm"
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => window.open("https://www.doctolib.fr", "_blank")}
          >
            <FileText className="h-3 w-3 mr-1" />
            Accéder au dossier médical
          </Button>
        </CardContent>
      </Card>

      {/* Prochains rendez-vous */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-blue-500" />
            Rendez-vous médicaux
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {appointments.map((apt) => (
            <div key={apt.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-700">{apt.type}</p>
                <p className="text-sm text-slate-600">{apt.doctor}</p>
                <p className="text-sm text-slate-600">
                  {apt.date} à {apt.time}
                </p>
              </div>
              <div className="text-right">
                <Badge
                  className={`mb-2 ${
                    apt.status === "confirmed"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  {apt.status === "confirmed" ? "Confirmé" : "En attente"}
                </Badge>
                <Button size="sm" variant="outline">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Doctolib
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Vaccinations */}
      <Card className="bg-white/90 backdrop-blur-sm border-gray-300 shadow-lg">
        <CardHeader>
          <button
            onClick={() => setIsVaccinationOpen(!isVaccinationOpen)}
            className="flex items-center justify-between w-full text-left"
          >
            <CardTitle className="text-gray-800 flex items-center">
              <Syringe className="h-5 w-5 mr-2 text-purple-500" />
              Vaccinations
            </CardTitle>
            <ChevronDown
              className={`h-5 w-5 text-gray-600 transition-transform ${isVaccinationOpen ? "rotate-180" : ""}`}
            />
          </button>
        </CardHeader>
        {isVaccinationOpen && (
          <CardContent className="space-y-3">
            {vaccinations.map((vaccine) => (
              <div key={vaccine.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <p className="font-medium text-slate-700">{vaccine.name}</p>
                  <Badge
                    className={`${
                      vaccine.status === "up-to-date"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                    }`}
                  >
                    {vaccine.status === "up-to-date" ? "À jour" : "Bientôt"}
                  </Badge>
                </div>
                <div className="text-sm text-slate-600">
                  <p>Dernier: {vaccine.lastDate}</p>
                  <p>Prochain: {vaccine.nextDate}</p>
                </div>
                {vaccine.status === "due-soon" && (
                  <div className="flex items-center mt-2 text-orange-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-xs">Rappel dans 2 mois</span>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        )}
      </Card>

      {/* Traitements en cours */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700 flex items-center">
            <Pill className="h-5 w-5 mr-2 text-red-500" />
            Traitements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {treatments.map((treatment) => (
            <div key={treatment.id} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium text-slate-700">{treatment.name}</p>
                <p className="text-sm text-slate-600">{treatment.dosage}</p>
                <p className="text-xs text-slate-500">{treatment.duration}</p>
              </div>
              <Badge className="bg-green-100 text-green-700 hover:bg-green-100">Actif</Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Notifications personnalisées */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <AlertCircle className="h-5 w-5 text-orange-500" />
            <div>
              <p className="text-sm font-medium text-slate-700">Rappel personnalisé</p>
              <p className="text-xs text-slate-600">Vaccin Méningocoque C à prévoir dans 10 semaines</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          onClick={() => setShowAppointmentForm(true)}
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau RDV
        </Button>
        <Button
          onClick={() => setShowTreatmentForm(true)}
          className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white"
        >
          <Pill className="h-4 w-4 mr-2" />
          Ajouter traitement
        </Button>
      </div>
    </div>
  )
}
