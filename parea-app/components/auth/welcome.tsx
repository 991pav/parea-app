"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Calendar, MessageCircle, Euro, Stethoscope } from "lucide-react"

interface WelcomeProps {
  onLogin: () => void
  onSignup: () => void
  onDemoMode?: () => void
  isDemoMode?: boolean
}

export function Welcome({ onLogin, onSignup, onDemoMode, isDemoMode }: WelcomeProps) {
  const features = [
    { icon: Calendar, title: "Planning partagé", desc: "Organisez les gardes facilement", color: "pastel-blue" },
    {
      icon: MessageCircle,
      title: "Messages bienveillants",
      desc: "IA pour une communication apaisée",
      color: "pastel-green",
    },
    { icon: Euro, title: "Suivi des dépenses", desc: "Transparence financière totale", color: "pastel-purple" },
    { icon: Heart, title: "Mur de souvenirs", desc: "Partagez les moments précieux", color: "pastel-pink" },
    { icon: Stethoscope, title: "Suivi santé", desc: "Centralisez les informations médicales", color: "pastel-orange" },
    { icon: Users, title: "Coparentalité", desc: "Tout pour le bien-être de l'enfant", color: "pastel-blue" },
  ]

  const getColorClasses = (color: string) => {
    switch (color) {
      case "pastel-blue":
        return "bg-pastel-blue-100 text-pastel-blue-600"
      case "pastel-green":
        return "bg-pastel-green-100 text-pastel-green-600"
      case "pastel-purple":
        return "bg-pastel-purple-100 text-pastel-purple-600"
      case "pastel-pink":
        return "bg-pastel-pink-100 text-pastel-pink-600"
      case "pastel-orange":
        return "bg-pastel-orange-100 text-pastel-orange-600"
      default:
        return "bg-pastel-blue-100 text-pastel-blue-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue-50 to-pastel-purple-50 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 rounded-full flex items-center justify-center shadow-xl">
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Parea</h1>
          <p className="text-xl text-gray-600 mb-2">La coparentalité réinventée</p>
          <p className="text-gray-500 max-w-2xl mx-auto">
            L'application qui facilite l'organisation de la vie familiale post-divorce, centrée sur le bien-être de
            votre enfant.
          </p>
        </div>

        {/* Fonctionnalités */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="bg-white/80 backdrop-blur-sm border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6 text-center">
                  <div
                    className={`w-12 h-12 ${getColorClasses(feature.color)} rounded-full flex items-center justify-center mx-auto mb-4`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.desc}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Actions */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Button
              onClick={onSignup}
              className="flex-1 bg-gradient-to-r from-pastel-purple-500 to-pastel-pink-500 hover:from-pastel-purple-600 hover:to-pastel-pink-600 text-white py-3 text-lg font-medium shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Commencer gratuitement
            </Button>
            <Button
              onClick={onLogin}
              variant="outline"
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-800 py-3 text-lg font-medium"
            >
              Se connecter
            </Button>
          </div>

          {isDemoMode && onDemoMode && (
            <Button
              onClick={onDemoMode}
              variant="outline"
              className="w-full max-w-md mx-auto border-pastel-orange-300 text-pastel-orange-600 hover:bg-pastel-orange-50 hover:text-pastel-orange-700"
            >
              🚀 Essayer la démo
            </Button>
          )}

          <p className="text-gray-500 text-sm">
            {isDemoMode ? "Mode démo disponible • " : ""}Gratuit pour commencer • Premium à partir de 9,99 €/mois
          </p>
        </div>
      </div>
    </div>
  )
}
