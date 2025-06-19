"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Eye, Users, Lock, Download } from "lucide-react"

interface PrivacySettingsProps {
  onBack: () => void
}

export function PrivacySettings({ onBack }: PrivacySettingsProps) {
  const [settings, setSettings] = useState({
    memoriesVisibility: "parents",
    shareLocation: false,
    allowFamilyAccess: true,
    dataExport: true,
    analyticsOptOut: false,
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Confidentialité</h1>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Eye className="h-5 w-5 mr-2 text-blue-500" />
                Visibilité des souvenirs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-gray-700">Visibilité par défaut</Label>
                <select
                  value={settings.memoriesVisibility}
                  onChange={(e) => setSettings({ ...settings, memoriesVisibility: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-800"
                >
                  <option value="parents">Parents uniquement</option>
                  <option value="famille">Famille élargie</option>
                  <option value="enfant">Visible pour l'enfant (16+)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Users className="h-5 w-5 mr-2 text-green-500" />
                Partage familial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Accès famille élargie</Label>
                  <p className="text-sm text-gray-600">Grands-parents, oncles, tantes</p>
                </div>
                <Switch
                  checked={settings.allowFamilyAccess}
                  onCheckedChange={(checked) => setSettings({ ...settings, allowFamilyAccess: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Partage de localisation</Label>
                  <p className="text-sm text-gray-600">Pour les événements et RDV</p>
                </div>
                <Switch
                  checked={settings.shareLocation}
                  onCheckedChange={(checked) => setSettings({ ...settings, shareLocation: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Lock className="h-5 w-5 mr-2 text-purple-500" />
                Données personnelles
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Export des données</Label>
                  <p className="text-sm text-gray-600">Télécharger vos données</p>
                </div>
                <Switch
                  checked={settings.dataExport}
                  onCheckedChange={(checked) => setSettings({ ...settings, dataExport: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Analyses anonymes</Label>
                  <p className="text-sm text-gray-600">Aider à améliorer l'app</p>
                </div>
                <Switch
                  checked={!settings.analyticsOptOut}
                  onCheckedChange={(checked) => setSettings({ ...settings, analyticsOptOut: !checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Download className="h-5 w-5 mr-2 text-orange-500" />
                Actions sur les données
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Télécharger mes données
              </Button>
              <Button variant="outline" className="w-full border-red-300 text-red-600 hover:bg-red-50">
                Supprimer mon compte
              </Button>
            </CardContent>
          </Card>
        </div>

        <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          Sauvegarder les paramètres
        </Button>
      </div>
    </div>
  )
}
