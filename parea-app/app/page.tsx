"use client"

import { useState, useEffect, useRef } from "react"
import { Dashboard } from "@/components/dashboard"
import { Calendar } from "@/components/calendar"
import { Messages } from "@/components/messages"
import { Expenses } from "@/components/expenses"
import { Memories } from "@/components/memories"
import { Health } from "@/components/health"
import { Contacts } from "@/components/contacts"
import { Navigation } from "@/components/navigation"
import { Welcome } from "@/components/auth/welcome"
import { Login } from "@/components/auth/login"
import { Signup } from "@/components/auth/signup"
import { UserProfile } from "@/components/profile/user-profile"
import { SubscriptionPlans } from "@/components/subscription/subscription-plans"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Crown, Users, MessageCircle } from "lucide-react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase"

export default function PareaApp() {
  const [currentScreen, setCurrentScreen] = useState("dashboard")
  const [authScreen, setAuthScreen] = useState<"welcome" | "login" | "signup" | null>("welcome")
  const [user, setUser] = useState<any>(null)
  const [showProfile, setShowProfile] = useState(false)
  const [showSubscription, setShowSubscription] = useState(false)
  const [showContacts, setShowContacts] = useState(false)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(!isSupabaseConfigured())
  const [activeChild, setActiveChild] = useState("Emma")
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null)
  const [consultedNotifications, setConsultedNotifications] = useState<Set<string>>(new Set())

  const supabase = createClient()

  // Lever l'état des conversations ici
  const [conversations, setConversations] = useState([
    {
      id: 1,
      theme: "Planning",
      title: "Échange weekend samedi",
      lastMessage: "Peux-tu prendre Emma samedi ?",
      time: "14:30",
      unread: 2,
      tone: "neutral",
      messages: [
        {
          id: 1,
          sender: "Sarah",
          content: "Salut ! Peux-tu prendre Emma samedi après-midi ? J'ai un imprévu au travail.",
          time: "14:25",
          isMe: false,
        },
        {
          id: 2,
          sender: "Moi",
          content: "Pas de problème, je peux la prendre. À quelle heure ?",
          time: "14:30",
          isMe: true,
        },
      ],
    },
    {
      id: 2,
      theme: "Dépenses",
      title: "Facture dentiste validée",
      lastMessage: "Merci d'avoir emmené Emma",
      time: "12:15",
      unread: 0,
      tone: "positive",
      messages: [
        {
          id: 1,
          sender: "Sarah",
          content: "Facture dentiste validée ! Merci d'avoir emmené Emma. Tout s'est bien passé ?",
          time: "12:15",
          isMe: false,
        },
        {
          id: 2,
          sender: "Moi",
          content: "Parfait ! Elle a été très courageuse. Le dentiste dit que tout va bien.",
          time: "12:18",
          isMe: true,
        },
        {
          id: 3,
          sender: "Sarah",
          content: "Super ! J'ai validé la dépense dans l'app. 45 € remboursés par la mutuelle.",
          time: "12:20",
          isMe: false,
        },
      ],
    },
    {
      id: 3,
      theme: "Santé",
      title: "RDV pédiatre confirmé",
      lastMessage: "Pensez à apporter le carnet",
      time: "Hier",
      unread: 0,
      tone: "positive",
      messages: [
        {
          id: 1,
          sender: "Dr. Martin",
          content: "RDV pédiatre confirmé pour Emma le 16 juin à 14h30. Pensez à apporter le carnet de santé.",
          time: "Hier 10:30",
          isMe: false,
        },
        {
          id: 2,
          sender: "Moi",
          content: "Merci docteur, nous serons là. Faut-il prévoir quelque chose de particulier ?",
          time: "Hier 10:35",
          isMe: true,
        },
        {
          id: 3,
          sender: "Dr. Martin",
          content: "Non, juste le carnet. C'est pour les vaccins de rappel, rien d'inquiétant.",
          time: "Hier 10:40",
          isMe: false,
        },
      ],
    },
    {
      id: 4,
      theme: "École",
      title: "Réunion parents d'élèves",
      lastMessage: "Qui peut y aller ?",
      time: "2j",
      unread: 1,
      tone: "neutral",
      messages: [
        {
          id: 1,
          sender: "École Saint-Martin",
          content: "Réunion parents d'élèves le 20 juin à 18h. Présence d'au moins un parent souhaitée.",
          time: "2j",
          isMe: false,
        },
        {
          id: 2,
          sender: "Sarah",
          content: "Tu peux y aller ? J'ai une formation ce jour-là.",
          time: "2j",
          isMe: false,
        },
      ],
    },
  ])

  // Notifications simulées pour les pastilles - seulement Planning et Messages en démo
  const notifications = {
    calendar: consultedNotifications.has("calendar") ? 0 : 1, // 1 modification de planning en attente
    expenses: 0, // Pas de notifications en démo
    messages: conversations.reduce((acc, conv) => acc + (conv.unread || 0), 0),
    health: 0, // Pas de notifications en démo
    memories: 0, // Pas de nouvelles memories
    contacts: 1, // Ajoute une notification pour contacts si besoin
  }

  useEffect(() => {
    // Check if we're in demo mode
    if (!isSupabaseConfigured()) {
      setIsDemoMode(true)
      setLoading(false)
      return
    }

    // Vérifier la session existante
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      if (session?.user) {
        await loadUserProfile(session.user)
      }
      setLoading(false)
    }

    checkSession()

    // Écouter les changements d'authentification
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await loadUserProfile(session.user)
      } else {
        setUser(null)
        setAuthScreen("welcome")
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const loadUserProfile = async (authUser: any) => {
    try {
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", authUser.id).single()

      const { data: subscription } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", authUser.id)
        .single()

      setUser({
        ...authUser,
        profile,
        subscription,
      })
      setAuthScreen(null)
    } catch (error) {
      console.error("Error loading profile:", error)
    }
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
    setAuthScreen(null)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    setUser(null)
    setAuthScreen("welcome")
    setShowProfile(false)
  }

  const handleSubscriptionSelect = async (planId: string) => {
    // Ici vous intégreriez Stripe ou un autre processeur de paiement
    console.log("Selected plan:", planId)

    // Simulation de mise à jour d'abonnement
    if (user) {
      const updatedUser = {
        ...user,
        subscription: {
          ...user.subscription,
          plan_type: planId,
        },
      }
      setUser(updatedUser)
    }

    setShowSubscription(false)
  }

  const handleUpgradeClick = () => {
    setShowProfile(true)
    // Petit délai pour permettre l'ouverture du profil puis rediriger vers l'abonnement
    setTimeout(() => {
      setShowProfile(false)
      setShowSubscription(true)
    }, 100)
  }

  const handleScreenChange = (screen: string) => {
    setCurrentScreen(screen)
    // Marquer la notification comme consultée quand on va sur la page
    if (screen === "calendar") {
      setConsultedNotifications(prev => new Set([...prev, "calendar"]))
    }
  }

  // Ajout d'une variable pour wrapper la classe thème
  const themeClass = activeChild === "Lucas" && currentScreen !== "subscription" ? "theme-lucas" : ""

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-600">Chargement...</div>
      </div>
    )
  }

  // Écrans d'authentification
  if (authScreen === "welcome") {
    return (
      <Welcome
        onLogin={() => setAuthScreen("login")}
        onSignup={() => setAuthScreen("signup")}
        onDemoMode={
          isDemoMode
            ? () => {
                // Set a demo user
                setUser({
                  id: "demo-user-id",
                  email: "demo@example.com",
                  profile: {
                    id: "demo-user-id",
                    email: "demo@example.com",
                    full_name: "Utilisateur Demo",
                    child_name: "Emma",
                    role: "parent1",
                  },
                  subscription: {
                    plan_type: "free",
                    status: "active",
                  },
                })
                setAuthScreen(null)
              }
            : undefined
        }
        isDemoMode={isDemoMode}
      />
    )
  }

  if (authScreen === "login") {
    return (
      <Login
        onSuccess={handleLogin}
        onSwitchToSignup={() => setAuthScreen("signup")}
        onBack={() => setAuthScreen("welcome")}
      />
    )
  }

  if (authScreen === "signup") {
    return (
      <Signup
        onSuccess={handleLogin}
        onSwitchToLogin={() => setAuthScreen("login")}
        onBack={() => setAuthScreen("welcome")}
      />
    )
  }

  // Écrans de l'application
  if (showSubscription) {
    return (
      <SubscriptionPlans
        currentPlan={user?.subscription?.plan_type || "free"}
        onSelectPlan={handleSubscriptionSelect}
        onBack={() => setShowSubscription(false)}
      />
    )
  }

  if (showContacts) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl min-h-screen">
          <header className="bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowContacts(false)
                setCurrentScreen("dashboard")
              }}
              className="text-gray-600 hover:text-gray-800 absolute left-4 top-1/2 transform -translate-y-1/2 z-10"
            >
              ← Retour
            </Button>
            <h1 className="text-lg font-bold text-gray-800 text-center w-full">Contacts</h1>
          </header>
          <main className="pb-6">
            <Contacts user={user} />
          </main>
        </div>
      </div>
    )
  }

  // Affichage pleine page pour le profil
  if (showProfile) {
    return (
      <UserProfile
        user={user}
        onLogout={handleLogout}
        onClose={() => setShowProfile(false)}
        onSubscriptionClick={() => {
          setShowProfile(false)
          setShowSubscription(true)
        }}
        activeChild={activeChild}
        setActiveChild={setActiveChild}
      />
    )
  }

  // Rendu spécial pour Memories sans header
  if (currentScreen === "memories") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl min-h-screen">
          <main className="pb-24">
            <Memories user={user} activeChild={activeChild} setActiveChild={setActiveChild} />
          </main>
          <Navigation currentScreen={currentScreen} onScreenChange={handleScreenChange} notifications={notifications} />
        </div>
      </div>
    )
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case "dashboard":
        return <Dashboard user={user} activeChild={activeChild} onUpgradeClick={handleUpgradeClick} setActiveChild={setActiveChild} setCurrentScreen={setCurrentScreen} setSelectedConversation={setSelectedConversation} />
      case "calendar":
        return <Calendar user={user} activeChild={activeChild} setActiveChild={setActiveChild} />
      case "messages":
        return <Messages user={user} activeChild={activeChild} setActiveChild={setActiveChild} conversations={conversations} setConversations={setConversations} selectedConversation={selectedConversation} setSelectedConversation={setSelectedConversation} />
      case "expenses":
        return <Expenses user={user} activeChild={activeChild} setActiveChild={setActiveChild} />
      case "health":
        return <Health user={user} activeChild={activeChild} setActiveChild={setActiveChild} />
      default:
        return <Dashboard user={user} activeChild={activeChild} onUpgradeClick={handleUpgradeClick} setActiveChild={setActiveChild} setCurrentScreen={setCurrentScreen} setSelectedConversation={setSelectedConversation} />
    }
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 ${themeClass}`}>
      <div className="max-w-md mx-auto bg-white/90 backdrop-blur-sm shadow-xl min-h-screen">
        <header className="bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm">
          {isDemoMode && (
            <div className="bg-orange-100 border border-orange-200 rounded-lg p-2 mb-3">
              <p className="text-orange-700 text-xs text-center">
                🚀 Mode Démo - Configurez Supabase pour la version complète
              </p>
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Parea</h1>
              <p className="text-xs text-gray-600">La coparentalité réinventée</p>
            </div>
            <div className="flex items-center space-x-3">
              {/* Bouton Messages déplacé dans le header */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (currentScreen === "messages") {
                    setCurrentScreen("dashboard")
                    setSelectedConversation(null)
                  } else {
                    setCurrentScreen("messages")
                  }
                }}
                className={`relative p-2 ${
                  currentScreen === "messages"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-blue-500 hover:bg-blue-50"
                }`}
                title="Messages"
              >
                <MessageCircle className="h-4 w-4" />
                {notifications.messages > 0 && (
                  <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 text-white text-xs font-medium rounded-full flex items-center justify-center animate-pulse-notification shadow-sm">
                    <span className="text-[8px] leading-none">
                      {notifications.messages > 9 ? "9" : notifications.messages}
                    </span>
                  </div>
                )}
              </Button>

              {/* Bouton d'accès rapide aux contacts */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowContacts(true)}
                className="text-blue-500 hover:text-blue-600 p-2"
                title="Contacts"
              >
                <Users className="h-4 w-4" />
              </Button>

              {user?.subscription?.plan_type !== "free" && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)} className="p-0">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.profile?.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-gradient-to-r from-blue-400 to-purple-400 text-white text-sm">
                    {user?.profile?.full_name?.charAt(0) || user?.email?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </div>
          </div>
        </header>

        <main className="pb-24">{renderScreen()}</main>

        <Navigation currentScreen={currentScreen} onScreenChange={handleScreenChange} notifications={notifications} />
      </div>
    </div>
  )
}
