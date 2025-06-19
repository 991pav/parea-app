"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  MessageCircle,
  Share,
  ChevronUp,
  ChevronDown,
  Grid3X3,
  Play,
  Pause,
  Volume2,
  VolumeX,
  MoreHorizontal,
} from "lucide-react"

interface MemoriesViewerProps {
  user?: any
  onBack: () => void
}

export function MemoriesViewer({ user, onBack }: MemoriesViewerProps) {
  const [viewMode, setViewMode] = useState<"reel" | "feed">("reel")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [likedMemories, setLikedMemories] = useState<number[]>([])
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)

  const memories = [
    {
      id: 1,
      type: "photo",
      content: "/placeholder.svg?height=600&width=400",
      description: `Premier jour d'école de ${user?.profile?.child_name || "Emma"} ! Elle était si fière de son nouveau cartable 🎒✨`,
      author: user?.profile?.role === "parent1" ? "Moi" : "Sarah",
      date: "4 Sept 2024",
      time: "08:30",
      likes: 5,
      comments: 3,
      tags: ["école", "rentrée", "fierté"],
    },
    {
      id: 2,
      type: "video",
      content: "/placeholder.svg?height=600&width=400",
      description: `${user?.profile?.child_name || "Emma"} qui rit aux éclats sur les balançoires ! Son bonheur est contagieux 🌳😄`,
      author: "Grand-mère",
      date: "15 Oct 2024",
      time: "15:20",
      likes: 12,
      comments: 8,
      tags: ["parc", "grands-parents", "jeu", "bonheur"],
    },
    {
      id: 3,
      type: "photo",
      content: "/placeholder.svg?height=600&width=400",
      description: `Première dent perdue ! ${user?.profile?.child_name || "Emma"} était tellement excitée pour la petite souris 🦷✨`,
      author: "Sarah",
      date: "2 Oct 2024",
      time: "20:15",
      likes: 15,
      comments: 5,
      tags: ["dent", "croissance", "petite souris"],
    },
  ]

  const toggleLike = (memoryId: number) => {
    setLikedMemories((prev) => (prev.includes(memoryId) ? prev.filter((id) => id !== memoryId) : [...prev, memoryId]))
  }

  const nextMemory = () => {
    setCurrentIndex((prev) => (prev + 1) % memories.length)
  }

  const prevMemory = () => {
    setCurrentIndex((prev) => (prev - 1 + memories.length) % memories.length)
  }

  // Vue Reel (TikTok-like)
  const ReelView = () => {
    const memory = memories[currentIndex]

    return (
      <div className="relative h-full bg-black">
        {/* Contenu principal */}
        <div className="relative h-full flex items-center justify-center">
          <img
            src={memory.content || "/placeholder.svg"}
            alt="Souvenir"
            className="max-h-full max-w-full object-contain"
          />

          {memory.type === "video" && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                variant="ghost"
                size="lg"
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 rounded-full bg-black/50 text-white hover:bg-black/70"
              >
                {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8 ml-1" />}
              </Button>
            </div>
          )}
        </div>

        {/* Navigation verticale */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevMemory}
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronUp className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextMemory}
            className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
          >
            <ChevronDown className="h-6 w-6" />
          </Button>
        </div>

        {/* Actions latérales */}
        <div className="absolute right-4 bottom-20 flex flex-col space-y-6">
          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => toggleLike(memory.id)}
              className={`w-12 h-12 rounded-full ${
                likedMemories.includes(memory.id) ? "bg-red-500 text-white" : "bg-black/50 text-white hover:bg-black/70"
              }`}
            >
              <Heart className={`h-6 w-6 ${likedMemories.includes(memory.id) ? "fill-current" : ""}`} />
            </Button>
            <span className="text-white text-xs mt-1 font-medium">
              {memory.likes + (likedMemories.includes(memory.id) ? 1 : 0)}
            </span>
          </div>

          <div className="flex flex-col items-center">
            <Button
              variant="ghost"
              size="sm"
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            <span className="text-white text-xs mt-1 font-medium">{memory.comments}</span>
          </div>

          <Button variant="ghost" size="sm" className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70">
            <Share className="h-6 w-6" />
          </Button>

          {memory.type === "video" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="w-12 h-12 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              {isMuted ? <VolumeX className="h-6 w-6" /> : <Volume2 className="h-6 w-6" />}
            </Button>
          )}
        </div>

        {/* Informations en bas */}
        <div className="absolute bottom-4 left-4 right-20 text-white">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-semibold text-sm">{memory.author.charAt(0)}</span>
            </div>
            <span className="font-medium">{memory.author}</span>
            <span className="text-gray-300 text-sm">• {memory.date}</span>
          </div>
          <p className="text-sm leading-relaxed mb-2">{memory.description}</p>
          <div className="flex flex-wrap gap-1">
            {memory.tags.map((tag, index) => (
              <span key={index} className="text-xs bg-black/30 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </div>

        {/* Indicateur de position */}
        <div className="absolute top-4 right-4 bg-black/50 rounded-full px-3 py-1">
          <span className="text-white text-xs font-medium">
            {currentIndex + 1} / {memories.length}
          </span>
        </div>
      </div>
    )
  }

  // Vue Feed
  const FeedView = () => (
    <div className="p-4 space-y-6 bg-gradient-to-br from-pastel-pink-50 to-pastel-purple-50 min-h-screen">
      {memories.map((memory) => (
        <Card key={memory.id} className="bg-white/90 backdrop-blur-sm border-gray-200 shadow-lg overflow-hidden">
          {/* En-tête */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-red-400 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">{memory.author.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">{memory.author}</p>
                  <p className="text-xs text-gray-500">
                    {memory.date} • {memory.time}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Contenu média */}
          <div className="relative">
            <img src={memory.content || "/placeholder.svg"} alt="Souvenir" className="w-full h-80 object-cover" />
            {memory.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <Play className="h-8 w-8 text-gray-700 ml-1" />
                </div>
              </div>
            )}
          </div>

          {/* Actions et description */}
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLike(memory.id)}
                  className={`p-2 ${
                    likedMemories.includes(memory.id)
                      ? "text-red-500 hover:text-red-600"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <Heart className={`h-5 w-5 ${likedMemories.includes(memory.id) ? "fill-current" : ""}`} />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 text-gray-600 hover:text-gray-800">
                  <MessageCircle className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="sm" className="p-2 text-gray-600 hover:text-gray-800">
                  <Share className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-800">
                {memory.likes + (likedMemories.includes(memory.id) ? 1 : 0)} j'aime
              </p>
              <p className="text-gray-800 leading-relaxed">{memory.description}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {memory.tags.map((tag, index) => (
                  <Badge key={index} className="bg-gray-100 text-gray-600 hover:bg-gray-100 text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
              {memory.comments > 0 && (
                <Button variant="ghost" size="sm" className="p-0 h-auto text-gray-500 hover:text-gray-700">
                  Voir les {memory.comments} commentaires
                </Button>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="h-screen flex flex-col">
      {/* En-tête */}
      <header className="bg-white/95 backdrop-blur-sm p-4 border-b border-gray-200 shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={onBack} className="text-gray-600 hover:text-gray-800">
            ← Retour
          </Button>
          <h1 className="text-lg font-bold text-gray-800">Memories</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant={viewMode === "reel" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("reel")}
              className={viewMode === "reel" ? "bg-red-500 text-white hover:bg-red-600" : "text-gray-600"}
            >
              <Play className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "feed" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("feed")}
              className={viewMode === "feed" ? "bg-red-500 text-white hover:bg-red-600" : "text-gray-600"}
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Contenu */}
      <div className="flex-1 overflow-hidden">{viewMode === "reel" ? <ReelView /> : <FeedView />}</div>
    </div>
  )
}
