"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Send, Lightbulb, ThumbsUp, ThumbsDown, ArrowLeft, Wand2, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"

interface MessagesProps {
  user?: any
  activeChild: string
  setActiveChild?: (child: string) => void
  conversations: any[]
  setConversations: (fn: (prev: any[]) => any[]) => void
  selectedConversation: number | null
  setSelectedConversation: (id: number | null) => void
}

export function Messages({ user, activeChild, setActiveChild, conversations, setConversations, selectedConversation, setSelectedConversation }: MessagesProps) {
  const [message, setMessage] = useState("")
  const [showSuggestion, setShowSuggestion] = useState(false)
  const [showNewMessage, setShowNewMessage] = useState(false)
  const [newMessageSubject, setNewMessageSubject] = useState("")
  const [newMessageContent, setNewMessageContent] = useState("")
  const [newMessageChild, setNewMessageChild] = useState(activeChild || "Emma")
  const [aiSuggestion, setAiSuggestion] = useState("")

  // Effet pour mettre à jour le compteur 'unread' à 0 quand une conversation est ouverte
  useEffect(() => {
    if (selectedConversation !== null) {
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation && conv.unread > 0
            ? { ...conv, unread: 0 }
            : conv
        )
      )
    }
  }, [selectedConversation])

  const generateAISuggestion = (conversationMessages: any[]) => {
    const lastMessage = conversationMessages[conversationMessages.length - 1]

    if (lastMessage?.content.toLowerCase().includes("samedi")) {
      return "Je ne peux pas samedi, mais que dirais-tu de dimanche matin ? Je suis libre à partir de 9h."
    } else if (lastMessage?.content.toLowerCase().includes("formation")) {
      return "Pas de problème, je peux m'en occuper. À quelle heure se termine ta formation ?"
    } else if (
      lastMessage?.content.toLowerCase().includes("rdv") ||
      lastMessage?.content.toLowerCase().includes("rendez-vous")
    ) {
      return "Merci pour la confirmation. Je noterai ça dans mon agenda."
    } else {
      return "D'accord, je comprends. Dis-moi ce qui t'arrangerait le mieux."
    }
  }

  const handleAISuggestion = () => {
    if (selectedConversation) {
      const currentConv = conversations.find((c) => c.id === selectedConversation)
      if (currentConv) {
        const suggestion = generateAISuggestion(currentConv.messages)
        setAiSuggestion(suggestion)
        setMessage(suggestion)
        setShowSuggestion(true)
      }
    }
  }

  const handleMessageChange = (value: string) => {
    setMessage(value)
    if (value.toLowerCase().includes("non") || value.toLowerCase().includes("impossible")) {
      setShowSuggestion(true)
    } else {
      setShowSuggestion(false)
    }
  }

  const handleSendMessage = () => {
    if (message.trim() && selectedConversation) {
      const newMessage = {
        id: Date.now(),
        sender: "Moi",
        content: message,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }

      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: message,
                time: "À l'instant",
              }
            : conv,
        ),
      )

      setMessage("")
      setShowSuggestion(false)
    }
  }

  const handleCreateNewMessage = () => {
    if (newMessageSubject.trim() && newMessageContent.trim()) {
      const newConversation = {
        id: Date.now(),
        theme: "Général",
        title: newMessageSubject,
        lastMessage: newMessageContent,
        time: "À l'instant",
        unread: 0,
        tone: "neutral" as const,
        child: newMessageChild,
        messages: [
          {
            id: 1,
            sender: "Moi",
            content: newMessageContent,
            time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
            isMe: true,
          },
        ],
      }

      setConversations((prev) => [newConversation, ...prev])
      setNewMessageSubject("")
      setNewMessageContent("")
      setShowNewMessage(false)
      setSelectedConversation(newConversation.id)
    }
  }

  // Ajoute une fonction pour générer une réponse IA positive ou négative selon le contexte
  const generateAIResponse = (type: 'agree' | 'disagree') => {
    const conv = conversations.find((c) => c.id === selectedConversation)
    const lastMsg = conv && conv.messages.length > 0 ? conv.messages[conv.messages.length - 1].content : ''
    if (type === 'agree') {
      if (lastMsg.toLowerCase().includes('samedi')) {
        return "D'accord pour samedi, je m'en occupe !"
      } else if (lastMsg.toLowerCase().includes('rdv') || lastMsg.toLowerCase().includes('rendez-vous')) {
        return "Merci pour l'information, c'est noté !"
      } else if (lastMsg.toLowerCase().includes('facture')) {
        return "Merci, je valide la dépense."
      } else {
        return "D'accord, ça me va !"
      }
    } else {
      if (lastMsg.toLowerCase().includes('samedi')) {
        return "Désolé, ce ne sera pas possible samedi. Une autre date ?"
      } else if (lastMsg.toLowerCase().includes('rdv') || lastMsg.toLowerCase().includes('rendez-vous')) {
        return "Je ne pourrai pas être présent à ce rendez-vous."
      } else if (lastMsg.toLowerCase().includes('facture')) {
        return "Je ne peux pas valider cette dépense pour le moment."
      } else {
        return "Désolé, ce n'est pas possible pour moi."
      }
    }
  }

  // Ajoute une fonction pour envoyer la réponse IA
  const handleQuickReply = (type: 'agree' | 'disagree') => {
    if (selectedConversation) {
      const aiMsg = generateAIResponse(type)
      const newMessage = {
        id: Date.now(),
        sender: "Moi",
        content: aiMsg,
        time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }),
        isMe: true,
      }
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === selectedConversation
            ? {
                ...conv,
                messages: [...conv.messages, newMessage],
                lastMessage: aiMsg,
                time: "À l'instant",
              }
            : conv,
        ),
      )
    }
  }

  // Vue création de nouveau message
  if (showNewMessage) {
    return (
      <div className="p-4 space-y-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-slate-700">Nouveau message</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowNewMessage(false)}
                className="text-slate-600 hover:text-slate-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Enfant concerné</label>
              <select
                value={newMessageChild}
                onChange={e => setNewMessageChild(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:border-pastel-pink-400 focus:ring-pastel-pink-400"
              >
                <option value="Emma">Emma</option>
                <option value="Lucas">Lucas</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Sujet</label>
              <Input
                placeholder="Ex: Planning weekend, Nouvelle dépense..."
                value={newMessageSubject}
                onChange={(e) => setNewMessageSubject(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700 mb-2 block">Message</label>
              <Textarea
                placeholder="Écrivez votre message..."
                value={newMessageContent}
                onChange={(e) => setNewMessageContent(e.target.value)}
                className="w-full min-h-[100px]"
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={handleCreateNewMessage}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
                disabled={!newMessageSubject.trim() || !newMessageContent.trim()}
              >
                <Send className="h-4 w-4 mr-2" />
                Envoyer
              </Button>
              <Button variant="outline" onClick={() => setShowNewMessage(false)} className="flex-1">
                Annuler
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Vue liste des conversations
  if (selectedConversation === null) {
    return (
      <div className="p-4 space-y-4 pb-20">
        {/* En-tête */}
        <Card>
          <CardHeader>
            <CardTitle className="text-slate-700">Messages</CardTitle>
            <p className="text-sm text-slate-600">Discussions organisées par sujet</p>
          </CardHeader>
        </Card>

        {/* Liste des conversations */}
        <div className="space-y-3">
          {conversations.map((conv) => (
            <Card
              key={conv.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedConversation(conv.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge
                        className={`text-xs ${
                          conv.theme === "Planning"
                            ? "bg-blue-100 text-blue-700"
                            : conv.theme === "Dépenses"
                              ? "bg-green-100 text-green-700"
                              : conv.theme === "Santé"
                                ? "bg-purple-100 text-purple-700"
                                : conv.theme === "École"
                                  ? "bg-orange-100 text-orange-700"
                                  : "bg-gray-100 text-gray-700"
                        } hover:bg-current`}
                      >
                        {conv.theme}
                      </Badge>
                      <span className="text-xs text-pink-500 font-semibold">{conv.child || "Emma"}</span>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          conv.tone === "positive"
                            ? "bg-green-400"
                            : conv.tone === "negative"
                              ? "bg-red-400"
                              : "bg-yellow-400"
                        }`}
                      ></div>
                    </div>
                    <h3 className="font-medium text-slate-700 mb-1">{conv.title}</h3>
                    <p className="text-sm text-slate-600 truncate">{conv.lastMessage}</p>
                    <p className="text-xs text-slate-500 mt-1">{conv.time}</p>
                  </div>
                  {conv.unread > 0 && <Badge className="bg-blue-500 text-white hover:bg-blue-500">{conv.unread}</Badge>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bouton nouveau message flottant */}
        <Button
          onClick={() => setShowNewMessage(true)}
          className="fixed bottom-24 right-6 w-14 h-14 rounded-full bg-gradient-to-r from-pastel-pink-400 to-pastel-purple-400 hover:from-pastel-pink-500 hover:to-pastel-purple-500 text-white shadow-2xl z-40"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    )
  }

  // Vue conversation individuelle
  const currentConversation = conversations.find((c) => c.id === selectedConversation)
  if (!currentConversation) return null

  return (
    <div className="p-4 space-y-4">
      {/* En-tête de la conversation */}
      <Card>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedConversation(null)}
              className="text-slate-600 hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center space-x-2">
              <Badge
                className={`text-xs ${
                  currentConversation.theme === "Planning"
                    ? "bg-blue-100 text-blue-700"
                    : currentConversation.theme === "Dépenses"
                      ? "bg-green-100 text-green-700"
                      : currentConversation.theme === "Santé"
                        ? "bg-purple-100 text-purple-700"
                        : currentConversation.theme === "École"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                } hover:bg-current`}
              >
                {currentConversation.theme}
              </Badge>
              <span className="text-xs text-pink-500 font-semibold">{currentConversation.child || "Emma"}</span>
              <CardTitle className="text-slate-700 text-base font-semibold mb-0">{currentConversation.title}</CardTitle>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Messages de la conversation */}
      <Card>
        <CardContent className="p-4 space-y-3 max-h-96 overflow-y-auto">
          {currentConversation.messages.map((msg: any, index: number) => (
            <div
              key={msg.id}
              className={`flex ${msg.isMe ? "justify-end" : "justify-start"} animate-in slide-in-from-bottom-2 duration-300`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.isMe ? "bg-blue-500 text-white" : "bg-gray-100 text-slate-700"
                }`}
              >
                {!msg.isMe && <p className="text-xs font-medium mb-1">{msg.sender}</p>}
                <p className="text-sm">{msg.content}</p>
                <p className={`text-xs mt-1 ${msg.isMe ? "text-blue-100" : "text-slate-500"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Suggestion IA */}
      {showSuggestion && (
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-orange-200 animate-in slide-in-from-top-2 duration-300">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <Lightbulb className="h-5 w-5 text-orange-500 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-700">Suggestion IA</p>
                <p className="text-xs text-slate-600 mt-1">
                  "{aiSuggestion || "Je ne peux pas samedi, mais que dirais-tu de dimanche matin ?"}"
                </p>
                <div className="flex space-x-2 mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => {
                      setMessage(aiSuggestion || "Je ne peux pas samedi, mais que dirais-tu de dimanche matin ?")
                      setShowSuggestion(false)
                    }}
                  >
                    Utiliser
                  </Button>
                  <Button size="sm" variant="ghost" className="text-xs" onClick={() => setShowSuggestion(false)}>
                    Ignorer
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Zone de saisie */}
      <Card>
        <CardContent className="p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Tapez votre message..."
              value={message}
              onChange={(e) => handleMessageChange(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-blue-500 hover:bg-blue-600">
              <Send className="h-4 w-4" />
            </Button>
          </div>

          {/* Réponses rapides avec IA alignée */}
          <div className="flex space-x-2 mt-3 items-center">
            <Button size="sm" variant="outline" className="text-xs" onClick={() => handleQuickReply('agree')}>
              <ThumbsUp className="h-3 w-3 mr-1" />
              D'accord
            </Button>
            <Button size="sm" variant="outline" className="text-xs" onClick={() => handleQuickReply('disagree')}>
              <ThumbsDown className="h-3 w-3 mr-1" />
              Pas possible
            </Button>
            <div className="flex-1"></div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200 text-purple-700 hover:bg-purple-100"
              onClick={handleAISuggestion}
            >
              <Wand2 className="h-3 w-3 mr-1" />
              IA
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
