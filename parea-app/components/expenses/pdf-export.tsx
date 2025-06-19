"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Share, FileText, Calendar } from "lucide-react"
import { useState } from "react"

interface PDFExportProps {
  onBack: () => void
}

export function PDFExport({ onBack }: PDFExportProps) {
  const [selectedMonth, setSelectedMonth] = useState("2025-06")
  const [isGenerating, setIsGenerating] = useState(false)

  const expenses = [
    {
      id: 1,
      title: "Consultation pédiatre",
      amount: 45.0,
      category: "Santé",
      date: "15 Juin 2025",
      status: "validated",
      paidBy: "Sarah",
    },
    {
      id: 2,
      title: "Cours de danse",
      amount: 80.0,
      category: "Activités",
      date: "12 Juin 2025",
      status: "validated",
      paidBy: "Moi",
    },
    {
      id: 3,
      title: "Vêtements été",
      amount: 120.0,
      category: "Vêtements",
      date: "10 Juin 2025",
      status: "validated",
      paidBy: "Moi",
    },
  ]

  const monthlyTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0)
  const myExpenses = expenses.filter((e) => e.paidBy === "Moi").reduce((sum, e) => sum + e.amount, 0)
  const partnerExpenses = expenses.filter((e) => e.paidBy === "Sarah").reduce((sum, e) => sum + e.amount, 0)

  const generatePDF = async () => {
    setIsGenerating(true)

    // Simuler la génération du PDF
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Créer le contenu du PDF (simulation)
    const pdfContent = `
      RAPPORT DE DÉPENSES - JUIN 2025
      ================================
      
      Enfant: Emma
      Période: Juin 2025
      
      RÉSUMÉ
      ------
      Total des dépenses: ${monthlyTotal.toFixed(2)} €
      Payé par moi: ${myExpenses.toFixed(2)} €
      Payé par Sarah: ${partnerExpenses.toFixed(2)} €
      
      DÉTAIL DES DÉPENSES
      ------------------
      ${expenses
        .map(
          (expense) =>
            `${expense.date} - ${expense.title}
         Catégorie: ${expense.category}
         Montant: ${expense.amount.toFixed(2)} €
         Payé par: ${expense.paidBy}
         Statut: ${expense.status === "validated" ? "Validée" : "En attente"}
        `,
        )
        .join("\n")}
      
      RÉPARTITION PAR CATÉGORIE
      ------------------------
      Santé: ${expenses
        .filter((e) => e.category === "Santé")
        .reduce((sum, e) => sum + e.amount, 0)
        .toFixed(2)} €
      Activités: ${expenses
        .filter((e) => e.category === "Activités")
        .reduce((sum, e) => sum + e.amount, 0)
        .toFixed(2)} €
      Vêtements: ${expenses
        .filter((e) => e.category === "Vêtements")
        .reduce((sum, e) => sum + e.amount, 0)
        .toFixed(2)} €
    `

    // Créer et télécharger le fichier
    const blob = new Blob([pdfContent], { type: "text/plain" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `depenses-emma-juin-2025.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)

    setIsGenerating(false)
  }

  const sharePDF = () => {
    if (navigator.share) {
      navigator.share({
        title: "Rapport de dépenses Emma - Juin 2025",
        text: `Rapport des dépenses pour Emma - Total: ${monthlyTotal.toFixed(2)} €`,
      })
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(`Rapport des dépenses pour Emma - Juin 2025 - Total: ${monthlyTotal.toFixed(2)} €`)
      alert("Lien copié dans le presse-papiers")
    }
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
            <CardTitle className="text-slate-700">Export PDF</CardTitle>
          </div>
        </CardHeader>
      </Card>

      {/* Sélection du mois */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700 flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Période à exporter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="2025-06">Juin 2025</option>
            <option value="2025-07">Juillet 2025</option>
            <option value="2025-08">Août 2025</option>
            <option value="2025-09">Septembre 2025</option>
          </select>
        </CardContent>
      </Card>

      {/* Aperçu du rapport */}
      <Card>
        <CardHeader>
          <CardTitle className="text-slate-700">Aperçu du rapport</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Résumé */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-700 mb-2">Résumé financier</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-600">Total des dépenses</p>
                <p className="font-bold text-slate-800">{monthlyTotal.toFixed(2)} €</p>
              </div>
              <div>
                <p className="text-slate-600">Nombre de dépenses</p>
                <p className="font-bold text-slate-800">{expenses.length}</p>
              </div>
            </div>
          </div>

          {/* Répartition par parent */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-slate-700 mb-2">Répartition par parent</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-600">Payé par moi</span>
                <span className="font-bold text-slate-800">{myExpenses.toFixed(2)} €</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Payé par Sarah</span>
                <span className="font-bold text-slate-800">{partnerExpenses.toFixed(2)} €</span>
              </div>
            </div>
          </div>

          {/* Liste des dépenses */}
          <div>
            <h3 className="font-semibold text-slate-700 mb-2">Dépenses incluses</h3>
            <div className="space-y-2">
              {expenses.map((expense) => (
                <div key={expense.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div>
                    <p className="text-sm font-medium text-slate-700">{expense.title}</p>
                    <div className="flex items-center space-x-2">
                      <Badge className="text-xs bg-gray-200 text-gray-700 hover:bg-gray-200">{expense.category}</Badge>
                      <span className="text-xs text-slate-500">{expense.paidBy}</span>
                    </div>
                  </div>
                  <span className="font-bold text-slate-800">{expense.amount.toFixed(2)} €</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-full bg-green-500 hover:bg-green-600 text-white"
        >
          <Download className="h-4 w-4 mr-2" />
          {isGenerating ? "Génération en cours..." : "Télécharger le PDF"}
        </Button>

        <Button onClick={sharePDF} variant="outline" className="w-full">
          <Share className="h-4 w-4 mr-2" />
          Partager le rapport
        </Button>
      </div>

      {/* Informations */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <FileText className="h-5 w-5 text-blue-500 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-slate-700">Format du rapport</p>
              <p className="text-xs text-slate-600 mt-1">
                Le PDF inclura toutes les dépenses validées, la répartition par catégorie et parent, ainsi qu'un résumé
                financier détaillé.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
