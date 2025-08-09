"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Sparkles, Star, Download, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { templates } from "@/lib/templates"

export default function TemplatePage() {
  const params = useParams()
  const router = useRouter()
  const template = templates.find((t) => t.id === params.id)

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Template not found</h1>
          <Button onClick={() => router.push("/")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" onClick={() => router.push("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Gallery
            </Button>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Template Header */}
          <div className="text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-4">{template.name}</h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">{template.description}</p>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <Badge variant="secondary" className="px-4 py-2">
                {template.category.replace("-", " ").toUpperCase()}
              </Badge>
              <div className="flex items-center space-x-1 text-gray-600">
                <Star className="w-4 h-4" />
                <span>{template.uses} uses</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {template.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Template Preview */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Template Preview</CardTitle>
              <CardDescription>See how this template works and what it can create</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-white rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Interactive Preview</h3>
                <p className="text-gray-600 mb-4">This would show a live preview of the {template.name} in action</p>
                <Button>Try Interactive Demo</Button>
              </div>
            </CardContent>
          </Card>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Easy to customize and deploy</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Multiple AI model options</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>Open source and community-driven</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span>One-click deployment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Use Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Content creation and marketing</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Rapid prototyping</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Educational projects</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span>Business automation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8">
                <Sparkles className="w-5 h-5 mr-2" />
                Use This Template
              </Button>
              <Button size="lg" variant="outline" className="px-8 bg-transparent">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Source Code
              </Button>
            </div>
            <p className="text-sm text-gray-600">
              Join {template.uses.toLocaleString()} developers who have used this template
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
