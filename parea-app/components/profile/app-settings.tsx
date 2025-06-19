"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Smartphone, Globe, Zap, HelpCircle } from "lucide-react"

interface AppSettingsProps {
  onBack: () => void
}

export function AppSettings({ onBack }: AppSettingsProps) {
  const [settings, setSettings] = useState({
    autoSync: true,
    offlineMode: false,
    highContrast: false,
    reducedMotion: false,
    language: "fr",
    timezone: "Europe/Paris",
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <h1 className="text-2xl font-bold text-gray-800">Paramètres</h1>
        </div>

        <div className="space-y-4">
          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                Synchronisation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Synchronisation automatique</Label>
                  <p className="text-sm text-gray-600">Mise à jour en temps réel</p>
                </div>
                <Switch
                  checked={settings.autoSync}
                  onCheckedChange={(checked) => setSettings({ ...settings, autoSync: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Mode hors ligne</Label>
                  <p className="text-sm text-gray-600">Accès sans connexion</p>
                </div>
                <Switch
                  checked={settings.offlineMode}
                  onCheckedChange={(checked) => setSettings({ ...settings, offlineMode: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Smartphone className="h-5 w-5 mr-2 text-blue-500" />
                Accessibilité
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Contraste élevé</Label>
                  <p className="text-sm text-gray-600">Améliore la lisibilité</p>
                </div>
                <Switch
                  checked={settings.highContrast}
                  onCheckedChange={(checked) => setSettings({ ...settings, highContrast: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-700">Réduire les animations</Label>
                  <p className="text-sm text-gray-600">Moins de mouvement</p>
                </div>
                <Switch
                  checked={settings.reducedMotion}
                  onCheckedChange={(checked) => setSettings({ ...settings, reducedMotion: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <Globe className="h-5 w-5 mr-2 text-green-500" />
                Région et langue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <Label className="text-gray-700">Langue</Label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-800"
                >
                  <option value="fr">Français</option>
                  <option value="en">English</option>
                  <option value="es">Español</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Fuseau horaire</Label>
                <select
                  value={settings.timezone}
                  onChange={(e) => setSettings({ ...settings, timezone: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-800"
                >
                  <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                  <option value="Europe/London">Europe/London (GMT+0)</option>
                  <option value="America/New_York">America/New_York (GMT-5)</option>
                </select>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center text-gray-800">
                <HelpCircle className="h-5 w-5 mr-2 text-purple-500" />
                Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Centre d'aide
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Contacter le support
              </Button>
              <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-50">
                Signaler un problème
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
