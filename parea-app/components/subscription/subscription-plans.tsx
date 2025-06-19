"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Crown, Sparkles, ArrowLeft, Users, Heart, Calendar, MessageCircle } from "lucide-react"

interface SubscriptionPlansProps {
  currentPlan: string
  onSelectPlan: (planId: string) => void
  onBack: () => void
}

export function SubscriptionPlans({ currentPlan, onSelectPlan, onBack }: SubscriptionPlansProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("monthly")

  const plans = [
    {
      id: "free",
      name: "Gratuit",
      price: 0,
      description: "Pour découvrir Parea",
      features: [
        "Calendrier basique",
        "Messages simples",
        "3 souvenirs par mois",
        "Suivi dépenses limité (10/mois)",
        "1 enfant maximum",
      ],
      limitations: [
        "Pas d'IA bienveillante",
        "Pas d'export PDF",
        "Support communautaire uniquement",
        "Pas de suggestions de planning",
      ],
      color: "from-gray-400 to-gray-500",
      textColor: "text-gray-600",
    },
    {
      id: billingCycle === "monthly" ? "monthly" : "annual",
      name: "Premium",
      price: billingCycle === "monthly" ? 9.99 : 99.99,
      originalPrice: billingCycle === "annual" ? 119.88 : null,
      description: billingCycle === "monthly" ? "Par utilisateur/mois" : "Par utilisateur/an (2 mois offerts)",
      isPopular: true,
      features: [
        "Calendrier avancé avec suggestions IA",
        "Synchronisation Google Calendar & Apple Calendar",
        "Messagerie intelligente et bienveillante",
        "Souvenirs illimités avec albums",
        "Suivi dépenses complet et analyses",
        "Enfants illimités",
        "Export PDF de tous les rapports",
        "Notifications personnalisées",
        "Support prioritaire 24/7",
        "Thèmes et personnalisation",
        "Synchronisation temps réel",
      ],
      color: "from-blue-400 to-purple-400",
      textColor: "text-white",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* En-tête */}
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800 mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Choisissez votre plan</h1>
            <p className="text-gray-600">Modèle par utilisateur • Forfait commun par enfant</p>
          </div>
        </div>

        {/* Explication du modèle */}
        <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Comment ça marche ?</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>
                    • <strong>Forfait par utilisateur :</strong> Chaque parent souscrit individuellement
                  </p>
                  <p>
                    • <strong>Données partagées :</strong> Les informations de l'enfant sont communes aux deux parents
                  </p>
                  <p>
                    • <strong>Fonctionnalités Premium :</strong> Liées à votre compte personnel
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Toggle de facturation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-1 border border-gray-200 shadow-lg">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                billingCycle === "monthly" ? "bg-blue-500 text-white shadow-md" : "text-gray-600 hover:text-gray-800"
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setBillingCycle("annual")}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all relative ${
                billingCycle === "annual"
                  ? "bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white shadow-md"
                  : "text-gray-600 hover:bg-gradient-to-r hover:from-pastel-pink-400 hover:to-pastel-purple-400 hover:text-white"
              }`}
            >
              Annuel
              <Badge className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-1 py-0">-17%</Badge>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {plans.map((plan) => {
            const isAnnualPremium = plan.isPopular && billingCycle === "annual"
            const cardContent = (
              <Card
                key={plan.id}
                className={`relative bg-white/90 backdrop-blur-sm ${isAnnualPremium ? "border-0 shadow-none rounded-2xl" : "border-gray-200 shadow-lg"} hover:shadow-xl transition-all duration-300 ${
                  plan.isPopular && !isAnnualPremium ? "ring-2 ring-blue-300 scale-105" : plan.isPopular ? "scale-105" : ""
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className={`px-4 py-1 ${billingCycle === "annual" ? "bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white" : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"}`}>
                      <Crown className="h-3 w-3 mr-1" />
                      Le plus populaire
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-gray-800 text-xl">{plan.name}</CardTitle>
                  <p className="text-gray-600 text-sm">{plan.description}</p>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-800">{plan.price} €</span>
                      <span className="text-gray-600 text-sm">/mois</span>
                    </div>
                    {plan.originalPrice && (
                      <p className="text-gray-500 text-sm line-through mt-1">{plan.originalPrice} €/an</p>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="h-4 w-4 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700 text-sm">{feature}</span>
                      </div>
                    ))}
                    {plan.limitations?.map((limitation, index) => (
                      <div key={index} className="flex items-center opacity-60">
                        <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                        </div>
                        <span className="text-gray-500 text-sm">{limitation}</span>
                      </div>
                    ))}
                  </div>
                  <Button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full ${
                      currentPlan === plan.id
                        ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                        : plan.isPopular && billingCycle === "annual"
                        ? "bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 hover:from-pastel-pink-500 hover:to-pastel-purple-500 text-white"
                        : plan.isPopular
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                        : "bg-gray-500 hover:bg-gray-600 text-white"
                    }`}
                    disabled={currentPlan === plan.id}
                  >
                    {currentPlan === plan.id ? (
                      <>
                        <Sparkles className="h-4 w-4 mr-2" />
                        Plan actuel
                      </>
                    ) : plan.id === "free" ? (
                      "Rester gratuit"
                    ) : (
                      "Passer au Premium"
                    )}
                  </Button>
                </CardContent>
              </Card>
            )
            return isAnnualPremium ? (
              <div key={plan.id} className="p-[2px] bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 rounded-2xl">
                {cardContent}
              </div>
            ) : cardContent
          })}
        </div>

        {/* Fonctionnalités détaillées */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Planning IA + Sync</h3>
              <p className="text-xs text-gray-600">Suggestions automatiques + Google/Apple Calendar</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <MessageCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Messages IA</h3>
              <p className="text-xs text-gray-600">Communication bienveillante assistée</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-pink-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Souvenirs</h3>
              <p className="text-xs text-gray-600">Albums illimités et partage famille</p>
            </CardContent>
          </Card>

          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg">
            <CardContent className="p-4 text-center">
              <Sparkles className="h-8 w-8 text-purple-500 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-800 mb-1">Analyses</h3>
              <p className="text-xs text-gray-600">Rapports détaillés et insights</p>
            </CardContent>
          </Card>
        </div>

        {/* Garantie */}
        <div className="text-center mt-12">
          <Card className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg max-w-md mx-auto">
            <CardContent className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Garantie 30 jours</h3>
              <p className="text-gray-600 text-sm">
                Pas satisfait ? Nous vous remboursons intégralement sous 30 jours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
