"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Camera, Download, Check, Clock } from "lucide-react"
import { useState } from "react"
import { PDFExport } from "./expenses/pdf-export"

interface ExpensesProps {
  user?: any
  activeChild: string
  setActiveChild?: (child: string) => void
}

export function Expenses({ user, activeChild, setActiveChild }: ExpensesProps) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [showPDFExport, setShowPDFExport] = useState(false)

  // Dépenses selon l'enfant actif
  const expensesEmma = [
    {
      id: 1,
      title: "Consultation pédiatre",
      amount: 45.0,
      category: "Santé",
      date: "15 Nov",
      status: "validated",
      paidBy: "Sarah",
    },
    {
      id: 2,
      title: "Cours de danse",
      amount: 80.0,
      category: "Activités",
      date: "12 Nov",
      status: "pending",
      paidBy: "Moi",
    },
    {
      id: 3,
      title: "Vêtements hiver",
      amount: 120.0,
      category: "Vêtements",
      date: "10 Nov",
      status: "validated",
      paidBy: "Moi",
    },
  ]
  const expensesLucas = [
    {
      id: 1,
      title: "Séance orthophoniste",
      amount: 60.0,
      category: "Santé",
      date: "19 Nov",
      status: "pending",
      paidBy: "Moi",
    },
    {
      id: 2,
      title: "Licence football",
      amount: 110.0,
      category: "Sport",
      date: "20 Nov",
      status: "validated",
      paidBy: "Sarah",
    },
    {
      id: 3,
      title: "Livres d'école",
      amount: 35.0,
      category: "Scolarité",
      date: "22 Nov",
      status: "pending",
      paidBy: "Moi",
    },
  ]
  const expenses = activeChild === "Lucas" ? expensesLucas : expensesEmma

  const monthlyTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const myShare = monthlyTotal / 2

  if (showPDFExport) {
    return <PDFExport onBack={() => setShowPDFExport(false)} />
  }

  return (
    <div className="p-4 space-y-4">
      {/* Résumé mensuel */}
      <Card className="bg-gradient-to-r from-green-100 to-blue-100">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="font-semibold text-slate-700">Dépenses Novembre</h3>
            <p className="text-2xl font-bold text-slate-800 mt-1">{monthlyTotal.toFixed(2)} €</p>
            <p className="text-sm text-slate-600">Votre part: {myShare.toFixed(2)} €</p>
          </div>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-green-600">3</p>
              <p className="text-xs text-slate-600">Validées</p>
            </div>
            <div>
              <p className="text-lg font-bold text-orange-600">1</p>
              <p className="text-xs text-slate-600">En attente</p>
            </div>
            <div>
              <p className="text-lg font-bold text-blue-600">245 €</p>
              <p className="text-xs text-slate-600">Total année</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Graphique simple */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700">Répartition par catégorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Santé</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-1/3 h-2 bg-red-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">45 €</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Activités</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-2/3 h-2 bg-blue-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">80 €</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">Vêtements</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div className="w-full h-2 bg-green-400 rounded-full"></div>
                </div>
                <span className="text-sm font-medium">120 €</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Liste des dépenses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700">Dépenses récentes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {expenses.map((expense) => (
            <div key={expense.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <p className="font-medium text-slate-700">{expense.title}</p>
                  {expense.status === "validated" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Clock className="h-4 w-4 text-orange-500" />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    className={`text-xs ${
                      expense.category === "Santé"
                        ? "bg-red-100 text-red-700"
                        : expense.category === "Activités"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-green-100 text-green-700"
                    } hover:bg-current`}
                  >
                    {expense.category}
                  </Badge>
                  <span className="text-xs text-slate-500">
                    {expense.date} • {expense.paidBy}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-slate-800">{expense.amount.toFixed(2)} €</p>
                <Badge
                  className={`text-xs ${
                    expense.status === "validated"
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : "bg-orange-100 text-orange-700 hover:bg-orange-100"
                  }`}
                >
                  {expense.status === "validated" ? "Validée" : "En attente"}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Formulaire d'ajout */}
      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-700">Nouvelle dépense</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Description de la dépense" />
            <Input placeholder="Montant (€)" type="number" />
            <select className="w-full p-2 border border-gray-300 rounded-md">
              <option>Sélectionner une catégorie</option>
              <option>Santé</option>
              <option>Activités</option>
              <option>Vêtements</option>
              <option>École</option>
              <option>Autre</option>
            </select>
            <Button className="w-full bg-gray-200 text-slate-700 hover:bg-gray-300">
              <Camera className="h-4 w-4 mr-2" />
              Ajouter une photo
            </Button>
            <div className="flex space-x-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white">Ajouter</Button>
              <Button variant="outline" className="flex-1" onClick={() => setShowAddForm(false)}>
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Ajouter dépense
        </Button>
        <Button
          onClick={() => setShowPDFExport(true)}
          className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          Export PDF
        </Button>
      </div>
    </div>
  )
}
