"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Plus,
  Search,
  Stethoscope,
  GraduationCap,
  Gamepad2,
  Users,
  Car,
  Shield,
  Star,
  Edit,
  MessageSquare,
} from "lucide-react"
import { useState } from "react"

interface ContactsProps {
  user?: any
}

export function Contacts({ user }: ContactsProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [editingContactId, setEditingContactId] = useState<number | null>(null)
  const [editForm, setEditForm] = useState<any>({})
  const [contactsState, setContactsState] = useState([
    {
      id: 1,
      name: "Dr. Martin Dubois",
      role: "Pédiatre",
      category: "medical",
      phone: "01 42 34 56 78",
      email: "dr.martin@pediatrie-paris.fr",
      address: "15 rue de la Santé, 75014 Paris",
      hours: "Lun-Ven 8h-18h",
      emergency: true,
      favorite: true,
      lastContact: "16 Nov 2024",
    },
    {
      id: 2,
      name: "Dr. Sophie Leroy",
      role: "Dentiste",
      category: "medical",
      phone: "01 45 67 89 12",
      email: "cabinet.leroy@dentiste.fr",
      address: "8 avenue Mozart, 75016 Paris",
      hours: "Mar-Sam 9h-19h",
      emergency: false,
      favorite: false,
      lastContact: "3 Oct 2024",
    },
    {
      id: 3,
      name: "École Primaire Saint-Martin",
      role: "Directrice - Mme Rousseau",
      category: "education",
      phone: "01 48 23 45 67",
      email: "direction@ecole-saint-martin.fr",
      address: "22 rue des Écoles, 75011 Paris",
      hours: "Lun-Ven 8h30-16h30",
      emergency: false,
      favorite: true,
      lastContact: "12 Nov 2024",
    },
    {
      id: 4,
      name: "Centre Aéré Les Petits Explorateurs",
      role: "Responsable - M. Durand",
      category: "leisure",
      phone: "01 56 78 90 12",
      email: "contact@petits-explorateurs.fr",
      address: "45 rue du Parc, 75012 Paris",
      hours: "Mer 8h-18h, Vacances 8h-18h",
      emergency: false,
      favorite: true,
      lastContact: "8 Nov 2024",
    },
    {
      id: 5,
      name: "Club de Danse Étoile",
      role: "Professeure - Mlle Moreau",
      category: "sports",
      phone: "01 34 56 78 90",
      email: "info@danse-etoile.fr",
      address: "12 boulevard des Arts, 75009 Paris",
      hours: "Mer 17h-18h, Sam 10h-11h",
      emergency: false,
      favorite: false,
      lastContact: "5 Nov 2024",
    },
    {
      id: 6,
      name: "Pharmacie du Quartier",
      role: "Pharmacien - M. Bernard",
      category: "medical",
      phone: "01 23 45 67 89",
      email: "pharmacie.quartier@gmail.com",
      address: "3 place de la République, 75011 Paris",
      hours: "Lun-Sam 8h-20h, Dim 9h-13h",
      emergency: true,
      favorite: false,
      lastContact: "1 Nov 2024",
    },
    {
      id: 7,
      name: "Taxi Famille",
      role: "Chauffeur - M. Ahmed",
      category: "transport",
      phone: "06 12 34 56 78",
      email: "taxi.famille@outlook.fr",
      address: "Service à domicile",
      hours: "24h/24, 7j/7",
      emergency: true,
      favorite: true,
      lastContact: "20 Oct 2024",
    },
    {
      id: 8,
      name: "Urgences Pédiatriques",
      role: "Hôpital Necker",
      category: "emergency",
      phone: "15 ou 01 44 49 40 00",
      email: "urgences.pediatriques@necker.fr",
      address: "149 rue de Sèvres, 75015 Paris",
      hours: "24h/24, 7j/7",
      emergency: true,
      favorite: true,
      lastContact: "Non référencé",
    },
  ])

  const categories = [
    { id: "all", label: "Tous", icon: Users, count: contactsState.length },
    {
      id: "medical",
      label: "Médical",
      icon: Stethoscope,
      count: contactsState.filter((c) => c.category === "medical").length,
    },
    {
      id: "education",
      label: "École",
      icon: GraduationCap,
      count: contactsState.filter((c) => c.category === "education").length,
    },
    { id: "leisure", label: "Loisirs", icon: Gamepad2, count: contactsState.filter((c) => c.category === "leisure").length },
    { id: "sports", label: "Sport", icon: Users, count: contactsState.filter((c) => c.category === "sports").length },
    {
      id: "transport",
      label: "Transport",
      icon: Car,
      count: contactsState.filter((c) => c.category === "transport").length,
    },
    {
      id: "emergency",
      label: "Urgences",
      icon: Shield,
      count: contactsState.filter((c) => c.category === "emergency").length,
    },
  ]

  const filteredContacts = contactsState.filter((contact) => {
    const matchesCategory = selectedCategory === "all" || contact.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.role.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medical":
        return <Stethoscope className="h-4 w-4" />
      case "education":
        return <GraduationCap className="h-4 w-4" />
      case "leisure":
        return <Gamepad2 className="h-4 w-4" />
      case "sports":
        return <Users className="h-4 w-4" />
      case "transport":
        return <Car className="h-4 w-4" />
      case "emergency":
        return <Shield className="h-4 w-4" />
      default:
        return <Users className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical":
        return "bg-red-100 text-red-700 border-red-200"
      case "education":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "leisure":
        return "bg-green-100 text-green-700 border-green-200"
      case "sports":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "transport":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "emergency":
        return "bg-red-100 text-red-800 border-red-300"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const handleCall = (phone: string) => {
    window.open(`tel:${phone}`, "_self")
  }

  const handleSMS = (phone: string) => {
    window.open(`sms:${phone}`, "_self")
  }

  const handleEmail = (email: string) => {
    window.open(`mailto:${email}`, "_self")
  }

  const handleLocation = (address: string) => {
    const encodedAddress = encodeURIComponent(address)
    const userAgent = navigator.userAgent
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open(`maps://maps.apple.com/?q=${encodedAddress}`, "_blank")
    } else {
      window.open(`https://maps.google.com/?q=${encodedAddress}`, "_blank")
    }
  }

  const toggleFavorite = (contactId: number) => {
    // Ici vous mettriez à jour l'état des favoris
    console.log("Toggle favorite for contact:", contactId)
  }

  const handleEditClick = (contact: any) => {
    // Si on est déjà en train d'éditer un contact, annuler d'abord
    if (editingContactId !== null && editingContactId !== contact.id) {
      setEditingContactId(null)
      setEditForm({})
    }
    // Puis commencer l'édition du nouveau contact
    setEditingContactId(contact.id)
    setEditForm({ ...contact })
  }

  const handleContactCardClick = (contactId: number) => {
    // Si on clique sur un contact différent de celui qu'on édite, annuler l'édition
    if (editingContactId !== null && editingContactId !== contactId) {
      setEditingContactId(null)
      setEditForm({})
    }
  }

  const handleEditChange = (field: string, value: string) => {
    setEditForm((prev: any) => ({ ...prev, [field]: value }))
  }

  const handleEditSave = () => {
    setContactsState((prev: any[]) => prev.map(c => c.id === editingContactId ? { ...c, ...editForm } : c))
    setEditingContactId(null)
    setEditForm({})
  }

  const handleEditCancel = () => {
    setEditingContactId(null)
    setEditForm({})
  }

  return (
    <div className="p-4 space-y-6 bg-gradient-to-br from-pastel-pink-50 to-pastel-purple-50 min-h-screen">
      {/* En-tête simplifié */}
      <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Contacts</h2>
            <div className="w-16 h-16 bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
              <Users className="h-8 w-8 text-white" />
            </div>
            <p className="text-gray-600">Carnet d'adresses de {user?.profile?.child_name || "Emma"}</p>
          </div>
        </CardContent>
      </Card>

      {/* Barre de recherche */}
      <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Rechercher un contact..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-gray-300 text-gray-800 placeholder:text-gray-500 focus:border-pastel-pink-400"
            />
          </div>
        </CardContent>
      </Card>

      {/* Filtres par catégorie */}
      <div className="flex overflow-x-auto space-x-2 pb-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className={`flex-shrink-0 ${
                selectedCategory === category.id
                  ? category.id === "emergency"
                    ? "bg-red-300 text-red-900 border-red-600"
                    : "bg-gradient-to-r from-pastel-pink-100 to-pastel-purple-100 text-pastel-purple-700 border-pastel-purple-300"
                  : category.id === "emergency"
                    ? "bg-white text-gray-700 border-gray-300 hover:bg-red-200 hover:text-red-900 hover:border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:from-pastel-pink-50 hover:to-pastel-purple-50"
              }`}
            >
              <Icon className={`h-3 w-3 mr-1 ${category.id === "emergency" ? "text-red-600 font-semibold" : ""}`} />
              <span className={category.id === "emergency" ? "text-red-600 font-semibold" : ""}>
                {category.label}
              </span>
              <Badge className={`ml-2 text-xs border-0 ${
                selectedCategory === category.id
                  ? category.id === "emergency"
                    ? "bg-red-400 text-white hover:bg-red-400"
                    : category.id === "medical"
                    ? "bg-red-400 text-white hover:bg-red-400"
                    : category.id === "education"
                    ? "bg-pastel-purple-400 text-white hover:bg-pastel-purple-400"
                    : category.id === "leisure"
                    ? "bg-green-400 text-white hover:bg-green-400"
                    : category.id === "sports"
                    ? "bg-orange-400 text-white hover:bg-orange-400"
                    : category.id === "transport"
                    ? "bg-purple-400 text-white hover:bg-purple-400"
                    : "bg-gray-400 text-white hover:bg-gray-400"
                  : category.id === "emergency"
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : category.id === "medical"
                    ? "bg-red-100 text-red-800 hover:bg-red-100"
                    : category.id === "education"
                    ? "bg-pastel-purple-100 text-pastel-purple-800 hover:bg-pastel-purple-100"
                    : category.id === "leisure"
                    ? "bg-green-100 text-green-800 hover:bg-green-100"
                    : category.id === "sports"
                    ? "bg-orange-100 text-orange-800 hover:bg-orange-100"
                    : category.id === "transport"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-100"
              }`}>{category.count}</Badge>
            </Button>
          )
        })}
      </div>

      {/* Liste des contacts harmonisée */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => {
          const isEditing = editingContactId === contact.id
          return (
            <Card key={contact.id} className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg" onClick={() => handleContactCardClick(contact.id)}>
              <CardContent className="p-4">
                {/* En-tête du contact avec alignement harmonisé */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 rounded-full flex items-center justify-center flex-shrink-0">
                      {getCategoryIcon(contact.category)}
                    </div>
                    <div className="flex-1 min-w-0">
                      {/* Ligne 1: Nom + Badge urgence + Étoile + Edit (alignés) */}
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          {isEditing ? (
                            <Input value={editForm.name} onChange={e => handleEditChange('name', e.target.value)} className="text-gray-800 font-semibold" />
                          ) : (
                            <h3 className="font-semibold text-gray-800 truncate">{contact.name}</h3>
                          )}
                          {contact.emergency && (
                            <Badge className="bg-red-100 text-red-700 border-red-300 text-xs flex-shrink-0">
                              Urgences
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 flex-shrink-0">
                          <button onClick={(e) => { e.stopPropagation(); toggleFavorite(contact.id); }} className="p-1">
                            <Star
                              className={`h-4 w-4 ${
                                contact.favorite ? "text-yellow-500 fill-current" : "text-gray-300 hover:text-yellow-400"
                              }`}
                            />
                          </button>
                          <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700 p-1" onClick={(e) => { e.stopPropagation(); handleEditClick(contact); }}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Ligne 2: Rôle */}
                      {isEditing ? (
                        <Input value={editForm.role} onChange={e => handleEditChange('role', e.target.value)} className="text-sm mb-1" />
                      ) : (
                        <p className="text-gray-700 text-sm mb-1">{contact.role}</p>
                      )}

                      {/* Ligne 3: Badge catégorie */}
                      <Badge className={`${getCategoryColor(contact.category)} text-xs w-fit`}>{contact.category}</Badge>
                    </div>
                  </div>
                </div>

                {/* Informations de contact */}
                {isEditing ? (
                  <div className="space-y-2 mb-4">
                    <Input value={editForm.phone} onChange={e => handleEditChange('phone', e.target.value)} className="text-sm" />
                    <Input value={editForm.email} onChange={e => handleEditChange('email', e.target.value)} className="text-sm" />
                    <Input value={editForm.address} onChange={e => handleEditChange('address', e.target.value)} className="text-sm" />
                    <Input value={editForm.hours} onChange={e => handleEditChange('hours', e.target.value)} className="text-sm" />
                  </div>
                ) : (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm">
                      <Phone className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">{contact.phone}</span>
                    </div>
                    {contact.email && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Mail className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-800 truncate">{contact.email}</span>
                      </div>
                    )}
                    <div className="flex items-start space-x-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-800">{contact.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4 text-gray-600 flex-shrink-0" />
                      <span className="text-gray-800">{contact.hours}</span>
                    </div>
                  </div>
                )}

                {/* Actions avec icônes et dernier contact */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Dernier contact: {contact.lastContact}</span>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button size="sm" className="bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 text-white hover:from-pastel-pink-500 hover:to-pastel-purple-500" onClick={(e) => { e.stopPropagation(); handleEditSave(); }}>Enregistrer</Button>
                        <Button size="sm" variant="outline" onClick={(e) => { e.stopPropagation(); handleEditCancel(); }}>Annuler</Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleCall(contact.phone); }}
                          className="bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 p-2"
                          title="Appeler"
                        >
                          <Phone className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleSMS(contact.phone); }}
                          className="bg-blue-100 text-blue-700 border border-blue-300 hover:bg-blue-200 p-2"
                          title="SMS"
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        {contact.email && (
                          <Button
                            size="sm"
                            onClick={(e) => { e.stopPropagation(); handleEmail(contact.email); }}
                            className="bg-purple-100 text-purple-700 border border-purple-300 hover:bg-purple-200 p-2"
                            title="Email"
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          onClick={(e) => { e.stopPropagation(); handleLocation(contact.address); }}
                          className="bg-orange-100 text-orange-700 border border-orange-300 hover:bg-orange-200 p-2"
                          title="Localisation"
                        >
                          <MapPin className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Bouton d'ajout */}
      <Button className="w-full bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 hover:from-pastel-pink-500 hover:to-pastel-purple-500 text-white py-3">
        <Plus className="h-5 w-5 mr-2" />
        Ajouter un contact
      </Button>
    </div>
  )
}
