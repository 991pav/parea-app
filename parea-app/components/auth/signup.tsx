"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft, Users } from "lucide-react"
import { createClient } from "@/lib/supabase"

interface SignupProps {
  onSuccess: (user: any) => void
  onSwitchToLogin: () => void
  onBack: () => void
}

export function Signup({ onSuccess, onSwitchToLogin, onBack }: SignupProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    childName: "",
    role: "parent1" as "parent1" | "parent2" | "grandparent" | "family",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const supabase = createClient()

  const roleOptions = [
    { value: "parent1", label: "Parent 1", description: "Accès complet" },
    { value: "parent2", label: "Parent 2", description: "Accès complet" },
    { value: "grandparent", label: "Grand-parent", description: "Accès limité aux photos" },
    { value: "family", label: "Famille élargie", description: "Accès limité aux photos" },
  ]

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas")
      setLoading(false)
      return
    }

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError("Veuillez remplir tous les champs obligatoires")
      setLoading(false)
      return
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      })

      if (error) throw error

      if (data.user) {
        // Créer le profil utilisateur
        const { error: profileError } = await supabase.from("profiles").insert({
          id: data.user.id,
          email: formData.email,
          full_name: `${formData.firstName} ${formData.lastName}`,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          role: formData.role,
          child_name: formData.childName,
        })

        if (profileError) throw profileError

        // Créer l'abonnement gratuit par défaut pour les parents
        if (formData.role === "parent1" || formData.role === "parent2") {
          const { error: subscriptionError } = await supabase.from("subscriptions").insert({
            user_id: data.user.id,
            plan_type: "free",
            status: "active",
          })

          if (subscriptionError) throw subscriptionError
        }

        onSuccess(data.user)
      }
    } catch (error: any) {
      setError(error.message || "Erreur lors de l'inscription")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animation de fond */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <Card className="w-full max-w-md bg-white/95 backdrop-blur-xl border-gray-200 relative z-10 shadow-xl">
        <CardHeader className="text-center pb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="absolute left-4 top-4 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">Inscription</CardTitle>
          <p className="text-gray-600">Créez votre compte Parea</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700">
                  Prénom *
                </Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                  placeholder="Votre prénom"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700">
                  Nom *
                </Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                  placeholder="Votre nom"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700">
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-gray-700">
                Téléphone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                placeholder="06 12 34 56 78"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="childName" className="text-gray-700">
                Prénom de l'enfant
              </Label>
              <Input
                id="childName"
                value={formData.childName}
                onChange={(e) => setFormData({ ...formData, childName: e.target.value })}
                className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                placeholder="Emma"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role" className="text-gray-700">
                Votre rôle *
              </Label>
              <select
                id="role"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                className="w-full p-2 bg-white border border-gray-300 rounded-md text-gray-800 focus:border-pink-500"
                required
              >
                {roleOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label} - {option.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-gray-700">
                Mot de passe *
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500 pr-10"
                  placeholder="••••••••"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 text-gray-600 hover:text-gray-800"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">
                Confirmer le mot de passe *
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pink-500"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 hover:from-pastel-pink-500 hover:to-pastel-purple-500 text-white"
              disabled={loading}
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Déjà un compte ?{" "}
              <button onClick={onSwitchToLogin} className="text-pink-600 hover:text-pink-500 font-medium">
                Se connecter
              </button>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
